
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Users, ExternalLink, Video } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRSVP } from '@/hooks/useRSVP';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface EventCardProps {
  event: any;
}

export const EventCard = ({ event }: EventCardProps) => {
  const { user } = useAuth();
  const { createRSVP, cancelRSVP, loading: rsvpLoading } = useRSVP();

  // Check if user has RSVP'd to this event
  const { data: userRsvp } = useQuery({
    queryKey: ['user-event-rsvp', event.id, user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .eq('event_id', event.id)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const getStatusBadge = () => {
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

  const handleRSVP = () => {
    if (userRsvp) {
      cancelRSVP(event.id);
    } else {
      createRSVP(event.id);
    }
  };

  const isEventFull = event.max_attendees && event.rsvps?.length >= event.max_attendees;
  const isEventPast = new Date(event.date_time) < new Date();
  const canRSVP = !isEventPast && !isEventFull;

  // Check if this is an online event with a meeting link
  const isOnlineEvent = event.location && (
    event.location.includes('http') || 
    event.location.includes('zoom.us') || 
    event.location.includes('meet.google.com')
  );

  const getMeetingLink = () => {
    if (isOnlineEvent) {
      const urlMatch = event.location.match(/(https?:\/\/[^\s|]+)/);
      return urlMatch ? urlMatch[1] : event.location;
    }
    return null;
  };

  const getLocationDisplay = () => {
    if (isOnlineEvent) {
      if (event.location.includes('zoom.us')) return 'Virtual Event (Zoom)';
      if (event.location.includes('meet.google.com')) return 'Virtual Event (Google Meet)';
      return 'Virtual Event';
    }
    return event.location;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">{event.title}</h3>
          {getStatusBadge()}
        </div>
        {event.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2 text-blue-600" />
          {formatDate(event.date_time)}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2 text-blue-600" />
          {formatTime(event.date_time)}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          {isOnlineEvent ? (
            <Video className="w-4 h-4 mr-2 text-blue-600" />
          ) : (
            <MapPin className="w-4 h-4 mr-2 text-blue-600" />
          )}
          <span className="truncate">{getLocationDisplay()}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Users className="w-4 h-4 mr-2 text-blue-600" />
          {event.rsvps?.length || 0}{event.max_attendees ? `/${event.max_attendees}` : ''} attending
        </div>

        {event.users?.name && (
          <div className="text-sm text-gray-500">
            Hosted by <span className="font-medium">{event.users.name}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3">
        {!user ? (
          <div className="w-full text-center text-sm text-gray-500">
            Please log in to RSVP
          </div>
        ) : (
          <div className="w-full space-y-2">
            {canRSVP && (
              <Button 
                onClick={handleRSVP}
                disabled={rsvpLoading}
                className={`w-full ${
                  userRsvp 
                    ? 'bg-gray-600 hover:bg-gray-700' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                }`}
              >
                {rsvpLoading ? 'Processing...' : userRsvp ? 'Cancel RSVP' : 'RSVP Now'}
              </Button>
            )}
            
            {userRsvp && (
              <Badge className="w-full justify-center bg-green-100 text-green-800">
                You're registered!
              </Badge>
            )}
            
            {isEventFull && !userRsvp && (
              <Badge className="w-full justify-center bg-red-100 text-red-800">
                Event Full
              </Badge>
            )}
            
            {isEventPast && (
              <Badge className="w-full justify-center bg-gray-100 text-gray-800">
                Event Ended
              </Badge>
            )}

            {isOnlineEvent && getMeetingLink() && (userRsvp || event.status === 'Live') && (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => window.open(getMeetingLink(), '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Join Meeting
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
