
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Star, Target, Flame, Calendar } from 'lucide-react';

interface AttendanceStreakProps {
  events: any[];
  userRsvps: any[];
}

export const AttendanceStreak = ({ events, userRsvps }: AttendanceStreakProps) => {
  const attendedEvents = events.filter(e => {
    const rsvp = userRsvps.find(r => r.event_id === e.id);
    return rsvp?.checkin_time;
  }).sort((a, b) => new Date(a.date_time).getTime() - new Date(b.date_time).getTime());

  // Calculate current streak
  const calculateStreak = () => {
    if (attendedEvents.length === 0) return 0;
    
    let streak = 1;
    const today = new Date();
    let lastEventDate = new Date(attendedEvents[attendedEvents.length - 1].date_time);
    
    // Check if last event was within reasonable time (30 days)
    const daysSinceLastEvent = (today.getTime() - lastEventDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceLastEvent > 30) return 0;
    
    for (let i = attendedEvents.length - 2; i >= 0; i--) {
      const currentEventDate = new Date(attendedEvents[i].date_time);
      const daysBetween = (lastEventDate.getTime() - currentEventDate.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysBetween <= 45) { // Within 45 days considered continuous
        streak++;
        lastEventDate = currentEventDate;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const currentStreak = calculateStreak();
  const totalEvents = attendedEvents.length;
  const totalRsvps = userRsvps.length;
  
  // Calculate achievements
  const achievements = [
    {
      id: 'first_event',
      title: 'First Event',
      description: 'Attended your first event',
      icon: Star,
      earned: totalEvents >= 1,
      color: 'bg-blue-500'
    },
    {
      id: 'early_bird',
      title: 'Early Bird',
      description: 'Attended 5 events',
      icon: Calendar,
      earned: totalEvents >= 5,
      color: 'bg-green-500'
    },
    {
      id: 'regular',
      title: 'Regular Attendee',
      description: 'Attended 10 events',
      icon: Target,
      earned: totalEvents >= 10,
      color: 'bg-purple-500'
    },
    {
      id: 'super_fan',
      title: 'Super Fan',
      description: 'Attended 25 events',
      icon: Trophy,
      earned: totalEvents >= 25,
      color: 'bg-yellow-500'
    },
    {
      id: 'streak_master',
      title: 'Streak Master',
      description: 'Maintained a 5-event streak',
      icon: Flame,
      earned: currentStreak >= 5,
      color: 'bg-red-500'
    },
    {
      id: 'community_champion',
      title: 'Community Champion',
      description: 'Attended 50 events',
      icon: Award,
      earned: totalEvents >= 50,
      color: 'bg-indigo-500'
    }
  ];

  const earnedAchievements = achievements.filter(a => a.earned);
  const nextAchievement = achievements.find(a => !a.earned);

  // Monthly consistency (attended at least one event per month for X months)
  const monthlyConsistency = () => {
    const monthsWithEvents = new Set();
    attendedEvents.forEach(event => {
      const date = new Date(event.date_time);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      monthsWithEvents.add(monthKey);
    });
    return monthsWithEvents.size;
  };

  const consistentMonths = monthlyConsistency();

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-3xl font-bold text-orange-600">{currentStreak}</p>
                <p className="text-xs text-gray-500 mt-1">consecutive events</p>
              </div>
              <Flame className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-3xl font-bold text-blue-600">{totalEvents}</p>
                <p className="text-xs text-gray-500 mt-1">events attended</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Achievements</p>
                <p className="text-3xl font-bold text-purple-600">{earnedAchievements.length}</p>
                <p className="text-xs text-gray-500 mt-1">of {achievements.length} unlocked</p>
              </div>
              <Trophy className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Streak</p>
                <p className="text-3xl font-bold text-green-600">{consistentMonths}</p>
                <p className="text-xs text-gray-500 mt-1">months active</p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Achievements
          </CardTitle>
          <CardDescription>
            Track your progress and unlock new achievements as you engage with events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border transition-all ${
                  achievement.earned
                    ? 'bg-gradient-to-r from-gray-50 to-white border-gray-200 shadow-sm'
                    : 'bg-gray-50 border-gray-100 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.earned ? achievement.color : 'bg-gray-300'
                  }`}>
                    <achievement.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                      {achievement.earned && (
                        <Badge className="bg-green-100 text-green-800 text-xs">Earned</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Achievement */}
      {nextAchievement && (
        <Card className="border-2 border-dashed border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <nextAchievement.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Achievement</h3>
              <p className="text-blue-600 font-medium">{nextAchievement.title}</p>
              <p className="text-gray-600 text-sm">{nextAchievement.description}</p>
              
              {nextAchievement.id === 'early_bird' && (
                <p className="text-sm text-gray-500 mt-2">
                  {5 - totalEvents} more events to unlock
                </p>
              )}
              {nextAchievement.id === 'regular' && (
                <p className="text-sm text-gray-500 mt-2">
                  {10 - totalEvents} more events to unlock
                </p>
              )}
              {nextAchievement.id === 'super_fan' && (
                <p className="text-sm text-gray-500 mt-2">
                  {25 - totalEvents} more events to unlock
                </p>
              )}
              {nextAchievement.id === 'streak_master' && (
                <p className="text-sm text-gray-500 mt-2">
                  {5 - currentStreak} more consecutive events to unlock
                </p>
              )}
              {nextAchievement.id === 'community_champion' && (
                <p className="text-sm text-gray-500 mt-2">
                  {50 - totalEvents} more events to unlock
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
