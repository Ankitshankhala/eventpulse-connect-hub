
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, X, Users, Clock, MapPin, Mic, Video, Share2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface LiveEventAttendeeProps {
  event: any;
  onClose: () => void;
}

interface FeedItem {
  id: number;
  user: string;
  message: string;
  emoji: string;
  timestamp: string;
  isHost?: boolean;
  isOwn?: boolean;
}

export const LiveEventAttendee = ({ event, onClose }: LiveEventAttendeeProps) => {
  const { user } = useAuth();
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('👍');
  const [feed, setFeed] = useState<FeedItem[]>([
    { id: 1, user: 'Alice Johnson', message: 'Great presentation so far!', emoji: '👍', timestamp: '2 min ago' },
    { id: 2, user: 'Event Host', message: 'Welcome everyone! Feel free to share your thoughts.', emoji: '🎉', timestamp: '5 min ago', isHost: true },
    { id: 3, user: 'Carol Davis', message: 'Loving the interactive elements', emoji: '❤️', timestamp: '7 min ago' },
    { id: 4, user: 'David Wilson', message: 'This is exactly what we needed', emoji: '👍', timestamp: '10 min ago' }
  ]);
  
  const [attendeeCount, setAttendeeCount] = useState(23);
  const [reactionCounts, setReactionCounts] = useState({
    '👍': 12,
    '👎': 2,
    '❤️': 8,
    '😮': 3,
    '🔥': 5,
    '👏': 7
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update attendee count
      if (Math.random() > 0.7) {
        setAttendeeCount(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      }

      // Occasionally add new messages
      if (Math.random() > 0.85) {
        const messages = [
          'This is so helpful!',
          'Can you repeat that last part?',
          'Great insights!',
          'Perfect timing for this topic',
          'Love the examples'
        ];
        const users = ['Mike Chen', 'Sarah Williams', 'Tom Rodriguez', 'Lisa Park'];
        const emojis = ['👍', '❤️', '😮', '👏', '🔥'];
        
        const newMessage: FeedItem = {
          id: Date.now(),
          user: users[Math.floor(Math.random() * users.length)],
          message: messages[Math.floor(Math.random() * messages.length)],
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          timestamp: 'just now'
        };
        
        setFeed(prev => [newMessage, ...prev.slice(0, 9)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackText.trim() && user) {
      try {
        // Add to Supabase feedback table
        const { error } = await supabase
          .from('feedback')
          .insert({
            event_id: event.id,
            user_id: user.id,
            comment: feedbackText,
            emoji: selectedEmoji
          });

        if (error) throw error;

        // Add to local feed for immediate feedback
        const newFeedback: FeedItem = {
          id: Date.now(),
          user: user.user_metadata?.name || user.email || 'You',
          message: feedbackText,
          emoji: selectedEmoji,
          timestamp: 'just now',
          isOwn: true
        };
        
        setFeed(prev => [newFeedback, ...prev]);
        setFeedbackText('');
        console.log('Feedback submitted successfully');
      } catch (error) {
        console.error('Error submitting feedback:', error);
      }
    }
  };

  const handleEmojiReaction = (emoji: string) => {
    setReactionCounts(prev => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1
    }));
    console.log('Emoji reaction:', emoji);
  };

  const emojis = [
    { emoji: '👍', label: 'Like' },
    { emoji: '👎', label: 'Dislike' },
    { emoji: '❤️', label: 'Love' },
    { emoji: '😮', label: 'Wow' },
    { emoji: '🔥', label: 'Fire' },
    { emoji: '👏', label: 'Clap' }
  ];

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 border-b bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl flex items-center text-gray-900">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                {event.title}
                <Badge className="ml-3 bg-green-100 text-green-800 border-green-200">
                  LIVE
                </Badge>
              </DialogTitle>
              <p className="text-gray-600 mt-2 flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {attendeeCount} attendees • You're connected
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 h-full">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6 overflow-y-auto">
              {/* Event Info */}
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Video className="w-5 h-5 mr-2 text-blue-600" />
                    Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 leading-relaxed">{event.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      <div>
                        <span className="font-medium block">Time:</span>
                        <span className="text-gray-600">{formatDateTime(event.date_time)}</span>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                      <div>
                        <span className="font-medium block">Location:</span>
                        <span className="text-gray-600">
                          {event.location.includes('http') ? 'Virtual Event' : event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Live Reactions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <span className="text-2xl mr-2">🎉</span>
                    Live Reactions
                  </CardTitle>
                  <CardDescription>Express your feelings about the event in real-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                    {emojis.map((item) => (
                      <Button
                        key={item.emoji}
                        variant="outline"
                        size="lg"
                        onClick={() => handleEmojiReaction(item.emoji)}
                        className="hover:scale-110 transition-all duration-200 h-16 flex-col relative group"
                      >
                        <span className="text-2xl mb-1">{item.emoji}</span>
                        <span className="text-xs font-medium">{reactionCounts[item.emoji] || 0}</span>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.label}
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Feedback Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
                    Share Your Thoughts
                  </CardTitle>
                  <CardDescription>Join the conversation and share your feedback with other attendees</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitFeedback} className="space-y-4">
                    <div className="flex space-x-3">
                      <div className="flex-1">
                        <Input
                          placeholder="What are your thoughts on this event? Ask questions, share insights..."
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          className="min-h-[48px] text-base"
                          maxLength={280}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {280 - feedbackText.length} characters remaining
                        </p>
                      </div>
                      <select
                        value={selectedEmoji}
                        onChange={(e) => setSelectedEmoji(e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-md text-xl bg-white hover:border-blue-300 focus:border-blue-500 focus:outline-none"
                      >
                        {emojis.map((item) => (
                          <option key={item.emoji} value={item.emoji}>
                            {item.emoji}
                          </option>
                        ))}
                      </select>
                      <Button 
                        type="submit" 
                        disabled={!feedbackText.trim()}
                        className="px-6 bg-blue-600 hover:bg-blue-700"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Live Feed */}
            <div className="lg:col-span-1">
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
                    Live Feed
                    <Badge className="ml-2 bg-green-100 text-green-800">{feed.length}</Badge>
                  </CardTitle>
                  <CardDescription>Real-time comments from attendees</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-3">
                      {feed.map((item) => (
                        <div 
                          key={item.id} 
                          className={`p-3 rounded-lg transition-all duration-300 ${
                            item.isHost 
                              ? 'bg-blue-50 border border-blue-200 shadow-sm' 
                              : item.isOwn
                                ? 'bg-green-50 border border-green-200 shadow-sm'
                                : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`font-medium text-sm ${
                              item.isHost ? 'text-blue-900' : item.isOwn ? 'text-green-900' : 'text-gray-900'
                            }`}>
                              {item.isOwn ? 'You' : item.user}
                            </span>
                            {item.isHost && (
                              <Badge className="bg-blue-100 text-blue-800 text-xs">Host</Badge>
                            )}
                            <span className="text-lg">{item.emoji}</span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{item.message}</p>
                          <p className="text-xs text-gray-500 mt-2 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {item.timestamp}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
