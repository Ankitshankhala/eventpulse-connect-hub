
export interface MonthlyEventData {
  month: string;
  events: number;
  rsvps: number;
}

export interface EventStatusData {
  status: string;
  count: number;
  color: string;
}

export interface LocationData {
  type: string;
  count: number;
  color: string;
}

export interface EventSizeData {
  size: string;
  count: number;
}

export interface DayOfWeekData {
  day: string;
  count: number;
}

export const processEventStatusData = (events: any[]): EventStatusData[] => {
  return [
    {
      status: 'Completed',
      count: events.filter(e => new Date(e.date_time) < new Date()).length,
      color: '#10b981'
    },
    {
      status: 'Upcoming',
      count: events.filter(e => new Date(e.date_time) > new Date()).length,
      color: '#3b82f6'
    }
  ];
};

export const processLocationData = (events: any[]): LocationData[] => {
  return [
    {
      type: 'Virtual',
      count: events.filter(e => e.location.includes('http')).length,
      color: '#6366f1'
    },
    {
      type: 'Physical',
      count: events.filter(e => !e.location.includes('http')).length,
      color: '#f59e0b'
    }
  ];
};

export const processMonthlyEventData = (events: any[], userRsvps: any[]): MonthlyEventData[] => {
  const monthlyEvents = events.reduce((acc, event) => {
    const date = new Date(event.created_at || event.date_time);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    if (!acc[monthKey]) {
      acc[monthKey] = { month: monthName, events: 0, rsvps: 0 };
    }
    
    acc[monthKey].events += 1;
    
    const eventRsvps = userRsvps.filter(rsvp => rsvp.event_id === event.id).length;
    acc[monthKey].rsvps += eventRsvps;
    
    return acc;
  }, {} as Record<string, MonthlyEventData>);

  return (Object.values(monthlyEvents) as MonthlyEventData[]).sort((a, b) => a.month.localeCompare(b.month));
};

export const processEventSizeData = (events: any[], userRsvps: any[]): EventSizeData[] => {
  const eventSizeData = events.reduce((acc, event) => {
    const rsvpCount = userRsvps.filter(rsvp => rsvp.event_id === event.id).length;
    const size = rsvpCount === 0 ? 'No RSVPs' :
                 rsvpCount <= 10 ? 'Small (≤10)' :
                 rsvpCount <= 25 ? 'Medium (11-25)' :
                 rsvpCount <= 50 ? 'Large (26-50)' : 'XLarge (50+)';
    
    acc[size] = (acc[size] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(eventSizeData).map(([size, count]) => ({
    size,
    count: count as number
  }));
};

export const processDayOfWeekData = (events: any[]): DayOfWeekData[] => {
  const dayOfWeekData = events.reduce((acc, event) => {
    const day = new Date(event.date_time).toLocaleDateString('en-US', { weekday: 'long' });
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(dayOfWeekData).map(([day, count]) => ({
    day,
    count: count as number
  }));
};
