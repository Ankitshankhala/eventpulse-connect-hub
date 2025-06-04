
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalEventStats } from './PersonalEventStats';
import { EventHistoryChart } from './EventHistoryChart';
import { EngagementInsights } from './EngagementInsights';
import { EventPreferences } from './EventPreferences';
import { AttendanceStreak } from './AttendanceStreak';
import { PersonalFeedbackSummary } from './PersonalFeedbackSummary';
import { Calendar, TrendingUp, Heart, Award, MessageSquare } from 'lucide-react';

interface AttendeeAnalyticsDashboardProps {
  events: any[];
  userRsvps: any[];
  feedback?: any[];
}

export const AttendeeAnalyticsDashboard = ({ 
  events, 
  userRsvps, 
  feedback = [] 
}: AttendeeAnalyticsDashboardProps) => {
  // Filter events to only show those the user has RSVPed to
  const userEventIds = userRsvps.map(rsvp => rsvp.event_id);
  const userEvents = events.filter(event => userEventIds.includes(event.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Analytics</h2>
          <p className="text-gray-600">Personal insights into your event participation and engagement</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="engagement" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Engagement
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            My Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <PersonalEventStats events={userEvents} userRsvps={userRsvps} />
          <EventHistoryChart events={userEvents} userRsvps={userRsvps} />
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <EngagementInsights events={userEvents} userRsvps={userRsvps} />
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <EventPreferences events={userEvents} userRsvps={userRsvps} />
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <AttendanceStreak events={userEvents} userRsvps={userRsvps} />
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <PersonalFeedbackSummary events={userEvents} feedback={feedback} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
