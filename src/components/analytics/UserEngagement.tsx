
import { UserEngagementSummary } from './UserEngagementSummary';
import { UserEngagementCharts } from './UserEngagementCharts';
import { UserEngagementDetails } from './UserEngagementDetails';
import {
  processUserEngagement,
  processEngagementLevels,
  processRoleDistribution,
  processMonthlyUserActivity,
  getTopEngagedUsers,
  calculateUserStats
} from './utils/userEngagementUtils';

interface UserEngagementProps {
  events: any[];
  userRsvps: any[];
  users?: any[];
}

export const UserEngagement = ({ events, userRsvps, users = [] }: UserEngagementProps) => {
  // Process all data using utility functions
  const userEngagement = processUserEngagement(users, userRsvps);
  const engagementData = processEngagementLevels(userEngagement, users.length);
  const roleData = processRoleDistribution(users);
  const activityData = processMonthlyUserActivity(userRsvps);
  const topUsers = getTopEngagedUsers(userEngagement);
  const { totalActiveUsers, averageRsvpsPerUser, averageAttendanceRate } = calculateUserStats(users, userEngagement, userRsvps);

  return (
    <div className="space-y-6">
      <UserEngagementSummary 
        totalUsers={users.length}
        totalActiveUsers={totalActiveUsers}
        averageRsvpsPerUser={averageRsvpsPerUser}
        averageAttendanceRate={averageAttendanceRate}
      />

      <UserEngagementCharts 
        engagementData={engagementData}
        roleData={roleData}
        activityData={activityData}
      />

      <UserEngagementDetails 
        topUsers={topUsers}
        engagementData={engagementData}
        users={users}
        userEngagement={userEngagement}
        averageRsvpsPerUser={averageRsvpsPerUser}
      />
    </div>
  );
};
