
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

interface EventStatsCardsProps {
  rsvpedEventsCount: number;
  liveEventsCount: number;
  upcomingEventsCount: number;
}

export const EventStatsCards = ({ 
  rsvpedEventsCount, 
  liveEventsCount, 
  upcomingEventsCount 
}: EventStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="hover-scale">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">RSVP'd Events</p>
              <p className="text-2xl font-bold text-gray-900">{rsvpedEventsCount}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="hover-scale">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Live Events</p>
              <p className="text-2xl font-bold text-green-600">{liveEventsCount}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover-scale">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingEventsCount}</p>
            </div>
            <Clock className="w-8 h-8 text-indigo-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
