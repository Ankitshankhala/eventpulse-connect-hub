
import { useState } from 'react';
import { Bell, Settings, Mail, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useEnhancedNotifications } from '@/hooks/useEnhancedNotifications';
import { NotificationsList } from './NotificationsList';

export const NotificationCenter = () => {
  const { notifications, unreadCount, markAllAsRead } = useEnhancedNotifications();
  const [isOpen, setIsOpen] = useState(false);
  
  // Mock notification preferences - in real app, these would be stored in user preferences
  const [preferences, setPreferences] = useState({
    email: {
      rsvp_confirmation: true,
      event_reminder: true,
      payment_confirmation: true,
      event_update: false,
      host_message: true
    },
    push: {
      rsvp_confirmation: false,
      event_reminder: true,
      payment_confirmation: true,
      event_update: false,
      host_message: false
    }
  });

  const handlePreferenceChange = (method: 'email' | 'push', type: string, enabled: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [method]: {
        ...prev[method],
        [type]: enabled
      }
    }));
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <Tabs defaultValue="notifications" className="w-full">
          <div className="flex items-center justify-between p-4 border-b">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="preferences">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="notifications" className="mt-0">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleMarkAllAsRead}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Mark all read
                  </Button>
                )}
              </div>
            </div>
            <NotificationsList notifications={notifications} />
          </TabsContent>
          
          <TabsContent value="preferences" className="mt-0">
            <div className="p-4 space-y-6">
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Notifications
                </h4>
                <div className="space-y-3">
                  {Object.entries(preferences.email).map(([type, enabled]) => (
                    <div key={type} className="flex items-center justify-between">
                      <Label htmlFor={`email-${type}`} className="text-sm capitalize">
                        {type.replace('_', ' ')}
                      </Label>
                      <Switch
                        id={`email-${type}`}
                        checked={enabled}
                        onCheckedChange={(checked) => handlePreferenceChange('email', type, checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Push Notifications
                </h4>
                <div className="space-y-3">
                  {Object.entries(preferences.push).map(([type, enabled]) => (
                    <div key={type} className="flex items-center justify-between">
                      <Label htmlFor={`push-${type}`} className="text-sm capitalize">
                        {type.replace('_', ' ')}
                      </Label>
                      <Switch
                        id={`push-${type}`}
                        checked={enabled}
                        onCheckedChange={(checked) => handlePreferenceChange('push', type, checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
