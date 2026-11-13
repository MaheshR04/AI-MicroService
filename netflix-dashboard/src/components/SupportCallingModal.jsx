import React, { useState, useEffect } from 'react';
import { useNetflixSupport } from '../context/NetflixSupportContext';
import {
  Phone,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Clock,
  CheckCircle2,
  X,
  MessageSquare,
  Shield,
  Headphones,
  UserCheck
} from 'lucide-react';

export default function SupportCallingModal() {
  const {
    isCallingOpen,
    setIsCallingOpen,
    setIsChatOpen,
    user,
    createSupportTicket
  } = useNetflixSupport();

  const [activeTab, setActiveTab] = useState('web_call'); // 'web_call' | 'helplines' | 'callback'
  
  // Web call state
  const [callStatus, setCallStatus] = useState('idle'); // 'idle' | 'dialing' | 'connected' | 'ended'
  const [callSeconds, setCallSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);

  // Callback form state
  const [callbackSlot, setCallbackSlot] = useState('immediately');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  // Timer for connected call
  useEffect(() => {
    let interval = null;
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setCallSeconds((s) => s + 1);
      }, 1000);
    } else {
      setCallSeconds(0);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  if (!isCallingOpen) return null;

  const handleStartCall = () => {
    setCallStatus('dialing');
    setTimeout(() => {
      setCallStatus('connected');
    }, 2000);
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      setCallStatus('idle');
    }, 1200);
  };

  const formatCallTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    await createSupportTicket(
      `📞 Customer Callback Requested (${callbackSlot})`,
      'high',
      `Customer requested immediate callback to +91 ${user.phone}`
    );
    setCallbackSubmitted(true);
    setTimeout(() => {
      setCallbackSubmitted(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-neutral-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 bg-neutral-900 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Jio Voice & Calling Support</h3>
              <p className="text-[11px] text-neutral-400">Direct helpline & voice assistance</p>
            </div>
          </div>

          <button
            onClick={() => {
              if (callStatus === 'connected' || callStatus === 'dialing') {
                handleEndCall();
              }
              setIsCallingOpen(false);
            }}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-white/10 bg-neutral-900/60 p-1 gap-1 text-xs">
          <button
            onClick={() => setActiveTab('web_call')}
            className={`flex-1 py-2 rounded-lg font-medium transition flex items-center justify-center gap-1.5 ${
              activeTab === 'web_call'
                ? 'bg-neutral-800 text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instant Web Call</span>
          </button>

          <button
            onClick={() => setActiveTab('helplines')}
            className={`flex-1 py-2 rounded-lg font-medium transition flex items-center justify-center gap-1.5 ${
              activeTab === 'helplines'
                ? 'bg-neutral-800 text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Headphones className="w-3.5 h-3.5 text-blue-400" />
            <span>Toll-Free Helplines</span>
          </button>

          <button
            onClick={() => setActiveTab('callback')}
            className={`flex-1 py-2 rounded-lg font-medium transition flex items-center justify-center gap-1.5 ${
              activeTab === 'callback'
                ? 'bg-neutral-800 text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Request Callback</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 flex-1 space-y-4">
          {/* TAB 1: Instant Web Call */}
          {activeTab === 'web_call' && (
            <div className="flex flex-col items-center justify-center py-4 space-y-4 text-center">
              {callStatus === 'idle' && (
                <>
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
                    <PhoneCall className="w-10 h-10 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Connect with Jio Care Voice Desk</h4>
                    <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                      Speak directly through your browser with a customer support representative regarding your subscription, 5G or fiber queries.
                    </p>
                  </div>
                  <div className="text-[11px] text-neutral-500 bg-neutral-900 px-3 py-1.5 rounded-full border border-white/5">
                    Calling for account: <span className="text-neutral-300 font-mono">+91 {user.phone}</span>
                  </div>
                  <button
                    onClick={handleStartCall}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition flex items-center gap-2 shadow-lg shadow-emerald-600/30"
                  >
                    <Phone className="w-4 h-4" /> Start Live Web Call
                  </button>
                </>
              )}

              {callStatus === 'dialing' && (
                <>
                  <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 animate-pulse mb-2">
                    <PhoneCall className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Ringing Jio Care Desk...</h4>
                    <p className="text-xs text-neutral-400 mt-1">Connecting to nearest available support agent</p>
                  </div>
                  <button
                    onClick={handleEndCall}
                    className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition flex items-center gap-2"
                  >
                    <PhoneOff className="w-4 h-4" /> Cancel Call
                  </button>
                </>
              )}

              {callStatus === 'connected' && (
                <>
                  {/* Connected Agent info */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-xl mb-2">
                      <UserCheck className="w-8 h-8" />
                    </div>
                    <h4 className="text-base font-bold text-white">Priya Sharma</h4>
                    <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Connected • Senior Jio Specialist (Staff #8492)
                    </span>
                    <span className="font-mono text-sm text-neutral-300 mt-1">{formatCallTime(callSeconds)}</span>
                  </div>

                  {/* Audio Waveform visualization */}
                  <div className="flex items-center gap-1 h-8 px-4 py-1">
                    {[16, 24, 12, 28, 20, 32, 18, 26, 14, 22].map((height, i) => (
                      <div
                        key={i}
                        className="w-1 bg-emerald-400 rounded-full animate-wave"
                        style={{ height: `${height}px`, animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>

                  {/* Call Controls */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-3 rounded-full border transition ${
                        isMuted
                          ? 'bg-red-600/20 border-red-500 text-red-400'
                          : 'bg-neutral-800 border-white/10 text-neutral-300 hover:text-white'
                      }`}
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>

                    <button
                      onClick={handleEndCall}
                      className="p-4 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/40 transition"
                      title="End Call"
                    >
                      <PhoneOff className="w-6 h-6" />
                    </button>

                    <button
                      onClick={() => setIsSpeaker(!isSpeaker)}
                      className={`p-3 rounded-full border transition ${
                        !isSpeaker
                          ? 'bg-neutral-800 border-white/10 text-neutral-500'
                          : 'bg-neutral-800 border-white/10 text-white'
                      }`}
                      title="Speaker"
                    >
                      {isSpeaker ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    </button>
                  </div>
                </>
              )}

              {callStatus === 'ended' && (
                <div className="py-4 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 mx-auto">
                    <PhoneOff className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Call Ended</h4>
                  <p className="text-xs text-neutral-400">Call summary has been saved to your account log.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Toll-Free Helplines */}
          {activeTab === 'helplines' && (
            <div className="space-y-3">
              <p className="text-xs text-neutral-300">
                Official 24x7 toll-free helpline numbers for immediate telephonic assistance:
              </p>

              <div className="grid gap-2.5">
                {/* 198 */}
                <div className="p-3 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-emerald-400 font-mono">198</span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded font-bold">
                        TOLL FREE • 24x7
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-white mt-0.5">Complaints & Escalation Desk</div>
                    <div className="text-[10px] text-neutral-400">SIM issues, coverage failures, service disputes</div>
                  </div>
                  <a
                    href="tel:198"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center gap-1 shrink-0"
                  >
                    <Phone className="w-3 h-3" /> Dial
                  </a>
                </div>

                {/* 1991 */}
                <div className="p-3 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-blue-400 font-mono">1991</span>
                      <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.2 rounded font-bold">
                        IVR BOT
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-white mt-0.5">Recharges & Data Balance</div>
                    <div className="text-[10px] text-neutral-400">Automated IVR balance checks in 10 languages</div>
                  </div>
                  <a
                    href="tel:1991"
                    className="px-3 py-1.5 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white font-semibold text-xs transition flex items-center gap-1 shrink-0"
                  >
                    <Phone className="w-3 h-3" /> Dial
                  </a>
                </div>

                {/* 1800-889-9999 */}
                <div className="p-3 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-amber-300 font-mono">1800-889-9999</span>
                    </div>
                    <div className="text-xs font-semibold text-white mt-0.5">JioFiber & AirFiber Broadband</div>
                    <div className="text-[10px] text-neutral-400">Router setup, optical fiber cuts, technician booking</div>
                  </div>
                  <a
                    href="tel:18008899999"
                    className="px-3 py-1.5 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white font-semibold text-xs transition flex items-center gap-1 shrink-0"
                  >
                    <Phone className="w-3 h-3" /> Dial
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Request Callback */}
          {activeTab === 'callback' && (
            <form onSubmit={handleCallbackSubmit} className="space-y-3">
              <p className="text-xs text-neutral-300">
                Don't want to wait on hold? An agent will call you directly on your verified number:
              </p>

              <div className="p-3 bg-neutral-900 rounded-xl border border-white/10 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Callback Phone:</span>
                  <span className="text-white font-mono font-bold">+91 {user.phone}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Account:</span>
                  <span className="text-neutral-200">{user.name}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">Preferred Time Window:</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'immediately', label: 'Within 3 Mins' },
                    { id: '15_mins', label: 'In 15 Mins' },
                    { id: 'evening', label: 'Evening (6-8 PM)' },
                  ].map((slot) => (
                    <button
                      type="button"
                      key={slot.id}
                      onClick={() => setCallbackSlot(slot.id)}
                      className={`p-2 rounded-lg border text-center font-medium transition ${
                        callbackSlot === slot.id
                          ? 'bg-blue-600/20 border-blue-500 text-white'
                          : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>

              {callbackSubmitted ? (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-center text-xs text-emerald-300 font-semibold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Callback scheduled! Agent will contact +91 {user.phone} shortly.
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
                >
                  Schedule Callback Request
                </button>
              )}
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-neutral-900/80 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
          <span>Prefer typing?</span>
          <button
            onClick={() => {
              setIsCallingOpen(false);
              setIsChatOpen(true);
            }}
            className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 transition"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Open Chat Assistant</span>
          </button>
        </div>
      </div>
    </div>
  );
}

