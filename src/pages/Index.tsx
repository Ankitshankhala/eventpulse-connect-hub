
import { useState } from 'react';
import { Login } from '@/components/auth/Login';
import { Signup } from '@/components/auth/Signup';
import { HostDashboard } from '@/components/host/HostDashboard';
import { AttendeeDashboard } from '@/components/attendee/AttendeeDashboard';

const Index = () => {
  const [currentView, setCurrentView] = useState<'login' | 'signup' | 'host-dashboard' | 'attendee-dashboard'>('login');
  const [user, setUser] = useState<{ email: string; role: 'host' | 'attendee' } | null>(null);

  const handleLogin = (email: string, role: 'host' | 'attendee') => {
    setUser({ email, role });
    setCurrentView(role === 'host' ? 'host-dashboard' : 'attendee-dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  if (user && currentView === 'host-dashboard') {
    return <HostDashboard user={user} onLogout={handleLogout} />;
  }

  if (user && currentView === 'attendee-dashboard') {
    return <AttendeeDashboard user={user} onLogout={handleLogout} />;
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
            <Login 
              onLogin={handleLogin}
              onSwitchToSignup={() => setCurrentView('signup')}
            />
          )}

          {currentView === 'signup' && (
            <Signup 
              onSignup={handleLogin}
              onSwitchToLogin={() => setCurrentView('login')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
