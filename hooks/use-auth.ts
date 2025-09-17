import { useState, useEffect, useCallback } from 'react';
import { authService, User, AuthState } from '../services/auth';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: authService.getCurrentUser(),
    isAuthenticated: authService.isAuthenticated(),
    isLoading: false
  });

  const login = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const result = await authService.login(email, password);
      
      if (result.success && result.user) {
        setAuthState({
          user: result.user,
          isAuthenticated: true,
          isLoading: false
        });
        return { success: true };
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: result.error };
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Login failed' };
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  }, []);

  const updateProfile = useCallback(async (updates: Partial<User>) => {
    if (!authState.user) return { success: false, error: 'Not authenticated' };

    try {
      const result = await authService.updateProfile(updates);
      
      if (result.success && result.user) {
        setAuthState(prev => ({
          ...prev,
          user: result.user
        }));
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: 'Profile update failed' };
    }
  }, [authState.user]);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    try {
      const result = await authService.changePassword(currentPassword, newPassword);
      return result;
    } catch (error) {
      return { success: false, error: 'Password change failed' };
    }
  }, []);

  const hasPermission = useCallback((permission: string) => {
    return authService.hasPermission(permission);
  }, []);

  const getDashboardConfig = useCallback(() => {
    return authService.getDashboardConfig();
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    const user = authService.getCurrentUser();
    const isAuthenticated = authService.isAuthenticated();
    
    setAuthState({
      user,
      isAuthenticated,
      isLoading: false
    });
  }, []);

  // Auto-refresh token periodically
  useEffect(() => {
    if (!authState.isAuthenticated) return;

    const interval = setInterval(async () => {
      const success = await authService.refreshToken();
      if (!success) {
        logout();
      }
    }, 15 * 60 * 1000); // Refresh every 15 minutes

    return () => clearInterval(interval);
  }, [authState.isAuthenticated, logout]);

  return {
    ...authState,
    login,
    logout,
    updateProfile,
    changePassword,
    hasPermission,
    getDashboardConfig
  };
}