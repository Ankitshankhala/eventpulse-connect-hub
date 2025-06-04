
import { Monitor, Smartphone, BarChart3, MessageSquare, Calendar, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const DashboardPreviews = () => {
  const emojiReactions = ['👍', '❤️', '😮', '👎', '🔥', '✨'];

  return (
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
  );
};
