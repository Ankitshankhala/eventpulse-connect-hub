
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CreateEventModal } from './CreateEventModal';
import { LiveEventPanel } from './LiveEventPanel';
import { RSVPManagement } from './RSVPManagement';
import { HostAnalyticsDashboard } from './analytics/HostAnalyticsDashboard';
import { HostOverviewTab } from './HostOverviewTab';
import { HostEventsTab } from './HostEventsTab';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { supabase } from '@/integrations/supabase/client';
import { useEventStatusTransitions } from '@/hooks/useEventStatusTransitions';
import { useAutomatedEmailTriggers } from '@/hooks/useAutomatedEmailTriggers';

export const HostDashboard = () => {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showLivePanel, setShowLivePanel] = useState(false);
  const [showRSVPManagement, setShowRSVPManagement] = useState(false);
  const { handleError, retry } = useErrorHandler();

  // Enable automatic status transitions
  useEventStatusTransitions(user?.id);
  
  // Enable automated email triggers
  useAutomatedEmailTriggers();

  // Fetch user's events with better error handling
  const { data: events = [], isLoading, error, refetch } = useQuery({
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
    refetchInterval: 5 * 60 * 1000 // Refetch every 5 minutes
  });

  // Handle errors using useEffect
  useEffect(() => {
    if (error) {
      handleError(error as Error, 'Failed to load your events');
    }
  }, [error, handleError]);

  const handleManageEvent = (event: any) => {
    setSelectedEvent(event);
    if (event.status === 'Live') {
      setShowLivePanel(true);
    } else {
      setShowRSVPManagement(true);
    }
  };

  const handleRetry = () => {
    retry();
    refetch();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <LoadingSpinner 
          size="lg" 
          text="Loading your dashboard..." 
          className="min-h-[50vh]"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Unable to load dashboard
            </h2>
            <p className="text-gray-600 mb-4">
              There was an error loading your events. Please try again.
            </p>
            <Button onClick={handleRetry}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <ErrorBoundary>
            <TabsContent value="overview">
              <HostOverviewTab events={events} />
            </TabsContent>
          </ErrorBoundary>

          <ErrorBoundary>
            <TabsContent value="events">
              <HostEventsTab 
                events={events}
                onCreateEvent={() => setShowCreateModal(true)}
                onManageEvent={handleManageEvent}
              />
            </TabsContent>
          </ErrorBoundary>

          <ErrorBoundary>
            <TabsContent value="analytics">
              <HostAnalyticsDashboard events={events} />
            </TabsContent>
          </ErrorBoundary>
        </Tabs>
      </div>

      {/* Modals */}
      <ErrorBoundary>
        <CreateEventModal 
          open={showCreateModal} 
          onClose={() => setShowCreateModal(false)} 
        />
      </ErrorBoundary>

      {showLivePanel && selectedEvent && (
        <ErrorBoundary>
          <LiveEventPanel 
            event={selectedEvent}
            onClose={() => setShowLivePanel(false)}
          />
        </ErrorBoundary>
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
              <ErrorBoundary>
                <RSVPManagement eventId={selectedEvent.id} />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
