
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity Trends</CardTitle>
          <CardDescription>Recent 12 weeks performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="events" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Events"
              />
              <Line 
                type="monotone" 
                dataKey="rsvps" 
                stroke="#10b981" 
                strokeWidth={2}
                name="RSVPs"
              />
              <Line 
                type="monotone" 
                dataKey="attendance" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Attendance"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Growth Trends</CardTitle>
          <CardDescription>Long-term growth patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="events" 
                stackId="1"
                stroke="#3b82f6" 
                fill="#3b82f6"
                fillOpacity={0.6}
                name="Events"
              />
              <Area 
                type="monotone" 
                dataKey="rsvps" 
                stackId="2"
                stroke="#10b981" 
                fill="#10b981"
                fillOpacity={0.6}
                name="RSVPs"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Rate Trend</CardTitle>
          <CardDescription>How attendance rates change over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${Math.round(Number(value))}%`, 'Attendance Rate']} />
              <Line 
                type="monotone" 
                dataKey="attendanceRate" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                name="Attendance Rate"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
