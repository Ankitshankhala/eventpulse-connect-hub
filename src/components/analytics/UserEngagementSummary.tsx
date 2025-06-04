
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserCheck, UserPlus, Activity } from 'lucide-react';

interface UserEngagementSummaryProps {
  totalUsers: number;
  totalActiveUsers: number;
  averageRsvpsPerUser: number;
  averageAttendanceRate: number;
}

export const UserEngagementSummary = ({ 
  totalUsers, 
  totalActiveUsers, 
  averageRsvpsPerUser, 
  averageAttendanceRate 
}: UserEngagementSummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
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
                {totalUsers > 0 ? Math.round((totalActiveUsers / totalUsers) * 100) : 0}% of all users
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
  );
};
