
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
            className="absolute -top-2 -right-2 z-10 bg-white/90 hover:bg-white"
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
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in">
      <Button 
        size="lg" 
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg"
        onClick={handleGetStarted}
      >
        Get Started
      </Button>
      <Button 
        variant="outline" 
        size="lg" 
        className="px-8 py-4 text-lg border-gray-300"
        onClick={handleSignIn}
      >
        Sign In
      </Button>
    </div>
  );
};
