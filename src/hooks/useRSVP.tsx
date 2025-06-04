
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { toast } from '@/hooks/use-toast';

export const useRSVP = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { createNotification } = useNotifications();
  const [loading, setLoading] = useState(false);

  const createRSVP = async (eventId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to RSVP to events",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Get event details for notification
      const { data: event } = await supabase
        .from('events')
        .select('title')
        .eq('id', eventId)
        .single();

      const { error } = await supabase
        .from('rsvps')
        .insert({
          event_id: eventId,
          user_id: user.id,
          rsvp_time: new Date().toISOString()
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already RSVP'd",
            description: "You have already RSVP'd to this event",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "RSVP Confirmed!",
          description: "You have successfully RSVP'd to this event"
        });

        // Create notification
        if (event) {
          await createNotification(
            user.id,
            'rsvp_confirmation',
            'RSVP Confirmed',
            `You have successfully RSVP'd to "${event.title}"`,
            eventId
          );
        }
        
        // Invalidate queries to refresh data
        queryClient.invalidateQueries({ queryKey: ['user-rsvps'] });
        queryClient.invalidateQueries({ queryKey: ['public-events'] });
        queryClient.invalidateQueries({ queryKey: ['host-events'] });
      }
    } catch (error) {
      console.error('RSVP error:', error);
      toast({
        title: "RSVP Failed",
        description: "There was an error processing your RSVP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelRSVP = async (eventId: string) => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('rsvps')
        .delete()
        .eq('event_id', eventId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "RSVP Cancelled",
        description: "Your RSVP has been cancelled"
      });

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['user-rsvps'] });
      queryClient.invalidateQueries({ queryKey: ['public-events'] });
      queryClient.invalidateQueries({ queryKey: ['host-events'] });
    } catch (error) {
      console.error('Cancel RSVP error:', error);
      toast({
        title: "Cancellation Failed",
        description: "There was an error cancelling your RSVP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const checkInToEvent = async (eventId: string) => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('rsvps')
        .update({
          checkin_time: new Date().toISOString()
        })
        .eq('event_id', eventId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Checked In!",
        description: "You have successfully checked in to the event"
      });

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['user-rsvps'] });
    } catch (error) {
      console.error('Check-in error:', error);
      toast({
        title: "Check-in Failed",
        description: "There was an error checking you in. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    createRSVP,
    cancelRSVP,
    checkInToEvent,
    loading
  };
};
