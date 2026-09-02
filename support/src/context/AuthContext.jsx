import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Default seed accounts for demo fallback
const DEFAULT_ACCOUNTS = [
  {
    id: 'usr-1',
    name: 'Sarah Jenkins',
    email: 'manager@company.com',
    password: 'password123',
    role: 'manager',
    title: 'Operations Director',
    company: 'Enterprise AI Corp',
    avatar: 'SJ'
  },
  {
    id: 'usr-2',
    name: 'Alex Morgan',
    email: 'agent@company.com',
    password: 'password123',
    role: 'agent',
    title: 'Tier-2 Support Specialist',
    company: 'Enterprise AI Corp',
    avatar: 'AM'
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('cx_auth_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const storedAccounts = localStorage.getItem('cx_registered_accounts');
      if (!storedAccounts) {
        localStorage.setItem('cx_registered_accounts', JSON.stringify(DEFAULT_ACCOUNTS));
      }
    } catch (e) {
      console.error('Failed to parse auth user from storage', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const getAccounts = () => {
    try {
      const stored = localStorage.getItem('cx_registered_accounts');
      return stored ? JSON.parse(stored) : DEFAULT_ACCOUNTS;
    } catch {
      return DEFAULT_ACCOUNTS;
    }
  };

  const login = async (email, password, expectedRole = null) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();
    let backendUser = null;
    let backendToken = null;

    // 1. Authenticate with MongoDB Atlas via Backend API
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPass })
      });

      if (response.ok) {
        const json = await response.json();
        const data = json.data || {};
        backendUser = data.user;
        backendToken = data.token;
      } else {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401 || response.status === 400) {
          throw new Error(errorData.message || 'Invalid email or password.');
        }
      }
    } catch (apiErr) {
      if (apiErr.message && !apiErr.message.includes('Failed to fetch') && !apiErr.message.includes('NetworkError')) {
        throw apiErr;
      }
      console.warn('[Auth] Backend API unreachable, falling back to local accounts:', apiErr.message);
    }

    const accounts = getAccounts();
    const matchedAccount = accounts.find(
      (acc) => acc.email.toLowerCase() === cleanEmail
    );

    if (!matchedAccount && !backendUser) {
      throw new Error(`No account registered with email '${email}'. Please register first.`);
    }

    if (matchedAccount && !backendUser && matchedAccount.password !== cleanPass) {
      throw new Error('Invalid password. Please check your credentials.');
    }

    const activeRole = expectedRole || backendUser?.role || matchedAccount?.role || 'agent';

    const authSession = {
      id: backendUser?.userId || matchedAccount?.id || `usr-${Date.now()}`,
      name: backendUser?.name || matchedAccount?.name || cleanEmail.split('@')[0],
      email: cleanEmail,
      role: activeRole,
      title: activeRole === 'manager' ? 'Operations Manager' : 'Support Specialist',
      company: backendUser?.company || matchedAccount?.company || 'Enterprise AI Corp',
      avatar: (backendUser?.name || matchedAccount?.name || cleanEmail).slice(0, 2).toUpperCase(),
      token: backendToken || matchedAccount?.token || `jwt_${Date.now()}`
    };

    setUser(authSession);
    localStorage.setItem('cx_auth_user', JSON.stringify(authSession));

    // Save to registered list in sync
    const updatedAccounts = accounts.filter(acc => acc.email.toLowerCase() !== cleanEmail);
    updatedAccounts.push({
      id: authSession.id,
      name: authSession.name,
      email: cleanEmail,
      password: cleanPass,
      role: activeRole,
      title: authSession.title,
      company: authSession.company,
      avatar: authSession.avatar
    });
    localStorage.setItem('cx_registered_accounts', JSON.stringify(updatedAccounts));

    return authSession;
  };

  const register = async ({ name, email, password, role, company }) => {
    const cleanEmail = email.trim().toLowerCase();
    const selectedRole = role || 'agent';
    let backendUser = null;
    let backendToken = null;

    // 1. Post directly to MongoDB Atlas via Backend API
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: cleanEmail,
          password: password.trim(),
          role: selectedRole,
          company: company ? company.trim() : 'Enterprise Client'
        })
      });

      if (response.ok) {
        const json = await response.json();
        const data = json.data || {};
        backendUser = data.user;
        backendToken = data.token;
        console.log('[Auth] User successfully stored in MongoDB Atlas:', backendUser);
      } else {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 409) {
          throw new Error(`An account with email "${email}" already exists. Please log in.`);
        }
        if (errorData.message) {
          throw new Error(errorData.message);
        }
      }
    } catch (apiErr) {
      if (apiErr.message && !apiErr.message.includes('Failed to fetch') && !apiErr.message.includes('NetworkError')) {
        throw apiErr;
      }
      console.warn('[Auth] Backend server connection error, storing locally:', apiErr.message);
    }

    // 2. Local persistence and user session setup
    const accounts = getAccounts();
    const existingIdx = accounts.findIndex((acc) => acc.email.toLowerCase() === cleanEmail);

    let updatedAccounts;
    let newAccount;

    if (existingIdx >= 0) {
      newAccount = {
        ...accounts[existingIdx],
        id: backendUser?.userId || accounts[existingIdx].id,
        name: name.trim() || accounts[existingIdx].name,
        password: password.trim() || accounts[existingIdx].password,
        role: selectedRole,
        title: selectedRole === 'agent' ? 'Support Agent' : 'Operations Manager',
        company: company ? company.trim() : accounts[existingIdx].company,
        avatar: (name.trim() || accounts[existingIdx].name).slice(0, 2).toUpperCase()
      };
      updatedAccounts = [...accounts];
      updatedAccounts[existingIdx] = newAccount;
    } else {
      newAccount = {
        id: backendUser?.userId || `usr-${Date.now()}`,
        name: name.trim(),
        email: cleanEmail,
        password: password.trim(),
        role: selectedRole,
        title: selectedRole === 'agent' ? 'Support Agent' : 'Operations Manager',
        company: company ? company.trim() : 'Enterprise Partner',
        avatar: name.trim().slice(0, 2).toUpperCase()
      };
      updatedAccounts = [...accounts, newAccount];
    }

    localStorage.setItem('cx_registered_accounts', JSON.stringify(updatedAccounts));

    const authSession = {
      id: newAccount.id,
      name: newAccount.name,
      email: newAccount.email,
      role: newAccount.role,
      title: newAccount.title,
      company: newAccount.company,
      avatar: newAccount.avatar,
      token: backendToken || `jwt_${Date.now()}_${newAccount.id}`
    };

    setUser(authSession);
    localStorage.setItem('cx_auth_user', JSON.stringify(authSession));
    return authSession;
  };

  const switchRole = (targetRole) => {
    if (!user) return;
    const newRole = targetRole || (user.role === 'manager' ? 'agent' : 'manager');
    const updatedUser = {
      ...user,
      role: newRole,
      title: newRole === 'manager' ? 'Operations Manager' : 'Support Specialist'
    };
    setUser(updatedUser);
    localStorage.setItem('cx_auth_user', JSON.stringify(updatedUser));

    const accounts = getAccounts();
    const updatedAccounts = accounts.map(acc => 
      acc.email.toLowerCase() === user.email.toLowerCase() ? { ...acc, role: newRole } : acc
    );
    localStorage.setItem('cx_registered_accounts', JSON.stringify(updatedAccounts));

    return newRole;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cx_auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        loading,
        login,
        register,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
