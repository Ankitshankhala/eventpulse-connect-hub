
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalEventStats } from './PersonalEventStats';
import { EventHistoryChart } from './EventHistoryChart';
import { EngagementInsights } from './EngagementInsights';
import { EventPreferences } from './EventPreferences';
import { AttendanceStreak } from './AttendanceStreak';
import { PersonalFeedbackSummary } from './PersonalFeedbackSummary';
import { Calendar, User, Heart, Award, MessageSquare, Target, Star, Trophy } from 'lucide-react';

interface AttendeeAnalyticsDashboardProps {
  events: any[];
  userRsvps: any[];
  feedback?: any[];
}

export const AttendeeAnalyticsDashboard = ({ 
  events, 
  userRsvps, 
  feedback = [] 
}: AttendeeAnalyticsDashboardProps) => {
  // Filter events to only show those the user has RSVPed to
  const userEventIds = userRsvps.map(rsvp => rsvp.event_id);
  const userEvents = events.filter(event => userEventIds.includes(event.id));

  // Personal insights calculations
  const attendedEvents = userRsvps.filter(rsvp => rsvp.checkin_time).length;
  const attendanceRate = userRsvps.length > 0 ? Math.round((attendedEvents / userRsvps.length) * 100) : 0;
  const favoriteCategory = "Workshops"; // Mock data
  const socialConnections = 12; // Mock data

  return (
    <div className="space-y-6 font-segoe">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-ep-blue to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">My Event Journey</h2>
            <p className="text-gray-600 font-medium">Your personal event activity and growth insights</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-gradient-to-r from-ep-blue/10 to-blue-50 px-6 py-3 rounded-2xl border border-ep-blue/20">
          <Trophy className="w-6 h-6 text-ep-blue" />
          <span className="font-bold text-ep-blue">Personal Analytics</span>
        </div>
      </div>

      {/* Personal quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-ep-blue/10 to-blue-50 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ep-blue/80 uppercase tracking-wide">Events Attended</p>
                <p className="text-3xl font-bold text-ep-blue">{attendedEvents}</p>
                <p className="text-xs text-ep-blue/70 mt-1">Total events</p>
              </div>
              <div className="w-12 h-12 bg-ep-blue rounded-2xl flex items-center justify-center">
                <Calendar className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-ep-green/10 to-green-50 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ep-green/80 uppercase tracking-wide">Attendance Rate</p>
                <p className="text-3xl font-bold text-ep-green">{attendanceRate}%</p>
                <p className="text-xs text-ep-green/70 mt-1">Success rate</p>
              </div>
              <div className="w-12 h-12 bg-ep-green rounded-2xl flex items-center justify-center">
                <Target className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-ep-red/10 to-red-50 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ep-red/80 uppercase tracking-wide">Favorite Type</p>
                <p className="text-2xl font-bold text-ep-red">{favoriteCategory}</p>
                <p className="text-xs text-ep-red/70 mt-1">Most attended</p>
              </div>
              <div className="w-12 h-12 bg-ep-red rounded-2xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-400/10 to-purple-50 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-purple-600/80 uppercase tracking-wide">Connections</p>
                <p className="text-3xl font-bold text-purple-600">{socialConnections}</p>
                <p className="text-xs text-purple-600/70 mt-1">People met</p>
              </div>
              <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center">
                <User className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-2xl">
          <TabsTrigger value="activity" className="flex items-center gap-2 font-semibold data-[state=active]:bg-ep-blue data-[state=active]:text-white rounded-xl transition-all">
            <Calendar className="w-4 h-4" />
            My Activity
          </TabsTrigger>
          <TabsTrigger value="interests" className="flex items-center gap-2 font-semibold data-[state=active]:bg-ep-red data-[state=active]:text-white rounded-xl transition-all">
            <Heart className="w-4 h-4" />
            Interests
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2 font-semibold data-[state=active]:bg-ep-yellow data-[state=active]:text-white rounded-xl transition-all">
            <Award className="w-4 h-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2 font-semibold data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-xl transition-all">
            <User className="w-4 h-4" />
            Social
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2 font-semibold data-[state=active]:bg-ep-green data-[state=active]:text-white rounded-xl transition-all">
            <MessageSquare className="w-4 h-4" />
            My Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-6">
          <PersonalEventStats events={userEvents} userRsvps={userRsvps} />
          <EventHistoryChart events={userEvents} userRsvps={userRsvps} />
          
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-ep-blue to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
              <CardDescription className="text-blue-100">Your latest event interactions</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {userEvents.slice(0, 3).map((event, index) => (
                  <div key={event.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:border-ep-blue/30 transition-all">
                    <div className="w-10 h-10 bg-ep-blue rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-600 font-medium">
                        {new Date(event.date_time).toLocaleDateString()}
                      </p>
                    </div>
                    <Star className="w-5 h-5 text-ep-yellow" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interests" className="space-y-6">
          <EventPreferences events={userEvents} userRsvps={userRsvps} />
          
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-ep-red to-red-600 text-white rounded-t-lg">
              <CardTitle className="text-xl font-bold">Recommended Events</CardTitle>
              <CardDescription className="text-red-100">Based on your interests and activity</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="p-6 border border-ep-red/20 rounded-2xl bg-gradient-to-r from-ep-red/5 to-red-50 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Advanced React Workshop</h3>
                      <p className="text-sm text-ep-red font-semibold">95% match with your interests</p>
                    </div>
                    <div className="w-12 h-12 bg-ep-red rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6 border border-ep-blue/20 rounded-2xl bg-gradient-to-r from-ep-blue/5 to-blue-50 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Tech Networking Mixer</h3>
                      <p className="text-sm text-ep-blue font-semibold">87% match with your interests</p>
                    </div>
                    <div className="w-12 h-12 bg-ep-blue rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6 border border-ep-green/20 rounded-2xl bg-gradient-to-r from-ep-green/5 to-green-50 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">UX Design Masterclass</h3>
                      <p className="text-sm text-ep-green font-semibold">82% match with your interests</p>
                    </div>
                    <div className="w-12 h-12 bg-ep-green rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <AttendanceStreak events={userEvents} userRsvps={userRsvps} />
          
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-ep-yellow to-orange-500 text-white rounded-t-lg">
              <CardTitle className="text-xl font-bold">Badges & Achievements</CardTitle>
              <CardDescription className="text-yellow-100">Your event participation milestones</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-ep-yellow/10 to-yellow-50 rounded-2xl border border-ep-yellow/20 hover:shadow-lg transition-all">
                  <div className="w-16 h-16 bg-ep-yellow rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-ep-yellow text-lg mb-2">Event Explorer</h3>
                  <p className="text-sm text-ep-yellow/80 font-medium">Attended 5+ events</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-ep-blue/10 to-blue-50 rounded-2xl border border-ep-blue/20 hover:shadow-lg transition-all">
                  <div className="w-16 h-16 bg-ep-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-ep-blue text-lg mb-2">Regular Attendee</h3>
                  <p className="text-sm text-ep-blue/80 font-medium">80%+ attendance rate</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-ep-green/10 to-green-50 rounded-2xl border border-ep-green/20 hover:shadow-lg transition-all">
                  <div className="w-16 h-16 bg-ep-green rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-ep-green text-lg mb-2">Feedback Champion</h3>
                  <p className="text-sm text-ep-green/80 font-medium">Left 10+ reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <EngagementInsights events={userEvents} userRsvps={userRsvps} />
          
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
              <CardTitle className="text-xl font-bold">Your Event Network</CardTitle>
              <CardDescription className="text-purple-100">People you've met through events</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                  <span className="font-bold text-gray-900">Total Connections</span>
                  <span className="font-bold text-2xl text-purple-600">{socialConnections}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-ep-blue/10 to-blue-50 rounded-xl border border-ep-blue/20">
                  <span className="font-bold text-gray-900">Events with Friends</span>
                  <span className="font-bold text-2xl text-ep-blue">8</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-ep-green/10 to-green-50 rounded-xl border border-ep-green/20">
                  <span className="font-bold text-gray-900">People You Follow</span>
                  <span className="font-bold text-2xl text-ep-green">15</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <PersonalFeedbackSummary events={userEvents} feedback={feedback} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
