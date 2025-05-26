// src/components/ui/Card.jsx
import React from 'react';

const Card = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  bordered = true,
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg overflow-hidden transition-all duration-200';
  const borderClass = bordered ? 'border border-gray-200 dark:border-gray-700' : '';
  const shadowClass = 'shadow-sm';
  const hoverableClass = hoverable ? 'hover:shadow-md cursor-pointer transform hover:-translate-y-1' : '';
  
  return (
    <div 
      className={`${baseClasses} ${borderClass} ${shadowClass} ${hoverableClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;