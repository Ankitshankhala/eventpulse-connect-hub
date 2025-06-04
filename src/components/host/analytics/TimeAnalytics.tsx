
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Clock } from 'lucide-react';

interface TimeAnalyticsProps {
  events: any[];
}

const chartConfig = {
  attendance: {
    label: "Attendance Rate",
    color: "#4285F4",
  },
};

export const TimeAnalytics = ({ events }: TimeAnalyticsProps) => {
  const timeData = [
    { time: '9 AM', attendance: 65 },
    { time: '11 AM', attendance: 78 },
    { time: '1 PM', attendance: 85 },
    { time: '3 PM', attendance: 92 },
    { time: '5 PM', attendance: 73 },
    { time: '7 PM', attendance: 81 }
  ];

  const bestTime = timeData.reduce((prev, current) => 
    prev.attendance > current.attendance ? prev : current
  );

  return (
    <Card className="border-0 shadow-lg min-w-0 font-['Segoe_UI']">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg font-bold text-gray-900">
          <Clock className="w-5 h-5 mr-2 text-[#4285F4]" />
          Optimal Event Times
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full h-[200px]">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 11, fontFamily: 'Segoe UI' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 11, fontFamily: 'Segoe UI' }}
                  axisLine={false}
                  tickLine={false}
                  width={30}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  cursor={{ fill: 'rgba(66, 133, 244, 0.1)' }}
                />
                <Bar 
                  dataKey="attendance" 
                  fill="var(--color-attendance)" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="mt-4 p-4 bg-gradient-to-r from-[#34A853]/10 to-green-50 rounded-2xl border border-[#34A853]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#34A853]/80 uppercase tracking-wide">Best Time Slot</p>
              <p className="text-lg font-bold text-[#34A853]">{bestTime.time}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-[#34A853]/80 uppercase tracking-wide">Attendance Rate</p>
              <p className="text-lg font-bold text-[#34A853]">{bestTime.attendance}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
