import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent } from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import { 
  BarChart3, 
  MapPin, 
  Camera, 
  FileText, 
  AlertTriangle, 
  Activity,
  Database,
  Users,
  ChevronRight,
  Settings,
  X,
  User,
  LogOut
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface MobileSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: string) => void;
}

export function MobileSidebar({ activeSection, onSectionChange, isOpen, onClose, onNavigate }: MobileSidebarProps) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      badge: null
    },
    {
      id: 'monitoring',
      label: 'Real-time Monitoring',
      icon: Activity,
      badge: 'Live'
    },
    {
      id: 'locations',
      label: 'Location Tracking',
      icon: MapPin,
      badge: '23 Active'
    },
    {
      id: 'sampling',
      label: 'Sample Collection',
      icon: Camera,
      badge: null
    },
    {
      id: 'analysis',
      label: 'Heavy Metal Analysis',
      icon: Database,
      badge: null
    },
    {
      id: 'alerts',
      label: 'Alerts & Warnings',
      icon: AlertTriangle,
      badge: '3'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      badge: null
    },
    {
      id: 'teams',
      label: 'Field Teams',
      icon: Users,
      badge: null
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  const handleSectionChange = (sectionId: string) => {
    onSectionChange(sectionId);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0 bg-slate-50">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg text-slate-800">Jal Drishti</h2>
                  <p className="text-xs text-slate-600">Water Monitoring</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-blue-100 text-blue-700">
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-sm text-slate-900">Dr. Sharma</div>
                <div className="text-xs text-slate-600">CGWB Officer</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className={`w-full justify-start h-auto p-3 text-left ${
                    activeSection === item.id 
                      ? "bg-blue-600 text-white shadow-sm" 
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                  onClick={() => handleSectionChange(item.id)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className={`ml-2 text-xs ${
                        activeSection === item.id
                          ? "bg-blue-500 text-white"
                          : item.badge === 'Live' 
                            ? "bg-green-100 text-green-700"
                            : item.id === 'alerts'
                              ? "bg-red-100 text-red-700"
                              : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                  {activeSection === item.id && (
                    <ChevronRight className="w-4 h-4 ml-1" />
                  )}
                </Button>
              ))}
            </nav>
          </ScrollArea>

          {/* System Status */}
          <div className="p-4 border-t border-slate-200">
            <div className="bg-blue-50 rounded-lg p-3 mb-4">
              <h4 className="text-sm text-blue-900 mb-2">System Status</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-blue-700">Data Sync</span>
                  <span className="text-green-600">✓ Active</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-blue-700">Sensors</span>
                  <span className="text-green-600">✓ 23/25</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-blue-700">Last Update</span>
                  <span className="text-blue-600">2 min ago</span>
                </div>
              </div>
            </div>

            {/* Government Badge */}
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 w-full justify-center mb-3">
              Ministry of Jal Shakti
            </Badge>

            {/* Logout Button */}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-slate-600 hover:text-slate-900"
              onClick={() => {
                onClose();
                onNavigate?.('landing');
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}