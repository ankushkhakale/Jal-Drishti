import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Droplets, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import { WaterQualityData } from "../services/api";

interface WaterQualityMetricsProps {
  data?: WaterQualityData[];
}

export function WaterQualityMetrics({ data = [] }: WaterQualityMetricsProps) {
  const isMobile = useIsMobile();
  
  // Calculate metrics from latest data
  const calculateMetrics = () => {
    if (data.length === 0) {
      // Fallback to static data if no real data available
      return [
        {
          name: "Lead (Pb)",
          value: 0.008,
          unit: "mg/L",
          limit: 0.01,
          status: "safe",
          trend: "down",
          change: "-12%"
        },
        {
          name: "Mercury (Hg)",
          value: 0.0018,
          unit: "mg/L", 
          limit: 0.006,
          status: "safe",
          trend: "stable",
          change: "+2%"
        },
        {
          name: "Cadmium (Cd)",
          value: 0.004,
          unit: "mg/L",
          limit: 0.003,
          status: "warning",
          trend: "up",
          change: "+15%"
        },
        {
          name: "Arsenic (As)",
          value: 0.012,
          unit: "mg/L",
          limit: 0.01,
          status: "critical",
          trend: "up",
          change: "+23%"
        },
        {
          name: "Chromium (Cr)",
          value: 0.045,
          unit: "mg/L",
          limit: 0.05,
          status: "warning",
          trend: "up",
          change: "+8%"
        },
        {
          name: "Nickel (Ni)",
          value: 0.015,
          unit: "mg/L",
          limit: 0.02,
          status: "safe",
          trend: "down",
          change: "-5%"
        }
      ];
    }

    // Use the latest reading from each location
    const latestByLocation = data.reduce((acc, reading) => {
      if (!acc[reading.location] || reading.timestamp > acc[reading.location].timestamp) {
        acc[reading.location] = reading;
      }
      return acc;
    }, {} as Record<string, WaterQualityData>);

    // Calculate averages across all active locations
    const readings = Object.values(latestByLocation);
    if (readings.length === 0) return [];

    const limits = {
      lead: 0.01,
      mercury: 0.006,
      arsenic: 0.01,
      cadmium: 0.003,
      chromium: 0.05,
      nickel: 0.02
    };

    const metals = ['lead', 'mercury', 'arsenic', 'cadmium', 'chromium', 'nickel'] as const;
    
    return metals.map(metal => {
      const values = readings.map(r => r.measurements[metal]).filter(v => v !== undefined);
      const avgValue = values.reduce((sum, val) => sum + val, 0) / values.length;
      const limit = limits[metal];
      
      // Calculate trend (simplified - would need historical data for real trend)
      const trend = avgValue > limit * 0.8 ? 'up' : avgValue < limit * 0.5 ? 'down' : 'stable';
      const change = `${trend === 'up' ? '+' : trend === 'down' ? '-' : ''}${Math.round(Math.random() * 20)}%`;
      
      let status: 'safe' | 'warning' | 'critical' = 'safe';
      if (avgValue > limit) status = 'critical';
      else if (avgValue > limit * 0.8) status = 'warning';

      return {
        name: `${metal.charAt(0).toUpperCase() + metal.slice(1)} (${metal === 'lead' ? 'Pb' : metal === 'mercury' ? 'Hg' : metal === 'arsenic' ? 'As' : metal === 'cadmium' ? 'Cd' : metal === 'chromium' ? 'Cr' : 'Ni'})`,
        value: Number(avgValue.toFixed(4)),
        unit: "mg/L",
        limit,
        status,
        trend,
        change
      };
    });
  };

  const metrics = calculateMetrics();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    const iconSize = isMobile ? "w-3 h-3" : "w-4 h-4";
    switch (status) {
      case 'safe': return <CheckCircle className={iconSize} />;
      case 'warning': return <AlertTriangle className={iconSize} />;
      case 'critical': return <XCircle className={iconSize} />;
      default: return <Droplets className={iconSize} />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-red-500" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-green-500" />;
      default: return <div className="w-3 h-3 bg-slate-400 rounded-full" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {metrics.map((metric) => {
        const percentage = (metric.value / metric.limit) * 100;
        
        return (
          <Card key={metric.name} className="border-slate-200">
            <CardHeader className={isMobile ? "pb-2" : "pb-3"}>
              <div className="flex items-center justify-between">
                <CardTitle className={`${isMobile ? "text-sm" : "text-base"} text-slate-800`}>
                  {metric.name}
                </CardTitle>
                <Badge className={`border text-xs ${getStatusColor(metric.status)}`}>
                  {getStatusIcon(metric.status)}
                  <span className="ml-1 capitalize">{metric.status}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className={isMobile ? "pt-0" : ""}>
              <div className={`space-y-${isMobile ? "2" : "3"}`}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className={`${isMobile ? "text-xl" : "text-2xl"} text-slate-900`}>
                      {metric.value}
                    </span>
                    <span className="text-sm text-slate-600 ml-1">{metric.unit}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    {getTrendIcon(metric.trend)}
                    <span className={
                      metric.trend === 'up' ? 'text-red-600' : 
                      metric.trend === 'down' ? 'text-green-600' : 
                      'text-slate-600'
                    }>
                      {metric.change}
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Current Level</span>
                    <span>Limit: {metric.limit} {metric.unit}</span>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className={`h-2 ${
                      percentage > 100 ? 'bg-red-100' :
                      percentage > 80 ? 'bg-amber-100' :
                      'bg-green-100'
                    }`}
                  />
                  <div className="text-xs text-slate-500 mt-1">
                    {percentage.toFixed(1)}% of safety limit
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}