
export interface UserEngagementData {
  id: string;
  name: string;
  rsvps: number;
  attended: number;
  attendanceRate: number;
}

export interface EngagementLevelData {
  level: string;
  count: number;
  percentage: number;
}

export interface RoleData {
  role: string;
  count: number;
}

export interface MonthlyUserActivity {
  month: string;
  rsvps: number;
  uniqueUsers: Set<string>;
}

export interface ActivityData {
  month: string;
  rsvps: number;
  activeUsers: number;
}

export const processUserEngagement = (users: any[], userRsvps: any[]): UserEngagementData[] => {
  return users.map(user => {
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
};

export const processEngagementLevels = (userEngagement: UserEngagementData[], totalUsers: number): EngagementLevelData[] => {
  const engagementLevels = userEngagement.reduce((acc, user) => {
    const level = user.rsvps === 0 ? 'Inactive' :
                  user.rsvps <= 2 ? 'Low' :
                  user.rsvps <= 5 ? 'Medium' :
                  user.rsvps <= 10 ? 'High' : 'Very High';
    
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(engagementLevels).map(([level, count]) => ({
    level,
    count,
    percentage: totalUsers > 0 ? (count / totalUsers) * 100 : 0
  }));
};

export const processRoleDistribution = (users: any[]): RoleData[] => {
  const roleDistribution = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(roleDistribution).map(([role, count]) => ({
    role: role.charAt(0).toUpperCase() + role.slice(1),
    count
  }));
};

export const processMonthlyUserActivity = (userRsvps: any[]): ActivityData[] => {
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
  }, {} as Record<string, MonthlyUserActivity>);

  return (Object.values(monthlyActivity) as MonthlyUserActivity[]).map(item => ({
    month: item.month,
    rsvps: item.rsvps,
    activeUsers: item.uniqueUsers.size
  })).sort((a, b) => a.month.localeCompare(b.month));
};

export const getTopEngagedUsers = (userEngagement: UserEngagementData[], limit = 5): UserEngagementData[] => {
  return userEngagement
    .filter(user => user.rsvps > 0)
    .sort((a, b) => b.rsvps - a.rsvps)
    .slice(0, limit);
};

export const calculateUserStats = (users: any[], userEngagement: UserEngagementData[], userRsvps: any[]) => {
  const totalActiveUsers = userEngagement.filter(user => user.rsvps > 0).length;
  const averageRsvpsPerUser = users.length > 0 ? userRsvps.length / users.length : 0;
  const averageAttendanceRate = userEngagement.length > 0 ? 
    userEngagement.reduce((sum, user) => sum + user.attendanceRate, 0) / userEngagement.length : 0;

  return {
    totalActiveUsers,
    averageRsvpsPerUser,
    averageAttendanceRate
  };
};
