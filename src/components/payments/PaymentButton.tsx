
import { DollarSign, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePaymentIntegration } from '@/hooks/usePaymentIntegration';

interface PaymentButtonProps {
  eventId: string;
  amount: number;
  currency?: string;
  eventTitle: string;
  disabled?: boolean;
}

export const PaymentButton = ({ 
  eventId, 
  amount, 
  currency = 'usd', 
  eventTitle,
  disabled = false 
}: PaymentButtonProps) => {
  const { createPaymentSession, isProcessing } = usePaymentIntegration();

  const handlePayment = async () => {
    await createPaymentSession({ eventId, amount, currency });
  };

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || isProcessing}
      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
    >
      <CreditCard className="w-4 h-4 mr-2" />
      {isProcessing ? 'Processing...' : `Buy Ticket - ${formatPrice(amount, currency)}`}
    </Button>
  );
};
