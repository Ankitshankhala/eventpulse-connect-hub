
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEventCreation } from '@/hooks/useEventCreation';
import { validateEventForm } from '@/utils/eventValidation';
import { EventTypeSection } from './EventTypeSection';
import { EventPaymentSection } from './EventPaymentSection';
import { EventAdvancedSection } from './EventAdvancedSection';

interface EnhancedCreateEventModalProps {
  open: boolean;
  onClose: () => void;
}

interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxAttendees: string;
  imageUrl: string;
  eventType: 'in-person' | 'virtual' | 'hybrid';
  meetingUrl: string;
  isPaid: boolean;
  price: string;
  currency: string;
  enableLiveFeedback: boolean;
}

export const EnhancedCreateEventModal = ({ open, onClose }: EnhancedCreateEventModalProps) => {
  const { createEvent, isCreating } = useEventCreation(onClose);
  
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: '',
    imageUrl: '',
    eventType: 'in-person',
    meetingUrl: '',
    isPaid: false,
    price: '0',
    currency: 'usd',
    enableLiveFeedback: true
  });

  const handleInputChange = (field: keyof EventFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEventForm(formData)) return;

    // Prepare the event data in the format expected by useEventCreation
    const eventData = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      timezone: 'UTC',
      location: formData.location,
      rsvpDeadline: '', // Can be left empty for default behavior
      maxAttendees: formData.maxAttendees,
      imageUrl: formData.imageUrl,
      eventType: formData.eventType,
      meetingUrl: formData.meetingUrl
    };

    createEvent(eventData);
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      maxAttendees: '',
      imageUrl: '',
      eventType: 'in-person',
      meetingUrl: '',
      isPaid: false,
      price: '0',
      currency: 'usd',
      enableLiveFeedback: true
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Event</DialogTitle>
          <DialogDescription>
            Create an engaging event with advanced features
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <EventTypeSection
              eventType={formData.eventType}
              location={formData.location}
              meetingUrl={formData.meetingUrl}
              onInputChange={handleInputChange}
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

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
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

          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxAttendees">Max Attendees</Label>
              <Input
                id="maxAttendees"
                type="number"
                min="1"
                placeholder="Leave empty for unlimited"
                value={formData.maxAttendees}
                onChange={(e) => handleInputChange('maxAttendees', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Event Image URL</Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              />
            </div>
          </div>

          {/* Payment Settings */}
          <EventPaymentSection
            isPaid={formData.isPaid}
            price={formData.price}
            currency={formData.currency}
            onInputChange={handleInputChange}
          />

          {/* Advanced Features */}
          <EventAdvancedSection
            enableLiveFeedback={formData.enableLiveFeedback}
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
