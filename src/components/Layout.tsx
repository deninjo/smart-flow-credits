import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, 
  LayoutDashboard, 
  CreditCard, 
  Bell, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface LayoutProps {
  userType?: 'customer' | 'admin';
  children: React.ReactNode;
}

export const Layout = ({ userType = 'customer', children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [alertCount, setAlertCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const customerNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: CreditCard, label: "Purchase Water", path: "/purchase" },
    { icon: Bell, label: "Alerts", path: "/alerts" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const adminNavItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/admin" },
    { icon: Droplets, label: "Meters", path: "/admin/meters" },
    { icon: CreditCard, label: "Transactions", path: "/admin/transactions" },
    { icon: Bell, label: "System Alerts", path: "/admin/alerts" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const navItems = userType === 'admin' ? adminNavItems : customerNavItems;

  const isActivePath = (path: string) => location.pathname === path;

  // Fetch alert count for customer portal
  useEffect(() => {
    if (userType === 'customer') {
      fetchAlertCount();
    }
  }, [userType]);

  const fetchAlertCount = async () => {
    try {
      const { count, error } = await supabase
        .from('alerts')
        .select('*', { count: 'exact', head: true })
        .eq('acknowledged', false);

      if (error) {
        console.error('Error fetching alert count:', error);
      } else {
        setAlertCount(count || 0);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Error",
          description: "Failed to log out. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Logged out",
          description: "You have been successfully logged out.",
          variant: "default"
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-card">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-water rounded-lg flex items-center justify-center">
                <Droplets className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-water bg-clip-text text-transparent">
                AquaSmart
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {userType === 'admin' ? 'Admin Portal' : 
                (location.pathname === '/dashboard' && !user) ? 'Demo Customer Portal' :
                user ? `Welcome, ${user.email?.split('@')[0] || 'Customer'}` : 'Customer Portal'
              }
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(userType === 'admin' ? '/admin/alerts' : '/alerts')}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              {userType === 'customer' && alertCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0 animate-pulse"
                >
                  {alertCount > 9 ? '9+' : alertCount}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <nav className="p-4 pt-8">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${isActivePath(item.path) 
                        ? 'bg-water-light text-water border border-water/20' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};