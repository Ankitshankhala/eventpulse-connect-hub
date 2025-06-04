
import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { LiveEventHeader } from './LiveEventHeader';
import { LiveMetrics } from './LiveMetrics';
import { LiveReactions } from './LiveReactions';
import { QuickActions } from './QuickActions';
import { FeedbackFeed } from './FeedbackFeed';

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
    refetchInterval: 3000
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

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden p-0">
        <LiveEventHeader event={event} onClose={onClose} />

        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 p-6 pt-4">
            
            {/* Stats & Analytics Panel */}
            <div className="xl:col-span-1 space-y-4">
              <LiveMetrics stats={stats} analyticsData={analyticsData} />
              <LiveReactions reactions={stats.reactions} />
              <QuickActions />
            </div>

            {/* Feedback Management */}
            <div className="xl:col-span-3">
              <FeedbackFeed
                feedback={feedback}
                onPin={handlePin}
                onFlag={handleFlag}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
