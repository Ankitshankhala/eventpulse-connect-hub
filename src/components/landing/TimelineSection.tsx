
import { CheckCircle } from 'lucide-react';

export const TimelineSection = () => {
  const timelineSteps = [
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
  ];

  return (
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
              {timelineSteps.map((item, index) => (
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
  );
};
