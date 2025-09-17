import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Wifi,
  Save,
  AlertTriangle,
  CheckCircle,
  Users,
  Map
} from "lucide-react";

export function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    critical: true,
    daily: true,
    weekly: false
  });

  const [thresholds, setThresholds] = useState({
    lead: 0.01,
    mercury: 0.006,
    arsenic: 0.01,
    cadmium: 0.003,
    chromium: 0.05
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-slate-800">System Settings</h1>
          <p className="text-slate-600 mt-1">Configure system preferences and monitoring parameters</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  General Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" defaultValue="Central Ground Water Board" />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="ist">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Display Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center gap-2">
                  <Map className="w-5 h-5 text-blue-600" />
                  Default Monitoring Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="sampling-interval">Default Sampling Interval</Label>
                  <Select defaultValue="4h">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">Every Hour</SelectItem>
                      <SelectItem value="2h">Every 2 Hours</SelectItem>
                      <SelectItem value="4h">Every 4 Hours</SelectItem>
                      <SelectItem value="6h">Every 6 Hours</SelectItem>
                      <SelectItem value="12h">Every 12 Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="auto-alerts">Auto-generate Alerts</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Switch id="auto-alerts" defaultChecked />
                    <Label htmlFor="auto-alerts" className="text-sm text-slate-600">
                      Automatically create alerts when thresholds are exceeded
                    </Label>
                  </div>
                </div>
                <div>
                  <Label htmlFor="data-retention">Data Retention Period</Label>
                  <Select defaultValue="2years">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6months">6 Months</SelectItem>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="2years">2 Years</SelectItem>
                      <SelectItem value="5years">5 Years</SelectItem>
                      <SelectItem value="permanent">Permanent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                Notification Preferences
              </CardTitle>
              <p className="text-sm text-slate-600 mt-1">Configure how and when you receive alerts</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-slate-800">Delivery Methods</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notify">Email Notifications</Label>
                      <Switch 
                        id="email-notify" 
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-notify">SMS Notifications</Label>
                      <Switch 
                        id="sms-notify" 
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-slate-800">Alert Types</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="critical-alerts">Critical Alerts</Label>
                      <Switch 
                        id="critical-alerts" 
                        checked={notifications.critical}
                        onCheckedChange={(checked) => setNotifications({...notifications, critical: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="daily-summary">Daily Summary</Label>
                      <Switch 
                        id="daily-summary" 
                        checked={notifications.daily}
                        onCheckedChange={(checked) => setNotifications({...notifications, daily: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="weekly-report">Weekly Reports</Label>
                      <Switch 
                        id="weekly-report" 
                        checked={notifications.weekly}
                        onCheckedChange={(checked) => setNotifications({...notifications, weekly: checked})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h4 className="text-slate-800 mb-3">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="notify-email">Email Address</Label>
                    <Input id="notify-email" defaultValue="dr.sharma@cgwb.gov.in" />
                  </div>
                  <div>
                    <Label htmlFor="notify-phone">Phone Number</Label>
                    <Input id="notify-phone" defaultValue="+91 98765 43210" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Threshold Settings */}
        <TabsContent value="thresholds">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-blue-600" />
                Safety Threshold Configuration
              </CardTitle>
              <p className="text-sm text-slate-600 mt-1">Set pollution detection limits and alert thresholds</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(thresholds).map(([metal, value]) => (
                  <div key={metal} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`threshold-${metal}`} className="capitalize">
                        {metal} Threshold
                      </Label>
                      <Badge variant="secondary" className="text-xs">
                        mg/L
                      </Badge>
                    </div>
                    <Input 
                      id={`threshold-${metal}`}
                      type="number" 
                      step="0.001"
                      value={value}
                      onChange={(e) => setThresholds({
                        ...thresholds, 
                        [metal]: parseFloat(e.target.value)
                      })}
                    />
                    <p className="text-xs text-slate-500">
                      WHO Standard: {value} mg/L
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h4 className="text-slate-800 mb-3">Alert Escalation</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="warning-level">Warning Level (%)</Label>
                    <Input id="warning-level" type="number" defaultValue="80" />
                    <p className="text-xs text-slate-500 mt-1">% of threshold to trigger warning</p>
                  </div>
                  <div>
                    <Label htmlFor="critical-level">Critical Level (%)</Label>
                    <Input id="critical-level" type="number" defaultValue="100" />
                    <p className="text-xs text-slate-500 mt-1">% of threshold to trigger critical alert</p>
                  </div>
                  <div>
                    <Label htmlFor="emergency-level">Emergency Level (%)</Label>
                    <Input id="emergency-level" type="number" defaultValue="150" />
                    <p className="text-xs text-slate-500 mt-1">% of threshold to trigger emergency response</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                User Management
              </CardTitle>
              <p className="text-sm text-slate-600 mt-1">Manage user accounts and permissions</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-slate-800">Current Users</h4>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Add User
                </Button>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: "Dr. Sharma", role: "Administrator", email: "dr.sharma@cgwb.gov.in", status: "active" },
                  { name: "Scientist Kumar", role: "Field Officer", email: "kumar@jalshakti.gov.in", status: "active" },
                  { name: "Health Officer", role: "Analyst", email: "health@gov.in", status: "inactive" }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h5 className="text-slate-900">{user.name}</h5>
                        <p className="text-sm text-slate-600">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">{user.role}</Badge>
                      <Badge className={user.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-700 border-slate-200'}>
                        {user.status}
                      </Badge>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-600" />
                  Database Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="compression">Data Compression</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Switch id="compression" defaultChecked />
                    <Label htmlFor="compression" className="text-sm text-slate-600">
                      Enable automatic data compression
                    </Label>
                  </div>
                </div>
                <div>
                  <Label htmlFor="sync-interval">Sync Interval</Label>
                  <Select defaultValue="5min">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1min">1 Minute</SelectItem>
                      <SelectItem value="5min">5 Minutes</SelectItem>
                      <SelectItem value="15min">15 Minutes</SelectItem>
                      <SelectItem value="30min">30 Minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-blue-600" />
                  Network & Connectivity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="api-timeout">API Timeout (seconds)</Label>
                  <Input id="api-timeout" type="number" defaultValue="30" />
                </div>
                <div>
                  <Label htmlFor="retry-attempts">Retry Attempts</Label>
                  <Input id="retry-attempts" type="number" defaultValue="3" />
                </div>
                <div>
                  <Label htmlFor="offline-mode">Offline Mode</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Switch id="offline-mode" />
                    <Label htmlFor="offline-mode" className="text-sm text-slate-600">
                      Enable offline data collection
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Security Configuration
              </CardTitle>
              <p className="text-sm text-slate-600 mt-1">Manage system security and access controls</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-slate-800">Authentication</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Input id="session-timeout" type="number" defaultValue="60" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <Switch id="two-factor" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password-policy">Strong Password Policy</Label>
                      <Switch id="password-policy" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-slate-800">Access Control</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="max-attempts">Max Login Attempts</Label>
                      <Input id="max-attempts" type="number" defaultValue="5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="ip-whitelist">IP Whitelisting</Label>
                      <Switch id="ip-whitelist" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="audit-logging">Audit Logging</Label>
                      <Switch id="audit-logging" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h4 className="text-slate-800 mb-3">Data Protection</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="encryption">End-to-End Encryption</Label>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">Enabled</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pii-protection">PII Protection</Label>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="compliance">Government Compliance</Label>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}