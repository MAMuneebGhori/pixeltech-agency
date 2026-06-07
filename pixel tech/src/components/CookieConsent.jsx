import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('pixeltech_cookies_accepted');
    if (!hasAccepted) {
      // Small delay to not overwhelm the user immediately on page load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('pixeltech_cookies_accepted', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-[100] bg-card border border-line rounded-2xl p-5 shadow-2xl flex flex-col gap-4"
        >
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-3 text-mut hover:text-ink transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-start gap-3">
            <div className="p-2 bg-accent/10 rounded-full text-accent shrink-0 mt-1">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-ink text-sm mb-1">We use cookies</h3>
              <p className="text-xs text-mut leading-relaxed">
                We use cookies and local storage to enhance your browsing experience, seamlessly save your chat history, and analyze site traffic.
              </p>
            </div>
          </div>
          
          <button
            onClick={handleAccept}
            className="w-full bg-gradient-brand text-[#05050A] font-semibold text-sm py-2 rounded-xl hover:scale-[1.02] transition-transform"
          >
            Got it, thanks!
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
