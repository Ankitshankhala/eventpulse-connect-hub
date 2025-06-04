
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CreateEventModal } from './CreateEventModal';
import { LiveEventPanel } from './LiveEventPanel';
import { RSVPManagement } from './RSVPManagement';
import { HostAnalyticsDashboard } from './analytics/HostAnalyticsDashboard';
import { HostDashboardHeader } from './HostDashboardHeader';
import { HostOverviewTab } from './HostOverviewTab';
import { HostEventsTab } from './HostEventsTab';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEventStatusTransitions } from '@/hooks/useEventStatusTransitions';

export const HostDashboard = () => {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showLivePanel, setShowLivePanel] = useState(false);
  const [showRSVPManagement, setShowRSVPManagement] = useState(false);

  // Enable automatic status transitions
  useEventStatusTransitions(user?.id);

  // Fetch user's events
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['host-events', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          rsvps(count)
        `)
        .eq('host_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes to sync with status transitions
  });

  const handleManageEvent = (event: any) => {
    setSelectedEvent(event);
    if (event.status === 'Live') {
      setShowLivePanel(true);
    } else {
      setShowRSVPManagement(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <HostDashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Host Dashboard</h1>
          <p className="text-gray-600">Manage your events and track engagement</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <HostOverviewTab events={events} />
          </TabsContent>

          <TabsContent value="events">
            <HostEventsTab 
              events={events}
              onCreateEvent={() => setShowCreateModal(true)}
              onManageEvent={handleManageEvent}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <HostAnalyticsDashboard events={events} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <CreateEventModal 
        open={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />

      {showLivePanel && selectedEvent && (
        <LiveEventPanel 
          event={selectedEvent}
          onClose={() => setShowLivePanel(false)}
        />
      )}

      {showRSVPManagement && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">RSVP Management - {selectedEvent.title}</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowRSVPManagement(false)}
              >
                Close
              </Button>
            </div>
            <div className="p-6">
              <RSVPManagement eventId={selectedEvent.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
