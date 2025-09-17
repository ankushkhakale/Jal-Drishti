import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  MapPin, 
  Navigation, 
  Camera, 
  Satellite,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

export function LocationMonitoring() {
  const locations = [
    {
      id: "LOC001",
      name: "Yamuna River - Delhi",
      coordinates: "28.6139° N, 77.2090° E",
      status: "critical",
      lastSample: "15 min ago",
      team: "Team Alpha",
      pollutionIndex: 85,
      distance: "2.3 km"
    },
    {
      id: "LOC002", 
      name: "Ganges - Kanpur",
      coordinates: "26.4499° N, 80.3319° E",
      status: "warning",
      lastSample: "1 hour ago",
      team: "Team Beta",
      pollutionIndex: 67,
      distance: "45.7 km"
    },
    {
      id: "LOC003",
      name: "Sabarmati - Ahmedabad",
      coordinates: "23.0225° N, 72.5714° E", 
      status: "safe",
      lastSample: "30 min ago",
      team: "Team Gamma",
      pollutionIndex: 23,
      distance: "12.1 km"
    },
    {
      id: "LOC004",
      name: "Narmada - Bhopal",
      coordinates: "23.2599° N, 77.4126° E",
      status: "warning",
      lastSample: "2 hours ago",
      team: "Team Delta", 
      pollutionIndex: 58,
      distance: "78.5 km"
    }
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'critical':
        return {
          color: 'text-red-600 bg-red-50 border-red-200',
          icon: <AlertTriangle className="w-4 h-4" />,
          pulse: 'bg-red-500'
        };
      case 'warning':
        return {
          color: 'text-amber-600 bg-amber-50 border-amber-200',
          icon: <AlertTriangle className="w-4 h-4" />,
          pulse: 'bg-amber-500'
        };
      case 'safe':
        return {
          color: 'text-green-600 bg-green-50 border-green-200',
          icon: <CheckCircle className="w-4 h-4" />,
          pulse: 'bg-green-500'
        };
      default:
        return {
          color: 'text-slate-600 bg-slate-50 border-slate-200',
          icon: <MapPin className="w-4 h-4" />,
          pulse: 'bg-slate-500'
        };
    }
  };

  const getPollutionColor = (index: number) => {
    if (index >= 80) return 'bg-red-500';
    if (index >= 60) return 'bg-amber-500';
    if (index >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-800">Active Monitoring Locations</CardTitle>
            <p className="text-sm text-slate-600 mt-1">Real-time field monitoring status</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Satellite className="w-4 h-4 mr-1" />
              Satellite View
            </Button>
            <Button variant="outline" size="sm">
              <Navigation className="w-4 h-4 mr-1" />
              Navigate
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {locations.map((location) => {
            const statusConfig = getStatusConfig(location.status);
            
            return (
              <div
                key={location.id}
                className="border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="relative">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <div className={`absolute -top-1 -right-1 w-3 h-3 ${statusConfig.pulse} rounded-full animate-pulse`}></div>
                      </div>
                      <div>
                        <h4 className="text-slate-900">{location.name}</h4>
                        <p className="text-sm text-slate-600">{location.coordinates}</p>
                      </div>
                      <Badge className={`border ${statusConfig.color} ml-auto`}>
                        {statusConfig.icon}
                        <span className="ml-1 capitalize">{location.status}</span>
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Pollution Index</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getPollutionColor(location.pollutionIndex)}`}
                              style={{ width: `${location.pollutionIndex}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-slate-700">{location.pollutionIndex}</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Distance</p>
                        <p className="text-sm text-slate-700">{location.distance}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Field Team</p>
                        <p className="text-sm text-slate-700">{location.team}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Last Sample</p>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span className="text-sm text-slate-700">{location.lastSample}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-1" />
                      Sample
                    </Button>
                    <Button variant="outline" size="sm">
                      <Navigation className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Total Locations: <span className="text-slate-900">4 active</span> | 
            Teams Deployed: <span className="text-slate-900">4</span> |
            Last Sync: <span className="text-slate-900">1 min ago</span>
          </div>
          <Button size="sm">View All Locations</Button>
        </div>
      </CardContent>
    </Card>
  );
}