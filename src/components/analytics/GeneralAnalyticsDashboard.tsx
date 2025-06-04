
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">General Analytics</h2>
          <p className="text-gray-600">Platform-wide insights and performance metrics</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
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
