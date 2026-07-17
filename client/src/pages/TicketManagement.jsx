import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  ArrowRight, 
  Activity, 
  CheckCircle2, 
  Clock, 
  ShieldAlert,
  ArrowUpRight,
  Brain
} from 'lucide-react';

export default function TicketManagement() {
  const [tickets, setTickets] = useState([
    { id: 'CX-4912', customer: 'Microsoft (Enterprise)', subject: 'Seat refund request accidental seat purchase', category: 'Billing', priority: 'High', status: 'Resolved', isAiResolved: true, date: '1h ago' },
    { id: 'CX-4911', customer: 'Stripe API User', subject: 'DNS key reset failed lockout', category: 'Security', priority: 'High', status: 'Resolved', isAiResolved: true, date: '2m ago' },
    { id: 'CX-4910', customer: 'Zoom Inc.', subject: 'Double billing invoice refund request', category: 'Billing', priority: 'High', status: 'Escalated', isAiResolved: false, date: '5m ago' },
    { id: 'CX-4909', customer: 'Vercel Customer', subject: 'Custom domain SSL binding failure', category: 'Technical', priority: 'Medium', status: 'Resolved', isAiResolved: true, date: '11m ago' },
    { id: 'CX-4890', customer: 'Airbnb Customer', subject: 'Account onboarding seat setup', category: 'Onboarding', priority: 'Low', status: 'Resolved', isAiResolved: true, date: '1d ago' },
  ]);

  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleToggleAutopilot = (id) => {
    setTickets(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          isAiResolved: !t.isAiResolved,
          status: !t.isAiResolved ? 'Resolved' : 'Escalated'
        };
      }
      return t;
    }));
  };

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'All') return matchesSearch;
    return matchesSearch && t.status === activeFilter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* HEADER SECTION */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800">Support Ticket Dispatch Console</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">Oversee incoming pipelines, human override tickets, and autonomous autopilots</p>
      </div>

      {/* FILTER PANEL */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        
        {/* Filter buttons */}
        <div className="flex gap-2">
          {['All', 'Processing', 'Resolved', 'Escalated'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                activeFilter === filter 
                  ? 'bg-slate-800 text-white' 
                  : 'text-slate-500 hover:bg-slate-100'
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
            placeholder="Search tickets, customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 pl-9 pr-4 py-1.5 rounded-lg text-xs outline-none focus:border-primary focus:bg-white transition-colors"
          />
        </div>

      </div>

      {/* TICKETS TABLE CARD */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        
        {/* Table layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">Ticket ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Autopilot</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTickets.map(ticket => (
                <tr 
                  key={ticket.id}
                  onClick={() => navigate('/tickets')}
                  className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                >
                  
                  {/* ID */}
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-900">
                    {ticket.id}
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-800">
                    {ticket.customer}
                  </td>

                  {/* Subject */}
                  <td className="px-6 py-4 text-xs text-slate-500 max-w-xs truncate font-medium">
                    {ticket.subject}
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    {ticket.category}
                  </td>

                  {/* Priority */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                      ticket.priority === 'High' ? 'bg-red-50 text-accentred border-red-100' :
                      ticket.priority === 'Medium' ? 'bg-amber-50 text-accentorange border-amber-100' :
                      'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>

                  {/* Autopilot Badge */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border flex items-center gap-1.5 w-fit ${
                      ticket.isAiResolved 
                        ? 'bg-blue-50 text-primary border-blue-100' 
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}>
                      {ticket.isAiResolved ? 'AI Autopilot' : 'Human override'}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                      ticket.status === 'Resolved' ? 'bg-emerald-50 text-accentemerald border-emerald-100' :
                      ticket.status === 'Escalated' ? 'bg-red-50 text-accentred border-red-100' :
                      'bg-amber-50 text-accentorange border-amber-100'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>

                  {/* Action buttons */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-xs" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => handleToggleAutopilot(ticket.id)}
                      className="text-xs text-primary hover:underline font-bold cursor-pointer"
                    >
                      {ticket.isAiResolved ? 'Override Autopilot' : 'Arm Autopilot'}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/20 text-center text-xs text-slate-450 font-medium">
          Showing {filteredTickets.length} of {tickets.length} total tickets
        </div>

      </div>

    </div>
  );
}
