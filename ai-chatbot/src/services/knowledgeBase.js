/**
 * Enterprise CX Guardian AI — Domain Knowledge Base
 * Supplies fast retrieval context, FAQ answers, refund policies,
 * and escalation rules for customer support inquiries.
 */

export const FAQ_KNOWLEDGE = [
  {
    topic: 'Refund & Seat Cancellation',
    keywords: ['refund', 'seat', 'cancel', 'subscription', 'billing', 'charge', 'money', 'credit'],
    summary: 'Refund policy covers accidental seat adds within 14 days. Reverts active directory seats and refunds via original payment gateway.',
    resolution: 'We can reverse accidental team seat additions made within the last 14 days. Our billing system triggers an automated Stripe refund and synchronizes your active directory licenses immediately.'
  },
  {
    topic: 'API 500 & Webhook Failures',
    keywords: ['api', '500', 'webhook', 'error', 'failed', 'timeout', 'gateway', 'endpoint', 'server error'],
    summary: 'Troubleshooting for API 500 Internal Server Errors and dead-letter webhook retries.',
    resolution: 'For API 500 errors on webhooks: Ensure your endpoint responds with HTTP 200 within 5 seconds. If timeouts occur, verify idempotency keys in payload headers. Our gateway automatically retries up to 3 times with exponential backoff.'
  },
  {
    topic: 'Invoice Double Billing',
    keywords: ['invoice', 'double', 'billed', 'duplicate', 'overcharge', 'receipt', '#inv-'],
    summary: 'Resolves duplicate subscription invoices or pending pre-authorization holds.',
    resolution: 'Double billing usually happens if a payment retry overlaps with a billing cycle refresh. Any duplicate charge is voided automatically within 24-48 hours, or our billing agent can issue a manual instant credit.'
  },
  {
    topic: 'Human Agent Escalation',
    keywords: ['human', 'agent', 'supervisor', 'manager', 'person', 'support rep', 'representative', 'talk to someone'],
    summary: 'Policy and automated routing to escalate chat to frontline Support Specialist or Operations Manager.',
    resolution: 'I have logged your request in the live queue for our Support Specialists and Operations Supervisors. A specialist is being assigned with high priority.'
  }
];

export function findMatchingKnowledge(query = '') {
  const lower = query.toLowerCase();
  for (const item of FAQ_KNOWLEDGE) {
    if (item.keywords.some(k => lower.includes(k))) {
      return item;
    }
  }
  return null;
}
