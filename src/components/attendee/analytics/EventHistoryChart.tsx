
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface EventHistoryChartProps {
  events: any[];
  userRsvps: any[];
}

interface MonthlyData {
  month: string;
  rsvps: number;
  attended: number;
}

interface WeeklyData {
  week: string;
  events: number;
}

export const EventHistoryChart = ({ events, userRsvps }: EventHistoryChartProps) => {
  const rsvpedEvents = events.filter(e => userRsvps.find(r => r.event_id === e.id));
  
  // Group events by month
  const monthlyData = rsvpedEvents.reduce((acc, event) => {
    const date = new Date(event.date_time);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    if (!acc[monthKey]) {
      acc[monthKey] = { month: monthName, rsvps: 0, attended: 0 };
    }
    
    acc[monthKey].rsvps += 1;
    
    const rsvp = userRsvps.find(r => r.event_id === event.id);
    if (rsvp?.checkin_time) {
      acc[monthKey].attended += 1;
    }
    
    return acc;
  }, {} as Record<string, MonthlyData>);

  const chartData: MonthlyData[] = (Object.values(monthlyData) as MonthlyData[]).sort((a, b) => a.month.localeCompare(b.month));

  // Weekly activity data for the last 12 weeks
  const weeklyData: WeeklyData[] = [];
  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - (i * 7));
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    
    const weekEvents = rsvpedEvents.filter(event => {
      const eventDate = new Date(event.date_time);
      return eventDate >= weekStart && eventDate <= weekEnd;
    });
    
    weeklyData.push({
      week: `Week ${12 - i}`,
      events: weekEvents.length
    });
  }

  return (
    <div className="w-full max-w-full overflow-hidden font-['Segoe_UI']">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg min-w-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-gray-900">Monthly Activity</CardTitle>
            <CardDescription className="text-sm text-gray-600">Your RSVPs and attendance over time</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
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
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontFamily: 'Segoe UI'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rsvps" 
                    stroke="#4285F4" 
                    strokeWidth={3}
                    name="RSVPs"
                    dot={{ fill: '#4285F4', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="attended" 
                    stroke="#34A853" 
                    strokeWidth={3}
                    name="Attended"
                    dot={{ fill: '#34A853', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg min-w-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-gray-900">Weekly Activity</CardTitle>
            <CardDescription className="text-sm text-gray-600">Events attended in the last 12 weeks</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="week" 
                    tick={{ fontSize: 10, fontFamily: 'Segoe UI' }}
                    axisLine={false}
                    tickLine={false}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    tick={{ fontSize: 11, fontFamily: 'Segoe UI' }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontFamily: 'Segoe UI'
                    }} 
                  />
                  <Bar 
                    dataKey="events" 
                    fill="#4285F4" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
