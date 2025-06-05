
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface EventAdvancedSectionProps {
  enableLiveFeedback: boolean;
  onInputChange: (field: string, value: boolean) => void;
}

export const EventAdvancedSection = ({ 
  enableLiveFeedback, 
  onInputChange 
}: EventAdvancedSectionProps) => {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h4 className="font-medium">Advanced Features</h4>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="enableLiveFeedback">Enable Live Feedback</Label>
        <Switch
          id="enableLiveFeedback"
          checked={enableLiveFeedback}
          onCheckedChange={(checked) => onInputChange('enableLiveFeedback', checked)}
        />
      </div>
    </div>
  );
};
