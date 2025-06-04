
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
    color: "#3b82f6",
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-blue-600" />
          Optimal Event Times
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px]">
          <BarChart data={timeData}>
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            />
            <Bar 
              dataKey="attendance" 
              fill="var(--color-attendance)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
        
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-900">Best Time Slot</p>
              <p className="text-lg font-bold text-green-600">{bestTime.time}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-900">Attendance Rate</p>
              <p className="text-lg font-bold text-green-600">{bestTime.attendance}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
