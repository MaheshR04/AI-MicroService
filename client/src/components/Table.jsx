import React from 'react';

export default function Table({ 
  headers = [], 
  rows = [], 
  renderRow, 
  emptyMessage = 'No data logs found',
  className = '' 
}) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {headers.map((h, index) => (
              <th key={index} className="px-6 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="px-6 py-10 text-center text-slate-400 dark:text-slate-600 font-medium">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => renderRow(row, index))
          )}
        </tbody>
      </table>
    </div>
  );
}
