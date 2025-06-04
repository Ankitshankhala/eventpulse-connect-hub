
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Heart, ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLiveFeedback } from '@/hooks/useLiveFeedback';

interface LiveFeedbackSystemProps {
  eventId: string;
  isHost?: boolean;
}

export const LiveFeedbackSystem = ({ eventId, isHost = false }: LiveFeedbackSystemProps) => {
  const { user } = useAuth();
  const { feedback, addFeedback, updateFeedback, deleteFeedback, isLoading } = useLiveFeedback(eventId);
  const [newComment, setNewComment] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('👍');

  const emojis = [
    { emoji: '👍', label: 'Like', icon: ThumbsUp },
    { emoji: '❤️', label: 'Love', icon: Heart },
    { emoji: '⭐', label: 'Star', icon: Star },
    { emoji: '👎', label: 'Dislike', icon: ThumbsDown },
  ];

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    const result = await addFeedback(newComment, selectedEmoji, user.id);
    if (result.success) {
      setNewComment('');
    }
  };

  const handlePin = async (feedbackId: string) => {
    if (!isHost) return;
    await updateFeedback(feedbackId, { is_pinned: true });
  };

  const handleFlag = async (feedbackId: string) => {
    if (!isHost) return;
    await updateFeedback(feedbackId, { is_flagged: true });
  };

  const handleDelete = async (feedbackId: string) => {
    if (!isHost) return;
    await deleteFeedback(feedbackId);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
            Live Feedback
          </span>
          <Badge variant="secondary">{feedback.length}</Badge>
        </CardTitle>
        <CardDescription>
          {isHost ? 'Monitor and moderate feedback' : 'Share your thoughts in real-time'}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Feedback Form */}
        <form onSubmit={handleSubmitFeedback} className="space-y-3">
          <div className="flex space-x-2">
            <Input
              placeholder="Share your feedback..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
              maxLength={280}
            />
            <select
              value={selectedEmoji}
              onChange={(e) => setSelectedEmoji(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md"
            >
              {emojis.map((item) => (
                <option key={item.emoji} value={item.emoji}>
                  {item.emoji} {item.label}
                </option>
              ))}
            </select>
            <Button type="submit" disabled={!newComment.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>

        {/* Feedback List */}
        <ScrollArea className="flex-1 h-[400px]">
          <div className="space-y-3">
            {feedback.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-lg border ${
                  item.is_pinned ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
                } ${item.is_flagged ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="font-medium text-sm">User</span>
                    {item.is_pinned && <Badge className="text-xs">Pinned</Badge>}
                    {item.is_flagged && <Badge variant="destructive" className="text-xs">Flagged</Badge>}
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{item.comment}</p>
                
                {isHost && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePin(item.id)}
                      disabled={item.is_pinned}
                    >
                      Pin
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleFlag(item.id)}
                      disabled={item.is_flagged}
                    >
                      Flag
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
