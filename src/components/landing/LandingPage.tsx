
import { HeroSection } from './HeroSection';
import { StatsSection } from './StatsSection';
import { DashboardPreviews } from './DashboardPreviews';
import { FeaturesSection } from './FeaturesSection';
import { TestimonialsSection } from './TestimonialsSection';
import { TimelineSection } from './TimelineSection';
import { CTASection } from './CTASection';
import { Footer } from './Footer';

interface LandingPageProps {
  onGetStarted?: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-white font-segoe">
      <HeroSection onGetStarted={onGetStarted} />
      <StatsSection />
      <DashboardPreviews />
      <FeaturesSection />
      <TestimonialsSection />
      <TimelineSection />
      <CTASection onGetStarted={onGetStarted} />
      <Footer />
    </div>
  );
};

export default LandingPage;
