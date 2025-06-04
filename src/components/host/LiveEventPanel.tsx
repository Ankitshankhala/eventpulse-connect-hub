
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Users, MessageSquare, X, Flag, Pin, Trash2, 
  TrendingUp, Eye, Heart, ThumbsUp, AlertTriangle,
  Megaphone, BarChart3, Clock, CheckCircle,
  UserPlus, Download, Settings
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface LiveEventPanelProps {
  event: any;
  onClose: () => void;
}

interface FeedbackItem {
  id: number;
  user: string;
  message: string;
  emoji: string;
  timestamp: string;
  pinned: boolean;
  flagged: boolean;
  isModerated?: boolean;
}

export const LiveEventPanel = ({ event, onClose }: LiveEventPanelProps) => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([
    { id: 1, user: 'Alice Johnson', message: 'Great presentation so far! The examples are really helpful.', emoji: '👍', timestamp: '2 min ago', pinned: false, flagged: false },
    { id: 2, user: 'Bob Smith', message: 'Could you speak a bit louder? Hard to hear in the back.', emoji: '😮', timestamp: '3 min ago', pinned: false, flagged: false },
    { id: 3, user: 'Carol Davis', message: 'Loving the interactive elements and the real-time demos', emoji: '❤️', timestamp: '5 min ago', pinned: true, flagged: false },
    { id: 4, user: 'David Wilson', message: 'This is exactly what we needed for our project', emoji: '👍', timestamp: '7 min ago', pinned: false, flagged: false },
    { id: 5, user: 'Emma Brown', message: 'The slides are amazing! Where can I get them?', emoji: '🔥', timestamp: '8 min ago', pinned: false, flagged: false }
  ]);

  const [stats, setStats] = useState({
    rsvps: 47,
    checkedIn: 34,
    totalEngagement: 156,
    reactions: {
      thumbsUp: 28,
      thumbsDown: 3,
      hearts: 18,
      surprised: 7,
      fire: 12,
      clap: 24
    }
  });

  const [analyticsData, setAnalyticsData] = useState({
    peakAttendance: 34,
    averageEngagement: 4.8,
    totalMessages: 23,
    responseRate: 72
  });

  // Fetch real feedback from Supabase
  const { data: realFeedback = [] } = useQuery({
    queryKey: ['event-feedback', event.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('event_id', event.id)
        .order('timestamp', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    refetchInterval: 3000 // Refresh every 3 seconds for real-time feel
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        checkedIn: Math.min(prev.rsvps, prev.checkedIn + Math.floor(Math.random() * 2)),
        totalEngagement: prev.totalEngagement + Math.floor(Math.random() * 3),
        reactions: {
          thumbsUp: prev.reactions.thumbsUp + Math.floor(Math.random() * 2),
          hearts: prev.reactions.hearts + Math.floor(Math.random() * 2),
          fire: prev.reactions.fire + Math.floor(Math.random() * 1),
          clap: prev.reactions.clap + Math.floor(Math.random() * 2),
          surprised: prev.reactions.surprised + Math.floor(Math.random() * 1),
          thumbsDown: prev.reactions.thumbsDown + (Math.random() > 0.9 ? 1 : 0)
        }
      }));

      // Occasionally add new feedback
      if (Math.random() > 0.85) {
        const messages = [
          'This session is incredibly valuable!',
          'Can we get the recording later?',
          'Perfect timing for this topic',
          'Great Q&A session!',
          'The examples are so practical'
        ];
        const users = ['Sarah Kim', 'Mike Johnson', 'Lisa Chen', 'Tom Wilson'];
        const emojis = ['👍', '❤️', '🔥', '👏', '😮'];
        
        const newFeedback: FeedbackItem = {
          id: Date.now(),
          user: users[Math.floor(Math.random() * users.length)],
          message: messages[Math.floor(Math.random() * messages.length)],
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          timestamp: 'just now',
          pinned: false,
          flagged: false
        };
        
        setFeedback(prev => [newFeedback, ...prev.slice(0, 19)]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handlePin = (id: number) => {
    setFeedback(prev => prev.map(item => 
      item.id === id ? { ...item, pinned: !item.pinned } : item
    ));
  };

  const handleFlag = (id: number) => {
    setFeedback(prev => prev.map(item => 
      item.id === id ? { ...item, flagged: !item.flagged } : item
    ));
  };

  const handleDelete = (id: number) => {
    setFeedback(prev => prev.filter(item => item.id !== id));
  };

  const sortedFeedback = [...feedback].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  const engagementRate = ((stats.totalEngagement / stats.checkedIn) * 100) || 0;
  const attendanceRate = ((stats.checkedIn / stats.rsvps) * 100) || 0;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl flex items-center text-gray-900">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                {event.title}
                <Badge className="ml-3 bg-green-100 text-green-800 border-green-200">
                  LIVE CONTROL
                </Badge>
              </DialogTitle>
              <p className="text-gray-600 mt-2">Real-time event monitoring and management dashboard</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Export Data
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-1" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 p-6 pt-4">
            
            {/* Stats & Analytics Panel */}
            <div className="xl:col-span-1 space-y-4">
              
              {/* Key Metrics */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    Live Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">Attendance</span>
                        <span className="font-semibold text-green-600">{stats.checkedIn}/{stats.rsvps}</span>
                      </div>
                      <Progress value={attendanceRate} className="h-2" />
                      <span className="text-xs text-gray-500">{attendanceRate.toFixed(1)}% attendance rate</span>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">Engagement</span>
                        <span className="font-semibold text-blue-600">{stats.totalEngagement}</span>
                      </div>
                      <Progress value={Math.min(engagementRate, 100)} className="h-2" />
                      <span className="text-xs text-gray-500">{engagementRate.toFixed(1)} interactions per attendee</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-semibold text-green-600">{analyticsData.peakAttendance}</div>
                      <div className="text-xs text-gray-600">Peak Attendance</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-semibold text-blue-600">{analyticsData.totalMessages}</div>
                      <div className="text-xs text-gray-600">Total Messages</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Live Reactions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Live Reactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(stats.reactions).map(([key, value]) => {
                      const emojiMap: { [key: string]: string } = {
                        thumbsUp: '👍',
                        thumbsDown: '👎',
                        hearts: '❤️',
                        surprised: '😮',
                        fire: '🔥',
                        clap: '👏'
                      };
                      
                      return (
                        <div key={key} className="flex items-center justify-between text-sm">
                          <span className="flex items-center">
                            <span className="text-lg mr-2">{emojiMap[key]}</span>
                            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                          </span>
                          <Badge variant="outline" className="font-medium">
                            {value}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline" size="sm">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Walk-ins
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    <Megaphone className="w-4 h-4 mr-2" />
                    Send Announcement
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    End Event
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Feedback Management */}
            <div className="xl:col-span-3">
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
                      Live Feedback Feed
                      <Badge className="ml-2 bg-gray-100 text-gray-800">{feedback.length}</Badge>
                    </span>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        <Pin className="w-3 h-3 mr-1" />
                        {feedback.filter(f => f.pinned).length} Pinned
                      </Badge>
                      {feedback.some(f => f.flagged) && (
                        <Badge className="bg-red-100 text-red-800">
                          <Flag className="w-3 h-3 mr-1" />
                          {feedback.filter(f => f.flagged).length} Flagged
                        </Badge>
                      )}
                    </div>
                  </CardTitle>
                  <CardDescription>Monitor and moderate real-time feedback from attendees</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-3">
                      {sortedFeedback.map((item) => (
                        <div 
                          key={item.id} 
                          className={`p-4 rounded-lg border transition-all duration-200 ${
                            item.pinned 
                              ? 'border-blue-300 bg-blue-50 shadow-sm' 
                              : item.flagged 
                                ? 'border-red-300 bg-red-50 shadow-sm' 
                                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-medium text-sm text-gray-900 truncate">
                                  {item.user}
                                </span>
                                <span className="text-xl">{item.emoji}</span>
                                <span className="text-xs text-gray-500 flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {item.timestamp}
                                </span>
                                {item.pinned && (
                                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                                    <Pin className="w-3 h-3 mr-1" />
                                    Pinned
                                  </Badge>
                                )}
                                {item.flagged && (
                                  <Badge className="bg-red-100 text-red-800 text-xs">
                                    <Flag className="w-3 h-3 mr-1" />
                                    Flagged
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-700 leading-relaxed break-words">
                                {item.message}
                              </p>
                            </div>
                            <div className="flex space-x-1 ml-3 flex-shrink-0">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handlePin(item.id)}
                                className={`h-8 w-8 p-0 ${item.pinned ? 'text-blue-600 bg-blue-100' : 'text-gray-400 hover:text-blue-600'}`}
                                title={item.pinned ? 'Unpin' : 'Pin'}
                              >
                                <Pin className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleFlag(item.id)}
                                className={`h-8 w-8 p-0 ${item.flagged ? 'text-red-600 bg-red-100' : 'text-gray-400 hover:text-red-600'}`}
                                title={item.flagged ? 'Unflag' : 'Flag'}
                              >
                                <Flag className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(item.id)}
                                className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                                title="Delete"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
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
