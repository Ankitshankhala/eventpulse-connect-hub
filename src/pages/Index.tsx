
import { useAuth } from "@/hooks/useAuth";
import LandingPage from "@/components/landing/LandingPage";
import { HostDashboard } from "@/components/host/HostDashboard";
import { AttendeeDashboard } from "@/components/attendee/AttendeeDashboard";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  // Check user role from user metadata
  const userRole = user.user_metadata?.role || 'attendee';

  if (userRole === 'host') {
    return <HostDashboard />;
  } else {
    return <AttendeeDashboard />;
  }
};

export default Index;
