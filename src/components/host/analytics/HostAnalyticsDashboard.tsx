
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventPerformanceChart } from './EventPerformanceChart';
import { EngagementMetrics } from './EngagementMetrics';
import { AttendanceAnalytics } from './AttendanceAnalytics';
import { GeographicDistribution } from './GeographicDistribution';
import { EventComparisonChart } from './EventComparisonChart';
import { TimeAnalytics } from './TimeAnalytics';
import { HostEventsSummary } from './HostEventsSummary';
import { HostFeedbackAnalytics } from './HostFeedbackAnalytics';
import { BarChart3, TrendingUp, Users, Clock, MessageSquare } from 'lucide-react';

interface HostAnalyticsDashboardProps {
  events: any[];
  userRsvps?: any[];
  feedback?: any[];
}

export const HostAnalyticsDashboard = ({ 
  events, 
  userRsvps = [], 
  feedback = [] 
}: HostAnalyticsDashboardProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Host Analytics Dashboard</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="engagement" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Engagement
          </TabsTrigger>
          <TabsTrigger value="attendance" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Attendance
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <HostEventsSummary events={events} userRsvps={userRsvps} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EventPerformanceChart events={events} />
            <AttendanceAnalytics events={events} />
          </div>
          <EventComparisonChart events={events} />
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <EngagementMetrics events={events} />
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GeographicDistribution events={events} />
            <TimeAnalytics events={events} />
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <HostFeedbackAnalytics events={events} feedback={feedback} />
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Host Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <h3 className="font-semibold text-blue-900">Total Events Hosted</h3>
                  <p className="text-blue-800">You've successfully hosted {events.length} events</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <h3 className="font-semibold text-green-900">Average RSVPs</h3>
                  <p className="text-green-800">
                    {events.length > 0 ? Math.round(userRsvps.length / events.length) : 0} RSVPs per event on average
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                  <h3 className="font-semibold text-purple-900">Engagement Rate</h3>
                  <p className="text-purple-800">
                    {events.length > 0 ? Math.round((feedback.length / events.length) * 100) / 100 : 0} feedback items per event
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
