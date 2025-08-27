import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AddMeterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMeterAdded: () => void;
}

export const AddMeterModal = ({ open, onOpenChange, onMeterAdded }: AddMeterModalProps) => {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    latitude: "",
    longitude: "",
    serial: "",
    lowBalanceThreshold: "10"
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create a new user profile first (simplified)
      const meterId = crypto.randomUUID();
      const userId = crypto.randomUUID(); // In real scenario, this would be from auth

      // Insert profile
      await supabase.from('profiles').insert({
        id: userId,
        first_name: formData.customerName.split(' ')[0] || formData.customerName,
        last_name: formData.customerName.split(' ').slice(1).join(' ') || '',
        phone: formData.phone
      });

      // Insert meter
      await supabase.from('meters').insert({
        id: meterId,
        user_id: userId,
        serial: formData.serial || `MTR${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        address: formData.address,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        low_balance_threshold_units: parseFloat(formData.lowBalanceThreshold),
        status: 'active'
      });

      // Create initial balance
      await supabase.from('meter_balances').insert({
        meter_id: meterId,
        units_remaining: 0
      });

      toast.success("Meter added successfully!");
      onMeterAdded();
      onOpenChange(false);
      setFormData({
        customerName: "",
        phone: "",
        address: "",
        latitude: "",
        longitude: "",
        serial: "",
        lowBalanceThreshold: "10"
      });
    } catch (error) {
      console.error('Error adding meter:', error);
      toast.error("Failed to add meter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Water Meter</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+254..."
            />
          </div>

          <div>
            <Label htmlFor="serial">Meter Serial (Optional)</Label>
            <Input
              id="serial"
              value={formData.serial}
              onChange={(e) => setFormData(prev => ({ ...prev, serial: e.target.value }))}
              placeholder="Auto-generated if empty"
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData(prev => ({ ...prev, latitude: e.target.value }))}
                placeholder="-1.2921"
              />
            </div>
            <div>
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData(prev => ({ ...prev, longitude: e.target.value }))}
                placeholder="36.8219"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="threshold">Low Balance Threshold (Units)</Label>
            <Input
              id="threshold"
              type="number"
              value={formData.lowBalanceThreshold}
              onChange={(e) => setFormData(prev => ({ ...prev, lowBalanceThreshold: e.target.value }))}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="water" disabled={loading} className="flex-1">
              {loading ? "Adding..." : "Add Meter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};