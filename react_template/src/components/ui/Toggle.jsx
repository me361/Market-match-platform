// src/components/ui/Toggle.jsx
import React from 'react';

const Toggle = ({ checked, onChange, disabled = false, className = '' }) => {
  return (
    <label className={`inline-flex relative items-center cursor-pointer ${disabled ? 'opacity-50' : ''} ${className}`}>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <div className={`
        w-11 h-6 rounded-full transition-colors duration-200 ease-in-out
        ${checked ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'}
        after:absolute after:top-0.5 after:left-0.5 after:bg-white
        after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-200
        ${checked ? 'after:translate-x-5' : ''}
      `}></div>
    </label>
  );
};

export default Toggle;