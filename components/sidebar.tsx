import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
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
  Settings
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
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

  return (
    <aside className="bg-slate-50 border-r border-slate-200 w-64 h-full overflow-y-auto">
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              className={`w-full justify-start h-auto p-3 ${
                activeSection === item.id 
                  ? "bg-blue-600 text-white shadow-sm" 
                  : "text-slate-700 hover:bg-slate-100"
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <item.icon className="w-4 h-4 mr-3" />
              <span className="flex-1 text-left">{item.label}</span>
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
        </div>
      </nav>
      
      <div className="mt-8 p-4 border-t border-slate-200">
        <div className="bg-blue-50 rounded-lg p-3">
          <h4 className="text-sm font-medium text-blue-900 mb-1">System Status</h4>
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
      </div>
    </aside>
  );
}