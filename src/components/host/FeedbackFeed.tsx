
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Pin, Flag } from 'lucide-react';
import { FeedbackItem } from './FeedbackItem';

interface FeedbackItemData {
  id: number;
  user: string;
  message: string;
  emoji: string;
  timestamp: string;
  pinned: boolean;
  flagged: boolean;
  isModerated?: boolean;
}

interface FeedbackFeedProps {
  feedback: FeedbackItemData[];
  onPin: (id: number) => void;
  onFlag: (id: number) => void;
  onDelete: (id: number) => void;
}

export const FeedbackFeed = ({ feedback, onPin, onFlag, onDelete }: FeedbackFeedProps) => {
  const sortedFeedback = [...feedback].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  return (
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
              <FeedbackItem
                key={item.id}
                item={item}
                onPin={onPin}
                onFlag={onFlag}
                onDelete={onDelete}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
