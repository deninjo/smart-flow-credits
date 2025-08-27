import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle, Info, Bell, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AlertItem {
  id: string;
  type: string;
  severity: string;
  title: string;
  message: string;
  acknowledged: boolean;
  created_at: string;
}

export const CustomerAlerts = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching alerts:', error);
      } else {
        setAlerts(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('alerts')
        .update({ acknowledged: true })
        .eq('id', alertId);

      if (error) {
        console.error('Error updating alert:', error);
      } else {
        setAlerts(alerts.map(alert => 
          alert.id === alertId ? { ...alert, acknowledged: true } : alert
        ));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'info':
        return <Info className="h-4 w-4 text-primary" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'secondary';
      case 'info':
        return 'default';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const unreadCount = alerts.filter(alert => !alert.acknowledged).length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Alerts</h1>
        </div>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-2">Loading alerts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Alerts</h1>
            <p className="text-muted-foreground">System notifications and important updates</p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Badge variant="destructive" className="animate-pulse">
            {unreadCount} unread
          </Badge>
        )}
      </div>

      {/* No alerts state */}
      {alerts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="h-12 w-12 text-credit mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-credit mb-2">Nothing to worry about!</h3>
            <p className="text-muted-foreground">
              All systems are running smoothly. You have no alerts at this time.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Alerts list */}
      {alerts.length > 0 && (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className={`${!alert.acknowledged ? 'border-l-4 border-l-primary' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getSeverityIcon(alert.severity)}
                    <div>
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatDate(alert.created_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                  {!alert.acknowledged && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsRead(alert.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{alert.message}</p>
                {alert.acknowledged && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-credit">
                    <CheckCircle className="h-3 w-3" />
                    Acknowledged
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};