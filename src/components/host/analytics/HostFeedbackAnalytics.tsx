
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Star, TrendingUp, Heart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HostFeedbackAnalyticsProps {
  events: any[];
  feedback: any[];
}

export const HostFeedbackAnalytics = ({ events, feedback }: HostFeedbackAnalyticsProps) => {
  // Calculate feedback metrics
  const totalFeedback = feedback.length;
  const eventsWithFeedback = new Set(feedback.map(f => f.event_id)).size;
  const averageFeedbackPerEvent = events.length > 0 ? (totalFeedback / events.length).toFixed(1) : '0';
  const engagementRate = events.length > 0 ? Math.round((eventsWithFeedback / events.length) * 100) : 0;

  // Group feedback by event for chart
  const feedbackByEvent = events.map(event => {
    const eventFeedback = feedback.filter(f => f.event_id === event.id);
    return {
      name: event.title.length > 15 ? event.title.substring(0, 15) + '...' : event.title,
      feedback: eventFeedback.length,
      comments: eventFeedback.filter(f => f.comment).length,
      reactions: eventFeedback.filter(f => f.emoji).length
    };
  }).filter(event => event.feedback > 0);

  // Recent feedback
  const recentFeedback = feedback
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Feedback</p>
                <p className="text-2xl font-bold text-gray-900">{totalFeedback}</p>
                <p className="text-xs text-gray-500 mt-1">All events</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. per Event</p>
                <p className="text-2xl font-bold text-gray-900">{averageFeedbackPerEvent}</p>
                <p className="text-xs text-gray-500 mt-1">Feedback items</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Events with Feedback</p>
                <p className="text-2xl font-bold text-gray-900">{eventsWithFeedback}</p>
                <p className="text-xs text-gray-500 mt-1">Out of {events.length} total</p>
              </div>
              <Heart className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                <p className="text-2xl font-bold text-gray-900">{engagementRate}%</p>
                <p className="text-xs text-gray-500 mt-1">Events with feedback</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback by Event Chart */}
      {feedbackByEvent.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Feedback by Event</CardTitle>
            <CardDescription>Comments and reactions for each event</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={feedbackByEvent}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="comments" fill="#3b82f6" name="Comments" />
                <Bar dataKey="reactions" fill="#10b981" name="Reactions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Recent Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
          <CardDescription>Latest comments and reactions from your events</CardDescription>
        </CardHeader>
        <CardContent>
          {recentFeedback.length > 0 ? (
            <div className="space-y-4">
              {recentFeedback.map((item, index) => {
                const event = events.find(e => e.id === item.event_id);
                return (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {event ? event.title : 'Unknown Event'}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                      {item.emoji && (
                        <span className="text-lg">{item.emoji}</span>
                      )}
                    </div>
                    {item.comment && (
                      <p className="text-gray-700">{item.comment}</p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback yet</h3>
              <p className="text-gray-500">
                Feedback from your event attendees will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
