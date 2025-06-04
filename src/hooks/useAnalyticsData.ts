
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const useAnalyticsData = () => {
  const { user } = useAuth();

  // Fetch events with RSVP counts
  const { data: eventsData = [], isLoading: eventsLoading } = useQuery({
    queryKey: ['analytics-events', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          rsvps(count),
          feedback(count)
        `)
        .eq('host_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  // Fetch RSVPs data
  const { data: rsvpsData = [], isLoading: rsvpsLoading } = useQuery({
    queryKey: ['analytics-rsvps', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      // Get RSVPs for user's events
      const { data: events } = await supabase
        .from('events')
        .select('id')
        .eq('host_id', user.id);

      if (!events?.length) return [];

      const eventIds = events.map(e => e.id);
      
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .in('event_id', eventIds);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  // Fetch feedback data
  const { data: feedbackData = [], isLoading: feedbackLoading } = useQuery({
    queryKey: ['analytics-feedback', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      // Get feedback for user's events
      const { data: events } = await supabase
        .from('events')
        .select('id')
        .eq('host_id', user.id);

      if (!events?.length) return [];

      const eventIds = events.map(e => e.id);
      
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .in('event_id', eventIds);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  // Process analytics metrics
  const metrics = {
    totalEvents: eventsData.length,
    totalRSVPs: rsvpsData.length,
    totalFeedback: feedbackData.length,
    averageAttendance: eventsData.length > 0 
      ? Math.round(rsvpsData.filter(r => r.checkin_time).length / eventsData.length * 100) / 100
      : 0,
    popularEvents: eventsData
      .sort((a, b) => (b.rsvps?.[0]?.count || 0) - (a.rsvps?.[0]?.count || 0))
      .slice(0, 5),
    recentFeedback: feedbackData
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10),
    monthlyStats: processMonthlyStats(eventsData, rsvpsData),
    categoryBreakdown: processCategoryBreakdown(eventsData)
  };

  return {
    eventsData,
    rsvpsData,
    feedbackData,
    metrics,
    isLoading: eventsLoading || rsvpsLoading || feedbackLoading
  };
};

const processMonthlyStats = (events: any[], rsvps: any[]) => {
  const months = {};
  
  events.forEach(event => {
    const month = new Date(event.created_at).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
    months[month] = (months[month] || 0) + 1;
  });

  return Object.entries(months).map(([month, count]) => ({
    month,
    events: count,
    rsvps: rsvps.filter(r => {
      const rsvpMonth = new Date(r.rsvp_time).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
      return rsvpMonth === month;
    }).length
  }));
};

const processCategoryBreakdown = (events: any[]) => {
  const categories = {};
  
  events.forEach(event => {
    // Simple categorization based on location/type
    let category = 'In-Person';
    if (event.location?.includes('http') || event.location?.includes('zoom') || event.location?.includes('meet')) {
      category = 'Virtual';
    } else if (event.location?.includes('|')) {
      category = 'Hybrid';
    }
    
    categories[category] = (categories[category] || 0) + 1;
  });

  return Object.entries(categories).map(([name, value]) => ({ name, value }));
};
