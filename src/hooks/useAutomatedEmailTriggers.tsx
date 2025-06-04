
import { useEffect } from 'react';
import { useEmailService } from './useEmailService';
import { supabase } from '@/integrations/supabase/client';

export const useAutomatedEmailTriggers = () => {
  const { sendRSVPConfirmation, sendPostEventThanks, scheduleEventReminders } = useEmailService();

  useEffect(() => {
    // Listen for new RSVPs to send confirmation emails
    const rsvpChannel = supabase
      .channel('rsvp-notifications')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'rsvps',
          filter: 'status=eq.confirmed'
        }, 
        async (payload) => {
          try {
            // Get event and user details
            const { data: rsvpData } = await supabase
              .from('rsvps')
              .select(`
                *,
                events(*),
                users(name, email)
              `)
              .eq('id', payload.new.id)
              .single();

            if (rsvpData?.events && rsvpData?.users) {
              sendRSVPConfirmation(
                rsvpData.users.email,
                rsvpData.users.name,
                rsvpData.events
              );
            }
          } catch (error) {
            console.error('Error sending RSVP confirmation:', error);
          }
        }
      )
      .subscribe();

    // Listen for event status changes to trigger post-event emails
    const eventChannel = supabase
      .channel('event-status-notifications')
      .on('postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'events',
          filter: 'status=eq.Closed'
        }, 
        async (payload) => {
          try {
            // Get all checked-in attendees for this event
            const { data: attendees } = await supabase
              .from('rsvps')
              .select(`
                *,
                users(name, email)
              `)
              .eq('event_id', payload.new.id)
              .not('checkin_time', 'is', null);

            // Send thank you emails to all attendees
            if (attendees) {
              for (const attendee of attendees) {
                if (attendee.users) {
                  sendPostEventThanks(
                    attendee.users.email,
                    attendee.users.name,
                    payload.new.title
                  );
                }
              }
            }
          } catch (error) {
            console.error('Error sending post-event emails:', error);
          }
        }
      )
      .subscribe();

    // Listen for events going live to schedule reminders
    const liveEventChannel = supabase
      .channel('live-event-notifications')
      .on('postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'events',
          filter: 'status=eq.Live'
        }, 
        async (payload) => {
          try {
            scheduleEventReminders(payload.new.id);
          } catch (error) {
            console.error('Error scheduling event reminders:', error);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(rsvpChannel);
      supabase.removeChannel(eventChannel);
      supabase.removeChannel(liveEventChannel);
    };
  }, [sendRSVPConfirmation, sendPostEventThanks, scheduleEventReminders]);
};
