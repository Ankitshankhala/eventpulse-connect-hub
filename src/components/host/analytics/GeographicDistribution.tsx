
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface GeographicDistributionProps {
  events: any[];
}

export const GeographicDistribution = ({ events }: GeographicDistributionProps) => {
  const locationData = [
    { city: 'San Francisco', attendees: 45, percentage: 32 },
    { city: 'New York', attendees: 38, percentage: 27 },
    { city: 'Los Angeles', attendees: 25, percentage: 18 },
    { city: 'Chicago', attendees: 18, percentage: 13 },
    { city: 'Boston', attendees: 14, percentage: 10 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
          Geographic Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {locationData.map((location, index) => (
            <div key={location.city} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">{location.city}</span>
                  <Users className="w-4 h-4 ml-2 text-gray-500" />
                  <span className="text-sm text-gray-600 ml-1">{location.attendees}</span>
                </div>
                <span className="text-sm font-semibold text-gray-700">{location.percentage}%</span>
              </div>
              <Progress value={location.percentage} className="h-2" />
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">Top Location</p>
              <p className="text-lg font-bold text-blue-600">San Francisco</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-blue-900">Total Cities</p>
              <p className="text-lg font-bold text-blue-600">12</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
