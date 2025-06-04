
import { Calendar, Users, MessageSquare, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const FeaturesSection = () => {
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

  return (
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
  );
};
