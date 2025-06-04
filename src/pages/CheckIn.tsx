
import { useParams } from 'react-router-dom';
import { MobileCheckIn } from '@/components/mobile/MobileCheckIn';

const CheckIn = () => {
  const { eventId } = useParams<{ eventId: string }>();

  if (!eventId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Event</h1>
          <p className="text-gray-600">The event ID is missing or invalid.</p>
        </div>
      </div>
    );
  }

  return <MobileCheckIn eventId={eventId} />;
};

export default CheckIn;
