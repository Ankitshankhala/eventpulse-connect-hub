
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
    <div className="space-y-6 font-segoe">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-ep-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Host Business Analytics</h2>
          <p className="text-gray-600 font-medium">Track your event performance and business growth</p>
        </div>
      </div>

      {/* Host-specific quick metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-ep-green/10 to-green-50 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ep-green/80 uppercase tracking-wide">Revenue</p>
                <p className="text-3xl font-bold text-ep-green">${totalRevenue}</p>
                <p className="text-xs text-ep-green/70 mt-1">Total earnings</p>
              </div>
              <div className="w-12 h-12 bg-ep-green rounded-2xl flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-ep-blue/10 to-blue-50 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ep-blue/80 uppercase tracking-wide">Avg Attendance</p>
                <p className="text-3xl font-bold text-ep-blue">{averageAttendance}</p>
                <p className="text-xs text-ep-blue/70 mt-1">Per event</p>
              </div>
              <div className="w-12 h-12 bg-ep-blue rounded-2xl flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-400/10 to-purple-50 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-purple-600/80 uppercase tracking-wide">Growth Rate</p>
                <p className="text-3xl font-bold text-purple-600">+{growthRate}%</p>
                <p className="text-xs text-purple-600/70 mt-1">Monthly growth</p>
              </div>
              <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-ep-yellow/10 to-orange-50 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ep-yellow/80 uppercase tracking-wide">Event Quality</p>
                <p className="text-3xl font-bold text-ep-yellow">4.8/5</p>
                <p className="text-xs text-ep-yellow/70 mt-1">Average rating</p>
              </div>
              <div className="w-12 h-12 bg-ep-yellow rounded-2xl flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-2xl">
          <TabsTrigger value="performance" className="flex items-center gap-2 font-semibold data-[state=active]:bg-ep-blue data-[state=active]:text-white rounded-xl transition-all">
            <BarChart3 className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center gap-2 font-semibold data-[state=active]:bg-ep-green data-[state=active]:text-white rounded-xl transition-all">
            <DollarSign className="w-4 h-4" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="audience" className="flex items-center gap-2 font-semibold data-[state=active]:bg-ep-blue data-[state=active]:text-white rounded-xl transition-all">
            <Users className="w-4 h-4" />
            Audience
          </TabsTrigger>
          <TabsTrigger value="optimization" className="flex items-center gap-2 font-semibold data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-xl transition-all">
            <Clock className="w-4 h-4" />
            Optimization
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2 font-semibold data-[state=active]:bg-ep-yellow data-[state=active]:text-white rounded-xl transition-all">
            <MessageSquare className="w-4 h-4" />
            Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <HostEventsSummary events={events} userRsvps={userRsvps} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EventPerformanceChart events={events} />
            <AttendanceAnalytics events={events} />
          </div>
          <EventComparisonChart events={events} />
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-ep-green to-green-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold">Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-ep-green/10 to-green-50 rounded-2xl border border-ep-green/20">
                  <h3 className="font-bold text-ep-green text-lg mb-2">Total Revenue</h3>
                  <p className="text-4xl font-bold text-ep-green mb-2">${totalRevenue}</p>
                  <p className="text-sm text-ep-green/70 font-medium">From {events.length} events</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-ep-blue/10 to-blue-50 rounded-2xl border border-ep-blue/20">
                  <h3 className="font-bold text-ep-blue text-lg mb-2">Avg per Event</h3>
                  <p className="text-4xl font-bold text-ep-blue mb-2">${events.length > 0 ? Math.round(totalRevenue / events.length) : 0}</p>
                  <p className="text-sm text-ep-blue/70 font-medium">Revenue per event</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-400/10 to-purple-50 rounded-2xl border border-purple-400/20">
                  <h3 className="font-bold text-purple-600 text-lg mb-2">Growth</h3>
                  <p className="text-4xl font-bold text-purple-600 mb-2">+{growthRate}%</p>
                  <p className="text-sm text-purple-600/70 font-medium">Month over month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GeographicDistribution events={events} />
            <EngagementMetrics events={events} />
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <TimeAnalytics events={events} />
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold">Event Optimization Insights</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-ep-blue/10 to-blue-50 rounded-2xl border-l-4 border-ep-blue">
                  <h3 className="font-bold text-ep-blue text-lg mb-2">Best Performing Event Type</h3>
                  <p className="text-ep-blue/80 font-medium">Workshops have 23% higher attendance rates</p>
                </div>
                <div className="p-6 bg-gradient-to-r from-ep-green/10 to-green-50 rounded-2xl border-l-4 border-ep-green">
                  <h3 className="font-bold text-ep-green text-lg mb-2">Optimal Event Duration</h3>
                  <p className="text-ep-green/80 font-medium">2-3 hour events have the highest satisfaction scores</p>
                </div>
                <div className="p-6 bg-gradient-to-r from-purple-400/10 to-purple-50 rounded-2xl border-l-4 border-purple-400">
                  <h3 className="font-bold text-purple-600 text-lg mb-2">Recommended Improvements</h3>
                  <p className="text-purple-600/80 font-medium">Consider hosting more events on weekends for better attendance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <HostFeedbackAnalytics events={events} feedback={feedback} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
