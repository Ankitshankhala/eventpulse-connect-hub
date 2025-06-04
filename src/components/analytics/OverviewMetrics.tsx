
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, CheckCircle2, MessageSquare, TrendingUp, Clock } from 'lucide-react';

interface OverviewMetricsProps {
  events: any[];
  userRsvps: any[];
  users?: any[];
  feedback?: any[];
}

export const OverviewMetrics = ({ events, userRsvps, users = [], feedback = [] }: OverviewMetricsProps) => {
  const totalEvents = events.length;
  const totalRsvps = userRsvps.length;
  const totalAttendees = userRsvps.filter(rsvp => rsvp.checkin_time).length;
  const totalUsers = users.length;
  const totalFeedback = feedback.length;
  
  const attendanceRate = totalRsvps > 0 ? (totalAttendees / totalRsvps) * 100 : 0;
  
  // Calculate active events (upcoming)
  const upcomingEvents = events.filter(event => new Date(event.date_time) > new Date()).length;
  
  // Calculate this month's stats
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const thisMonthEvents = events.filter(event => {
    const eventDate = new Date(event.date_time);
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  }).length;
  
  const thisMonthRsvps = userRsvps.filter(rsvp => {
    if (!rsvp.rsvp_time) return false;
    const rsvpDate = new Date(rsvp.rsvp_time);
    return rsvpDate.getMonth() === currentMonth && rsvpDate.getFullYear() === currentYear;
  }).length;

  const keyMetrics = [
    {
      title: 'Total Events',
      value: totalEvents,
      description: 'All events created',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: thisMonthEvents > 0 ? `+${thisMonthEvents} this month` : 'No events this month'
    },
    {
      title: 'Total RSVPs',
      value: totalRsvps,
      description: 'All event registrations',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: thisMonthRsvps > 0 ? `+${thisMonthRsvps} this month` : 'No RSVPs this month'
    },
    {
      title: 'Total Attendees',
      value: totalAttendees,
      description: 'People who checked in',
      icon: CheckCircle2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: `${Math.round(attendanceRate)}% attendance rate`
    },
    {
      title: 'Active Users',
      value: totalUsers,
      description: 'Registered users',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: 'Platform members'
    },
    {
      title: 'Feedback Items',
      value: totalFeedback,
      description: 'Total feedback received',
      icon: MessageSquare,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      change: 'Community input'
    },
    {
      title: 'Upcoming Events',
      value: upcomingEvents,
      description: 'Scheduled events',
      icon: Clock,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      change: 'Future events'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
                  <p className="text-xs text-blue-600 mt-1 font-medium">{metric.change}</p>
                </div>
                <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Health</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Attendance Rate</span>
                <span className="text-sm text-gray-500">{Math.round(attendanceRate)}%</span>
              </div>
              <Progress value={attendanceRate} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Event Capacity</span>
                <span className="text-sm text-gray-500">
                  {events.filter(e => e.max_attendees).length} events with limits
                </span>
              </div>
              <Progress 
                value={events.filter(e => e.max_attendees).length > 0 ? 
                  (events.filter(e => e.max_attendees).length / totalEvents) * 100 : 0} 
                className="h-2" 
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">User Engagement</span>
                <span className="text-sm text-gray-500">
                  {totalUsers > 0 ? Math.round((totalRsvps / totalUsers) * 100) / 100 : 0} RSVPs per user
                </span>
              </div>
              <Progress 
                value={totalUsers > 0 ? Math.min(((totalRsvps / totalUsers) / 5) * 100, 100) : 0} 
                className="h-2" 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>At a glance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Average RSVPs per Event</span>
                <span className="text-lg font-bold text-blue-600">
                  {totalEvents > 0 ? Math.round((totalRsvps / totalEvents) * 10) / 10 : 0}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Events This Month</span>
                <span className="text-lg font-bold text-green-600">{thisMonthEvents}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Virtual vs Physical</span>
                <span className="text-lg font-bold text-purple-600">
                  {events.filter(e => e.location.includes('http')).length}:
                  {events.filter(e => !e.location.includes('http')).length}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Feedback Rate</span>
                <span className="text-lg font-bold text-orange-600">
                  {totalAttendees > 0 ? Math.round((totalFeedback / totalAttendees) * 100) : 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
