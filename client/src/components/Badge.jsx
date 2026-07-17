import React from 'react';

export default function Badge({ children, variant = 'neutral', className = '' }) {
  const baseStyles = 'text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border transition-colors inline-flex items-center gap-1 w-fit';
  
  const variants = {
    success: 'bg-emerald-50 text-accentemerald border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30',
    danger: 'bg-red-50 text-accentred border-red-100 dark:bg-red-950/20 dark:border-red-900/30',
    warning: 'bg-amber-50 text-accentorange border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30',
    primary: 'bg-blue-50 text-primary border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30',
    neutral: 'bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
  };

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.neutral} ${className}`}>
      {children}
    </span>
  );
}
