
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, CheckCircle } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description?: string;
  date_time: string;
  location: string;
  status: string;
  max_attendees?: number;
  rsvps?: any[];
}

interface EventsListProps {
  events: Event[];
  userRsvps: any[];
  rsvpLoading: boolean;
  onRSVP: (eventId: string) => void;
  onCancelRSVP: (eventId: string) => void;
  onCheckIn: (event: Event) => void;
}

export const EventsList = ({ 
  events, 
  userRsvps, 
  rsvpLoading, 
  onRSVP, 
  onCancelRSVP, 
  onCheckIn 
}: EventsListProps) => {
  const getStatusBadge = (event: Event) => {
    if (event.status === 'Live') {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
          Live Now
        </Badge>
      );
    } else if (new Date(event.date_time) > new Date()) {
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Upcoming</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Past</Badge>;
    }
  };

  const getRSVPStatus = (eventId: string) => {
    const rsvp = userRsvps.find(r => r.event_id === eventId);
    if (rsvp) {
      return rsvp.checkin_time ? 'checked-in' : 'confirmed';
    }
    return 'not-rsvped';
  };

  const getRSVPBadge = (status: string) => {
    if (status === 'confirmed') {
      return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
    } else if (status === 'checked-in') {
      return <Badge className="bg-blue-100 text-blue-800">Checked In</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-800">Not RSVP'd</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">No events available at the moment. Check back later!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {events.map((event) => {
        const rsvpStatus = getRSVPStatus(event.id);
        const canCheckIn = event.status === 'Live' && rsvpStatus !== 'not-rsvped';
        
        return (
          <Card key={event.id} className="hover:border-blue-300 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1 mb-4 lg:mb-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                    {getStatusBadge(event)}
                    {getRSVPBadge(rsvpStatus)}
                  </div>
                  
                  {event.description && (
                    <p className="text-gray-600 mb-4">{event.description}</p>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      {formatDate(event.date_time)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      {formatTime(event.date_time)}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                      {event.location.includes('http') ? 'Virtual' : event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-blue-600" />
                      {event.rsvps?.length || 0}{event.max_attendees ? `/${event.max_attendees}` : ''} attending
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {rsvpStatus === 'not-rsvped' && (
                    <Button 
                      onClick={() => onRSVP(event.id)}
                      disabled={rsvpLoading}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      {rsvpLoading ? 'Processing...' : 'RSVP Now'}
                    </Button>
                  )}
                  
                  {rsvpStatus === 'confirmed' && !canCheckIn && (
                    <Button 
                      onClick={() => onCancelRSVP(event.id)}
                      disabled={rsvpLoading}
                      variant="outline"
                    >
                      {rsvpLoading ? 'Processing...' : 'Cancel RSVP'}
                    </Button>
                  )}
                  
                  {canCheckIn && (
                    <Button 
                      onClick={() => onCheckIn(event)}
                      disabled={rsvpLoading}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Join Live Event
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
