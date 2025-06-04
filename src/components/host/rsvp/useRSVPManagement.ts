
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
    console.log('=== APPROVE RSVP START ===');
    console.log('RSVP ID:', rsvpId);
    console.log('Event ID:', eventId);
    
    if (!rsvpId) {
      console.error('No RSVP ID provided');
      toast({
        title: "Error",
        description: "Invalid RSVP ID",
        variant: "destructive"
      });
      return;
    }
    
    setProcessingRsvp(rsvpId);
    
    try {
      // First, let's check if the RSVP exists
      const { data: existingRsvp, error: fetchError } = await supabase
        .from('rsvps')
        .select('*')
        .eq('id', rsvpId)
        .single();

      if (fetchError) {
        console.error('Error fetching RSVP before update:', fetchError);
        if (fetchError.code === 'PGRST116') {
          toast({
            title: "RSVP Not Found",
            description: "The RSVP record could not be found",
            variant: "destructive"
          });
          return;
        }
        throw fetchError;
      }

      console.log('Existing RSVP before update:', existingRsvp);

      // Now update the RSVP status
      const { data: updatedData, error: updateError } = await supabase
        .from('rsvps')
        .update({ 
          status: 'approved'
        })
        .eq('id', rsvpId)
        .select('*');

      if (updateError) {
        console.error('Update RSVP error:', updateError);
        throw updateError;
      }

      console.log('RSVP update result:', updatedData);

      if (!updatedData || updatedData.length === 0) {
        console.error('No rows were updated');
        toast({
          title: "Update Failed",
          description: "The RSVP could not be updated. Please try again.",
          variant: "destructive"
        });
        return;
      }

      console.log('RSVP approved successfully:', updatedData[0]);

      toast({
        title: "RSVP Approved",
        description: "The RSVP has been approved successfully"
      });

      // Invalidate and refetch the query
      console.log('Invalidating queries for event:', eventId);
      await queryClient.invalidateQueries({ queryKey: ['event-rsvps', eventId] });
      
      console.log('=== APPROVE RSVP SUCCESS ===');
    } catch (error: any) {
      console.error('=== APPROVE RSVP ERROR ===');
      console.error('Error details:', error);
      
      let errorMessage = "There was an error approving the RSVP. Please try again.";
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Approval Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setProcessingRsvp(null);
      console.log('=== APPROVE RSVP END ===');
    }
  };

  const rejectRSVP = async (rsvpId: string) => {
    console.log('Rejecting RSVP:', rsvpId);
    
    if (!rsvpId) {
      console.error('No RSVP ID provided');
      toast({
        title: "Error",
        description: "Invalid RSVP ID",
        variant: "destructive"
      });
      return;
    }
    
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
    } catch (error: any) {
      console.error('Reject RSVP error:', error);
      
      let errorMessage = "There was an error rejecting the RSVP. Please try again.";
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Rejection Failed",
        description: errorMessage,
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
