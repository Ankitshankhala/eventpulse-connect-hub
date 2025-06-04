
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
    color: "#4285F4",
  },
  attended: {
    label: "Attended",
    color: "#34A853",
  },
  engagement: {
    label: "Engagement Score",
    color: "#F4B400",
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
    <Card className="border-0 shadow-lg min-w-0 font-['Segoe_UI']">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg font-bold text-gray-900">
          <BarChart3 className="w-5 h-5 mr-2 text-[#4285F4]" />
          Event Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full h-[350px]">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                <XAxis 
                  dataKey="name" 
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
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
