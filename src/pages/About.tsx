
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Award, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Users,
      title: "Community First",
      description: "We believe great events bring people together and create lasting connections."
    },
    {
      icon: Target,
      title: "Innovation Driven",
      description: "Constantly pushing boundaries to make event management effortless and engaging."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering the highest quality platform and support experience."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Every feature is built with love for event organizers and their success."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      description: "Former event organizer with 10+ years experience in corporate events."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      description: "Tech veteran who's built platforms serving millions of users worldwide."
    },
    {
      name: "Emily Davis",
      role: "Head of Product",
      description: "UX expert passionate about creating intuitive event management experiences."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About EventPulse
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to revolutionize how events are organized, managed, and experienced. 
            Our platform empowers event organizers with real-time insights and seamless management tools.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  EventPulse was born from a simple frustration: organizing events shouldn't be so complicated. 
                  After years of struggling with outdated tools and fragmented systems, our founders decided 
                  to build the platform they wished they had.
                </p>
                <p className="mb-4">
                  What started as a weekend project quickly became a passion. We realized that event organizers 
                  everywhere were facing the same challenges: lack of real-time feedback, poor attendee engagement, 
                  and limited insights into event performance.
                </p>
                <p>
                  Today, EventPulse serves thousands of event organizers worldwide, from intimate workshops 
                  to large-scale conferences. We're proud to be part of creating memorable experiences that 
                  bring people together.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Events?</h2>
              <p className="text-xl mb-6 text-blue-100">
                Join thousands of event organizers who trust EventPulse
              </p>
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => window.location.href = '/'}
              >
                Get Started Today
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
