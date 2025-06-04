
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface AttendanceAnalyticsProps {
  events: any[];
}

const chartConfig = {
  rsvps: {
    label: "RSVPs",
    color: "#3b82f6",
  },
  attended: {
    label: "Attended",
    color: "#10b981",
  },
};

export const AttendanceAnalytics = ({ events }: AttendanceAnalyticsProps) => {
  const attendanceData = events.slice(0, 6).map((event, index) => {
    const rsvps = Math.floor(Math.random() * 50) + 30;
    const attended = Math.floor(rsvps * (Math.random() * 0.3 + 0.7)); // 70-100% attendance
    return {
      name: new Date(event.date_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      rsvps,
      attended,
      noShow: rsvps - attended
    };
  });

  const totalRSVPs = attendanceData.reduce((sum, event) => sum + event.rsvps, 0);
  const totalAttended = attendanceData.reduce((sum, event) => sum + event.attended, 0);
  const totalNoShows = attendanceData.reduce((sum, event) => sum + event.noShow, 0);
  const attendanceRate = Math.round((totalAttended / totalRSVPs) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-600" />
          Attendance Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-blue-50 rounded-lg">
            <UserCheck className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-blue-600">{totalAttended}</p>
            <p className="text-xs text-blue-800">Total Attended</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-green-600">{attendanceRate}%</p>
            <p className="text-xs text-green-800">Attendance Rate</p>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <UserX className="w-6 h-6 text-red-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-red-600">{totalNoShows}</p>
            <p className="text-xs text-red-800">No Shows</p>
          </div>
        </div>

        {/* Chart */}
        <ChartContainer config={chartConfig} className="h-[200px]">
          <AreaChart data={attendanceData}>
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area 
              type="monotone" 
              dataKey="rsvps" 
              stackId="1"
              stroke="var(--color-rsvps)" 
              fill="var(--color-rsvps)"
              fillOpacity={0.3}
            />
            <Area 
              type="monotone" 
              dataKey="attended" 
              stackId="2"
              stroke="var(--color-attended)" 
              fill="var(--color-attended)"
              fillOpacity={0.8}
            />
          </AreaChart>
        </ChartContainer>

        {/* Attendance Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Attendance Rate</span>
            <span className="font-semibold">{attendanceRate}%</span>
          </div>
          <Progress value={attendanceRate} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};
