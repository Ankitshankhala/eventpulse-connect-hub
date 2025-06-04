
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CreditCard, DollarSign, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePaymentIntegration } from '@/hooks/usePaymentIntegration';

interface PaymentIntegrationProps {
  eventId: string;
  eventTitle: string;
  eventPrice?: number;
  currency?: string;
}

export const PaymentIntegration = ({ 
  eventId, 
  eventTitle, 
  eventPrice = 0,
  currency = 'usd' 
}: PaymentIntegrationProps) => {
  const { createPaymentSession, isProcessing } = usePaymentIntegration();
  const { toast } = useToast();
  const [customAmount, setCustomAmount] = useState(eventPrice);
  const [isCustomPrice, setIsCustomPrice] = useState(false);

  const handlePayment = async () => {
    const amount = isCustomPrice ? customAmount * 100 : eventPrice * 100; // Convert to cents
    
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid payment amount.",
        variant: "destructive"
      });
      return;
    }

    const result = await createPaymentSession({
      eventId,
      amount,
      currency
    });

    if (result) {
      toast({
        title: "Payment Initiated",
        description: "You'll be redirected to complete your payment."
      });
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
          Event Payment
        </CardTitle>
        <CardDescription>
          Secure payment for "{eventTitle}"
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Event Details */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-sm mb-1">Event:</h4>
          <p className="text-sm text-gray-700">{eventTitle}</p>
        </div>

        {/* Pricing Options */}
        <div className="space-y-3">
          {eventPrice > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Standard Price:</span>
              <Badge variant="secondary" className="text-lg">
                {formatPrice(eventPrice)}
              </Badge>
            </div>
          )}

          {/* Custom Amount Toggle */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="customPrice"
              checked={isCustomPrice}
              onChange={(e) => setIsCustomPrice(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="customPrice" className="text-sm">
              Enter custom amount
            </Label>
          </div>

          {/* Custom Amount Input */}
          {isCustomPrice && (
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm">
                Payment Amount
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(parseFloat(e.target.value) || 0)}
                  className="pl-10"
                  placeholder="0.00"
                />
              </div>
            </div>
          )}
        </div>

        {/* Payment Features */}
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-center">
            <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
            Secure payment processing
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
            Instant confirmation
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
            Email receipt included
          </div>
        </div>

        {/* Payment Button */}
        <Button
          onClick={handlePayment}
          disabled={isProcessing || (isCustomPrice && customAmount <= 0)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          size="lg"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          {isProcessing 
            ? 'Processing...' 
            : `Pay ${formatPrice(isCustomPrice ? customAmount : eventPrice)}`
          }
        </Button>

        {/* Payment Info */}
        <p className="text-xs text-gray-500 text-center">
          Powered by Stripe. Your payment information is secure and encrypted.
        </p>
      </CardContent>
    </Card>
  );
};
