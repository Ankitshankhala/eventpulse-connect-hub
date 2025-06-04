
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MessageSquare, Heart, ThumbsUp } from 'lucide-react';

interface EngagementMetricsProps {
  events: any[];
}

const engagementTypes = [
  { name: 'Messages', value: 45, color: '#4285F4' },
  { name: 'Reactions', value: 30, color: '#34A853' },
  { name: 'Questions', value: 25, color: '#F4B400' }
];

const chartConfig = {
  messages: {
    label: "Messages",
    color: "#4285F4",
  },
  reactions: {
    label: "Reactions",
    color: "#34A853",
  },
  questions: {
    label: "Questions",
    color: "#F4B400",
  },
};

export const EngagementMetrics = ({ events }: EngagementMetricsProps) => {
  const engagementData = events.slice(0, 5).map((event, index) => ({
    name: event.title.length > 8 ? event.title.substring(0, 8) + '...' : event.title,
    messages: Math.floor(Math.random() * 50) + 20,
    reactions: Math.floor(Math.random() * 30) + 15,
    questions: Math.floor(Math.random() * 20) + 5
  }));

  return (
    <div className="w-full max-w-full overflow-hidden font-['Segoe_UI']">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Messages</p>
                <p className="text-xl font-bold text-[#4285F4] truncate">1,247</p>
                <p className="text-xs text-[#34A853] font-medium">+12% from last month</p>
              </div>
              <div className="flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-[#4285F4]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Reactions</p>
                <p className="text-xl font-bold text-[#34A853] truncate">892</p>
                <p className="text-xs text-[#34A853] font-medium">+8% from last month</p>
              </div>
              <div className="flex-shrink-0">
                <Heart className="w-6 h-6 text-[#34A853]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Questions Asked</p>
                <p className="text-xl font-bold text-[#F4B400] truncate">234</p>
                <p className="text-xs text-[#34A853] font-medium">+15% from last month</p>
              </div>
              <div className="flex-shrink-0">
                <ThumbsUp className="w-6 h-6 text-[#F4B400]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg min-w-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-gray-900">Engagement by Event</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 10, fontFamily: 'Segoe UI' }}
                      axisLine={false}
                      tickLine={false}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      tick={{ fontSize: 11, fontFamily: 'Segoe UI' }}
                      axisLine={false}
                      tickLine={false}
                      width={40}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="messages" fill="var(--color-messages)" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="reactions" fill="var(--color-reactions)" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="questions" fill="var(--color-questions)" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg min-w-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-gray-900">Engagement Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                    <Pie
                      data={engagementTypes}
                      cx="50%"
                      cy="45%"
                      innerRadius={50}
                      outerRadius={90}
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
                            <div className="bg-white p-3 border rounded-lg shadow-lg">
                              <p className="font-semibold text-gray-900">{payload[0].payload.name}</p>
                              <p className="text-sm text-gray-600">{payload[0].value}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="flex justify-center flex-wrap gap-4 mt-4">
              {engagementTypes.map((type) => (
                <div key={type.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2 flex-shrink-0" 
                    style={{ backgroundColor: type.color }}
                  ></div>
                  <span className="text-sm text-gray-600 font-medium">{type.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
