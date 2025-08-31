import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Droplets, 
  DollarSign, 
  AlertTriangle,
  TrendingUp,
  Activity,
  MapPin,
  Zap
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Tooltip, Legend } from 'recharts';
import { useState } from 'react';

// Simulated data
const systemOverview = {
  totalCustomers: 1248,
  activeMeters: 1198,
  totalRevenue: 456780,
  waterDistributed: 2847693
};

const revenueData = [
  { name: 'Jan', revenue: 35000 },
  { name: 'Feb', revenue: 42000 },
  { name: 'Mar', revenue: 38000 },
  { name: 'Apr', revenue: 51000 },
  { name: 'May', revenue: 49000 },
  { name: 'Jun', revenue: 55000 },
];

const meterStatusData = [
  { name: 'Active', value: 1198, color: 'hsl(var(--credit-primary))' },
  { name: 'Low Balance', value: 45, color: 'hsl(var(--warning-primary))' },
  { name: 'Offline', value: 5, color: 'hsl(var(--danger-primary))' },
];

const recentAlerts = [
  { id: 1, type: 'leak', customer: 'John Doe', meter: 'AQ-001', time: '2 min ago', severity: 'high' },
  { id: 2, type: 'low_balance', customer: 'Jane Smith', meter: 'AQ-045', time: '15 min ago', severity: 'medium' },
  { id: 3, type: 'offline', customer: 'Mike Johnson', meter: 'AQ-127', time: '1 hour ago', severity: 'high' },
  { id: 4, type: 'unusual_usage', customer: 'Sarah Wilson', meter: 'AQ-089', time: '2 hours ago', severity: 'low' },
];

export const AdminDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedMeterStatus, setSelectedMeterStatus] = useState<string | null>(null);

  const handleLineClick = (data: any) => {
    setSelectedMonth(selectedMonth === data.name ? null : data.name);
  };

  const handlePieClick = (data: any) => {
    setSelectedMeterStatus(selectedMeterStatus === data.name ? null : data.name);
  };

  const getDetailedRevenueInfo = (month: string) => {
    const monthData = revenueData.find(item => item.name === month);
    if (!monthData) return null;
    
    return {
      revenue: monthData.revenue,
      customers: Math.floor(monthData.revenue / 366), // Estimated customers
      avgPerCustomer: Math.round(monthData.revenue / Math.floor(monthData.revenue / 366)),
      growth: month === 'Jun' ? '+12.7%' : month === 'May' ? '+8.2%' : '+5.1%'
    };
  };

  const getDetailedMeterInfo = (status: string) => {
    const statusData = meterStatusData.find(item => item.name === status);
    if (!statusData) return null;
    
    const details = {
      'Active': { description: 'Meters operating normally', action: 'Monitor usage patterns' },
      'Low Balance': { description: 'Meters with balance < 100 units', action: 'Send payment reminders' },
      'Offline': { description: 'Meters not responding', action: 'Schedule maintenance visit' }
    };
    
    return {
      count: statusData.value,
      percentage: ((statusData.value / meterStatusData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1),
      ...details[status as keyof typeof details]
    };
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="water-outline" size="sm">
            <MapPin className="h-4 w-4" />
            View Map
          </Button>
          <Button variant="water" size="sm">
            <Activity className="h-4 w-4" />
            System Status
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-water text-white border-0">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-white/90">
              <Users className="h-5 w-5" />
              Total Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{systemOverview.totalCustomers.toLocaleString()}</div>
            <p className="text-white/80 text-sm">+12 this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-credit text-white border-0">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-white/90">
              <Droplets className="h-5 w-5" />
              Active Meters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{systemOverview.activeMeters.toLocaleString()}</div>
            <p className="text-white/80 text-sm">96% operational</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-warning bg-warning-light">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-warning">
              <DollarSign className="h-5 w-5" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">
              KSh {(systemOverview.totalRevenue / 1000).toFixed(0)}K
            </div>
            <p className="text-warning/80 text-sm">+8.2% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-water">
              <Zap className="h-5 w-5" />
              Water Distributed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-water">
              {(systemOverview.waterDistributed / 1000000).toFixed(1)}M
            </div>
            <p className="text-muted-foreground text-sm">liters total</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-water" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData} onClick={handleLineClick}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                  formatter={(value: any) => [`KSh ${value.toLocaleString()}`, 'Revenue']}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--water-primary))" 
                  strokeWidth={3}
                  dot={{ 
                    fill: "hsl(var(--water-primary))", 
                    strokeWidth: 2, 
                    r: 6,
                    cursor: 'pointer'
                  }}
                  activeDot={{ 
                    r: 8, 
                    fill: "hsl(var(--water-primary))",
                    stroke: "hsl(var(--background))",
                    strokeWidth: 2
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
            
            {selectedMonth && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h4 className="font-medium text-water mb-2">{selectedMonth} Details</h4>
                {(() => {
                  const details = getDetailedRevenueInfo(selectedMonth);
                  return details ? (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Revenue:</span>
                        <p className="font-medium">KSh {details.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Growth:</span>
                        <p className="font-medium text-credit">{details.growth}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Active Customers:</span>
                        <p className="font-medium">{details.customers}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Avg per Customer:</span>
                        <p className="font-medium">KSh {details.avgPerCustomer}</p>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-water" />
              Meter Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={meterStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onClick={handlePieClick}
                  style={{ cursor: 'pointer' }}
                >
                  {meterStatusData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke={selectedMeterStatus === entry.name ? "hsl(var(--foreground))" : "none"}
                      strokeWidth={selectedMeterStatus === entry.name ? 3 : 0}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                  formatter={(value: any) => [`${value} meters`, 'Count']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            
            {selectedMeterStatus && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h4 className="font-medium text-water mb-2">{selectedMeterStatus} Meters</h4>
                {(() => {
                  const details = getDetailedMeterInfo(selectedMeterStatus);
                  return details ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Count:</span>
                        <span className="font-medium">{details.count} ({details.percentage}%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-medium">{details.description}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Recommended Action:</span>
                        <span className="font-medium text-water">{details.action}</span>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Alerts and System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${
                      alert.severity === 'high' ? 'bg-danger' :
                      alert.severity === 'medium' ? 'bg-warning' : 'bg-credit'
                    }`} />
                    <div>
                      <p className="font-medium">{alert.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {alert.meter} • {alert.type.replace('_', ' ')} • {alert.time}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={
                      alert.severity === 'high' ? 'bg-danger-light text-danger' :
                      alert.severity === 'medium' ? 'bg-warning-light text-warning' : 
                      'bg-credit-light text-credit'
                    }
                  >
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-water" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Server Status</span>
                <Badge className="bg-credit-light text-credit">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">IoT Gateway</span>
                <Badge className="bg-credit-light text-credit">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge className="bg-credit-light text-credit">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Payment Gateway</span>
                <Badge className="bg-credit-light text-credit">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">SMS Service</span>
                <Badge className="bg-warning-light text-warning">Degraded</Badge>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">System Uptime</span>
                  <span className="text-sm font-medium">99.8%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-credit h-2 rounded-full" style={{width: '99.8%'}}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};