
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { WeeklyTrendData, MonthlyGrowthData, AttendanceTrendData } from './utils/trendAnalysisUtils';

interface TrendChartsProps {
  weeklyTrends: WeeklyTrendData[];
  monthlyData: MonthlyGrowthData[];
  attendanceTrend: AttendanceTrendData[];
}

export const TrendCharts = ({ weeklyTrends, monthlyData, attendanceTrend }: TrendChartsProps) => {
  return (
    <div className="w-full max-w-full overflow-hidden font-['Segoe_UI']">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg min-w-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-gray-900">Weekly Activity Trends</CardTitle>
            <CardDescription className="text-sm text-gray-600">Recent 12 weeks performance</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrends} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="week" 
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
                    name="Events"
                    dot={{ fill: '#4285F4', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rsvps" 
                    stroke="#34A853" 
                    strokeWidth={3}
                    name="RSVPs"
                    dot={{ fill: '#34A853', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="#F4B400" 
                    strokeWidth={3}
                    name="Attendance"
                    dot={{ fill: '#F4B400', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg min-w-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-gray-900">Monthly Growth Trends</CardTitle>
            <CardDescription className="text-sm text-gray-600">Long-term growth patterns</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
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
                  <Area 
                    type="monotone" 
                    dataKey="events" 
                    stackId="1"
                    stroke="#4285F4" 
                    fill="#4285F4"
                    fillOpacity={0.6}
                    name="Events"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="rsvps" 
                    stackId="2"
                    stroke="#34A853" 
                    fill="#34A853"
                    fillOpacity={0.6}
                    name="RSVPs"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg min-w-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-gray-900">Attendance Rate Trend</CardTitle>
            <CardDescription className="text-sm text-gray-600">How attendance rates change over time</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceTrend} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 11, fontFamily: 'Segoe UI' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fontSize: 11, fontFamily: 'Segoe UI' }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip 
                    formatter={(value) => [`${Math.round(Number(value))}%`, 'Attendance Rate']} 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontFamily: 'Segoe UI'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="attendanceRate" 
                    stroke="#EA4335" 
                    strokeWidth={3}
                    name="Attendance Rate"
                    dot={{ fill: '#EA4335', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
