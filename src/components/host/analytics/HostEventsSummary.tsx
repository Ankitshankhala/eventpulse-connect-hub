
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Users, CheckCircle, Clock } from 'lucide-react';

interface HostEventsSummaryProps {
  events: any[];
  userRsvps: any[];
}

export const HostEventsSummary = ({ events, userRsvps }: HostEventsSummaryProps) => {
  // Calculate host-specific metrics
  const totalEvents = events.length;
  const totalRsvps = userRsvps.length;
  const completedEvents = events.filter(e => e.status === 'Completed').length;
  const upcomingEvents = events.filter(e => new Date(e.date_time) > new Date() && e.status !== 'Completed').length;
  const averageRsvps = totalEvents > 0 ? Math.round(totalRsvps / totalEvents) : 0;
  const attendedCount = userRsvps.filter(rsvp => rsvp.checkin_time).length;
  const attendanceRate = totalRsvps > 0 ? Math.round((attendedCount / totalRsvps) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{totalEvents}</p>
              <p className="text-xs text-gray-500 mt-1">Events hosted</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total RSVPs</p>
              <p className="text-2xl font-bold text-gray-900">{totalRsvps}</p>
              <p className="text-xs text-gray-500 mt-1">Avg. {averageRsvps} per event</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Events</p>
              <p className="text-2xl font-bold text-gray-900">{completedEvents}</p>
              <p className="text-xs text-gray-500 mt-1">{attendanceRate}% attendance rate</p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingEvents}</p>
              <p className="text-xs text-gray-500 mt-1">Future events</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
