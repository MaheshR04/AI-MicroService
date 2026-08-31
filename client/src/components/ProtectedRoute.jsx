import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs text-slate-400 font-medium">Verifying authorization...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page and preserve the attempt location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
