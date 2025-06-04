
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, UserCheck, UserPlus, Activity } from 'lucide-react';

interface UserEngagementProps {
  events: any[];
  userRsvps: any[];
  users?: any[];
}

interface MonthlyActivity {
  month: string;
  rsvps: number;
  uniqueUsers: Set<string>;
}

interface ActivityData {
  month: string;
  rsvps: number;
  activeUsers: number;
}

export const UserEngagement = ({ events, userRsvps, users = [] }: UserEngagementProps) => {
  // User engagement levels
  const userEngagement = users.map(user => {
    const userRsvpCount = userRsvps.filter(rsvp => rsvp.user_id === user.id).length;
    const userAttendanceCount = userRsvps.filter(rsvp => rsvp.user_id === user.id && rsvp.checkin_time).length;
    
    return {
      id: user.id,
      name: user.name,
      rsvps: userRsvpCount,
      attended: userAttendanceCount,
      attendanceRate: userRsvpCount > 0 ? (userAttendanceCount / userRsvpCount) * 100 : 0
    };
  });

  // Engagement level distribution
  const engagementLevels = userEngagement.reduce((acc, user) => {
    const level = user.rsvps === 0 ? 'Inactive' :
                  user.rsvps <= 2 ? 'Low' :
                  user.rsvps <= 5 ? 'Medium' :
                  user.rsvps <= 10 ? 'High' : 'Very High';
    
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const engagementData = Object.entries(engagementLevels).map(([level, count]) => ({
    level,
    count,
    percentage: users.length > 0 ? (count / users.length) * 100 : 0
  }));

  // User role distribution
  const roleDistribution = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const roleData = Object.entries(roleDistribution).map(([role, count]) => ({
    role: role.charAt(0).toUpperCase() + role.slice(1),
    count
  }));

  // Monthly user activity
  const monthlyActivity = userRsvps.reduce((acc, rsvp) => {
    if (!rsvp.rsvp_time) return acc;
    
    const date = new Date(rsvp.rsvp_time);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    if (!acc[monthKey]) {
      acc[monthKey] = { month: monthName, rsvps: 0, uniqueUsers: new Set() };
    }
    
    acc[monthKey].rsvps += 1;
    acc[monthKey].uniqueUsers.add(rsvp.user_id);
    
    return acc;
  }, {} as Record<string, MonthlyActivity>);

  const activityData: ActivityData[] = (Object.values(monthlyActivity) as MonthlyActivity[]).map(item => ({
    month: item.month,
    rsvps: item.rsvps,
    activeUsers: item.uniqueUsers.size
  })).sort((a, b) => a.month.localeCompare(b.month));

  // Top engaged users
  const topUsers = userEngagement
    .filter(user => user.rsvps > 0)
    .sort((a, b) => b.rsvps - a.rsvps)
    .slice(0, 5);

  const totalActiveUsers = userEngagement.filter(user => user.rsvps > 0).length;
  const averageRsvpsPerUser = users.length > 0 ? userRsvps.length / users.length : 0;
  const averageAttendanceRate = userEngagement.length > 0 ? 
    userEngagement.reduce((sum, user) => sum + user.attendanceRate, 0) / userEngagement.length : 0;

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                <p className="text-xs text-gray-500 mt-1">Registered users</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{totalActiveUsers}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {users.length > 0 ? Math.round((totalActiveUsers / users.length) * 100) : 0}% of all users
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. RSVPs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(averageRsvpsPerUser * 10) / 10}
                </p>
                <p className="text-xs text-gray-500 mt-1">Per user</p>
              </div>
              <UserPlus className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Attendance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(averageAttendanceRate)}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Attendance rate</p>
              </div>
              <Activity className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Engagement Levels</CardTitle>
            <CardDescription>Distribution of user activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="count"
                  label={({ level, count }) => `${level}: ${count}`}
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Role Distribution</CardTitle>
            <CardDescription>Types of users on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly User Activity</CardTitle>
            <CardDescription>RSVPs and active users over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rsvps" fill="#3b82f6" name="RSVPs" />
                <Bar dataKey="activeUsers" fill="#10b981" name="Active Users" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Engaged Users</CardTitle>
            <CardDescription>Most active community members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topUsers.length > 0 ? topUsers.map((user, index) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.rsvps} RSVPs, {user.attended} attended</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{Math.round(user.attendanceRate)}%</p>
                    <p className="text-xs text-gray-500">attendance</p>
                  </div>
                </div>
              )) : (
                <p className="text-gray-500 text-center py-4">No active users found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Breakdown</CardTitle>
            <CardDescription>Detailed user activity levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {engagementData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{item.level} Engagement</span>
                    <span className="text-sm text-gray-500">
                      {item.count} users ({Math.round(item.percentage)}%)
                    </span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Statistics</CardTitle>
            <CardDescription>Key user metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">New Users This Month</span>
                <span className="text-sm font-bold text-blue-600">
                  {users.filter(user => {
                    if (!user.created_at) return false;
                    const userDate = new Date(user.created_at);
                    const now = new Date();
                    return userDate.getMonth() === now.getMonth() && 
                           userDate.getFullYear() === now.getFullYear();
                  }).length}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Users with Perfect Attendance</span>
                <span className="text-sm font-bold text-green-600">
                  {userEngagement.filter(user => user.attendanceRate === 100 && user.rsvps > 0).length}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Average Events per User</span>
                <span className="text-sm font-bold text-purple-600">
                  {Math.round(averageRsvpsPerUser * 10) / 10}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
