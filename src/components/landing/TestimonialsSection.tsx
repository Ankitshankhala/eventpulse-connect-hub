
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const TestimonialsSection = () => {
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

  return (
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
  );
};
