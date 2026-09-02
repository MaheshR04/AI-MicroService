import React, { useState, useEffect } from 'react';
import { 
  Building, 
  User, 
  Coins, 
  Activity, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Search, 
  Check, 
  Tag, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  ExternalLink,
  MessageSquare,
  X
} from 'lucide-react';
import { useTickets } from '../context/TicketContext';
import { useAuth } from '../context/AuthContext';

const DEFAULT_CUSTOMERS = [
  {
    id: 'cust-1',
    name: 'Sarah Jenkins',
    title: 'VP Operations',
    company: 'Microsoft Corp',
    segment: 'Enterprise Gold Tier',
    ltv: '$154,200.00',
    nps: '9 / 10',
    csat: '4.8 / 5.0',
    status: 'Healthy',
    churnProb: '1.2%',
    activeSeats: '40 / 45',
    lastActive: '3m ago',
    integrations: ['Salesforce CRM', 'HubSpot Deals', 'Okta SAML'],
    history: [
      { type: 'Billing', desc: 'Seat refund resolved autonomously ($199.00)', time: '1h ago' },
      { type: 'Technical', desc: 'Active Directory mapping synchronized', time: '2d ago' },
      { type: 'Contract', desc: 'Enterprise Gold SLA renewed for 12 months', time: '1mo ago' }
    ]
  },
  {
    id: 'cust-2',
    name: 'Jessica Chen',
    title: 'Head of Finance',
    company: 'Zoom Inc.',
    segment: 'Enterprise Gold Tier',
    ltv: '$210,000.00',
    nps: '6 / 10',
    csat: '3.6 / 5.0',
    status: 'At Risk',
    churnProb: '14.8%',
    activeSeats: '120 / 150',
    lastActive: '5m ago',
    integrations: ['Salesforce CRM', 'Stripe Billing', 'Datadog'],
    history: [
      { type: 'Billing', desc: 'Double billing invoice refund request escalated to Manager ($1,499.00)', time: '5m ago' },
      { type: 'Account', desc: 'Annual contract tier upgrade query', time: '3w ago' }
    ]
  },
  {
    id: 'cust-3',
    name: 'David Miller',
    title: 'Lead Architect',
    company: 'Stripe API Partner',
    segment: 'Platinum SLA',
    ltv: '$340,000.00',
    nps: '10 / 10',
    csat: '4.9 / 5.0',
    status: 'Healthy',
    churnProb: '0.8%',
    activeSeats: '85 / 100',
    lastActive: '18m ago',
    integrations: ['Stripe Webhook Gateway', 'GitHub Enterprise', 'Okta SSO'],
    history: [
      { type: 'Technical', desc: 'Webhook signature verification trace active', time: '18m ago' },
      { type: 'Security', desc: 'Rotated public API signing keys', time: '1d ago' }
    ]
  },
  {
    id: 'cust-4',
    name: 'Marcus Vance',
    title: 'DevOps Lead',
    company: 'Datadog Inc.',
    segment: 'Enterprise Gold Tier',
    ltv: '$180,500.00',
    nps: '7 / 10',
    csat: '4.2 / 5.0',
    status: 'Healthy',
    churnProb: '3.5%',
    activeSeats: '60 / 60',
    lastActive: '32m ago',
    integrations: ['Okta IdP', 'Kubernetes Helm', 'AWS CloudWatch'],
    history: [
      { type: 'Security', desc: 'SSO SAML assertion loop investigated by support agent', time: '32m ago' }
    ]
  }
];

export default function Customer360() {
  const { tickets } = useTickets();
  const { user } = useAuth();

  const [customers, setCustomers] = useState(() => {
    try {
      const savedAccounts = localStorage.getItem('cx_registered_accounts');
      const accountsList = savedAccounts ? JSON.parse(savedAccounts) : [];
      
      const customAdded = localStorage.getItem('cx_custom_customers');
      const customList = customAdded ? JSON.parse(customAdded) : [];

      // Merge default customers with all registered accounts
      const merged = [...DEFAULT_CUSTOMERS, ...customList];

      accountsList.forEach(acc => {
        // If not already in merged by email or name
        const exists = merged.some(
          c => c.name.toLowerCase() === acc.name.toLowerCase() || (c.email && c.email.toLowerCase() === acc.email.toLowerCase())
        );

        if (!exists && acc.name) {
          merged.unshift({
            id: acc.id || `reg-${acc.email}`,
            name: acc.name,
            email: acc.email,
            title: acc.title || (acc.role === 'manager' ? 'Operations Manager' : 'Support Specialist'),
            company: acc.company || 'Enterprise Client',
            segment: acc.role === 'manager' ? 'Enterprise Platinum Tier' : 'Enterprise Gold Tier',
            ltv: '$145,000.00',
            nps: '9 / 10',
            csat: '4.9 / 5.0',
            status: 'Healthy',
            churnProb: '1.0%',
            activeSeats: '30 / 35',
            lastActive: 'Just now (Registered User)',
            integrations: ['Salesforce CRM', 'HubSpot Deals', 'Okta SSO'],
            history: [
              { type: 'Onboarding', desc: `User registered as ${acc.role === 'manager' ? 'Manager' : 'Support Agent'}`, time: 'Just now' }
            ]
          });
        }
      });

      return merged;
    } catch {
      return DEFAULT_CUSTOMERS;
    }
  });

  const [selectedCustomerId, setSelectedCustomerId] = useState(() => {
    // Default to the current logged-in user if present in list, otherwise first customer
    return customers[0]?.id || 'cust-1';
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustCompany, setNewCustCompany] = useState('');
  const [newCustTitle, setNewCustTitle] = useState('');
  const [newCustEmail, setNewCustEmail] = useState('');

  // Re-sync when user or storage updates
  useEffect(() => {
    try {
      const savedAccounts = localStorage.getItem('cx_registered_accounts');
      const accountsList = savedAccounts ? JSON.parse(savedAccounts) : [];
      const customAdded = localStorage.getItem('cx_custom_customers');
      const customList = customAdded ? JSON.parse(customAdded) : [];

      const merged = [...DEFAULT_CUSTOMERS, ...customList];

      accountsList.forEach(acc => {
        const exists = merged.some(
          c => c.name.toLowerCase() === acc.name?.toLowerCase() || (c.email && c.email.toLowerCase() === acc.email?.toLowerCase())
        );

        if (!exists && acc.name) {
          merged.unshift({
            id: acc.id || `reg-${acc.email}`,
            name: acc.name,
            email: acc.email,
            title: acc.title || (acc.role === 'manager' ? 'Operations Manager' : 'Support Specialist'),
            company: acc.company || 'Enterprise Client',
            segment: acc.role === 'manager' ? 'Enterprise Platinum Tier' : 'Enterprise Gold Tier',
            ltv: '$145,000.00',
            nps: '9 / 10',
            csat: '4.9 / 5.0',
            status: 'Healthy',
            churnProb: '1.0%',
            activeSeats: '30 / 35',
            lastActive: 'Just now (Registered User)',
            integrations: ['Salesforce CRM', 'HubSpot Deals', 'Okta SSO'],
            history: [
              { type: 'Onboarding', desc: `User registered as ${acc.role === 'manager' ? 'Manager' : 'Support Agent'}`, time: 'Just now' }
            ]
          });
        }
      });

      setCustomers(merged);
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!newCustName.trim() || !newCustCompany.trim()) return;

    const newCustObj = {
      id: `cust-${Date.now()}`,
      name: newCustName.trim(),
      email: newCustEmail.trim() || `${newCustName.toLowerCase().replace(/\s+/g, '.')}@${newCustCompany.toLowerCase().replace(/\s+/g, '')}.com`,
      title: newCustTitle.trim() || 'Director of Operations',
      company: newCustCompany.trim(),
      segment: 'Enterprise Gold Tier',
      ltv: '$125,000.00',
      nps: '9 / 10',
      csat: '4.8 / 5.0',
      status: 'Healthy',
      churnProb: '1.5%',
      activeSeats: '20 / 25',
      lastActive: 'Just now',
      integrations: ['Salesforce CRM', 'HubSpot Deals', 'Okta SSO'],
      history: [
        { type: 'Account Creation', desc: 'Enterprise customer profile registered in Guardian 360', time: 'Just now' }
      ]
    };

    const updated = [newCustObj, ...customers];
    setCustomers(updated);
    setSelectedCustomerId(newCustObj.id);

    try {
      const customAdded = localStorage.getItem('cx_custom_customers');
      const customList = customAdded ? JSON.parse(customAdded) : [];
      localStorage.setItem('cx_custom_customers', JSON.stringify([newCustObj, ...customList]));
    } catch (e) {
      console.error(e);
    }

    setNewCustName('');
    setNewCustCompany('');
    setNewCustTitle('');
    setNewCustEmail('');
    setShowAddModal(false);
  };

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0] || {};

  // Filter associated tickets for the selected customer
  const customerTickets = tickets.filter(t => 
    (selectedCustomer.name && t.customer.toLowerCase().includes(selectedCustomer.name.toLowerCase())) ||
    (selectedCustomer.company && t.company.toLowerCase().includes(selectedCustomer.company.toLowerCase()))
  );

  const filteredCustomerList = customers.filter(c => 
    (c.name && c.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (c.company && c.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans">
      
      {/* 360 HEADER & ACTION BAR */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-full flex items-center justify-center text-sm font-bold uppercase shadow-sm">
            {selectedCustomer.name ? selectedCustomer.name.slice(0, 2).toUpperCase() : 'US'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {selectedCustomer.name} {selectedCustomer.title ? `(${selectedCustomer.title})` : ''}
              </h3>
              {selectedCustomer.email && (
                <span className="text-[10px] text-slate-400 font-medium">({selectedCustomer.email})</span>
              )}
            </div>
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
              Company: {selectedCustomer.company}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Register Account
          </button>
          <span className="text-xs font-bold bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800 text-primary px-3 py-1 rounded-full">
            {selectedCustomer.segment || 'Enterprise Gold Tier'}
          </span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
            selectedCustomer.status === 'Healthy' 
              ? 'bg-emerald-50 text-accentemerald border-emerald-100 dark:bg-emerald-950/40' 
              : 'bg-red-50 text-accentred border-red-100 dark:bg-red-950/40'
          }`}>
            ● {selectedCustomer.status || 'Healthy'} Account
          </span>
        </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm text-left space-y-1">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Account LTV</span>
          <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{selectedCustomer.ltv || '$150,000.00'}</h3>
          <span className="text-[10px] text-slate-400 font-medium block">Annual Recurring Value</span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm text-left space-y-1">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">NPS Score</span>
          <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{selectedCustomer.nps || '9 / 10'}</h3>
          <span className="text-[10px] text-accentemerald font-medium block">Promoter Score Index</span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm text-left space-y-1">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">CSAT Rating</span>
          <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{selectedCustomer.csat || '4.8 / 5.0'}</h3>
          <span className="text-[10px] text-accentemerald font-medium block">Satisfaction score</span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm text-left space-y-1">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Churn Probability</span>
          <h3 className={`text-2xl font-extrabold ${selectedCustomer.status === 'At Risk' ? 'text-red-500' : 'text-slate-800 dark:text-slate-100'}`}>
            {selectedCustomer.churnProb || '1.2%'}
          </h3>
          <span className="text-[10px] text-slate-400 font-medium block">Predictive risk analysis</span>
        </div>
      </div>

      {/* 360 DETAILS SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CUSTOMER SELECTOR LIST (LEFT 1 COL) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider block">
                Enterprise Accounts ({filteredCustomerList.length})
              </span>
              <span className="text-[10px] text-primary font-bold">Live Synced</span>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search registered accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-8 pr-3 py-1.5 rounded-lg text-xs outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 overflow-y-auto max-h-[420px]">
            {filteredCustomerList.map(c => {
              const isSelected = c.id === selectedCustomerId;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCustomerId(c.id)}
                  className={`p-3.5 cursor-pointer text-left transition-colors ${
                    isSelected ? 'bg-blue-50/80 dark:bg-blue-950/40 border-l-4 border-primary' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{c.name}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                      c.status === 'Healthy' ? 'bg-emerald-50 text-accentemerald' : 'bg-red-50 text-accentred'
                    }`}>
                      {c.status || 'Healthy'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-0.5">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{c.company}</span>
                    {c.lastActive && (
                      <span className="text-[9px] text-slate-400">{c.lastActive}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TIMELINE & TICKETS (RIGHT 2 COLS) */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* ASSOCIATED LIVE TICKETS */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Live Associated Tickets ({customerTickets.length})</h3>
              <span className="text-[10px] text-slate-400 font-medium">Synchronized with Ticket Engine</span>
            </div>

            {customerTickets.length === 0 ? (
              <p className="text-xs text-slate-400 py-3">No active tickets for this account.</p>
            ) : (
              <div className="space-y-2">
                {customerTickets.map(t => (
                  <div key={t.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-primary">{t.id}</span>
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{t.subject}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{t.category} • Assigned to: {t.assignedTo}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                      t.status === 'Solved' ? 'bg-emerald-50 text-accentemerald border-emerald-100' :
                      t.status === 'Escalated' ? 'bg-red-50 text-accentred border-red-100' :
                      'bg-blue-50 text-primary border-blue-100'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CRM CONNECTORS */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Connected Enterprise Integrations</h3>
            <div className="grid grid-cols-3 gap-3">
              {(selectedCustomer.integrations || ['Salesforce CRM', 'HubSpot Deals', 'Okta SSO']).map((intName, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl text-center">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">{intName}</span>
                  <span className="text-[10px] text-accentemerald font-medium block mt-1">✓ Active Sync</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ADD CUSTOMER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Register New Customer / Client</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Customer Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rachel Adams"
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-xs outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Company / Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Corp"
                  value={newCustCompany}
                  onChange={(e) => setNewCustCompany(e.target.value)}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-xs outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Job Title</label>
                <input
                  type="text"
                  placeholder="e.g. VP Operations"
                  value={newCustTitle}
                  onChange={(e) => setNewCustTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-xs outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. rachel@acmecorp.com"
                  value={newCustEmail}
                  onChange={(e) => setNewCustEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-xs outline-none focus:border-primary"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-3 py-1.5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm cursor-pointer"
                >
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
