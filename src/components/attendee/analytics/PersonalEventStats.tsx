
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, CheckCircle2, Trophy, Target, Users } from 'lucide-react';

interface PersonalEventStatsProps {
  events: any[];
  userRsvps: any[];
}

export const PersonalEventStats = ({ events, userRsvps }: PersonalEventStatsProps) => {
  const rsvpedEvents = events.filter(e => userRsvps.find(r => r.event_id === e.id));
  const checkedInEvents = rsvpedEvents.filter(e => {
    const rsvp = userRsvps.find(r => r.event_id === e.id);
    return rsvp?.checkin_time;
  });
  
  const upcomingRsvps = rsvpedEvents.filter(e => new Date(e.date_time) > new Date()).length;
  const attendanceRate = rsvpedEvents.length > 0 ? (checkedInEvents.length / rsvpedEvents.length) * 100 : 0;
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthEvents = checkedInEvents.filter(e => {
    const eventDate = new Date(e.date_time);
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  }).length;

  const stats = [
    {
      title: 'Total Events Attended',
      value: checkedInEvents.length,
      description: 'Events you\'ve checked into',
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'RSVP\'d Events',
      value: rsvpedEvents.length,
      description: 'Events you\'ve signed up for',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Attendance Rate',
      value: `${Math.round(attendanceRate)}%`,
      description: 'How often you attend events you RSVP to',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'This Month',
      value: thisMonthEvents,
      description: 'Events attended this month',
      icon: Trophy,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Upcoming Events',
      value: upcomingRsvps,
      description: 'Events you\'re signed up for',
      icon: Clock,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
