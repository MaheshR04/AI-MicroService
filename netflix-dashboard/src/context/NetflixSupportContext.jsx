import React, { createContext, useContext, useState, useEffect } from 'react';

const NetflixSupportContext = createContext(null);

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
];

export const QUICK_MENU_ITEMS = [
  { id: 'offers_recharges', label: 'Offers & Recharges', icon: 'Tag', desc: 'Trending plans, cashback & OTT packs' },
  { id: 'plan_usage', label: 'My Plan & Usage', icon: 'PieChart', desc: 'Check 5G data balance & validity' },
  { id: 'jio_true_5g', label: 'Jio True 5G', icon: 'Zap', desc: 'Check 5G readiness & Welcome Offer' },
  { id: 'network_coverage', label: 'Network & Coverage', icon: 'Wifi', desc: 'Local tower health & signal check' },
  { id: 'jio_sim_status', label: 'Jio SIM Status', icon: 'Smartphone', desc: 'KYC status, active services & VoNR' },
  { id: 'sim_lost_puk', label: 'SIM Lost/PUK', icon: 'ShieldAlert', desc: 'Instant PUK code & emergency suspend' },
  { id: 'jiofiber_support', label: 'JioFiber Support', icon: 'Router', desc: 'Home broadband router diagnostics' },
  { id: 'more_options', label: 'More Options', icon: 'MoreHorizontal', desc: 'International roaming, eSIM & Porting' },
  { id: 'change_language', label: 'Change Chat Language', icon: 'Globe', desc: 'Switch conversation language' },
];

const INITIAL_USER = {
  name: 'Mahesh Rathod',
  phone: '9876543210',
  email: 'mahesh.rathod@example.com',
  serviceType: 'Jio True 5G (Prepaid)',
  plan: '₹349 Unlimited 5G Super Plan',
  accountNumber: 'JIO-9876543210',
  fiberId: 'JIO-FBR-884210',
  registeredDate: '12 Jan 2023',
  kycStatus: 'Verified (Biometric Aadhaar)',
  puk1: '84920153',
  puk2: '19047285',
  balance: {
    dailyRemaining: '1.68 GB / 2.0 GB',
    unlimited5G: 'Active & Uncapped',
    validityDays: '23 Days left (Expires 7 Dec)',
    smsRemaining: '98 / 100 SMS',
    voice: 'Unlimited Local + STD'
  }
};

export function NetflixSupportProvider({ children }) {
  // User profile
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('jio_netflix_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  // UI Modals
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCallingOpen, setIsCallingOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);

  // Selected language for chat (null forces the user to select language first)
  const [chatLanguage, setChatLanguage] = useState(() => {
    return localStorage.getItem('jio_chat_lang') || null;
  });

  // Active query menu selection
  const [activeQuery, setActiveQuery] = useState(null);

  // Chat message thread
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [tickets, setTickets] = useState([]);

  // Save user changes
  useEffect(() => {
    localStorage.setItem('jio_netflix_user', JSON.stringify(user));
  }, [user]);

  // Save language changes
  useEffect(() => {
    if (chatLanguage) {
      localStorage.setItem('jio_chat_lang', chatLanguage);
    }
  }, [chatLanguage]);

  // When chat opens: if no language is selected, initialize with language prompt!
  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      if (!chatLanguage) {
        initLanguagePrompt();
      } else {
        initQuickMenu(chatLanguage);
      }
    }
  }, [isChatOpen]);

  /**
   * Step 1: Prompt user to choose language
   */
  const initLanguagePrompt = () => {
    setMessages([
      {
        id: 'msg_welcome_lang',
        sender: 'system',
        type: 'language_prompt',
        text: `Welcome to **Jio Care Support** on Netflix! 👋\n\nPlease select your preferred language to continue / जारी रखने के लिए कृपया अपनी पसंदीदा भाषा चुनें:`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  /**
   * Handle Language Selection
   */
  const handleSelectLanguage = (langCode) => {
    setChatLanguage(langCode);
    const selectedObj = SUPPORTED_LANGUAGES.find(l => l.code === langCode) || SUPPORTED_LANGUAGES[0];

    // User message showing choice
    const userMsg = {
      id: `msg_user_lang_${Date.now()}`,
      sender: 'user',
      text: `Selected Language: ${selectedObj.native} (${selectedObj.name}) ${selectedObj.flag}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);

    // Send Quick Menu in that language
    setIsTyping(true);
    setTimeout(() => {
      initQuickMenu(langCode);
      setIsTyping(false);
    }, 400);
  };

  /**
   * Step 2: Show Quick Menu
   */
  const initQuickMenu = (langCode) => {
    const greetings = {
      en: `Great! Continuing in **English**. How can we help you today with your Jio & Netflix services?\n\nPlease choose an option from the **Quick Menu** below:`,
      hi: `बहुत बढ़िया! **हिन्दी** में जारी रख रहे हैं। आज हम आपकी क्या सहायता कर सकते हैं?\n\nकृपया नीचे दिए गए **Quick Menu** में से विकल्प चुनें:`,
      mr: `उत्तम! **मराठी** मध्ये सुरू ठेवत आहोत. आज आम्ही तुम्हाला कशी मदत करू शकतो?\n\nकृपया खालील **Quick Menu** मधून एक पर्याय निवडा:`,
      gu: `સરસ! **ગુજરાતી**માં ચાલુ રાખી રહ્યા છીએ. આજે અમે તમને કેવી રીતે મદદ કરી શકીએ?\n\nકૃપા કરીને નીચેના **Quick Menu**માંથી વિકલ્પ પસંદ કરો:`,
      ta: `அருமை! **தமிழ்** மொழியில் தொடர்கிறது. இன்று நாங்கள் உங்களுக்கு எவ்வாறு உதவலாம்?\n\nதயவுசெய்து கீழே உள்ள **Quick Menu** இலிருந்து தேர்ந்தெடுக்கவும்:`,
      bn: `চমৎকার! **বাংলায়** চালিয়ে যাচ্ছি। আজ আমরা আপনাকে কীভাবে সাহায্য করতে পারি?\n\nদয়া করে নীচের **Quick Menu** থেকে একটি বিকল্প বেছে নিন:`,
      te: `చాలా బాగుంది! **తెలుగు**లో కొనసాగిస్తున్నాము. ఈరోజు మేము మీకు ఎలా సహాయపడగలము?\n\nదయచేసి క్రింది **Quick Menu** నుండి ఎంపిక చేసుకోండి:`,
      kn: `ಉತ್ತಮ! **ಕನ್ನಡ**ದಲ್ಲಿ ಮುಂದುವರಿಯುತ್ತಿದ್ದೇವೆ. ಇಂದು ನಾವು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?\n\nದಯವಿಟ್ಟು ಕೆಳಗಿನ **Quick Menu** ನಿಂದ ಆಯ್ಕೆಮಾಡಿ:`
    };

    const text = greetings[langCode] || greetings.en;

    const quickMenuMsg = {
      id: `msg_quick_menu_${Date.now()}`,
      sender: 'system',
      type: 'quick_menu',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: QUICK_MENU_ITEMS
    };

    setMessages(prev => [...prev, quickMenuMsg]);
  };

  /**
   * Trigger a Quick Menu Query
   */
  const handleSelectQuery = async (queryId) => {
    setActiveQuery(queryId);

    const item = QUICK_MENU_ITEMS.find(q => q.id === queryId);
    const itemLabel = item ? item.label : queryId;

    if (queryId === 'change_language') {
      // Re-trigger language prompt
      const userMsg = {
        id: `msg_user_${Date.now()}`,
        sender: 'user',
        text: `🌐 ${itemLabel}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMsg]);
      setChatLanguage(null);
      setTimeout(() => {
        initLanguagePrompt();
      }, 300);
      return;
    }

    // 1. Post user message
    const userMsg = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: itemLabel,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);

    // 2. Post AI response with rich query card
    setIsTyping(true);
    setTimeout(() => {
      const responseMsg = {
        id: `msg_query_res_${Date.now()}`,
        sender: 'ai',
        type: 'query_result',
        queryId: queryId,
        queryTitle: itemLabel,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, responseMsg]);
      setIsTyping(false);
    }, 500);
  };

  /**
   * Send custom user message
   */
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const aiReply = {
        id: `msg_ai_${Date.now()}`,
        sender: 'ai',
        type: 'text_reply',
        text: `Thank you for your question regarding **"${text.trim()}"**.\n\nOur system has verified your registered Jio number (+91 ${user.phone}) and active plan (${user.plan}). You can also use the Quick Menu below for instant telemetry and automated actions.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showMenuAction: true
      };
      setMessages(prev => [...prev, aiReply]);
      setIsTyping(false);
    }, 600);
  };

  /**
   * Create and Dispatch Support Ticket to Backend Server (Port 5000)
   */
  const createSupportTicket = async (subject, priority = 'medium', details = '') => {
    const payload = {
      customer: user.name,
      subject: subject || 'User Query from Netflix Portal',
      priority: priority,
      description: `Customer Mobile: ${user.phone} | Plan: ${user.plan} | Details: ${details || 'Assistance requested via web portal'}`,
      status: 'open'
    };

    try {
      const res = await fetch('http://localhost:5000/api/v1/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      const newTicket = data.data || { id: `TCK-${Date.now().toString().slice(-4)}`, ...payload };
      setTickets(prev => [newTicket, ...prev]);
      return { success: true, ticket: newTicket };
    } catch (err) {
      console.warn('Backend ticket dispatch error:', err);
      // Fallback local ticket
      const fallbackTicket = {
        id: `TCK-${Date.now().toString().slice(-4)}`,
        ...payload,
        createdAt: new Date().toISOString()
      };
      setTickets(prev => [fallbackTicket, ...prev]);
      return { success: true, ticket: fallbackTicket };
    }
  };

  return (
    <NetflixSupportContext.Provider
      value={{
        user,
        setUser,
        isChatOpen,
        setIsChatOpen,
        isCallingOpen,
        setIsCallingOpen,
        isRegisterOpen,
        setIsRegisterOpen,
        selectedShow,
        setSelectedShow,
        chatLanguage,
        setChatLanguage,
        handleSelectLanguage,
        activeQuery,
        handleSelectQuery,
        messages,
        setMessages,
        isTyping,
        sendMessage,
        createSupportTicket,
        tickets,
        initQuickMenu,
        initLanguagePrompt
      }}
    >
      {children}
    </NetflixSupportContext.Provider>
  );
}

export function useNetflixSupport() {
  const context = useContext(NetflixSupportContext);
  if (!context) {
    throw new Error('useNetflixSupport must be used within a NetflixSupportProvider');
  }
  return context;
}

