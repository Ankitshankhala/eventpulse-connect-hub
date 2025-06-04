
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, Users } from 'lucide-react';

interface TrendAnalysisProps {
  events: any[];
  userRsvps: any[];
  feedback?: any[];
}

interface MonthlyGrowthData {
  month: string;
  events: number;
  rsvps: number;
  attendance: number;
  feedback: number;
}

export const TrendAnalysis = ({ events, userRsvps, feedback = [] }: TrendAnalysisProps) => {
  // Weekly trends for the last 12 weeks
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

  // Monthly growth trends
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

  const monthlyData = (Object.values(monthlyGrowth) as MonthlyGrowthData[]).sort((a, b) => a.month.localeCompare(b.month));

  // Calculate growth rates
  const calculateGrowthRate = (data: MonthlyGrowthData[], key: keyof MonthlyGrowthData) => {
    if (data.length < 2) return 0;
    const current = Number(data[data.length - 1][key]);
    const previous = Number(data[data.length - 2][key]);
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const eventsGrowthRate = calculateGrowthRate(monthlyData, 'events');
  const rsvpsGrowthRate = calculateGrowthRate(monthlyData, 'rsvps');
  const attendanceGrowthRate = calculateGrowthRate(monthlyData, 'attendance');
  const feedbackGrowthRate = calculateGrowthRate(monthlyData, 'feedback');

  // Attendance rate trend
  const attendanceTrend = monthlyData.map((month: MonthlyGrowthData) => ({
    ...month,
    attendanceRate: month.rsvps > 0 ? (month.attendance / month.rsvps) * 100 : 0
  }));

  // Key insights
  const totalEventsLastMonth = monthlyData.length >= 2 ? monthlyData[monthlyData.length - 2].events : 0;
  const totalEventsThisMonth = monthlyData.length >= 1 ? monthlyData[monthlyData.length - 1].events : 0;
  
  const avgWeeklyEvents = weeklyTrends.reduce((sum, week) => sum + week.events, 0) / weeklyTrends.length;
  const avgWeeklyRsvps = weeklyTrends.reduce((sum, week) => sum + week.rsvps, 0) / weeklyTrends.length;

  return (
    <div className="space-y-6">
      {/* Growth Rate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Events Growth</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(eventsGrowthRate)}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Month over month</p>
              </div>
              {eventsGrowthRate >= 0 ? 
                <TrendingUp className="w-8 h-8 text-green-600" /> :
                <TrendingDown className="w-8 h-8 text-red-600" />
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">RSVPs Growth</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(rsvpsGrowthRate)}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Month over month</p>
              </div>
              {rsvpsGrowthRate >= 0 ? 
                <TrendingUp className="w-8 h-8 text-green-600" /> :
                <TrendingDown className="w-8 h-8 text-red-600" />
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance Growth</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(attendanceGrowthRate)}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Month over month</p>
              </div>
              {attendanceGrowthRate >= 0 ? 
                <TrendingUp className="w-8 h-8 text-green-600" /> :
                <TrendingDown className="w-8 h-8 text-red-600" />
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Engagement Growth</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(feedbackGrowthRate)}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Feedback month over month</p>
              </div>
              {feedbackGrowthRate >= 0 ? 
                <TrendingUp className="w-8 h-8 text-green-600" /> :
                <TrendingDown className="w-8 h-8 text-red-600" />
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity Trends</CardTitle>
            <CardDescription>Recent 12 weeks performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="events" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Events"
                />
                <Line 
                  type="monotone" 
                  dataKey="rsvps" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="RSVPs"
                />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Attendance"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Growth Trends</CardTitle>
            <CardDescription>Long-term growth patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="events" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  name="Events"
                />
                <Area 
                  type="monotone" 
                  dataKey="rsvps" 
                  stackId="2"
                  stroke="#10b981" 
                  fill="#10b981"
                  fillOpacity={0.6}
                  name="RSVPs"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Rate Trend</CardTitle>
            <CardDescription>How attendance rates change over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${Math.round(Number(value))}%`, 'Attendance Rate']} />
                <Line 
                  type="monotone" 
                  dataKey="attendanceRate" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  name="Attendance Rate"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>Important trend observations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">Event Creation</h4>
                </div>
                <p className="text-sm text-blue-700 mt-2">
                  {totalEventsThisMonth > totalEventsLastMonth ? 
                    `Events increased by ${totalEventsThisMonth - totalEventsLastMonth} this month` :
                    totalEventsThisMonth < totalEventsLastMonth ?
                    `Events decreased by ${totalEventsLastMonth - totalEventsThisMonth} this month` :
                    'Event creation remained stable this month'
                  }
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-900">Weekly Averages</h4>
                </div>
                <p className="text-sm text-green-700 mt-2">
                  {Math.round(avgWeeklyEvents * 10) / 10} events and {Math.round(avgWeeklyRsvps * 10) / 10} RSVPs per week on average
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-purple-900">Best Performing Metric</h4>
                </div>
                <p className="text-sm text-purple-700 mt-2">
                  {Math.max(eventsGrowthRate, rsvpsGrowthRate, attendanceGrowthRate, feedbackGrowthRate) === eventsGrowthRate ? 'Events' :
                   Math.max(rsvpsGrowthRate, attendanceGrowthRate, feedbackGrowthRate) === rsvpsGrowthRate ? 'RSVPs' :
                   Math.max(attendanceGrowthRate, feedbackGrowthRate) === attendanceGrowthRate ? 'Attendance' : 'Feedback'
                  } showing the strongest growth this month
                </p>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Peak Activity Period</span>
                <span className="text-sm font-bold text-gray-900">
                  {weeklyTrends.length > 0 ? 
                    weeklyTrends.reduce((max, week) => week.rsvps > max.rsvps ? week : max).week :
                    'N/A'
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
