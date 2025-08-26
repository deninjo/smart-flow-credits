import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Tooltip, Cell } from 'recharts';
import { useState } from 'react';

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

const chartConfig = {
  usage: {
    label: "Water Usage",
    color: "hsl(var(--water-primary))",
  },
  cost: {
    label: "Cost (KSh)",
    color: "hsl(var(--credit-primary))",
  },
  flow: {
    label: "Flow Rate (L/h)",
    color: "hsl(var(--credit-primary))",
  },
};

export const UsageChart = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleBarClick = (data: any) => {
    setSelectedDay(selectedDay === data.name ? null : data.name);
  };

  const handleLineClick = (data: any) => {
    setSelectedTime(selectedTime === data.time ? null : data.time);
  };

  const getBarColor = (dayName: string) => {
    if (selectedDay === null) return "hsl(var(--water-primary))";
    return selectedDay === dayName ? "hsl(var(--water-primary))" : "hsl(var(--water-primary) / 0.3)";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-water">Weekly Usage Overview</CardTitle>
          {selectedDay && (
            <p className="text-sm text-muted-foreground">
              {selectedDay}: {dailyUsageData.find(d => d.name === selectedDay)?.usage}L used, 
              KSh {dailyUsageData.find(d => d.name === selectedDay)?.cost} cost
            </p>
          )}
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={dailyUsageData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip 
                content={<ChartTooltipContent 
                  labelFormatter={(value) => `${value}`}
                  formatter={(value, name) => [
                    `${value}${name === 'usage' ? 'L' : ''}`,
                    chartConfig[name as keyof typeof chartConfig]?.label || name
                  ]}
                />} 
              />
              <Bar 
                dataKey="usage" 
                radius={[4, 4, 0, 0]}
                className="cursor-pointer transition-all duration-200 hover:opacity-80"
                onClick={handleBarClick}
              >
                {dailyUsageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.name)} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-water">Today's Flow Rate</CardTitle>
          {selectedTime && (
            <p className="text-sm text-muted-foreground">
              {selectedTime}: {hourlyUsageData.find(d => d.time === selectedTime)?.flow}L/h flow rate
            </p>
          )}
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={hourlyUsageData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip 
                content={<ChartTooltipContent 
                  labelFormatter={(value) => `${value}`}
                  formatter={(value, name) => [
                    `${value}L/h`,
                    chartConfig[name as keyof typeof chartConfig]?.label || name
                  ]}
                />} 
              />
              <Line 
                type="monotone" 
                dataKey="flow" 
                stroke={selectedTime ? "hsl(var(--credit-primary))" : "hsl(var(--credit-primary))"}
                strokeWidth={3}
                dot={{ 
                  fill: "hsl(var(--credit-primary))", 
                  strokeWidth: 2, 
                  r: 6,
                  className: "cursor-pointer transition-all duration-200 hover:r-8"
                }}
                activeDot={{ 
                  r: 8, 
                  fill: "hsl(var(--credit-primary))",
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2
                }}
                className="cursor-pointer"
                onClick={handleLineClick}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};