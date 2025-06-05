
import { useState } from 'react';
import { LiveEventAttendee } from './LiveEventAttendee';
import { AttendeeDashboardHeader } from './AttendeeDashboardHeader';
import { EventStatsCards } from './EventStatsCards';
import { EventsList } from './EventsList';
import { AttendeeAnalyticsDashboard } from './analytics/AttendeeAnalyticsDashboard';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useRSVP } from '@/hooks/useRSVP';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, BarChart3, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventDiscovery } from '@/components/discovery/EventDiscovery';

export const AttendeeDashboard = () => {
  const { user } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showLiveEvent, setShowLiveEvent] = useState(false);
  const [showDiscovery, setShowDiscovery] = useState(false);
  const { createRSVP, cancelRSVP, checkInToEvent, loading: rsvpLoading } = useRSVP();

  // Fetch only events the user has RSVP'd to
  const { data: myEvents = [], isLoading } = useQuery({
    queryKey: ['my-events', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('rsvps')
        .select(`
          event_id,
          checkin_time,
          events!inner(
            *,
            rsvps(count)
          )
        `)
        .eq('user_id', user.id)
        .in('events.status', ['Scheduled', 'Live'])
        .order('events.date_time', { ascending: true });

      if (error) throw error;
      
      // Transform the data to match the expected format
      return (data || []).map(rsvp => ({
        ...rsvp.events,
        rsvp_status: rsvp.checkin_time ? 'checked-in' : 'confirmed'
      }));
    },
    enabled: !!user
  });

  // Fetch user's RSVPs for the EventsList component
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <p>Loading events...</p>
      </div>
    );
  }

  const getRSVPStatus = (eventId: string) => {
    const rsvp = userRsvps.find(r => r.event_id === eventId);
    if (rsvp) {
      return rsvp.checkin_time ? 'checked-in' : 'confirmed';
    }
    return 'not-rsvped';
  };

  const liveEvents = myEvents.filter(e => e.status === 'Live');
  const upcomingEvents = myEvents.filter(e => new Date(e.date_time) > new Date() && e.status !== 'Live');

  if (showDiscovery) {
    return <EventDiscovery />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <AttendeeDashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Events</h1>
            <p className="text-gray-600">Your registered events and activities</p>
          </div>
          <Button 
            onClick={() => setShowDiscovery(true)}
            className="flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Discover New Events
          </Button>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              My Events
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            {/* Quick Stats */}
            <EventStatsCards 
              rsvpedEventsCount={myEvents.length}
              liveEventsCount={liveEvents.length}
              upcomingEventsCount={upcomingEvents.length}
            />

            {/* Events List */}
            <EventsList 
              events={myEvents}
              userRsvps={userRsvps}
              rsvpLoading={rsvpLoading}
              onRSVP={handleRSVP}
              onCancelRSVP={handleCancelRSVP}
              onCheckIn={handleCheckIn}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <AttendeeAnalyticsDashboard 
              events={myEvents}
              userRsvps={userRsvps}
            />
          </TabsContent>
        </Tabs>
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
