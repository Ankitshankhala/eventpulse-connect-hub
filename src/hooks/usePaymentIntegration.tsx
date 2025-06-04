
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNotificationDelivery } from './useNotificationDelivery';

interface PaymentRequest {
  eventId: string;
  amount: number;
  currency?: string;
}

export const usePaymentIntegration = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { sendNotification, templates } = useNotificationDelivery();
  const [isProcessing, setIsProcessing] = useState(false);

  const createPaymentSession = async ({ eventId, amount, currency = 'usd' }: PaymentRequest) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to purchase event tickets.",
        variant: "destructive"
      });
      return null;
    }

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment-session', {
        body: {
          eventId,
          amount,
          currency,
          successUrl: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/payment-cancelled`
        }
      });

      if (error) throw error;

      // Open Stripe checkout in a new tab
      if (data.url) {
        window.open(data.url, '_blank');
      }

      return data;
    } catch (error) {
      console.error('Error creating payment session:', error);
      toast({
        title: "Payment Error",
        description: "Unable to process payment. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = async (sessionId: string, eventId: string, amount: number) => {
    try {
      // Create RSVP for the paid event
      const { error: rsvpError } = await supabase
        .from('rsvps')
        .insert({
          event_id: eventId,
          user_id: user!.id,
          rsvp_time: new Date().toISOString()
        });

      if (rsvpError) {
        console.error('Error creating RSVP:', rsvpError);
      }

      // Get event details for notification
      const { data: event } = await supabase
        .from('events')
        .select('title, host_id')
        .eq('id', eventId)
        .single();

      // Get user details for notifications
      const { data: userData } = await supabase
        .from('users')
        .select('name')
        .eq('id', user!.id)
        .single();

      if (event) {
        // Send payment confirmation to attendee
        const paymentTemplate = templates.paymentConfirmed(event.title, amount, sessionId);
        await sendNotification({
          userId: user!.id,
          type: paymentTemplate.type!,
          title: paymentTemplate.title!,
          message: paymentTemplate.message!,
          eventId,
          metadata: paymentTemplate.metadata,
          deliveryMethod: 'both'
        });

        // Notify host of new paid attendee
        if (event.host_id !== user!.id) {
          const attendeeTemplate = templates.newAttendee(
            userData?.name || user!.email, 
            event.title
          );
          await sendNotification({
            userId: event.host_id,
            type: attendeeTemplate.type!,
            title: attendeeTemplate.title!,
            message: attendeeTemplate.message!,
            eventId,
            deliveryMethod: 'in_app'
          });
        }
      }

      toast({
        title: "Payment Successful!",
        description: "Your ticket has been purchased and RSVP confirmed."
      });
    } catch (error) {
      console.error('Error handling payment success:', error);
    }
  };

  return {
    createPaymentSession,
    handlePaymentSuccess,
    isProcessing
  };
};
