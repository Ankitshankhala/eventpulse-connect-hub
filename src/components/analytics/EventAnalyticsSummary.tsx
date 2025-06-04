
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

interface EventAnalyticsSummaryProps {
  events: any[];
  userRsvps: any[];
  virtualEventsCount: number;
}

export const EventAnalyticsSummary = ({ events, userRsvps, virtualEventsCount }: EventAnalyticsSummaryProps) => {
  const avgAttendance = events.length > 0 ? Math.round(
    userRsvps.filter(rsvp => rsvp.checkin_time).length / events.length
  ) : 0;

  const upcomingEventsCount = events.filter(e => new Date(e.date_time) > new Date()).length;
  const virtualPercentage = events.length > 0 ? Math.round((virtualEventsCount / events.length) * 100) : 0;

  return (
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
              <p className="text-2xl font-bold text-gray-900">{avgAttendance}</p>
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
              <p className="text-2xl font-bold text-gray-900">{virtualEventsCount}</p>
              <p className="text-xs text-gray-500 mt-1">{virtualPercentage}% of all events</p>
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
              <p className="text-2xl font-bold text-gray-900">{upcomingEventsCount}</p>
              <p className="text-xs text-gray-500 mt-1">Future events</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
