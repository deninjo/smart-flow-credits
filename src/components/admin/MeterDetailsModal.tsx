import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Droplets, Clock, AlertTriangle, CheckCircle, XCircle, Activity } from "lucide-react";

interface Meter {
  id: string;
  customer: string;
  location: string;
  balance: number;
  liters: number;
  status: string;
  lastReading: string;
  dailyUsage: number;
}

interface MeterDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  meter: Meter | null;
}

export const MeterDetailsModal = ({ open, onOpenChange, meter }: MeterDetailsModalProps) => {
  if (!meter) return null;

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Meter Details - {meter.id}
            {getStatusBadge(meter.status)}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Customer Information */}
          <div>
            <h3 className="font-semibold mb-3">Customer Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{meter.customer}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-muted-foreground">Location:</span>
                <div className="flex items-center gap-1 text-right">
                  <MapPin className="h-3 w-3" />
                  <span className="font-medium">{meter.location}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Meter Status */}
          <div>
            <h3 className="font-semibold mb-3">Current Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(meter.status)}
                  <span className="text-muted-foreground">Status:</span>
                </div>
                <span className="font-medium capitalize">{meter.status.replace('_', ' ')}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-water-light rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Droplets className="h-4 w-4 text-water" />
                    <span className="text-sm text-muted-foreground">Balance</span>
                  </div>
                  <span className="text-lg font-bold text-water">{meter.liters}L</span>
                </div>
                
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Activity className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">Daily Usage</span>
                  </div>
                  <span className="text-lg font-bold">{meter.dailyUsage}L</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Recent Activity */}
          <div>
            <h3 className="font-semibold mb-3">Recent Activity</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Last Reading:</span>
              </div>
              <span className="font-medium">{meter.lastReading}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button variant="water" className="flex-1">
              Edit Meter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};