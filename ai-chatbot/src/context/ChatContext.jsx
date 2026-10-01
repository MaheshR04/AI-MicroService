import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { analyzeUserQuery } from '../services/aiQueryAnalyzer.js';
import { generateChatReply } from '../services/aiChatEngine.js';
import { voiceService } from '../services/voiceService.js';

const ChatContext = createContext(null);

const INITIAL_MESSAGES = [
  {
    id: 'msg_init_1',
    sender: 'ai',
    text: "Hello! 👋 I'm **Enterprise CX Guardian AI**, your autonomous customer experience assistant.\n\nI can analyze your requests, troubleshoot technical errors, handle billing or seat refund queries, and coordinate with frontline support specialists. How can I assist you today?",
    time: 'Just now',
    model: 'Enterprise CX Guardian',
    queryAnalysis: {
      intent: 'Welcome Greeting',
      category: 'System Initialization',
      sentiment: 'Positive',
      sentimentScore: 0.9,
      urgency: 'Low',
      slaMinutes: 120,
      confidence: 99,
      entities: [],
      recommendedAction: 'Engage user & await query input',
      requiresHumanEscalation: false,
      reasoningSteps: [
        'Initialized secure autonomous customer session.',
        'Knowledge base and query analysis models loaded.',
        'Awaiting natural language input.'
      ]
    }
  }
];

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('cx_guardian_chat_history');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(''); // 'Analyzing user query...' | 'Generating intelligent response...'
  
  // Voice states
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceAutoPlay, setVoiceAutoPlay] = useState(false);
  const [activeSpeechMsgId, setActiveSpeechMsgId] = useState(null);

  // Analysis Modal state
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);

  // API Settings Modal state
  const [isApiSettingsModalOpen, setIsApiSettingsModalOpen] = useState(false);
  const [apiConfig, setApiConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('cx_guardian_api_config');
      return saved ? JSON.parse(saved) : {
        provider: 'backend', // 'backend' | 'groq' | 'gemini' | 'openai'
        apiKey: '',
        model: 'llama-3.3-70b-versatile',
        temperature: 0.3
      };
    } catch {
      return {
        provider: 'backend',
        apiKey: '',
        model: 'llama-3.3-70b-versatile',
        temperature: 0.3
      };
    }
  });

  // Friend Voice AI Tool Config
  const [friendVoiceConfig, setFriendVoiceConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('cx_guardian_friend_voice');
      return saved ? JSON.parse(saved) : {
        enabled: false,
        endpoint: '',
        apiKey: '',
        provider: 'custom_friend_ai_tool'
      };
    } catch {
      return {
        enabled: false,
        endpoint: '',
        apiKey: '',
        provider: 'custom_friend_ai_tool'
      };
    }
  });

  // Save messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cx_guardian_chat_history', JSON.stringify(messages));
    } catch (e) {
      console.warn('Could not save chat history to localStorage', e);
    }
  }, [messages]);

  // Save apiConfig to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cx_guardian_api_config', JSON.stringify(apiConfig));
    } catch (e) {
      console.warn('Could not save api config to localStorage', e);
    }
  }, [apiConfig]);

  // Save friendVoiceConfig
  useEffect(() => {
    try {
      localStorage.setItem('cx_guardian_friend_voice', JSON.stringify(friendVoiceConfig));
      voiceService.configureFriendVoiceTool(friendVoiceConfig);
    } catch (e) {
      console.warn('Could not save voice config', e);
    }
  }, [friendVoiceConfig]);

  /**
   * Main Send Message Workflow:
   * 1. Append User Message
   * 2. Analyze Query (Intent, Sentiment, Urgency, Entities, Reasoning)
   * 3. Generate AI Response
   * 4. Attach metadata & Play speech if auto-read is active
   */
  const sendMessage = async (text) => {
    const trimmed = (text || '').trim();
    if (!trimmed || isAnalyzing || isGenerating) return;

    // 1. User Message
    const userMsg = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);

    try {
      // 2. Query Understanding & Analysis
      setIsAnalyzing(true);
      setCurrentStep('Analyzing user intent, sentiment & business entities...');
      
      const analysis = await analyzeUserQuery(trimmed, apiConfig);

      // 3. Response Generation
      setIsAnalyzing(false);
      setIsGenerating(true);
      setCurrentStep('Generating contextual response with Enterprise CX Guardian AI...');

      const generationResult = await generateChatReply(
        trimmed,
        [...messages, userMsg],
        analysis,
        apiConfig
      );

      const aiMsg = {
        id: `msg_ai_${Date.now()}`,
        sender: 'ai',
        text: generationResult.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: generationResult.model,
        latencyMs: generationResult.latencyMs,
        queryAnalysis: analysis
      };

      setMessages(prev => [...prev, aiMsg]);

      // 4. Voice auto-playback if enabled
      if (voiceAutoPlay) {
        speakMessage(aiMsg.id, generationResult.reply);
      }

    } catch (error) {
      console.error('Chat processing error:', error);
      const errorMsg = {
        id: `msg_err_${Date.now()}`,
        sender: 'ai',
        text: `⚠️ An unexpected issue occurred while processing your request: "${error.message}". Please check your network or try again.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: 'System Error Fallback',
        queryAnalysis: {
          intent: 'System Error Handling',
          sentiment: 'Negative',
          urgency: 'High',
          confidence: 90,
          entities: [],
          recommendedAction: 'Retry request or check connection parameters',
          requiresHumanEscalation: true,
          reasoningSteps: [`Exception intercepted: ${error.message}`]
        }
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsAnalyzing(false);
      setIsGenerating(false);
      setCurrentStep('');
    }
  };

  /**
   * Voice Input Toggle
   */
  const toggleListening = (onTranscriptReceived) => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      voiceService.startListening({
        onTranscript: (transcript, isFinal) => {
          if (onTranscriptReceived) onTranscriptReceived(transcript, isFinal);
        },
        onError: (err) => {
          console.warn('Voice listening error:', err);
          setIsListening(false);
        },
        onEnd: () => {
          setIsListening(false);
        }
      });
    }
  };

  /**
   * Speak Message Audio Out
   */
  const speakMessage = (msgId, text) => {
    if (isSpeaking && activeSpeechMsgId === msgId) {
      voiceService.stopSpeaking();
      setIsSpeaking(false);
      setActiveSpeechMsgId(null);
      return;
    }

    voiceService.stopSpeaking();
    setActiveSpeechMsgId(msgId);
    setIsSpeaking(true);

    voiceService.speakText(text, {
      onStart: () => {
        setIsSpeaking(true);
        setActiveSpeechMsgId(msgId);
      },
      onEnd: () => {
        setIsSpeaking(false);
        setActiveSpeechMsgId(null);
      }
    });
  };

  /**
   * Clear Chat History
   */
  const clearChat = () => {
    voiceService.stopSpeaking();
    setMessages(INITIAL_MESSAGES);
    try {
      localStorage.removeItem('cx_guardian_chat_history');
    } catch {}
  };

  /**
   * Export Chat Transcript
   */
  const exportChat = () => {
    const transcript = messages.map(m => `[${m.time}] ${m.sender.toUpperCase()}: ${m.text}`).join('\n\n');
    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cx_guardian_chat_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  /**
   * Modal triggers
   */
  const openAnalysisModal = (analysis) => {
    setSelectedAnalysis(analysis);
    setIsAnalysisModalOpen(true);
  };

  const closeAnalysisModal = () => {
    setIsAnalysisModalOpen(false);
    setSelectedAnalysis(null);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isAnalyzing,
        isGenerating,
        currentStep,
        sendMessage,
        clearChat,
        exportChat,
        // Modal states
        selectedAnalysis,
        isAnalysisModalOpen,
        openAnalysisModal,
        closeAnalysisModal,
        // API settings
        apiConfig,
        setApiConfig,
        isApiSettingsModalOpen,
        setIsApiSettingsModalOpen,
        // Voice
        isListening,
        isSpeaking,
        voiceAutoPlay,
        setVoiceAutoPlay,
        activeSpeechMsgId,
        toggleListening,
        speakMessage,
        friendVoiceConfig,
        setFriendVoiceConfig
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within a ChatProvider');
  return context;
};
