
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface EmailData {
  templateType: string;
  recipientEmail: string;
  variables: Record<string, string>;
  scheduledFor?: Date;
}

export const useEmailService = () => {
  const { user } = useAuth();

  const queueEmailMutation = useMutation({
    mutationFn: async (emailData: EmailData) => {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase.rpc('queue_email', {
        p_user_id: user.id,
        p_template_type: emailData.templateType,
        p_recipient_email: emailData.recipientEmail,
        p_variables: emailData.variables,
        p_scheduled_for: emailData.scheduledFor?.toISOString()
      });

      if (error) throw error;
    },
    onError: (error) => {
      console.error('Error queueing email:', error);
      toast({
        title: "Email Error",
        description: "Failed to queue email notification",
        variant: "destructive"
      });
    }
  });

  const sendRSVPConfirmation = (userEmail: string, userName: string, eventData: any) => {
    const eventDate = new Date(eventData.date_time);
    
    return queueEmailMutation.mutate({
      templateType: 'rsvp_confirmation',
      recipientEmail: userEmail,
      variables: {
        user_name: userName,
        event_title: eventData.title,
        event_date: eventDate.toLocaleDateString(),
        event_time: eventDate.toLocaleTimeString(),
        event_location: eventData.location
      }
    });
  };

  const sendEventReminder = (userEmail: string, userName: string, eventData: any) => {
    const eventDate = new Date(eventData.date_time);
    
    return queueEmailMutation.mutate({
      templateType: 'event_reminder',
      recipientEmail: userEmail,
      variables: {
        user_name: userName,
        event_title: eventData.title,
        event_date: eventDate.toLocaleDateString(),
        event_time: eventDate.toLocaleTimeString(),
        event_location: eventData.location
      }
    });
  };

  const sendPostEventThanks = (userEmail: string, userName: string, eventTitle: string) => {
    return queueEmailMutation.mutate({
      templateType: 'post_event_thanks',
      recipientEmail: userEmail,
      variables: {
        user_name: userName,
        event_title: eventTitle
      }
    });
  };

  const scheduleEventReminders = async (eventId: string) => {
    // Get all RSVPs for the event
    const { data: rsvps, error } = await supabase
      .from('rsvps')
      .select(`
        *,
        events!inner(title, date_time, location)
      `)
      .eq('event_id', eventId)
      .eq('status', 'confirmed');

    if (error || !rsvps) return;

    const event = rsvps[0]?.events;
    if (!event) return;

    const eventTime = new Date(event.date_time);
    const reminderTime = new Date(eventTime.getTime() - 60 * 60 * 1000); // 1 hour before

    // Schedule reminders for all confirmed attendees
    for (const rsvp of rsvps) {
      // Get user details
      const { data: userData } = await supabase.auth.admin.getUserById(rsvp.user_id);
      
      if (userData.user?.email) {
        queueEmailMutation.mutate({
          templateType: 'event_reminder',
          recipientEmail: userData.user.email,
          variables: {
            user_name: userData.user.user_metadata?.name || 'Attendee',
            event_title: event.title,
            event_date: eventTime.toLocaleDateString(),
            event_time: eventTime.toLocaleTimeString(),
            event_location: event.location
          },
          scheduledFor: reminderTime
        });
      }
    }
  };

  return {
    sendRSVPConfirmation,
    sendEventReminder,
    sendPostEventThanks,
    scheduleEventReminders,
    isQueueing: queueEmailMutation.isPending
  };
};
