import { useNavigate } from "react-router-dom";
import { WaterBalance } from "@/components/WaterBalance";
import { UsageChart } from "@/components/UsageChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Droplets, 
  AlertTriangle, 
  Clock, 
  Zap,
  TrendingUp,
  Activity,
  CreditCard
} from "lucide-react";

export const Dashboard = () => {
  const navigate = useNavigate();
  
  // Simulated data
  const currentBalance = 1250;
  const currentUnits = 5000;
  const lastMonthUsage = 1680;
  const trend = 'down' as const;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Monitor your water usage and balance</p>
        </div>
        <Button variant="water" size="lg" onClick={() => navigate('/purchase')}>
          <CreditCard className="h-4 w-4" />
          Purchase Water
        </Button>
      </div>

      {/* Balance Cards */}
      <WaterBalance
        currentBalance={currentBalance}
        currentUnits={currentUnits}
        lastMonthUsage={lastMonthUsage}
        trend={trend}
      />

      {/* Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <Alert className="border-warning bg-warning-light">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertDescription className="text-warning">
              <strong>Low Balance Alert:</strong> Your current balance is below KSh 1,500. 
              Consider topping up to avoid service interruption.
            </AlertDescription>
          </Alert>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-credit rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-credit">All systems operational</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Last updated: 2 minutes ago
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Charts */}
      <UsageChart />

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-water" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "2024-01-15", amount: "KSh 500", type: "Top-up", status: "Completed" },
                { date: "2024-01-10", amount: "KSh 1,000", type: "Top-up", status: "Completed" },
                { date: "2024-01-05", amount: "KSh 750", type: "Top-up", status: "Completed" },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{transaction.type}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-credit">{transaction.amount}</p>
                    <p className="text-xs text-credit">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-water" />
              Smart Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-credit-light rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-credit" />
                  <span className="font-medium text-credit">Usage Optimization</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  You've reduced your consumption by 8% this month. Great job!
                </p>
              </div>
              
              <div className="p-3 bg-water-light rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="h-4 w-4 text-water" />
                  <span className="font-medium text-water">Peak Usage</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your highest usage is typically between 6-8 PM on weekends.
                </p>
              </div>

              <div className="p-3 bg-warning-light rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="font-medium text-warning">Reminder</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on current usage, your balance will last approximately 12 days.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dummy Data Notice */}
      <div className="mt-8">
        <Alert className="border-warning-light bg-warning-light/10">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <AlertDescription className="text-sm text-muted-foreground">
            <strong>Note:</strong> This dashboard currently displays dummy data for demonstration purposes. 
            Real-time water consumption data will be available once IoT meter integration is implemented.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};