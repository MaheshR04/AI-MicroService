import React from 'react';

export default function Card({ 
  children, 
  title, 
  subtitle, 
  action, 
  className = '', 
  padding = true 
}) {
  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col justify-between transition-colors ${className}`}>
      
      {/* Header section (if title exists) */}
      {(title || subtitle || action) && (
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-900/50">
          <div>
            {title && <h3 className="text-xs font-bold text-slate-800 dark:text-white">{title}</h3>}
            {subtitle && <p className="text-[10px] text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div className="flex items-center">{action}</div>}
        </div>
      )}

      {/* Card body content */}
      <div className={`${padding ? 'p-6' : ''}`}>
        {children}
      </div>

    </div>
  );
}
