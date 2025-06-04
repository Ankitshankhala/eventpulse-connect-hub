
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Users, UserCheck, UserX, Download, Clock, Check, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

interface RSVPManagementProps {
  eventId: string;
}

export const RSVPManagement = ({ eventId }: RSVPManagementProps) => {
  const queryClient = useQueryClient();
  const [processingRsvp, setProcessingRsvp] = useState<string | null>(null);

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

  const approveRSVP = async (rsvpId: string) => {
    setProcessingRsvp(rsvpId);
    try {
      const { error } = await supabase
        .from('rsvps')
        .update({ status: 'approved' })
        .eq('id', rsvpId);

      if (error) throw error;

      toast({
        title: "RSVP Approved",
        description: "The RSVP has been approved successfully"
      });

      queryClient.invalidateQueries({ queryKey: ['event-rsvps', eventId] });
    } catch (error) {
      console.error('Approve RSVP error:', error);
      toast({
        title: "Approval Failed",
        description: "There was an error approving the RSVP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingRsvp(null);
    }
  };

  const rejectRSVP = async (rsvpId: string) => {
    setProcessingRsvp(rsvpId);
    try {
      const { error } = await supabase
        .from('rsvps')
        .delete()
        .eq('id', rsvpId);

      if (error) throw error;

      toast({
        title: "RSVP Rejected",
        description: "The RSVP has been rejected and removed"
      });

      queryClient.invalidateQueries({ queryKey: ['event-rsvps', eventId] });
    } catch (error) {
      console.error('Reject RSVP error:', error);
      toast({
        title: "Rejection Failed",
        description: "There was an error rejecting the RSVP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingRsvp(null);
    }
  };

  const exportRSVPs = () => {
    const csvContent = [
      ['Name', 'Email', 'RSVP Time', 'Check-in Time', 'Status'],
      ...rsvps.map(rsvp => [
        rsvp.users?.name || 'Unknown',
        rsvp.users?.email || 'Unknown',
        new Date(rsvp.rsvp_time || '').toLocaleDateString(),
        rsvp.checkin_time ? new Date(rsvp.checkin_time).toLocaleDateString() : 'Not checked in',
        rsvp.checkin_time ? 'Attended' : (rsvp.status || 'pending')
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
  const approvedCount = rsvps.filter(rsvp => rsvp.status === 'approved' || rsvp.checkin_time).length;
  const pendingCount = rsvps.filter(rsvp => !rsvp.status || rsvp.status === 'pending').length;
  const totalRSVPs = rsvps.length;

  const getStatusBadge = (rsvp: any) => {
    if (rsvp.checkin_time) {
      return (
        <Badge className="bg-[#34A853]/10 text-[#34A853] border-[#34A853]/20">
          <UserCheck className="w-3 h-3 mr-1" />
          Attended
        </Badge>
      );
    } else if (rsvp.status === 'approved') {
      return (
        <Badge className="bg-[#4285F4]/10 text-[#4285F4] border-[#4285F4]/20">
          <UserCheck className="w-3 h-3 mr-1" />
          Approved
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-[#F4B400]/10 text-[#F4B400] border-[#F4B400]/20">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      );
    }
  };

  return (
    <Card className="border-0 shadow-lg font-['Segoe_UI']">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-lg font-bold text-gray-900">
            <Users className="w-5 h-5 mr-2 text-[#4285F4]" />
            RSVP Management
          </CardTitle>
          <Button onClick={exportRSVPs} variant="outline" size="sm" className="border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4]/10">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-[#4285F4]/10 rounded-lg border border-[#4285F4]/20">
            <div className="text-2xl font-bold text-[#4285F4]">{totalRSVPs}</div>
            <div className="text-sm text-[#4285F4]/80 font-medium">Total RSVPs</div>
          </div>
          <div className="text-center p-4 bg-[#34A853]/10 rounded-lg border border-[#34A853]/20">
            <div className="text-2xl font-bold text-[#34A853]">{approvedCount}</div>
            <div className="text-sm text-[#34A853]/80 font-medium">Approved</div>
          </div>
          <div className="text-center p-4 bg-[#F4B400]/10 rounded-lg border border-[#F4B400]/20">
            <div className="text-2xl font-bold text-[#F4B400]">{pendingCount}</div>
            <div className="text-sm text-[#F4B400]/80 font-medium">Pending</div>
          </div>
          <div className="text-center p-4 bg-[#34A853]/10 rounded-lg border border-[#34A853]/20">
            <div className="text-2xl font-bold text-[#34A853]">{checkedInCount}</div>
            <div className="text-sm text-[#34A853]/80 font-medium">Checked In</div>
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
                <TableHead className="font-semibold text-gray-700">Name</TableHead>
                <TableHead className="font-semibold text-gray-700">Email</TableHead>
                <TableHead className="font-semibold text-gray-700">RSVP Time</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rsvps.map((rsvp) => (
                <TableRow key={rsvp.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    {rsvp.users?.name || 'Unknown'}
                  </TableCell>
                  <TableCell className="text-gray-600">{rsvp.users?.email || 'Unknown'}</TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(rsvp.rsvp_time || '').toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(rsvp)}
                  </TableCell>
                  <TableCell>
                    {(!rsvp.status || rsvp.status === 'pending') && !rsvp.checkin_time && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => approveRSVP(rsvp.id)}
                          disabled={processingRsvp === rsvp.id}
                          className="bg-[#34A853] hover:bg-[#34A853]/90 text-white h-8 px-3"
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => rejectRSVP(rsvp.id)}
                          disabled={processingRsvp === rsvp.id}
                          className="border-[#EA4335] text-[#EA4335] hover:bg-[#EA4335]/10 h-8 px-3"
                        >
                          <X className="w-3 h-3 mr-1" />
                          Reject
                        </Button>
                      </div>
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
