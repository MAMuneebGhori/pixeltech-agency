import { useState, useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';

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
      {isVisible && !showPreferences && (
          <div
            role="region"
            aria-label="Cookie consent"
            className="animate-slide-in-up motion-reduce:animate-none fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-[100] bg-card rounded-card p-5 shadow-raised flex flex-col gap-4"
          >
            <div>
              <div>
                <h3 className="font-semibold text-ink text-sm mb-1">We value your privacy</h3>
                <p className="text-sm text-mut leading-relaxed">
                  We use cookies and local storage to enhance your browsing experience and remember your preferences.
                </p>
              </div>
            </div>
            
            {/* One row of 44px pills: meets the touch target while keeping the banner short on phones. */}
            <div className="grid grid-cols-3 gap-2 mt-1">
              <button type="button" onClick={handleAcceptAll} className="btn-primary !min-h-11 !px-3 text-sm">
                Accept all
              </button>
              <button type="button" onClick={handleRejectAll} className="btn-secondary !min-h-11 !px-3 text-sm">
                Reject all
              </button>
              <button type="button" onClick={() => setShowPreferences(true)} className="btn-secondary !min-h-11 !px-3 text-sm">
                Manage
              </button>
            </div>
          </div>
        )}

      {/* Preferences Modal */}
        {showPreferences && (
          <div
            className="animate-fade-in motion-reduce:animate-none fixed inset-0 z-[150] flex items-center justify-center bg-ink/40 p-4"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-prefs-title"
              className="animate-pop-in motion-reduce:animate-none w-full max-w-md bg-card rounded-card overflow-hidden shadow-raised flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-line">
                <h2 id="cookie-prefs-title" className="text-lg font-semibold text-ink flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                  Privacy preferences
                </h2>
                <button type="button"
                  onClick={() => setShowPreferences(false)}
                  aria-label="Close privacy preferences"
                  className="text-mut hover:text-ink p-1 rounded-md hover:bg-ink/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-5 space-y-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
                
                {/* Essential Cookies */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-ink text-sm">Strictly necessary cookies</h3>
                    <span className="text-xs font-semibold text-accent">Always active</span>
                  </div>
                  <p className="text-xs text-mut leading-relaxed">
                    These cookies are essential for the website to function properly. They cannot be disabled and do not store any personally identifiable information. Our visitor analytics are cookieless. If you book a call, the scheduling step loads Calendly, which sets its own cookies.
                  </p>
                </div>

                <div className="h-px w-full bg-line" />

                {/* Functional Cookies */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-ink text-sm">Functional cookies</h3>
                    
                    {/* Custom Toggle Switch */}
                    <button type="button"
                      onClick={() => setFunctionalEnabled(!functionalEnabled)}
                      role="switch"
                      aria-checked={functionalEnabled}
                      aria-label="Functional cookies"
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${functionalEnabled ? 'bg-accent' : 'bg-line'}`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-card transition-transform ${functionalEnabled ? 'translate-x-4.5' : 'translate-x-1'}`} />
                    </button>

                  </div>
                  <p className="text-xs text-mut leading-relaxed">
                    These let the site remember choices you make, such as this cookie preference, using your browser’s local storage.
                  </p>
                </div>
                
              </div>

              <div className="p-5 border-t border-line bg-bg2 flex flex-col sm:flex-row gap-3">
                <button type="button"
                  onClick={handleRejectAll}
                  className="btn-secondary w-full !min-h-11 text-sm"
                >
                  Reject all
                </button>
                <button type="button"
                  onClick={handleSavePreferences}
                  className="btn-primary w-full !min-h-11 text-sm"
                >
                  Save my choices
                </button>
              </div>

            </div>
          </div>
        )}
    </>
  );
}
