
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { EngagementLevelData, RoleData, ActivityData } from './utils/userEngagementUtils';

interface UserEngagementChartsProps {
  engagementData: EngagementLevelData[];
  roleData: RoleData[];
  activityData: ActivityData[];
}

const COLORS = ['#4285F4', '#34A853', '#F4B400', '#EA4335', '#8b5cf6'];

export const UserEngagementCharts = ({ engagementData, roleData, activityData }: UserEngagementChartsProps) => {
  return (
    <div className="w-full max-w-full overflow-hidden font-['Segoe_UI']">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg min-w-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-gray-900">User Engagement Levels</CardTitle>
            <CardDescription className="text-sm text-gray-600">Distribution of user activity</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <Pie
                    data={engagementData}
                    cx="50%"
                    cy="45%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="count"
                    label={({ level, count }) => `${level}: ${count}`}
                  >
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontFamily: 'Segoe UI'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg min-w-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-gray-900">User Role Distribution</CardTitle>
            <CardDescription className="text-sm text-gray-600">Types of users on the platform</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roleData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="role" 
                    tick={{ fontSize: 11, fontFamily: 'Segoe UI' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 11, fontFamily: 'Segoe UI' }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontFamily: 'Segoe UI'
                    }} 
                  />
                  <Bar dataKey="count" fill="#4285F4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-0 shadow-lg min-w-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-gray-900">Monthly User Activity</CardTitle>
            <CardDescription className="text-sm text-gray-600">RSVPs and active users over time</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 11, fontFamily: 'Segoe UI' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 11, fontFamily: 'Segoe UI' }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontFamily: 'Segoe UI'
                    }} 
                  />
                  <Bar dataKey="rsvps" fill="#4285F4" name="RSVPs" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="activeUsers" fill="#34A853" name="Active Users" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
