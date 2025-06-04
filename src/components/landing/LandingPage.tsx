import { ArrowRight, Calendar, Users, MessageSquare, BarChart3, Smartphone, Monitor, Star } from 'lucide-react';
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
    },
    {
      icon: Users,
      title: "RSVP & Live Check-In",
      description: "Streamlined RSVP process with real-time check-ins. Track attendance and manage walk-ins effortlessly.",
    },
    {
      icon: MessageSquare,
      title: "Live Feedback Stream",
      description: "Real-time attendee feedback with emoji reactions. Keep the pulse on your event as it happens.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Comprehensive post-event analytics with charts, feedback trends, and attendee insights.",
    },
  ];

  const emojiReactions = ['👍', '❤️', '😮', '👎', '🔥', '✨'];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">EP</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
              Real-Time Event Insights at Your Fingertips
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              EventPulse revolutionizes event management with live feedback, real-time analytics, and seamless attendee experiences. Perfect for hosts and attendees alike.
            </p>
            
            <AuthSection onGetStarted={onGetStarted} />

            {/* Live Emoji Feedback Illustration */}
            <div className="relative max-w-md mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border">
                <div className="text-sm text-gray-500 mb-3">Live Feedback</div>
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
                  <div className="bg-gray-50 rounded-lg p-2 text-sm text-left">
                    "Amazing presentation! 👍"
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-sm text-left">
                    "Love the interactive format ❤️"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
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
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Role-based UI Previews */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
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
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
                <Monitor className="h-4 w-4" />
                <span className="font-semibold">Host Dashboard</span>
              </div>
              
              <Card className="border-gray-200 shadow-lg">
                <CardContent className="p-8">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">Event Analytics</h4>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-600 font-medium">Live</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">127</div>
                        <div className="text-xs text-gray-600">RSVPs</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">98</div>
                        <div className="text-xs text-gray-600">Checked In</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">45</div>
                        <div className="text-xs text-gray-600">Feedback</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="text-sm">Manage Events</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                      <span className="text-sm">View Analytics</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <MessageSquare className="h-5 w-5 text-purple-600" />
                      <span className="text-sm">Live Feedback</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Attendee View */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
                <Smartphone className="h-4 w-4" />
                <span className="font-semibold">Attendee Experience</span>
              </div>
              
              <Card className="border-gray-200 shadow-lg">
                <CardContent className="p-8">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-4">React to Event</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {emojiReactions.slice(0, 6).map((emoji, index) => (
                        <button
                          key={index}
                          className="p-3 bg-white rounded-lg border hover:scale-110 transition-transform"
                        >
                          <span className="text-2xl">{emoji}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="text-sm">RSVP to Events</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <Star className="h-5 w-5 text-yellow-600" />
                      <span className="text-sm">Quick Check-In</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                      <span className="text-sm">Send Feedback</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              How EventPulse Works
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-indigo-600"></div>
              
              <div className="space-y-12">
                {[
                  { step: "1", title: "Create Your Event", description: "Set up your event with all the details - date, location, RSVP limits, and more." },
                  { step: "2", title: "Invite Attendees", description: "Share your event and let people RSVP with just a few clicks." },
                  { step: "3", title: "Go Live", description: "Start your event and watch real-time feedback flow in from attendees." },
                  { step: "4", title: "Analyze Results", description: "Review comprehensive analytics and insights after your event ends." },
                ].map((item, index) => (
                  <div key={index} className="relative flex gap-8 items-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-2 text-gray-900">{item.title}</h3>
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
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                <span className="text-white font-bold">EP</span>
              </div>
              <span className="text-xl font-bold">EventPulse</span>
            </div>
            
            <div className="flex flex-wrap gap-6 text-gray-300">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms</a>
              <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              <a href="#github" className="hover:text-white transition-colors">GitHub</a>
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
