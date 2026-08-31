import React, { createContext, useContext, useState, useEffect } from 'react';

const TicketContext = createContext(null);

const INITIAL_TICKETS = [
  {
    id: 'CX-4910',
    customer: 'Jessica Chen',
    company: 'Zoom Inc.',
    email: 'jessica.c@zoom.us',
    tier: 'Enterprise Gold',
    subject: 'Double billing invoice refund request for Annual Plan',
    description: 'We were billed twice on invoice #INV-9102 for $1,499.00 on Aug 28th. Our finance team needs immediate credit note and refund.',
    category: 'Billing',
    priority: 'Critical',
    status: 'Escalated',
    sentiment: 'Negative',
    assignedTo: 'Alex Morgan (Support Agent)',
    time: '5m ago',
    slaRemaining: '25m',
    slaStatus: 'warning',
    channel: 'Chat',
    action: 'Escalated: Refund Limit Exceeded ($1,499.00)',
    messages: [
      { sender: 'customer', name: 'Jessica Chen', text: 'Hello, invoice #INV-9102 was charged twice to our corporate card. Can you process the duplicate refund immediately?', time: '12m ago' },
      { sender: 'system', name: 'AI Support', text: 'AI Support evaluated transaction. Amount exceeds standard autonomous refund threshold ($500 limit). Ticket escalated to Human Support Agent tier.', time: '10m ago' },
      { sender: 'customer', name: 'Jessica Chen', text: 'Please expedite, our CFO is waiting on the credit receipt.', time: '5m ago' }
    ],
    internalNotes: ['Refund batch verified in Stripe dashboard. Escalated to Manager for threshold override.']
  },
  {
    id: 'CX-4911',
    customer: 'David Miller',
    company: 'Stripe API Partner',
    email: 'dmiller@stripe-partner.io',
    tier: 'Platinum SLA',
    subject: 'Webhook endpoint returning 500 internal server error',
    description: 'Our webhook listener is rejecting incoming events with signature verification mismatch after the latest SDK upgrade.',
    category: 'Technical',
    priority: 'Normal',
    status: 'In Progress',
    sentiment: 'Neutral',
    assignedTo: 'Alex Morgan (Support Agent)',
    time: '18m ago',
    slaRemaining: '1h 42m',
    slaStatus: 'good',
    channel: 'Voice',
    action: 'Webhook Verification Trace Active',
    messages: [
      { sender: 'customer', name: 'David Miller', text: 'We upgraded to webhook SDK v2.4 and event signatures are failing verification. Is there a new public signing key?', time: '20m ago' },
      { sender: 'agent', name: 'Alex Morgan', text: 'Hi David, checking our webhook key rotation registry right now. One moment.', time: '14m ago' }
    ],
    internalNotes: ['Public key rotation occurred yesterday at 00:00 UTC. Need to supply updated certificate endpoint.']
  },
  {
    id: 'CX-4913',
    customer: 'Marcus Vance',
    company: 'Datadog Inc.',
    email: 'm.vance@datadoghq.com',
    tier: 'Enterprise Gold',
    subject: 'SSO SAML authentication login loop on Okta',
    description: 'Users are stuck in redirect loop between Okta IdP and Guardian portal after ACS URL switch.',
    category: 'Security',
    priority: 'Critical',
    status: 'Pending',
    sentiment: 'Negative',
    assignedTo: 'Alex Morgan (Support Agent)',
    time: '32m ago',
    slaRemaining: '40m',
    slaStatus: 'warning',
    channel: 'Chat',
    action: 'SAML Metadata Assertion Binding In Progress',
    messages: [
      { sender: 'customer', name: 'Marcus Vance', text: 'Our team is locked out due to SAML redirect error. Can you verify the EntityID?', time: '35m ago' },
      { sender: 'agent', name: 'Alex Morgan', text: 'I am inspecting your SAML metadata assertion bindings now.', time: '30m ago' }
    ],
    internalNotes: []
  },
  {
    id: 'CX-4912',
    customer: 'Sarah Jenkins',
    company: 'Microsoft Corp',
    email: 'sarah.j@microsoft.com',
    tier: 'Gold Tier',
    subject: 'Seat refund request for 5 accidental seat additions',
    description: 'Accidental seat additions deallocated and refunded.',
    category: 'Billing',
    priority: 'Normal',
    status: 'Solved',
    sentiment: 'Positive',
    assignedTo: 'Alex Morgan (Support Agent)',
    time: '1h ago',
    slaRemaining: 'Met',
    slaStatus: 'good',
    channel: 'Chat',
    action: 'Refund Issued ($199.00)',
    messages: [
      { sender: 'customer', name: 'Sarah Jenkins', text: 'Hi, I accidentally added 5 new seat slots on our subscription yesterday. Can you please revert this?', time: '1h ago' },
      { sender: 'agent', name: 'Alex Morgan', text: 'Refund of $199.00 USD processed and seat count restored to 40.', time: '58m ago' },
      { sender: 'customer', name: 'Sarah Jenkins', text: 'Thank you for the quick seat refund!', time: '55m ago' }
    ],
    internalNotes: ['Auto-synced with Stripe billing portal.']
  },
  {
    id: 'CX-4909',
    customer: 'Andrew Larson',
    company: 'Vercel Deployment',
    email: 'alarson@vercel-labs.com',
    tier: 'Standard Tier',
    subject: 'Custom domain SSL binding failure on edge node',
    description: 'Domain cert propagation delayed due to CAA DNS record restrictions.',
    category: 'Technical',
    priority: 'Normal',
    status: 'Solved',
    sentiment: 'Positive',
    assignedTo: 'Alex Morgan (Support Agent)',
    time: '2h ago',
    slaRemaining: 'Met',
    slaStatus: 'good',
    channel: 'Chat',
    action: 'Custom Domain SSL Bound',
    messages: [
      { sender: 'customer', name: 'Andrew Larson', text: 'SSL certificate verification is failing for custom subdomain.', time: '2h ago' },
      { sender: 'agent', name: 'Alex Morgan', text: 'CAA records corrected and Let\'s Encrypt certificate re-issued.', time: '1h 50m ago' }
    ],
    internalNotes: []
  }
];

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem('cx_shared_tickets');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clean up any old inconsistencies where status is Solved but priority was Critical
        return parsed.map(t => t.status === 'Solved' ? { ...t, priority: 'Normal' } : t);
      }
      return INITIAL_TICKETS;
    } catch {
      return INITIAL_TICKETS;
    }
  });

  // Save changes to localStorage so they persist across page changes & role switches
  useEffect(() => {
    try {
      localStorage.setItem('cx_shared_tickets', JSON.stringify(tickets));
    } catch (e) {
      console.error('Failed to save tickets to localStorage', e);
    }
  }, [tickets]);

  // Escalate a ticket from Support Agent to Manager
  const escalateTicket = (ticketId, agentName = 'Alex Morgan (Support Agent)') => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            priority: 'Critical',
            status: 'Escalated',
            action: `Escalated by ${agentName}: Requires Manager Review`,
            sentiment: 'Negative',
            time: 'Just now',
            internalNotes: [
              ...(t.internalNotes || []),
              `Escalated to Manager by ${agentName} at ${new Date().toLocaleTimeString()}`
            ]
          };
        }
        return t;
      })
    );
  };

  // Solve / Approve a ticket
  const solveTicket = (ticketId, agentName = 'Operations Manager') => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            status: 'Solved',
            priority: 'Normal', // Cleared from critical escalation queue
            slaRemaining: 'Met',
            action: `Resolved by ${agentName}`,
            sentiment: 'Positive',
            time: 'Just now'
          };
        }
        return t;
      })
    );
  };

  // Send a reply from Support Agent
  const addReply = (ticketId, replyText, agentName = 'Alex Morgan (Support Agent)') => {
    const newMsg = {
      sender: 'agent',
      name: agentName,
      text: replyText,
      time: 'Just now'
    };

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            status: t.status === 'Solved' ? 'Solved' : 'Pending', // Awaiting customer response
            time: 'Just now',
            messages: [...(t.messages || []), newMsg]
          };
        }
        return t;
      })
    );
  };

  // Add internal staff note
  const addInternalNote = (ticketId, noteText) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            internalNotes: [...(t.internalNotes || []), noteText]
          };
        }
        return t;
      })
    );
  };

  // Reset to sample data
  const resetTickets = () => {
    setTickets(INITIAL_TICKETS);
    localStorage.setItem('cx_shared_tickets', JSON.stringify(INITIAL_TICKETS));
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        escalateTicket,
        solveTicket,
        addReply,
        addInternalNote,
        resetTickets
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
}
export default TicketContext;
