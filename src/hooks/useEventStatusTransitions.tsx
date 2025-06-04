
import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useEventStatusTransitions = (userId?: string) => {
  const queryClient = useQueryClient();

  // Check for events that need status updates every 5 minutes
  useEffect(() => {
    if (!userId) return;

    const checkStatusTransitions = async () => {
      try {
        // Get events that might need status updates
        const { data: events, error } = await supabase
          .from('events')
          .select('*')
          .eq('host_id', userId)
          .in('status', ['Scheduled', 'Live']);

        if (error) throw error;

        const now = new Date();
        const updates = [];

        for (const event of events || []) {
          const eventDate = new Date(event.date_time);
          const eventEndTime = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000); // Assume 2 hour duration

          // Auto-close events that have ended (2 hours after start time)
          if (event.status === 'Live' && now > eventEndTime) {
            updates.push({
              id: event.id,
              status: 'Closed',
              reason: 'auto-closed after event duration'
            });
          }
        }

        // Apply updates
        for (const update of updates) {
          await supabase
            .from('events')
            .update({ status: update.status })
            .eq('id', update.id);

          console.log(`Event ${update.id} ${update.reason}`);
        }

        // Invalidate queries to refresh data if updates were made
        if (updates.length > 0) {
          queryClient.invalidateQueries({ queryKey: ['host-events', userId] });
        }
      } catch (error) {
        console.error('Error checking status transitions:', error);
      }
    };

    // Run immediately
    checkStatusTransitions();

    // Set up interval to check every 5 minutes
    const interval = setInterval(checkStatusTransitions, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [userId, queryClient]);
};
