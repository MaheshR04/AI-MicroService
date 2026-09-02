import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Flame, 
  Tag, 
  Check
} from 'lucide-react';
import { useTickets } from '../context/TicketContext';

export default function TicketManagement() {
  const { tickets, solveTicket, escalateTicket } = useTickets();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = 
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'All') return matchesSearch;
    if (activeFilter === 'Solved') return matchesSearch && t.status === 'Solved';
    if (activeFilter === 'Escalated') return matchesSearch && (t.status === 'Escalated' || t.priority === 'Critical');
    if (activeFilter === 'Pending') return matchesSearch && (t.status === 'Pending' || t.status === 'In Progress');
    return matchesSearch && t.status === activeFilter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans">
      
      {/* HEADER SECTION */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Enterprise Ticket Dispatch Console</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Manager oversight of live queues, human escalations, and resolution lifecycles</p>
        </div>
        <span className="text-xs bg-blue-50 dark:bg-blue-950/40 text-primary border border-blue-100 dark:border-blue-800 font-bold px-3 py-1 rounded-full">
          {tickets.length} Master Tickets
        </span>
      </div>

      {/* FILTER PANEL */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
        
        {/* Filter buttons */}
        <div className="flex gap-2">
          {['All', 'Pending', 'Escalated', 'Solved'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                activeFilter === filter 
                  ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search tickets, accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-9 pr-4 py-1.5 rounded-lg text-xs outline-none focus:border-primary focus:bg-white dark:focus:bg-slate-900 dark:text-slate-100 transition-colors"
          />
        </div>

      </div>

      {/* TICKETS TABLE CARD */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        
        {/* Table layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-3">Ticket ID</th>
                <th className="px-6 py-3">Customer & Account</th>
                <th className="px-6 py-3">Issue Subject</th>
                <th className="px-6 py-3">Priority</th>
                <th className="px-6 py-3">Assigned Handler</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredTickets.map(t => {
                const isEscalated = t.status === 'Escalated' || t.priority === 'Critical';
                const isSolved = t.status === 'Solved';

                return (
                  <tr key={t.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-primary">{t.id}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-800 dark:text-slate-100 block">{t.customer}</span>
                      <span className="text-[10px] text-slate-400">{t.company} ({t.tier})</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium max-w-sm">
                      {t.subject}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                        isEscalated
                          ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40 dark:text-red-300'
                          : 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40'
                      }`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">
                      {t.assignedTo || 'Unassigned'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase ${
                        isSolved ? 'bg-emerald-50 text-accentemerald border-emerald-200 dark:bg-emerald-950/40' :
                        isEscalated ? 'bg-red-100 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300 animate-pulse' :
                        'bg-blue-50 text-primary border-blue-200 dark:bg-blue-950/40'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isSolved ? (
                        <span className="text-[10px] font-semibold text-emerald-600">✓ Resolved</span>
                      ) : (
                        <button
                          onClick={() => solveTicket(t.id, 'Operations Manager')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-3 py-1 rounded-md shadow-sm transition-colors cursor-pointer"
                        >
                          Mark Solved
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
