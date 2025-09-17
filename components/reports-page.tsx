import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin
} from "lucide-react";

export function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("7days");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const reportSummary = {
    totalSamples: 156,
    criticalAlerts: 8,
    complianceRate: 87.5,
    avgProcessingTime: "2.3 hours"
  };

  const recentReports = [
    {
      id: "RPT-2024-001",
      title: "Weekly Water Quality Assessment",
      location: "Delhi NCR Region",
      date: "2024-09-16",
      status: "completed",
      type: "Weekly Summary",
      samples: 45,
      criticalFindings: 3
    },
    {
      id: "RPT-2024-002", 
      title: "Heavy Metal Contamination Analysis",
      location: "Yamuna River - Multiple Points",
      date: "2024-09-15",
      status: "processing",
      type: "Incident Report",
      samples: 12,
      criticalFindings: 8
    },
    {
      id: "RPT-2024-003",
      title: "Monthly Compliance Review",
      location: "Western Region",
      date: "2024-09-14",
      status: "completed",
      type: "Compliance Report",
      samples: 78,
      criticalFindings: 2
    },
    {
      id: "RPT-2024-004",
      title: "Emergency Response Assessment",
      location: "Ganges - Kanpur",
      date: "2024-09-13",
      status: "completed",
      type: "Emergency Report",
      samples: 25,
      criticalFindings: 15
    }
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return { color: 'bg-green-50 text-green-700 border-green-200', icon: <CheckCircle className="w-3 h-3" /> };
      case 'processing':
        return { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: <Clock className="w-3 h-3" /> };
      case 'critical':
        return { color: 'bg-red-50 text-red-700 border-red-200', icon: <AlertTriangle className="w-3 h-3" /> };
      default:
        return { color: 'bg-slate-50 text-slate-700 border-slate-200', icon: <FileText className="w-3 h-3" /> };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-slate-800">Reports & Analytics</h1>
          <p className="text-slate-600 mt-1">Comprehensive water quality reports and data analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Samples</p>
                <p className="text-2xl text-slate-900">{reportSummary.totalSamples}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-green-600">+12%</span>
              <span className="text-slate-500">from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Critical Alerts</p>
                <p className="text-2xl text-slate-900">{reportSummary.criticalAlerts}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <span className="text-red-600">-3</span>
              <span className="text-slate-500">from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Compliance Rate</p>
                <p className="text-2xl text-slate-900">{reportSummary.complianceRate}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-green-600">+2.3%</span>
              <span className="text-slate-500">improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Avg Processing</p>
                <p className="text-2xl text-slate-900">{reportSummary.avgProcessingTime}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <span className="text-green-600">-0.5h</span>
              <span className="text-slate-500">faster than target</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-800">Report Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="period">Time Period</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="delhi">Delhi NCR</SelectItem>
                  <SelectItem value="kanpur">Ganges - Kanpur</SelectItem>
                  <SelectItem value="ahmedabad">Sabarmati - Ahmedabad</SelectItem>
                  <SelectItem value="bhopal">Narmada - Bhopal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="from-date">From Date</Label>
              <Input type="date" id="from-date" defaultValue="2024-09-09" />
            </div>
            
            <div>
              <Label htmlFor="to-date">To Date</Label>
              <Input type="date" id="to-date" defaultValue="2024-09-16" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports Table */}
      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-800">Recent Reports</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>Title & Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Samples</TableHead>
                <TableHead>Critical</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReports.map((report) => {
                const statusConfig = getStatusConfig(report.status);
                
                return (
                  <TableRow key={report.id}>
                    <TableCell className="text-slate-900">{report.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="text-slate-900">{report.title}</div>
                        <div className="text-sm text-slate-600">{report.type}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span className="text-slate-700">{report.location}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-700">{report.date}</TableCell>
                    <TableCell className="text-slate-700">{report.samples}</TableCell>
                    <TableCell>
                      <Badge className={report.criticalFindings > 5 ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}>
                        {report.criticalFindings}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`border ${statusConfig.color}`}>
                        {statusConfig.icon}
                        <span className="ml-1 capitalize">{report.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}