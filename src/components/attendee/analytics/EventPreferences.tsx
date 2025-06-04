
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MapPin, Clock, Users, Zap } from 'lucide-react';

interface EventPreferencesProps {
  events: any[];
  userRsvps: any[];
}

interface LocationData {
  type: string;
  count: number;
  percentage: number;
}

interface DayData {
  day: string;
  count: number;
}

interface SizeData {
  size: string;
  count: number;
}

interface TimeData {
  period: string;
  count: number;
  percentage: number;
}

export const EventPreferences = ({ events, userRsvps }: EventPreferencesProps) => {
  const attendedEvents = events.filter(e => {
    const rsvp = userRsvps.find(r => r.event_id === e.id);
    return rsvp?.checkin_time;
  });

  // Location preferences (Virtual vs Physical)
  const locationPrefs = attendedEvents.reduce((acc, event) => {
    const type = event.location.includes('http') ? 'Virtual' : 'Physical';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const locationData: LocationData[] = Object.entries(locationPrefs).map(([type, count]) => ({
    type,
    count: Number(count),
    percentage: attendedEvents.length > 0 ? (Number(count) / attendedEvents.length) * 100 : 0
  }));

  // Day of week preferences
  const dayPrefs = attendedEvents.reduce((acc, event) => {
    const day = new Date(event.date_time).toLocaleDateString('en-US', { weekday: 'long' });
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const dayData: DayData[] = Object.entries(dayPrefs)
    .map(([day, count]) => ({ day, count: Number(count) }))
    .sort((a, b) => b.count - a.count);

  // Event size preferences (based on max_attendees)
  const sizePrefs = attendedEvents.reduce((acc, event) => {
    const size = !event.max_attendees ? 'Open' : 
                 event.max_attendees <= 20 ? 'Small (≤20)' :
                 event.max_attendees <= 50 ? 'Medium (21-50)' :
                 event.max_attendees <= 100 ? 'Large (51-100)' : 'XLarge (100+)';
    acc[size] = (acc[size] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sizeData: SizeData[] = Object.entries(sizePrefs).map(([size, count]) => ({
    size,
    count: Number(count)
  }));

  // Time pattern analysis
  const timePatterns = attendedEvents.reduce((acc, event) => {
    const hour = new Date(event.date_time).getHours();
    const period = hour < 6 ? 'Early Morning' :
                   hour < 12 ? 'Morning' :
                   hour < 17 ? 'Afternoon' :
                   hour < 21 ? 'Evening' : 'Night';
    acc[period] = (acc[period] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const timeData: TimeData[] = Object.entries(timePatterns).map(([period, count]) => ({
    period,
    count: Number(count),
    percentage: attendedEvents.length > 0 ? (Number(count) / attendedEvents.length) * 100 : 0
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Preferred Location</p>
                <p className="text-lg font-bold text-gray-900">
                  {locationData.length > 0 ? locationData.reduce((max, item) => 
                    item.count > max.count ? item : max
                  ).type : 'N/A'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {locationData.length > 0 ? 
                    `${Math.round(locationData.reduce((max, item) => 
                      item.count > max.count ? item : max
                    ).percentage)}% of events` : ''
                  }
                </p>
              </div>
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Favorite Day</p>
                <p className="text-lg font-bold text-gray-900">
                  {dayData.length > 0 ? dayData[0].day : 'N/A'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {dayData.length > 0 ? `${dayData[0].count} events` : ''}
                </p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Preferred Time</p>
                <p className="text-lg font-bold text-gray-900">
                  {timeData.length > 0 ? timeData.reduce((max, item) => 
                    item.count > max.count ? item : max
                  ).period : 'N/A'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {timeData.length > 0 ? 
                    `${Math.round(timeData.reduce((max, item) => 
                      item.count > max.count ? item : max
                    ).percentage)}% of events` : ''
                  }
                </p>
              </div>
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Preferred Size</p>
                <p className="text-lg font-bold text-gray-900">
                  {sizeData.length > 0 ? sizeData.reduce((max, item) => 
                    item.count > max.count ? item : max
                  ).size : 'N/A'}
                </p>
                <p className="text-xs text-gray-500 mt-1">Most attended size</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Day of Week Preferences</CardTitle>
            <CardDescription>Days you most often attend events</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Size Preferences</CardTitle>
            <CardDescription>Types of events you prefer by size</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sizeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="count"
                  label={({ size, count }) => `${size}: ${count}`}
                >
                  {sizeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Location & Time Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Location Preferences</CardTitle>
            <CardDescription>Virtual vs Physical event attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locationData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{item.type}</span>
                    <span className="text-sm text-gray-500">{item.count} events ({Math.round(item.percentage)}%)</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time of Day Patterns</CardTitle>
            <CardDescription>When you typically attend events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{item.period}</span>
                    <span className="text-sm text-gray-500">{item.count} events ({Math.round(item.percentage)}%)</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
