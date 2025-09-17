import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Bell,
  X,
  ExternalLink,
  MoreVertical
} from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

export function AlertsPanel() {
  const isMobile = useIsMobile();
  
  const alerts = [
    {
      id: "ALT001",
      type: "critical",
      title: "Arsenic levels exceeded WHO limits",
      location: "Yamuna River - Delhi",
      time: "5 minutes ago",
      value: "0.012 mg/L",
      limit: "0.010 mg/L",
      team: "Team Alpha",
      description: "Immediate action required - Public health risk"
    },
    {
      id: "ALT002", 
      type: "warning",
      title: "Cadmium concentration rising",
      location: "Narmada - Bhopal",
      time: "15 minutes ago",
      value: "0.004 mg/L",
      limit: "0.003 mg/L",
      team: "Team Delta",
      description: "Trend analysis shows 15% increase over 6 hours"
    },
    {
      id: "ALT003",
      type: "info",
      title: "Sensor calibration required",
      location: "Sabarmati - Ahmedabad", 
      time: "1 hour ago",
      value: "N/A",
      limit: "N/A",
      team: "Team Gamma",
      description: "Routine maintenance - Last calibration 30 days ago"
    }
  ];

  const getAlertConfig = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          color: 'text-red-600 bg-red-50 border-red-200',
          bgColor: 'bg-red-50',
          icon: <AlertTriangle className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />,
          pulse: 'bg-red-500'
        };
      case 'warning':
        return {
          color: 'text-amber-600 bg-amber-50 border-amber-200',
          bgColor: 'bg-amber-50',
          icon: <AlertTriangle className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />,
          pulse: 'bg-amber-500'
        };
      case 'info':
        return {
          color: 'text-blue-600 bg-blue-50 border-blue-200',
          bgColor: 'bg-blue-50',
          icon: <Bell className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />,
          pulse: 'bg-blue-500'
        };
      default:
        return {
          color: 'text-slate-600 bg-slate-50 border-slate-200',
          bgColor: 'bg-slate-50',
          icon: <Bell className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />,
          pulse: 'bg-slate-500'
        };
    }
  };

  return (
    <Card className="border-slate-200">
      <CardHeader className={isMobile ? "pb-3" : ""}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <CardTitle className={`text-slate-800 flex items-center gap-2 ${isMobile ? "text-base" : ""}`}>
              <AlertTriangle className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} text-amber-600`} />
              {isMobile ? "Active Alerts" : "Active Alerts & Notifications"}
            </CardTitle>
            <p className={`${isMobile ? "text-xs" : "text-sm"} text-slate-600 mt-1`}>
              {isMobile ? "System alerts" : "Real-time system alerts and warnings"}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {!isMobile && (
              <>
                <Badge className="bg-red-50 text-red-700 border-red-200 text-xs">
                  1 Critical
                </Badge>
                <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                  1 Warning
                </Badge>
              </>
            )}
            <Button variant="outline" size="sm" className={isMobile ? "px-2" : ""}>
              {isMobile ? <MoreVertical className="w-4 h-4" /> : "View All"}
            </Button>
          </div>
        </div>
        
        {/* Mobile: Show summary badges below title */}
        {isMobile && (
          <div className="flex items-center gap-2 mt-2">
            <Badge className="bg-red-50 text-red-700 border-red-200 text-xs">
              1 Critical
            </Badge>
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
              1 Warning
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className={`space-y-${isMobile ? "2" : "3"}`}>
          {alerts.map((alert) => {
            const config = getAlertConfig(alert.type);
            
            return (
              <div
                key={alert.id}
                className={`border rounded-lg ${isMobile ? "p-3" : "p-4"} ${config.bgColor} border-opacity-50`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2 md:gap-3 flex-1 min-w-0">
                    <div className="relative mt-1 flex-shrink-0">
                      {config.icon}
                      {alert.type === 'critical' && (
                        <div className={`absolute -top-1 -right-1 w-2 h-2 ${config.pulse} rounded-full animate-pulse`}></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1">
                        <h4 className={`${isMobile ? "text-sm" : "text-base"} text-slate-900 flex-1`}>
                          {alert.title}
                        </h4>
                        <Badge className={`border ${config.color} text-xs flex-shrink-0`}>
                          {alert.type.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className={`${isMobile ? "space-y-1" : "flex items-center gap-4"} ${isMobile ? "text-xs" : "text-sm"} text-slate-600 mb-2`}>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{alert.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 flex-shrink-0" />
                          <span>{alert.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-slate-500">Team:</span> 
                          <span>{alert.team}</span>
                        </div>
                      </div>
                      
                      {alert.value !== "N/A" && (
                        <div className={`${isMobile ? "space-y-1" : "flex items-center gap-4"} ${isMobile ? "text-xs" : "text-sm"} mb-2`}>
                          <div>
                            <span className="text-slate-500">Current:</span> 
                            <span className="text-slate-900 ml-1">{alert.value}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Limit:</span> 
                            <span className="text-slate-900 ml-1">{alert.limit}</span>
                          </div>
                        </div>
                      )}
                      
                      <p className={`${isMobile ? "text-xs" : "text-sm"} text-slate-700`}>
                        {alert.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                    {!isMobile && (
                      <Button variant="ghost" size="sm" className="p-1">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="p-1">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className={`${isMobile ? "mt-3 pt-3" : "mt-4 pt-4"} border-t border-slate-200 ${isMobile ? "space-y-2" : "flex items-center justify-between"}`}>
          <div className={`${isMobile ? "text-xs" : "text-sm"} text-slate-600`}>
            Last update: <span className="text-slate-900">2 minutes ago</span>
          </div>
          <div className={`${isMobile ? "flex" : "flex items-center"} gap-2`}>
            <Button variant="outline" size="sm" className={isMobile ? "flex-1 text-xs" : ""}>
              {isMobile ? "Configure" : "Configure Alerts"}
            </Button>
            <Button size="sm" className={isMobile ? "flex-1 text-xs" : ""}>
              {isMobile ? "Export" : "Export Report"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}