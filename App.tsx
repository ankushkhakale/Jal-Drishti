import { useState, useEffect } from "react";
import { LandingPage } from "./components/landing-page";
import { LoginPage } from "./components/login-page";
import { DashboardLayout } from "./components/dashboard-layout";
import { useAuth } from "./hooks/use-auth";

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const { user, isAuthenticated, login, logout, isLoading } = useAuth();

  // Check authentication state on mount
  useEffect(() => {
    if (isAuthenticated && currentPage === 'landing') {
      setCurrentPage('dashboard');
    }
  }, [isAuthenticated, currentPage]);

  const handleNavigation = (page: string) => {
    if (page === 'landing' && isAuthenticated) {
      logout();
    }
    setCurrentPage(page);
  };

  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password);
    if (result.success) {
      setCurrentPage('dashboard');
    }
    return result;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigation} />;
      case 'login':
        return (
          <LoginPage 
            onNavigate={handleNavigation} 
            onLogin={handleLogin}
            isLoading={isLoading}
          />
        );
      case 'dashboard':
        if (isAuthenticated) {
          return <DashboardLayout onNavigate={handleNavigation} user={user} />;
        } else {
          return (
            <LoginPage 
              onNavigate={handleNavigation} 
              onLogin={handleLogin}
              isLoading={isLoading}
            />
          );
        }
      default:
        return <LandingPage onNavigate={handleNavigation} />;
    }
  };

  return renderPage();
}