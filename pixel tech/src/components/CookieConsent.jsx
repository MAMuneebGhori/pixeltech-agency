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
            // Phones: a full-width bar at the bottom, one line plus Accept and Manage (Reject is one tap away in Manage),
            // so it covers far less of the hero (design review D4). From md up: the card in the corner.
            className="animate-slide-in-up motion-reduce:animate-none fixed z-[100] bg-card shadow-raised inset-x-0 bottom-0 px-4 py-3 flex items-center gap-3 md:inset-x-auto md:bottom-4 md:right-4 md:max-w-sm md:rounded-card md:p-5 md:flex-col md:items-stretch md:gap-4"
          >
            <div className="min-w-0 flex-1">
              <h3 className="hidden md:block font-semibold text-ink text-sm mb-1">We value your privacy</h3>
              <p className="text-sm text-mut leading-snug md:leading-relaxed">
                <span className="md:hidden">We use cookies to remember your choices.</span>
                <span className="hidden md:inline">We use cookies and local storage to enhance your browsing experience and remember your preferences.</span>
              </p>
            </div>

            <div className="flex shrink-0 gap-2 md:grid md:grid-cols-3 md:mt-1">
              <button type="button" onClick={handleAcceptAll} className="btn-primary !min-h-11 !px-3 text-sm">
                Accept<span className="hidden md:inline">&nbsp;all</span>
              </button>
              <span className="hidden md:contents">
                <button type="button" onClick={handleRejectAll} className="btn-secondary !min-h-11 !px-3 text-sm">
                  Reject all
                </button>
              </span>
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
