/**
 * System-wide constants for Enterprise CX Guardian AI
 */
module.exports = {
  TICKET_STATUS: {
    OPEN: 'Open',
    PENDING: 'Pending',
    RESOLVED: 'Resolved',
    ESCALATED: 'Escalated',
    CRITICAL: 'Critical'
  },
  
  TICKET_PRIORITY: {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    URGENT: 'Urgent'
  },

  USER_ROLES: {
    ADMIN: 'Admin',
    AGENT: 'Agent',
    CUSTOMER: 'Customer'
  },

  SLA_THRESHOLDS: {
    STANDARD: 24, // hours
    GOLD: 2,       // hours
    PLATINUM: 1    // hour
  },

  REFUND_LIMITS: {
    AUTO_MAX: 500, // USD maximum auto-refund limit
  }
};
