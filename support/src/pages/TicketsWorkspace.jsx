import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MessageSquare, 
  Clock, 
  Send, 
  Building, 
  User, 
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Flame,
  FileText,
  Tag,
  Check
} from 'lucide-react';
import { useTickets } from '../context/TicketContext';
import { useAuth } from '../context/AuthContext';

export default function TicketsWorkspace() {
  const { tickets, solveTicket, escalateTicket, addReply, addInternalNote } = useTickets();
  const { user } = useAuth();

  const [selectedTicketId, setSelectedTicketId] = useState('CX-4910');
  const [isAutopilotActive, setIsAutopilotActive] = useState(true);
  const [newMsg, setNewMsg] = useState('');
  const [noteInput, setNoteInput] = useState('');
  const [showNoteBox, setShowNoteBox] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Active ticket object
  const activeTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0] || {};

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMsg.trim() || !activeTicket.id) return;

    const agentName = user?.name || 'Alex Morgan (Support Agent)';
    addReply(activeTicket.id, newMsg, agentName);
    const sentText = newMsg;
    setNewMsg('');
    triggerToast('Message sent to customer!');

    if (isAutopilotActive) {
      setTimeout(() => {
        addReply(
          activeTicket.id,
          `🤖 [AI Co-Pilot Suggestion]: Analyzed "${sentText.slice(0, 30)}...". Associated with SLA policy guidelines. Customer notified.`,
          'AI Guardian Co-Pilot'
        );
      }, 1400);
    }
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteInput.trim() || !activeTicket.id) return;

    addInternalNote(activeTicket.id, noteInput);
    setNoteInput('');
    setShowNoteBox(false);
    triggerToast('Internal staff note saved.');
  };

  const isCritical = activeTicket.priority === 'Critical' || activeTicket.priority === 'High';

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] max-w-8xl mx-auto space-y-3 font-sans">
      
      {/* TOAST FEEDBACK */}
      {toastMsg && (
        <div className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md flex items-center justify-between animate-fade-in shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg('')} className="text-white/80 hover:text-white text-xs">✕</button>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden gap-5">
        
        {/* COLUMN 1: TICKET QUEUE SELECTOR (LEFT 25%) */}
        <div className="w-1/4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col overflow-hidden shrink-0">
          <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
              Assigned Tickets ({tickets.length})
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Live Queue</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {tickets.map(t => {
              const isSelected = t.id === selectedTicketId;
              const isCrit = t.priority === 'Critical' || t.priority === 'High';

              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`p-3.5 cursor-pointer text-left transition-all relative ${
                    isSelected 
                      ? 'bg-blue-50/80 dark:bg-blue-950/40 border-l-4 border-primary' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100">{t.id}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                      isCrit ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {t.priority}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                    {t.customer} ({t.company})
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-normal">
                    {t.subject}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
                    <span>{t.category}</span>
                    <span className={`font-semibold ${isCrit ? 'text-red-500' : 'text-slate-500'}`}>{t.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: CONVERSATION & WORKBENCH (CENTER 50%) */}
        <div className="w-1/2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-primary">{activeTicket.id}</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate max-w-sm">
                  {activeTicket.subject}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">
                Channel: {activeTicket.channel || 'Chat'} • SLA Urgency: {activeTicket.slaRemaining}
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              {activeTicket.status !== 'Solved' && (
                <button
                  onClick={() => {
                    solveTicket(activeTicket.id, user?.name || 'Support Agent');
                    triggerToast(`Ticket ${activeTicket.id} marked as Solved!`);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" /> Solve
                </button>
              )}

              {activeTicket.status !== 'Escalated' && activeTicket.status !== 'Solved' && (
                <button
                  onClick={() => {
                    escalateTicket(activeTicket.id, user?.name || 'Support Agent');
                    triggerToast(`Ticket ${activeTicket.id} escalated to Manager!`);
                  }}
                  className="bg-red-50 hover:bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5" /> Escalate
                </button>
              )}
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30 dark:bg-slate-900/50">
            {activeTicket.internalNotes && activeTicket.internalNotes.length > 0 && (
              <div className="space-y-1.5">
                {activeTicket.internalNotes.map((note, idx) => (
                  <div key={idx} className="p-2.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-lg text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                    <FileText className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-[10px] uppercase text-amber-700 dark:text-amber-400 block">Internal Staff Note</span>
                      <p className="text-[11px]">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTicket.messages && activeTicket.messages.map((msg, idx) => {
              const isAgent = msg.sender === 'agent' || msg.sender === 'admin';
              const isAI = msg.sender === 'ai' || msg.sender === 'system';

              if (isAI) {
                return (
                  <div key={idx} className="p-3 bg-blue-50/80 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-xl my-2 text-xs">
                    <div className="flex items-center gap-1.5 text-primary font-bold text-[11px]">
                      <Sparkles className="w-3.5 h-3.5" /> {msg.name || 'AI Guardian'}
                    </div>
                    <p className="text-[11px] mt-1 text-slate-600 dark:text-slate-300">{msg.text}</p>
                  </div>
                );
              }

              return (
                <div key={idx} className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{msg.name}</span>
                    <span className="text-[9px] text-slate-400">{msg.time}</span>
                  </div>
                  <div className={`max-w-md p-3 rounded-2xl text-xs shadow-sm ${
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

          {/* Autopilot Co-Pilot Switch */}
          <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-semibold text-slate-700 dark:text-slate-200">AI Co-Pilot Assist</span>
            </div>
            <button
              type="button"
              onClick={() => setIsAutopilotActive(!isAutopilotActive)}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-colors cursor-pointer ${
                isAutopilotActive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-200 text-slate-600 dark:bg-slate-700'
              }`}
            >
              {isAutopilotActive ? '● Co-Pilot ON' : '○ Standby'}
            </button>
          </div>

          {/* Message Composer Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder={`Send message to ${activeTicket.customer}...`}
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-2 rounded-lg text-xs outline-none focus:border-primary focus:bg-white dark:focus:bg-slate-900 transition-colors"
            />
            <button
              type="submit"
              disabled={!newMsg.trim()}
              className="bg-primary hover:bg-primary-hover disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </form>

        </div>

        {/* COLUMN 3: CUSTOMER 360 METADATA PANEL (RIGHT 25%) */}
        <div className="w-1/4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col justify-between overflow-y-auto p-5 space-y-4 shrink-0">
          
          <div className="space-y-4 text-center">
            <div className="relative inline-block mx-auto">
              <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700">
                <User className="w-7 h-7 text-slate-500" />
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{activeTicket.customer}</h4>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">{activeTicket.company}</span>
            </div>
            
            <div className="flex justify-center gap-1.5">
              <span className="text-[9px] font-bold bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800 text-primary px-2.5 py-0.5 rounded-full">
                {activeTicket.tier}
              </span>
              <span className="text-[9px] font-bold bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800 text-accentemerald px-2.5 py-0.5 rounded-full">
                {activeTicket.sentiment}
              </span>
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

          {/* Account Details */}
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Customer Email</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block mt-0.5">{activeTicket.email}</span>
            </div>

            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Issue Category</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 block mt-0.5">{activeTicket.category}</span>
            </div>

            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Support Staff</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 block mt-0.5">{activeTicket.assignedTo || 'Alex Morgan'}</span>
            </div>
          </div>

          {/* Internal Staff Note Creator */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            {showNoteBox ? (
              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  rows="2"
                  placeholder="Type internal note..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 rounded-lg text-xs outline-none focus:border-primary"
                ></textarea>
                <div className="flex justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShowNoteBox(false)}
                    className="text-[10px] text-slate-500 hover:text-slate-700 px-2 py-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold px-3 py-1 rounded shadow-sm"
                  >
                    Save Note
                  </button>
                </div>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setShowNoteBox(true)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" /> Add Staff Note
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
