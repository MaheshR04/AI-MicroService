/**
 * Voice Interaction & Audio Processing Service
 * 
 * Provides:
 * 1. Speech-to-Text (Voice Input) via Web Speech API
 * 2. Text-to-Speech (Voice Output) via Web Speech Synthesis
 * 3. EXTENSION ADAPTER FOR FRIEND'S VOICE AI TOOL:
 *    Modular plug-and-play hook architecture ready to connect
 *    any third-party or custom voice AI tool (ElevenLabs, Deepgram,
 *    OpenAI Realtime Voice, Whisper, or custom WebSocket stream).
 */

class VoiceService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.isSpeaking = false;
    this.synthesis = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.voiceAiToolConfig = {
      enabled: false,
      endpoint: '',
      apiKey: '',
      provider: 'custom_friend_ai_tool'
    };

    this.initSpeechRecognition();
  }

  /**
   * Initializes browser speech recognition
   */
  initSpeechRecognition() {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
    } else {
      console.warn('Web Speech Recognition API is not supported in this browser environment.');
    }
  }

  /**
   * Starts listening for voice input from the user's microphone
   */
  startListening({ onTranscript, onError, onEnd }) {
    if (!this.recognition) {
      if (onError) onError('Speech recognition is not supported in this browser.');
      return false;
    }

    try {
      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const currentText = finalTranscript || interimTranscript;
        if (onTranscript) onTranscript(currentText, Boolean(finalTranscript));
      };

      this.recognition.onerror = (event) => {
        this.isListening = false;
        if (onError) onError(event.error || 'Microphone error occurred.');
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (onEnd) onEnd();
      };

      this.recognition.start();
      return true;
    } catch (err) {
      console.error('Error starting voice recognition:', err);
      if (onError) onError(err.message);
      return false;
    }
  }

  /**
   * Stops listening
   */
  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  /**
   * Speaks the response aloud
   */
  speakText(text, { onStart, onEnd, pitch = 1.0, rate = 1.05 } = {}) {
    if (!this.synthesis) return false;

    // Check if custom friend's AI voice tool should handle synthesis
    if (this.voiceAiToolConfig.enabled) {
      return this.synthesizeWithFriendVoiceAI(text, { onStart, onEnd });
    }

    // Default Web Speech API synthesis
    try {
      this.stopSpeaking();

      // Clean markdown characters before speech synthesis
      const cleanText = text
        .replace(/[*_#`[\]()]/g, '')
        .replace(/https?:\/\/\S+/g, '')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.pitch = pitch;
      utterance.rate = rate;

      // Select a natural English voice if available
      const voices = this.synthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (onStart) onStart();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      this.currentUtterance = utterance;
      this.synthesis.speak(utterance);
      return true;
    } catch (err) {
      console.error('Text-to-speech error:', err);
      return false;
    }
  }

  /**
   * Stops any currently playing speech
   */
  stopSpeaking() {
    if (this.synthesis && this.synthesis.speaking) {
      this.synthesis.cancel();
      this.isSpeaking = false;
    }
  }

  // =========================================================================
  // 🔌 EXTENSION POINT FOR FRIEND'S VOICE AI TOOL
  // =========================================================================
  /**
   * Connect and configure the friend's voice AI tool
   * @param {Object} config - { endpoint, apiKey, provider, options }
   */
  configureFriendVoiceTool(config = {}) {
    this.voiceAiToolConfig = {
      ...this.voiceAiToolConfig,
      ...config,
      enabled: true
    };
    console.log('[VoiceService] Friend Voice AI Tool configured successfully:', this.voiceAiToolConfig);
  }

  /**
   * Synthesizes audio using the friend's AI tool (REST API / WebSocket / Audio stream)
   */
  async synthesizeWithFriendVoiceAI(text, { onStart, onEnd } = {}) {
    console.log('[VoiceService] Forwarding text to Friend Voice AI Tool:', text);
    try {
      if (onStart) onStart();

      /**
       * TO INTEGRATE FRIEND'S VOICE TOOL:
       * Replace this block with your friend's API endpoint, e.g.:
       * 
       * const response = await fetch(this.voiceAiToolConfig.endpoint, {
       *   method: 'POST',
       *   headers: {
       *     'Authorization': `Bearer ${this.voiceAiToolConfig.apiKey}`,
       *     'Content-Type': 'application/json'
       *   },
       *   body: JSON.stringify({ text, voice: 'en_female_enterprise' })
       * });
       * const audioBlob = await response.blob();
       * const audioUrl = URL.createObjectURL(audioBlob);
       * const audio = new Audio(audioUrl);
       * audio.onended = onEnd;
       * audio.play();
       */

      // Currently falls back gracefully to high-quality browser speech until friend's key is passed:
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*_#`]/g, ''));
      utterance.onend = onEnd;
      this.synthesis.speak(utterance);
      return true;
    } catch (err) {
      console.error('[VoiceService] Friend voice synthesis error:', err);
      if (onEnd) onEnd();
      return false;
    }
  }
}

export const voiceService = new VoiceService();
export default voiceService;
