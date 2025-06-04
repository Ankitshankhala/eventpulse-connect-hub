
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface EventPerformanceChartProps {
  events: any[];
}

const chartConfig = {
  attendance: {
    label: "Attendance Rate",
    color: "#3b82f6",
  },
  engagement: {
    label: "Engagement Score",
    color: "#10b981",
  },
};

export const EventPerformanceChart = ({ events }: EventPerformanceChartProps) => {
  // Generate mock performance data based on events
  const performanceData = events.slice(0, 6).map((event, index) => ({
    name: event.title.length > 15 ? event.title.substring(0, 15) + '...' : event.title,
    attendance: Math.floor(Math.random() * 40) + 60, // 60-100%
    engagement: Math.floor(Math.random() * 30) + 70,  // 70-100
    date: new Date(event.date_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Event Performance Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <LineChart data={performanceData}>
            <XAxis 
              dataKey="date" 
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
              cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
            />
            <Line 
              type="monotone" 
              dataKey="attendance" 
              stroke="var(--color-attendance)" 
              strokeWidth={3}
              dot={{ fill: "var(--color-attendance)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "var(--color-attendance)", strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="engagement" 
              stroke="var(--color-engagement)" 
              strokeWidth={3}
              dot={{ fill: "var(--color-engagement)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "var(--color-engagement)", strokeWidth: 2 }}
            />
          </LineChart>
        </ChartContainer>
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Attendance Rate</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Engagement Score</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
