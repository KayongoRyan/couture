import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const getApiKey = () => {
  try {
    const meta = import.meta as any;
    if (meta && meta.env && meta.env.VITE_GEMINI_API_KEY) {
      return meta.env.VITE_GEMINI_API_KEY;
    }
    if (typeof process !== 'undefined' && process.env) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // Ignore errors
  }
  return undefined;
};

const ASSISTANT_NAME = 'Lafleur';

const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return 'Bonjour';
  } else if (hour >= 12 && hour < 17) {
    return 'Bonne après-midi';
  } else {
    return 'Bonsoir';
  }
};

const getInitialGreeting = (): string => {
  const greeting = getTimeBasedGreeting();
  return `${greeting}, I'm ${ASSISTANT_NAME}, your AI concierge at CoutureLaFleur. How can I help you today? I can assist with product information, styling advice, sizing, shipping, or any questions about our collections.`;
};

export const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialGreeting] = useState(() => getInitialGreeting());
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: initialGreeting,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      // Update greeting based on current time when chat opens
      const currentGreeting = getInitialGreeting();
      setMessages(prev => {
        // Only update if the first message is the initial greeting
        if (prev.length === 1 && prev[0].sender === 'ai' && prev[0].id === '1') {
          return [{
            ...prev[0],
            text: currentGreeting
          }];
        }
        return prev;
      });
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = getApiKey();
      
      if (!apiKey) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `${ASSISTANT_NAME} is momentarily unavailable. Please contact us directly at couturelafleur19@gmail.com or call +250 792 772 202 for assistance.`,
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const currentGreeting = getTimeBasedGreeting();
      const context = `You are ${ASSISTANT_NAME}, a helpful AI concierge for CoutureLaFleur, a luxury Rwandan-French fashion house. 
      The brand is elegant, minimal, poetic, and culturally rich. 
      You help customers with:
      - Product information and details
      - Styling advice
      - Sizing questions
      - Shipping and returns
      - General inquiries about collections
      - Fashion advice
      
      Be friendly, professional, and concise. Keep responses helpful and on-brand.
      You may use French greetings naturally: "${currentGreeting}" for the current time of day (morning: Bonjour, afternoon: Bonne après-midi, evening: Bonsoir).
      
      User question: ${userMessage.text}`;

      const result = await model.generateContent(context);
      const response = await result.response;
      const text = response.text();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: text || `I'm here to help! Could you please rephrase your question? — ${ASSISTANT_NAME}`,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat AI Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `${ASSISTANT_NAME} is having trouble processing your request right now. Please try again or contact us directly at couturelafleur19@gmail.com.`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 rounded-full bg-gold dark:bg-antique text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 ${
          isOpen ? 'hidden' : 'flex'
        }`}
        aria-label={`Open chat with ${ASSISTANT_NAME}`}
      >
        <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
        {messages.length > 1 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">
            {messages.length - 1}
          </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-96 h-[600px] max-h-[calc(100vh-8rem)] bg-white dark:bg-ebony rounded-lg shadow-2xl flex flex-col border border-shadow/10 dark:border-smoke/10 transform transition-all duration-300 ease-out">
          {/* Header */}
          <div className="bg-gold dark:bg-antique text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg">{ASSISTANT_NAME}</h3>
                <p className="text-xs opacity-90">AI Concierge • CoutureLaFleur</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-gold dark:bg-antique text-white'
                      : 'bg-champagne/30 dark:bg-charcoal/50 text-shadow dark:text-smoke'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <span className="text-[10px] opacity-60 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-champagne/30 dark:bg-charcoal/50 rounded-lg px-4 py-2">
                  <Loader2 size={16} className="animate-spin text-gold dark:text-antique" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-shadow/10 dark:border-smoke/10 p-4">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-transparent border-b border-shadow/20 dark:border-smoke/20 focus:border-gold dark:focus:border-antique focus:outline-none py-2 text-sm placeholder:opacity-50"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-gold dark:bg-antique text-white rounded-full p-2 hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

