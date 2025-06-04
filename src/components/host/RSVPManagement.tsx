
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Download } from 'lucide-react';
import { RSVPStats } from './rsvp/RSVPStats';
import { RSVPTable } from './rsvp/RSVPTable';
import { useRSVPExport } from './rsvp/RSVPExport';
import { useRSVPManagement } from './rsvp/useRSVPManagement';

interface RSVPManagementProps {
  eventId: string;
}

export const RSVPManagement = ({ eventId }: RSVPManagementProps) => {
  const { rsvps, isLoading, processingRsvp, approveRSVP, rejectRSVP } = useRSVPManagement(eventId);
  const { exportRSVPs } = useRSVPExport();

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

  return (
    <Card className="border-0 shadow-lg font-['Segoe_UI']">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-lg font-bold text-gray-900">
            <Users className="w-5 h-5 mr-2 text-[#4285F4]" />
            RSVP Management
          </CardTitle>
          <Button 
            onClick={() => exportRSVPs(rsvps, eventId)} 
            variant="outline" 
            size="sm" 
            className="border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4]/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <RSVPStats
          totalRSVPs={totalRSVPs}
          approvedCount={approvedCount}
          pendingCount={pendingCount}
          checkedInCount={checkedInCount}
        />

        <RSVPTable
          rsvps={rsvps}
          processingRsvp={processingRsvp}
          onApprove={approveRSVP}
          onReject={rejectRSVP}
        />
      </CardContent>
    </Card>
  );
};
