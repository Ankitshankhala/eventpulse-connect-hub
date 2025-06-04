
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LiveReactionsProps {
  reactions: {
    thumbsUp: number;
    thumbsDown: number;
    hearts: number;
    surprised: number;
    fire: number;
    clap: number;
  };
}

export const LiveReactions = ({ reactions }: LiveReactionsProps) => {
  const emojiMap: { [key: string]: string } = {
    thumbsUp: '👍',
    thumbsDown: '👎',
    hearts: '❤️',
    surprised: '😮',
    fire: '🔥',
    clap: '👏'
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Live Reactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Object.entries(reactions).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between text-sm">
              <span className="flex items-center">
                <span className="text-lg mr-2">{emojiMap[key]}</span>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </span>
              <Badge variant="outline" className="font-medium">
                {value}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
