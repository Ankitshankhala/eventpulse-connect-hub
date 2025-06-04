
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const useNotifications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const createNotification = async (
    userId: string,
    type: string,
    title: string,
    message: string,
    eventId?: string
  ) => {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type,
        title,
        message,
        event_id: eventId
      });

    if (error) {
      console.error('Error creating notification:', error);
      return;
    }

    // Invalidate notifications query to refresh the list
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
  };

  const markAsRead = async (notificationId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error marking notification as read:', error);
      return;
    }

    queryClient.invalidateQueries({ queryKey: ['notifications'] });
  };

  return {
    createNotification,
    markAsRead
  };
};
