import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false, 
  className = '',
  icon: Icon,
  type = 'button'
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg shadow-sm focus:outline-none transition-all duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50';

  const variants = {
    primary: 'bg-primary hover:bg-primary-hover text-white dark:bg-blue-600 dark:hover:bg-blue-700',
    secondary: 'bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-650',
    outline: 'border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800',
    danger: 'bg-red-500 hover:bg-red-650 text-white dark:bg-red-600 dark:hover:bg-red-700',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}
