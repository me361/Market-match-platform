// src/components/BuyerDashboard.jsx
import { useState } from 'react';
import DashboardCard from './DashboardCard';
import BrowseListings from './BrowseListings';
import SearchProducts from './SearchProducts';
import PostBuyRequest from './PostBuyRequest';

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('browse');
  
  const dashboardSections = [
    {
      id: 'browse',
      title: 'Browse Produce Listings',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
      component: <BrowseListings />,
    },
    {
      id: 'search',
      title: 'Search by Location or Product',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      component: <SearchProducts />,
    },
    {
      id: 'request',
      title: 'Post Buying Request',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      component: <PostBuyRequest />,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-500">Buyer Dashboard</h1>

      {/* Dashboard cards for quick navigation - visible on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 hidden md:grid">
        {dashboardSections.map((section) => (
          <DashboardCard
            key={section.id}
            title={section.title}
            icon={section.icon}
            onClick={() => setActiveTab(section.id)}
            isActive={activeTab === section.id}
            color="blue"
          />
        ))}
      </div>

      {/* Tab navigation for mobile */}
      <div className="block md:hidden overflow-x-auto whitespace-nowrap py-2">
        <div className="inline-flex space-x-2">
          {dashboardSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`px-4 py-2 rounded-full flex items-center space-x-1 text-sm
               ${activeTab === section.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {section.icon}
              <span>{section.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active section content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {dashboardSections.find(section => section.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default BuyerDashboard;