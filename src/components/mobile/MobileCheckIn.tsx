
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, MapPin, Calendar, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface MobileCheckInProps {
  eventId: string;
}

export const MobileCheckIn = ({ eventId }: MobileCheckInProps) => {
  const { user } = useAuth();
  const [event, setEvent] = useState<any>(null);
  const [rsvpStatus, setRsvpStatus] = useState<any>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || !eventId) return;

    const fetchEventAndRSVP = async () => {
      try {
        // Fetch event details
        const { data: eventData, error: eventError } = await supabase
          .from('events')
          .select('*')
          .eq('id', eventId)
          .single();

        if (eventError) throw eventError;
        setEvent(eventData);

        // Fetch user's RSVP status
        const { data: rsvpData, error: rsvpError } = await supabase
          .from('rsvps')
          .select('*')
          .eq('event_id', eventId)
          .eq('user_id', user.id)
          .single();

        if (!rsvpError && rsvpData) {
          setRsvpStatus(rsvpData);
          setIsCheckedIn(!!rsvpData.checkin_time);
        }
      } catch (error) {
        console.error('Error fetching event data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventAndRSVP();
  }, [user, eventId]);

  const handleCheckIn = async () => {
    if (!user || !rsvpStatus) return;

    setIsCheckingIn(true);
    try {
      const { error } = await supabase
        .from('rsvps')
        .update({ checkin_time: new Date().toISOString() })
        .eq('id', rsvpStatus.id);

      if (error) throw error;

      setIsCheckedIn(true);
      toast({
        title: "Checked In Successfully!",
        description: "Welcome to the event. Enjoy your time!",
      });
    } catch (error) {
      console.error('Error checking in:', error);
      toast({
        title: "Check-in Failed",
        description: "There was an error checking you in. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCheckingIn(false);
    }
  };

  const isCheckInAvailable = () => {
    if (!event) return false;
    const eventTime = new Date(event.date_time);
    const now = new Date();
    const oneHourBefore = new Date(eventTime.getTime() - 60 * 60 * 1000);
    return now >= oneHourBefore && event.status === 'Live';
  };

  const getEventTime = () => {
    if (!event) return { date: '', time: '' };
    const eventDate = new Date(event.date_time);
    return {
      date: eventDate.toLocaleDateString(),
      time: eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <LoadingSpinner size="lg" text="Loading event details..." />
      </div>
    );
  }

  if (!event || !rsvpStatus) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Event Not Found</h2>
            <p className="text-gray-600">You don't have an RSVP for this event.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { date, time } = getEventTime();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto space-y-6 pt-8">
        {/* Event Details Card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-2">
              <Badge 
                variant={event.status === 'Live' ? 'default' : 'secondary'}
                className={event.status === 'Live' ? 'bg-green-500 animate-pulse' : ''}
              >
                {event.status}
              </Badge>
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">
              {event.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <div className="font-medium">{date}</div>
                <div className="text-sm">{time}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin className="w-5 h-5 text-red-500" />
              <div className="font-medium">{event.location}</div>
            </div>
            
            {event.description && (
              <div className="text-gray-700 text-sm mt-4 p-3 bg-gray-50 rounded-lg">
                {event.description}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Check-in Card */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            {isCheckedIn ? (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-700">
                    You're Checked In!
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Welcome to the event. Enjoy your time!
                  </p>
                </div>
              </div>
            ) : isCheckInAvailable() ? (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Ready to Check In?
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Tap the button below to check in to the event
                  </p>
                  <Button 
                    onClick={handleCheckIn}
                    disabled={isCheckingIn}
                    className="w-full h-12 text-lg"
                    size="lg"
                  >
                    {isCheckingIn ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Checking In...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Check In Now
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Check-in Not Available
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Check-in will be available 1 hour before the event starts
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* RSVP Status */}
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">RSVP Status:</span>
              <Badge variant={rsvpStatus.status === 'confirmed' ? 'default' : 'secondary'}>
                {rsvpStatus.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
