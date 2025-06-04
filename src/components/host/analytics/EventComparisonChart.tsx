
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { BarChart3 } from 'lucide-react';

interface EventComparisonChartProps {
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
  engagement: {
    label: "Engagement Score",
    color: "#f59e0b",
  },
};

export const EventComparisonChart = ({ events }: EventComparisonChartProps) => {
  const comparisonData = events.slice(0, 5).map((event) => ({
    name: event.title.length > 15 ? event.title.substring(0, 15) + '...' : event.title,
    rsvps: Math.floor(Math.random() * 50) + 30,
    attended: Math.floor(Math.random() * 40) + 25,
    engagement: Math.floor(Math.random() * 30) + 70
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
          Event Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px]">
          <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar 
              dataKey="rsvps" 
              fill="var(--color-rsvps)" 
              name="RSVPs"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="attended" 
              fill="var(--color-attended)" 
              name="Attended"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="engagement" 
              fill="var(--color-engagement)" 
              name="Engagement Score"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
