import React from 'react';
import { 
  Smile, 
  Ticket, 
  Calendar, 
  TrendingUp, 
  FolderOpen,
  ArrowUpRight,
  TrendingDown,
  Activity
} from 'lucide-react';

export default function AnalyticsDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* HEADER SECTION */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white">CX Performance Analytics</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">Real-time automation benchmarks, volume insights, and customer health metrics</p>
      </div>

      {/* CHARTS CONTAINER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CHART 1: SENTIMENT DISTRIBUTION */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                <Smile className="w-4 h-4 text-primary" /> Sentiment Distribution
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Average customer tone parsed via NLP algorithms</p>
            </div>
            <span className="text-[10px] text-accentemerald bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full font-bold">
              96.8% CSAT
            </span>
          </div>

          <div className="space-y-3.5">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
                <span>Positive (Encouraging / Satisfied)</span>
                <span className="text-accentemerald">75%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-accentemerald rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
                <span>Neutral (General Queries / Billing Inquiry)</span>
                <span className="text-slate-500">20%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-slate-400 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
                <span>Critical / High Churn Alert (Frustrated)</span>
                <span className="text-accentred">5%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-accentred rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* CHART 2: TICKET STATUS */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-purple-600" /> Ticket Status Distribution
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Live counts mapped by processing states</p>
            </div>
            <span className="text-[10px] text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-full font-bold">
              14,290 Total
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2.5 pt-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-center border border-slate-100 dark:border-slate-800">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Resolved</span>
              <span className="text-sm font-extrabold text-accentemerald block mt-1">12,366</span>
              <span className="text-[8px] text-slate-400 block mt-1">Auto-closed</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-center border border-slate-100 dark:border-slate-800">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Open</span>
              <span className="text-sm font-extrabold text-primary block mt-1">1,358</span>
              <span className="text-[8px] text-slate-400 block mt-1">Queue filter</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-center border border-slate-100 dark:border-slate-800">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Escalated</span>
              <span className="text-sm font-extrabold text-accentred block mt-1">512</span>
              <span className="text-[8px] text-slate-400 block mt-1">Tier 2 queue</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-center border border-slate-100 dark:border-slate-800">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Critical</span>
              <span className="text-sm font-extrabold text-accentorange block mt-1">54</span>
              <span className="text-[8px] text-slate-400 block mt-1">Takeover run</span>
            </div>
          </div>
        </div>

        {/* CHART 3: WEEKLY PERFORMANCE (MON-FRI BAR CHART) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-accentorange" /> Weekly Performance (Resolved Volume)
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Daily autonomous resolution counts</p>
          </div>

          <div className="h-40 flex items-end justify-between pt-6 px-4 border-b border-slate-100 dark:border-slate-800">
            {/* Monday */}
            <div className="flex flex-col items-center w-8 group">
              <div className="w-full bg-slate-200 group-hover:bg-primary rounded-t-md transition-colors" style={{ height: '70px' }}></div>
              <span className="text-[9px] text-slate-400 font-semibold mt-2">Mon</span>
            </div>
            {/* Tuesday */}
            <div className="flex flex-col items-center w-8 group">
              <div className="w-full bg-slate-200 group-hover:bg-primary rounded-t-md transition-colors" style={{ height: '110px' }}></div>
              <span className="text-[9px] text-slate-400 font-semibold mt-2">Tue</span>
            </div>
            {/* Wednesday */}
            <div className="flex flex-col items-center w-8 group">
              <div className="w-full bg-primary rounded-t-md transition-colors" style={{ height: '135px' }}></div>
              <span className="text-[9px] text-slate-400 font-semibold mt-2 font-bold text-primary">Wed</span>
            </div>
            {/* Thursday */}
            <div className="flex flex-col items-center w-8 group">
              <div className="w-full bg-slate-200 group-hover:bg-primary rounded-t-md transition-colors" style={{ height: '95px' }}></div>
              <span className="text-[9px] text-slate-400 font-semibold mt-2">Thu</span>
            </div>
            {/* Friday */}
            <div className="flex flex-col items-center w-8 group">
              <div className="w-full bg-slate-200 group-hover:bg-primary rounded-t-md transition-colors" style={{ height: '120px' }}></div>
              <span className="text-[9px] text-slate-400 font-semibold mt-2">Fri</span>
            </div>
          </div>
        </div>

        {/* CHART 4: CUSTOMER GROWTH (MONTHLY ADOPTION STACKS) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-sky-600" /> Customer Growth Metrics
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Monthly enterprise registration additions</p>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-accentemerald font-bold">
              +14.2% Growth
            </div>
          </div>

          <div className="h-40 flex items-end justify-between pt-6 px-4 border-b border-slate-100 dark:border-slate-800">
            {/* May */}
            <div className="flex flex-col items-center w-8 group">
              <div className="w-full bg-slate-200 group-hover:bg-sky-500 rounded-t-md transition-colors" style={{ height: '50px' }}></div>
              <span className="text-[9px] text-slate-400 font-semibold mt-2">May</span>
            </div>
            {/* June */}
            <div className="flex flex-col items-center w-8 group">
              <div className="w-full bg-slate-200 group-hover:bg-sky-500 rounded-t-md transition-colors" style={{ height: '80px' }}></div>
              <span className="text-[9px] text-slate-400 font-semibold mt-2">Jun</span>
            </div>
            {/* July */}
            <div className="flex flex-col items-center w-8 group">
              <div className="w-full bg-slate-200 group-hover:bg-sky-500 rounded-t-md transition-colors" style={{ height: '110px' }}></div>
              <span className="text-[9px] text-slate-400 font-semibold mt-2">Jul</span>
            </div>
            {/* August */}
            <div className="flex flex-col items-center w-8 group">
              <div className="w-full bg-sky-500 rounded-t-md transition-colors" style={{ height: '145px' }}></div>
              <span className="text-[9px] text-slate-400 font-semibold mt-2 font-bold text-sky-505">Aug</span>
            </div>
          </div>
        </div>

        {/* CHART 5: COMPLAINT CATEGORIES (部門別オートメーション) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
              <FolderOpen className="w-4 h-4 text-purple-600" /> Complaint Categories & Automation Share
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Departmental ticket volume distribution rates</p>
          </div>

          <div className="space-y-3.5">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
                <span>Billing & Subscription disputes</span>
                <span className="text-slate-800 dark:text-white">42% (5,249 Tickets)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '42%' }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
                <span>DNS Config & SSL Setup Errors</span>
                <span className="text-slate-800 dark:text-white">28% (3,490 Tickets)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: '28%' }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
                <span>Security Access Lockout (Okta/MFA)</span>
                <span className="text-slate-800 dark:text-white">18% (2,240 Tickets)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-accentorange" style={{ width: '18%' }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
                <span>General Workspace Account Inquiries</span>
                <span className="text-slate-800 dark:text-white">12% (1,311 Tickets)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-slate-450" style={{ width: '12%' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
