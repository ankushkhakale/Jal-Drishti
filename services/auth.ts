// Authentication service for Jal Drishti
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'scientist' | 'field_officer' | 'analyst';
  department: string;
  permissions: string[];
  avatar?: string;
  lastLogin?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Mock users for demo
const DEMO_USERS: Record<string, User> = {
  'dr.sharma@cgwb.gov.in': {
    id: 'user_001',
    name: 'Dr. Rajesh Sharma',
    email: 'dr.sharma@cgwb.gov.in',
    role: 'admin',
    department: 'Central Ground Water Board',
    permissions: ['view_all', 'manage_alerts', 'generate_reports', 'manage_users', 'system_config']
  },
  'scientist@jalshakti.gov.in': {
    id: 'user_002',
    name: 'Dr. Priya Gupta',
    email: 'scientist@jalshakti.gov.in',
    role: 'scientist',
    department: 'Ministry of Jal Shakti',
    permissions: ['view_data', 'analyze_samples', 'generate_reports', 'manage_locations']
  },
  'health.officer@gov.in': {
    id: 'user_003',
    name: 'Dr. Amit Kumar',
    email: 'health.officer@gov.in',
    role: 'field_officer',
    department: 'Public Health Department',
    permissions: ['view_data', 'collect_samples', 'view_alerts', 'update_status']
  }
};

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private authToken: string | null = null;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  constructor() {
    // Check for existing session
    this.initializeFromStorage();
  }

  private initializeFromStorage() {
    try {
      const storedUser = localStorage.getItem('jal_drishti_user');
      const storedToken = localStorage.getItem('jal_drishti_token');
      
      if (storedUser && storedToken) {
        this.currentUser = JSON.parse(storedUser);
        this.authToken = storedToken;
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
      this.logout();
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check demo credentials
      if (password === 'demo123' && DEMO_USERS[email]) {
        const user = DEMO_USERS[email];
        user.lastLogin = new Date();
        
        this.currentUser = user;
        this.authToken = `token_${user.id}_${Date.now()}`;
        
        // Store in localStorage
        localStorage.setItem('jal_drishti_user', JSON.stringify(user));
        localStorage.setItem('jal_drishti_token', this.authToken);
        
        return { success: true, user };
      }

      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: 'Authentication failed' };
    }
  }

  logout(): void {
    this.currentUser = null;
    this.authToken = null;
    localStorage.removeItem('jal_drishti_user');
    localStorage.removeItem('jal_drishti_token');
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null && this.authToken !== null;
  }

  hasPermission(permission: string): boolean {
    if (!this.currentUser) return false;
    return this.currentUser.permissions.includes(permission);
  }

  getAuthToken(): string | null {
    return this.authToken;
  }

  async refreshToken(): Promise<boolean> {
    if (!this.currentUser) return false;
    
    try {
      // Simulate token refresh
      await new Promise(resolve => setTimeout(resolve, 500));
      this.authToken = `token_${this.currentUser.id}_${Date.now()}`;
      localStorage.setItem('jal_drishti_token', this.authToken);
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  async updateProfile(updates: Partial<User>): Promise<{ success: boolean; user?: User; error?: string }> {
    if (!this.currentUser) {
      return { success: false, error: 'Not authenticated' };
    }

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.currentUser = { ...this.currentUser, ...updates };
      localStorage.setItem('jal_drishti_user', JSON.stringify(this.currentUser));
      
      return { success: true, user: this.currentUser };
    } catch (error) {
      return { success: false, error: 'Profile update failed' };
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    if (!this.currentUser) {
      return { success: false, error: 'Not authenticated' };
    }

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would validate the current password
      if (currentPassword === 'demo123') {
        // Password changed successfully
        return { success: true };
      }
      
      return { success: false, error: 'Current password is incorrect' };
    } catch (error) {
      return { success: false, error: 'Password change failed' };
    }
  }

  // Get user role-based dashboard config
  getDashboardConfig() {
    if (!this.currentUser) return null;

    const baseConfig = {
      sections: ['dashboard', 'monitoring', 'locations', 'alerts'],
      features: {
        realTimeMonitoring: true,
        basicReports: true,
        alertViewing: true
      }
    };

    switch (this.currentUser.role) {
      case 'admin':
        return {
          ...baseConfig,
          sections: [...baseConfig.sections, 'sampling', 'analysis', 'reports', 'teams', 'settings'],
          features: {
            ...baseConfig.features,
            advancedReports: true,
            userManagement: true,
            systemConfig: true,
            dataExport: true,
            alertManagement: true
          }
        };
      
      case 'scientist':
        return {
          ...baseConfig,
          sections: [...baseConfig.sections, 'sampling', 'analysis', 'reports'],
          features: {
            ...baseConfig.features,
            advancedReports: true,
            dataAnalysis: true,
            sampleManagement: true
          }
        };
      
      case 'field_officer':
        return {
          ...baseConfig,
          sections: [...baseConfig.sections, 'sampling'],
          features: {
            ...baseConfig.features,
            sampleCollection: true,
            fieldReports: true,
            locationUpdates: true
          }
        };
      
      default:
        return baseConfig;
    }
  }
}

export const authService = AuthService.getInstance();