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
  AlertCircle,
  KeyRound,
  UserPlus,
  Zap,
  Inbox
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('agent@company.com');
  const [password, setPassword] = useState('password123');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleFillDemo = () => {
    setEmail('agent@company.com');
    setPassword('password123');
    setErrorMessage('');
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      // Validate credentials strictly as Customer Support Agent
      await login(email, password, 'agent');
      
      // Determine destination: strictly to /agent-dashboard
      const fromPath = location.state?.from?.pathname;
      const targetRoute = (fromPath && fromPath !== '/dashboard') ? fromPath : '/agent-dashboard';
      navigate(targetRoute, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please verify agent credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    setEmail('agent@company.com');
    setPassword('password123');
    setErrorMessage('');
    setIsLoading(true);
    try {
      await login('agent@company.com', 'password123', 'agent');
      navigate('/agent-dashboard', { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed.');
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
          <div>
            <span className="font-extrabold text-white text-lg tracking-tight block">
              CX GUARDIAN AI
            </span>
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">
              Customer Support Desk
            </span>
          </div>
        </div>

        <div className="z-10 max-w-md space-y-6">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
              Frontline Resolver Portal
            </span>
            <h2 className="text-3xl font-extrabold text-white leading-tight mt-3 mb-2 tracking-tight">
              Customer Support Triage & Resolver Workspace.
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Resolve live customer inquiries, triage priority tickets, compose AI-assisted answers, and manage incident escalations in real-time.
            </p>
          </div>

          {/* Agent active profile badge */}
          <div className="bg-slate-900/80 border border-blue-900/40 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Default Support Agent</span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-blue-950/80 text-blue-300 border-blue-800/60">
                🎧 Alex Morgan
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Tier-2 Support Specialist • Enterprise AI Corp
            </p>
          </div>
        </div>

        <div className="z-10 flex justify-between items-center text-[10px] text-slate-500 font-semibold tracking-wider uppercase border-t border-slate-800 pt-6">
          <span>Frontline Agent Gateway</span>
          <span>Authentication Portal v2.2</span>
        </div>

      </div>

      {/* RIGHT COLUMN: AGENT LOGIN FORM (NO MANAGER OPTIONS) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 bg-white dark:bg-slate-900 py-10 overflow-y-auto">
        <div className="max-w-md w-full mx-auto space-y-6">
          
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-300 rounded-full text-[10px] font-bold mb-3 uppercase tracking-wider">
              🎧 Customer Support Desk
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Sign In to Support Desk
            </h1>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">
              Enter your verified support specialist credentials to access ticket triage.
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

          {/* QUICK DEMO ONE-CLICK LOGIN BUTTON */}
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Instant Demo Sign In as Alex Morgan (Support Agent)</span>
          </button>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* EMAIL */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Support Agent Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="agent@company.com"
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

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-hover disabled:bg-slate-400 text-white text-xs font-bold py-3 rounded-lg shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Authenticating Support Agent...</span>
                </>
              ) : (
                <>
                  <Headphones className="w-4 h-4" />
                  <span>Sign In to Customer Support Desk</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* REGISTER LINK */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Need a new support agent account?{' '}
              <Link to="/register" className="text-primary font-bold hover:underline">
                Register Account
              </Link>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
