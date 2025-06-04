
import { formatDistanceToNow } from 'date-fns';
import { Bell, Calendar, Users, AlertCircle, DollarSign, MessageSquare } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  event_id?: string;
  metadata?: any;
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
      case 'payment_confirmation':
        return <DollarSign className="w-4 h-4 text-green-600" />;
      case 'payment_failed':
        return <DollarSign className="w-4 h-4 text-red-600" />;
      case 'new_attendee':
        return <Users className="w-4 h-4 text-purple-600" />;
      case 'host_message':
        return <MessageSquare className="w-4 h-4 text-indigo-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'payment_confirmation':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Payment</Badge>;
      case 'event_reminder':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Reminder</Badge>;
      case 'host_message':
        return <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">Host</Badge>;
      default:
        return null;
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
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </p>
                  {getNotificationBadge(notification.type)}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {notification.message}
                </p>
                {notification.metadata?.amount && (
                  <p className="text-xs text-green-600 font-medium mb-1">
                    Amount: ${(notification.metadata.amount / 100).toFixed(2)}
                  </p>
                )}
                <p className="text-xs text-gray-400">
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
