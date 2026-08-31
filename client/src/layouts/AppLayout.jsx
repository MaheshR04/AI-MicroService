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
  Headphones, 
  LogOut, 
  User, 
  Cpu, 
  Inbox,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AppLayout() {
  const { user, logout, switchRole } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Billing Guardian auto-resolved payment dispute", type: "success" },
    { id: 2, text: "Customer sentiment drop flagged on Ticket #4912", type: "warning" },
  ]);
  
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleToggleRole = () => {
    const nextRole = user?.role === 'manager' ? 'agent' : 'manager';
    switchRole(nextRole);
    if (nextRole === 'manager') {
      navigate('/dashboard');
    } else {
      navigate('/agent-dashboard');
    }
  };

  // Initialize dark mode class on render
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
      case '/agent-dashboard':
        return 'Support Agent Triage & Resolver Desk';
      case '/workspace':
        return 'Interactive Ticket Workspace';
      case '/chat':
        return user?.role === 'manager' ? 'AI Assistant Lab' : 'AI Co-Pilot Assistant';
      case '/customer360':
        return 'Customer 360 Profile';
      case '/tickets':
        return 'Ticket Dispatch Operations';
      case '/analytics':
        return 'Performance & Token Analytics';
      case '/agents':
        return 'AI Autopilot Agent Monitor';
      case '/settings':
        return user?.role === 'manager' ? 'Enterprise Platform Settings' : 'Agent Profile & Preferences';
      default:
        return 'CX Guardian Console';
    }
  };

  // 1. MANAGER NAVIGATION: Full executive oversight, analytics, and service management
  const managerNavItems = [
    { to: '/dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { to: '/analytics', label: 'Performance Analytics', icon: BarChart4 },
    { to: '/tickets', label: 'Ticket Operations', icon: Ticket },
    { to: '/agents', label: 'AI Agent Monitor', icon: Cpu },
    { to: '/customer360', label: 'Customer 360', icon: UserCheck },
    { to: '/chat', label: 'AI Assistant Lab', icon: MessageSquare },
    { to: '/settings', label: 'Platform Settings', icon: Settings2 },
  ];

  // 2. SUPPORT AGENT NAVIGATION: Frontline human support working tools ONLY
  const agentNavItems = [
    { to: '/agent-dashboard', label: 'Support Triage Desk', icon: Headphones },
    { to: '/workspace', label: 'Ticket Workspace', icon: Inbox },
    { to: '/chat', label: 'AI Co-Pilot Assistant', icon: MessageSquare },
    { to: '/customer360', label: 'Customer Lookup', icon: UserCheck },
    { to: '/settings', label: 'My Settings', icon: Settings2 },
  ];

  // Select navigation set based on authenticated user's role
  const isManager = user?.role === 'manager';
  const navItems = isManager ? managerNavItems : agentNavItems;

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
                    CX GUARDIAN AI
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block">
                    {isManager ? 'Manager Console' : 'Support Desk'}
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

          {/* Access Mode Badge & Quick Role Switcher */}
          {!isCollapsed && (
            <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Access Mode</span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                  isManager 
                    ? 'bg-purple-950/80 text-purple-300 border border-purple-800/60' 
                    : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                }`}>
                  {isManager ? '👑 MANAGER' : '🎧 SUPPORT AGENT'}
                </span>
              </div>

              {/* Instant Switch Mode Button */}
              <button
                type="button"
                onClick={handleToggleRole}
                title={`Switch to ${isManager ? 'Support Agent Desk' : 'Manager Console'}`}
                className="text-[10px] text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer font-medium"
              >
                <RefreshCw className="w-3 h-3 text-primary" />
                <span>{isManager ? 'To Agent' : 'To Manager'}</span>
              </button>
            </div>
          )}

          {/* Nav Items List */}
          <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-14rem)]">
            {navItems.map((item) => {
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

        {/* Sidebar Footer / User Profile & Logout */}
        <div className="p-3 border-t border-slate-800 space-y-2">
          
          {/* Authenticated User pill */}
          {!isCollapsed && user && (
            <div className="px-3 py-2 bg-slate-800/40 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                  {user.avatar || (user.name ? user.name.slice(0, 2).toUpperCase() : 'US')}
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-bold text-slate-200 block truncate">{user.name}</span>
                  <span className="text-[10px] text-slate-500 block truncate">{user.email}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                title="Sign Out"
                className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {isCollapsed && (
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="w-full flex justify-center text-slate-400 hover:text-red-400 p-2.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}

        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOP NAVIGATION BAR */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 z-20 shrink-0">
          
          {/* Breadcrumb / Title */}
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold text-slate-800 dark:text-slate-100">{getPageTitle()}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-accentemerald border border-emerald-100 dark:border-emerald-800 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accentemerald animate-pulse"></span>
              System Active
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            
            {/* Quick Search */}
            <div className="relative hidden sm:block w-48 lg:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input 
                type="text" 
                placeholder="Search resources, logs..." 
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-8 pr-3 py-1.5 rounded-lg text-xs outline-none focus:border-primary focus:bg-white dark:focus:bg-slate-900 transition-colors"
              />
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-3 z-50 text-xs space-y-2 animate-fade-in">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-800 dark:text-slate-100">Live Telemetry Alerts</span>
                    <span className="text-[10px] text-primary font-semibold">2 New</span>
                  </div>
                  {notifications.map(n => (
                    <div key={n.id} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                      {n.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* User Avatar & Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-8 h-8 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center shadow-sm cursor-pointer hover:ring-2 hover:ring-primary/40 transition-all"
              >
                {user?.avatar || (user?.name ? user.name.slice(0, 2).toUpperCase() : 'US')}
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-2 z-50 text-xs animate-fade-in">
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <span className="font-bold text-slate-800 dark:text-slate-100 block truncate">{user?.name}</span>
                    <span className="text-[10px] text-slate-400 block truncate">{user?.email}</span>
                    <span className="text-[9px] font-bold text-primary uppercase mt-1 block">
                      Role: {user?.role === 'manager' ? '👑 Operations Manager' : '🎧 Support Agent'}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      handleToggleRole();
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-primary font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Switch to {isManager ? 'Support Desk' : 'Manager Console'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('/settings');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-2 cursor-pointer"
                  >
                    <Settings2 className="w-3.5 h-3.5" />
                    <span>Settings & Profile</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 font-medium flex items-center gap-2 cursor-pointer border-t border-slate-100 dark:border-slate-800 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </header>

        {/* OUTLET / MAIN WORKSPACE VIEW */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-950 transition-colors">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
