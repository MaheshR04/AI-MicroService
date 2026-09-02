import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings2, 
  Search, 
  Bell, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  UserCheck, 
  BarChart4, 
  Ticket, 
  MessageSquare, 
  Sun, 
  Moon, 
  LogOut, 
  User, 
  Cpu, 
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AppLayout() {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications] = useState([
    { id: 1, text: "Billing Guardian auto-resolved payment dispute", type: "success" },
    { id: 2, text: "Customer sentiment drop flagged on Ticket #4912", type: "warning" },
    { id: 3, text: "SLA breach risk alert for Tier-1 Enterprise account", type: "error" },
  ]);
  
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Executive Overview & Operations';
      case '/analytics':
        return 'Performance & Token Analytics';
      case '/tickets':
        return 'Ticket Dispatch Operations';
      case '/agents':
        return 'AI Autopilot Agent Monitor';
      case '/builder':
        return 'Escalation & Workflow Builder';
      case '/reasoning':
        return 'AI Reasoning & Audit Hub';
      case '/customer360':
        return 'Customer 360 Profile';
      case '/chat':
        return 'AI Assistant Lab & Prompt Sandbox';
      case '/settings':
        return 'Enterprise Platform Settings';
      default:
        return 'Manager Console';
    }
  };

  // Dedicated Manager Navigation Items
  const managerNavItems = [
    { to: '/dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { to: '/analytics', label: 'Performance Analytics', icon: BarChart4 },
    { to: '/tickets', label: 'Ticket Operations', icon: Ticket },
    { to: '/agents', label: 'AI Agent Monitor', icon: Cpu },
    { to: '/builder', label: 'Workflow Builder', icon: Sparkles },
    { to: '/reasoning', label: 'AI Reasoning Hub', icon: RefreshCw },
    { to: '/customer360', label: 'Customer 360', icon: UserCheck },
    { to: '/chat', label: 'AI Assistant Lab', icon: MessageSquare },
    { to: '/settings', label: 'Platform Settings', icon: Settings2 },
  ];

  return (
    <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-200 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* SIDEBAR NAVIGATION */}
      <aside 
        className={`bg-[#1E293B] text-slate-300 flex flex-col justify-between transition-all duration-300 relative border-r border-slate-800 shrink-0 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div>
          {/* Logo Brand area */}
          <div className="p-5 flex items-center justify-between border-b border-slate-800">
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="bg-primary flex items-center justify-center p-2 rounded-xl text-white shadow-lg shadow-blue-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-white text-sm tracking-tight block">
                    MANAGER CONSOLE
                  </span>
                  <span className="text-[10px] text-purple-400 font-bold tracking-wider uppercase block">
                    Supervisor Ops • CX Guardian
                  </span>
                </div>
              </div>
            )}
            {isCollapsed && (
              <div className="mx-auto bg-primary p-2 rounded-xl text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
            )}
            
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors hidden md:block cursor-pointer"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Supervisor Status Indicator */}
          {!isCollapsed && (
            <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Service Role</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-block mt-0.5 bg-purple-950/80 text-purple-300 border border-purple-800/60">
                  👑 MANAGER / SUPERVISOR
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] text-slate-400 font-medium">Live</span>
              </div>
            </div>
          )}

          {/* Nav Items List */}
          <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-16rem)]">
            {managerNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                      isActive 
                        ? 'bg-primary text-white shadow-md shadow-blue-500/20' 
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    } ${isCollapsed ? 'justify-center' : ''}`
                  }
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-800 space-y-2">

          {/* Authenticated User pill */}
          {!isCollapsed && user && (
            <div className="px-3 py-2 bg-slate-800/40 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                  {user.avatar || 'M'}
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-200 truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user.title || 'Manager'}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Log Out"
                className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOP HEADER */}
        <header className={`h-16 border-b flex items-center justify-between px-6 shrink-0 transition-colors ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div>
            <h1 className={`text-base font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {getPageTitle()}
            </h1>
            <p className="text-[11px] text-slate-500">
              Enterprise CX Guardian AI • Supervisor Control
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-colors ${
                isDarkMode 
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications Menu */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-xl border relative transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' 
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
              </button>

              {showNotifications && (
                <div className={`absolute right-0 mt-2 w-80 rounded-2xl shadow-xl border p-4 z-50 animate-in fade-in-50 duration-200 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                }`}>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-700/50 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider">Executive Alerts</span>
                    <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">
                      {notifications.length} New
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {notifications.map((n) => (
                      <div key={n.id} className="text-xs p-2.5 rounded-xl bg-slate-500/10 border border-slate-500/10">
                        {n.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-500/10 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                  {user?.avatar || 'SJ'}
                </div>
              </button>

              {showProfileMenu && (
                <div className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-xl border p-2 z-50 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                }`}>
                  <div className="px-3 py-2 border-b border-slate-700/50 mb-1">
                    <p className="text-xs font-bold">{user?.name || 'Sarah Jenkins'}</p>
                    <p className="text-[10px] text-slate-400">{user?.email || 'manager@company.com'}</p>
                  </div>
                  <button
                    onClick={() => { setShowProfileMenu(false); navigate('/settings'); }}
                    className="w-full text-left px-3 py-2 text-xs font-medium rounded-lg hover:bg-slate-500/10 transition-colors flex items-center gap-2"
                  >
                    <Settings2 className="w-3.5 h-3.5" /> Platform Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-rose-500 rounded-lg hover:bg-rose-500/10 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Log Out
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* OUTLET PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
