
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewMetrics } from './OverviewMetrics';
import { EventAnalytics } from './EventAnalytics';
import { UserEngagement } from './UserEngagement';
import { TrendAnalysis } from './TrendAnalysis';
import { BarChart3, Users, Calendar, TrendingUp } from 'lucide-react';

interface GeneralAnalyticsDashboardProps {
  events: any[];
  userRsvps: any[];
  users?: any[];
  feedback?: any[];
}

export const GeneralAnalyticsDashboard = ({ 
  events, 
  userRsvps, 
  users = [], 
  feedback = [] 
}: GeneralAnalyticsDashboardProps) => {
  return (
    <div className="space-y-6 font-['Segoe_UI']">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-[#4285F4] to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">General Analytics</h2>
            <p className="text-gray-600 font-medium">Platform-wide insights and performance metrics</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-2xl">
          <TabsTrigger value="overview" className="flex items-center gap-2 font-semibold data-[state=active]:bg-[#4285F4] data-[state=active]:text-white rounded-xl transition-all">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2 font-semibold data-[state=active]:bg-[#34A853] data-[state=active]:text-white rounded-xl transition-all">
            <Calendar className="w-4 h-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2 font-semibold data-[state=active]:bg-[#F4B400] data-[state=active]:text-white rounded-xl transition-all">
            <Users className="w-4 h-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2 font-semibold data-[state=active]:bg-[#EA4335] data-[state=active]:text-white rounded-xl transition-all">
            <TrendingUp className="w-4 h-4" />
            Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewMetrics 
            events={events} 
            userRsvps={userRsvps} 
            users={users}
            feedback={feedback}
          />
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <EventAnalytics 
            events={events} 
            userRsvps={userRsvps}
            feedback={feedback}
          />
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <UserEngagement 
            events={events} 
            userRsvps={userRsvps} 
            users={users}
          />
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <TrendAnalysis 
            events={events} 
            userRsvps={userRsvps}
            feedback={feedback}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
