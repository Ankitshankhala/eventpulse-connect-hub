
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { supabase } from '@/integrations/supabase/client';

interface EventData {
  title: string;
  description: string;
  date_time: string;
  location: string;
  max_attendees?: number;
  image_url?: string;
}

export const useEventManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useErrorHandler();

  const createEvent = useMutation({
    mutationFn: async (eventData: EventData) => {
      if (!user) throw new Error('User not authenticated');

      setIsLoading(true);
      const { data, error } = await supabase
        .from('events')
        .insert({
          ...eventData,
          host_id: user.id,
          status: 'Scheduled',
          rsvp_deadline: new Date(new Date(eventData.date_time).getTime() - 24 * 60 * 60 * 1000).toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: "Event Created Successfully!",
        description: `"${data.title}" has been created and is now scheduled.`,
      });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['host-events'] });
    },
    onError: (error) => {
      handleError(error, 'Failed to create event. Please try again.');
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  const updateEvent = useMutation({
    mutationFn: async ({ id, ...updates }: EventData & { id: string }) => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', id)
        .eq('host_id', user?.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Event Updated",
        description: "Event has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error) => {
      handleError(error, 'Failed to update event. Please try again.');
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  const deleteEvent = useMutation({
    mutationFn: async (eventId: string) => {
      setIsLoading(true);
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId)
        .eq('host_id', user?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Event Deleted",
        description: "Event has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error) => {
      handleError(error, 'Failed to delete event. Please try again.');
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  return {
    createEvent: createEvent.mutate,
    updateEvent: updateEvent.mutate,
    deleteEvent: deleteEvent.mutate,
    isCreating: createEvent.isPending,
    isUpdating: updateEvent.isPending,
    isDeleting: deleteEvent.isPending,
    isLoading
  };
};
