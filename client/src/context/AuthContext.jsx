import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Default seed accounts for out-of-the-box demo & validation
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

      // Initialize default accounts in storage if not set
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
    const accounts = getAccounts();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    const matchedAccount = accounts.find(
      (acc) => acc.email.toLowerCase() === cleanEmail
    );

    if (!matchedAccount) {
      throw new Error(`No account registered with email '${email}'. Please register first.`);
    }

    if (matchedAccount.password !== cleanPass) {
      throw new Error('Invalid password. Please check your credentials.');
    }

    if (expectedRole && matchedAccount.role !== expectedRole) {
      throw new Error(
        `This account is registered as a '${matchedAccount.role.toUpperCase()}', not a '${expectedRole.toUpperCase()}'. Please select the correct role tab.`
      );
    }

    const authSession = {
      id: matchedAccount.id,
      name: matchedAccount.name,
      email: matchedAccount.email,
      role: matchedAccount.role,
      title: matchedAccount.title || (matchedAccount.role === 'manager' ? 'Operations Manager' : 'Support Specialist'),
      company: matchedAccount.company || 'Enterprise AI Corp',
      avatar: matchedAccount.avatar || matchedAccount.name.slice(0, 2).toUpperCase(),
      token: `jwt_sim_${Date.now()}_${matchedAccount.id}`
    };

    setUser(authSession);
    localStorage.setItem('cx_auth_user', JSON.stringify(authSession));
    return authSession;
  };

  const register = async ({ name, email, password, role, company }) => {
    const accounts = getAccounts();
    const cleanEmail = email.trim().toLowerCase();

    if (accounts.some((acc) => acc.email.toLowerCase() === cleanEmail)) {
      throw new Error(`An account with email '${email}' already exists. Please sign in.`);
    }

    const newAccount = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password: password.trim(),
      role: role || 'manager',
      title: role === 'agent' ? 'Support Agent' : 'Operations Manager',
      company: company ? company.trim() : 'Enterprise Partner',
      avatar: name.trim().slice(0, 2).toUpperCase()
    };

    const updatedAccounts = [...accounts, newAccount];
    localStorage.setItem('cx_registered_accounts', JSON.stringify(updatedAccounts));

    // Automatically log in the registered user
    const authSession = {
      id: newAccount.id,
      name: newAccount.name,
      email: newAccount.email,
      role: newAccount.role,
      title: newAccount.title,
      company: newAccount.company,
      avatar: newAccount.avatar,
      token: `jwt_sim_${Date.now()}_${newAccount.id}`
    };

    setUser(authSession);
    localStorage.setItem('cx_auth_user', JSON.stringify(authSession));
    return authSession;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cx_auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout
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
export default AuthContext;
