import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddMeterModal } from "@/components/admin/AddMeterModal";
import { MeterDetailsModal } from "@/components/admin/MeterDetailsModal";
import { 
  Droplets, 
  MapPin, 
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity
} from "lucide-react";

// Simulated meter data
const meters = [
  { 
    id: "AQ-001", 
    customer: "John Doe", 
    location: "Westlands, Nairobi", 
    balance: 2400, 
    liters: 1200, 
    status: "active",
    lastReading: "2024-01-20 14:30",
    dailyUsage: 45,
    valveStatus: "open" as const
  },
  { 
    id: "AQ-002", 
    customer: "Jane Smith", 
    location: "Karen, Nairobi", 
    balance: 150, 
    liters: 75, 
    status: "low_balance",
    lastReading: "2024-01-20 14:25",
    dailyUsage: 38,
    valveStatus: "open" as const
  },
  { 
    id: "AQ-003", 
    customer: "Mike Johnson", 
    location: "Kilimani, Nairobi", 
    balance: 0, 
    liters: 0, 
    status: "offline",
    lastReading: "2024-01-19 09:15",
    dailyUsage: 0,
    valveStatus: "closed" as const
  },
  { 
    id: "AQ-004", 
    customer: "Sarah Wilson", 
    location: "Lavington, Nairobi", 
    balance: 3200, 
    liters: 1600, 
    status: "active",
    lastReading: "2024-01-20 14:32",
    dailyUsage: 52,
    valveStatus: "open" as const
  },
  { 
    id: "AQ-005", 
    customer: "David Brown", 
    location: "Runda, Nairobi", 
    balance: 800, 
    liters: 400, 
    status: "leak_detected",
    lastReading: "2024-01-20 14:28",
    dailyUsage: 125,
    valveStatus: "closed" as const
  }
];

export const AdminMeters = () => {
  const [addMeterOpen, setAddMeterOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedMeter, setSelectedMeter] = useState<typeof meters[0] | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleMeterAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleViewDetails = (meter: typeof meters[0]) => {
    setSelectedMeter(meter);
    setDetailsOpen(true);
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-credit-light text-credit">Active</Badge>;
      case 'low_balance':
        return <Badge className="bg-warning-light text-warning">Low Balance</Badge>;
      case 'offline':
        return <Badge className="bg-danger-light text-danger">Offline</Badge>;
      case 'leak_detected':
        return <Badge className="bg-danger-light text-danger">Leak Detected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-credit" />;
      case 'low_balance':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'offline':
        return <XCircle className="h-4 w-4 text-danger" />;
      case 'leak_detected':
        return <AlertTriangle className="h-4 w-4 text-danger" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Water Meters</h1>
          <p className="text-muted-foreground">Monitor and manage all water meters</p>
        </div>
        <div className="flex gap-2">
          <Button variant="water-outline" size="sm">
            <MapPin className="h-4 w-4" />
            Map View
          </Button>
          <Button variant="water" size="sm" onClick={() => setAddMeterOpen(true)}>
            <Droplets className="h-4 w-4" />
            Add Meter
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search meters by ID, customer name, or location..." 
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

      {/* Meters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {meters.map((meter) => (
          <Card key={meter.id} className="hover:shadow-card transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">{meter.id}</CardTitle>
                {getStatusBadge(meter.status)}
              </div>
              <p className="text-muted-foreground">{meter.customer}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {meter.location}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Balance</p>
                  <p className="font-semibold text-water">{meter.liters}L</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Daily Usage</p>
                  <p className="font-semibold">{meter.dailyUsage}L</p>
                </div>
              </div>

              <div className="pt-3 border-t">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(meter.status)}
                    <span className="text-muted-foreground">Last Reading</span>
                  </div>
                  <span className="font-medium">{meter.lastReading}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleViewDetails(meter)}
                >
                  View Details
                </Button>
                <Button 
                  variant="water" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleViewDetails(meter)}
                >
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modals */}
      <AddMeterModal 
        open={addMeterOpen} 
        onOpenChange={setAddMeterOpen}
        onMeterAdded={handleMeterAdded}
      />
      
      <MeterDetailsModal 
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        meter={selectedMeter}
      />
    </div>
  );
};