
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface RSVPActionsProps {
  rsvpId: string;
  isProcessing: boolean;
  onApprove: (rsvpId: string) => void;
  onReject: (rsvpId: string) => void;
}

export const RSVPActions = ({ rsvpId, isProcessing, onApprove, onReject }: RSVPActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        onClick={() => onApprove(rsvpId)}
        disabled={isProcessing}
        className="bg-[#34A853] hover:bg-[#34A853]/90 text-white h-8 px-3"
      >
        <Check className="w-3 h-3 mr-1" />
        Approve
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => onReject(rsvpId)}
        disabled={isProcessing}
        className="border-[#EA4335] text-[#EA4335] hover:bg-[#EA4335]/10 h-8 px-3"
      >
        <X className="w-3 h-3 mr-1" />
        Reject
      </Button>
    </div>
  );
};
