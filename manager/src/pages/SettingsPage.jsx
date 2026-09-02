import React, { useState } from 'react';
import { 
  Building, 
  Mail, 
  Key, 
  Sliders, 
  Database, 
  Link2, 
  Link2Off, 
  CheckCircle,
  Save,
  User,
  ShieldCheck,
  Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState('Profile');
  const [refundLimit, setRefundLimit] = useState(500);
  const [sentimentEscalate, setSentimentEscalate] = useState(0.40);
  const [saveToast, setSaveToast] = useState('');

  // Editable profile state
  const [name, setName] = useState(user?.name || 'Sarah Jenkins');
  const [company, setCompany] = useState(user?.company || 'Enterprise AI Corp');
  const [email, setEmail] = useState(user?.email || 'manager@company.com');

  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Salesforce CRM', desc: 'Sync customer records, account tier flags, and contact hierarchies for LLM prompt context.', category: 'CRM', connected: true, status: 'Active Sync' },
    { id: 2, name: 'Zendesk Support', desc: 'Auto-dispatch and import ticket backlogs into the AI pipeline. Closes resolved tickets.', category: 'Help Desk', connected: true, status: 'Active Sync' },
    { id: 3, name: 'HubSpot Deals', desc: 'Sync customer details and feed autonomous expansion leads directly into HubSpot deal boards.', category: 'CRM', connected: false, status: 'Disconnected' },
    { id: 4, name: 'Twilio Voice Broker', desc: 'Ingest telephony streams and route voice inquiries into the speech-to-text AI pipeline.', category: 'Telephony', connected: true, status: 'Active Sync' },
  ]);

  const showToast = (msg) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3500);
  };

  const toggleConnection = (id) => {
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.connected;
        return {
          ...item,
          connected: nextState,
          status: nextState ? 'Active Sync' : 'Disconnected'
        };
      }
      return item;
    }));
    showToast('Integration connection state updated.');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    showToast('Profile configuration saved successfully.');
  };

  const handleSaveRules = (e) => {
    e.preventDefault();
    showToast('Autonomous policy thresholds updated & deployed.');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans">
      
      {/* TOAST NOTIFICATION */}
      {saveToast && (
        <div className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{saveToast}</span>
          </div>
          <button onClick={() => setSaveToast('')} className="text-white/80 hover:text-white text-xs">✕</button>
        </div>
      )}

      {/* SETTINGS HEADER */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">System & Platform Settings</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">Manage console credentials, automated policy thresholds, and external API connectors</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* TABS SELECTOR (LEFT 1 COL) */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col space-y-1">
          {['Profile', 'Agent Rules & Limits', 'External Integrations'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                activeSubTab === tab 
                  ? 'bg-primary text-white shadow-sm shadow-blue-500/10' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* DETAILS FORM (RIGHT 3 COLS) */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6 min-h-[420px] flex flex-col justify-between">
          
          <div>
            {/* TAB 1: PROFILE */}
            {activeSubTab === 'Profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Identity & Account Profile</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Verified credentials for this console workspace</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-9 pr-4 py-2 rounded-lg text-xs outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Organization</label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-9 pr-4 py-2 rounded-lg text-xs outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-9 pr-4 py-2 rounded-lg text-xs outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Assigned Role</label>
                    <div className="py-2 px-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-primary uppercase">
                      {user?.role === 'manager' ? '👑 Manager / Supervisor' : '🎧 Customer Support Agent'}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Changes
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: AGENT RULES */}
            {activeSubTab === 'Agent Rules & Limits' && (
              <form onSubmit={handleSaveRules} className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">AI Guardrail Thresholds</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Define when autonomous AI auto-resolves vs triggers human ticket escalation</p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-100">Max Autonomous Refund Limit</span>
                      <span className="font-extrabold text-primary">${refundLimit}.00 USD</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="2000"
                      step="50"
                      value={refundLimit}
                      onChange={(e) => setRefundLimit(e.target.value)}
                      className="w-full cursor-pointer accent-primary"
                    />
                    <span className="text-[10px] text-slate-400 block">
                      Refund requests exceeding this value automatically escalate to Human Support Agent / Manager.
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-100">Negative Sentiment Escalation Trigger</span>
                      <span className="font-extrabold text-red-500">{(sentimentEscalate * 100).toFixed(0)}% Discontent</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="0.9"
                      step="0.05"
                      value={sentimentEscalate}
                      onChange={(e) => setSentimentEscalate(e.target.value)}
                      className="w-full cursor-pointer accent-red-500"
                    />
                    <span className="text-[10px] text-slate-400 block">
                      When AI sentiment engine detects customer anger above this score, ticket priority escalates to High/Critical.
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> Deploy Policies
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: INTEGRATIONS */}
            {activeSubTab === 'External Integrations' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Enterprise Service Connectors</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Toggle live integrations with CRM, telephony, and helpdesk systems</p>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {integrations.map((item) => (
                    <div key={item.id} className="py-3.5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{item.name}</span>
                          <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.2 rounded font-medium">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 max-w-lg">{item.desc}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleConnection(item.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                          item.connected 
                            ? 'bg-emerald-50 text-accentemerald border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800' 
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {item.connected ? (
                          <>
                            <Link2 className="w-3.5 h-3.5" /> Connected
                          </>
                        ) : (
                          <>
                            <Link2Off className="w-3.5 h-3.5" /> Disconnected
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
