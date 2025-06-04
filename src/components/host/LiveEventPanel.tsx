
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Users, MessageSquare, BarChart3, Settings } from 'lucide-react';
import { LiveMetrics } from './LiveMetrics';
import { EnhancedLiveFeedback } from '../live/EnhancedLiveFeedback';
import { WalkInManager } from './WalkInManager';
import { EventStatusManager } from './EventStatusManager';
import { RSVPManagement } from './RSVPManagement';

interface LiveEventPanelProps {
  event: any;
  onClose: () => void;
}

export const LiveEventPanel = ({ event, onClose }: LiveEventPanelProps) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleWalkInAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {event.title}
              <Badge variant="secondary" className="bg-green-500 text-white animate-pulse">
                Live
              </Badge>
            </h2>
            <p className="text-blue-100">
              {new Date(event.date_time).toLocaleDateString()} • {event.location}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <Tabs defaultValue="metrics" className="h-full">
            <div className="px-6 pt-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="metrics" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Metrics
                </TabsTrigger>
                <TabsTrigger value="feedback" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Feedback
                </TabsTrigger>
                <TabsTrigger value="attendees" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Attendees
                </TabsTrigger>
                <TabsTrigger value="walkins" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Walk-ins
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6 space-y-6">
              <TabsContent value="metrics">
                <LiveMetrics eventId={event.id} key={refreshKey} />
              </TabsContent>

              <TabsContent value="feedback">
                <EnhancedLiveFeedback eventId={event.id} isHost={true} />
              </TabsContent>

              <TabsContent value="attendees">
                <Card>
                  <CardHeader>
                    <CardTitle>Attendee Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RSVPManagement eventId={event.id} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="walkins">
                <div className="space-y-4">
                  <WalkInManager 
                    eventId={event.id} 
                    onWalkInAdded={handleWalkInAdded}
                  />
                  <Card>
                    <CardHeader>
                      <CardTitle>Walk-in Instructions</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Use this feature to check in attendees who arrive without prior RSVP</li>
                        <li>Walk-ins will be automatically marked as checked in</li>
                        <li>Their information will be added to your attendee list</li>
                        <li>They'll receive a welcome notification if they provide an email</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <EventStatusManager event={event} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
