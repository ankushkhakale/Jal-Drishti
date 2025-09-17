import { useState, useEffect, useCallback } from 'react';
import { waterAPI, WaterQualityData, Alert, MonitoringLocation, FieldTeam, Sample } from '../services/api';

export function useWaterData() {
  const [waterQualityData, setWaterQualityData] = useState<WaterQualityData[]>([]);
  const [latestReadings, setLatestReadings] = useState<WaterQualityData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [locations, setLocations] = useState<MonitoringLocation[]>([]);
  const [teams, setTeams] = useState<FieldTeam[]>([]);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestReadings = useCallback(async () => {
    try {
      const readings = await waterAPI.getLatestReadings();
      setLatestReadings(readings);
    } catch (err) {
      console.error('Error fetching latest readings:', err);
    }
  }, []);

  const fetchAlerts = useCallback(async () => {
    try {
      const alertsData = await waterAPI.getAlerts();
      setAlerts(alertsData);
    } catch (err) {
      console.error('Error fetching alerts:', err);
    }
  }, []);

  const fetchSystemStatus = useCallback(async () => {
    try {
      const status = await waterAPI.getSystemStatus();
      setSystemStatus(status);
    } catch (err) {
      console.error('Error fetching system status:', err);
    }
  }, []);

  const fetchWaterQualityData = useCallback(async (locationId?: string, hours: number = 24) => {
    try {
      const data = await waterAPI.getWaterQualityData(locationId, hours);
      setWaterQualityData(data);
    } catch (err) {
      console.error('Error fetching water quality data:', err);
      setError('Failed to fetch water quality data');
    }
  }, []);

  const fetchLocations = useCallback(async () => {
    try {
      const locationsData = await waterAPI.getLocations();
      setLocations(locationsData);
    } catch (err) {
      console.error('Error fetching locations:', err);
    }
  }, []);

  const fetchTeams = useCallback(async () => {
    try {
      const teamsData = await waterAPI.getTeams();
      setTeams(teamsData);
    } catch (err) {
      console.error('Error fetching teams:', err);
    }
  }, []);

  const fetchSamples = useCallback(async (locationId?: string) => {
    try {
      const samplesData = await waterAPI.getSamples(locationId);
      setSamples(samplesData);
    } catch (err) {
      console.error('Error fetching samples:', err);
    }
  }, []);

  const updateAlertStatus = useCallback(async (alertId: string, status: Alert['status']) => {
    try {
      await waterAPI.updateAlertStatus(alertId, status);
      await fetchAlerts(); // Refresh alerts
    } catch (err) {
      console.error('Error updating alert status:', err);
    }
  }, [fetchAlerts]);

  const addSample = useCallback(async (sample: Omit<Sample, 'id'>) => {
    try {
      const newSample = await waterAPI.addSample(sample);
      setSamples(prev => [newSample, ...prev]);
      return newSample;
    } catch (err) {
      console.error('Error adding sample:', err);
      throw err;
    }
  }, []);

  // Initial data load
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          fetchWaterQualityData(),
          fetchLatestReadings(),
          fetchAlerts(),
          fetchLocations(),
          fetchTeams(),
          fetchSamples(),
          fetchSystemStatus()
        ]);
      } catch (err) {
        setError('Failed to load initial data');
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [fetchWaterQualityData, fetchLatestReadings, fetchAlerts, fetchLocations, fetchTeams, fetchSamples, fetchSystemStatus]);

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = waterAPI.subscribe((data) => {
      // Update state with real-time data
      if (data.waterQuality) {
        setWaterQualityData(prev => [...data.waterQuality.slice(-100)]);
        fetchLatestReadings();
      }
      if (data.alerts) {
        setAlerts(data.alerts);
      }
      if (data.systemStatus) {
        setSystemStatus(data.systemStatus);
      }
    });

    return unsubscribe;
  }, [fetchLatestReadings]);

  return {
    // Data
    waterQualityData,
    latestReadings,
    alerts,
    locations,
    teams,
    samples,
    systemStatus,
    
    // State
    isLoading,
    error,
    
    // Actions
    fetchWaterQualityData,
    fetchLatestReadings,
    fetchAlerts,
    fetchLocations,
    fetchTeams,
    fetchSamples,
    fetchSystemStatus,
    updateAlertStatus,
    addSample,
    
    // Computed values
    activeAlerts: alerts.filter(a => a.status === 'active'),
    criticalAlerts: alerts.filter(a => a.type === 'critical' && a.status === 'active'),
    warningAlerts: alerts.filter(a => a.type === 'warning' && a.status === 'active'),
    activeLocations: locations.filter(l => l.status === 'active'),
    offlineLocations: locations.filter(l => l.status === 'offline'),
    activeTeams: teams.filter(t => t.status === 'active'),
    pendingSamples: samples.filter(s => s.status === 'collected' || s.status === 'in-lab'),
    analyzedSamples: samples.filter(s => s.status === 'analyzed')
  };
}

export function useRealTimeMetrics() {
  const [metrics, setMetrics] = useState({
    lead: { value: 0.008, trend: 'down', change: '-12%' },
    mercury: { value: 0.0018, trend: 'stable', change: '+2%' },
    arsenic: { value: 0.012, trend: 'up', change: '+23%' },
    cadmium: { value: 0.004, trend: 'up', change: '+15%' },
    chromium: { value: 0.045, trend: 'up', change: '+8%' },
    nickel: { value: 0.015, trend: 'down', change: '-5%' }
  });

  const [chartData, setChartData] = useState([
    { time: '00:00', lead: 0.005, mercury: 0.001, arsenic: 0.008, ph: 7.2 },
    { time: '04:00', lead: 0.006, mercury: 0.0012, arsenic: 0.009, ph: 7.1 },
    { time: '08:00', lead: 0.007, mercury: 0.0015, arsenic: 0.010, ph: 7.0 },
    { time: '12:00', lead: 0.008, mercury: 0.0018, arsenic: 0.012, ph: 6.9 },
    { time: '16:00', lead: 0.009, mercury: 0.0020, arsenic: 0.011, ph: 7.0 },
    { time: '20:00', lead: 0.008, mercury: 0.0018, arsenic: 0.010, ph: 7.1 },
    { time: '24:00', lead: 0.007, mercury: 0.0016, arsenic: 0.009, ph: 7.2 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics with slight variations
      setMetrics(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          const metric = updated[key as keyof typeof updated];
          const variation = (Math.random() - 0.5) * 0.0001;
          metric.value = Math.max(0, Number((metric.value + variation).toFixed(4)));
        });
        return updated;
      });

      // Add new chart data point
      setChartData(prev => {
        const newTime = new Date();
        const hours = newTime.getHours().toString().padStart(2, '0');
        const minutes = newTime.getMinutes().toString().padStart(2, '0');
        
        const newPoint = {
          time: `${hours}:${minutes}`,
          lead: Number((0.005 + Math.random() * 0.006).toFixed(4)),
          mercury: Number((0.001 + Math.random() * 0.002).toFixed(4)),
          arsenic: Number((0.008 + Math.random() * 0.006).toFixed(4)),
          ph: Number((6.8 + Math.random() * 0.8).toFixed(1))
        };

        return [...prev.slice(-23), newPoint];
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return { metrics, chartData };
}