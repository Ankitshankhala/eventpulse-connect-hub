
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Plus, Settings } from 'lucide-react';
import { EventStatusManager } from './EventStatusManager';

interface HostEventsTabProps {
  events: any[];
  onCreateEvent: () => void;
  onManageEvent: (event: any) => void;
}

export const HostEventsTab = ({ events, onCreateEvent, onManageEvent }: HostEventsTabProps) => {
  const [selectedEventForStatus, setSelectedEventForStatus] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    if (status === 'Live') {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
          Live
        </Badge>
      );
    } else if (status === 'Scheduled') {
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Scheduled</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Closed</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusUpdate = (eventId: string, newStatus: string) => {
    // This will be handled by the parent component's query refetch
    // We just need to close the status manager
    setSelectedEventForStatus(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Your Events</CardTitle>
            <CardDescription>Manage and monitor your events</CardDescription>
          </div>
          <Button 
            onClick={onCreateEvent}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No events created yet. Create your first event to get started!</p>
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      {getStatusBadge(event.status)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(event.date_time)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatTime(event.date_time)}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {event.rsvps?.length || 0}/{event.max_attendees || '∞'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedEventForStatus(
                        selectedEventForStatus?.id === event.id ? null : event
                      )}
                    >
                      <Settings className="w-4 h-4 mr-1" />
                      Status
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onManageEvent(event)}
                    >
                      {event.status === 'Live' ? 'Live Control' : 'Manage RSVPs'}
                    </Button>
                  </div>
                </div>

                {/* Event Status Manager */}
                {selectedEventForStatus?.id === event.id && (
                  <EventStatusManager 
                    event={event}
                    onStatusUpdate={(newStatus) => handleStatusUpdate(event.id, newStatus)}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
