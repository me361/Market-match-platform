// src/components/FarmerDashboard.jsx
import { useState } from 'react';
import DashboardCard from './DashboardCard';
import PostProduce from './PostProduce';
import MyListings from './MyListings';
import MarketPrices from './MarketPrices';
import NearbyBuyers from './NearbyBuyers';
import Alerts from './Alerts';

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('post');
  
  const dashboardSections = [
    {
      id: 'post',
      title: 'Post Produce for Sale',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      component: <PostProduce />,
    },
    {
      id: 'listings',
      title: 'My Produce Listings',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      component: <MyListings />,
    },
    {
      id: 'prices',
      title: 'Market Prices',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      component: <MarketPrices />,
    },
    {
      id: 'buyers',
      title: 'Nearby Buyers',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      component: <NearbyBuyers />,
    },
    {
      id: 'alerts',
      title: 'My Alerts',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      component: <Alerts />,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-green-700 dark:text-green-500">Farmer Dashboard</h1>

      {/* Dashboard cards for quick navigation - visible on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 hidden md:grid">
        {dashboardSections.map((section) => (
          <DashboardCard
            key={section.id}
            title={section.title}
            icon={section.icon}
            onClick={() => setActiveTab(section.id)}
            isActive={activeTab === section.id}
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
                ? 'bg-green-600 text-white'
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

export default FarmerDashboard;