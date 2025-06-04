
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EventDateTimeProps {
  date: string;
  time: string;
  timezone: string;
  onInputChange: (field: string, value: string) => void;
}

const timezones = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Phoenix', label: 'Arizona Time (MST)' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKST)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HST)' },
  { value: 'Europe/London', label: 'British Time (GMT/BST)' },
  { value: 'Europe/Paris', label: 'Central European Time (CET)' },
  { value: 'Europe/Berlin', label: 'Central European Time (CET)' },
  { value: 'Europe/Rome', label: 'Central European Time (CET)' },
  { value: 'Europe/Madrid', label: 'Central European Time (CET)' },
  { value: 'Europe/Amsterdam', label: 'Central European Time (CET)' },
  { value: 'Europe/Stockholm', label: 'Central European Time (CET)' },
  { value: 'Europe/Moscow', label: 'Moscow Time (MSK)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
  { value: 'Asia/Seoul', label: 'Korea Standard Time (KST)' },
  { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong Time (HKT)' },
  { value: 'Asia/Singapore', label: 'Singapore Time (SGT)' },
  { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
  { value: 'Asia/Dubai', label: 'Gulf Standard Time (GST)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AEST)' },
  { value: 'Australia/Melbourne', label: 'Australian Eastern Time (AEST)' },
  { value: 'Australia/Perth', label: 'Australian Western Time (AWST)' },
  { value: 'Pacific/Auckland', label: 'New Zealand Time (NZST)' },
  { value: 'America/Toronto', label: 'Eastern Time (Canada)' },
  { value: 'America/Vancouver', label: 'Pacific Time (Canada)' },
  { value: 'America/Sao_Paulo', label: 'Brasília Time (BRT)' },
  { value: 'America/Mexico_City', label: 'Central Time (Mexico)' },
  { value: 'Africa/Cairo', label: 'Eastern European Time (EET)' },
  { value: 'Africa/Johannesburg', label: 'South Africa Standard Time (SAST)' }
];

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
        <Label htmlFor="timezone">Timezone *</Label>
        <Select value={timezone} onValueChange={(value) => onInputChange('timezone', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {timezones.map((tz) => (
              <SelectItem key={tz.value} value={tz.value}>
                {tz.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
