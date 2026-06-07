import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Bot, Loader2, Sparkles, Send } from 'lucide-react';

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Welcome to Pixeltech. To build your custom automation pipeline, what industry is your company in?',
      options: ['B2B SaaS', 'E-Commerce', 'Real Estate']
    }
  ]);
  const [chatStage, setChatStage] = useState('industry'); // industry -> domain -> confirm -> done
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const appendUserMessage = (text) => {
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text }]);
  };

  const simulateBotResponse = (text, nextStage, options = null) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text, options }]);
      if (nextStage) setChatStage(nextStage);
    }, 1500);
  };

  const handleOptionClick = (option) => {
    if (isProcessing) return;
    
    // Remove options from the last message so they don't stay on screen
    setMessages(prev => {
      const newMsgs = [...prev];
      if (newMsgs[newMsgs.length - 1].options) {
        newMsgs[newMsgs.length - 1].options = null;
      }
      return newMsgs;
    });

    appendUserMessage(option);
    
    if (chatStage === 'industry') {
      simulateBotResponse('Great. What is your primary business domain/URL?', 'domain');
    } else if (chatStage === 'confirm') {
      if (option === 'Yes, deploy widget') {
         simulateBotResponse('Excellent. Your custom deployment script is ready. Please click "Schedule Discovery Call" to get your API keys and complete integration.', 'done');
      } else {
         simulateBotResponse('No problem. When you are ready to stop losing leads, schedule a discovery call with our engineers.', 'done');
      }
    }
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;
    
    const text = inputValue.trim();
    setInputValue('');
    appendUserMessage(text);

    if (chatStage === 'domain') {
       simulateBotResponse(`Analysis complete for ${text}. We identified 3 static forms losing traffic. Would you like to deploy the Pixeltech AI qualification widget to these pages?`, 'confirm', ['Yes, deploy widget', 'Not right now']);
    } else {
       simulateBotResponse("I've recorded that information. Let's get you on a discovery call to finalize details.", 'done');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-violet-500/30 flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-500" />
            <span className="font-bold tracking-tight text-sm uppercase text-zinc-200">
              PIXELTECH <span className="text-zinc-700 mx-1">//</span> <span className="text-zinc-400">Growth Automation</span>
            </span>
          </div>
          <button className="text-sm font-medium border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 transition-colors px-4 py-2 rounded-md text-zinc-300">
            Schedule Discovery Call
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Case Study Banner */}
        <section className="border-b border-zinc-800/50 bg-zinc-900/20 py-16 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-2xl mb-12">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-400 text-[10px] font-bold uppercase tracking-[0.15em] mb-5 border border-violet-500/20 shadow-sm">
                Performance Study
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5 text-zinc-50">
                Case Study: Fixing Lead Leakage for B2B Tech
              </h1>
              <p className="text-lg text-zinc-400 leading-relaxed font-medium">
                By replacing static forms and manual spreadsheet tracking with our automated CRM intake layer, this client eliminated pipeline blind spots and dramatically accelerated their sales cycles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Reduction in Lead Leakage', value: '85%' },
                { label: 'Faster Response Time', value: '3x' },
                { label: 'Pipeline Visibility', value: '100%' }
              ].map((stat, i) => (
                <div key={i} className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 relative overflow-hidden group shadow-sm">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity duration-500">
                    <CheckCircle2 className="w-16 h-16 text-violet-500" />
                  </div>
                  <div className="text-4xl font-black text-white mb-2 tracking-tight">{stat.value}</div>
                  <div className="text-sm font-medium text-zinc-500 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Feature: Split Workspace */}
        <section className="flex-1 py-20 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 flex items-center">
              <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500 flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                LIVE DEMO: Native AI Qualification Engine
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
              {/* Left Column: Context */}
              <div className="lg:col-span-5 sticky top-32 pt-4">
                <h3 className="text-3xl font-bold tracking-tight mb-6 leading-tight text-zinc-100">
                  Stop losing high-intent prospects to <span className="text-zinc-600 line-through decoration-zinc-500 decoration-2">static forms</span>.
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed mb-8 font-medium">
                  Traditional contact forms lose up to 60% of traffic. This embedded AI onboarding system qualifies intent instantly, routing perfectly formatted data directly into your CRM.
                </p>
                <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-200 mb-1">Try the interaction</div>
                    <div className="text-sm text-zinc-500 leading-relaxed">Engage with the embedded qualification flow on the right to see a fully functioning conversational intake loop.</div>
                  </div>
                </div>
              </div>

              {/* Right Column: True Chatbot UI */}
              <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800/80 rounded-[1.5rem] h-[600px] flex flex-col relative overflow-hidden shadow-2xl">
                
                {/* Chat Header */}
                <div className="p-4 border-b border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between z-10 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shadow-inner">
                      <Bot className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-100 text-[13px] tracking-wide">Pixeltech Neural Assistant</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Active Intake</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages Scroll Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-zinc-900/10 to-zinc-900/30 scroll-smooth">
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div className={`px-5 py-4 text-[14.5px] leading-relaxed max-w-[85%] rounded-2xl ${
                          msg.sender === 'user' 
                            ? 'bg-zinc-200 text-zinc-900 rounded-br-sm font-medium shadow-sm' 
                            : 'bg-zinc-800/80 text-zinc-200 border border-zinc-700/50 rounded-bl-sm shadow-sm'
                        }`}>
                          {msg.text}
                        </div>

                        {/* Interactive Options */}
                        {msg.options && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.3 }}
                            className="mt-3 flex flex-wrap gap-2.5"
                          >
                            {msg.options.map(option => (
                              <button
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                disabled={isProcessing}
                                className="px-5 py-2.5 rounded-full border border-zinc-700 bg-zinc-800/60 text-zinc-300 hover:bg-violet-600 hover:border-violet-600 hover:text-white transition-all duration-200 text-[13px] font-medium shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {option}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </motion.div>
                    ))}

                    {/* Loading Skeleton */}
                    {isProcessing && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        className="flex items-start"
                      >
                        <div className="px-5 py-4 rounded-2xl rounded-bl-sm max-w-[85%] bg-zinc-800/40 border border-zinc-700/40 flex items-center gap-3 shadow-sm">
                          <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
                          <span className="text-[13px] font-medium text-zinc-400">AI processing payload...</span>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} className="h-1" />
                  </AnimatePresence>
                </div>

                {/* Fixed Input Area */}
                <div className="p-4 border-t border-zinc-800/80 bg-zinc-900/40">
                  <form onSubmit={handleChatSubmit} className="relative flex items-center">
                    <input 
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={chatStage === 'domain' ? "Enter your domain (e.g. example.com)..." : "Type your message..."}
                      disabled={chatStage === 'industry' || chatStage === 'confirm' || isProcessing || chatStage === 'done'}
                      className="w-full bg-zinc-950 border border-zinc-700/80 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl py-3.5 pl-4 pr-12 text-sm text-zinc-200 placeholder-zinc-600 transition-all outline-none shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button 
                      type="submit"
                      disabled={!inputValue.trim() || isProcessing}
                      className="absolute right-2 p-2 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-lg transition-colors active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
