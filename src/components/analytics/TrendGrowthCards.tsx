
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TrendGrowthCardsProps {
  eventsGrowthRate: number;
  rsvpsGrowthRate: number;
  attendanceGrowthRate: number;
  feedbackGrowthRate: number;
}

export const TrendGrowthCards = ({ 
  eventsGrowthRate, 
  rsvpsGrowthRate, 
  attendanceGrowthRate, 
  feedbackGrowthRate 
}: TrendGrowthCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Events Growth</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(eventsGrowthRate)}%
              </p>
              <p className="text-xs text-gray-500 mt-1">Month over month</p>
            </div>
            {eventsGrowthRate >= 0 ? 
              <TrendingUp className="w-8 h-8 text-green-600" /> :
              <TrendingDown className="w-8 h-8 text-red-600" />
            }
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">RSVPs Growth</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(rsvpsGrowthRate)}%
              </p>
              <p className="text-xs text-gray-500 mt-1">Month over month</p>
            </div>
            {rsvpsGrowthRate >= 0 ? 
              <TrendingUp className="w-8 h-8 text-green-600" /> :
              <TrendingDown className="w-8 h-8 text-red-600" />
            }
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Attendance Growth</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(attendanceGrowthRate)}%
              </p>
              <p className="text-xs text-gray-500 mt-1">Month over month</p>
            </div>
            {attendanceGrowthRate >= 0 ? 
              <TrendingUp className="w-8 h-8 text-green-600" /> :
              <TrendingDown className="w-8 h-8 text-red-600" />
            }
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Engagement Growth</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(feedbackGrowthRate)}%
              </p>
              <p className="text-xs text-gray-500 mt-1">Feedback month over month</p>
            </div>
            {feedbackGrowthRate >= 0 ? 
              <TrendingUp className="w-8 h-8 text-green-600" /> :
              <TrendingDown className="w-8 h-8 text-red-600" />
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
