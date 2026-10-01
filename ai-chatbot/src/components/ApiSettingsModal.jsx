import React, { useState } from 'react';
import { 
  X, 
  Key, 
  Sparkles, 
  Cpu, 
  Mic, 
  Check, 
  Eye, 
  EyeOff, 
  Server, 
  Radio, 
  HelpCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useChat } from '../context/ChatContext.jsx';

export default function ApiSettingsModal() {
  const { 
    apiConfig, 
    setApiConfig, 
    isApiSettingsModalOpen, 
    setIsApiSettingsModalOpen,
    friendVoiceConfig,
    setFriendVoiceConfig
  } = useChat();

  const [activeTab, setActiveTab] = useState('ai'); // 'ai' | 'voice'
  const [provider, setProvider] = useState(apiConfig.provider || 'backend');
  const [apiKey, setApiKey] = useState(apiConfig.apiKey || '');
  const [model, setModel] = useState(apiConfig.model || 'llama-3.3-70b-versatile');
  const [showKey, setShowKey] = useState(false);

  // Friend Voice Tool local states
  const [voiceEndpoint, setVoiceEndpoint] = useState(friendVoiceConfig.endpoint || '');
  const [voiceKey, setVoiceKey] = useState(friendVoiceConfig.apiKey || '');
  const [voiceEnabled, setVoiceEnabled] = useState(friendVoiceConfig.enabled || false);

  const [testStatus, setTestStatus] = useState(null); // { success: boolean, msg: string }

  if (!isApiSettingsModalOpen) return null;

  const handleSave = () => {
    setApiConfig({
      provider,
      apiKey: apiKey.trim(),
      model,
      temperature: 0.3
    });

    setFriendVoiceConfig({
      enabled: voiceEnabled,
      endpoint: voiceEndpoint.trim(),
      apiKey: voiceKey.trim(),
      provider: 'custom_friend_ai_tool'
    });

    setIsApiSettingsModalOpen(false);
  };

  const testConnection = async () => {
    setTestStatus({ loading: true, msg: 'Testing connection...' });

    if (provider === 'backend') {
      try {
        const res = await fetch('http://localhost:5000/api/v1/chat/health');
        if (res.ok) {
          setTestStatus({ success: true, msg: 'Connected to Node.js / FastAPI Gateway successfully!' });
        } else {
          setTestStatus({ success: false, msg: `Gateway returned HTTP ${res.status}. Make sure backend is running.` });
        }
      } catch (err) {
        setTestStatus({ success: false, msg: 'Cannot reach backend gateway at http://localhost:5000.' });
      }
    } else if (provider === 'groq') {
      if (!apiKey.trim()) {
        setTestStatus({ success: false, msg: 'Please enter your Groq API key first.' });
        return;
      }
      try {
        const res = await fetch('https://api.groq.com/openai/v1/models', {
          headers: { 'Authorization': `Bearer ${apiKey.trim()}` }
        });
        if (res.ok) {
          setTestStatus({ success: true, msg: 'Groq Cloud API Key verified successfully!' });
        } else {
          setTestStatus({ success: false, msg: `Groq rejected key (HTTP ${res.status}).` });
        }
      } catch (err) {
        setTestStatus({ success: false, msg: `Connection failed: ${err.message}` });
      }
    } else if (provider === 'gemini') {
      if (!apiKey.trim()) {
        setTestStatus({ success: false, msg: 'Please enter your Google Gemini API key first.' });
        return;
      }
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey.trim()}`);
        if (res.ok) {
          setTestStatus({ success: true, msg: 'Google Gemini API Key verified successfully!' });
        } else {
          setTestStatus({ success: false, msg: `Gemini rejected key (HTTP ${res.status}).` });
        }
      } catch (err) {
        setTestStatus({ success: false, msg: `Connection failed: ${err.message}` });
      }
    } else if (provider === 'openai') {
      if (!apiKey.trim()) {
        setTestStatus({ success: false, msg: 'Please enter your OpenAI API key first.' });
        return;
      }
      try {
        const res = await fetch('https://api.openai.com/v1/models', {
          headers: { 'Authorization': `Bearer ${apiKey.trim()}` }
        });
        if (res.ok) {
          setTestStatus({ success: true, msg: 'OpenAI API Key verified successfully!' });
        } else {
          setTestStatus({ success: false, msg: `OpenAI rejected key (HTTP ${res.status}).` });
        }
      } catch (err) {
        setTestStatus({ success: false, msg: `Connection failed: ${err.message}` });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">AI Engine & Voice Integration</h2>
              <p className="text-xs text-slate-400">Configure LLM keys, query analyzer models & voice tool adapters</p>
            </div>
          </div>

          <button
            onClick={() => setIsApiSettingsModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 px-6 pt-2">
          <button
            onClick={() => setActiveTab('ai')}
            className={`pb-2.5 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
              activeTab === 'ai'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            AI Chat & Analysis Engine
          </button>
          <button
            onClick={() => setActiveTab('voice')}
            className={`pb-2.5 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
              activeTab === 'voice'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mic className="w-4 h-4" />
            Friend's Voice AI Tool Adapter
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          
          {activeTab === 'ai' && (
            <>
              {/* Provider Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Select AI Service Provider
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    { id: 'backend', name: 'Backend Svc', sub: 'FastAPI/Groq', icon: Server },
                    { id: 'groq', name: 'Groq Cloud', sub: 'LLaMA-3.3 70B', icon: Sparkles },
                    { id: 'gemini', name: 'Google Gemini', sub: 'Gemini 2.0', icon: Cpu },
                    { id: 'openai', name: 'OpenAI', sub: 'GPT-4o-mini', icon: ShieldCheck }
                  ].map(p => {
                    const Icon = p.icon;
                    const isSelected = provider === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setProvider(p.id);
                          if (p.id === 'groq') setModel('llama-3.3-70b-versatile');
                          if (p.id === 'gemini') setModel('gemini-2.0-flash');
                          if (p.id === 'openai') setModel('gpt-4o-mini');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-blue-600/15 border-blue-500 text-white shadow-sm ring-1 ring-blue-500/40'
                            : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                        <span className="block text-xs font-bold">{p.name}</span>
                        <span className="block text-[10px] text-slate-500">{p.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* API Key Input (if not backend) */}
              {provider !== 'backend' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      {provider.toUpperCase()} API Key
                    </label>
                    <span className="text-[11px] text-slate-500">Stored safely in local browser storage</span>
                  </div>
                  <div className="relative">
                    <input
                      type={showKey ? 'text' : 'password'}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder={`Enter your ${provider.toUpperCase()} API Key (e.g. gsk_... or AIza...)`}
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-200 outline-none focus:border-blue-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300"
                    >
                      {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Model Choice */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Model Variant
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 outline-none focus:border-blue-500"
                >
                  {provider === 'groq' && (
                    <>
                      <option value="llama-3.3-70b-versatile">LLaMA-3.3 70B Versatile (Recommended, Sub-100ms)</option>
                      <option value="llama-3.1-8b-instant">LLaMA-3.1 8B Instant (Ultra-fast, lowest latency)</option>
                      <option value="mixtral-8x7b-32768">Mixtral 8x7B (MoE)</option>
                    </>
                  )}
                  {provider === 'gemini' && (
                    <>
                      <option value="gemini-2.0-flash">Gemini 2.0 Flash (Recommended, Native Audio/Multimodal ready)</option>
                      <option value="gemini-1.5-flash">Gemini 1.5 Flash (1M Context window)</option>
                      <option value="gemini-1.5-pro">Gemini 1.5 Pro (Deep reasoning)</option>
                    </>
                  )}
                  {provider === 'openai' && (
                    <>
                      <option value="gpt-4o-mini">GPT-4o-mini (Recommended, Fast & Cost-effective)</option>
                      <option value="gpt-4o">GPT-4o (Omni flagship)</option>
                    </>
                  )}
                  {provider === 'backend' && (
                    <option value="llama-3.3-70b-versatile">Auto-managed via FastAPI Microservice & MongoDB</option>
                  )}
                </select>
              </div>

              {/* Test Connection Button & Status */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={testConnection}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
                >
                  Test Connection
                </button>

                {testStatus && (
                  <span className={`text-xs font-medium flex items-center gap-1.5 ${
                    testStatus.success ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {testStatus.success ? <Check className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                    {testStatus.msg}
                  </span>
                )}
              </div>
            </>
          )}

          {activeTab === 'voice' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-700/40 text-xs text-indigo-200 space-y-1">
                <h4 className="font-bold flex items-center gap-1.5 text-white">
                  <Mic className="w-4 h-4 text-indigo-400" />
                  Friend's Voice AI Tool Extension Hook
                </h4>
                <p className="leading-relaxed opacity-90">
                  When your friend shares their AI voice tool credentials, paste the WebSocket or REST endpoint below. The chatbot will automatically pipe synthesized text directly to their engine!
                </p>
              </div>

              {/* Enable Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                <div>
                  <span className="text-xs font-bold text-white block">Enable Custom Voice Tool</span>
                  <span className="text-[11px] text-slate-500">Route audio generation through friend's AI tool</span>
                </div>
                <input
                  type="checkbox"
                  checked={voiceEnabled}
                  onChange={(e) => setVoiceEnabled(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-slate-900 border-slate-700 rounded focus:ring-blue-500"
                />
              </div>

              {/* Endpoint URL */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Voice API Endpoint / WebSocket URL
                </label>
                <input
                  type="text"
                  value={voiceEndpoint}
                  onChange={(e) => setVoiceEndpoint(e.target.value)}
                  placeholder="https://api.voice-tool.ai/v1/synthesize or wss://..."
                  className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Voice API Key */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Voice Auth Key / Token
                </label>
                <input
                  type="password"
                  value={voiceKey}
                  onChange={(e) => setVoiceKey(e.target.value)}
                  placeholder="Friend's voice service API token"
                  className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="text-[11px] text-slate-500">
                Note: Native browser Web Speech API is currently active as the primary fallback, so voice input and read-aloud work out of the box right now!
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:px-6 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsApiSettingsModalOpen(false)}
            className="px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs font-medium transition"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            Save Configuration
          </button>
        </div>

      </div>
    </div>
  );
}
