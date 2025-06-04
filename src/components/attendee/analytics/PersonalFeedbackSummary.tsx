
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, ThumbsUp, Star, Calendar } from 'lucide-react';

interface PersonalFeedbackSummaryProps {
  events: any[];
  feedback: any[];
}

export const PersonalFeedbackSummary = ({ events, feedback }: PersonalFeedbackSummaryProps) => {
  // Calculate feedback stats
  const totalFeedback = feedback.length;
  const eventsWithFeedback = new Set(feedback.map(f => f.event_id)).size;
  const averageEngagement = events.length > 0 ? Math.round((eventsWithFeedback / events.length) * 100) : 0;
  
  // Group feedback by event
  const feedbackByEvent = events.map(event => {
    const eventFeedback = feedback.filter(f => f.event_id === event.id);
    return {
      ...event,
      feedbackCount: eventFeedback.length,
      feedback: eventFeedback
    };
  }).filter(event => event.feedbackCount > 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Feedback</p>
                <p className="text-2xl font-bold text-gray-900">{totalFeedback}</p>
                <p className="text-xs text-gray-500 mt-1">Comments & reactions</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Events Engaged</p>
                <p className="text-2xl font-bold text-gray-900">{eventsWithFeedback}</p>
                <p className="text-xs text-gray-500 mt-1">Out of {events.length} attended</p>
              </div>
              <ThumbsUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                <p className="text-2xl font-bold text-gray-900">{averageEngagement}%</p>
                <p className="text-xs text-gray-500 mt-1">Feedback participation</p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback History */}
      <Card>
        <CardHeader>
          <CardTitle>My Feedback History</CardTitle>
          <CardDescription>Your comments and reactions on events you've attended</CardDescription>
        </CardHeader>
        <CardContent>
          {feedbackByEvent.length > 0 ? (
            <div className="space-y-6">
              {feedbackByEvent.map((event) => (
                <div key={event.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(event.date_time).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {event.feedbackCount} feedback{event.feedbackCount !== 1 ? 's' : ''}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {event.feedback.map((feedback: any, index: number) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          {feedback.emoji && (
                            <span className="text-lg">{feedback.emoji}</span>
                          )}
                          <span className="text-xs text-gray-500">
                            {new Date(feedback.timestamp).toLocaleString()}
                          </span>
                        </div>
                        {feedback.comment && (
                          <p className="text-sm text-gray-700">{feedback.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback yet</h3>
              <p className="text-gray-500">
                Start engaging with events by leaving comments and reactions!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
