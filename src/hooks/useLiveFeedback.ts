
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface LiveFeedback {
  id: string;
  user_id: string;
  event_id: string;
  comment: string;
  emoji: string;
  timestamp: string;
  is_pinned: boolean;
  is_flagged: boolean;
}

export const useLiveFeedback = (eventId: string) => {
  const [feedback, setFeedback] = useState<LiveFeedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;

    // Initial fetch
    const fetchFeedback = async () => {
      try {
        const { data, error } = await supabase
          .from('feedback')
          .select('*')
          .eq('event_id', eventId)
          .order('timestamp', { ascending: false });

        if (error) throw error;
        setFeedback(data || []);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();

    // Set up real-time subscription
    const channel = supabase
      .channel(`feedback-${eventId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'feedback',
          filter: `event_id=eq.${eventId}`
        },
        (payload) => {
          console.log('New feedback received:', payload);
          setFeedback(prev => [payload.new as LiveFeedback, ...prev]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'feedback',
          filter: `event_id=eq.${eventId}`
        },
        (payload) => {
          console.log('Feedback updated:', payload);
          setFeedback(prev => prev.map(item => 
            item.id === payload.new.id ? payload.new as LiveFeedback : item
          ));
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'feedback',
          filter: `event_id=eq.${eventId}`
        },
        (payload) => {
          console.log('Feedback deleted:', payload);
          setFeedback(prev => prev.filter(item => item.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventId]);

  const addFeedback = async (comment: string, emoji: string, userId: string) => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .insert({
          event_id: eventId,
          user_id: userId,
          comment,
          emoji
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error adding feedback:', error);
      return { success: false, error };
    }
  };

  const updateFeedback = async (feedbackId: string, updates: Partial<LiveFeedback>) => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .update(updates)
        .eq('id', feedbackId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating feedback:', error);
      return { success: false, error };
    }
  };

  const deleteFeedback = async (feedbackId: string) => {
    try {
      const { error } = await supabase
        .from('feedback')
        .delete()
        .eq('id', feedbackId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting feedback:', error);
      return { success: false, error };
    }
  };

  return {
    feedback,
    isLoading,
    addFeedback,
    updateFeedback,
    deleteFeedback
  };
};
