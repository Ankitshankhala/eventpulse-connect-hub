
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Users, MessageSquare, ThumbsUp, ThumbsDown, Heart, Zap, X, Flag, Pin } from 'lucide-react';

interface LiveEventPanelProps {
  event: any;
  onClose: () => void;
}

export const LiveEventPanel = ({ event, onClose }: LiveEventPanelProps) => {
  const [feedback, setFeedback] = useState([
    { id: 1, user: 'Alice Johnson', message: 'Great presentation so far!', emoji: '👍', timestamp: '2 min ago', pinned: false, flagged: false },
    { id: 2, user: 'Bob Smith', message: 'Could you speak a bit louder?', emoji: '😮', timestamp: '3 min ago', pinned: false, flagged: false },
    { id: 3, user: 'Carol Davis', message: 'Loving the interactive elements', emoji: '❤️', timestamp: '5 min ago', pinned: true, flagged: false },
    { id: 4, user: 'David Wilson', message: 'This is exactly what we needed', emoji: '👍', timestamp: '7 min ago', pinned: false, flagged: false }
  ]);

  const [stats, setStats] = useState({
    rsvps: 24,
    checkedIn: 18,
    thumbsUp: 12,
    thumbsDown: 2,
    hearts: 8,
    surprised: 3
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        checkedIn: prev.checkedIn + Math.floor(Math.random() * 2),
        thumbsUp: prev.thumbsUp + Math.floor(Math.random() * 2),
        hearts: prev.hearts + Math.floor(Math.random() * 2)
      }));
    }, 5000);

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

  const sortedFeedback = [...feedback].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                {event.title} - Live Control
              </DialogTitle>
              <p className="text-gray-600 mt-1">Real-time event monitoring and management</p>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 pt-0">
            {/* Stats Panel */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Live Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">RSVPs</span>
                    <span className="font-semibold">{stats.rsvps}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Checked In</span>
                    <span className="font-semibold text-green-600">{stats.checkedIn}</span>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-gray-900 mb-3">Reactions</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>👍</span>
                        <span className="font-medium">{stats.thumbsUp}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>👎</span>
                        <span className="font-medium">{stats.thumbsDown}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>❤️</span>
                        <span className="font-medium">{stats.hearts}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>😮</span>
                        <span className="font-medium">{stats.surprised}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Mark Walk-ins
                  </Button>
                  <Button className="w-full" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Announcement
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Feedback Feed */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Live Feedback Feed</CardTitle>
                  <CardDescription>Real-time comments and reactions from attendees</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {sortedFeedback.map((item) => (
                      <div 
                        key={item.id} 
                        className={`p-3 rounded-lg border ${item.pinned ? 'border-blue-200 bg-blue-50' : item.flagged ? 'border-red-200 bg-red-50' : 'border-gray-200'} transition-colors`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm text-gray-900">{item.user}</span>
                              <span className="text-lg">{item.emoji}</span>
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
                            <p className="text-sm text-gray-700">{item.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{item.timestamp}</p>
                          </div>
                          <div className="flex space-x-1 ml-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handlePin(item.id)}
                              className={`h-8 w-8 p-0 ${item.pinned ? 'text-blue-600' : 'text-gray-400'}`}
                            >
                              <Pin className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFlag(item.id)}
                              className={`h-8 w-8 p-0 ${item.flagged ? 'text-red-600' : 'text-gray-400'}`}
                            >
                              <Flag className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
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
