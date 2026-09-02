import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Headphones, 
  LayoutDashboard, 
  Lock,
  UserPlus
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans">
      
      {/* LANDING HEADER (ONLY SIGN IN & REGISTER IN TOP RIGHT) */}
      <header className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-16 flex items-center justify-between px-6 md:px-12 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-primary flex items-center justify-center p-2 rounded-lg text-white shadow-md shadow-blue-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-slate-900 dark:text-slate-100 tracking-tight text-base">
            Enterprise CX Guardian AI
          </span>
        </div>

        {/* TOP RIGHT: ONLY LOGIN & REGISTER */}
        <div className="flex items-center gap-3">
          <Link 
            to="/login" 
            className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors px-3 py-2"
          >
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm shadow-blue-500/10 transition-colors flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" /> Register
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 max-w-5xl mx-auto relative">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800 text-primary rounded-full text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Enterprise Customer Support & AI Escalation Engine
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1] mb-6">
          Synchronize AI First-Line, <br />
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Support Agents & Managers
          </span>
        </h1>
        
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mb-8">
          Autonomous AI resolves common queries in seconds. Complex and critical complaints seamlessly triage to human support specialists, backed by real-time supervisor escalation oversight.
        </p>

        {/* PRIMARY CTA BUTTONS */}
        <div className="flex items-center gap-3 mb-12">
          <Link
            to="/login"
            className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-6 py-3.5 rounded-lg shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Lock className="w-4 h-4" /> Sign In to Access Console <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/register"
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold px-5 py-3.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" /> Register Organization
          </Link>
        </div>

        {/* 2-PORTAL WORKSPACE ENTRY CARDS (MANAGER & SUPPORT AGENT ONLY) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-12">
          
          {/* PORTAL 1: MANAGER */}
          <Link 
            to="/login" 
            className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary rounded-xl shadow-sm hover:shadow-md transition-all text-left group flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center mb-3">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                Manager Dashboard
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Supervise Solved vs Pending metrics, AI resolution performance, agent workloads, and SLA escalations.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-primary">
              Sign In to Enter <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* PORTAL 2: SUPPORT AGENT */}
          <Link 
            to="/login" 
            className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary rounded-xl shadow-sm hover:shadow-md transition-all text-left group flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-primary flex items-center justify-center mb-3">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                Customer Support Desk (Human)
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Live queue triage (Normal vs High/Critical), reply composer, canned responses, and manager escalations.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-primary">
              Sign In to Enter <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

        </div>

        {/* WORKFLOW PREVIEW DIAGRAM CARD */}
        <div className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider ml-1">
                Synchronized Escalation Architecture
              </span>
            </div>
            <span className="text-[10px] bg-blue-50 dark:bg-blue-950/40 text-primary font-bold px-2 py-0.5 rounded-full">
              Live Pipeline
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-left">
            
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">1. User Query</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block mt-1">💬 Chat & 📞 Voice</span>
              <span className="text-[10px] text-slate-400 block mt-1">Ingested via separate user app</span>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">2. First-Line AI</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block mt-1">🤖 AI Support</span>
              <span className="text-[10px] text-emerald-600 block mt-1">Auto-resolve or Ticket creation</span>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">3. Human Desk</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block mt-1">Normal vs Critical</span>
              <span className="text-[10px] text-primary block mt-1">Support Agent Workbench</span>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">4. Supervision</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block mt-1">📊 Manager Console</span>
              <span className="text-[10px] text-purple-600 block mt-1">Solved vs Pending oversight</span>
            </div>

          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-400">
        Enterprise CX Guardian AI — Production Support & Escalation Engine
      </footer>

    </div>
  );
}
