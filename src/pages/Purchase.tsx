import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  CreditCard, 
  Smartphone, 
  Droplets, 
  Calculator,
  CheckCircle,
  Clock,
  Construction,
  Wrench
} from "lucide-react";

export const Purchase = () => {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<"mpesa" | "card" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConstructionModal, setShowConstructionModal] = useState(false);
  
  const waterRate = 0.25; // KSh per liter
  const litersFromAmount = amount ? Math.floor(Number(amount) / waterRate) : 0;

  const quickAmounts = [100, 250, 500, 1000, 2000];

  const handlePurchase = async () => {
    if (!amount || !selectedMethod) return;
    
    // Show construction modal
    setShowConstructionModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Purchase Water</h1>
        <p className="text-muted-foreground">Top up your water balance instantly</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Purchase Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-water" />
              Water Purchase
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (KSh)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* Quick Amount Buttons */}
            <div className="space-y-2">
              <Label>Quick amounts</Label>
              <div className="flex flex-wrap gap-2">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="hover:bg-water-light hover:border-water"
                  >
                    KSh {quickAmount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Calculation Display */}
            {amount && (
              <Alert className="border-water bg-water-light">
                <Calculator className="h-4 w-4 text-water" />
                <AlertDescription className="text-water">
                  <strong>KSh {amount}</strong> will give you{" "}
                  <strong>{litersFromAmount.toLocaleString()} liters</strong> of water
                  <br />
                  <span className="text-sm">Rate: KSh {waterRate} per liter</span>
                </AlertDescription>
              </Alert>
            )}

            {/* Payment Method Selection */}
            <div className="space-y-3">
              <Label>Payment Method</Label>
              <div className="grid grid-cols-1 gap-3">
                <Button
                  variant={selectedMethod === "mpesa" ? "water" : "outline"}
                  className="h-auto p-4 justify-start"
                  onClick={() => setSelectedMethod("mpesa")}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-6 w-6" />
                    <div className="text-left">
                      <div className="font-medium">M-Pesa</div>
                      <div className="text-sm opacity-80">Pay with mobile money</div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant={selectedMethod === "card" ? "water" : "outline"}
                  className="h-auto p-4 justify-start"
                  onClick={() => setSelectedMethod("card")}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-6 w-6" />
                    <div className="text-left">
                      <div className="font-medium">Card Payment</div>
                      <div className="text-sm opacity-80">Pay with debit/credit card</div>
                    </div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Purchase Button */}
            <Button
              variant="water"
              size="lg"
              className="w-full"
              onClick={handlePurchase}
              disabled={!amount || !selectedMethod || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Droplets className="h-4 w-4 mr-2" />
                  Purchase Water - KSh {amount || 0}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Account Info & Recent Purchases */}
        <div className="space-y-6">
          {/* Current Balance */}
          <Card className="bg-gradient-water text-white border-0">
            <CardHeader>
              <CardTitle className="text-white">Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">KSh 1,250</div>
              <p className="text-white/80">5,000 liters remaining</p>
              <Badge className="mt-2 bg-white/20 text-white hover:bg-white/30">
                Meter ID: AQ-2024-001
              </Badge>
            </CardContent>
          </Card>

          {/* Recent Purchases */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Purchases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { 
                    date: "Jan 15, 2024", 
                    amount: "KSh 500", 
                    liters: "2,000L", 
                    status: "completed",
                    method: "M-Pesa"
                  },
                  { 
                    date: "Jan 10, 2024", 
                    amount: "KSh 1,000", 
                    liters: "4,000L", 
                    status: "completed",
                    method: "Card"
                  },
                  { 
                    date: "Jan 5, 2024", 
                    amount: "KSh 750", 
                    liters: "3,000L", 
                    status: "completed",
                    method: "M-Pesa"
                  },
                ].map((purchase, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-credit" />
                      <div>
                        <p className="font-medium">{purchase.amount}</p>
                        <p className="text-sm text-muted-foreground">
                          {purchase.date} • {purchase.method}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{purchase.liters}</p>
                      <Badge 
                        variant="secondary" 
                        className="text-xs bg-credit-light text-credit"
                      >
                        Completed
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Construction Modal */}
      <Dialog open={showConstructionModal} onOpenChange={setShowConstructionModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-center justify-center">
              <div className="h-12 w-12 bg-warning-light rounded-full flex items-center justify-center">
                <Construction className="h-6 w-6 text-warning animate-bounce" />
              </div>
              <span className="text-xl">Payment Integration</span>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6 space-y-4">
            <div className="flex justify-center gap-4 mb-4">
              <Wrench className="h-8 w-8 text-muted-foreground animate-pulse" />
              <Construction className="h-8 w-8 text-warning animate-bounce" />
              <Wrench className="h-8 w-8 text-muted-foreground animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Under Construction</h3>
            <p className="text-muted-foreground">
              Payment integration is currently being implemented. This feature will be available soon with M-Pesa and card payment options.
            </p>
            <Button 
              onClick={() => setShowConstructionModal(false)}
              variant="water"
              className="mt-4"
            >
              Got it, thanks!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};