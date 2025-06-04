
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Activity</CardTitle>
          <CardDescription>Your RSVPs and attendance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="rsvps" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="RSVPs"
              />
              <Line 
                type="monotone" 
                dataKey="attended" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Attended"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
          <CardDescription>Events attended in the last 12 weeks</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="events" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
