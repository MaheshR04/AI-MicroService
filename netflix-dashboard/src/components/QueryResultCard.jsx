import React, { useState } from 'react';
import { useNetflixSupport } from '../context/NetflixSupportContext';
import {
  Zap,
  Wifi,
  Smartphone,
  ShieldAlert,
  Router,
  Tag,
  PieChart,
  MoreHorizontal,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  PhoneCall,
  Check,
  Flame,
  Clock,
  Radio
} from 'lucide-react';

export default function QueryResultCard({ queryId, queryTitle }) {
  const { user, createSupportTicket, initQuickMenu, chatLanguage } = useNetflixSupport();
  const [actionStatus, setActionStatus] = useState(null);
  const [speedTestActive, setSpeedTestActive] = useState(false);
  const [speedVal, setSpeedVal] = useState(null);

  const handleSimBlock = async () => {
    setActionStatus('blocking');
    const res = await createSupportTicket(
      '🚨 EMERGENCY: Lost SIM Block Request',
      'urgent',
      `Customer requested immediate suspension for SIM +91 ${user.phone}`
    );
    setTimeout(() => {
      setActionStatus('sim_blocked');
    }, 800);
  };

  const handleRouterReboot = () => {
    setActionStatus('rebooting');
    setTimeout(() => {
      setActionStatus('rebooted');
    }, 1500);
  };

  const runSpeedTest = () => {
    setSpeedTestActive(true);
    setSpeedVal(null);
    setTimeout(() => {
      setSpeedVal({ dl: 846, ul: 82, ping: 11 });
      setSpeedTestActive(false);
    }, 1400);
  };

  const handleRechargeSelect = async (planName, price) => {
    setActionStatus(`recharging_${price}`);
    await createSupportTicket(
      `Recharge Request: ${planName} (${price})`,
      'medium',
      `Auto-initiated recharge for +91 ${user.phone}`
    );
    setTimeout(() => {
      setActionStatus(`recharged_${price}`);
    }, 900);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 p-3 sm:p-4 shadow-xl text-xs space-y-3">
      {/* Header of Query Card */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
            JIO
          </div>
          <span className="font-bold text-white text-sm">{queryTitle}</span>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live Verified
        </span>
      </div>

      {/* 1. OFFERS & RECHARGES */}
      {queryId === 'offers_recharges' && (
        <div className="space-y-3">
          <p className="text-neutral-300">
            Exclusive recommended recharge plans for your number <span className="text-white font-mono font-bold">+91 {user.phone}</span>:
          </p>

          <div className="grid gap-2">
            {/* Plan 1 */}
            <div className="p-2.5 rounded-lg bg-neutral-800/80 border border-blue-500/30 flex items-center justify-between hover:border-blue-400 transition">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black text-white">₹349</span>
                  <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.2 rounded">BESTSELLER</span>
                </div>
                <div className="text-[11px] text-neutral-300 mt-0.5">
                  28 Days • 2GB/Day + <span className="text-emerald-400 font-bold">Unlimited 5G</span>
                </div>
                <div className="text-[10px] text-neutral-400">Includes JioCinema, JioTV & Unlimited Calls</div>
              </div>
              <button
                onClick={() => handleRechargeSelect('28-Day Super Plan', '₹349')}
                disabled={actionStatus?.startsWith('recharging')}
                className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold transition shrink-0"
              >
                {actionStatus === 'recharged_₹349' ? '✓ Selected' : 'Recharge'}
              </button>
            </div>

            {/* Plan 2 */}
            <div className="p-2.5 rounded-lg bg-neutral-800/80 border border-white/5 flex items-center justify-between hover:border-white/20 transition">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black text-white">₹899</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.2 rounded border border-amber-500/30">QUARTERLY</span>
                </div>
                <div className="text-[11px] text-neutral-300 mt-0.5">
                  90 Days • 2GB/Day + <span className="text-emerald-400 font-bold">Unlimited 5G</span> + 20GB Extra
                </div>
                <div className="text-[10px] text-neutral-400">JioCinema Premium Complimentary</div>
              </div>
              <button
                onClick={() => handleRechargeSelect('90-Day Plan', '₹899')}
                disabled={actionStatus?.startsWith('recharging')}
                className="px-3 py-1.5 rounded-md bg-neutral-700 hover:bg-neutral-600 text-white font-semibold transition shrink-0"
              >
                {actionStatus === 'recharged_₹899' ? '✓ Selected' : 'Recharge'}
              </button>
            </div>

            {/* Plan 3 */}
            <div className="p-2.5 rounded-lg bg-neutral-800/80 border border-white/5 flex items-center justify-between hover:border-white/20 transition">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black text-white">₹3599</span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-1.5 py-0.2 rounded border border-purple-500/30">ANNUAL</span>
                </div>
                <div className="text-[11px] text-neutral-300 mt-0.5">
                  365 Days • 2.5GB/Day + <span className="text-emerald-400 font-bold">True 5G Unlimited</span>
                </div>
                <div className="text-[10px] text-neutral-400">FanCode OTT + 1 Year Security Protection</div>
              </div>
              <button
                onClick={() => handleRechargeSelect('365-Day Annual Plan', '₹3599')}
                disabled={actionStatus?.startsWith('recharging')}
                className="px-3 py-1.5 rounded-md bg-neutral-700 hover:bg-neutral-600 text-white font-semibold transition shrink-0"
              >
                {actionStatus === 'recharged_₹3599' ? '✓ Selected' : 'Recharge'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MY PLAN & USAGE */}
      {queryId === 'plan_usage' && (
        <div className="space-y-3">
          <div className="bg-neutral-800/70 rounded-lg p-3 border border-white/5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400 font-medium">Active Plan</span>
              <span className="font-bold text-white text-[13px]">{user.plan}</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-neutral-400">Daily 4G/LTE Data</span>
                <span className="font-mono text-emerald-400 font-bold">{user.balance.dailyRemaining}</span>
              </div>
              <div className="w-full bg-neutral-700 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full w-[84%]" />
              </div>
              <span className="text-[10px] text-neutral-500">Resets tonight at 12:00 AM</span>
            </div>

            <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-neutral-400 block">True 5G Speed:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Unlimited Active
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block">Validity:</span>
                <span className="text-white font-semibold">{user.balance.validityDays}</span>
              </div>
              <div>
                <span className="text-neutral-400 block">Voice Calls:</span>
                <span className="text-neutral-200">{user.balance.voice}</span>
              </div>
              <div>
                <span className="text-neutral-400 block">SMS Balance:</span>
                <span className="text-neutral-200">{user.balance.smsRemaining}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => createSupportTicket('Statement Request: Detailed Usage', 'low')}
            className="w-full py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-center border border-white/10 transition"
          >
            Email Detailed 30-Day Itemized Statement
          </button>
        </div>
      )}

      {/* 3. JIO TRUE 5G */}
      {queryId === 'jio_true_5g' && (
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-950/40 to-neutral-900 border border-emerald-500/20 space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white text-xs">Jio True 5G Standalone (SA) Active</span>
            </div>
            <p className="text-neutral-300 text-[11px]">
              Your handset is registered on Jio's 5G Standalone network with zero data deduction from your daily plan!
            </p>

            <div className="space-y-1.5 text-[11px] pt-1">
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" /> 5G Standalone Core (n28 / n78 bands)
              </div>
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" /> Welcome Offer Uncapped Speed Granted
              </div>
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ultra-low Latency Gaming & HD Streaming Enabled
              </div>
            </div>
          </div>

          {/* Speed test section */}
          <div className="p-3 bg-neutral-800/60 rounded-lg border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-300">Live 5G Bandwidth Diagnostic</span>
              <button
                onClick={runSpeedTest}
                disabled={speedTestActive}
                className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1 transition"
              >
                <RefreshCw className={`w-3 h-3 ${speedTestActive ? 'animate-spin' : ''}`} />
                {speedTestActive ? 'Testing...' : 'Test 5G Speed'}
              </button>
            </div>

            {speedVal && (
              <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-white/5">
                <div className="bg-neutral-900/80 p-2 rounded">
                  <span className="text-[10px] text-neutral-400 block">Download</span>
                  <span className="text-sm font-black text-emerald-400">{speedVal.dl} Mbps</span>
                </div>
                <div className="bg-neutral-900/80 p-2 rounded">
                  <span className="text-[10px] text-neutral-400 block">Upload</span>
                  <span className="text-sm font-black text-cyan-400">{speedVal.ul} Mbps</span>
                </div>
                <div className="bg-neutral-900/80 p-2 rounded">
                  <span className="text-[10px] text-neutral-400 block">Latency</span>
                  <span className="text-sm font-black text-amber-400">{speedVal.ping} ms</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. NETWORK & COVERAGE */}
      {queryId === 'network_coverage' && (
        <div className="space-y-3">
          <div className="bg-neutral-800/70 rounded-lg p-3 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Nearest Sector Tower</span>
              <span className="font-mono text-emerald-400 font-bold">Tower #MH-BOM-4029</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Tower Health Status</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" /> 100% Operational (No Outage)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Signal Strength</span>
              <span className="text-white font-semibold">-74 dBm (5/5 Bars 📶)</span>
            </div>
          </div>

          <button
            onClick={() => {
              createSupportTicket('Network Issue: Slow Speed / Call Drop Report', 'high', 'Customer reported area network degradation');
              setActionStatus('network_reported');
            }}
            className="w-full py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/10 font-medium transition"
          >
            {actionStatus === 'network_reported' ? '✓ Network Ticket Logged with Field Engineers' : 'Report Weak Signal / Call Drop in My Area'}
          </button>
        </div>
      )}

      {/* 5. JIO SIM STATUS */}
      {queryId === 'jio_sim_status' && (
        <div className="space-y-3">
          <div className="bg-neutral-800/70 rounded-lg p-3 border border-white/5 space-y-2">
            <div className="flex justify-between">
              <span className="text-neutral-400">Mobile Number:</span>
              <span className="font-mono font-bold text-white">+91 {user.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">SIM Status:</span>
              <span className="text-emerald-400 font-bold">Active & Normal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">KYC Verification:</span>
              <span className="text-neutral-200">{user.kycStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Connection Type:</span>
              <span className="text-neutral-200">{user.serviceType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">VoLTE / VoNR:</span>
              <span className="text-cyan-400 font-semibold">Enabled (HD Voice)</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => createSupportTicket('eSIM Conversion Request', 'medium')}
              className="flex-1 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/10 text-center font-medium transition"
            >
              Convert to eSIM
            </button>
            <button
              onClick={() => createSupportTicket('SIM DND Preference Update', 'low')}
              className="flex-1 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/10 text-center font-medium transition"
            >
              Manage DND (Spam Filter)
            </button>
          </div>
        </div>
      )}

      {/* 6. SIM LOST / PUK */}
      {queryId === 'sim_lost_puk' && (
        <div className="space-y-3">
          {/* PUK Retrieval */}
          <div className="p-3 bg-amber-950/30 rounded-lg border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold">
              <ShieldAlert className="w-4 h-4" /> Instant PUK Codes for Mobile +91 {user.phone}
            </div>
            <p className="text-[11px] text-neutral-300">
              If your phone asks for a PUK code, enter PUK 1 carefully. 10 incorrect attempts will lock the SIM permanently.
            </p>
            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="bg-black/60 p-2 rounded border border-amber-500/20">
                <span className="text-[10px] text-neutral-400 block">PUK 1 Code</span>
                <span className="text-base font-mono font-black text-amber-300 tracking-widest">{user.puk1}</span>
              </div>
              <div className="bg-black/60 p-2 rounded border border-amber-500/20">
                <span className="text-[10px] text-neutral-400 block">PUK 2 Code</span>
                <span className="text-base font-mono font-black text-amber-300 tracking-widest">{user.puk2}</span>
              </div>
            </div>
          </div>

          {/* Emergency SIM Block */}
          <div className="p-3 bg-red-950/30 rounded-lg border border-red-500/30 space-y-2">
            <div className="flex items-center gap-1.5 text-red-400 font-bold">
              <AlertTriangle className="w-4 h-4" /> Emergency Lost SIM Suspension
            </div>
            <p className="text-[11px] text-neutral-300">
              Lost your phone? Instantly disable all outgoing calls, SMS and banking OTPs to protect your accounts.
            </p>

            {actionStatus === 'sim_blocked' ? (
              <div className="p-2 bg-red-900/60 rounded text-center text-red-200 font-semibold">
                ✓ SIM Suspended. Ticket created & sent to Security Team.
              </div>
            ) : (
              <button
                onClick={handleSimBlock}
                disabled={actionStatus === 'blocking'}
                className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-4 h-4" />
                {actionStatus === 'blocking' ? 'Suspending Services...' : 'Suspend My SIM Immediately'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* 7. JIOFIBER SUPPORT */}
      {queryId === 'jiofiber_support' && (
        <div className="space-y-3">
          <div className="bg-neutral-800/70 rounded-lg p-3 border border-white/5 space-y-2">
            <div className="flex justify-between">
              <span className="text-neutral-400">Fiber Service ID:</span>
              <span className="font-mono font-bold text-white">{user.fiberId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Speed Plan:</span>
              <span className="text-cyan-400 font-semibold">300 Mbps Unlimited Fiber</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Home Gateway Status:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Online (Uptime: 14 days)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Connected Devices:</span>
              <span className="text-neutral-200">5 Active Devices</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleRouterReboot}
              disabled={actionStatus === 'rebooting'}
              className="flex-1 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/10 font-medium transition flex items-center justify-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${actionStatus === 'rebooting' ? 'animate-spin' : ''}`} />
              {actionStatus === 'rebooted' ? '✓ Reboot Signal Sent' : 'Restart Router Remotely'}
            </button>
            <button
              onClick={() => createSupportTicket('JioFiber Home Engineer Booking', 'medium')}
              className="flex-1 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition"
            >
              Book Home Technician
            </button>
          </div>
        </div>
      )}

      {/* 8. MORE OPTIONS */}
      {queryId === 'more_options' && (
        <div className="space-y-2">
          <p className="text-neutral-300">Additional services and specialized assistance:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => createSupportTicket('International Roaming Pack Inquiry', 'low')}
              className="p-2.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 border border-white/5 text-left transition"
            >
              <span className="font-bold text-white block">✈️ Int'l Roaming</span>
              <span className="text-[10px] text-neutral-400">Packs for 150+ countries</span>
            </button>
            <button
              onClick={() => createSupportTicket('Port to Jio (MNP) Assistance', 'medium')}
              className="p-2.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 border border-white/5 text-left transition"
            >
              <span className="font-bold text-white block">🔄 Port to Jio (MNP)</span>
              <span className="text-[10px] text-neutral-400">Keep number, switch to Jio</span>
            </button>
            <button
              onClick={() => createSupportTicket('JioTunes Caller Melody Setup', 'low')}
              className="p-2.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 border border-white/5 text-left transition"
            >
              <span className="font-bold text-white block">🎵 JioTunes</span>
              <span className="text-[10px] text-neutral-400">Set caller melodies</span>
            </button>
            <button
              onClick={() => createSupportTicket('Human Executive Escalation', 'high')}
              className="p-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-left transition"
            >
              <span className="font-bold text-blue-300 block">👤 Live Human Agent</span>
              <span className="text-[10px] text-blue-200/80">Connect with customer care</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Quick Return Button */}
      <div className="pt-2 border-t border-white/10 flex justify-between items-center">
        <span className="text-[10px] text-neutral-400">Need another topic?</span>
        <button
          onClick={() => initQuickMenu(chatLanguage || 'en')}
          className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition"
        >
          <span>← Back to Quick Menu</span>
        </button>
      </div>
    </div>
  );
}

