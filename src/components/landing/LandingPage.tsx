
import { Calendar, Users, MessageSquare, BarChart3, Smartphone, Monitor, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AuthSection } from './AuthSection';

interface LandingPageProps {
  onGetStarted?: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const features = [
    {
      icon: Calendar,
      title: "Event Creation & Management",
      description: "Create events with ease. Set dates, locations, RSVP limits, and manage everything from one dashboard.",
      color: "ep-blue"
    },
    {
      icon: Users,
      title: "RSVP & Live Check-In",
      description: "Streamlined RSVP process with real-time check-ins. Track attendance and manage walk-ins effortlessly.",
      color: "ep-green"
    },
    {
      icon: MessageSquare,
      title: "Live Feedback Stream",
      description: "Real-time attendee feedback with emoji reactions. Keep the pulse on your event as it happens.",
      color: "ep-yellow"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Comprehensive post-event analytics with charts, feedback trends, and attendee insights.",
      color: "ep-blue"
    },
  ];

  const emojiReactions = ['👍', '❤️', '😮', '👎', '🔥', '✨'];

  return (
    <div className="min-h-screen bg-white font-segoe">
      {/* Hero Section */}
      <section className="relative bg-white min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-ep-blue/5 via-white to-ep-green/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-ep-blue rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">EP</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 animate-fade-in">
              Real-Time Event Insights at Your Fingertips
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              EventPulse revolutionizes event management with live feedback, real-time analytics, and seamless attendee experiences. Perfect for hosts and attendees alike.
            </p>
            
            <AuthSection onGetStarted={onGetStarted} />

            {/* Live Emoji Feedback Illustration */}
            <div className="relative max-w-md mx-auto">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <div className="w-2 h-2 bg-ep-red rounded-full animate-pulse-live"></div>
                  <span className="font-semibold">Live Feedback</span>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {emojiReactions.map((emoji, index) => (
                    <div
                      key={index}
                      className="animate-pulse"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    >
                      <span className="text-2xl hover:scale-110 transition-transform cursor-pointer">
                        {emoji}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <div className="bg-gray-50 rounded-lg p-2 text-sm text-left border border-gray-100">
                    "Amazing presentation! 👍"
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-sm text-left border border-gray-100">
                    "Love the interactive format ❤️"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Everything You Need for Perfect Events
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From creation to analytics, EventPulse provides all the tools you need to host memorable events and gather meaningful insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-${feature.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className={`h-8 w-8 text-${feature.color}`} style={{ color: feature.color === 'ep-blue' ? '#4285F4' : feature.color === 'ep-green' ? '#34A853' : '#F4B400' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Role-based UI Previews */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Built for Hosts & Attendees
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored experiences for every role in your events.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Host View */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-ep-blue/10 text-ep-blue px-4 py-2 rounded-full mb-6">
                <Monitor className="h-4 w-4" />
                <span className="font-semibold">Host Dashboard</span>
              </div>
              
              <Card className="border-gray-200 shadow-lg bg-white">
                <CardContent className="p-8">
                  <div className="bg-gradient-to-r from-ep-blue/10 to-ep-green/10 rounded-lg p-6 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gray-900">Event Analytics</h4>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-ep-red rounded-full animate-pulse-live"></div>
                        <span className="text-xs text-ep-red font-medium">Live</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold" style={{ color: '#4285F4' }}>127</div>
                        <div className="text-xs text-gray-600">RSVPs</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold" style={{ color: '#34A853' }}>98</div>
                        <div className="text-xs text-gray-600">Checked In</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold" style={{ color: '#F4B400' }}>45</div>
                        <div className="text-xs text-gray-600">Feedback</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                      <Calendar className="h-5 w-5" style={{ color: '#4285F4' }} />
                      <span className="text-sm text-gray-700">Manage Events</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                      <BarChart3 className="h-5 w-5" style={{ color: '#34A853' }} />
                      <span className="text-sm text-gray-700">View Analytics</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                      <MessageSquare className="h-5 w-5" style={{ color: '#F4B400' }} />
                      <span className="text-sm text-gray-700">Live Feedback</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Attendee View */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-ep-green/10 text-ep-green px-4 py-2 rounded-full mb-6">
                <Smartphone className="h-4 w-4" />
                <span className="font-semibold">Attendee Experience</span>
              </div>
              
              <Card className="border-gray-200 shadow-lg bg-white">
                <CardContent className="p-8">
                  <div className="bg-gradient-to-r from-ep-green/10 to-ep-blue/10 rounded-lg p-6 mb-4">
                    <h4 className="font-bold text-gray-900 mb-4">React to Event</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {emojiReactions.slice(0, 6).map((emoji, index) => (
                        <button
                          key={index}
                          className="p-3 bg-white rounded-lg border border-gray-200 hover:scale-110 hover:shadow-md transition-all duration-200"
                        >
                          <span className="text-2xl">{emoji}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                      <Users className="h-5 w-5" style={{ color: '#4285F4' }} />
                      <span className="text-sm text-gray-700">RSVP to Events</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-ep-green/5 rounded-lg border border-ep-green/20 hover:shadow-sm transition-shadow">
                      <Star className="h-5 w-5" style={{ color: '#34A853' }} />
                      <span className="text-sm text-gray-700">Quick Check-In</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                      <MessageSquare className="h-5 w-5" style={{ color: '#34A853' }} />
                      <span className="text-sm text-gray-700">Send Feedback</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-ep-blue/5 to-ep-green/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              How EventPulse Works
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ep-blue to-ep-green"></div>
              
              <div className="space-y-12">
                {[
                  { step: "1", title: "Create Your Event", description: "Set up your event with all the details - date, location, RSVP limits, and more." },
                  { step: "2", title: "Invite Attendees", description: "Share your event and let people RSVP with just a few clicks." },
                  { step: "3", title: "Go Live", description: "Start your event and watch real-time feedback flow in from attendees." },
                  { step: "4", title: "Analyze Results", description: "Review comprehensive analytics and insights after your event ends." },
                ].map((item, index) => (
                  <div key={index} className="relative flex gap-8 items-center">
                    <div className="w-16 h-16 bg-ep-blue rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg relative z-10">
                      {item.step}
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-6 shadow-md border border-gray-100">
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 text-lg">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="w-10 h-10 bg-ep-blue rounded-xl flex items-center justify-center mr-3">
                <span className="text-white font-bold">EP</span>
              </div>
              <span className="text-xl font-bold">EventPulse</span>
            </div>
            
            <div className="flex flex-wrap gap-6 text-gray-300">
              <a href="#about" className="hover:text-ep-blue transition-colors">About</a>
              <a href="#terms" className="hover:text-ep-blue transition-colors">Terms</a>
              <a href="#privacy" className="hover:text-ep-blue transition-colors">Privacy</a>
              <a href="#contact" className="hover:text-ep-blue transition-colors">Contact</a>
              <a href="#github" className="hover:text-ep-blue transition-colors">GitHub</a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EventPulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
