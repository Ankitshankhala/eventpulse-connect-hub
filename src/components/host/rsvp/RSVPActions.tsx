
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface RSVPActionsProps {
  rsvpId: string;
  isProcessing: boolean;
  onApprove: (rsvpId: string) => void;
  onReject: (rsvpId: string) => void;
}

export const RSVPActions = ({ rsvpId, isProcessing, onApprove, onReject }: RSVPActionsProps) => {
  const handleApprove = () => {
    console.log('Approve button clicked for RSVP:', rsvpId);
    onApprove(rsvpId);
  };

  const handleReject = () => {
    console.log('Reject button clicked for RSVP:', rsvpId);
    onReject(rsvpId);
  };

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        onClick={handleApprove}
        disabled={isProcessing}
        className="bg-[#34A853] hover:bg-[#34A853]/90 text-white h-8 px-3"
      >
        <Check className="w-3 h-3 mr-1" />
        {isProcessing ? 'Processing...' : 'Approve'}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={handleReject}
        disabled={isProcessing}
        className="border-[#EA4335] text-[#EA4335] hover:bg-[#EA4335]/10 h-8 px-3"
      >
        <X className="w-3 h-3 mr-1" />
        {isProcessing ? 'Processing...' : 'Reject'}
      </Button>
    </div>
  );
};
