// src/components/Navigation.jsx
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import Toggle from './ui/Toggle';
import Button from './ui/Button';
import { useTheme } from '../contexts/ThemeContext';
import { FaSun, FaMoon, FaTimes, FaBars } from 'react-icons/fa';

const Navigation = ({ 
  userRole, 
  isAuthenticated, 
  onRoleChange, 
  onLoginClick, 
  onLogout,
  onViewChange,
  currentView
}) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState('en'); // 'en' or 'sw'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update isMobile state when window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'sw' : 'en');
  };

  const translations = {
    en: {
      home: 'Home',
      login: 'Login',
      logout: 'Logout',
      farmerDashboard: 'Farmer Dashboard',
      buyerDashboard: 'Buyer Dashboard',
      switchTo: 'Switch to',
      farmer: 'Farmer',
      buyer: 'Buyer',
      darkMode: 'Dark Mode',
      language: 'English',
    },
    sw: {
      home: 'Nyumbani',
      login: 'Ingia',
      logout: 'Toka',
      farmerDashboard: 'Dashibodi ya Mkulima',
      buyerDashboard: 'Dashibodi ya Mnunuzi',
      switchTo: 'Badili kuwa',
      farmer: 'Mkulima',
      buyer: 'Mnunuzi',
      darkMode: 'Hali ya Giza',
      language: 'Kiswahili',
    },
  };

  const t = translations[language];

  const handleViewChange = (view) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    {
      label: 'Dashboard',
      onClick: () => handleViewChange('dashboard'),
      isActive: currentView === 'dashboard'
    },
    {
      label: userRole === 'buyer' ? 'Search Products' : 'My Listings',
      onClick: () => handleViewChange(userRole === 'buyer' ? 'search' : 'listings'),
      isActive: currentView === (userRole === 'buyer' ? 'search' : 'listings')
    }
  ];

  // Navigation for desktop view
  const DesktopNavigation = () => (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-green-600 dark:text-green-400">
              MarketMatch
            </span>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  item.isActive
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>

            {/* Authentication buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {userRole === 'farmer' ? 'Farmer' : 'Buyer'}
                </span>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Navigation for mobile view
  const MobileNavigation = () => (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-green-600 dark:text-green-400">
              MarketMatch
            </span>
          </div>

          {/* Mobile menu */}
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated && navigationItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    item.isActive
                      ? 'bg-green-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {isAuthenticated ? (
                <>
                  <span className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300">
                    {userRole === 'farmer' ? 'Farmer' : 'Buyer'}
                  </span>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Login
                </button>
              )}

              <button
                onClick={toggleTheme}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  return isMobile ? <MobileNavigation /> : <DesktopNavigation />;
};

export default Navigation;