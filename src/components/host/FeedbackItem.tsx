
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pin, Flag, Trash2, Clock } from 'lucide-react';

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

interface FeedbackItemProps {
  item: FeedbackItemData;
  onPin: (id: number) => void;
  onFlag: (id: number) => void;
  onDelete: (id: number) => void;
}

export const FeedbackItem = ({ item, onPin, onFlag, onDelete }: FeedbackItemProps) => {
  return (
    <div 
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
            onClick={() => onPin(item.id)}
            className={`h-8 w-8 p-0 ${item.pinned ? 'text-blue-600 bg-blue-100' : 'text-gray-400 hover:text-blue-600'}`}
            title={item.pinned ? 'Unpin' : 'Pin'}
          >
            <Pin className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onFlag(item.id)}
            className={`h-8 w-8 p-0 ${item.flagged ? 'text-red-600 bg-red-100' : 'text-gray-400 hover:text-red-600'}`}
            title={item.flagged ? 'Unflag' : 'Flag'}
          >
            <Flag className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(item.id)}
            className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
            title="Delete"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
