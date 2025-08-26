import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Filter,
  AlertTriangle,
  Droplets,
  Wifi,
  Activity,
  CheckCircle,
  Bell
} from "lucide-react";

// Simulated alert data
const alerts = [
  {
    id: "ALT-001",
    type: "leak",
    severity: "high",
    customer: "David Brown",
    meterId: "AQ-005",
    location: "Runda, Nairobi",
    message: "Continuous water flow detected for 3 hours during low-usage period",
    timestamp: "2024-01-20 14:30:00",
    status: "active"
  },
  {
    id: "ALT-002",
    type: "low_balance",
    severity: "medium",
    customer: "Jane Smith",
    meterId: "AQ-002",
    location: "Karen, Nairobi",
    message: "Water balance below 100L threshold",
    timestamp: "2024-01-20 13:45:00",
    status: "active"
  },
  {
    id: "ALT-003",
    type: "offline",
    severity: "high",
    customer: "Mike Johnson",
    meterId: "AQ-003",
    location: "Kilimani, Nairobi",
    message: "Meter has been offline for 24 hours",
    timestamp: "2024-01-19 14:30:00",
    status: "acknowledged"
  },
  {
    id: "ALT-004",
    type: "unusual_usage",
    severity: "low",
    customer: "Sarah Wilson",
    meterId: "AQ-004",
    location: "Lavington, Nairobi",
    message: "Usage pattern 200% above normal consumption",
    timestamp: "2024-01-20 10:15:00",
    status: "resolved"
  },
  {
    id: "ALT-005",
    type: "system",
    severity: "medium",
    customer: "System",
    meterId: "SYS-001",
    location: "Central Server",
    message: "SMS service experiencing delays",
    timestamp: "2024-01-20 09:30:00",
    status: "active"
  }
];

export const AdminAlerts = () => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'leak':
        return <Droplets className="h-4 w-4" />;
      case 'low_balance':
        return <AlertTriangle className="h-4 w-4" />;
      case 'offline':
        return <Wifi className="h-4 w-4" />;
      case 'unusual_usage':
        return <Activity className="h-4 w-4" />;
      case 'system':
        return <Bell className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge className="bg-danger-light text-danger">High</Badge>;
      case 'medium':
        return <Badge className="bg-warning-light text-warning">Medium</Badge>;
      case 'low':
        return <Badge className="bg-credit-light text-credit">Low</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-danger-light text-danger">Active</Badge>;
      case 'acknowledged':
        return <Badge className="bg-warning-light text-warning">Acknowledged</Badge>;
      case 'resolved':
        return <Badge className="bg-credit-light text-credit">Resolved</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const activeAlerts = alerts.filter(alert => alert.status === 'active').length;
  const highSeverityAlerts = alerts.filter(alert => alert.severity === 'high' && alert.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Alerts</h1>
          <p className="text-muted-foreground">Monitor and manage system alerts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <CheckCircle className="h-4 w-4" />
            Mark All Read
          </Button>
          <Button variant="water" size="sm">
            <Bell className="h-4 w-4" />
            Alert Settings
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-danger bg-danger-light">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-danger" />
              <div>
                <p className="text-sm text-danger/80">Active Alerts</p>
                <p className="text-2xl font-bold text-danger">{activeAlerts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning bg-warning-light">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-warning" />
              <div>
                <p className="text-sm text-warning/80">High Severity</p>
                <p className="text-2xl font-bold text-warning">{highSeverityAlerts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Droplets className="h-8 w-8 text-water" />
              <div>
                <p className="text-sm text-muted-foreground">Leak Alerts</p>
                <p className="text-2xl font-bold text-water">1</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Wifi className="h-8 w-8 text-credit" />
              <div>
                <p className="text-sm text-muted-foreground">Offline Meters</p>
                <p className="text-2xl font-bold text-credit">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search alerts by customer, meter ID, or message..." 
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card 
            key={alert.id} 
            className={`transition-all hover:shadow-card ${
              alert.status === 'active' && alert.severity === 'high' 
                ? 'border-danger bg-danger-light/30' 
                : alert.status === 'active' && alert.severity === 'medium'
                ? 'border-warning bg-warning-light/30'
                : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    alert.severity === 'high' ? 'bg-danger-light' :
                    alert.severity === 'medium' ? 'bg-warning-light' :
                    'bg-credit-light'
                  }`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{alert.id}</p>
                      {getSeverityBadge(alert.severity)}
                      {getStatusBadge(alert.status)}
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-2">
                      {alert.customer} • {alert.meterId} • {alert.location}
                    </p>
                    
                    <p className="text-sm mb-2">{alert.message}</p>
                    
                    <p className="text-xs text-muted-foreground">
                      {alert.timestamp}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {alert.status === 'active' && (
                    <Button variant="outline" size="sm">
                      Acknowledge
                    </Button>
                  )}
                  <Button variant="water" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};