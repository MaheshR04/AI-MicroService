import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Headphones, 
  Lock,
  UserPlus,
  Inbox,
  MessageSquare,
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans">
      
      {/* HEADER */}
      <header className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-16 flex items-center justify-between px-6 md:px-12 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-primary flex items-center justify-center p-2 rounded-lg text-white shadow-md shadow-blue-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900 dark:text-slate-100 tracking-tight text-base block">
              CX GUARDIAN AI
            </span>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider block">
              Customer Support Desk
            </span>
          </div>
        </div>

        {/* TOP RIGHT: LOGIN & REGISTER */}
        <div className="flex items-center gap-3">
          <Link 
            to="/login" 
            className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors px-3 py-2"
          >
            Agent Sign In
          </Link>
          <Link 
            to="/register" 
            className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm shadow-blue-500/10 transition-colors flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" /> Register Account
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 max-w-5xl mx-auto relative">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-300 rounded-full text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Frontline Resolver & AI Co-Pilot Workspace
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1] mb-6">
          Human Support Triage, AI Co-Pilot & <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
            Rapid Ticket Resolution
          </span>
        </h1>
        
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mb-8">
          Empower human support agents with live escalation queues, AI-suggested responses, rapid macro shortcuts, and unified customer history drawers.
        </p>

        {/* PRIMARY CTA BUTTON */}
        <div className="flex items-center gap-3 mb-12">
          <Link
            to="/login"
            className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-7 py-3.5 rounded-lg shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer text-sm"
          >
            <Lock className="w-4 h-4" /> Sign In to Support Desk <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/register"
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold px-5 py-3.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" /> Register Account
          </Link>
        </div>

        {/* 2 SUPPORT AGENT WORKSPACE CAPABILITY CARDS (NO MANAGER CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl mb-12">
          
          {/* PILLAR 1: SUPPORT TRIAGE DESK */}
          <Link 
            to="/login" 
            className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl shadow-sm hover:shadow-md transition-all text-left group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center mb-4">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                Support Triage Desk
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Filter Normal vs Critical escalations, dispatch canned responses, add internal team notes, and resolve high-priority incidents in seconds.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-1 text-xs font-bold text-primary">
              Access Triage Desk <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* PILLAR 2: TICKET WORKSPACE & CO-PILOT */}
          <Link 
            to="/login" 
            className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl shadow-sm hover:shadow-md transition-all text-left group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center mb-4">
                <Inbox className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                Interactive Ticket Workspace
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Full-screen customer resolution workspace with AI drafting co-pilot, customer 360 profile lookup, and instant manager escalations.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-1 text-xs font-bold text-primary">
              Launch Workspace <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

        </div>

        {/* LIVE RESOLVER METRICS PREVIEW BAR */}
        <div className="w-full max-w-2xl grid grid-cols-3 gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="text-left">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Desk Status</span>
            <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">Active / Ready</span>
          </div>
          <div className="text-left border-x border-slate-100 dark:border-slate-800 px-3">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Triage Queue</span>
            <span className="text-lg font-extrabold text-primary">Live Dispatch</span>
          </div>
          <div className="text-left pl-3">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">AI Assistance</span>
            <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">Co-Pilot v2</span>
          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-400 bg-white dark:bg-slate-900">
        Enterprise CX Guardian AI — Customer Support Desk © 2026
      </footer>
    </div>
  );
}
