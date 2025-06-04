
import { useState } from 'react';
import { Login } from '@/components/auth/Login';
import { Signup } from '@/components/auth/Signup';
import { Button } from '@/components/ui/button';

interface AuthSectionProps {
  onGetStarted?: () => void;
}

export const AuthSection = ({ onGetStarted }: AuthSectionProps) => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const handleGetStarted = () => {
    setAuthMode('signup');
    setShowAuth(true);
    onGetStarted?.();
  };

  const handleSignIn = () => {
    setAuthMode('login');
    setShowAuth(true);
  };

  const switchToSignup = () => setAuthMode('signup');
  const switchToLogin = () => setAuthMode('login');

  if (showAuth) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="relative">
          <Button
            variant="ghost"
            className="absolute -top-2 -right-2 z-10 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-800 rounded-full w-8 h-8 p-0"
            onClick={() => setShowAuth(false)}
          >
            ✕
          </Button>
          {authMode === 'login' ? (
            <Login onSwitchToSignup={switchToSignup} />
          ) : (
            <Signup onSwitchToLogin={switchToLogin} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in font-segoe">
      <Button 
        size="lg" 
        className="bg-ep-blue hover:bg-ep-blue-hover text-white px-8 py-4 text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
        onClick={handleGetStarted}
      >
        Get Started
      </Button>
      <Button 
        variant="outline" 
        size="lg" 
        className="px-8 py-4 text-lg border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
        onClick={handleSignIn}
      >
        Sign In
      </Button>
    </div>
  );
};
