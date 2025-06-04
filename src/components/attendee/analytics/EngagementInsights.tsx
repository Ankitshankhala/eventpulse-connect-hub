
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { MessageSquare, Clock, Calendar, TrendingUp } from 'lucide-react';

interface EngagementInsightsProps {
  events: any[];
  userRsvps: any[];
}

export const EngagementInsights = ({ events, userRsvps }: EngagementInsightsProps) => {
  const rsvpedEvents = events.filter(e => userRsvps.find(r => r.event_id === e.id));
  const checkedInEvents = rsvpedEvents.filter(e => {
    const rsvp = userRsvps.find(r => r.event_id === e.id);
    return rsvp?.checkin_time;
  });

  // Engagement metrics
  const totalRsvps = rsvpedEvents.length;
  const totalAttended = checkedInEvents.length;
  const attendanceRate = totalRsvps > 0 ? (totalAttended / totalRsvps) * 100 : 0;
  
  // Event status breakdown
  const statusData = [
    { name: 'Attended', value: totalAttended, color: '#10b981' },
    { name: 'RSVP\'d Only', value: totalRsvps - totalAttended, color: '#f59e0b' }
  ];

  // Time of day preferences
  const timePreferences = checkedInEvents.reduce((acc, event) => {
    const hour = new Date(event.date_time).getHours();
    const timeSlot = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening';
    acc[timeSlot] = (acc[timeSlot] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const timeData = Object.entries(timePreferences).map(([time, count]) => ({
    time,
    count
  }));

  // Engagement score calculation
  const engagementScore = Math.min(100, Math.round(
    (attendanceRate * 0.4) + 
    (Math.min(totalAttended / 10, 1) * 30) + 
    (Math.min(totalRsvps / 15, 1) * 30)
  ));

  const getEngagementLevel = (score: number) => {
    if (score >= 80) return { level: 'Highly Engaged', color: 'bg-green-500' };
    if (score >= 60) return { level: 'Moderately Engaged', color: 'bg-blue-500' };
    if (score >= 40) return { level: 'Somewhat Engaged', color: 'bg-yellow-500' };
    return { level: 'New Member', color: 'bg-gray-500' };
  };

  const engagement = getEngagementLevel(engagementScore);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Engagement Score</p>
                <p className="text-2xl font-bold text-gray-900">{engagementScore}</p>
                <Badge className={`mt-2 ${engagement.color} text-white`}>
                  {engagement.level}
                </Badge>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-4">
              <Progress value={engagementScore} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(attendanceRate)}%</p>
                <p className="text-xs text-gray-500 mt-1">
                  {totalAttended} of {totalRsvps} events
                </p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Events/Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {checkedInEvents.length > 0 ? Math.round(checkedInEvents.length / Math.max(1, 
                    (new Date().getTime() - new Date(Math.min(...checkedInEvents.map(e => new Date(e.date_time).getTime()))).getTime()) / (1000 * 60 * 60 * 24 * 30)
                  )) : 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">Based on attendance</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Favorite Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {timeData.length > 0 ? timeData.reduce((max, item) => item.count > max.count ? item : max).time : 'N/A'}
                </p>
                <p className="text-xs text-gray-500 mt-1">Most attended time slot</p>
              </div>
              <MessageSquare className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Participation</CardTitle>
            <CardDescription>Breakdown of your event engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {statusData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time Preferences</CardTitle>
            <CardDescription>When you prefer to attend events</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
