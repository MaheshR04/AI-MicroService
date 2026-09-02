import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  CheckCircle2, 
  Clock, 
  Tag, 
  Sparkles, 
  Headphones, 
  Check, 
  Smile, 
  Frown, 
  Meh, 
  FileText, 
  Flame, 
  LifeBuoy,
  Zap,
  Building2,
  Mail,
  CornerDownLeft
} from 'lucide-react';
import { useTickets } from '../context/TicketContext';
import { useAuth } from '../context/AuthContext';

export default function SupportAgentDashboard() {
  const { tickets, escalateTicket, solveTicket, addReply, addInternalNote } = useTickets();
  const { user } = useAuth();

  const [selectedTicketId, setSelectedTicketId] = useState('CX-4910');
  const [activeFilter, setActiveFilter] = useState('All'); // All, Normal, High/Critical, Pending, Solved
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [noteText, setNoteText] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState('');

  // Quick Canned Responses
  const cannedResponses = [
    { label: '🔍 Investigating', text: 'Thank you for providing the details. I am actively investigating this with our technical team and will update you shortly.' },
    { label: '💳 Refund Done', text: 'I have reviewed your request and successfully processed the refund. You should see the credit reflected on your statement in 3-5 business days.' },
    { label: '🔑 Pass Reset', text: 'We have generated a secure password/token reset link for your account. Please check your registered email address.' },
    { label: '📄 Request Logs', text: 'Could you please share your latest request ID or application logs so we can diagnose this edge case immediately?' },
  ];

  // Active selected ticket object
  const activeTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0] || {};

  // Filter logic
  const filteredTickets = tickets.filter(t => {
    const matchesSearch = 
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'All') return true;
    if (activeFilter === 'Normal') return t.priority === 'Normal' && t.status !== 'Solved';
    if (activeFilter === 'High/Critical') return (t.priority === 'High' || t.priority === 'Critical') && t.status !== 'Solved';
    if (activeFilter === 'Solved') return t.status === 'Solved';
    if (activeFilter === 'Pending') return t.status === 'Pending' || t.status === 'In Progress';
    return true;
  });

  // Calculate agent stats
  const normalQueueCount = tickets.filter(t => t.priority === 'Normal' && t.status !== 'Solved').length;
  const criticalQueueCount = tickets.filter(t => (t.priority === 'Critical' || t.priority === 'High') && t.status !== 'Solved').length;
  const solvedTodayCount = tickets.filter(t => t.status === 'Solved').length;

  const showNotification = (msg) => {
    setActionSuccessMessage(msg);
    setTimeout(() => setActionSuccessMessage(''), 4000);
  };

  // Send Reply action
  const handleSendReply = (e) => {
    e?.preventDefault();
    if (!replyText.trim() || !activeTicket.id) return;

    const agentName = user?.name || 'Alex Morgan (Support Agent)';
    addReply(activeTicket.id, replyText, agentName);
    setReplyText('');
    showNotification(`Reply sent to ${activeTicket.customer}. Synced with Manager dashboard!`);
  };

  // Solve & Close Ticket action
  const handleSolveTicket = () => {
    if (!activeTicket.id) return;
    const agentName = user?.name || 'Alex Morgan (Support Agent)';
    solveTicket(activeTicket.id, agentName);
    showNotification(`Ticket ${activeTicket.id} marked as Solved and synced with Manager Dashboard!`);
  };

  // Escalate Ticket action
  const handleEscalateTicket = () => {
    if (!activeTicket.id) return;
    const agentName = user?.name || 'Alex Morgan (Support Agent)';
    escalateTicket(activeTicket.id, agentName);
    showNotification(`Ticket ${activeTicket.id} escalated to Manager Console in real-time!`);
  };

  // Add Internal Staff Note
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteText.trim() || !activeTicket.id) return;

    addInternalNote(activeTicket.id, noteText);
    setNoteText('');
    setShowNoteInput(false);
    showNotification(`Internal staff note added to ${activeTicket.id}`);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto font-sans">
      
      {/* SUCCESS ACTION BANNER */}
      {actionSuccessMessage && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{actionSuccessMessage}</span>
          </div>
          <button onClick={() => setActionSuccessMessage('')} className="text-white/80 hover:text-white text-xs">✕</button>
        </div>
      )}

      {/* TOP HEADER & LIVE METRICS STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* AGENT PROFILE / STATUS CARD */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-3.5 shadow-sm card-hover flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20">
              <Headphones className="w-5 h-5" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse"></span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{user?.name || 'Alex Morgan'}</h3>
              <span className="text-[9px] bg-blue-50 dark:bg-blue-950/60 text-primary border border-blue-200 dark:border-blue-800 font-bold px-1.5 py-0.2 rounded">
                Tier-2
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium truncate">Human Support Desk</p>
          </div>
        </div>

        {/* METRIC 1: NORMAL QUEUE */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-3.5 shadow-sm card-hover flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Normal Queue</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-0.5 block">{normalQueueCount} Active</span>
            <span className="text-[10px] text-slate-400 font-medium">Standard SLA</span>
          </div>
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/50 text-primary rounded-xl">
            <LifeBuoy className="w-5 h-5" />
          </div>
        </div>

        {/* METRIC 2: HIGH/CRITICAL ESCALATIONS */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-3.5 shadow-sm card-hover flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block">High / Critical</span>
            <span className="text-xl font-extrabold text-red-600 dark:text-red-400 mt-0.5 block">{criticalQueueCount} Escalated</span>
            <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span> Priority SLA
            </span>
          </div>
          <div className="p-2.5 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-xl">
            <Flame className="w-5 h-5" />
          </div>
        </div>

        {/* METRIC 3: SOLVED TODAY */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-3.5 shadow-sm card-hover flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Solved Today</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5 block">{solvedTodayCount} Cases</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">100% CSAT Rating</span>
          </div>
          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* FILTER BUTTONS & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-2.5 shadow-sm">
        
        {/* Queue category tabs */}
        <div className="flex flex-wrap gap-1">
          {[
            { id: 'All', label: 'All Cases', count: tickets.length },
            { id: 'Normal', label: 'Normal Queue', count: normalQueueCount, color: 'text-blue-500' },
            { id: 'High/Critical', label: 'Critical Alert', count: criticalQueueCount, color: 'text-red-500' },
            { id: 'Pending', label: 'Pending', count: tickets.filter(t => t.status === 'Pending' || t.status === 'In Progress').length },
            { id: 'Solved', label: 'Solved', count: solvedTodayCount, color: 'text-emerald-500' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                activeFilter === tab.id
                  ? 'bg-primary text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeFilter === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search tickets, customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-8 pr-3 py-1.5 rounded-xl text-xs outline-none focus:border-primary focus:bg-white dark:focus:bg-slate-900 transition-colors"
          />
        </div>

      </div>

      {/* SPLIT WORKSPACE: TICKET QUEUE (LEFT) & RESOLUTION WORKBENCH (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-17.5rem)] min-h-[500px]">
        
        {/* LEFT COLUMN: TICKET INGESTION STREAM (4 COLS) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          
          <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Triage Queue ({filteredTickets.length})
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Sorted by Urgency</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {filteredTickets.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <LifeBuoy className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-xs">No tickets match this filter.</p>
              </div>
            ) : (
              filteredTickets.map(ticket => {
                const isSelected = ticket.id === selectedTicketId;
                const isCritical = ticket.priority === 'Critical' || ticket.priority === 'High';
                
                return (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicketId(ticket.id)}
                    className={`p-3.5 cursor-pointer text-left transition-all relative ${
                      isSelected 
                        ? 'bg-blue-50/90 dark:bg-blue-950/40 border-l-4 border-primary' 
                        : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-primary">{ticket.id}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.2 rounded-full uppercase tracking-wider ${
                          isCritical
                            ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-900/60'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60'
                        }`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{ticket.time || 'Just now'}</span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                      {ticket.customer}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {ticket.subject}
                    </p>

                    <div className="flex items-center justify-between mt-2.5 pt-1.5 border-t border-slate-100 dark:border-slate-800/80 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1 font-medium text-slate-500 dark:text-slate-400">
                        <Tag className="w-3 h-3" /> {ticket.category}
                      </span>
                      <span className="flex items-center gap-1 font-mono font-semibold text-slate-400">
                        <Clock className="w-3 h-3" /> SLA: {ticket.slaRemaining}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: RESOLUTION WORKBENCH (8 COLS) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          
          {/* TICKET TOP DETAILS BAR */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-extrabold text-primary">{activeTicket.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeTicket.status === 'Solved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                    activeTicket.status === 'Escalated' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 animate-pulse' :
                    'bg-blue-100 text-primary dark:bg-blue-950 dark:text-blue-300'
                  }`}>
                    {activeTicket.status?.toUpperCase()}
                  </span>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-medium">
                    Channel: {activeTicket.channel}
                  </span>
                </div>
                <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">
                  {activeTicket.subject}
                </h2>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-2">
                {activeTicket.status !== 'Solved' && (
                  <button
                    onClick={handleSolveTicket}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" /> Solve Ticket
                  </button>
                )}

                {activeTicket.status !== 'Escalated' && activeTicket.status !== 'Solved' && (
                  <button
                    onClick={handleEscalateTicket}
                    className="bg-red-50 hover:bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Flame className="w-3.5 h-3.5" /> Escalate to Manager
                  </button>
                )}

                <button
                  onClick={() => setShowNoteInput(!showNoteInput)}
                  className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" /> Staff Note
                </button>
              </div>
            </div>

            {/* Customer Context Quick bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px]">
              <div>
                <span className="text-slate-400 font-medium block text-[9px] uppercase">Customer</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{activeTicket.customer}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block text-[9px] uppercase">Company & Tier</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{activeTicket.company} ({activeTicket.tier})</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block text-[9px] uppercase">Customer Email</span>
                <span className="font-medium text-slate-600 dark:text-slate-400 truncate block">{activeTicket.email}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block text-[9px] uppercase">Sentiment</span>
                <span className={`font-bold inline-flex items-center gap-1 ${
                  activeTicket.sentiment === 'Positive' ? 'text-emerald-600' :
                  activeTicket.sentiment === 'Negative' ? 'text-red-500' : 'text-slate-600'
                }`}>
                  {activeTicket.sentiment === 'Positive' ? <Smile className="w-3.5 h-3.5" /> :
                   activeTicket.sentiment === 'Negative' ? <Frown className="w-3.5 h-3.5" /> : <Meh className="w-3.5 h-3.5" />}
                  {activeTicket.sentiment}
                </span>
              </div>
            </div>

          </div>

          {/* INTERNAL NOTE CREATOR BANNER */}
          {showNoteInput && (
            <form onSubmit={handleAddNote} className="p-3 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900/50 flex gap-2">
              <input
                type="text"
                placeholder="Type internal staff note (visible only to support agents & managers)..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="flex-1 bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-800 px-3 py-1.5 rounded-xl text-xs outline-none"
              />
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-sm cursor-pointer"
              >
                Save Note
              </button>
            </form>
          )}

          {/* CONVERSATION & TIMELINE STREAM */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30 dark:bg-slate-900/50">
            
            {/* Internal notes banner */}
            {activeTicket.internalNotes && activeTicket.internalNotes.length > 0 && (
              <div className="space-y-1.5">
                {activeTicket.internalNotes.map((note, idx) => (
                  <div key={idx} className="p-2.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                    <FileText className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-[10px] uppercase text-amber-700 dark:text-amber-400 block">Internal Staff Note</span>
                      <p className="text-[11px]">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Chat message bubbles */}
            {activeTicket.messages && activeTicket.messages.map((msg, index) => {
              const isAgent = msg.sender === 'agent';
              const isSystem = msg.sender === 'system';

              if (isSystem) {
                return (
                  <div key={index} className="p-3 bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 rounded-2xl text-center my-2 text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-bold text-primary flex items-center justify-center gap-1.5 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5" /> {msg.name}
                    </span>
                    <p className="text-[11px] mt-0.5 text-slate-500 dark:text-slate-400">{msg.text}</p>
                  </div>
                );
              }

              return (
                <div key={index} className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{msg.name}</span>
                    <span className="text-[9px] text-slate-400">{msg.time}</span>
                  </div>
                  <div className={`max-w-xl p-3.5 rounded-2xl text-xs shadow-sm ${
                    isAgent
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })}

          </div>

          {/* QUICK CANNED RESPONSES STRIP */}
          <div className="p-2 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto shrink-0">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider shrink-0 pl-1">
              Canned:
            </span>
            {cannedResponses.map((cr, idx) => (
              <button
                key={idx}
                onClick={() => setReplyText(cr.text)}
                className="shrink-0 text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary dark:hover:border-primary text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg transition-colors font-medium cursor-pointer"
              >
                {cr.label}
              </button>
            ))}
          </div>

          {/* RESPONSE COMPOSER */}
          <form onSubmit={handleSendReply} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder={`Reply to ${activeTicket.customer}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-2.5 rounded-xl text-xs outline-none focus:border-primary focus:bg-white dark:focus:bg-slate-900 transition-colors"
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="bg-primary hover:bg-primary-hover disabled:opacity-50 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
              <CornerDownLeft className="w-3 h-3 opacity-60" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
