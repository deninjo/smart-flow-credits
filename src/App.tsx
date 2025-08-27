import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { Purchase } from "./pages/Purchase";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminMeters } from "./pages/AdminMeters";
import { AdminTransactions } from "./pages/AdminTransactions";
import { AdminAlerts } from "./pages/AdminAlerts";
import { AdminSettings } from "./pages/AdminSettings";
import { CustomerAlerts } from "./pages/CustomerAlerts";
import { CustomerSettings } from "./pages/CustomerSettings";
import { Layout } from "./components/Layout";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Customer Routes */}
            <Route path="/dashboard" element={<Layout userType="customer"><Dashboard /></Layout>} />
            <Route path="/purchase" element={<Layout userType="customer"><Purchase /></Layout>} />
            <Route path="/alerts" element={<Layout userType="customer"><CustomerAlerts /></Layout>} />
            <Route path="/settings" element={<Layout userType="customer"><CustomerSettings /></Layout>} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Layout userType="admin"><AdminDashboard /></Layout>} />
            <Route path="/admin/meters" element={<Layout userType="admin"><AdminMeters /></Layout>} />
            <Route path="/admin/transactions" element={<Layout userType="admin"><AdminTransactions /></Layout>} />
            <Route path="/admin/alerts" element={<Layout userType="admin"><AdminAlerts /></Layout>} />
            <Route path="/admin/settings" element={<Layout userType="admin"><AdminSettings /></Layout>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
