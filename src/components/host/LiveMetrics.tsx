
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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
          Live Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Attendance</span>
              <span className="font-semibold text-green-600">{stats.checkedIn}/{stats.rsvps}</span>
            </div>
            <Progress value={attendanceRate} className="h-2" />
            <span className="text-xs text-gray-500">{attendanceRate.toFixed(1)}% attendance rate</span>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Engagement</span>
              <span className="font-semibold text-blue-600">{stats.totalEngagement}</span>
            </div>
            <Progress value={Math.min(engagementRate, 100)} className="h-2" />
            <span className="text-xs text-gray-500">{engagementRate.toFixed(1)} interactions per attendee</span>
          </div>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="text-center p-2 bg-green-50 rounded">
            <div className="font-semibold text-green-600">{analyticsData.peakAttendance}</div>
            <div className="text-xs text-gray-600">Peak Attendance</div>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded">
            <div className="font-semibold text-blue-600">{analyticsData.totalMessages}</div>
            <div className="text-xs text-gray-600">Total Messages</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
