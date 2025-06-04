
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MessageSquare, Heart, ThumbsUp } from 'lucide-react';

interface EngagementMetricsProps {
  events: any[];
}

const engagementTypes = [
  { name: 'Messages', value: 45, color: '#3b82f6' },
  { name: 'Reactions', value: 30, color: '#10b981' },
  { name: 'Questions', value: 25, color: '#f59e0b' }
];

const chartConfig = {
  messages: {
    label: "Messages",
    color: "#3b82f6",
  },
  reactions: {
    label: "Reactions",
    color: "#10b981",
  },
  questions: {
    label: "Questions",
    color: "#f59e0b",
  },
};

export const EngagementMetrics = ({ events }: EngagementMetricsProps) => {
  const engagementData = events.slice(0, 5).map((event, index) => ({
    name: event.title.length > 12 ? event.title.substring(0, 12) + '...' : event.title,
    messages: Math.floor(Math.random() * 50) + 20,
    reactions: Math.floor(Math.random() * 30) + 15,
    questions: Math.floor(Math.random() * 20) + 5
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Messages</p>
                <p className="text-2xl font-bold text-blue-600">1,247</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reactions</p>
                <p className="text-2xl font-bold text-green-600">892</p>
                <p className="text-xs text-green-600">+8% from last month</p>
              </div>
              <Heart className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Questions Asked</p>
                <p className="text-2xl font-bold text-orange-600">234</p>
                <p className="text-xs text-green-600">+15% from last month</p>
              </div>
              <ThumbsUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement by Event</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={engagementData}>
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
                <Bar dataKey="messages" fill="var(--color-messages)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="reactions" fill="var(--color-reactions)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="questions" fill="var(--color-questions)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <Pie
                  data={engagementTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {engagementTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border rounded shadow">
                          <p className="font-medium">{payload[0].payload.name}</p>
                          <p className="text-sm">{payload[0].value}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ChartContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {engagementTypes.map((type) => (
                <div key={type.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: type.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{type.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
