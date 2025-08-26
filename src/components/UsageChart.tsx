import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

const dailyUsageData = [
  { name: 'Mon', usage: 180, cost: 45 },
  { name: 'Tue', usage: 220, cost: 55 },
  { name: 'Wed', usage: 190, cost: 47.5 },
  { name: 'Thu', usage: 240, cost: 60 },
  { name: 'Fri', usage: 200, cost: 50 },
  { name: 'Sat', usage: 280, cost: 70 },
  { name: 'Sun', usage: 300, cost: 75 },
];

const hourlyUsageData = [
  { time: '6AM', flow: 25 },
  { time: '8AM', flow: 45 },
  { time: '10AM', flow: 15 },
  { time: '12PM', flow: 30 },
  { time: '2PM', flow: 20 },
  { time: '4PM', flow: 35 },
  { time: '6PM', flow: 50 },
  { time: '8PM', flow: 40 },
  { time: '10PM', flow: 25 },
];

export const UsageChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-water">Weekly Usage Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Bar 
                dataKey="usage" 
                fill="hsl(var(--water-primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-water">Today's Flow Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Line 
                type="monotone" 
                dataKey="flow" 
                stroke="hsl(var(--credit-primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--credit-primary))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};