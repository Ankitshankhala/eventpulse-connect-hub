
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, UserPlus, UserMinus } from 'lucide-react';
import { useUserConnections } from '@/hooks/useUserConnections';

interface UserProfileProps {
  userId: string;
  name: string;
  email: string;
  role: string;
  eventCount?: number;
  isCurrentUser?: boolean;
}

export const UserProfile = ({ 
  userId, 
  name, 
  email, 
  role, 
  eventCount = 0,
  isCurrentUser = false 
}: UserProfileProps) => {
  const { 
    following, 
    followers, 
    followUser, 
    unfollowUser, 
    isFollowing, 
    isFollowLoading 
  } = useUserConnections();

  const handleFollowToggle = () => {
    if (isFollowing(userId)) {
      unfollowUser(userId);
    } else {
      followUser(userId);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <span>{name}</span>
              <Badge variant={role === 'host' ? 'default' : 'secondary'}>
                {role}
              </Badge>
            </CardTitle>
            <p className="text-gray-600">{email}</p>
          </div>
          
          {!isCurrentUser && (
            <Button
              onClick={handleFollowToggle}
              disabled={isFollowLoading}
              variant={isFollowing(userId) ? 'outline' : 'default'}
              size="sm"
            >
              {isFollowing(userId) ? (
                <>
                  <UserMinus className="w-4 h-4 mr-1" />
                  Unfollow
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-1" />
                  Follow
                </>
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{following.length}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center">
              <Users className="w-4 h-4 mr-1" />
              Following
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{followers.length}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center">
              <Users className="w-4 h-4 mr-1" />
              Followers
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{eventCount}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-1" />
              Events
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
