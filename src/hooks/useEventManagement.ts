
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export const useEventManagement = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const updateEvent = async (eventId: string, updates: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to update events",
        variant: "destructive"
      });
      return { error: new Error("Authentication required") };
    }

    setLoading(true);
    try {
      // First check if user is the host of this event
      const { data: event, error: fetchError } = await supabase
        .from('events')
        .select('host_id')
        .eq('id', eventId)
        .single();

      if (fetchError) throw fetchError;

      if (event.host_id !== user.id) {
        toast({
          title: "Unauthorized",
          description: "You can only modify your own events",
          variant: "destructive"
        });
        return { error: new Error("Unauthorized: You can only modify your own events") };
      }

      // Update the event
      const { error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', eventId)
        .eq('host_id', user.id); // Double check authorization

      if (error) throw error;

      toast({
        title: "Event Updated",
        description: "Your event has been successfully updated"
      });

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['host-events'] });
      queryClient.invalidateQueries({ queryKey: ['public-events'] });
      
      return { error: null };
    } catch (error) {
      console.error('Update event error:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating your event. Please try again.",
        variant: "destructive"
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (eventId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to delete events",
        variant: "destructive"
      });
      return { error: new Error("Authentication required") };
    }

    setLoading(true);
    try {
      // First check if user is the host of this event
      const { data: event, error: fetchError } = await supabase
        .from('events')
        .select('host_id')
        .eq('id', eventId)
        .single();

      if (fetchError) throw fetchError;

      if (event.host_id !== user.id) {
        toast({
          title: "Unauthorized",
          description: "You can only delete your own events",
          variant: "destructive"
        });
        return { error: new Error("Unauthorized: You can only delete your own events") };
      }

      // Delete the event
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId)
        .eq('host_id', user.id); // Double check authorization

      if (error) throw error;

      toast({
        title: "Event Deleted",
        description: "Your event has been successfully deleted"
      });

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['host-events'] });
      queryClient.invalidateQueries({ queryKey: ['public-events'] });
      
      return { error: null };
    } catch (error) {
      console.error('Delete event error:', error);
      toast({
        title: "Delete Failed",
        description: "There was an error deleting your event. Please try again.",
        variant: "destructive"
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  return {
    updateEvent,
    deleteEvent,
    loading
  };
};
