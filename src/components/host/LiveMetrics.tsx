
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { BarChart3 } from 'lucide-react';

interface LiveMetricsProps {
  stats: {
    rsvps: number;
    checkedIn: number;
    totalEngagement: number;
  };
  analyticsData: {
    peakAttendance: number;
    totalMessages: number;
  };
}

export const LiveMetrics = ({ stats, analyticsData }: LiveMetricsProps) => {
  const engagementRate = ((stats.totalEngagement / stats.checkedIn) * 100) || 0;
  const attendanceRate = ((stats.checkedIn / stats.rsvps) * 100) || 0;

  return (
    <Card className="w-full max-w-full border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center font-['Segoe_UI']">
          <BarChart3 className="w-5 h-5 mr-2 text-[#4285F4]" />
          Live Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600 font-medium">Attendance</span>
              <span className="font-bold text-[#34A853]">{stats.checkedIn}/{stats.rsvps}</span>
            </div>
            <Progress value={attendanceRate} className="h-2" />
            <span className="text-xs text-gray-500 font-medium">{attendanceRate.toFixed(1)}% attendance rate</span>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600 font-medium">Engagement</span>
              <span className="font-bold text-[#4285F4]">{stats.totalEngagement}</span>
            </div>
            <Progress value={Math.min(engagementRate, 100)} className="h-2" />
            <span className="text-xs text-gray-500 font-medium">{engagementRate.toFixed(1)} interactions per attendee</span>
          </div>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="text-center p-3 bg-gradient-to-br from-[#34A853]/10 to-green-50 rounded-lg border border-[#34A853]/20">
            <div className="font-bold text-[#34A853] text-lg">{analyticsData.peakAttendance}</div>
            <div className="text-xs text-gray-600 font-medium">Peak Attendance</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-[#4285F4]/10 to-blue-50 rounded-lg border border-[#4285F4]/20">
            <div className="font-bold text-[#4285F4] text-lg">{analyticsData.totalMessages}</div>
            <div className="text-xs text-gray-600 font-medium">Total Messages</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
