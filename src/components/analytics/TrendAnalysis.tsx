
import { TrendGrowthCards } from './TrendGrowthCards';
import { TrendCharts } from './TrendCharts';
import { TrendInsights } from './TrendInsights';
import {
  calculateWeeklyTrends,
  calculateMonthlyGrowth,
  calculateGrowthRate,
  calculateAttendanceTrend,
  calculateInsights
} from './utils/trendAnalysisUtils';

interface TrendAnalysisProps {
  events: any[];
  userRsvps: any[];
  feedback?: any[];
}

export const TrendAnalysis = ({ events, userRsvps, feedback = [] }: TrendAnalysisProps) => {
  // Calculate all trend data using utility functions
  const weeklyTrends = calculateWeeklyTrends(events, userRsvps);
  const monthlyData = calculateMonthlyGrowth(events, userRsvps, feedback);

  // Calculate growth rates
  const eventsGrowthRate = calculateGrowthRate(monthlyData, 'events');
  const rsvpsGrowthRate = calculateGrowthRate(monthlyData, 'rsvps');
  const attendanceGrowthRate = calculateGrowthRate(monthlyData, 'attendance');
  const feedbackGrowthRate = calculateGrowthRate(monthlyData, 'feedback');

  // Calculate attendance trend
  const attendanceTrend = calculateAttendanceTrend(monthlyData);

  // Calculate insights
  const insights = calculateInsights(
    monthlyData, 
    weeklyTrends,
    eventsGrowthRate,
    rsvpsGrowthRate,
    attendanceGrowthRate,
    feedbackGrowthRate
  );

  return (
    <div className="space-y-6">
      <TrendGrowthCards 
        eventsGrowthRate={eventsGrowthRate}
        rsvpsGrowthRate={rsvpsGrowthRate}
        attendanceGrowthRate={attendanceGrowthRate}
        feedbackGrowthRate={feedbackGrowthRate}
      />

      <TrendCharts 
        weeklyTrends={weeklyTrends}
        monthlyData={monthlyData}
        attendanceTrend={attendanceTrend}
      />

      <TrendInsights 
        totalEventsLastMonth={insights.totalEventsLastMonth}
        totalEventsThisMonth={insights.totalEventsThisMonth}
        avgWeeklyEvents={insights.avgWeeklyEvents}
        avgWeeklyRsvps={insights.avgWeeklyRsvps}
        bestPerformingMetric={insights.bestPerformingMetric}
        peakActivityPeriod={insights.peakActivityPeriod}
      />
    </div>
  );
};
