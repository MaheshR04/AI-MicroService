import React, { useState } from 'react';
import { 
  Send, 
  Search, 
  MessageSquare, 
  Clock, 
  User, 
  Sparkles, 
  Cpu, 
  ShieldAlert,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function ChatPage() {
  const [sessions, setSessions] = useState([
    { id: 1, name: 'Sarah Jenkins', account: 'Microsoft', lastMsg: 'Thank you for the quick seat refund.', time: '55m ago', active: true, unread: false, sentiment: 'Positive' },
    { id: 2, name: 'David Miller', account: 'Stripe API', lastMsg: 'Webhook endpoint still returning 500 error.', time: '2m ago', active: false, unread: true, sentiment: 'Neutral' },
    { id: 3, name: 'Jessica Chen', account: 'Zoom Inc.', lastMsg: 'I need to check why invoice #inv-9102 is double-billed.', time: '12m ago', active: false, unread: true, sentiment: 'Negative' }
  ]);

  const [activeSession, setActiveSession] = useState(sessions[0]);
  const [messages, setMessages] = useState([
    { sender: 'user', text: 'Hi, I accidentally added 5 new seat slots on our subscription yesterday. Can you please revert this and refund the accidental seats?', time: '1h ago' },
    { sender: 'ai', text: 'Stripe refund ch_1941a_ref triggered successfully. Refunded amount: $199.00 USD. Checked account limits: 5 seats deallocated from your Active Directory group. Confirming seat count reset to 40.', time: '1h ago' },
    { sender: 'user', text: 'Thank you for the quick seat refund.', time: '55m ago' }
  ]);

  const [newMsg, setNewMsg] = useState('');
  const [isAutopilot, setIsAutopilot] = useState(true);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    setMessages([...messages, { sender: 'admin', text: newMsg, time: 'Just now' }]);
    setNewMsg('');

    if (isAutopilot) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { sender: 'ai', text: 'This is an autonomous response simulator verifying input context.', time: 'Just now' }
        ]);
      }, 1500);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8.5rem)] overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm max-w-7xl mx-auto">
      
      {/* SESSIONS SIDEBAR (LEFT) */}
      <div className="w-80 border-r border-slate-200 flex flex-col justify-between shrink-0">
        <div>
          {/* Header search */}
          <div className="p-4 border-b border-slate-100 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-extrabold text-slate-800">Active Chat Streams</h3>
              <span className="text-[9px] bg-blue-50 text-primary border border-blue-100 font-bold px-2 py-0.5 rounded-full">
                {sessions.length} Live
              </span>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search active chats..."
                className="w-full bg-slate-50 border border-slate-200 pl-8 pr-4 py-1.5 rounded-lg text-[11px] outline-none focus:border-primary focus:bg-white"
              />
            </div>
          </div>

          {/* Session Cards */}
          <div className="divide-y divide-slate-100 overflow-y-auto max-h-[350px]">
            {sessions.map(s => (
              <div
                key={s.id}
                onClick={() => {
                  setActiveSession(s);
                  // Mock message reload based on selected user
                  if (s.name !== 'Sarah Jenkins') {
                    setMessages([
                      { sender: 'user', text: s.lastMsg, time: s.time }
                    ]);
                  } else {
                    setMessages([
                      { sender: 'user', text: 'Hi, I accidentally added 5 new seat slots on our subscription yesterday. Can you please revert this and refund the accidental seats?', time: '1h ago' },
                      { sender: 'ai', text: 'Stripe refund ch_1941a_ref triggered successfully. Refunded amount: $199.00 USD. Checked account limits: 5 seats deallocated from your Active Directory group. Confirming seat count reset to 40.', time: '1h ago' },
                      { sender: 'user', text: 'Thank you for the quick seat refund.', time: '55m ago' }
                    ]);
                  }
                }}
                className={`p-4 text-left cursor-pointer transition-colors ${
                  activeSession.id === s.id ? 'bg-slate-50' : 'hover:bg-slate-50/40'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-800">{s.name}</span>
                  <span className="text-[9px] text-slate-400">{s.time}</span>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">{s.account}</p>
                <p className="text-[10px] text-slate-500 mt-2 truncate leading-relaxed">{s.lastMsg}</p>
                
                <div className="flex justify-between items-center mt-3 text-[9px] font-bold">
                  <span className={`px-2 py-0.5 rounded-full border ${
                    s.sentiment === 'Positive' ? 'bg-emerald-50 text-accentemerald border-emerald-100' :
                    s.sentiment === 'Neutral' ? 'bg-slate-50 text-slate-500 border-slate-100' :
                    'bg-red-50 text-accentred border-red-100'
                  }`}>{s.sentiment}</span>
                  
                  {s.unread && <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-[10px] text-slate-400 font-medium">
          Sync status: Real-time active
        </div>
      </div>

      {/* CHAT CONSOLE AREA (MIDDLE) */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        
        {/* Active header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/30 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
              {activeSession.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800">{activeSession.name}</h3>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Account: {activeSession.account}</span>
            </div>
          </div>

          {/* Autopilot Controller */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">AI Autopilot</span>
            <button
              onClick={() => setIsAutopilot(!isAutopilot)}
              className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                isAutopilot ? 'bg-primary' : 'bg-slate-300'
              }`}
            >
              <span className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${
                isAutopilot ? 'right-0.5' : 'left-0.5'
              }`} />
            </button>
          </div>
        </div>

        {/* THREAD CONTAINER */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/20">
          {messages.map((m, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col max-w-[75%] ${
                m.sender === 'user' ? 'mr-auto items-start' : 'ml-auto items-end'
              }`}
            >
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                {m.sender === 'user' ? activeSession.name : m.sender === 'ai' ? 'AI Autopilot' : 'Support Manager'}
              </span>
              <div className={`p-3 rounded-xl text-[11px] leading-relaxed ${
                m.sender === 'user' ? 'bg-white border border-slate-200 text-slate-700' :
                m.sender === 'ai' ? 'bg-blue-50 border border-blue-100 text-slate-800 font-medium' :
                'bg-slate-800 text-white'
              }`}>
                {m.text}
              </div>
              <span className="text-[9px] text-slate-400 mt-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* COMPOSER */}
        <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-white shrink-0">
          
          {/* MOCK SUGGESTED REPLIES */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setNewMsg('Stripe refund status synced. Refund cleared.')}
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 hover:border-primary rounded-lg text-[10px] font-semibold text-slate-600 transition-colors shrink-0 cursor-pointer"
            >
              ⚡ Approve Refund ($199)
            </button>
            <button
              type="button"
              onClick={() => setNewMsg('I have paused Autopilot and escaled this ticket to Tier 2 support.')}
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 hover:border-primary rounded-lg text-[10px] font-semibold text-slate-600 transition-colors shrink-0 cursor-pointer"
            >
              ⚠️ Escalate to supervisor
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder={isAutopilot ? "Type response to take over from Autopilot..." : "Reply as console manager..."}
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 pl-4 pr-10 py-3 rounded-xl text-xs outline-none focus:border-primary focus:bg-white transition-colors"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-2 bg-primary hover:bg-primary-hover p-1.5 rounded-lg text-white transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>

      {/* SYSTEM CONTROLS (RIGHT) */}
      <div className="w-64 border-l border-slate-200 p-5 flex flex-col justify-between shrink-0 overflow-y-auto space-y-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-bold text-slate-800">Autopilot Controls</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Manage live agent parameters</p>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Cognitive Node</span>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-primary" /> Billing Specialist
              </span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Decision Accuracy</span>
              <span className="text-xs font-bold text-accentemerald flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> 98% Confident
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <button 
            onClick={() => setIsAutopilot(false)}
            className="w-full border border-slate-200 hover:border-accentorange hover:text-accentorange py-2 rounded-lg text-xs font-bold text-slate-600 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4" /> Pause Autopilot
          </button>
        </div>
      </div>

    </div>
  );
}
