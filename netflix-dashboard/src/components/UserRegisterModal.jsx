import React, { useState } from 'react';
import { useNetflixSupport } from '../context/NetflixSupportContext';
import {
  X,
  User,
  Smartphone,
  Mail,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Server
} from 'lucide-react';

export default function UserRegisterModal() {
  const { isRegisterOpen, setIsRegisterOpen, user, setUser } = useNetflixSupport();

  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    email: user.email,
    serviceType: user.serviceType,
    plan: user.plan
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isRegisterOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      ...formData,
      accountNumber: `JIO-${formData.phone}`
    }));
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsRegisterOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-neutral-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-neutral-900 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
              👤
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Customer Registration & Account Linking</h3>
              <p className="text-[11px] text-neutral-400">Connect your Jio profile to support tickets</p>
            </div>
          </div>
          <button
            onClick={() => setIsRegisterOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          {/* Microservice Sync Banner */}
          <div className="p-2.5 bg-blue-950/40 border border-blue-500/20 rounded-xl flex items-center gap-2 text-blue-300">
            <Server className="w-4 h-4 shrink-0 text-blue-400" />
            <span className="text-[11px]">
              Profile automatically syncs with Manager Dashboard (5173) & Support Agent Desk (5174).
            </span>
          </div>

          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-neutral-300 font-medium">Customer Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Mahesh Rathod"
                className="w-full bg-neutral-900 border border-white/10 focus:border-red-600 rounded-xl px-3 py-2 text-white outline-none pl-9 transition"
              />
              <User className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Mobile Number */}
          <div className="space-y-1">
            <label className="text-neutral-300 font-medium">Jio Mobile / Account Number</label>
            <div className="relative">
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 9876543210"
                className="w-full bg-neutral-900 border border-white/10 focus:border-red-600 rounded-xl px-3 py-2 text-white outline-none pl-9 font-mono transition"
              />
              <Smartphone className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-neutral-300 font-medium">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. user@example.com"
                className="w-full bg-neutral-900 border border-white/10 focus:border-red-600 rounded-xl px-3 py-2 text-white outline-none pl-9 transition"
              />
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Service Connection Type */}
          <div className="space-y-1">
            <label className="text-neutral-300 font-medium">Primary Service Connection</label>
            <select
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="w-full bg-neutral-900 border border-white/10 focus:border-red-600 rounded-xl px-3 py-2 text-white outline-none transition"
            >
              <option value="Jio True 5G (Prepaid)">Jio True 5G (Prepaid)</option>
              <option value="Jio Postpaid Plus">Jio Postpaid Plus</option>
              <option value="JioFiber 300 Mbps Unlimited">JioFiber 300 Mbps Broadband</option>
              <option value="JioAirFiber Wireless 5G">JioAirFiber 5G Fixed Wireless</option>
            </select>
          </div>

          {/* Success Message or Submit */}
          {savedSuccess ? (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-center text-emerald-300 font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Profile Updated & Connected!
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition shadow-lg shadow-red-600/30 mt-2"
            >
              Save & Connect Account
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

