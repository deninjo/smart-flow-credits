import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, TrendingUp, TrendingDown } from "lucide-react";

interface WaterBalanceProps {
  currentBalance: number;
  currentUnits: number;
  lastMonthUsage: number;
  trend: 'up' | 'down';
}

export const WaterBalance = ({ 
  currentBalance, 
  currentUnits, 
  lastMonthUsage, 
  trend 
}: WaterBalanceProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="bg-gradient-water text-white border-0 shadow-water">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-white/90">
            <Droplets className="h-5 w-5" />
            Current Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">KSh {currentBalance.toLocaleString()}</div>
          <p className="text-white/80 text-sm mt-1">
            {currentUnits.toLocaleString()} liters remaining
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-credit text-white border-0 shadow-credit">
        <CardHeader className="pb-2">
          <CardTitle className="text-white/90">Last Month Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{lastMonthUsage.toLocaleString()}L</div>
          <div className="flex items-center gap-1 mt-1 text-white/80">
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="text-sm">
              {trend === 'up' ? '+12% from last month' : '-8% from last month'}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-warning-secondary bg-warning-light">
        <CardHeader className="pb-2">
          <CardTitle className="text-warning">Usage Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">
            {currentBalance < 500 ? 'Low Balance' : 'Normal'}
          </div>
          <p className="text-warning/80 text-sm mt-1">
            {currentBalance < 500 
              ? 'Consider topping up soon' 
              : 'You have sufficient credit'
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
};