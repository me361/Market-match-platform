// src/App.jsx
import { useState, useEffect } from 'react';
import Welcome from './components/Welcome';
import FarmerDashboard from './components/FarmerDashboard';
import BuyerDashboard from './components/BuyerDashboard';
import Navigation from './components/Navigation';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import LoginSignup from './components/LoginSignup';
import SearchProducts from './components/SearchProducts';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  // Load user role from localStorage on initial render
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setUserRole(savedRole);
    }

    // Check if user is authenticated (for demo purposes)
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Save user role to localStorage whenever it changes
  useEffect(() => {
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    }
  }, [userRole]);

  const handleRoleSelect = (role) => {
    setUserRole(role);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  // Render appropriate dashboard based on user role
  const renderDashboard = () => {
    if (!userRole) {
      return <Welcome onRoleSelect={handleRoleSelect} />;
    }

    if (!isAuthenticated && showLoginForm) {
      return <LoginSignup onLogin={handleLogin} onCancel={() => setShowLoginForm(false)} />;
    }

    return (
      <>
        <Navigation 
          userRole={userRole} 
          isAuthenticated={isAuthenticated} 
          onRoleChange={handleRoleSelect} 
          onLoginClick={toggleLoginForm} 
          onLogout={handleLogout}
          onViewChange={setCurrentView}
          currentView={currentView}
        />
        <main className="container mx-auto px-4 pb-16 pt-20 md:pt-24">
          {currentView === 'dashboard' ? (
            userRole === 'farmer' ? <FarmerDashboard /> : <BuyerDashboard />
          ) : currentView === 'search' ? (
            <SearchProducts />
          ) : null}
        </main>
      </>
    );
  };

  return (
    <ThemeProvider>
      <UserProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
          {renderDashboard()}
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;