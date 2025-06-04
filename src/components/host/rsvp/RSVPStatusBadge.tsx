
import { Badge } from '@/components/ui/badge';
import { UserCheck, Clock } from 'lucide-react';

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

interface RSVPStatusBadgeProps {
  rsvp: RSVPWithUser;
}

export const RSVPStatusBadge = ({ rsvp }: RSVPStatusBadgeProps) => {
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
