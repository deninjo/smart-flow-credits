import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Settings,
  Bell,
  DollarSign,
  Shield,
  Database,
  Smartphone,
  Save
} from "lucide-react";

export const AdminSettings = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground">Configure system parameters and preferences</p>
        </div>
        <Button variant="water">
          <Save className="h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      {/* Pricing Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-water" />
            Pricing Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="water-rate">Water Rate (KSh per Liter)</Label>
              <Input 
                id="water-rate" 
                type="number" 
                step="0.01" 
                defaultValue="2.00" 
                placeholder="2.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minimum-balance">Minimum Balance Alert (KSh)</Label>
              <Input 
                id="minimum-balance" 
                type="number" 
                defaultValue="500" 
                placeholder="500"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="connection-fee">New Connection Fee (KSh)</Label>
            <Input 
              id="connection-fee" 
              type="number" 
              defaultValue="2500" 
              placeholder="2500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Alert Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-water" />
            Alert Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Low Balance Alerts</p>
              <p className="text-sm text-muted-foreground">Send SMS when balance is low</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Leak Detection</p>
              <p className="text-sm text-muted-foreground">Monitor for unusual consumption patterns</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Offline Meter Alerts</p>
              <p className="text-sm text-muted-foreground">Alert when meters go offline</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="leak-threshold">Leak Detection Threshold (L/hour)</Label>
              <Input 
                id="leak-threshold" 
                type="number" 
                step="0.1" 
                defaultValue="0.5" 
                placeholder="0.5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="offline-timeout">Offline Timeout (hours)</Label>
              <Input 
                id="offline-timeout" 
                type="number" 
                defaultValue="24" 
                placeholder="24"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Money Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-water" />
            Mobile Money Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">M-Pesa Integration</p>
              <p className="text-sm text-muted-foreground">Enable Safaricom M-Pesa payments</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Airtel Money</p>
              <p className="text-sm text-muted-foreground">Enable Airtel Money payments</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="business-number">Business Number (Paybill/Till)</Label>
            <Input 
              id="business-number" 
              defaultValue="247247" 
              placeholder="247247"
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-water" />
            Security & Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
            </div>
            <Switch />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">API Rate Limiting</p>
              <p className="text-sm text-muted-foreground">Limit IoT device API calls</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input 
                id="session-timeout" 
                type="number" 
                defaultValue="60" 
                placeholder="60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-rate-limit">API Rate Limit (requests/minute)</Label>
              <Input 
                id="api-rate-limit" 
                type="number" 
                defaultValue="100" 
                placeholder="100"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-water" />
            System Maintenance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4">
              <div className="text-center">
                <Database className="h-6 w-6 mx-auto mb-2" />
                <p className="font-medium">Backup Database</p>
                <p className="text-sm text-muted-foreground">Create system backup</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4">
              <div className="text-center">
                <Settings className="h-6 w-6 mx-auto mb-2" />
                <p className="font-medium">System Diagnostics</p>
                <p className="text-sm text-muted-foreground">Run health checks</p>
              </div>
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-danger">Danger Zone</p>
                <p className="text-sm text-muted-foreground">Irreversible actions</p>
              </div>
              <Button variant="outline" className="border-danger text-danger hover:bg-danger hover:text-white">
                Reset System
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};