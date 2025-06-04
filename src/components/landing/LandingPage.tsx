
import { Calendar, Users, MessageSquare, BarChart3, Smartphone, Monitor, Star, Play, CheckCircle, TrendingUp, Clock, Globe, Shield } from 'lucide-react';
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

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Event Coordinator",
      company: "TechFlow Inc",
      quote: "EventPulse transformed how we manage our quarterly meetings. The live feedback feature is a game-changer!",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Marketing Director", 
      company: "StartupHub",
      quote: "We've seen 40% better engagement at our events since switching to EventPulse. The analytics are incredibly detailed.",
      rating: 5
    },
    {
      name: "Jennifer Kim",
      role: "HR Manager",
      company: "Innovation Labs",
      quote: "The RSVP system is so smooth, and the real-time check-ins saved us hours during our company retreat.",
      rating: 5
    }
  ];

  const stats = [
    { number: "50K+", label: "Events Created" },
    { number: "2.5M+", label: "Happy Attendees" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" }
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

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Global Timezone Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>99.9% Uptime</span>
              </div>
            </div>
            
            <AuthSection onGetStarted={onGetStarted} />

            <p className="text-sm text-gray-500 mb-8">✓ No credit card required • ✓ Setup in under 2 minutes</p>

            {/* Live Demo Button */}
            <div className="mb-12">
              <Button 
                variant="outline" 
                size="lg" 
                className="group px-8 py-4 text-lg border-ep-blue text-ep-blue hover:bg-ep-blue hover:text-white transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch 2-Min Demo
              </Button>
            </div>

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

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-ep-blue mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Dashboard Previews */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              See EventPulse in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience how our platform transforms event management for both hosts and attendees.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Enhanced Host View */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-ep-blue/10 text-ep-blue px-4 py-2 rounded-full mb-6">
                <Monitor className="h-4 w-4" />
                <span className="font-semibold">Host Dashboard</span>
              </div>
              
              <Card className="border-gray-200 shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-8">
                  {/* Dashboard Header */}
                  <div className="bg-gradient-to-r from-ep-blue to-ep-green rounded-lg p-4 mb-6 text-white">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-lg">Annual Tech Conference</h4>
                      <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium">Live</span>
                      </div>
                    </div>
                    <div className="text-sm opacity-90">March 15, 2024 • 2:30 PM EST</div>
                  </div>

                  {/* Real-time Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-ep-blue">247</div>
                      <div className="text-xs text-gray-600">Total RSVPs</div>
                      <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +12% vs last event
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-ep-green">198</div>
                      <div className="text-xs text-gray-600">Checked In</div>
                      <div className="text-xs text-gray-500">80% attendance</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600">89</div>
                      <div className="text-xs text-gray-600">Live Reactions</div>
                      <div className="text-xs text-gray-500">Last 10 mins</div>
                    </div>
                  </div>

                  {/* Live Feedback Stream */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-semibold text-sm">Live Feedback Stream</h5>
                      <div className="flex gap-1">
                        <span className="text-lg">🔥</span>
                        <span className="text-lg">👍</span>
                        <span className="text-lg">❤️</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-white rounded p-2 text-xs border-l-2 border-green-400">
                        "Great insights on AI trends! 🤖" - Sarah M.
                      </div>
                      <div className="bg-white rounded p-2 text-xs border-l-2 border-blue-400">
                        "The networking session was perfect 🙌" - Alex K.
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center gap-2 p-3 bg-ep-blue/10 rounded-lg hover:bg-ep-blue/20 transition-colors text-sm">
                      <BarChart3 className="h-4 w-4 text-ep-blue" />
                      <span className="text-ep-blue font-medium">View Analytics</span>
                    </button>
                    <button className="flex items-center gap-2 p-3 bg-ep-green/10 rounded-lg hover:bg-ep-green/20 transition-colors text-sm">
                      <MessageSquare className="h-4 w-4 text-ep-green" />
                      <span className="text-ep-green font-medium">Send Update</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Attendee View */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-ep-green/10 text-ep-green px-4 py-2 rounded-full mb-6">
                <Smartphone className="h-4 w-4" />
                <span className="font-semibold">Attendee Experience</span>
              </div>
              
              <Card className="border-gray-200 shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-8">
                  {/* Event Card */}
                  <div className="bg-gradient-to-r from-ep-green/10 to-ep-blue/10 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-left">
                        <h4 className="font-bold text-gray-900">Tech Conference 2024</h4>
                        <p className="text-sm text-gray-600">Today • 2:30 PM EST</p>
                      </div>
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        Checked In
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-700 mb-2">🎯 Currently: "The Future of AI in Business"</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Speaker: Dr. Amanda Chen</span>
                        <span>30 mins remaining</span>
                      </div>
                    </div>
                  </div>

                  {/* React Section */}
                  <div className="mb-6">
                    <h5 className="font-semibold text-sm mb-3 text-left">How's the session going?</h5>
                    <div className="grid grid-cols-3 gap-2">
                      {emojiReactions.slice(0, 6).map((emoji, index) => (
                        <button
                          key={index}
                          className="p-3 bg-white rounded-lg border border-gray-200 hover:scale-110 hover:shadow-md hover:border-ep-blue transition-all duration-200"
                        >
                          <span className="text-2xl">{emoji}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <button className="w-full flex items-center gap-3 p-3 bg-ep-blue/5 rounded-lg border border-ep-blue/20 hover:bg-ep-blue/10 transition-colors">
                      <Calendar className="h-5 w-5 text-ep-blue" />
                      <span className="text-sm text-gray-700 font-medium">View Schedule</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 bg-ep-green/5 rounded-lg border border-ep-green/20 hover:bg-ep-green/10 transition-colors">
                      <Users className="h-5 w-5 text-ep-green" />
                      <span className="text-sm text-gray-700 font-medium">Network with Attendees</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-colors">
                      <MessageSquare className="h-5 w-5 text-yellow-600" />
                      <span className="text-sm text-gray-700 font-medium">Ask a Question</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
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
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white group">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-${feature.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
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

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Loved by Event Organizers Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers are saying about EventPulse
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-ep-blue font-medium">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
            <p className="text-xl text-gray-600">
              Get started in minutes, not hours
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ep-blue to-ep-green"></div>
              
              <div className="space-y-12">
                {[
                  { 
                    step: "1", 
                    title: "Create Your Event", 
                    description: "Set up your event with all the details - date, location, RSVP limits, and more.",
                    time: "2 minutes"
                  },
                  { 
                    step: "2", 
                    title: "Invite Attendees", 
                    description: "Share your event and let people RSVP with just a few clicks.",
                    time: "Instant"
                  },
                  { 
                    step: "3", 
                    title: "Go Live", 
                    description: "Start your event and watch real-time feedback flow in from attendees.",
                    time: "Real-time"
                  },
                  { 
                    step: "4", 
                    title: "Analyze Results", 
                    description: "Review comprehensive analytics and insights after your event ends.",
                    time: "Available immediately"
                  },
                ].map((item, index) => (
                  <div key={index} className="relative flex gap-8 items-center">
                    <div className="w-16 h-16 bg-ep-blue rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg relative z-10">
                      {item.step}
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                        <span className="text-sm text-ep-blue font-medium bg-ep-blue/10 px-2 py-1 rounded">{item.time}</span>
                      </div>
                      <p className="text-gray-600 text-lg">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-ep-blue to-ep-green">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Events?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of event organizers who've already made the switch to EventPulse
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-ep-blue hover:bg-gray-100 px-8 py-4 text-lg font-semibold transition-colors duration-200 shadow-lg"
                onClick={onGetStarted}
              >
                Start Free Today
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-ep-blue px-8 py-4 text-lg transition-colors duration-200"
              >
                Schedule Demo
              </Button>
            </div>
            <p className="text-sm text-white/80 mt-4">
              ✓ Free 30-day trial • ✓ No setup fees • ✓ Cancel anytime
            </p>
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
