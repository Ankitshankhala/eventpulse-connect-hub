
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { UserEngagementData, EngagementLevelData } from './utils/userEngagementUtils';

interface UserEngagementDetailsProps {
  topUsers: UserEngagementData[];
  engagementData: EngagementLevelData[];
  users: any[];
  userEngagement: UserEngagementData[];
  averageRsvpsPerUser: number;
}

export const UserEngagementDetails = ({ 
  topUsers, 
  engagementData, 
  users, 
  userEngagement, 
  averageRsvpsPerUser 
}: UserEngagementDetailsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>User Statistics</CardTitle>
          <CardDescription>Key user metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
  );
};
