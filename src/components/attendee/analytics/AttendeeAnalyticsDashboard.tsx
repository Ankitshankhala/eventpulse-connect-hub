
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalEventStats } from './PersonalEventStats';
import { EventHistoryChart } from './EventHistoryChart';
import { EngagementInsights } from './EngagementInsights';
import { EventPreferences } from './EventPreferences';
import { AttendanceStreak } from './AttendanceStreak';
import { PersonalFeedbackSummary } from './PersonalFeedbackSummary';
import { Calendar, User, Heart, Award, MessageSquare, Target } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Event Journey</h2>
          <p className="text-gray-600">Your personal event activity and growth insights</p>
        </div>
        <div className="flex items-center space-x-2 text-blue-600">
          <User className="w-5 h-5" />
          <span className="font-medium">Personal Analytics</span>
        </div>
      </div>

      {/* Personal quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Events Attended</p>
                <p className="text-xl font-bold">{attendedEvents}</p>
              </div>
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Attendance Rate</p>
                <p className="text-xl font-bold">{attendanceRate}%</p>
              </div>
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Favorite Type</p>
                <p className="text-xl font-bold">{favoriteCategory}</p>
              </div>
              <Heart className="w-6 h-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Connections</p>
                <p className="text-xl font-bold">{socialConnections}</p>
              </div>
              <User className="w-6 h-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            My Activity
          </TabsTrigger>
          <TabsTrigger value="interests" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Interests
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Social
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            My Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-6">
          <PersonalEventStats events={userEvents} userRsvps={userRsvps} />
          <EventHistoryChart events={userEvents} userRsvps={userRsvps} />
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest event interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userEvents.slice(0, 3).map((event, index) => (
                  <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(event.date_time).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interests" className="space-y-6">
          <EventPreferences events={userEvents} userRsvps={userRsvps} />
          
          <Card>
            <CardHeader>
              <CardTitle>Recommended Events</CardTitle>
              <CardDescription>Based on your interests and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Advanced React Workshop</h3>
                  <p className="text-sm text-gray-600">95% match with your interests</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Tech Networking Mixer</h3>
                  <p className="text-sm text-gray-600">87% match with your interests</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">UX Design Masterclass</h3>
                  <p className="text-sm text-gray-600">82% match with your interests</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <AttendanceStreak events={userEvents} userRsvps={userRsvps} />
          
          <Card>
            <CardHeader>
              <CardTitle>Badges & Achievements</CardTitle>
              <CardDescription>Your event participation milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-yellow-900">Event Explorer</h3>
                  <p className="text-sm text-yellow-700">Attended 5+ events</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Heart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-900">Regular Attendee</h3>
                  <p className="text-sm text-blue-700">80%+ attendance rate</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-900">Feedback Champion</h3>
                  <p className="text-sm text-green-700">Left 10+ reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <EngagementInsights events={userEvents} userRsvps={userRsvps} />
          
          <Card>
            <CardHeader>
              <CardTitle>Your Event Network</CardTitle>
              <CardDescription>People you've met through events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Total Connections</span>
                  <span className="font-bold">{socialConnections}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Events with Friends</span>
                  <span className="font-bold">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>People You Follow</span>
                  <span className="font-bold">15</span>
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
