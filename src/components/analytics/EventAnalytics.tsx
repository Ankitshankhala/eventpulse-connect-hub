
import { EventAnalyticsSummary } from './EventAnalyticsSummary';
import { EventAnalyticsCharts } from './EventAnalyticsCharts';
import { EventAnalyticsDetails } from './EventAnalyticsDetails';
import {
  processEventStatusData,
  processLocationData,
  processMonthlyEventData,
  processEventSizeData,
  processDayOfWeekData
} from './utils/eventDataUtils';

interface EventAnalyticsProps {
  events: any[];
  userRsvps: any[];
  feedback?: any[];
}

export const EventAnalytics = ({ events, userRsvps, feedback = [] }: EventAnalyticsProps) => {
  // Process all data using utility functions
  const eventStatusData = processEventStatusData(events);
  const locationData = processLocationData(events);
  const monthlyData = processMonthlyEventData(events, userRsvps);
  const sizeData = processEventSizeData(events, userRsvps);
  const weekData = processDayOfWeekData(events);

  const virtualEventsCount = locationData.find(l => l.type === 'Virtual')?.count || 0;

  return (
    <div className="space-y-6">
      <EventAnalyticsSummary 
        events={events}
        userRsvps={userRsvps}
        virtualEventsCount={virtualEventsCount}
      />

      <EventAnalyticsCharts 
        monthlyData={monthlyData}
        eventStatusData={eventStatusData}
        sizeData={sizeData}
        weekData={weekData}
      />

      <EventAnalyticsDetails 
        events={events}
        userRsvps={userRsvps}
        feedback={feedback}
        locationData={locationData}
        weekData={weekData}
      />
    </div>
  );
};
