
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, MapPin, Users, LogOut, MessageSquare, ThumbsUp, ThumbsDown, Heart, Zap, CheckCircle } from 'lucide-react';
import { LiveEventAttendee } from './LiveEventAttendee';

interface AttendeeDashboardProps {
  user: { email: string; role: 'host' | 'attendee' };
  onLogout: () => void;
}

export const AttendeeDashboard = ({ user, onLogout }: AttendeeDashboardProps) => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showLiveEvent, setShowLiveEvent] = useState(false);

  // Mock data
  const events = [
    {
      id: 1,
      title: 'Product Launch Event',
      description: 'Join us for the exciting launch of our new product line.',
      date: '2024-06-15',
      time: '14:00',
      location: 'Main Conference Hall',
      host: 'TechCorp Inc.',
      attendees: 24,
      maxAttendees: 50,
      isLive: false,
      rsvpStatus: 'confirmed',
      canCheckIn: false
    },
    {
      id: 2,
      title: 'Team Building Workshop',
      description: 'Interactive workshop focused on team collaboration and communication.',
      date: '2024-06-04',
      time: '10:00',
      location: 'https://zoom.us/meeting/123',
      host: 'HR Department',
      attendees: 12,
      maxAttendees: 20,
      isLive: true,
      rsvpStatus: 'confirmed',
      canCheckIn: true
    },
    {
      id: 3,
      title: 'Quarterly All-Hands',
      description: 'Company-wide meeting to discuss Q2 results and Q3 planning.',
      date: '2024-06-20',
      time: '16:00',
      location: 'Virtual Event',
      host: 'Executive Team',
      attendees: 45,
      maxAttendees: 100,
      isLive: false,
      rsvpStatus: 'pending',
      canCheckIn: false
    }
  ];

  const handleRSVP = (eventId: number) => {
    console.log('RSVP to event:', eventId);
  };

  const handleCheckIn = (event: any) => {
    if (event.isLive) {
      setSelectedEvent(event);
      setShowLiveEvent(true);
    }
  };

  const getStatusBadge = (event: any) => {
    if (event.isLive) {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
          Live Now
        </Badge>
      );
    } else if (new Date(event.date) > new Date()) {
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Upcoming</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Past</Badge>;
    }
  };

  const getRSVPBadge = (status: string) => {
    if (status === 'confirmed') {
      return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
    } else if (status === 'pending') {
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-800">Not RSVP'd</Badge>;
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Events</h1>
          <p className="text-gray-600">Discover and join amazing events</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">RSVP'd Events</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {events.filter(e => e.rsvpStatus === 'confirmed').length}
                  </p>
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
                    {events.filter(e => e.isLive).length}
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
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {events.filter(e => new Date(e.date) > new Date() && !e.isLive).length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:border-blue-300 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 mb-4 lg:mb-0">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                      {getStatusBadge(event)}
                      {getRSVPBadge(event.rsvpStatus)}
                    </div>
                    
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-blue-600" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                        {event.location.includes('http') ? 'Virtual' : event.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-blue-600" />
                        {event.attendees}/{event.maxAttendees} attending
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-2">Hosted by {event.host}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {event.rsvpStatus === 'pending' && (
                      <Button 
                        onClick={() => handleRSVP(event.id)}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        RSVP Now
                      </Button>
                    )}
                    
                    {event.canCheckIn && event.isLive && (
                      <Button 
                        onClick={() => handleCheckIn(event)}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Join Live Event
                      </Button>
                    )}
                    
                    {event.rsvpStatus === 'confirmed' && !event.canCheckIn && (
                      <Button variant="outline" disabled>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Confirmed
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Live Event Modal */}
      {showLiveEvent && selectedEvent && (
        <LiveEventAttendee 
          event={selectedEvent}
          onClose={() => setShowLiveEvent(false)}
        />
      )}
    </div>
  );
};
