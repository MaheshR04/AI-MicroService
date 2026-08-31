import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  Headphones, 
  LayoutDashboard,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('manager'); // 'manager' | 'agent'
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('manager@company.com');
  const [password, setPassword] = useState('password123');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Role configuration presets (Manager vs Human Support Agent ONLY)
  const rolePresets = {
    manager: {
      title: 'Manager / Supervisor',
      badge: 'Executive Level',
      badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200',
      icon: LayoutDashboard,
      defaultEmail: 'manager@company.com',
      defaultPass: 'password123',
      redirectUrl: '/dashboard',
      description: 'Supervise live AI resolution metrics, team queues, SLA breaches, and solved/pending analytics.'
    },
    agent: {
      title: 'Customer Support Agent',
      badge: 'Human Supporter Desk',
      badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200',
      icon: Headphones,
      defaultEmail: 'agent@company.com',
      defaultPass: 'password123',
      redirectUrl: '/agent-dashboard',
      description: 'Human triage desk for Normal vs High/Critical escalations, live ticket responses, and manager handoffs.'
    }
  };

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    setEmail(rolePresets[roleKey].defaultEmail);
    setPassword(rolePresets[roleKey].defaultPass);
    setErrorMessage('');
  };

  const handleFillDemo = () => {
    setEmail(rolePresets[selectedRole].defaultEmail);
    setPassword(rolePresets[selectedRole].defaultPass);
    setErrorMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      // Validate credentials against AuthContext
      const session = await login(email, password, selectedRole);
      
      // Determine destination
      const fromPath = location.state?.from?.pathname;
      const targetRoute = fromPath || rolePresets[session.role].redirectUrl;
      navigate(targetRoute, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex overflow-hidden font-sans">
      
      {/* LEFT COLUMN: BRAND VISUAL PANEL */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1E293B] text-slate-300 flex-col justify-between p-12 relative overflow-hidden">
        
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -ml-40 -mb-40"></div>
        
        <div className="z-10 flex items-center gap-3">
          <div className="bg-primary flex items-center justify-center p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-white text-lg tracking-tight">
            CX Guardian AI
          </span>
        </div>

        <div className="z-10 max-w-md space-y-6">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
              Enterprise Secure Access
            </span>
            <h2 className="text-3xl font-extrabold text-white leading-tight mt-3 mb-2 tracking-tight">
              Enterprise Customer Support & Management Platform.
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Log in with verified credentials to manage customer escalations, supervise AI resolution workflows, or resolve customer tickets in real-time.
            </p>
          </div>

          {/* Current selected role card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Portal</span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${rolePresets[selectedRole].badgeColor}`}>
                {rolePresets[selectedRole].badge}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              {rolePresets[selectedRole].description}
            </p>
          </div>
        </div>

        <div className="z-10 flex justify-between items-center text-[10px] text-slate-500 font-semibold tracking-wider uppercase border-t border-slate-800 pt-6">
          <span>Enterprise Secure Portal</span>
          <span>Authentication Gateway v2.2</span>
        </div>

      </div>

      {/* RIGHT COLUMN: LOGIN FORM & ROLE SELECTION */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 bg-white dark:bg-slate-900 py-10 overflow-y-auto">
        <div className="max-w-md w-full mx-auto space-y-6">
          
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Sign In to Your Workspace
            </h1>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">
              Authentication required. Enter valid credentials to proceed.
            </p>
          </div>

          {/* ERROR NOTIFICATION BANNER */}
          {errorMessage && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-start gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold block">Authentication Failed</span>
                <span className="text-[11px]">{errorMessage}</span>
              </div>
            </div>
          )}

          {/* ROLE SELECTOR CARDS (ONLY 2 ROLES: MANAGER & SUPPORT AGENT) */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Choose Workspace Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(rolePresets).map((roleKey) => {
                const role = rolePresets[roleKey];
                const Icon = role.icon;
                const isSelected = selectedRole === roleKey;

                return (
                  <button
                    key={roleKey}
                    type="button"
                    onClick={() => handleRoleSelect(roleKey)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-primary bg-blue-50/70 dark:bg-blue-950/40 shadow-sm ring-2 ring-primary/40'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg ${
                        isSelected ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                        {role.title}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        {roleKey === 'manager' ? 'Executive Overview' : 'Ticket Triage Desk'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* EMAIL */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {rolePresets[selectedRole].title} Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-9 pr-4 py-2.5 rounded-lg text-xs outline-none focus:border-primary focus:bg-white dark:focus:bg-slate-900 dark:text-slate-100 transition-colors"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-[10px] text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <KeyRound className="w-3 h-3" /> Autofill Demo Pass
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-9 pr-10 py-2.5 rounded-lg text-xs outline-none focus:border-primary focus:bg-white dark:focus:bg-slate-900 dark:text-slate-100 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* VALID CREDENTIALS HELPER HINT */}
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-lg text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Valid Credentials:</span>
              <span className="font-mono text-[10px] text-slate-700 dark:text-slate-300 font-semibold">
                {selectedRole === 'manager' ? 'manager@company.com / password123' : 'agent@company.com / password123'}
              </span>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 text-white text-xs font-bold py-3 rounded-lg shadow-sm shadow-blue-500/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isLoading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  Sign In to {rolePresets[selectedRole].title} <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* FOOTER: REGISTER NEW ACCOUNT */}
          <div className="text-center pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Need a new staff or manager account? </span>
            <Link to="/register" className="text-[11px] text-primary hover:underline font-bold inline-flex items-center gap-1">
              <UserPlus className="w-3.5 h-3.5" /> Register Account
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
