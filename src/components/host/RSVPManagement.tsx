
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Users, UserCheck, UserX, Download } from 'lucide-react';

interface RSVPManagementProps {
  eventId: string;
}

export const RSVPManagement = ({ eventId }: RSVPManagementProps) => {
  // Fetch RSVPs for the event
  const { data: rsvps = [], isLoading } = useQuery({
    queryKey: ['event-rsvps', eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rsvps')
        .select(`
          *,
          users(name, email)
        `)
        .eq('event_id', eventId)
        .order('rsvp_time', { ascending: false });

      if (error) throw error;
      return data || [];
    }
  });

  const exportRSVPs = () => {
    const csvContent = [
      ['Name', 'Email', 'RSVP Time', 'Check-in Time', 'Status'],
      ...rsvps.map(rsvp => [
        rsvp.users?.name || 'Unknown',
        rsvp.users?.email || 'Unknown',
        new Date(rsvp.rsvp_time || '').toLocaleDateString(),
        rsvp.checkin_time ? new Date(rsvp.checkin_time).toLocaleDateString() : 'Not checked in',
        rsvp.checkin_time ? 'Attended' : 'RSVP\'d'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `event-rsvps-${eventId}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading RSVPs...</p>
        </CardContent>
      </Card>
    );
  }

  const checkedInCount = rsvps.filter(rsvp => rsvp.checkin_time).length;
  const totalRSVPs = rsvps.length;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            RSVP Management
          </CardTitle>
          <Button onClick={exportRSVPs} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalRSVPs}</div>
            <div className="text-sm text-blue-800">Total RSVPs</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{checkedInCount}</div>
            <div className="text-sm text-green-800">Checked In</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{totalRSVPs - checkedInCount}</div>
            <div className="text-sm text-orange-800">Pending</div>
          </div>
        </div>

        {/* RSVP List */}
        {rsvps.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No RSVPs yet. Share your event to get attendees!
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>RSVP Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rsvps.map((rsvp) => (
                <TableRow key={rsvp.id}>
                  <TableCell className="font-medium">
                    {rsvp.users?.name || 'Unknown'}
                  </TableCell>
                  <TableCell>{rsvp.users?.email || 'Unknown'}</TableCell>
                  <TableCell>
                    {new Date(rsvp.rsvp_time || '').toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {rsvp.checkin_time ? (
                      <Badge className="bg-green-100 text-green-800">
                        <UserCheck className="w-3 h-3 mr-1" />
                        Attended
                      </Badge>
                    ) : (
                      <Badge className="bg-blue-100 text-blue-800">
                        <UserX className="w-3 h-3 mr-1" />
                        RSVP'd
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
