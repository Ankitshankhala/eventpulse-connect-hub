
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EventDateTimeProps {
  date: string;
  time: string;
  timezone: string;
  onInputChange: (field: string, value: string) => void;
}

export const EventDateTime = ({ date, time, timezone, onInputChange }: EventDateTimeProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => onInputChange('date', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time *</Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => onInputChange('time', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="timezone">Timezone</Label>
        <Select value={timezone} onValueChange={(value) => onInputChange('timezone', value)}>
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
    </>
  );
};
