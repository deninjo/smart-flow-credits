import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Filter,
  Download,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

// Simulated transaction data
const transactions = [
  {
    id: "TXN-001",
    customer: "John Doe",
    meterId: "AQ-001",
    amount: 500,
    liters: 250,
    method: "M-Pesa",
    status: "completed",
    timestamp: "2024-01-20 14:30:00"
  },
  {
    id: "TXN-002",
    customer: "Jane Smith",
    meterId: "AQ-002",
    amount: 1000,
    liters: 500,
    method: "Airtel Money",
    status: "pending",
    timestamp: "2024-01-20 13:45:00"
  },
  {
    id: "TXN-003",
    customer: "Mike Johnson",
    meterId: "AQ-003",
    amount: 750,
    liters: 375,
    method: "M-Pesa",
    status: "failed",
    timestamp: "2024-01-20 12:15:00"
  },
  {
    id: "TXN-004",
    customer: "Sarah Wilson",
    meterId: "AQ-004",
    amount: 2000,
    liters: 1000,
    method: "M-Pesa",
    status: "completed",
    timestamp: "2024-01-20 11:30:00"
  },
  {
    id: "TXN-005",
    customer: "David Brown",
    meterId: "AQ-005",
    amount: 300,
    liters: 150,
    method: "T-Kash",
    status: "completed",
    timestamp: "2024-01-20 10:45:00"
  }
];

export const AdminTransactions = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-credit-light text-credit">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-warning-light text-warning">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-danger-light text-danger">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-credit" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-danger" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">Monitor all water purchase transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="water" size="sm">
            <CreditCard className="h-4 w-4" />
            Manual Top-up
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-credit-light rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-credit" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today's Revenue</p>
                <p className="text-xl font-bold text-credit">KSh 45,250</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-water-light rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-water" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
                <p className="text-xl font-bold">1,248</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-warning-light rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-xl font-bold text-warning">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-danger-light rounded-lg flex items-center justify-center">
                <XCircle className="h-5 w-5 text-danger" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Failed Today</p>
                <p className="text-xl font-bold text-danger">3</p>
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
                  placeholder="Search by transaction ID, customer name, or meter ID..." 
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

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted rounded-lg gap-4"
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(transaction.status)}
                  <div>
                    <p className="font-medium">{transaction.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.customer} • {transaction.meterId}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.timestamp}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-water">KSh {transaction.amount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{transaction.liters}L • {transaction.method}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusBadge(transaction.status)}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};