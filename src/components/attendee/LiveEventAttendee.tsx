
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, ThumbsUp, ThumbsDown, Heart, Zap, Send, X } from 'lucide-react';

interface LiveEventAttendeeProps {
  event: any;
  onClose: () => void;
}

export const LiveEventAttendee = ({ event, onClose }: LiveEventAttendeeProps) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('👍');

  const [feed] = useState([
    { id: 1, user: 'Alice Johnson', message: 'Great presentation so far!', emoji: '👍', timestamp: '2 min ago' },
    { id: 2, user: 'Event Host', message: 'Welcome everyone! Feel free to share your thoughts.', emoji: '🎉', timestamp: '5 min ago', isHost: true },
    { id: 3, user: 'Carol Davis', message: 'Loving the interactive elements', emoji: '❤️', timestamp: '7 min ago' },
    { id: 4, user: 'David Wilson', message: 'This is exactly what we needed', emoji: '👍', timestamp: '10 min ago' }
  ]);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackText.trim()) {
      console.log('Submitting feedback:', { text: feedbackText, emoji: selectedEmoji });
      setFeedbackText('');
    }
  };

  const handleEmojiReaction = (emoji: string) => {
    console.log('Emoji reaction:', emoji);
  };

  const emojis = [
    { emoji: '👍', label: 'Like' },
    { emoji: '👎', label: 'Dislike' },
    { emoji: '❤️', label: 'Love' },
    { emoji: '😮', label: 'Wow' }
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                {event.title}
              </DialogTitle>
              <p className="text-gray-600 mt-1">You're attending this live event</p>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 pt-4">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Event Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Event Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Location:</span> {event.location}
                    </div>
                    <div>
                      <span className="font-medium">Host:</span> {event.host}
                    </div>
                    <div>
                      <span className="font-medium">Time:</span> {event.time}
                    </div>
                    <div>
                      <span className="font-medium">Attendees:</span> {event.attendees}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Reactions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Reactions</CardTitle>
                  <CardDescription>Send a quick reaction to the event</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {emojis.map((item) => (
                      <Button
                        key={item.emoji}
                        variant="outline"
                        size="lg"
                        onClick={() => handleEmojiReaction(item.emoji)}
                        className="hover:scale-110 transition-transform"
                      >
                        <span className="text-2xl mr-2">{item.emoji}</span>
                        {item.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Feedback Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Share Your Feedback</CardTitle>
                  <CardDescription>Let the host know what you think</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitFeedback} className="space-y-4">
                    <div className="flex space-x-3">
                      <div className="flex-1">
                        <Input
                          placeholder="Share your thoughts..."
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          className="min-h-[40px]"
                        />
                      </div>
                      <select
                        value={selectedEmoji}
                        onChange={(e) => setSelectedEmoji(e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-md text-xl bg-white"
                      >
                        {emojis.map((item) => (
                          <option key={item.emoji} value={item.emoji}>
                            {item.emoji}
                          </option>
                        ))}
                      </select>
                      <Button type="submit" disabled={!feedbackText.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Live Feed */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Live Feed
                  </CardTitle>
                  <CardDescription>Real-time feedback from attendees</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {feed.map((item) => (
                      <div 
                        key={item.id} 
                        className={`p-3 rounded-lg ${item.isHost ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'} transition-colors`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`font-medium text-sm ${item.isHost ? 'text-blue-900' : 'text-gray-900'}`}>
                            {item.user}
                          </span>
                          {item.isHost && (
                            <Badge className="bg-blue-100 text-blue-800 text-xs">Host</Badge>
                          )}
                          <span className="text-lg">{item.emoji}</span>
                        </div>
                        <p className="text-sm text-gray-700">{item.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.timestamp}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
