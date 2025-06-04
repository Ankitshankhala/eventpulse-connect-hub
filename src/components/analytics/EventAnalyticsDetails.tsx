
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LocationData, DayOfWeekData } from './utils/eventDataUtils';

interface EventAnalyticsDetailsProps {
  events: any[];
  userRsvps: any[];
  feedback: any[];
  locationData: LocationData[];
  weekData: DayOfWeekData[];
}

export const EventAnalyticsDetails = ({ events, userRsvps, feedback, locationData, weekData }: EventAnalyticsDetailsProps) => {
  const mostPopularDay = weekData.length > 0 ? weekData.reduce((max, day) => day.count > max.count ? day : max).day : 'N/A';
  const averageEventSize = events.length > 0 ? Math.round(userRsvps.length / events.length) : 0;
  const eventsWithFeedback = new Set(feedback.map(f => f.event_id)).size;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Location Types</CardTitle>
          <CardDescription>Virtual vs physical events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {locationData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{item.type}</span>
                  <span className="text-sm text-gray-500">
                    {item.count} events ({Math.round((item.count / events.length) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      backgroundColor: item.color,
                      width: `${(item.count / events.length) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Event Performance</CardTitle>
          <CardDescription>Key performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Most Popular Day</span>
              <span className="text-sm font-bold text-blue-600">{mostPopularDay}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Average Event Size</span>
              <span className="text-sm font-bold text-green-600">{averageEventSize} RSVPs</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Events with Feedback</span>
              <span className="text-sm font-bold text-purple-600">{eventsWithFeedback} events</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
