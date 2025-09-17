import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart as PieChartIcon,
  Target,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";

export function AnalyticsPage() {
  // Mock data for different charts
  const trendData = [
    { month: 'Jan', lead: 0.006, mercury: 0.0015, arsenic: 0.009, cadmium: 0.003 },
    { month: 'Feb', lead: 0.007, mercury: 0.0018, arsenic: 0.010, cadmium: 0.0032 },
    { month: 'Mar', lead: 0.008, mercury: 0.0020, arsenic: 0.011, cadmium: 0.0035 },
    { month: 'Apr', lead: 0.009, mercury: 0.0017, arsenic: 0.012, cadmium: 0.0038 },
    { month: 'May', lead: 0.008, mercury: 0.0019, arsenic: 0.011, cadmium: 0.0036 },
    { month: 'Jun', lead: 0.007, mercury: 0.0016, arsenic: 0.010, cadmium: 0.0033 },
    { month: 'Jul', lead: 0.008, mercury: 0.0018, arsenic: 0.012, cadmium: 0.004 },
    { month: 'Aug', lead: 0.009, mercury: 0.0019, arsenic: 0.013, cadmium: 0.0041 },
    { month: 'Sep', lead: 0.008, mercury: 0.0018, arsenic: 0.012, cadmium: 0.004 }
  ];

  const locationData = [
    { location: 'Delhi NCR', violations: 15, samples: 120, rate: 12.5 },
    { location: 'Kanpur', violations: 23, samples: 98, rate: 23.5 },
    { location: 'Ahmedabad', violations: 8, samples: 145, rate: 5.5 },
    { location: 'Bhopal', violations: 12, samples: 87, rate: 13.8 },
    { location: 'Mumbai', violations: 6, samples: 134, rate: 4.5 },
    { location: 'Kolkata', violations: 18, samples: 102, rate: 17.6 }
  ];

  const complianceData = [
    { name: 'Safe', value: 78, color: '#10b981' },
    { name: 'Warning', value: 15, color: '#f59e0b' },
    { name: 'Critical', value: 7, color: '#ef4444' }
  ];

  const pollutantData = [
    { pollutant: 'Lead', jan: 45, feb: 52, mar: 48, apr: 55, may: 49, jun: 42 },
    { pollutant: 'Mercury', jan: 12, feb: 15, mar: 18, apr: 14, may: 16, jun: 11 },
    { pollutant: 'Arsenic', jan: 28, feb: 32, mar: 35, apr: 38, may: 33, jun: 29 },
    { pollutant: 'Cadmium', jan: 8, feb: 11, mar: 9, apr: 12, may: 10, jun: 7 }
  ];

  const kpiData = [
    {
      title: "Overall Compliance Rate",
      value: "78.2%",
      change: "+2.3%",
      trend: "up",
      target: "85%",
      description: "Percentage of samples meeting safety standards"
    },
    {
      title: "Average Detection Time",
      value: "1.2 hrs",
      change: "-15 min",
      trend: "up",
      target: "< 2 hrs",
      description: "Time from sampling to initial results"
    },
    {
      title: "Critical Incidents",
      value: "23",
      change: "-8",
      trend: "up",
      target: "< 20",
      description: "Number of critical pollution events this month"
    },
    {
      title: "Coverage Rate",
      value: "94.8%",
      change: "+1.2%",
      trend: "up",
      target: "95%",
      description: "Percentage of planned monitoring completed"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-slate-800">Analytics & Insights</h1>
          <p className="text-slate-600 mt-1">Advanced data analysis and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="6months">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Analytics
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-sm text-slate-600 mb-1">{kpi.title}</h3>
                  <div className="text-2xl text-slate-900 mb-1">{kpi.value}</div>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1 text-sm ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{kpi.change}</span>
                    </div>
                    <span className="text-sm text-slate-500">vs last period</span>
                  </div>
                </div>
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div className="border-t border-slate-200 pt-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Target: {kpi.target}</span>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                    {kpi.trend === 'up' ? 'On Track' : 'Needs Attention'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">{kpi.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Heavy Metal Trends */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Heavy Metal Concentration Trends
            </CardTitle>
            <p className="text-sm text-slate-600">Monthly averages across all monitoring locations</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="lead" stackId="1" stroke="#dc2626" fill="#dc2626" fillOpacity={0.3} name="Lead" />
                  <Area type="monotone" dataKey="mercury" stackId="1" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.3} name="Mercury" />
                  <Area type="monotone" dataKey="arsenic" stackId="1" stroke="#ea580c" fill="#ea580c" fillOpacity={0.3} name="Arsenic" />
                  <Area type="monotone" dataKey="cadmium" stackId="1" stroke="#0d9488" fill="#0d9488" fillOpacity={0.3} name="Cadmium" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Distribution */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-blue-600" />
              Overall Compliance Distribution
            </CardTitle>
            <p className="text-sm text-slate-600">Current status of all monitored locations</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={complianceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {complianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Location Performance */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Violation Rates by Location
            </CardTitle>
            <p className="text-sm text-slate-600">Percentage of samples exceeding safety limits</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={locationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="location" stroke="#64748b" />
                  <YAxis stroke="#64748b" label={{ value: 'Violation Rate (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="rate" fill="#dc2626" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pollutant Detection History */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Pollutant Detection History
            </CardTitle>
            <p className="text-sm text-slate-600">Number of detections above safe limits per month</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pollutantData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="pollutant" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="jan" fill="#3b82f6" name="Jan" />
                  <Bar dataKey="feb" fill="#6366f1" name="Feb" />
                  <Bar dataKey="mar" fill="#8b5cf6" name="Mar" />
                  <Bar dataKey="apr" fill="#a855f7" name="Apr" />
                  <Bar dataKey="may" fill="#d946ef" name="May" />
                  <Bar dataKey="jun" fill="#ec4899" name="Jun" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights Summary */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-800">Key Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-blue-900 mb-2">Improving Trend</h4>
              <p className="text-blue-800 text-sm">
                Overall compliance rate has improved by 2.3% this month, indicating effective monitoring and intervention strategies.
              </p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4">
              <h4 className="text-amber-900 mb-2">Attention Required</h4>
              <p className="text-amber-800 text-sm">
                Kanpur region shows highest violation rate (23.5%). Recommend increased monitoring frequency and immediate intervention.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="text-green-900 mb-2">Performance Goal</h4>
              <p className="text-green-800 text-sm">
                Detection time reduced by 15 minutes. Continue optimizing lab processes to achieve sub-1 hour target.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}