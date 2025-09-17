import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  Droplets, 
  Shield, 
  BarChart3, 
  MapPin, 
  Users, 
  Clock,
  CheckCircle,
  ArrowRight,
  Download,
  Globe,
  Activity,
  Menu,
  X
} from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import { useState } from "react";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Activity className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />,
      title: "Real-time Monitoring",
      description: "Continuous water quality monitoring with live sensor data and instant alerts for pollution detection."
    },
    {
      icon: <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />,
      title: "Heavy Metal Analysis", 
      description: "Comprehensive analysis of lead, mercury, arsenic, cadmium and other heavy metals with WHO standard compliance."
    },
    {
      icon: <MapPin className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />,
      title: "GPS Location Tracking",
      description: "Precise location-based monitoring across major Indian rivers with GPS-enabled field team coordination."
    },
    {
      icon: <Shield className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />,
      title: "Government Compliance",
      description: "Built for Indian government agencies with security protocols and data sovereignty compliance."
    }
  ];

  const stats = [
    { value: "500+", label: "Monitoring Locations", icon: <MapPin className="w-4 h-4 md:w-5 md:h-5" /> },
    { value: "24/7", label: "Real-time Monitoring", icon: <Clock className="w-4 h-4 md:w-5 md:h-5" /> },
    { value: "15+", label: "Field Teams", icon: <Users className="w-4 h-4 md:w-5 md:h-5" /> },
    { value: "99.9%", label: "System Uptime", icon: <Activity className="w-4 h-4 md:w-5 md:h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Mobile-Optimized Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center">
                <Droplets className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl text-slate-800">Jal Drishti</h1>
                <p className="text-xs md:text-sm text-slate-600 hidden sm:block">Water Quality Monitoring System</p>
              </div>
            </div>
            
            {isMobile ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                  Ministry of Jal Shakti
                </Badge>
                <Button 
                  onClick={() => onNavigate('login')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Access Dashboard
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile Menu */}
          {isMobile && isMobileMenuOpen && (
            <div className="mt-4 pb-4 border-t border-blue-100">
              <div className="space-y-3">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 block w-fit">
                  Ministry of Jal Shakti
                </Badge>
                <Button 
                  onClick={() => onNavigate('login')}
                  className="bg-blue-600 hover:bg-blue-700 w-full"
                >
                  Access Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile-Optimized Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4 md:mb-6 text-xs md:text-sm">
            Government of India Initiative
          </Badge>
          <h2 className="text-3xl md:text-5xl text-slate-900 mb-4 md:mb-6 leading-tight">
            Advanced Water Pollution
            <br />
            <span className="text-blue-600">Monitoring System</span>
          </h2>
          <p className="text-base md:text-xl text-slate-600 mb-6 md:mb-8 leading-relaxed px-2">
            Real-time heavy metal detection and water quality analysis for Indian water bodies. 
            Empowering government agencies with scientific data for public health protection.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Button 
              size={isMobile ? "default" : "lg"}
              onClick={() => onNavigate('login')}
              className="bg-blue-600 hover:bg-blue-700 text-base md:text-lg px-6 md:px-8 py-3 md:py-6 w-full sm:w-auto"
            >
              Launch Dashboard
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
            </Button>
            <Button 
              size={isMobile ? "default" : "lg"}
              variant="outline" 
              className="text-base md:text-lg px-6 md:px-8 py-3 md:py-6 border-slate-300 w-full sm:w-auto"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile-Optimized Stats Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-slate-200 bg-white/60 backdrop-blur-sm">
              <CardContent className="pt-4 md:pt-6 pb-4 md:pb-6">
                <div className="flex justify-center mb-2 text-blue-600">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl text-slate-900 mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-slate-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Mobile-Optimized Features Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl text-slate-900 mb-3 md:mb-4">Comprehensive Water Quality Management</h3>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-2">
            Advanced monitoring capabilities designed specifically for Indian government agencies and water management authorities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-slate-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3 md:pb-4">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-blue-50 p-2 md:p-3 rounded-lg md:rounded-xl flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-slate-900 mb-2 text-base md:text-lg">{feature.title}</CardTitle>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">{feature.description}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Mobile-Optimized Key Benefits */}
      <section className="bg-white/80 backdrop-blur-sm border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl md:text-3xl text-slate-900 mb-4 md:mb-6">Built for Government Excellence</h3>
              <div className="space-y-3 md:space-y-4">
                {[
                  "WHO and BIS water quality standards compliance",
                  "Real-time alerts for pollution incidents", 
                  "Secure data handling with government protocols",
                  "Multi-location monitoring across India",
                  "Scientific accuracy with lab-grade sensors",
                  "Mobile-friendly field operation interface"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                    <span className="text-slate-700 text-sm md:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl p-6 md:p-8">
              <div className="text-center">
                <Globe className="w-12 h-12 md:w-16 md:h-16 text-blue-600 mx-auto mb-3 md:mb-4" />
                <h4 className="text-lg md:text-xl text-slate-900 mb-2">National Water Security</h4>
                <p className="text-slate-600 mb-4 md:mb-6 text-sm md:text-base">
                  Contributing to India's water security goals through advanced monitoring and early warning systems.
                </p>
                <Button 
                  onClick={() => onNavigate('login')}
                  className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-Optimized Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <Droplets className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h5 className="text-base md:text-lg">Jal Drishti</h5>
                  <p className="text-slate-400 text-sm">Water Quality Monitoring</p>
                </div>
              </div>
              <p className="text-slate-400 mb-4 max-w-md text-sm md:text-base">
                Government of India's advanced water pollution monitoring system for protecting public health and environmental safety.
              </p>
              <div className="text-xs md:text-sm text-slate-500">
                © 2024 Ministry of Jal Shakti, Government of India
              </div>
            </div>
            
            <div>
              <h6 className="text-slate-300 mb-3 md:mb-4 text-sm md:text-base">System</h6>
              <div className="space-y-2 text-xs md:text-sm">
                <div className="text-slate-400">Dashboard Access</div>
                <div className="text-slate-400">Documentation</div>
                <div className="text-slate-400">API Reference</div>
                <div className="text-slate-400">System Status</div>
              </div>
            </div>
            
            <div>
              <h6 className="text-slate-300 mb-3 md:mb-4 text-sm md:text-base">Support</h6>
              <div className="space-y-2 text-xs md:text-sm">
                <div className="text-slate-400">Technical Support</div>
                <div className="text-slate-400">Training Resources</div>
                <div className="text-slate-400">Help Center</div>
                <div className="text-slate-400">Contact</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}