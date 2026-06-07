import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! I am the Pixeltech AI Assistant. What kind of project are you looking to build?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Send to our live Express Backend
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            content: msg.content
          }))
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting to my brain right now. Are you sure the backend server is running and the API key is set?' }]);
      }
    } catch (error) {
      console.error("Chat API Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network error. Please make sure the backend server is running.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-48px)] h-[550px] max-h-[calc(100vh-120px)] bg-card border border-line rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.5)] z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-brand text-[#05050A] flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#05050A]/20 flex items-center justify-center border border-[#05050A]/20 shadow-inner">
                  <Sparkles className="w-5 h-5 text-[#05050A]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg leading-tight">Pixeltech AI</h3>
                  <p className="text-sm font-medium opacity-80 leading-tight">Usually replies instantly</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#05050A]/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg2 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md border overflow-hidden ${
                    msg.role === 'user' 
                      ? 'bg-line border-line/50' 
                      : 'bg-[#05050A] border-accent/20'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-ink" /> : <img src="/Pixeltech.png" alt="AI" className="w-full h-full object-cover" />}
                  </div>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-md ${
                    msg.role === 'user'
                      ? 'bg-line text-ink rounded-tr-sm'
                      : 'bg-card border border-line text-mut rounded-tl-sm'
                  }`}>
                    <p className="text-[0.95rem] leading-relaxed break-words">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md border overflow-hidden bg-[#05050A] border-accent/20">
                    <img src="/Pixeltech.png" alt="AI" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-card border border-line rounded-2xl rounded-tl-sm px-4 py-3 shadow-md flex items-center gap-1.5">
                    <motion.div className="w-2 h-2 rounded-full bg-accent" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="w-2 h-2 rounded-full bg-accent" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-2 h-2 rounded-full bg-accent" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 bg-card border-t border-line">
              <div className="relative flex items-center">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message... (Shift+Enter for new line)"
                  rows={input.split('\n').length > 1 ? Math.min(input.split('\n').length, 4) : 1}
                  className="w-full bg-bg2 border border-line rounded-3xl pl-5 pr-12 py-3 text-sm text-ink focus:outline-none focus:border-accent/50 transition-colors shadow-inner resize-none custom-scrollbar"
                  style={{ minHeight: '44px' }}
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 w-9 h-9 flex items-center justify-center rounded-full bg-gradient-brand text-[#05050A] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-brand rounded-full shadow-[0_10px_30px_rgba(0,242,254,0.4)] flex items-center justify-center hover:scale-105 transition-transform border-none outline-none cursor-pointer group"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1 }}
        aria-label="Toggle AI Chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-7 h-7 text-[#05050A]" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="relative">
              <MessageSquare className="w-7 h-7 text-[#05050A] fill-[#05050A]" />
              <motion.div 
                className="absolute -top-1 -right-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-[#05050A]" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
