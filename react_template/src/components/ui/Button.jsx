// src/components/ui/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  disabled = false, 
  className = '', 
  color = 'primary',
  size = 'md',
  fullWidth = false,
}) => {
  const baseClasses = 'font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200 flex items-center justify-center';
  
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };
  
  const colorClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200',
    green: 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white',
    blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white',
    red: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white',
    transparent: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-300',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${colorClasses[color]} ${widthClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;