
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useEnhancedNotifications } from '@/hooks/useEnhancedNotifications';

export const useNotifications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { createNotification: createEnhancedNotification } = useEnhancedNotifications();

  const createNotification = async (
    userId: string,
    type: string,
    title: string,
    message: string,
    eventId?: string,
    metadata?: any
  ) => {
    try {
      createEnhancedNotification({
        userId,
        type,
        title,
        message,
        eventId,
        metadata
      });
    } catch (error) {
      console.error('Error creating notification:', error);
    }
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
    queryClient.invalidateQueries({ queryKey: ['enhanced-notifications'] });
  };

  return {
    createNotification,
    markAsRead
  };
};
