
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RSVPStatusBadge } from './RSVPStatusBadge';
import { RSVPActions } from './RSVPActions';

interface RSVPWithUser {
  id: string;
  event_id: string | null;
  user_id: string | null;
  rsvp_time: string | null;
  checkin_time: string | null;
  status: string | null;
  users: {
    name: string;
    email: string;
  } | null;
}

interface RSVPTableProps {
  rsvps: RSVPWithUser[];
  processingRsvp: string | null;
  onApprove: (rsvpId: string) => void;
  onReject: (rsvpId: string) => void;
}

export const RSVPTable = ({ rsvps, processingRsvp, onApprove, onReject }: RSVPTableProps) => {
  if (rsvps.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No RSVPs yet. Share your event to get attendees!
      </div>
    );
  }

  return (
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
              <RSVPStatusBadge rsvp={rsvp} />
            </TableCell>
            <TableCell>
              {(!rsvp.status || rsvp.status === 'pending') && !rsvp.checkin_time && (
                <RSVPActions
                  rsvpId={rsvp.id}
                  isProcessing={processingRsvp === rsvp.id}
                  onApprove={onApprove}
                  onReject={onReject}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
