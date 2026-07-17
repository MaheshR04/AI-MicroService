import React, { useState } from 'react';
import { 
  Building, 
  Mail, 
  Key, 
  Sliders, 
  Database, 
  Link2, 
  Link2Off, 
  RefreshCw,
  MessageSquare,
  Users,
  ShieldCheck,
  CheckCircle,
  Save
} from 'lucide-react';

export default function SettingsPage() {
  const [activeSubTab, setActiveSubTab] = useState('Profile');
  const [refundLimit, setRefundLimit] = useState(100);
  const [sentimentEscalate, setSentimentEscalate] = useState(0.35);

  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Salesforce CRM', desc: 'Sync customer records, account tier flags, and contact hierarchies for LLM prompt context.', category: 'CRM', connected: true, status: 'Active Sync', iconBg: 'bg-sky-50 text-sky-600 border-sky-100' },
    { id: 2, name: 'Zendesk Support', desc: 'Auto-dispatch and import ticket backlogs into the AI pipeline. Closes resolved tickets.', category: 'Help Desk', connected: true, status: 'Active Sync', iconBg: 'bg-emerald-50 text-accentemerald border-emerald-100' },
    { id: 3, name: 'HubSpot Marketing', desc: 'Sync customer details and feed autonomous expansion leads directly into HubSpot deal boards.', category: 'CRM', connected: false, status: 'Disconnected', iconBg: 'bg-orange-50 text-accentorange border-orange-100' },
  ]);

  const toggleConnection = (id) => {
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          connected: !item.connected,
          status: !item.connected ? 'Active Sync' : 'Disconnected'
        };
      }
      return item;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* SETTINGS GREETING */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800">System & Console Settings</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">Manage console credentials, automated threshold rules, and external connectors</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* TABS SELECTOR (LEFT) */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col space-y-1">
          {['Profile', 'Agent Rules', 'Integrations'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                activeSubTab === tab 
                  ? 'bg-primary text-white shadow-sm shadow-blue-500/10' 
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* DETAILS FORM (RIGHT) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl shadow-sm p-6 min-h-[400px] flex flex-col justify-between">
          
          <div className="space-y-6">
            
            {/* PROFILE SETTINGS TAB */}
            {activeSubTab === 'Profile' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Company Profile</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Configure your organization details and API keys</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Company Name</label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        defaultValue="Microsoft Corporate Sandbox"
                        className="w-full bg-slate-50 border border-slate-200 pl-9 pr-4 py-2.5 rounded-lg text-xs outline-none focus:border-primary focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">System Contact Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        defaultValue="sarah.j@microsoft.com"
                        className="w-full bg-slate-50 border border-slate-200 pl-9 pr-4 py-2.5 rounded-lg text-xs outline-none focus:border-primary focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">CX Guardian API Key</label>
                  <div className="relative">
                    <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      defaultValue="cx_g_key_live_9410abcd1928"
                      disabled
                      className="w-full bg-slate-100 border border-slate-200 pl-9 pr-4 py-2.5 rounded-lg text-xs outline-none cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* AGENT RULES TAB */}
            {activeSubTab === 'Agent Rules' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Agent Autopilot Parameters</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Control threshold settings for autonomous actions</p>
                </div>

                <div className="space-y-4">
                  
                  {/* Refund limit slider */}
                  <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex justify-between text-xs font-bold text-slate-800">
                      <span>Maximum Refund Auto-Threshold</span>
                      <span className="text-primary">${refundLimit} USD</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="500"
                      step="10"
                      value={refundLimit}
                      onChange={(e) => setRefundLimit(e.target.value)}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <span className="text-[9px] text-slate-450 font-medium block">
                      Disputes exceeding this limit are paused and escalated automatically.
                    </span>
                  </div>

                  {/* Sentiment escalate slider */}
                  <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex justify-between text-xs font-bold text-slate-800">
                      <span>Escalate Sentiment Threshold</span>
                      <span className="text-accentred">{sentimentEscalate} Index</span>
                    </div>
                    <input
                      type="range"
                      min="0.10"
                      max="0.80"
                      step="0.05"
                      value={sentimentEscalate}
                      onChange={(e) => setSentimentEscalate(e.target.value)}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-accentred"
                    />
                    <span className="text-[9px] text-slate-450 font-medium block">
                      Triggers takeover notifications if customer frustration score falls below this limit.
                    </span>
                  </div>

                </div>
              </div>
            )}

            {/* INTEGRATIONS TAB */}
            {activeSubTab === 'Integrations' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Platform Connections</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Manage external connections and CRM data pipelines</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {integrations.map(item => (
                    <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-slate-800">{item.name}</h4>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                            item.connected ? 'bg-emerald-50 text-accentemerald border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200'
                          }`}>{item.status}</span>
                        </div>
                        <p className="text-[9px] text-slate-500 leading-normal mt-2">{item.desc}</p>
                      </div>

                      <button
                        onClick={() => toggleConnection(item.id)}
                        className={`w-full py-1.5 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                          item.connected 
                            ? 'border-slate-200 text-slate-600 hover:bg-slate-100' 
                            : 'border-primary bg-primary text-white hover:bg-primary-hover shadow-sm'
                        }`}
                      >
                        {item.connected ? (
                          <>
                            <Link2Off className="w-3.5 h-3.5" /> Disconnect
                          </>
                        ) : (
                          <>
                            <Link2 className="w-3.5 h-3.5" /> Link Connect
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* SAVE BUTTONS */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-medium">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Settings changes deploy immediately</span>
            <button className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors">
              <Save className="w-4 h-4" /> Save System Settings
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
