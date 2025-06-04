
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalEventStats } from './PersonalEventStats';
import { EventHistoryChart } from './EventHistoryChart';
import { EngagementInsights } from './EngagementInsights';
import { EventPreferences } from './EventPreferences';
import { AttendanceStreak } from './AttendanceStreak';
import { Calendar, TrendingUp, Heart, Award } from 'lucide-react';

interface AttendeeAnalyticsDashboardProps {
  events: any[];
  userRsvps: any[];
}

export const AttendeeAnalyticsDashboard = ({ events, userRsvps }: AttendeeAnalyticsDashboardProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Analytics</h2>
          <p className="text-gray-600">Insights into your event participation and engagement</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
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
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <PersonalEventStats events={events} userRsvps={userRsvps} />
          <EventHistoryChart events={events} userRsvps={userRsvps} />
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <EngagementInsights events={events} userRsvps={userRsvps} />
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <EventPreferences events={events} userRsvps={userRsvps} />
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <AttendanceStreak events={events} userRsvps={userRsvps} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
