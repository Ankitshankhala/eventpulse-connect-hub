
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { MonthlyEventData, EventStatusData, EventSizeData, DayOfWeekData } from './utils/eventDataUtils';

interface EventAnalyticsChartsProps {
  monthlyData: MonthlyEventData[];
  eventStatusData: EventStatusData[];
  sizeData: EventSizeData[];
  weekData: DayOfWeekData[];
}

const COLORS = ['#4285F4', '#34A853', '#F4B400', '#EA4335', '#8b5cf6'];

export const EventAnalyticsCharts = ({ monthlyData, eventStatusData, sizeData, weekData }: EventAnalyticsChartsProps) => {
  return (
    <div className="w-full max-w-full overflow-hidden font-['Segoe_UI']">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg min-w-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-gray-900">Monthly Event Trends</CardTitle>
            <CardDescription className="text-sm text-gray-600">Events created and RSVPs over time</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 11, fontFamily: 'Segoe UI' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 11, fontFamily: 'Segoe UI' }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontFamily: 'Segoe UI'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="events" 
                    stroke="#4285F4" 
                    strokeWidth={3}
                    name="Events Created"
                    dot={{ fill: '#4285F4', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rsvps" 
                    stroke="#34A853" 
                    strokeWidth={3}
                    name="Total RSVPs"
                    dot={{ fill: '#34A853', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg min-w-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-gray-900">Event Status Distribution</CardTitle>
            <CardDescription className="text-sm text-gray-600">Completed vs upcoming events</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <Pie
                    data={eventStatusData}
                    cx="50%"
                    cy="45%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {eventStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontFamily: 'Segoe UI'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center flex-wrap gap-4 mt-4">
              {eventStatusData.map((entry) => (
                <div key={entry.status} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2 flex-shrink-0" 
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm text-gray-600 font-medium">{entry.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg min-w-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-gray-900">Event Size Distribution</CardTitle>
            <CardDescription className="text-sm text-gray-600">Events by attendance size</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sizeData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="size" 
                    tick={{ fontSize: 11, fontFamily: 'Segoe UI' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 11, fontFamily: 'Segoe UI' }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontFamily: 'Segoe UI'
                    }} 
                  />
                  <Bar dataKey="count" fill="#4285F4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg min-w-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-gray-900">Day of Week Popularity</CardTitle>
            <CardDescription className="text-sm text-gray-600">When events are typically scheduled</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 11, fontFamily: 'Segoe UI' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 11, fontFamily: 'Segoe UI' }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontFamily: 'Segoe UI'
                    }} 
                  />
                  <Bar dataKey="count" fill="#F4B400" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
