
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
import { BarChart3, TrendingUp, Users, Clock, MessageSquare, DollarSign } from 'lucide-react';

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
  // Calculate host business metrics
  const totalRevenue = events.length * 50; // Mock revenue calculation
  const averageAttendance = userRsvps.length > 0 ? Math.round(userRsvps.length / events.length) : 0;
  const growthRate = events.length > 1 ? 15 : 0; // Mock growth rate

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Host Business Analytics</h2>
      </div>

      {/* Host-specific quick metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-xl font-bold">${totalRevenue}</p>
              </div>
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Attendance</p>
                <p className="text-xl font-bold">{averageAttendance}</p>
              </div>
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Growth Rate</p>
                <p className="text-xl font-bold">+{growthRate}%</p>
              </div>
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Event Quality</p>
                <p className="text-xl font-bold">4.8/5</p>
              </div>
              <MessageSquare className="w-6 h-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="audience" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Audience
          </TabsTrigger>
          <TabsTrigger value="optimization" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Optimization
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <HostEventsSummary events={events} userRsvps={userRsvps} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EventPerformanceChart events={events} />
            <AttendanceAnalytics events={events} />
          </div>
          <EventComparisonChart events={events} />
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900">Total Revenue</h3>
                  <p className="text-2xl font-bold text-green-600">${totalRevenue}</p>
                  <p className="text-sm text-green-700">From {events.length} events</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900">Avg per Event</h3>
                  <p className="text-2xl font-bold text-blue-600">${events.length > 0 ? Math.round(totalRevenue / events.length) : 0}</p>
                  <p className="text-sm text-blue-700">Revenue per event</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-900">Growth</h3>
                  <p className="text-2xl font-bold text-purple-600">+{growthRate}%</p>
                  <p className="text-sm text-purple-700">Month over month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GeographicDistribution events={events} />
            <EngagementMetrics events={events} />
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <TimeAnalytics events={events} />
          <Card>
            <CardHeader>
              <CardTitle>Event Optimization Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <h3 className="font-semibold text-blue-900">Best Performing Event Type</h3>
                  <p className="text-blue-800">Workshops have 23% higher attendance rates</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <h3 className="font-semibold text-green-900">Optimal Event Duration</h3>
                  <p className="text-green-800">2-3 hour events have the highest satisfaction scores</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                  <h3 className="font-semibold text-purple-900">Recommended Improvements</h3>
                  <p className="text-purple-800">Consider hosting more events on weekends for better attendance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <HostFeedbackAnalytics events={events} feedback={feedback} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
