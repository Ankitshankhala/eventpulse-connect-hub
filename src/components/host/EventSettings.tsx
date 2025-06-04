
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ExternalLink, Video } from 'lucide-react';

interface EventSettingsProps {
  location: string;
  rsvpDeadline: string;
  maxAttendees: string;
  eventDate: string;
  eventType: string;
  meetingUrl: string;
  onInputChange: (field: string, value: string) => void;
}

export const EventSettings = ({ 
  location, 
  rsvpDeadline, 
  maxAttendees, 
  eventDate, 
  eventType = 'in-person',
  meetingUrl = '',
  onInputChange 
}: EventSettingsProps) => {
  
  const generateZoomUrl = () => {
    // Generate a placeholder Zoom URL structure
    const meetingId = Math.floor(Math.random() * 900000000) + 100000000;
    const zoomUrl = `https://zoom.us/j/${meetingId}`;
    onInputChange('meetingUrl', zoomUrl);
  };

  const generateGoogleMeetUrl = () => {
    // Generate a placeholder Google Meet URL structure
    const meetingCode = Math.random().toString(36).substring(2, 12);
    const googleMeetUrl = `https://meet.google.com/${meetingCode}`;
    onInputChange('meetingUrl', googleMeetUrl);
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="eventType">Event Type *</Label>
        <Select value={eventType} onValueChange={(value) => onInputChange('eventType', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="in-person">In-Person Event</SelectItem>
            <SelectItem value="online">Online Event</SelectItem>
            <SelectItem value="hybrid">Hybrid Event</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">
          {eventType === 'online' ? 'Event Description/Platform' : 'Location'} *
        </Label>
        <Input
          id="location"
          placeholder={
            eventType === 'online' 
              ? "e.g., Online webinar via Zoom" 
              : "Physical address or venue name"
          }
          value={location}
          onChange={(e) => onInputChange('location', e.target.value)}
          required
        />
      </div>

      {(eventType === 'online' || eventType === 'hybrid') && (
        <div className="space-y-2">
          <Label htmlFor="meetingUrl" className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            Meeting Link
          </Label>
          <div className="space-y-2">
            <Input
              id="meetingUrl"
              placeholder="https://zoom.us/j/123456789 or https://meet.google.com/abc-def-ghi"
              value={meetingUrl}
              onChange={(e) => onInputChange('meetingUrl', e.target.value)}
            />
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={generateZoomUrl}
                className="flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                Generate Zoom Link
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={generateGoogleMeetUrl}
                className="flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                Generate Google Meet Link
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              For actual meetings, replace with your real Zoom/Google Meet link
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rsvpDeadline">RSVP Deadline</Label>
          <Input
            id="rsvpDeadline"
            type="date"
            value={rsvpDeadline}
            onChange={(e) => onInputChange('rsvpDeadline', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            max={eventDate}
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
            value={maxAttendees}
            onChange={(e) => onInputChange('maxAttendees', e.target.value)}
          />
          <p className="text-xs text-gray-500">
            Leave empty for unlimited attendees
          </p>
        </div>
      </div>
    </>
  );
};
