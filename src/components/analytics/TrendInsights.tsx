
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, TrendingUp } from 'lucide-react';

interface TrendInsightsProps {
  totalEventsLastMonth: number;
  totalEventsThisMonth: number;
  avgWeeklyEvents: number;
  avgWeeklyRsvps: number;
  bestPerformingMetric: string;
  peakActivityPeriod: string;
}

export const TrendInsights = ({
  totalEventsLastMonth,
  totalEventsThisMonth,
  avgWeeklyEvents,
  avgWeeklyRsvps,
  bestPerformingMetric,
  peakActivityPeriod
}: TrendInsightsProps) => {
  return (
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
              {bestPerformingMetric} showing the strongest growth this month
            </p>
          </div>

          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium">Peak Activity Period</span>
            <span className="text-sm font-bold text-gray-900">
              {peakActivityPeriod}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
