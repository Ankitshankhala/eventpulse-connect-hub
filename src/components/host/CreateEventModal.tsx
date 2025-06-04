
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

  const [enableAdvancedFeatures, setEnableAdvancedFeatures] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState('0');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateEventForm(formData)) {
      createEvent(formData);
    }
  };

  const handleClose = () => {
    resetForm();
    setEnableAdvancedFeatures(false);
    setIsPaid(false);
    setPrice('0');
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

          {/* Enhanced Features Toggle */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <Label htmlFor="advancedFeatures">Enable Advanced Features</Label>
              <Switch
                id="advancedFeatures"
                checked={enableAdvancedFeatures}
                onCheckedChange={setEnableAdvancedFeatures}
              />
            </div>

            {enableAdvancedFeatures && (
              <div className="space-y-4">
                {/* Payment Settings */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="isPaid">Paid Event</Label>
                  <Switch
                    id="isPaid"
                    checked={isPaid}
                    onCheckedChange={setIsPaid}
                  />
                </div>

                {isPaid && (
                  <div className="space-y-2">
                    <Label htmlFor="price">Event Price (USD)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                )}

                <div className="text-sm text-gray-600">
                  Advanced features include live feedback, payment processing, and enhanced analytics.
                </div>
              </div>
            )}
          </div>

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
