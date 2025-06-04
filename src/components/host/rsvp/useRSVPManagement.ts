
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

interface RSVPWithUser {
  id: string;
  event_id: string | null;
  user_id: string | null;
  rsvp_time: string | null;
  checkin_time: string | null;
  status: string | null;
  users: {
    name: string;
    email: string;
  } | null;
}

export const useRSVPManagement = (eventId: string) => {
  const queryClient = useQueryClient();
  const [processingRsvp, setProcessingRsvp] = useState<string | null>(null);

  // Fetch RSVPs for the event
  const { data: rsvps = [], isLoading } = useQuery({
    queryKey: ['event-rsvps', eventId],
    queryFn: async () => {
      console.log('Fetching RSVPs for event:', eventId);
      const { data, error } = await supabase
        .from('rsvps')
        .select(`
          *,
          users(name, email)
        `)
        .eq('event_id', eventId)
        .order('rsvp_time', { ascending: false });

      if (error) {
        console.error('Error fetching RSVPs:', error);
        throw error;
      }
      console.log('Fetched RSVPs:', data);
      return (data || []) as RSVPWithUser[];
    }
  });

  const approveRSVP = async (rsvpId: string) => {
    console.log('Approving RSVP:', rsvpId);
    setProcessingRsvp(rsvpId);
    try {
      const { data, error } = await supabase
        .from('rsvps')
        .update({ status: 'approved' })
        .eq('id', rsvpId)
        .select();

      if (error) {
        console.error('Approve RSVP error:', error);
        throw error;
      }

      console.log('RSVP approved successfully:', data);

      toast({
        title: "RSVP Approved",
        description: "The RSVP has been approved successfully"
      });

      // Invalidate and refetch the query
      await queryClient.invalidateQueries({ queryKey: ['event-rsvps', eventId] });
    } catch (error) {
      console.error('Approve RSVP error:', error);
      toast({
        title: "Approval Failed",
        description: "There was an error approving the RSVP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingRsvp(null);
    }
  };

  const rejectRSVP = async (rsvpId: string) => {
    console.log('Rejecting RSVP:', rsvpId);
    setProcessingRsvp(rsvpId);
    try {
      const { error } = await supabase
        .from('rsvps')
        .delete()
        .eq('id', rsvpId);

      if (error) {
        console.error('Reject RSVP error:', error);
        throw error;
      }

      console.log('RSVP rejected successfully');

      toast({
        title: "RSVP Rejected",
        description: "The RSVP has been rejected and removed"
      });

      // Invalidate and refetch the query
      await queryClient.invalidateQueries({ queryKey: ['event-rsvps', eventId] });
    } catch (error) {
      console.error('Reject RSVP error:', error);
      toast({
        title: "Rejection Failed",
        description: "There was an error rejecting the RSVP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingRsvp(null);
    }
  };

  return {
    rsvps,
    isLoading,
    processingRsvp,
    approveRSVP,
    rejectRSVP
  };
};
