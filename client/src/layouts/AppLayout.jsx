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
  HelpCircle,
  BarChart4,
  Ticket,
  MessageSquare,
  Sun,
  Moon,
  LogOut,
  User
} from 'lucide-react';

export default function AppLayout() {
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
        return 'Executive Overview';
      case '/chat':
        return 'AI Assistant Conversation';
      case '/customer360':
        return 'Customer 360 Profile';
      case '/tickets':
        return 'Ticket Management Panel';
      case '/analytics':
        return 'Performance Analytics';
      case '/settings':
        return 'Platform Settings';
      default:
        return 'Console Console';
    }
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/chat', label: 'AI Assistant', icon: MessageSquare },
    { to: '/customer360', label: 'Customer 360', icon: UserCheck },
    { to: '/tickets', label: 'Tickets', icon: Ticket },
    { to: '/analytics', label: 'Analytics', icon: BarChart4 },
    { to: '/settings', label: 'Settings', icon: Settings2 },
  ];

  return (
    <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-200 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* SIDEBAR NAVIGATION */}
      <aside 
        className={`bg-[#1E293B] text-slate-300 flex flex-col justify-between transition-all duration-300 relative border-r border-slate-800 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div>
          {/* Logo Brand area */}
          <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-800">
            <div className="bg-primary flex items-center justify-center p-2 rounded-lg text-white shadow-lg shadow-blue-500/20 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-base tracking-tight leading-tight">
                  CX GUARDIAN AI
                </span>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                  Enterprise Autopilot
                </span>
              </div>
            )}
          </div>

          {/* Navigation links */}
          <nav className="mt-6 px-3 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-primary text-white shadow-md shadow-blue-500/10' 
                        : 'hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer area */}
        <div className="p-3 border-t border-slate-800">
          <div className={`flex items-center gap-3 p-2 rounded-lg bg-slate-900/50 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white uppercase">
                AD
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-accentemerald border border-slate-900 rounded-full"></span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-white truncate">Admin Console</span>
                <span className="text-[10px] text-slate-400 truncate">guardian@company.com</span>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar collapse button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3.5 top-6 bg-[#1E293B] border border-slate-800 text-slate-400 hover:text-white p-1 rounded-full shadow-md z-50 cursor-pointer hidden md:block"
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* TOP NAVBAR */}
        <header className={`h-16 border-b flex items-center justify-between px-6 shrink-0 z-40 transition-colors ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-4">
            <h2 className={`text-lg font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {getPageTitle()}
            </h2>
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-emerald-50 text-accentemerald rounded-full border border-emerald-100 text-xs font-semibold">
              <span className="w-1.5 h-1.5 bg-accentemerald rounded-full animate-ping"></span>
              Autopilot Active
            </div>
          </div>

          <div className="flex items-center gap-4">
            
            {/* SEARCH */}
            <div className="relative hidden md:block w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search resources, logs..."
                className={`w-full border pl-9 pr-4 py-1.5 rounded-lg text-xs outline-none transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-700 text-white focus:bg-slate-800/80 focus:border-primary' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-primary'
                }`}
              />
            </div>

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                isDarkMode ? 'border-slate-800 text-yellow-400' : 'border-slate-200 text-slate-500'
              }`}
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* NOTIFICATIONS */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-full border cursor-pointer transition-colors relative ${
                  isDarkMode ? 'border-slate-800 text-slate-400 hover:bg-slate-800' : 'border-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accentred rounded-full"></span>
                )}
              </button>

              {showNotifications && (
                <div className={`absolute right-0 mt-2 w-80 border rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 shadow-black/40' : 'bg-white border-slate-200 text-slate-800'
                }`}>
                  <div className="px-4 py-1.5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <span className="text-xs font-bold">System Alerts</span>
                    <button 
                      onClick={() => setNotifications([])}
                      className="text-[10px] text-primary hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-6 text-center text-xs text-slate-400">
                        No active alerts
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div key={notif.id} className="px-4 py-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 border-b border-slate-50 dark:border-slate-800 last:border-b-0 flex items-start gap-2.5">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                            notif.type === 'success' ? 'bg-accentemerald' : 'bg-accentorange'
                          }`}></span>
                          <span className="text-[11px] leading-normal">{notif.text}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className={`h-6 w-px ${isDarkMode ? 'bg-slate-850' : 'bg-slate-200'}`}></div>

            {/* PROFILE MENU */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white uppercase">
                  AD
                </div>
              </button>

              {showProfileMenu && (
                <div className={`absolute right-0 mt-2 w-48 border rounded-xl shadow-xl py-1 z-50 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-350 shadow-black/40' : 'bg-white border-slate-200 text-slate-800'
                }`}>
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold block">Administrator</span>
                    <span className="text-[9px] text-slate-400 block">guardian@company.com</span>
                  </div>
                  
                  <NavLink 
                    to="/settings" 
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" /> My Profile
                  </NavLink>
                  
                  <NavLink 
                    to="/login" 
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-800 text-accentred transition-colors border-t border-slate-105 dark:border-slate-800"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </NavLink>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* CONTAINER FOR OUTLET */}
        <main className={`flex-1 overflow-y-auto p-6 ${
          isDarkMode ? 'bg-slate-950' : 'bg-slate-50'
        }`}>
          <Outlet />
        </main>
      </div>

    </div>
  );
}
