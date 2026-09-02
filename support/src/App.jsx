import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import SupportAgentDashboard from './pages/SupportAgentDashboard';
import TicketsWorkspace from './pages/TicketsWorkspace';
import ChatPage from './pages/ChatPage';
import Customer360 from './pages/Customer360';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { TicketProvider } from './context/TicketContext';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <TicketProvider>
            <BrowserRouter>
              <Routes>
                {/* Public / Landing / Auth Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Authenticated Customer Support Desk */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<AppLayout />}>
                    <Route path="/agent-dashboard" element={<SupportAgentDashboard />} />
                    <Route path="/workspace" element={<TicketsWorkspace />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/customer360" element={<Customer360 />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    {/* Fallback to agent-dashboard */}
                    <Route path="/dashboard" element={<Navigate to="/agent-dashboard" replace />} />
                  </Route>
                </Route>

                {/* 404 Catch-All */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </TicketProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
