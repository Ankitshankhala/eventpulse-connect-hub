
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EventSettingsProps {
  location: string;
  rsvpDeadline: string;
  maxAttendees: string;
  eventDate: string;
  onInputChange: (field: string, value: string) => void;
}

export const EventSettings = ({ location, rsvpDeadline, maxAttendees, eventDate, onInputChange }: EventSettingsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <Input
          id="location"
          placeholder="Physical address or virtual meeting URL"
          value={location}
          onChange={(e) => onInputChange('location', e.target.value)}
          required
        />
      </div>

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
