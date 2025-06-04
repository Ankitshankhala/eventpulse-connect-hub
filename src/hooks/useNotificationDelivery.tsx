
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export type NotificationType = 
  | 'rsvp_confirmation'
  | 'event_reminder' 
  | 'event_update'
  | 'event_cancelled'
  | 'payment_confirmation'
  | 'payment_failed'
  | 'event_starting_soon'
  | 'host_message'
  | 'new_attendee'
  | 'feedback_received';

export type DeliveryMethod = 'in_app' | 'email' | 'both';

interface NotificationPayload {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  eventId?: string;
  metadata?: any;
  deliveryMethod?: DeliveryMethod;
}

export const useNotificationDelivery = () => {
  const { user } = useAuth();

  const sendNotification = async (payload: NotificationPayload) => {
    try {
      const { deliveryMethod = 'both', ...notificationData } = payload;

      // Always create in-app notification
      if (deliveryMethod === 'in_app' || deliveryMethod === 'both') {
        const { error } = await supabase
          .from('notifications')
          .insert({
            user_id: notificationData.userId,
            type: notificationData.type,
            title: notificationData.title,
            message: notificationData.message,
            event_id: notificationData.eventId,
            metadata: notificationData.metadata
          });

        if (error) {
          console.error('Error creating in-app notification:', error);
        }
      }

      // Send email notification if requested
      if (deliveryMethod === 'email' || deliveryMethod === 'both') {
        const { error } = await supabase.functions.invoke('send-notification-email', {
          body: notificationData
        });

        if (error) {
          console.error('Error sending email notification:', error);
        }
      }
    } catch (error) {
      console.error('Error in notification delivery:', error);
    }
  };

  const sendBulkNotifications = async (notifications: NotificationPayload[]) => {
    const promises = notifications.map(notification => sendNotification(notification));
    await Promise.allSettled(promises);
  };

  // Predefined notification templates
  const templates = {
    paymentConfirmed: (eventTitle: string, amount: number, transactionId: string): Partial<NotificationPayload> => ({
      type: 'payment_confirmation',
      title: 'Payment Confirmed',
      message: `Your payment for "${eventTitle}" has been processed successfully.`,
      metadata: { amount, transaction_id: transactionId }
    }),

    eventReminder: (eventTitle: string, eventDate: string): Partial<NotificationPayload> => ({
      type: 'event_reminder',
      title: 'Event Reminder',
      message: `Don't forget about "${eventTitle}" coming up soon!`,
      metadata: { event_date: eventDate }
    }),

    rsvpConfirmed: (eventTitle: string): Partial<NotificationPayload> => ({
      type: 'rsvp_confirmation',
      title: 'RSVP Confirmed',
      message: `Your RSVP for "${eventTitle}" has been confirmed.`
    }),

    newAttendee: (attendeeName: string, eventTitle: string): Partial<NotificationPayload> => ({
      type: 'new_attendee',
      title: 'New Attendee',
      message: `${attendeeName} has RSVP'd to your event "${eventTitle}".`
    }),

    hostMessage: (eventTitle: string, message: string): Partial<NotificationPayload> => ({
      type: 'host_message',
      title: `Message from Event Host`,
      message: `"${eventTitle}": ${message}`
    })
  };

  return {
    sendNotification,
    sendBulkNotifications,
    templates
  };
};
