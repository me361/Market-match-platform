// src/components/DashboardCard.jsx
import React from 'react';
import Card from './ui/Card';

const DashboardCard = ({ 
  title, 
  icon, 
  onClick, 
  isActive = false, 
  color = 'green'
}) => {
  const activeColors = {
    green: 'bg-green-50 dark:bg-green-900/20 border-green-500',
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-500',
  };

  const iconColors = {
    green: 'text-green-600 dark:text-green-400',
    blue: 'text-blue-600 dark:text-blue-400',
  };

  return (
    <Card 
      onClick={onClick} 
      hoverable 
      className={`
        h-full transition-colors duration-200 
        ${isActive ? `${activeColors[color]} border-2` : 'border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}
      `}
    >
      <div className="p-4 flex flex-col items-center text-center">
        <div className={`p-3 rounded-full mb-3 ${isActive ? iconColors[color] : 'text-gray-600 dark:text-gray-400'}`}>
          {icon}
        </div>
        <h3 className={`font-medium ${isActive ? `${color === 'green' ? 'text-green-700 dark:text-green-400' : 'text-blue-700 dark:text-blue-400'}` : 'text-gray-900 dark:text-gray-100'}`}>
          {title}
        </h3>
      </div>
    </Card>
  );
};

export default DashboardCard;