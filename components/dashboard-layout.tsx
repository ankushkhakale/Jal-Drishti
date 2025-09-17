import { useState } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { MobileSidebar } from "./mobile-sidebar";
import { WaterQualityMetrics } from "./water-quality-metrics";
import { MonitoringChart } from "./monitoring-chart";
import { LocationMonitoring } from "./location-monitoring";
import { AlertsPanel } from "./alerts-panel";
import { SampleCollection } from "./sample-collection";
import { ReportsPage } from "./reports-page";
import { AnalyticsPage } from "./analytics-page";
import { SettingsPage } from "./settings-page";
import { useIsMobile } from "../hooks/use-mobile";
import { useWaterData } from "../hooks/use-water-data";
import { User } from "../services/auth";

interface DashboardLayoutProps {
  onNavigate: (page: string) => void;
  user: User | null;
}

export function DashboardLayout({ onNavigate, user }: DashboardLayoutProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isOnline, setIsOnline] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const {
    waterQualityData,
    latestReadings,
    alerts,
    locations,
    teams,
    samples,
    systemStatus,
    isLoading,
    activeAlerts,
    criticalAlerts,
    updateAlertStatus,
    addSample
  } = useWaterData();

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-4 md:space-y-6">
            <WaterQualityMetrics data={latestReadings} />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
              <div className="xl:col-span-2">
                <MonitoringChart data={waterQualityData} />
              </div>
              <div>
                <AlertsPanel 
                  alerts={alerts.slice(0, 5)} 
                  onUpdateStatus={updateAlertStatus}
                />
              </div>
            </div>
            <LocationMonitoring locations={locations} teams={teams} />
          </div>
        );
      case 'monitoring':
        return (
          <div className="space-y-4 md:space-y-6">
            <MonitoringChart data={waterQualityData} />
            <WaterQualityMetrics data={latestReadings} />
          </div>
        );
      case 'locations':
        return <LocationMonitoring locations={locations} teams={teams} />;
      case 'sampling':
        return <SampleCollection samples={samples} onAddSample={addSample} />;
      case 'analysis':
        return <AnalyticsPage data={waterQualityData} />;
      case 'alerts':
        return <AlertsPanel alerts={alerts} onUpdateStatus={updateAlertStatus} />;
      case 'reports':
        return <ReportsPage data={waterQualityData} alerts={alerts} />;
      case 'settings':
        return <SettingsPage user={user} />;
      default:
        return (
          <div className="space-y-4 md:space-y-6">
            <WaterQualityMetrics data={latestReadings} />
            <MonitoringChart data={waterQualityData} />
            <LocationMonitoring locations={locations} teams={teams} />
          </div>
        );
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'dashboard': return 'Water Quality Dashboard';
      case 'monitoring': return 'Real-time Monitoring';
      case 'locations': return 'Location Tracking';
      case 'sampling': return 'Sample Collection';
      case 'analysis': return 'Heavy Metal Analysis';
      case 'alerts': return 'Alerts & Warnings';
      case 'reports': return 'Reports & Documentation';
      case 'settings': return 'System Settings';
      default: return 'Dashboard';
    }
  };

  const getSectionDescription = () => {
    switch (activeSection) {
      case 'dashboard': return 'Comprehensive water pollution monitoring and analysis';
      case 'monitoring': return 'Live data streams and sensor readings';
      case 'locations': return 'GPS-enabled field monitoring locations';
      case 'sampling': return 'Field sample collection and documentation';
      case 'analysis': return 'Advanced analytics and data insights';
      case 'alerts': return 'Critical alerts and system notifications';
      case 'reports': return 'Detailed reports and compliance documentation';
      case 'settings': return 'System configuration and user preferences';
      default: return 'Government water quality monitoring system';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header 
        isOnline={isOnline} 
        onNavigate={onNavigate}
        onMenuClick={() => setIsMobileSidebarOpen(true)}
        user={user}
        alertCount={activeAlerts.length}
        criticalAlertCount={criticalAlerts.length}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Sidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection}
            alertCount={activeAlerts.length}
            systemStatus={systemStatus}
          />
        )}
        
        {/* Mobile Sidebar */}
        {isMobile && (
          <MobileSidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection}
            isOpen={isMobileSidebarOpen}
            onClose={() => setIsMobileSidebarOpen(false)}
            onNavigate={onNavigate}
            alertCount={activeAlerts.length}
            systemStatus={systemStatus}
          />
        )}
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6">
            {/* Only show section header for main content pages, not for reports/analytics/settings */}
            {!['reports', 'analysis', 'settings'].includes(activeSection) && (
              <div className="mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl text-slate-800">{getSectionTitle()}</h2>
                <p className="text-slate-600 mt-1 text-sm md:text-base">{getSectionDescription()}</p>
                {systemStatus && (
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                    <span>Last updated: {new Date(systemStatus.lastUpdate).toLocaleTimeString()}</span>
                    <span>Data points today: {systemStatus.dataPointsToday}</span>
                    <span className={systemStatus.systemHealth > 0.8 ? 'text-green-600' : 'text-amber-600'}>
                      System health: {Math.round(systemStatus.systemHealth * 100)}%
                    </span>
                  </div>
                )}
              </div>
            )}
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}