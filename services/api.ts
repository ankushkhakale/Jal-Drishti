// Mock API service for Jal Drishti Water Monitoring System
export interface WaterQualityData {
  id: string;
  location: string;
  timestamp: Date;
  measurements: {
    lead: number;
    mercury: number;
    arsenic: number;
    cadmium: number;
    chromium: number;
    nickel: number;
    ph: number;
    temperature: number;
    dissolvedOxygen: number;
  };
  status: 'safe' | 'warning' | 'critical';
  sensorId: string;
  gpsCoordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  location: string;
  timestamp: Date;
  value?: string;
  limit?: string;
  team: string;
  status: 'active' | 'acknowledged' | 'resolved';
  priority: number;
}

export interface FieldTeam {
  id: string;
  name: string;
  leader: string;
  members: string[];
  currentLocation: string;
  status: 'active' | 'offline' | 'en-route';
  assignedSites: string[];
  lastUpdate: Date;
}

export interface MonitoringLocation {
  id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  riverName: string;
  state: string;
  district: string;
  sensors: string[];
  status: 'active' | 'maintenance' | 'offline';
  lastMaintenance: Date;
  installationDate: Date;
}

export interface Sample {
  id: string;
  locationId: string;
  collectedBy: string;
  collectionDate: Date;
  sampleType: 'surface' | 'depth' | 'groundwater';
  status: 'collected' | 'in-lab' | 'analyzed' | 'reported';
  results?: WaterQualityData['measurements'];
  notes: string;
  photos: string[];
}

// Mock data generators
const generateRandomValue = (base: number, variance: number): number => {
  return Number((base + (Math.random() - 0.5) * variance).toFixed(4));
};

const locations: MonitoringLocation[] = [
  {
    id: 'LOC001',
    name: 'Yamuna River - Delhi',
    coordinates: { latitude: 28.6139, longitude: 77.2090 },
    riverName: 'Yamuna',
    state: 'Delhi',
    district: 'Central Delhi',
    sensors: ['SENS001', 'SENS002'],
    status: 'active',
    lastMaintenance: new Date('2024-01-15'),
    installationDate: new Date('2023-06-01')
  },
  {
    id: 'LOC002',
    name: 'Ganga River - Varanasi',
    coordinates: { latitude: 25.3176, longitude: 82.9739 },
    riverName: 'Ganga',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    sensors: ['SENS003', 'SENS004'],
    status: 'active',
    lastMaintenance: new Date('2024-01-20'),
    installationDate: new Date('2023-07-15')
  },
  {
    id: 'LOC003',
    name: 'Narmada River - Bhopal',
    coordinates: { latitude: 23.2599, longitude: 77.4126 },
    riverName: 'Narmada',
    state: 'Madhya Pradesh',
    district: 'Bhopal',
    sensors: ['SENS005'],
    status: 'maintenance',
    lastMaintenance: new Date('2024-01-10'),
    installationDate: new Date('2023-08-01')
  }
];

const teams: FieldTeam[] = [
  {
    id: 'TEAM001',
    name: 'Team Alpha',
    leader: 'Dr. Rajesh Kumar',
    members: ['Dr. Rajesh Kumar', 'Eng. Priya Sharma', 'Tech. Amit Singh'],
    currentLocation: 'Yamuna River - Delhi',
    status: 'active',
    assignedSites: ['LOC001'],
    lastUpdate: new Date()
  },
  {
    id: 'TEAM002',
    name: 'Team Beta',
    leader: 'Dr. Sunita Gupta',
    members: ['Dr. Sunita Gupta', 'Eng. Vikram Mehta', 'Tech. Ravi Kumar'],
    currentLocation: 'Ganga River - Varanasi',
    status: 'active',
    assignedSites: ['LOC002'],
    lastUpdate: new Date()
  },
  {
    id: 'TEAM003',
    name: 'Team Gamma',
    leader: 'Dr. Anil Verma',
    members: ['Dr. Anil Verma', 'Eng. Kavita Joshi'],
    currentLocation: 'Narmada River - Bhopal',
    status: 'en-route',
    assignedSites: ['LOC003'],
    lastUpdate: new Date()
  }
];

class WaterMonitoringAPI {
  private static instance: WaterMonitoringAPI;
  private waterQualityData: WaterQualityData[] = [];
  private alerts: Alert[] = [];
  private samples: Sample[] = [];
  private subscribers: Set<(data: any) => void> = new Set();

  static getInstance(): WaterMonitoringAPI {
    if (!WaterMonitoringAPI.instance) {
      WaterMonitoringAPI.instance = new WaterMonitoringAPI();
    }
    return WaterMonitoringAPI.instance;
  }

  // Initialize with mock data
  constructor() {
    this.initializeMockData();
    this.startRealTimeSimulation();
  }

  private initializeMockData() {
    // Generate initial water quality data
    locations.forEach(location => {
      for (let i = 0; i < 24; i++) {
        const timestamp = new Date();
        timestamp.setHours(timestamp.getHours() - (24 - i));
        
        this.waterQualityData.push({
          id: `DATA_${location.id}_${i}`,
          location: location.name,
          timestamp,
          measurements: {
            lead: generateRandomValue(0.008, 0.004),
            mercury: generateRandomValue(0.0018, 0.001),
            arsenic: generateRandomValue(0.010, 0.005),
            cadmium: generateRandomValue(0.004, 0.002),
            chromium: generateRandomValue(0.045, 0.020),
            nickel: generateRandomValue(0.015, 0.008),
            ph: generateRandomValue(7.2, 1.0),
            temperature: generateRandomValue(25, 5),
            dissolvedOxygen: generateRandomValue(8.5, 2.0)
          },
          status: Math.random() > 0.8 ? 'warning' : Math.random() > 0.95 ? 'critical' : 'safe',
          sensorId: location.sensors[0],
          gpsCoordinates: location.coordinates
        });
      }
    });

    // Generate initial alerts
    this.alerts = [
      {
        id: 'ALT001',
        type: 'critical',
        title: 'Arsenic levels exceeded WHO limits',
        description: 'Immediate action required - Public health risk',
        location: 'Yamuna River - Delhi',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        value: '0.012 mg/L',
        limit: '0.010 mg/L',
        team: 'Team Alpha',
        status: 'active',
        priority: 1
      },
      {
        id: 'ALT002',
        type: 'warning',
        title: 'Cadmium concentration rising',
        description: 'Trend analysis shows 15% increase over 6 hours',
        location: 'Narmada River - Bhopal',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        value: '0.004 mg/L',
        limit: '0.003 mg/L',
        team: 'Team Gamma',
        status: 'active',
        priority: 2
      },
      {
        id: 'ALT003',
        type: 'info',
        title: 'Sensor calibration required',
        description: 'Routine maintenance - Last calibration 30 days ago',
        location: 'Ganga River - Varanasi',
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        team: 'Team Beta',
        status: 'acknowledged',
        priority: 3
      }
    ];

    // Generate sample data
    this.samples = [
      {
        id: 'SAMPLE001',
        locationId: 'LOC001',
        collectedBy: 'Team Alpha',
        collectionDate: new Date(),
        sampleType: 'surface',
        status: 'analyzed',
        results: {
          lead: 0.008,
          mercury: 0.0018,
          arsenic: 0.012,
          cadmium: 0.004,
          chromium: 0.045,
          nickel: 0.015,
          ph: 7.2,
          temperature: 25.5,
          dissolvedOxygen: 8.5
        },
        notes: 'Sample collected from main flow area',
        photos: ['photo1.jpg', 'photo2.jpg']
      }
    ];
  }

  private startRealTimeSimulation() {
    // Simulate real-time data updates every 30 seconds
    setInterval(() => {
      this.updateRealTimeData();
    }, 30000);
  }

  private updateRealTimeData() {
    // Update latest readings
    locations.forEach(location => {
      if (location.status === 'active') {
        const newData: WaterQualityData = {
          id: `DATA_${location.id}_${Date.now()}`,
          location: location.name,
          timestamp: new Date(),
          measurements: {
            lead: generateRandomValue(0.008, 0.004),
            mercury: generateRandomValue(0.0018, 0.001),
            arsenic: generateRandomValue(0.010, 0.005),
            cadmium: generateRandomValue(0.004, 0.002),
            chromium: generateRandomValue(0.045, 0.020),
            nickel: generateRandomValue(0.015, 0.008),
            ph: generateRandomValue(7.2, 1.0),
            temperature: generateRandomValue(25, 5),
            dissolvedOxygen: generateRandomValue(8.5, 2.0)
          },
          status: Math.random() > 0.8 ? 'warning' : Math.random() > 0.95 ? 'critical' : 'safe',
          sensorId: location.sensors[0],
          gpsCoordinates: location.coordinates
        };

        this.waterQualityData.push(newData);
        
        // Check for alerts
        this.checkForAlerts(newData);
        
        // Notify subscribers
        this.notifySubscribers();
      }
    });
  }

  private checkForAlerts(data: WaterQualityData) {
    const limits = {
      lead: 0.01,
      mercury: 0.006,
      arsenic: 0.01,
      cadmium: 0.003,
      chromium: 0.05,
      nickel: 0.02
    };

    Object.entries(limits).forEach(([metal, limit]) => {
      const value = data.measurements[metal as keyof typeof limits];
      if (value > limit) {
        const alert: Alert = {
          id: `ALT_${Date.now()}_${metal}`,
          type: value > limit * 1.2 ? 'critical' : 'warning',
          title: `${metal.charAt(0).toUpperCase() + metal.slice(1)} levels exceeded`,
          description: `${metal} concentration of ${value} mg/L exceeds safety limit`,
          location: data.location,
          timestamp: new Date(),
          value: `${value} mg/L`,
          limit: `${limit} mg/L`,
          team: this.getTeamForLocation(data.location),
          status: 'active',
          priority: value > limit * 1.2 ? 1 : 2
        };
        this.alerts.unshift(alert);
      }
    });
  }

  private getTeamForLocation(location: string): string {
    const team = teams.find(t => t.currentLocation === location);
    return team ? team.name : 'Unassigned';
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.getLatestData()));
  }

  // Public API methods
  subscribe(callback: (data: any) => void) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  async getWaterQualityData(locationId?: string, hours: number = 24): Promise<WaterQualityData[]> {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    let filtered = this.waterQualityData.filter(d => d.timestamp >= cutoff);
    
    if (locationId) {
      const location = locations.find(l => l.id === locationId);
      if (location) {
        filtered = filtered.filter(d => d.location === location.name);
      }
    }
    
    return filtered.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async getLatestReadings(): Promise<WaterQualityData[]> {
    const latest: WaterQualityData[] = [];
    locations.forEach(location => {
      const locationData = this.waterQualityData
        .filter(d => d.location === location.name)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      
      if (locationData.length > 0) {
        latest.push(locationData[0]);
      }
    });
    return latest;
  }

  async getAlerts(status?: Alert['status']): Promise<Alert[]> {
    let filtered = [...this.alerts];
    if (status) {
      filtered = filtered.filter(a => a.status === status);
    }
    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async updateAlertStatus(alertId: string, status: Alert['status']): Promise<void> {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = status;
      this.notifySubscribers();
    }
  }

  async getLocations(): Promise<MonitoringLocation[]> {
    return [...locations];
  }

  async getTeams(): Promise<FieldTeam[]> {
    return [...teams];
  }

  async getSamples(locationId?: string): Promise<Sample[]> {
    let filtered = [...this.samples];
    if (locationId) {
      filtered = filtered.filter(s => s.locationId === locationId);
    }
    return filtered.sort((a, b) => b.collectionDate.getTime() - a.collectionDate.getTime());
  }

  async addSample(sample: Omit<Sample, 'id'>): Promise<Sample> {
    const newSample: Sample = {
      ...sample,
      id: `SAMPLE_${Date.now()}`
    };
    this.samples.unshift(newSample);
    this.notifySubscribers();
    return newSample;
  }

  async getSystemStatus() {
    const activeSensors = locations.filter(l => l.status === 'active').length;
    const totalSensors = locations.length;
    const activeAlerts = this.alerts.filter(a => a.status === 'active').length;
    const criticalAlerts = this.alerts.filter(a => a.type === 'critical' && a.status === 'active').length;
    
    return {
      sensorsActive: activeSensors,
      sensorsTotal: totalSensors,
      activeAlerts,
      criticalAlerts,
      systemHealth: activeSensors / totalSensors,
      lastUpdate: new Date(),
      dataPointsToday: this.waterQualityData.filter(d => 
        d.timestamp >= new Date(new Date().setHours(0, 0, 0, 0))
      ).length
    };
  }

  private getLatestData() {
    return {
      waterQuality: this.waterQualityData.slice(-50),
      alerts: this.alerts.slice(0, 10),
      systemStatus: this.getSystemStatus()
    };
  }
}

export const waterAPI = WaterMonitoringAPI.getInstance();