
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventPerformanceChart } from './EventPerformanceChart';
import { EngagementMetrics } from './EngagementMetrics';
import { AttendanceAnalytics } from './AttendanceAnalytics';
import { GeographicDistribution } from './GeographicDistribution';
import { EventComparisonChart } from './EventComparisonChart';
import { TimeAnalytics } from './TimeAnalytics';
import { BarChart3, TrendingUp, Users, Clock } from 'lucide-react';

interface HostAnalyticsDashboardProps {
  events: any[];
}

export const HostAnalyticsDashboard = ({ events }: HostAnalyticsDashboardProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
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

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <h3 className="font-semibold text-blue-900">Best Performing Event</h3>
                  <p className="text-blue-800">Your highest attendance rate was 89% for "Tech Innovation Summit"</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <h3 className="font-semibold text-green-900">Engagement Growth</h3>
                  <p className="text-green-800">Average engagement increased by 23% over the last 3 events</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                  <h3 className="font-semibold text-orange-900">Optimal Timing</h3>
                  <p className="text-orange-800">Events scheduled between 2-4 PM show 15% higher attendance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
