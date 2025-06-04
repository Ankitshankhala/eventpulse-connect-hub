
import { Card, CardContent } from '@/components/ui/card';

interface RSVPStatsProps {
  totalRSVPs: number;
  approvedCount: number;
  pendingCount: number;
  checkedInCount: number;
}

export const RSVPStats = ({ totalRSVPs, approvedCount, pendingCount, checkedInCount }: RSVPStatsProps) => {
  return (
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
  );
};
