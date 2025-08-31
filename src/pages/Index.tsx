import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, 
  Smartphone, 
  BarChart3, 
  Shield, 
  Zap, 
  CheckCircle,
  ArrowRight,
  Users,
  TrendingUp
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Mobile Money Integration",
      description: "Seamless M-Pesa and card payments for instant water credit top-ups"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Monitor water usage patterns and get intelligent consumption insights"
    },
    {
      icon: Shield,
      title: "Leak Detection",
      description: "AI-powered alerts for potential leaks and unusual water flow patterns"
    },
    {
      icon: Zap,
      title: "IoT Integration",
      description: "Smart meters with automated valve control and real-time data streaming"
    }
  ];

  const stats = [
    { label: "Active Customers", value: "1,200+", icon: Users },
    { label: "Liters Managed", value: "2.8M+", icon: Droplets },
    { label: "System Uptime", value: "99.8%", icon: TrendingUp },
    { label: "Smart Meters", value: "1,180", icon: Zap }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Droplets className="h-9 w-9 text-white" />
              </div>
              <span className="text-5xl font-bold">AquaSmart</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Smart Water Management
              <br />
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                for the Future
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              IoT-powered prepaid water metering with mobile money integration, 
              real-time monitoring, and intelligent leak detection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="water" size="lg" className="bg-white text-water hover:bg-white/90">
                <Link to="/auth">
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="water-outline" size="lg" className="border-white text-white hover:bg-white hover:text-water">
                <Link to="/admin">
                  Admin Portal Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-water/20 hover:shadow-water transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 bg-water-light rounded-xl flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-water" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-water mb-2">{stat.value}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-water-light text-water">Features</Badge>
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Everything you need for smart water management
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From automated payments to leak detection, AquaSmart provides a complete 
              solution for modern water utility management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-card transition-all duration-300 border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-gradient-water rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-water text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to modernize your water management?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join hundreds of customers already using AquaSmart for efficient, 
            transparent, and smart water management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-water hover:bg-white/90">
              <Link to="/auth">
                <CheckCircle className="h-4 w-4 mr-2" />
                Start Your Journey
              </Link>
            </Button>
            <Button asChild variant="water-outline" size="lg" className="border-white text-white hover:bg-white hover:text-water">
              <Link to="/dashboard">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Demo Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
