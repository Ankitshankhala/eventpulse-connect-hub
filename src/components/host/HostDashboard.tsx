
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Plus, Settings, LogOut } from 'lucide-react';
import { CreateEventModal } from './CreateEventModal';
import { LiveEventPanel } from './LiveEventPanel';

interface HostDashboardProps {
  user: { email: string; role: 'host' | 'attendee' };
  onLogout: () => void;
}

export const HostDashboard = ({ user, onLogout }: HostDashboardProps) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showLivePanel, setShowLivePanel] = useState(false);

  // Mock data
  const events = [
    {
      id: 1,
      title: 'Product Launch Event',
      status: 'Scheduled',
      date: '2024-06-15',
      time: '14:00',
      rsvpCount: 24,
      maxAttendees: 50,
      isLive: false
    },
    {
      id: 2,
      title: 'Team Building Workshop',
      status: 'Live',
      date: '2024-06-04',
      time: '10:00',
      rsvpCount: 12,
      maxAttendees: 20,
      isLive: true
    },
    {
      id: 3,
      title: 'Q4 Strategy Meeting',
      status: 'Closed',
      date: '2024-05-28',
      time: '16:00',
      rsvpCount: 8,
      maxAttendees: 15,
      isLive: false
    }
  ];

  const getStatusBadge = (status: string, isLive: boolean) => {
    if (status === 'Live' || isLive) {
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

  const handleManageEvent = (event: any) => {
    if (event.isLive || event.status === 'Live') {
      setSelectedEvent(event);
      setShowLivePanel(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EP</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">EventPulse</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Host Dashboard</h1>
          <p className="text-gray-600">Manage your events and track engagement</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Events</p>
                  <p className="text-2xl font-bold text-gray-900">{events.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Live Events</p>
                  <p className="text-2xl font-bold text-green-600">
                    {events.filter(e => e.isLive || e.status === 'Live').length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total RSVPs</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {events.reduce((sum, event) => sum + event.rsvpCount, 0)}
                  </p>
                </div>
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Your Events</CardTitle>
                <CardDescription>Manage and monitor your events</CardDescription>
              </div>
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      {getStatusBadge(event.status, event.isLive)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {event.rsvpCount}/{event.maxAttendees}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleManageEvent(event)}
                  >
                    {event.isLive || event.status === 'Live' ? 'Live Control' : 'Manage'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <CreateEventModal 
        open={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />

      {showLivePanel && selectedEvent && (
        <LiveEventPanel 
          event={selectedEvent}
          onClose={() => setShowLivePanel(false)}
        />
      )}
    </div>
  );
};
