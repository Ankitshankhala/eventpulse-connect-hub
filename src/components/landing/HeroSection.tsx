
import { Play, Shield, Globe, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthSection } from './AuthSection';

interface HeroSectionProps {
  onGetStarted?: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const emojiReactions = ['👍', '❤️', '😮', '👎', '🔥', '✨'];

  return (
    <section className="relative bg-white min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-ep-blue/5 via-white to-ep-green/5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-ep-blue rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">EP</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 animate-fade-in">
            Real-Time Event Insights at Your Fingertips
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            EventPulse revolutionizes event management with live feedback, real-time analytics, and seamless attendee experiences. Perfect for hosts and attendees alike.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Global Timezone Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>99.9% Uptime</span>
            </div>
          </div>
          
          <AuthSection onGetStarted={onGetStarted} />

          <p className="text-sm text-gray-500 mb-8">✓ No credit card required • ✓ Setup in under 2 minutes</p>

          {/* Live Demo Button */}
          <div className="mb-12">
            <Button 
              variant="outline" 
              size="lg" 
              className="group px-8 py-4 text-lg border-ep-blue text-ep-blue hover:bg-ep-blue hover:text-white transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch 2-Min Demo
            </Button>
          </div>

          {/* Live Emoji Feedback Illustration */}
          <div className="relative max-w-md mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <div className="w-2 h-2 bg-ep-red rounded-full animate-pulse-live"></div>
                <span className="font-semibold">Live Feedback</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {emojiReactions.map((emoji, index) => (
                  <div
                    key={index}
                    className="animate-pulse"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    <span className="text-2xl hover:scale-110 transition-transform cursor-pointer">
                      {emoji}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <div className="bg-gray-50 rounded-lg p-2 text-sm text-left border border-gray-100">
                  "Amazing presentation! 👍"
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-sm text-left border border-gray-100">
                  "Love the interactive format ❤️"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
