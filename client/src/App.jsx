import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ChatPage from './pages/ChatPage';
import Customer360 from './pages/Customer360';
import TicketManagement from './pages/TicketManagement';
import SupportAgentDashboard from './pages/SupportAgentDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import SettingsPage from './pages/SettingsPage';
import WorkflowBuilder from './pages/WorkflowBuilder';
import ReasoningHub from './pages/ReasoningHub';
import AgentMonitor from './pages/AgentMonitor';
import TicketsWorkspace from './pages/TicketsWorkspace';
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
                {/* Public Marketing / Auth Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Authenticated Protected Enterprise Console */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<AppLayout />}>
                    
                    {/* MANAGER EXCLUSIVE ROUTES */}
                    <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
                      <Route path="/dashboard" element={<ManagerDashboard />} />
                      <Route path="/analytics" element={<AnalyticsDashboard />} />
                      <Route path="/tickets" element={<TicketManagement />} />
                      <Route path="/agents" element={<AgentMonitor />} />
                      <Route path="/builder" element={<WorkflowBuilder />} />
                      <Route path="/reasoning" element={<ReasoningHub />} />
                    </Route>

                    {/* SUPPORT AGENT EXCLUSIVE ROUTES */}
                    <Route element={<ProtectedRoute allowedRoles={['agent']} />}>
                      <Route path="/agent-dashboard" element={<SupportAgentDashboard />} />
                      <Route path="/workspace" element={<TicketsWorkspace />} />
                    </Route>

                    {/* SHARED OPERATIONAL TOOLS */}
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/customer360" element={<Customer360 />} />
                    <Route path="/settings" element={<SettingsPage />} />

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
