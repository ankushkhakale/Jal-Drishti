import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import { WaterQualityData } from "../services/api";

interface MonitoringChartProps {
  data?: WaterQualityData[];
}

export function MonitoringChart({ data = [] }: MonitoringChartProps) {
  const isMobile = useIsMobile();
  
  // Process data for chart
  const processChartData = () => {
    if (data.length === 0) {
      // Fallback static data
      return [
        { time: '00:00', lead: 0.005, mercury: 0.001, arsenic: 0.008, ph: 7.2 },
        { time: '04:00', lead: 0.006, mercury: 0.0012, arsenic: 0.009, ph: 7.1 },
        { time: '08:00', lead: 0.007, mercury: 0.0015, arsenic: 0.010, ph: 7.0 },
        { time: '12:00', lead: 0.008, mercury: 0.0018, arsenic: 0.012, ph: 6.9 },
        { time: '16:00', lead: 0.009, mercury: 0.0020, arsenic: 0.011, ph: 7.0 },
        { time: '20:00', lead: 0.008, mercury: 0.0018, arsenic: 0.010, ph: 7.1 },
        { time: '24:00', lead: 0.007, mercury: 0.0016, arsenic: 0.009, ph: 7.2 }
      ];
    }

    // Sort data by timestamp and take last 24 hours
    const sortedData = [...data].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    const last24Hours = sortedData.slice(-24);

    return last24Hours.map(reading => ({
      time: new Date(reading.timestamp).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      lead: Number(reading.measurements.lead.toFixed(4)),
      mercury: Number(reading.measurements.mercury.toFixed(4)),
      arsenic: Number(reading.measurements.arsenic.toFixed(4)),
      ph: Number(reading.measurements.ph.toFixed(1)),
      timestamp: reading.timestamp,
      location: reading.location
    }));
  };

  const chartData = processChartData();
  
  // Calculate current values and trends
  const getCurrentMetrics = () => {
    if (chartData.length === 0) {
      return {
        lead: { value: 0.008, status: 'safe' },
        mercury: { value: 0.0018, status: 'safe' },
        arsenic: { value: 0.012, status: 'warning' },
        trend: '+8.5%'
      };
    }

    const latest = chartData[chartData.length - 1];
    const previous = chartData.length > 1 ? chartData[chartData.length - 2] : latest;
    
    const leadChange = ((latest.lead - previous.lead) / previous.lead) * 100;
    const trendPercentage = leadChange.toFixed(1);
    
    return {
      lead: { 
        value: latest.lead, 
        status: latest.lead > 0.01 ? 'critical' : latest.lead > 0.008 ? 'warning' : 'safe' 
      },
      mercury: { 
        value: latest.mercury, 
        status: latest.mercury > 0.006 ? 'critical' : latest.mercury > 0.005 ? 'warning' : 'safe' 
      },
      arsenic: { 
        value: latest.arsenic, 
        status: latest.arsenic > 0.01 ? 'critical' : latest.arsenic > 0.008 ? 'warning' : 'safe' 
      },
      trend: `${leadChange >= 0 ? '+' : ''}${trendPercentage}%`
    };
  };

  const metrics = getCurrentMetrics();
  const isLive = data.length > 0;

  return (
    <Card className="border-slate-200">
      <CardHeader className={isMobile ? "pb-3" : ""}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className={`${isMobile ? "w-8 h-8" : "w-10 h-10"} bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Activity className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} text-blue-600`} />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className={`${isMobile ? "text-base" : "text-lg"} text-slate-800`}>
                {isMobile ? "Real-time Monitoring" : "Real-time Water Quality Monitoring"}
              </CardTitle>
              <p className={`${isMobile ? "text-xs" : "text-sm"} text-slate-600 mt-1`}>
                {isMobile ? "Heavy metals - 24h" : "Heavy metal concentration levels - Last 24 hours"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge className={`${isLive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-700 border-slate-200'} text-xs`}>
              <div className={`w-2 h-2 ${isLive ? 'bg-green-500 animate-pulse' : 'bg-slate-400'} rounded-full mr-1`}></div>
              {isMobile ? (isLive ? "Live" : "Demo") : (isLive ? "Live Data" : "Demo Data")}
            </Badge>
            {!isMobile && (
              <Button variant="outline" size="sm">
                <Clock className="w-4 h-4 mr-2" />
                24h
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`${isMobile ? "h-64" : "h-80"} mb-4`}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b"
                fontSize={isMobile ? 10 : 12}
                tick={{ fontSize: isMobile ? 10 : 12 }}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={isMobile ? 10 : 12}
                tick={{ fontSize: isMobile ? 10 : 12 }}
                label={!isMobile ? { value: 'Concentration (mg/L)', angle: -90, position: 'insideLeft' } : undefined}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: isMobile ? '11px' : '12px'
                }}
                formatter={(value: any, name: string) => [
                  `${Number(value).toFixed(4)} mg/L`,
                  name.charAt(0).toUpperCase() + name.slice(1)
                ]}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="lead" 
                stroke="#dc2626" 
                strokeWidth={2}
                name="Lead"
                dot={{ fill: '#dc2626', strokeWidth: 2, r: isMobile ? 2 : 3 }}
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="mercury" 
                stroke="#7c3aed" 
                strokeWidth={2}
                name="Mercury"
                dot={{ fill: '#7c3aed', strokeWidth: 2, r: isMobile ? 2 : 3 }}
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="arsenic" 
                stroke="#ea580c" 
                strokeWidth={2}
                name="Arsenic"
                dot={{ fill: '#ea580c', strokeWidth: 2, r: isMobile ? 2 : 3 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className={`grid grid-cols-2 ${isMobile ? "" : "lg:grid-cols-4"} gap-3 md:gap-4`}>
          <div className={`bg-red-50 border border-red-200 rounded-lg p-3 ${metrics.lead.status === 'critical' ? 'ring-2 ring-red-200' : ''}`}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-red-900`}>Lead</span>
            </div>
            <div className={`${isMobile ? "text-lg" : "text-xl"} font-semibold text-red-900`}>
              {metrics.lead.value.toFixed(4)}
            </div>
            <div className="text-xs text-red-700">mg/L</div>
          </div>
          
          <div className={`bg-purple-50 border border-purple-200 rounded-lg p-3 ${metrics.mercury.status === 'critical' ? 'ring-2 ring-purple-200' : ''}`}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-purple-900`}>Mercury</span>
            </div>
            <div className={`${isMobile ? "text-lg" : "text-xl"} font-semibold text-purple-900`}>
              {metrics.mercury.value.toFixed(4)}
            </div>
            <div className="text-xs text-purple-700">mg/L</div>
          </div>
          
          <div className={`bg-orange-50 border border-orange-200 rounded-lg p-3 ${metrics.arsenic.status === 'critical' ? 'ring-2 ring-orange-200' : ''}`}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-orange-900`}>Arsenic</span>
            </div>
            <div className={`${isMobile ? "text-lg" : "text-xl"} font-semibold text-orange-900`}>
              {metrics.arsenic.value.toFixed(4)}
            </div>
            <div className="text-xs text-orange-700 flex items-center gap-1">
              {metrics.arsenic.status === 'critical' && <AlertTriangle className="w-3 h-3" />}
              {metrics.arsenic.status === 'critical' ? 'Above limit' : 'Within limit'}
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-3 h-3 text-blue-600" />
              <span className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-blue-900`}>Trend</span>
            </div>
            <div className={`${isMobile ? "text-lg" : "text-xl"} font-semibold text-blue-900`}>
              {metrics.trend}
            </div>
            <div className="text-xs text-blue-700">Last 24h</div>
          </div>
        </div>
        
        {isLive && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Data refreshes every 30 seconds from active sensors</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}