
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
import { Calendar, BarChart3 } from 'lucide-react';

export const AttendeeDashboard = () => {
  const { user } = useAuth();
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

  const rsvpedEvents = events.filter(e => getRSVPStatus(e.id) !== 'not-rsvped');
  const liveEvents = events.filter(e => e.status === 'Live');
  const upcomingEvents = events.filter(e => new Date(e.date_time) > new Date() && e.status !== 'Live');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <AttendeeDashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Events</h1>
          <p className="text-gray-600">Discover and join amazing events</p>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            {/* Quick Stats */}
            <EventStatsCards 
              rsvpedEventsCount={rsvpedEvents.length}
              liveEventsCount={liveEvents.length}
              upcomingEventsCount={upcomingEvents.length}
            />

            {/* Events List */}
            <EventsList 
              events={events}
              userRsvps={userRsvps}
              rsvpLoading={rsvpLoading}
              onRSVP={handleRSVP}
              onCancelRSVP={handleCancelRSVP}
              onCheckIn={handleCheckIn}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <AttendeeAnalyticsDashboard 
              events={events}
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
