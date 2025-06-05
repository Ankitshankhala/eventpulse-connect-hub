
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface EventPaymentSectionProps {
  isPaid: boolean;
  price: string;
  currency: string;
  onInputChange: (field: string, value: string | boolean) => void;
}

export const EventPaymentSection = ({ 
  isPaid, 
  price, 
  currency, 
  onInputChange 
}: EventPaymentSectionProps) => {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <Label htmlFor="isPaid">Paid Event</Label>
        <Switch
          id="isPaid"
          checked={isPaid}
          onCheckedChange={(checked) => onInputChange('isPaid', checked)}
        />
      </div>

      {isPaid && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => onInputChange('price', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={currency} onValueChange={(value) => onInputChange('currency', value)}>
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
  );
};
