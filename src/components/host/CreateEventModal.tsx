
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateEventModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateEventModal = ({ open, onClose }: CreateEventModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    timezone: 'UTC',
    location: '',
    rsvpDeadline: '',
    maxAttendees: ''
  });

  const createEventMutation = useMutation({
    mutationFn: async (eventData: typeof formData) => {
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

      const eventPayload = {
        title: eventData.title,
        description: eventData.description || null,
        date_time: dateTime.toISOString(),
        location: eventData.location,
        rsvp_deadline: rsvpDeadline.toISOString(),
        max_attendees: eventData.maxAttendees ? parseInt(eventData.maxAttendees) : null,
        host_id: user.id,
        status: 'Scheduled'
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
      
      // Close modal and reset form
      onClose();
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        timezone: 'UTC',
        location: '',
        rsvpDeadline: '',
        maxAttendees: ''
      });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted with data:', formData);
    
    // Basic validation
    if (!formData.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Event title is required.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.date || !formData.time) {
      toast({
        title: "Validation Error",
        description: "Event date and time are required.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.location.trim()) {
      toast({
        title: "Validation Error",
        description: "Event location is required.",
        variant: "destructive",
      });
      return;
    }

    console.log('Validation passed, calling mutation...');
    createEventMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Event</DialogTitle>
          <DialogDescription>
            Fill in the details for your new event
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              placeholder="Enter event title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your event..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select value={formData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="EST">Eastern (EST)</SelectItem>
                <SelectItem value="PST">Pacific (PST)</SelectItem>
                <SelectItem value="GMT">Greenwich (GMT)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              placeholder="Physical address or virtual meeting URL"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rsvpDeadline">RSVP Deadline</Label>
              <Input
                id="rsvpDeadline"
                type="date"
                value={formData.rsvpDeadline}
                onChange={(e) => handleInputChange('rsvpDeadline', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                max={formData.date}
              />
              <p className="text-xs text-gray-500">
                Leave empty to default to 1 day before event
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxAttendees">Max Attendees</Label>
              <Input
                id="maxAttendees"
                type="number"
                placeholder="50"
                min="1"
                value={formData.maxAttendees}
                onChange={(e) => handleInputChange('maxAttendees', e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Leave empty for unlimited attendees
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={createEventMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              disabled={createEventMutation.isPending}
            >
              {createEventMutation.isPending ? 'Creating...' : 'Create Event'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
