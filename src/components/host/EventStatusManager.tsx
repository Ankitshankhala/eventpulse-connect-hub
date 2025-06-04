
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Play, Square, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EventStatusManagerProps {
  event: any;
  onStatusUpdate: (newStatus: string) => void;
}

export const EventStatusManager = ({ event, onStatusUpdate }: EventStatusManagerProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Live':
        return <Play className="w-3 h-3" />;
      case 'Scheduled':
        return <Clock className="w-3 h-3" />;
      case 'Closed':
        return <Square className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  const updateEventStatus = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('events')
        .update({ status: newStatus })
        .eq('id', event.id);

      if (error) throw error;

      onStatusUpdate(newStatus);
      toast({
        title: 'Status Updated',
        description: `Event status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating event status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update event status',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const isEventPast = new Date(event.date_time) < new Date();
  const isEventStartingSoon = new Date(event.date_time) <= new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

  const getAvailableStatuses = () => {
    const statuses = ['Scheduled', 'Live', 'Closed'];
    return statuses.filter(status => {
      // Can't schedule a past event
      if (status === 'Scheduled' && isEventPast) return false;
      return true;
    });
  };

  const getRecommendedStatus = () => {
    if (isEventPast && event.status !== 'Closed') {
      return 'Closed';
    }
    if (isEventStartingSoon && event.status === 'Scheduled') {
      return 'Live';
    }
    return null;
  };

  const recommendedStatus = getRecommendedStatus();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Event Status</span>
          <Badge className={getStatusColor(event.status)}>
            {getStatusIcon(event.status)}
            <span className="ml-1">{event.status}</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Status Info */}
        <div className="text-sm text-gray-600">
          <p>Event Date: {new Date(event.date_time).toLocaleString()}</p>
          {isEventPast && (
            <p className="text-orange-600 font-medium">⚠️ This event has passed</p>
          )}
          {isEventStartingSoon && !isEventPast && (
            <p className="text-blue-600 font-medium">🕒 Event starts soon</p>
          )}
        </div>

        {/* Recommended Action */}
        {recommendedStatus && recommendedStatus !== event.status && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 mb-2">
              💡 <strong>Recommended:</strong> Change status to "{recommendedStatus}"
              {recommendedStatus === 'Closed' && ' (event has ended)'}
              {recommendedStatus === 'Live' && ' (event is starting)'}
            </p>
            <Button 
              size="sm" 
              onClick={() => updateEventStatus(recommendedStatus)}
              disabled={isUpdating}
            >
              Change to {recommendedStatus}
            </Button>
          </div>
        )}

        {/* Manual Status Control */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Change Status:</label>
          <Select 
            value={event.status} 
            onValueChange={updateEventStatus}
            disabled={isUpdating}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {getAvailableStatuses().map((status) => (
                <SelectItem key={status} value={status}>
                  <div className="flex items-center">
                    {getStatusIcon(status)}
                    <span className="ml-2">{status}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          {event.status === 'Scheduled' && !isEventPast && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => updateEventStatus('Live')}
              disabled={isUpdating}
            >
              <Play className="w-4 h-4 mr-1" />
              Go Live
            </Button>
          )}
          {event.status === 'Live' && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => updateEventStatus('Closed')}
              disabled={isUpdating}
            >
              <Square className="w-4 h-4 mr-1" />
              End Event
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
