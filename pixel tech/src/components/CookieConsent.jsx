import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings2, ShieldCheck, Check } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [functionalEnabled, setFunctionalEnabled] = useState(true);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('pixeltech_cookies_accepted');
    if (!hasAccepted) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('pixeltech_cookies_accepted', 'all');
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('pixeltech_cookies_accepted', 'rejected');
    localStorage.removeItem('pixeltech_chat_history'); // clear existing
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    if (functionalEnabled) {
      localStorage.setItem('pixeltech_cookies_accepted', 'all');
    } else {
      localStorage.setItem('pixeltech_cookies_accepted', 'rejected');
      localStorage.removeItem('pixeltech_chat_history'); // clear existing
    }
    setIsVisible(false);
    setShowPreferences(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && !showPreferences && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-[100] bg-card border border-line rounded-2xl p-5 shadow-2xl flex flex-col gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-accent/10 rounded-full text-accent shrink-0 mt-1">
                <Cookie className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-ink text-sm mb-1">We value your privacy</h3>
                <p className="text-xs text-mut leading-relaxed">
                  We use cookies and local storage to enhance your browsing experience and seamlessly save your AI chat history.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 mt-1">
              <button
                onClick={handleAcceptAll}
                className="w-full bg-gradient-brand text-[#05050A] font-semibold text-sm py-2 rounded-xl hover:scale-[1.02] transition-transform"
              >
                Accept All
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleRejectAll}
                  className="w-full bg-bg border border-line text-mut font-medium text-xs py-2 rounded-xl hover:text-ink hover:bg-white/[0.02] transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={() => setShowPreferences(true)}
                  className="w-full bg-bg border border-line text-mut font-medium text-xs py-2 rounded-xl hover:text-ink hover:bg-white/[0.02] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  Manage
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {showPreferences && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-card border border-line rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-line">
                <h2 className="text-lg font-bold text-ink flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                  Privacy Preferences
                </h2>
                <button 
                  onClick={() => setShowPreferences(false)}
                  className="text-mut hover:text-ink p-1 rounded-md hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-5 space-y-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
                
                {/* Essential Cookies */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-ink text-sm">Strictly Necessary Cookies</h3>
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">Always Active</span>
                  </div>
                  <p className="text-xs text-mut leading-relaxed">
                    These cookies are essential for the website to function properly. They cannot be disabled and do not store any personally identifiable information.
                  </p>
                </div>

                <div className="h-px w-full bg-line" />

                {/* Functional Cookies */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-ink text-sm">Functional Cookies (Chat History)</h3>
                    
                    {/* Custom Toggle Switch */}
                    <button 
                      onClick={() => setFunctionalEnabled(!functionalEnabled)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${functionalEnabled ? 'bg-accent' : 'bg-line'}`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${functionalEnabled ? 'translate-x-4.5' : 'translate-x-1'}`} />
                    </button>

                  </div>
                  <p className="text-xs text-mut leading-relaxed">
                    These cookies allow the AI chatbot to remember your conversation across page reloads using your browser's local storage. If disabled, your chat will reset every time you refresh the page.
                  </p>
                </div>
                
              </div>

              <div className="p-5 border-t border-line bg-bg2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRejectAll}
                  className="w-full text-mut text-sm font-medium hover:text-ink transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="w-full bg-gradient-brand text-[#05050A] font-semibold text-sm py-2.5 rounded-xl hover:scale-[1.02] transition-transform"
                >
                  Save My Choices
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
