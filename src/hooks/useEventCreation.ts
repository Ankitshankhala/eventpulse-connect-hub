
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  timezone: string;
  location: string;
  rsvpDeadline: string;
  maxAttendees: string;
  imageUrl: string;
  eventType: string;
  meetingUrl: string;
}

export const useEventCreation = (onSuccess: () => void) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    timezone: 'UTC',
    location: '',
    rsvpDeadline: '',
    maxAttendees: '',
    imageUrl: '',
    eventType: 'in-person',
    meetingUrl: ''
  });

  const createEventMutation = useMutation({
    mutationFn: async (eventData: EventFormData) => {
      console.log('Starting event creation with data:', eventData);
      console.log('Current user:', user);

      if (!user) {
        console.error('No user found');
        throw new Error('User not authenticated');
      }

      // Combine date and time into a single datetime
      const dateTime = new Date(`${eventData.date}T${eventData.time}`);
      console.log('Created dateTime:', dateTime);
      
      const rsvpDeadline = eventData.rsvpDeadline 
        ? new Date(`${eventData.rsvpDeadline}T23:59:59`)
        : new Date(dateTime.getTime() - 24 * 60 * 60 * 1000); // Default to 1 day before event

      console.log('RSVP deadline:', rsvpDeadline);

      // Determine the final location based on event type
      let finalLocation = eventData.location;
      if (eventData.eventType === 'online' && eventData.meetingUrl) {
        finalLocation = eventData.meetingUrl;
      } else if (eventData.eventType === 'hybrid') {
        finalLocation = `${eventData.location}${eventData.meetingUrl ? ` | Online: ${eventData.meetingUrl}` : ''}`;
      }

      const eventPayload = {
        title: eventData.title,
        description: eventData.description || null,
        date_time: dateTime.toISOString(),
        location: finalLocation,
        rsvp_deadline: rsvpDeadline.toISOString(),
        max_attendees: eventData.maxAttendees ? parseInt(eventData.maxAttendees) : null,
        host_id: user.id,
        status: 'Scheduled',
        image_url: eventData.imageUrl || null
      };

      console.log('Event payload being sent to Supabase:', eventPayload);

      const { data, error } = await supabase
        .from('events')
        .insert(eventPayload)
        .select()
        .single();

      console.log('Supabase response - data:', data);
      console.log('Supabase response - error:', error);

      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }
      return data;
    },
    onSuccess: (data) => {
      console.log('Event created successfully:', data);
      toast({
        title: "Event Created Successfully!",
        description: `"${data.title}" has been created and is now scheduled.`,
      });
      
      // Refresh the events list
      queryClient.invalidateQueries({ queryKey: ['host-events'] });
      
      // Reset form and close modal
      resetForm();
      onSuccess();
    },
    onError: (error) => {
      console.error('Error creating event - full error object:', error);
      console.error('Error message:', error.message);
      
      let errorMessage = "There was a problem creating your event. Please try again.";
      
      // Provide more specific error messages based on the error
      if (error.message.includes('permission')) {
        errorMessage = "You don't have permission to create events. Please make sure you're logged in as a host.";
      } else if (error.message.includes('validation')) {
        errorMessage = "Please check that all required fields are filled out correctly.";
      } else if (error.message.includes('network')) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      }
      
      toast({
        title: "Error Creating Event",
        description: errorMessage,
        variant: "destructive",
      });
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      timezone: 'UTC',
      location: '',
      rsvpDeadline: '',
      maxAttendees: '',
      imageUrl: '',
      eventType: 'in-person',
      meetingUrl: ''
    });
  };

  return {
    formData,
    handleInputChange,
    createEvent: createEventMutation.mutate,
    isCreating: createEventMutation.isPending,
    resetForm
  };
};
