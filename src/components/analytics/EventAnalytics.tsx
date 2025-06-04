
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

interface EventAnalyticsProps {
  events: any[];
  userRsvps: any[];
  feedback?: any[];
}

export const EventAnalytics = ({ events, userRsvps, feedback = [] }: EventAnalyticsProps) => {
  // Event status distribution
  const eventStatusData = [
    {
      status: 'Completed',
      count: events.filter(e => new Date(e.date_time) < new Date()).length,
      color: '#10b981'
    },
    {
      status: 'Upcoming',
      count: events.filter(e => new Date(e.date_time) > new Date()).length,
      color: '#3b82f6'
    }
  ];

  // Location type distribution
  const locationData = [
    {
      type: 'Virtual',
      count: events.filter(e => e.location.includes('http')).length,
      color: '#6366f1'
    },
    {
      type: 'Physical',
      count: events.filter(e => !e.location.includes('http')).length,
      color: '#f59e0b'
    }
  ];

  // Monthly event creation trend
  const monthlyEvents = events.reduce((acc, event) => {
    const date = new Date(event.created_at || event.date_time);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    if (!acc[monthKey]) {
      acc[monthKey] = { month: monthName, events: 0, rsvps: 0 };
    }
    
    acc[monthKey].events += 1;
    
    // Add RSVPs for events in this month
    const eventRsvps = userRsvps.filter(rsvp => rsvp.event_id === event.id).length;
    acc[monthKey].rsvps += eventRsvps;
    
    return acc;
  }, {} as Record<string, { month: string; events: number; rsvps: number }>);

  const monthlyData = Object.values(monthlyEvents).sort((a, b) => a.month.localeCompare(b.month));

  // Event size analysis
  const eventSizeData = events.reduce((acc, event) => {
    const rsvpCount = userRsvps.filter(rsvp => rsvp.event_id === event.id).length;
    const size = rsvpCount === 0 ? 'No RSVPs' :
                 rsvpCount <= 10 ? 'Small (≤10)' :
                 rsvpCount <= 25 ? 'Medium (11-25)' :
                 rsvpCount <= 50 ? 'Large (26-50)' : 'XLarge (50+)';
    
    acc[size] = (acc[size] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sizeData = Object.entries(eventSizeData).map(([size, count]) => ({
    size,
    count
  }));

  // Day of week analysis
  const dayOfWeekData = events.reduce((acc, event) => {
    const day = new Date(event.date_time).toLocaleDateString('en-US', { weekday: 'long' });
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const weekData = Object.entries(dayOfWeekData).map(([day, count]) => ({
    day,
    count
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{events.length}</p>
                <p className="text-xs text-gray-500 mt-1">Created events</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Attendance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events.length > 0 ? Math.round(
                    userRsvps.filter(rsvp => rsvp.checkin_time).length / events.length
                  ) : 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">Per event</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Virtual Events</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events.filter(e => e.location.includes('http')).length}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.round((locationData.find(l => l.type === 'Virtual')?.count || 0) / events.length * 100)}% of all events
                </p>
              </div>
              <MapPin className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events.filter(e => new Date(e.date_time) > new Date()).length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Future events</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Event Trends</CardTitle>
            <CardDescription>Events created and RSVPs over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="events" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Events Created"
                />
                <Line 
                  type="monotone" 
                  dataKey="rsvps" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Total RSVPs"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Status Distribution</CardTitle>
            <CardDescription>Completed vs upcoming events</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={eventStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="count"
                  label={({ status, count }) => `${status}: ${count}`}
                >
                  {eventStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Size Distribution</CardTitle>
            <CardDescription>Events by attendance size</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sizeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="size" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Day of Week Popularity</CardTitle>
            <CardDescription>When events are typically scheduled</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weekData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Location & Size Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Location Types</CardTitle>
            <CardDescription>Virtual vs physical events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locationData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{item.type}</span>
                    <span className="text-sm text-gray-500">
                      {item.count} events ({Math.round((item.count / events.length) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        backgroundColor: item.color,
                        width: `${(item.count / events.length) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Performance</CardTitle>
            <CardDescription>Key performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Most Popular Day</span>
                <span className="text-sm font-bold text-blue-600">
                  {weekData.length > 0 ? weekData.reduce((max, day) => day.count > max.count ? day : max).day : 'N/A'}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Average Event Size</span>
                <span className="text-sm font-bold text-green-600">
                  {events.length > 0 ? Math.round(userRsvps.length / events.length) : 0} RSVPs
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Events with Feedback</span>
                <span className="text-sm font-bold text-purple-600">
                  {new Set(feedback.map(f => f.event_id)).size} events
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
