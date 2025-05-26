// src/components/ui/Input.jsx
import React, { forwardRef } from 'react';

const Input = forwardRef(({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onBlur,
  name,
  id,
  label,
  error,
  required = false,
  disabled = false,
  className = '',
  fullWidth = true,
}, ref) => {
  const baseClasses = 'rounded-md border px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 transition-colors duration-200';
  const widthClass = fullWidth ? 'w-full' : 'w-auto';
  const stateClasses = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
    : 'border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700' : '';
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label 
          htmlFor={id || name} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        name={name}
        id={id || name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        className={`${baseClasses} ${widthClass} ${stateClasses} ${disabledClasses}`}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;