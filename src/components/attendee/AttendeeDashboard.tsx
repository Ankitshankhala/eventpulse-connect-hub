import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, LogOut, CheckCircle } from 'lucide-react';
import { LiveEventAttendee } from './LiveEventAttendee';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useRSVP } from '@/hooks/useRSVP';

export const AttendeeDashboard = () => {
  const { user, signOut } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showLiveEvent, setShowLiveEvent] = useState(false);
  const { createRSVP, cancelRSVP, checkInToEvent, loading: rsvpLoading } = useRSVP();

  // Fetch all public events (scheduled and live)
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['public-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          rsvps(count)
        `)
        .in('status', ['Scheduled', 'Live'])
        .order('date_time', { ascending: true });

      if (error) throw error;
      return data || [];
    }
  });

  // Fetch user's RSVPs
  const { data: userRsvps = [] } = useQuery({
    queryKey: ['user-rsvps', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('rsvps')
        .select('event_id, checkin_time')
        .eq('user_id', user.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  const handleRSVP = async (eventId: string) => {
    await createRSVP(eventId);
  };

  const handleCancelRSVP = async (eventId: string) => {
    await cancelRSVP(eventId);
  };

  const handleCheckIn = async (event: any) => {
    if (event.status === 'Live') {
      await checkInToEvent(event.id);
      setSelectedEvent(event);
      setShowLiveEvent(true);
    }
  };

  const getStatusBadge = (event: any) => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <p>Loading events...</p>
      </div>
    );
  }

  const rsvpedEvents = events.filter(e => getRSVPStatus(e.id) !== 'not-rsvped');
  const liveEvents = events.filter(e => e.status === 'Live');
  const upcomingEvents = events.filter(e => new Date(e.date_time) > new Date() && e.status !== 'Live');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EP</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">EventPulse</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Events</h1>
          <p className="text-gray-600">Discover and join amazing events</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">RSVP'd Events</p>
                  <p className="text-2xl font-bold text-gray-900">{rsvpedEvents.length}</p>
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
                  <p className="text-2xl font-bold text-green-600">{liveEvents.length}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</p>
                </div>
                <Clock className="w-8 h-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {events.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No events available at the moment. Check back later!</p>
              </CardContent>
            </Card>
          ) : (
            events.map((event) => {
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
                            onClick={() => handleRSVP(event.id)}
                            disabled={rsvpLoading}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                          >
                            {rsvpLoading ? 'Processing...' : 'RSVP Now'}
                          </Button>
                        )}
                        
                        {rsvpStatus === 'confirmed' && !canCheckIn && (
                          <Button 
                            onClick={() => handleCancelRSVP(event.id)}
                            disabled={rsvpLoading}
                            variant="outline"
                          >
                            {rsvpLoading ? 'Processing...' : 'Cancel RSVP'}
                          </Button>
                        )}
                        
                        {canCheckIn && (
                          <Button 
                            onClick={() => handleCheckIn(event)}
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
            })
          )}
        </div>
      </div>

      {/* Live Event Modal */}
      {showLiveEvent && selectedEvent && (
        <LiveEventAttendee 
          event={selectedEvent}
          onClose={() => setShowLiveEvent(false)}
        />
      )}
    </div>
  );
};
