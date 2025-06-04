
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RecentEventsListProps {
  events: any[];
}

export const RecentEventsList = ({ events }: RecentEventsListProps) => {
  const getStatusBadge = (status: string) => {
    if (status === 'Live') {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
          Live
        </Badge>
      );
    } else if (status === 'Scheduled') {
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Scheduled</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Closed</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Events</CardTitle>
        <CardDescription>Your latest events at a glance</CardDescription>
      </CardHeader>
      <CardContent>
        {events.slice(0, 3).map((event) => (
          <div key={event.id} className="flex items-center justify-between p-3 border-b last:border-b-0">
            <div>
              <h4 className="font-medium">{event.title}</h4>
              <p className="text-sm text-gray-600">{formatDate(event.date_time)}</p>
            </div>
            {getStatusBadge(event.status)}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
