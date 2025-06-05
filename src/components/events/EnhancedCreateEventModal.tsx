
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useEventCreation } from '@/hooks/useEventCreation';
import { validateEventForm } from '@/utils/eventValidation';

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

            <div className="space-y-2">
              <Label htmlFor="eventType">Event Type</Label>
              <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-person">In-Person</SelectItem>
                  <SelectItem value="virtual">Virtual</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
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

          {/* Location and Meeting URL */}
          <div className="space-y-4">
            {(formData.eventType === 'in-person' || formData.eventType === 'hybrid') && (
              <div className="space-y-2">
                <Label htmlFor="location">Venue Location</Label>
                <Input
                  id="location"
                  placeholder="Enter venue address"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>
            )}

            {(formData.eventType === 'virtual' || formData.eventType === 'hybrid') && (
              <div className="space-y-2">
                <Label htmlFor="meetingUrl">Meeting URL</Label>
                <Input
                  id="meetingUrl"
                  placeholder="https://zoom.us/j/..."
                  value={formData.meetingUrl}
                  onChange={(e) => handleInputChange('meetingUrl', e.target.value)}
                />
              </div>
            )}
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
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <Label htmlFor="isPaid">Paid Event</Label>
              <Switch
                id="isPaid"
                checked={formData.isPaid}
                onCheckedChange={(checked) => handleInputChange('isPaid', checked)}
              />
            </div>

            {formData.isPaid && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="eur">EUR</SelectItem>
                      <SelectItem value="gbp">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Advanced Features */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h4 className="font-medium">Advanced Features</h4>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="enableLiveFeedback">Enable Live Feedback</Label>
              <Switch
                id="enableLiveFeedback"
                checked={formData.enableLiveFeedback}
                onCheckedChange={(checked) => handleInputChange('enableLiveFeedback', checked)}
              />
            </div>
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
