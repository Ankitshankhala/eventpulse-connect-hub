
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, ThumbsUp, ThumbsDown, Smile, Pin, Flag, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface EnhancedLiveFeedbackProps {
  eventId: string;
  isHost?: boolean;
}

const emojiOptions = [
  { emoji: '👍', label: 'thumbs_up', icon: ThumbsUp },
  { emoji: '👎', label: 'thumbs_down', icon: ThumbsDown },
  { emoji: '❤️', label: 'heart', icon: Heart },
  { emoji: '😮', label: 'wow', icon: Smile },
];

export const EnhancedLiveFeedback = ({ eventId, isHost = false }: EnhancedLiveFeedbackProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  // Fetch feedback in real-time
  const { data: feedback = [], isLoading } = useQuery({
    queryKey: ['live-feedback', eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('feedback')
        .select(`
          *,
          users(name)
        `)
        .eq('event_id', eventId)
        .order('timestamp', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    refetchInterval: 3000 // Poll every 3 seconds for real-time updates
  });

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel(`feedback-${eventId}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'feedback',
          filter: `event_id=eq.${eventId}`
        }, 
        () => {
          queryClient.invalidateQueries({ queryKey: ['live-feedback', eventId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventId, queryClient]);

  // Submit comment mutation
  const submitCommentMutation = useMutation({
    mutationFn: async () => {
      if (!user || !newComment.trim()) return;

      const { error } = await supabase
        .from('feedback')
        .insert({
          event_id: eventId,
          user_id: user.id,
          comment: newComment.trim(),
          timestamp: new Date().toISOString()
        });

      if (error) throw error;
    },
    onSuccess: () => {
      setNewComment('');
      queryClient.invalidateQueries({ queryKey: ['live-feedback', eventId] });
      toast({
        title: "Comment posted!",
        description: "Your feedback has been shared with everyone"
      });
    },
    onError: (error) => {
      console.error('Error posting comment:', error);
      toast({
        title: "Error",
        description: "Failed to post your comment",
        variant: "destructive"
      });
    }
  });

  // Submit emoji reaction mutation
  const submitEmojiMutation = useMutation({
    mutationFn: async (emoji: string) => {
      if (!user) return;

      const { error } = await supabase
        .from('feedback')
        .insert({
          event_id: eventId,
          user_id: user.id,
          emoji: emoji,
          timestamp: new Date().toISOString()
        });

      if (error) throw error;
    },
    onSuccess: () => {
      setSelectedEmoji(null);
      queryClient.invalidateQueries({ queryKey: ['live-feedback', eventId] });
    },
    onError: (error) => {
      console.error('Error posting emoji:', error);
      toast({
        title: "Error",
        description: "Failed to post reaction",
        variant: "destructive"
      });
    }
  });

  // Host moderation actions
  const moderationMutation = useMutation({
    mutationFn: async ({ feedbackId, action }: { feedbackId: string, action: 'pin' | 'flag' | 'delete' }) => {
      if (action === 'delete') {
        const { error } = await supabase
          .from('feedback')
          .delete()
          .eq('id', feedbackId);
        if (error) throw error;
      } else {
        const updateData = action === 'pin' 
          ? { is_pinned: true }
          : { is_flagged: true };

        const { error } = await supabase
          .from('feedback')
          .update(updateData)
          .eq('id', feedbackId);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['live-feedback', eventId] });
    }
  });

  const handleSubmitComment = () => {
    submitCommentMutation.mutate();
  };

  const handleEmojiClick = (emoji: string) => {
    setSelectedEmoji(emoji);
    submitEmojiMutation.mutate(emoji);
  };

  // Group emoji reactions by type for display
  const emojiCounts = feedback
    .filter(f => f.emoji)
    .reduce((acc, f) => {
      acc[f.emoji] = (acc[f.emoji] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Emoji Reactions Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Reactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {emojiOptions.map(({ emoji, label, icon: Icon }) => (
              <Button
                key={label}
                variant={selectedEmoji === emoji ? "default" : "outline"}
                size="sm"
                onClick={() => handleEmojiClick(emoji)}
                disabled={submitEmojiMutation.isPending}
                className="flex items-center gap-2"
              >
                <span className="text-lg">{emoji}</span>
                {emojiCounts[emoji] && (
                  <Badge variant="secondary" className="ml-1">
                    {emojiCounts[emoji]}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comment Submission */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Share Your Thoughts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="What are your thoughts about this event?"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button 
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || submitCommentMutation.isPending}
            className="w-full"
          >
            {submitCommentMutation.isPending ? 'Posting...' : 'Post Comment'}
          </Button>
        </CardContent>
      </Card>

      {/* Live Feedback Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Live Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {feedback.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No feedback yet. Be the first to share your thoughts!
                </div>
              ) : (
                feedback.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      item.is_pinned ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                    } ${item.is_flagged ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-sm">
                            {item.users?.name || 'Anonymous'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                          </span>
                          {item.is_pinned && (
                            <Badge variant="secondary" className="text-xs">
                              <Pin className="w-3 h-3 mr-1" />
                              Pinned
                            </Badge>
                          )}
                        </div>
                        
                        {item.emoji && (
                          <div className="text-2xl mb-2">{item.emoji}</div>
                        )}
                        
                        {item.comment && (
                          <p className="text-gray-700">{item.comment}</p>
                        )}
                      </div>
                      
                      {isHost && (
                        <div className="flex gap-1 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moderationMutation.mutate({ feedbackId: item.id, action: 'pin' })}
                            disabled={item.is_pinned}
                          >
                            <Pin className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moderationMutation.mutate({ feedbackId: item.id, action: 'flag' })}
                            disabled={item.is_flagged}
                          >
                            <Flag className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moderationMutation.mutate({ feedbackId: item.id, action: 'delete' })}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
