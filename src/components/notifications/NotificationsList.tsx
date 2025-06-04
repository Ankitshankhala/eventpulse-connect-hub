
import { formatDistanceToNow } from 'date-fns';
import { Bell, Calendar, Users, AlertCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  event_id?: string;
}

interface NotificationsListProps {
  notifications: Notification[];
}

export const NotificationsList = ({ notifications }: NotificationsListProps) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'rsvp_confirmation':
        return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'event_reminder':
        return <Bell className="w-4 h-4 text-yellow-600" />;
      case 'event_update':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'event_cancelled':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>No notifications yet</p>
      </div>
    );
  }

  return (
    <ScrollArea className="max-h-96">
      <div className="divide-y">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 hover:bg-gray-50 transition-colors ${
              !notification.is_read ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {notification.title}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                </p>
              </div>
              {!notification.is_read && (
                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
