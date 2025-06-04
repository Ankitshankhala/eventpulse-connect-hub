
export interface WeeklyTrendData {
  week: string;
  events: number;
  rsvps: number;
  attendance: number;
  date: string;
}

export interface MonthlyGrowthData {
  month: string;
  events: number;
  rsvps: number;
  attendance: number;
  feedback: number;
}

export interface AttendanceTrendData extends MonthlyGrowthData {
  attendanceRate: number;
}

export const calculateWeeklyTrends = (events: any[], userRsvps: any[]): WeeklyTrendData[] => {
  const weeklyTrends = [];
  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - (i * 7));
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    
    const weekEvents = events.filter(event => {
      const eventDate = new Date(event.date_time);
      return eventDate >= weekStart && eventDate <= weekEnd;
    });
    
    const weekRsvps = userRsvps.filter(rsvp => {
      if (!rsvp.rsvp_time) return false;
      const rsvpDate = new Date(rsvp.rsvp_time);
      return rsvpDate >= weekStart && rsvpDate <= weekEnd;
    });
    
    const weekAttendance = userRsvps.filter(rsvp => {
      if (!rsvp.checkin_time) return false;
      const checkinDate = new Date(rsvp.checkin_time);
      return checkinDate >= weekStart && checkinDate <= weekEnd;
    });
    
    weeklyTrends.push({
      week: `Week ${12 - i}`,
      events: weekEvents.length,
      rsvps: weekRsvps.length,
      attendance: weekAttendance.length,
      date: weekStart.toISOString()
    });
  }
  return weeklyTrends;
};

export const calculateMonthlyGrowth = (events: any[], userRsvps: any[], feedback: any[] = []): MonthlyGrowthData[] => {
  const monthlyGrowth = events.reduce((acc, event) => {
    const date = new Date(event.created_at || event.date_time);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthName,
        events: 0,
        rsvps: 0,
        attendance: 0,
        feedback: 0
      };
    }
    
    acc[monthKey].events += 1;
    
    // Add RSVPs for this month
    const monthRsvps = userRsvps.filter(rsvp => {
      if (!rsvp.rsvp_time) return false;
      const rsvpDate = new Date(rsvp.rsvp_time);
      return rsvpDate.getMonth() === date.getMonth() && 
             rsvpDate.getFullYear() === date.getFullYear();
    });
    acc[monthKey].rsvps += monthRsvps.length;
    
    // Add attendance for this month
    const monthAttendance = userRsvps.filter(rsvp => {
      if (!rsvp.checkin_time) return false;
      const checkinDate = new Date(rsvp.checkin_time);
      return checkinDate.getMonth() === date.getMonth() && 
             checkinDate.getFullYear() === date.getFullYear();
    });
    acc[monthKey].attendance += monthAttendance.length;
    
    // Add feedback for this month
    const monthFeedback = feedback.filter(f => {
      if (!f.timestamp) return false;
      const feedbackDate = new Date(f.timestamp);
      return feedbackDate.getMonth() === date.getMonth() && 
             feedbackDate.getFullYear() === date.getFullYear();
    });
    acc[monthKey].feedback += monthFeedback.length;
    
    return acc;
  }, {} as Record<string, MonthlyGrowthData>);

  return (Object.values(monthlyGrowth) as MonthlyGrowthData[]).sort((a, b) => a.month.localeCompare(b.month));
};

export const calculateGrowthRate = (data: MonthlyGrowthData[], key: keyof MonthlyGrowthData): number => {
  if (data.length < 2) return 0;
  const current = Number(data[data.length - 1][key]);
  const previous = Number(data[data.length - 2][key]);
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

export const calculateAttendanceTrend = (monthlyData: MonthlyGrowthData[]): AttendanceTrendData[] => {
  return monthlyData.map((month: MonthlyGrowthData) => ({
    ...month,
    attendanceRate: month.rsvps > 0 ? (month.attendance / month.rsvps) * 100 : 0
  }));
};

export const calculateInsights = (
  monthlyData: MonthlyGrowthData[], 
  weeklyTrends: WeeklyTrendData[],
  eventsGrowthRate: number,
  rsvpsGrowthRate: number,
  attendanceGrowthRate: number,
  feedbackGrowthRate: number
) => {
  const totalEventsLastMonth = monthlyData.length >= 2 ? monthlyData[monthlyData.length - 2].events : 0;
  const totalEventsThisMonth = monthlyData.length >= 1 ? monthlyData[monthlyData.length - 1].events : 0;
  
  const avgWeeklyEvents = weeklyTrends.reduce((sum, week) => sum + week.events, 0) / weeklyTrends.length;
  const avgWeeklyRsvps = weeklyTrends.reduce((sum, week) => sum + week.rsvps, 0) / weeklyTrends.length;

  const bestPerformingMetric = Math.max(eventsGrowthRate, rsvpsGrowthRate, attendanceGrowthRate, feedbackGrowthRate) === eventsGrowthRate ? 'Events' :
   Math.max(rsvpsGrowthRate, attendanceGrowthRate, feedbackGrowthRate) === rsvpsGrowthRate ? 'RSVPs' :
   Math.max(attendanceGrowthRate, feedbackGrowthRate) === attendanceGrowthRate ? 'Attendance' : 'Feedback';

  const peakActivityPeriod = weeklyTrends.length > 0 ? 
    weeklyTrends.reduce((max, week) => week.rsvps > max.rsvps ? week : max).week :
    'N/A';

  return {
    totalEventsLastMonth,
    totalEventsThisMonth,
    avgWeeklyEvents,
    avgWeeklyRsvps,
    bestPerformingMetric,
    peakActivityPeriod
  };
};
