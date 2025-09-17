import { Button } from "./ui/button";
import { Badge } from "./ui/badge"; 
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Bell, Settings, User, Wifi, WifiOff, Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useIsMobile } from "../hooks/use-mobile";

interface HeaderProps {
  isOnline: boolean;
  onNavigate?: (page: string) => void;
  onMenuClick?: () => void;
}

export function Header({ isOnline, onNavigate, onMenuClick }: HeaderProps) {
  const isMobile = useIsMobile();

  return (
    <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 md:py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onMenuClick}
              className="p-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
          
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-600 rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className="text-lg md:text-xl text-slate-800">Jal Drishti</h1>
              <p className="text-xs md:text-sm text-slate-600 hidden sm:block">Water Quality Monitoring System</p>
            </div>
          </div>
          
          {!isMobile && (
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
              Ministry of Jal Shakti
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1 md:gap-2">
            {isOnline ? (
              <Wifi className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
            ) : (
              <WifiOff className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
            )}
            <span className={`text-xs md:text-sm ${isOnline ? 'text-green-600' : 'text-red-600'} hidden sm:inline`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          
          <Button variant="ghost" size="sm" className="p-2">
            <Bell className="w-4 h-4" />
          </Button>
          
          {!isMobile && (
            <Button variant="ghost" size="sm" className="p-2">
              <Settings className="w-4 h-4" />
            </Button>
          )}
          
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <Avatar className="w-6 h-6 md:w-8 md:h-8">
              <AvatarFallback className="bg-blue-100 text-blue-700">
                <User className="w-3 h-3 md:w-4 md:h-4" />
              </AvatarFallback>
            </Avatar>
            {!isMobile && (
              <div className="text-sm">
                <div className="text-slate-800">Dr. Sharma</div>
                <div className="text-slate-500">CGWB Officer</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}