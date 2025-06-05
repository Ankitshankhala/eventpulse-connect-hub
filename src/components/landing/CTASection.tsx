
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  onGetStarted?: () => void;
}

export const CTASection = ({ onGetStarted }: CTASectionProps) => {
  return (
    <section className="py-20 bg-gradient-to-r from-ep-blue to-ep-green">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Events?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of event organizers who've already made the switch to EventPulse
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-ep-blue hover:bg-gray-100 px-8 py-4 text-lg font-semibold transition-colors duration-200 shadow-lg"
              onClick={onGetStarted}
            >
              Start Free Today
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-ep-blue hover:bg-white hover:text-ep-blue px-8 py-4 text-lg transition-colors duration-200"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-white/80 mt-4">
            ✓ Free 30-day trial • ✓ No setup fees • ✓ Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};
