/**
 * AI Query Analyzer & Context Understanding Engine
 * 
 * Deeply analyzes user requests before generating replies:
 * - Intent Detection
 * - Sentiment & Emotion Analysis
 * - Urgency & SLA Priority Level
 * - Key Entity Extraction (Invoices, Error Codes, Dollar Amounts, Emails)
 * - Reasoning Chain & Confidence Scoring
 * - Automated Action / Human Escalation Trigger
 */

import { findMatchingKnowledge } from './knowledgeBase.js';

export async function analyzeUserQuery(query, apiConfig = {}) {
  const startTime = Date.now();
  const trimmed = (query || '').trim();

  // If user provided a live LLM API Key (Groq, Gemini, OpenAI), we can perform LLM structured analysis:
  if (apiConfig.provider === 'groq' && apiConfig.apiKey) {
    try {
      const llmResult = await analyzeWithGroq(trimmed, apiConfig.apiKey, apiConfig.model);
      if (llmResult) {
        return {
          ...llmResult,
          latencyMs: Date.now() - startTime,
          analyzedVia: 'Groq LLaMA-3 Intelligence'
        };
      }
    } catch (err) {
      console.warn('Groq query analysis failed, falling back to heuristic engine:', err.message);
    }
  } else if (apiConfig.provider === 'gemini' && apiConfig.apiKey) {
    try {
      const llmResult = await analyzeWithGemini(trimmed, apiConfig.apiKey);
      if (llmResult) {
        return {
          ...llmResult,
          latencyMs: Date.now() - startTime,
          analyzedVia: 'Google Gemini 2.0 Intelligence'
        };
      }
    } catch (err) {
      console.warn('Gemini query analysis failed, falling back to heuristic engine:', err.message);
    }
  }

  // High-performance heuristic & rule-based NLP analyzer (instant, robust, offline-capable)
  const localAnalysis = performHeuristicAnalysis(trimmed);
  return {
    ...localAnalysis,
    latencyMs: Date.now() - startTime,
    analyzedVia: 'Autonomous CX Guardian Semantic Engine'
  };
}

/**
 * Heuristic NLP Query Understanding
 */
function performHeuristicAnalysis(text) {
  const lower = text.toLowerCase();
  
  // 1. Intent Detection
  let intent = 'General Inquiry';
  let category = 'Customer Support';
  let recommendedAction = 'Provide informative conversational response';
  let requiresHumanEscalation = false;

  if (lower.includes('refund') || lower.includes('money back') || lower.includes('accidental seat') || lower.includes('cancel seat')) {
    intent = 'Refund & Seat Reversal';
    category = 'Billing & Subscriptions';
    recommendedAction = 'Verify seat purchase date & trigger automated refund gateway';
  } else if (lower.includes('500') || lower.includes('error') || lower.includes('bug') || lower.includes('fail') || lower.includes('broken') || lower.includes('webhook')) {
    intent = 'Technical Diagnostics';
    category = 'API & Integrations';
    recommendedAction = 'Check endpoint response code, provide retry advice, & monitor logs';
  } else if (lower.includes('invoice') || lower.includes('double') || lower.includes('bill') || lower.includes('charged')) {
    intent = 'Invoice Dispute';
    category = 'Billing & Payments';
    recommendedAction = 'Audit invoice ledger, check transaction ID, & void duplicate authorizations';
  } else if (lower.includes('human') || lower.includes('agent') || lower.includes('manager') || lower.includes('supervisor') || lower.includes('talk to someone')) {
    intent = 'Human Escalation';
    category = 'Tier-2 Support';
    recommendedAction = 'Transfer conversation context to live Support Specialist queue';
    requiresHumanEscalation = true;
  } else if (lower.includes('password') || lower.includes('login') || lower.includes('2fa') || lower.includes('access')) {
    intent = 'Account Security';
    category = 'Identity & Auth';
    recommendedAction = 'Prompt 2FA reset link and check active SSO sessions';
  } else if (lower.includes('price') || lower.includes('plan') || lower.includes('upgrade') || lower.includes('cost')) {
    intent = 'Plan & Pricing';
    category = 'Sales & Growth';
    recommendedAction = 'Provide enterprise tier breakdown and seat volume discounts';
  }

  // 2. Sentiment & Emotion Analysis
  let sentiment = 'Neutral';
  let sentimentScore = 0.0;
  const negativeWords = ['angry', 'bad', 'terrible', 'worst', 'broken', 'horrible', 'delay', 'urgent', 'cancel', 'lawsuit', 'waste', 'error', 'fails'];
  const positiveWords = ['thank', 'great', 'awesome', 'quick', 'love', 'helpful', 'good', 'super', 'appreciate'];

  const negCount = negativeWords.filter(w => lower.includes(w)).length;
  const posCount = positiveWords.filter(w => lower.includes(w)).length;

  if (negCount > posCount) {
    sentiment = negCount >= 2 ? 'Frustrated' : 'Negative';
    sentimentScore = -0.4 - Math.min(negCount * 0.2, 0.5);
  } else if (posCount > negCount) {
    sentiment = 'Positive';
    sentimentScore = 0.5 + Math.min(posCount * 0.2, 0.45);
  }

  // 3. Urgency & Priority
  let urgency = 'Medium';
  let slaMinutes = 60;
  if (lower.includes('urgent') || lower.includes('asap') || lower.includes('emergency') || lower.includes('immediately') || negCount >= 2 || intent === 'Human Escalation') {
    urgency = 'High';
    slaMinutes = 15;
    if (lower.includes('broken') || lower.includes('down') || lower.includes('outage') || lower.includes('lawsuit')) {
      urgency = 'Critical';
      slaMinutes = 5;
      requiresHumanEscalation = true;
    }
  } else if (intent === 'General Inquiry' || intent === 'Plan & Pricing') {
    urgency = 'Low';
    slaMinutes = 240;
  }

  // 4. Entity Extraction (Regex)
  const entities = [];
  
  // Invoice / Ticket numbers (e.g. #INV-9102, #TK-1234)
  const invoiceMatches = text.match(/#(?:INV|inv|TK|tk|ORD|ord)-?\d+/g);
  if (invoiceMatches) {
    invoiceMatches.forEach(item => entities.push({ type: 'Invoice / Ticket ID', value: item }));
  }

  // Currency amounts ($199, $50.00, etc.)
  const currencyMatches = text.match(/\$\d+(?:\.\d{2})?/g);
  if (currencyMatches) {
    currencyMatches.forEach(item => entities.push({ type: 'Monetary Amount', value: item }));
  }

  // Seat quantities
  const seatMatches = text.match(/\b\d+\s+(?:seats?|users?|licenses?)\b/gi);
  if (seatMatches) {
    seatMatches.forEach(item => entities.push({ type: 'Seat Quantity', value: item }));
  }

  // Error codes
  const errorMatches = text.match(/\b(?:500|404|401|403|502|503)\b/g);
  if (errorMatches) {
    errorMatches.forEach(item => entities.push({ type: 'HTTP Error Code', value: item }));
  }

  // 5. Knowledge Match
  const matchedFaq = findMatchingKnowledge(text);

  // 6. Confidence Calculation
  const confidence = Math.min(0.82 + (entities.length * 0.05) + (matchedFaq ? 0.08 : 0), 0.98);

  // 7. Reasoning Steps (Chain of Thought)
  const reasoningSteps = [
    `Parsed user input (${text.length} characters) and tokenized key domain phrases.`,
    `Identified domain semantic category as "${category}" with intent "${intent}".`,
    `Evaluated customer sentiment tone: detected polarity ${sentimentScore.toFixed(2)} (${sentiment}).`,
    `Assigned urgency status "${urgency}" (Target SLA response window: ${slaMinutes}m).`,
    entities.length > 0 
      ? `Extracted ${entities.length} key business entities: ${entities.map(e => e.value).join(', ')}.`
      : `No explicit invoice or transactional entities detected; relying on contextual dialogue.`,
    matchedFaq 
      ? `Retrieved enterprise knowledge base entry: "${matchedFaq.topic}".`
      : `No static FAQ override triggered; generating adaptive autonomous response.`
  ];

  return {
    rawQuery: text,
    intent,
    category,
    sentiment,
    sentimentScore,
    urgency,
    slaMinutes,
    confidence: Math.round(confidence * 100),
    entities,
    recommendedAction,
    requiresHumanEscalation,
    matchedKnowledge: matchedFaq ? matchedFaq.topic : null,
    reasoningSteps
  };
}

/**
 * Live Analysis using Groq LLM (when API key is present)
 */
async function analyzeWithGroq(text, apiKey, modelName = 'llama-3.3-70b-versatile') {
  const prompt = `You are the Enterprise CX Guardian AI Query Analyzer. Analyze the following customer message and return ONLY a valid JSON object without markdown formatting.
Message: "${text}"

JSON Structure required:
{
  "intent": "string",
  "category": "string",
  "sentiment": "Positive" | "Neutral" | "Frustrated" | "Negative",
  "sentimentScore": number between -1.0 and 1.0,
  "urgency": "Low" | "Medium" | "High" | "Critical",
  "confidence": number between 70 and 99,
  "entities": [{"type": "string", "value": "string"}],
  "recommendedAction": "string",
  "requiresHumanEscalation": boolean,
  "reasoningSteps": ["step 1", "step 2", "step 3"]
}`;

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: modelName || 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'You are an enterprise query analysis engine that returns strict JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' }
    })
  });

  if (!res.ok) throw new Error(`Groq API returned HTTP ${res.status}`);
  const data = await res.json();
  const rawContent = data.choices[0]?.message?.content;
  return JSON.parse(rawContent);
}

/**
 * Live Analysis using Gemini API (when API key is present)
 */
async function analyzeWithGemini(text, apiKey) {
  const prompt = `Analyze this customer query and respond with valid JSON only:
"${text}"
Fields: intent, category, sentiment (Positive|Neutral|Frustrated|Negative), sentimentScore (-1 to 1), urgency (Low|Medium|High|Critical), confidence (70-99), entities array [{type, value}], recommendedAction, requiresHumanEscalation (boolean), reasoningSteps array.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' }
    })
  });

  if (!res.ok) throw new Error(`Gemini API returned HTTP ${res.status}`);
  const data = await res.json();
  const rawText = data.candidates[0]?.content?.parts[0]?.text;
  return JSON.parse(rawText);
}
