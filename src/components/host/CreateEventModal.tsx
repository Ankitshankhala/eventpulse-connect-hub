
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useEventCreation } from '@/hooks/useEventCreation';
import { validateEventForm } from '@/utils/eventValidation';
import { EventBasicDetails } from './EventBasicDetails';
import { EventDateTime } from './EventDateTime';
import { EventSettings } from './EventSettings';
import { EventImageUpload } from './EventImageUpload';

interface CreateEventModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateEventModal = ({ open, onClose }: CreateEventModalProps) => {
  const { formData, handleInputChange, createEvent, isCreating, resetForm } = useEventCreation(() => {
    onClose();
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateEventForm(formData)) {
      createEvent(formData);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Event</DialogTitle>
          <DialogDescription>
            Fill in the details for your new event
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <EventBasicDetails
            title={formData.title}
            description={formData.description}
            onInputChange={handleInputChange}
          />

          <EventImageUpload
            imageUrl={formData.imageUrl}
            onInputChange={handleInputChange}
          />

          <EventDateTime
            date={formData.date}
            time={formData.time}
            timezone={formData.timezone}
            onInputChange={handleInputChange}
          />

          <EventSettings
            location={formData.location}
            rsvpDeadline={formData.rsvpDeadline}
            maxAttendees={formData.maxAttendees}
            eventDate={formData.date}
            eventType={formData.eventType}
            meetingUrl={formData.meetingUrl}
            onInputChange={handleInputChange}
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              disabled={isCreating}
            >
              {isCreating ? 'Creating...' : 'Create Event'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
