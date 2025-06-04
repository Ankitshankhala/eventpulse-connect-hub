
import { useAuth } from '@/hooks/useAuth';
import { Login } from '@/components/auth/Login';
import { Signup } from '@/components/auth/Signup';
import { HostDashboard } from '@/components/host/HostDashboard';
import { AttendeeDashboard } from '@/components/attendee/AttendeeDashboard';
import LandingPage from '@/components/landing/LandingPage';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const { user, session, loading } = useAuth();
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'signup'>('landing');
  const [userRole, setUserRole] = useState<'host' | 'attendee' | null>(null);

  useEffect(() => {
    if (user && session) {
      // Fetch user profile to get role
      const fetchUserProfile = async () => {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();
        
        if (data && !error) {
          setUserRole(data.role);
        }
      };
      
      fetchUserProfile();
    } else {
      setUserRole(null);
    }
  }, [user, session]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">EP</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, show appropriate dashboard
  if (user && userRole) {
    return userRole === 'host' ? <HostDashboard /> : <AttendeeDashboard />;
  }

  // If not authenticated, show landing/auth pages
  if (currentView === 'landing') {
    return (
      <div className="relative">
        <div className="absolute top-4 right-4 z-50">
          <Button 
            onClick={() => setCurrentView('login')}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm"
          >
            Sign In
          </Button>
        </div>
        <LandingPage onGetStarted={() => setCurrentView('login')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">EP</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              EventPulse
            </h1>
            <p className="text-gray-600 mt-2">Modern event management for everyone</p>
          </div>

          {currentView === 'login' && (
            <>
              <Login onSwitchToSignup={() => setCurrentView('signup')} />
              <div className="text-center mt-4">
                <button 
                  onClick={() => setCurrentView('landing')}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Back to home
                </button>
              </div>
            </>
          )}

          {currentView === 'signup' && (
            <>
              <Signup onSwitchToLogin={() => setCurrentView('login')} />
              <div className="text-center mt-4">
                <button 
                  onClick={() => setCurrentView('landing')}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Back to home
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
