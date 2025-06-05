
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EventTypeSectionProps {
  eventType: 'in-person' | 'virtual' | 'hybrid';
  location: string;
  meetingUrl: string;
  onInputChange: (field: string, value: string) => void;
}

export const EventTypeSection = ({ 
  eventType, 
  location, 
  meetingUrl, 
  onInputChange 
}: EventTypeSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="eventType">Event Type</Label>
        <Select value={eventType} onValueChange={(value) => onInputChange('eventType', value)}>
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

      {(eventType === 'in-person' || eventType === 'hybrid') && (
        <div className="space-y-2">
          <Label htmlFor="location">Venue Location</Label>
          <Input
            id="location"
            placeholder="Enter venue address"
            value={location}
            onChange={(e) => onInputChange('location', e.target.value)}
          />
        </div>
      )}

      {(eventType === 'virtual' || eventType === 'hybrid') && (
        <div className="space-y-2">
          <Label htmlFor="meetingUrl">Meeting URL</Label>
          <Input
            id="meetingUrl"
            placeholder="https://zoom.us/j/..."
            value={meetingUrl}
            onChange={(e) => onInputChange('meetingUrl', e.target.value)}
          />
        </div>
      )}
    </div>
  );
};
