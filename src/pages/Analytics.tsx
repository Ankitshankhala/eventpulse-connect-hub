
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { GeneralAnalyticsDashboard } from '@/components/analytics/GeneralAnalyticsDashboard';
import { AttendeeAnalyticsDashboard } from '@/components/attendee/analytics/AttendeeAnalyticsDashboard';
import { useAuth } from '@/hooks/useAuth';

const Analytics = () => {
  const { user } = useAuth();

  // Fetch user profile to get role
  const { data: userProfile } = useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  // Fetch events based on user role
  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ['events', user?.id, userProfile?.role],
    queryFn: async () => {
      if (!user || !userProfile) return [];
      
      let query = supabase.from('events').select('*');
      
      // For attendees, fetch all public events
      // For hosts, fetch only their own events
      if (userProfile.role === 'host') {
        query = query.eq('host_id', user.id);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user && !!userProfile
  });

  // Fetch RSVPs based on user role
  const { data: userRsvps = [], isLoading: rsvpsLoading } = useQuery({
    queryKey: ['user-rsvps', user?.id, userProfile?.role],
    queryFn: async () => {
      if (!user || !userProfile) return [];
      
      let query = supabase.from('rsvps').select('*');
      
      // For attendees, fetch only their own RSVPs
      // For hosts, fetch RSVPs for their events
      if (userProfile.role === 'attendee') {
        query = query.eq('user_id', user.id);
      } else if (userProfile.role === 'host') {
        // Get RSVPs for events hosted by this user
        const hostEvents = events.map(e => e.id);
        if (hostEvents.length > 0) {
          query = query.in('event_id', hostEvents);
        } else {
          return [];
        }
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
    enabled: !!user && !!userProfile && events.length >= 0
  });

  // Only fetch users and feedback for general analytics (admin view)
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      if (!user || userProfile?.role !== 'admin') return [];
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user && userProfile?.role === 'admin'
  });

  const { data: feedback = [], isLoading: feedbackLoading } = useQuery({
    queryKey: ['feedback', user?.id, userProfile?.role],
    queryFn: async () => {
      if (!user || !userProfile) return [];
      
      let query = supabase.from('feedback').select('*');
      
      // For hosts, only get feedback for their events
      if (userProfile.role === 'host') {
        const hostEvents = events.map(e => e.id);
        if (hostEvents.length > 0) {
          query = query.in('event_id', hostEvents);
        } else {
          return [];
        }
      } else if (userProfile.role === 'attendee') {
        // For attendees, get their own feedback
        query = query.eq('user_id', user.id);
      }
      
      const { data, error } = await query.order('timestamp', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user && !!userProfile && events.length >= 0
  });

  if (eventsLoading || rsvpsLoading || usersLoading || feedbackLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to view analytics.</p>
        </div>
      </div>
    );
  }

  // Render appropriate dashboard based on user role
  const renderDashboard = () => {
    if (!userProfile) return null;

    switch (userProfile.role) {
      case 'attendee':
        return (
          <AttendeeAnalyticsDashboard 
            events={events}
            userRsvps={userRsvps}
            feedback={feedback}
          />
        );
      case 'host':
      case 'admin':
      default:
        return (
          <GeneralAnalyticsDashboard 
            events={events}
            userRsvps={userRsvps}
            users={users}
            feedback={feedback}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {renderDashboard()}
      </div>
    </div>
  );
};

export default Analytics;
