import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  Droplets, 
  User, 
  Lock, 
  Eye, 
  EyeOff,
  Shield,
  Building,
  AlertCircle,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  isLoading?: boolean;
}

export function LoginPage({ onNavigate, onLogin, isLoading = false }: LoginPageProps) {
  const isMobile = useIsMobile();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setLoginError(null);
    
    try {
      const result = await onLogin(credentials.username, credentials.password);
      if (!result.success) {
        setLoginError(result.error || 'Login failed');
      }
    } catch (error) {
      setLoginError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickLoginOptions = [
    {
      role: "CGWB Officer",
      username: "dr.sharma@cgwb.gov.in",
      department: "Central Ground Water Board"
    },
    {
      role: "Field Scientist",
      username: "scientist@jalshakti.gov.in", 
      department: "Ministry of Jal Shakti"
    },
    {
      role: "Health Official",
      username: "health.officer@gov.in",
      department: "Public Health Department"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
        
        {/* Left Side - Branding & Info */}
        <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
          <div className="text-center lg:text-left">
            <div className="flex items-center gap-3 justify-center lg:justify-start mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl flex items-center justify-center">
                <Droplets className="w-7 h-7 md:w-9 md:h-9 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl text-slate-800">Jal Drishti</h1>
                <p className="text-slate-600 text-sm md:text-base">Water Quality Monitoring System</p>
              </div>
            </div>
            
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-3 md:mb-4 text-xs md:text-sm">
              Government of India
            </Badge>
            
            <h2 className="text-3xl md:text-4xl text-slate-900 mb-3 md:mb-4 leading-tight">
              Secure Access to
              <br />
              <span className="text-blue-600">Water Monitoring Dashboard</span>
            </h2>
            
            <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-8">
              Advanced water pollution monitoring for government agencies. 
              Access real-time data, analysis, and reporting tools.
            </p>
          </div>

          {/* Quick Access Options - Hidden on mobile to save space */}
          {!isMobile && (
            <div className="space-y-4">
              <h3 className="text-slate-800 mb-3">Quick Access for Government Users</h3>
              {quickLoginOptions.map((option, index) => (
                <Card 
                  key={index} 
                  className="border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setCredentials({ username: option.username, password: "demo123" });
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Building className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-slate-900">{option.role}</h4>
                        <p className="text-sm text-slate-600">{option.department}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto order-1 lg:order-2">
          <Card className="border-slate-200 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="text-center pb-4 md:pb-6">
              <CardTitle className="text-xl md:text-2xl text-slate-800 flex items-center justify-center gap-2">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                Secure Login
              </CardTitle>
              <p className="text-slate-600 mt-2 text-sm md:text-base">Enter your government credentials to access the dashboard</p>
            </CardHeader>
            
            <CardContent className="space-y-4 md:space-y-6">
              <Alert className="border-blue-200 bg-blue-50">
                <AlertCircle className="w-4 h-4 text-blue-600" />
                <AlertDescription className="text-blue-800 text-sm">
                  For demo purposes, {isMobile ? 'use preset credentials below' : 'click any role on the left to auto-fill credentials'}
                </AlertDescription>
              </Alert>

              {loginError && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <AlertDescription className="text-red-800 text-sm">
                    {loginError}
                  </AlertDescription>
                </Alert>
              )}

              {/* Mobile-only Quick Access */}
              {isMobile && (
                <div className="space-y-2">
                  <Label className="text-sm">Quick Demo Access:</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {quickLoginOptions.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="justify-start text-left h-auto p-3"
                        onClick={() => {
                          setCredentials({ username: option.username, password: "demo123" });
                        }}
                        disabled={isSubmitting}
                      >
                        <Building className="w-4 h-4 mr-2 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="text-sm font-medium">{option.role}</div>
                          <div className="text-xs text-slate-600 truncate">{option.department}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-sm md:text-base">Government Email / Username</Label>
                  <div className="relative">
                    <Input
                      id="username"
                      type="text"
                      placeholder="your.name@gov.in"
                      value={credentials.username}
                      onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                      className="pl-10 text-sm md:text-base"
                      required
                      disabled={isSubmitting}
                    />
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="password" className="text-sm md:text-base">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                      className="pl-10 pr-10 text-sm md:text-base"
                      required
                      disabled={isSubmitting}
                    />
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-6 w-6 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-base md:text-lg py-4 md:py-6"
                  disabled={isSubmitting || isLoading}
                >
                  {(isSubmitting || isLoading) ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    "Access Dashboard"
                  )}
                </Button>
              </form>
              
              <div className="text-center space-y-2">
                <p className="text-xs md:text-sm text-slate-600">
                  Forgot password? Contact your IT administrator
                </p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onNavigate('landing')}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-4 md:mt-6 text-center text-xs md:text-sm text-slate-500">
            <p>Secured by Government of India protocols</p>
            <p>© 2024 Ministry of Jal Shakti</p>
          </div>
        </div>
      </div>
    </div>
  );
}