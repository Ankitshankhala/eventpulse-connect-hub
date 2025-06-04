
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface EventBasicDetailsProps {
  title: string;
  description: string;
  onInputChange: (field: string, value: string) => void;
}

export const EventBasicDetails = ({ title, description, onInputChange }: EventBasicDetailsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Event Title *</Label>
        <Input
          id="title"
          placeholder="Enter event title"
          value={title}
          onChange={(e) => onInputChange('title', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your event..."
          value={description}
          onChange={(e) => onInputChange('description', e.target.value)}
          rows={3}
        />
      </div>
    </>
  );
};
