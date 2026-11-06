import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function TopNavBar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/#how-it-works', label: 'How It Works' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bg border-b border-line w-full">
      <div className="flex items-center justify-between px-6 md:px-12 py-[15px] w-full">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-[1.1rem] shrink-0">
          <img src="/logo-128.png" alt="PixelTech Logo" width="34" height="34" className="h-[34px] w-[34px] object-contain" />
          <span className="hidden sm:inline">Pixeltech Agency</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname + location.hash === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[0.85rem] font-medium px-3.5 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'text-accent bg-accent/10'
                    : 'text-mut hover:text-ink hover:bg-ink/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          {/* CTA Button */}
          <Link to="/booking" className="inline-flex items-center rounded-full bg-ink text-bg font-semibold px-5 py-2.5 text-[0.85rem] whitespace-nowrap hover:bg-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            Book a 15-min ROI audit
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-ink hover:text-accent transition-colors p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
              <span className={`block w-5 h-0.5 bg-current transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-6 pb-6 pt-2 flex flex-col gap-1 border-t border-line/50">
          {navLinks.map((link) => {
            const isActive = location.pathname + location.hash === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-[0.95rem] font-medium px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-accent bg-accent/10 border border-accent/20'
                    : 'text-mut hover:text-ink hover:bg-ink/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-3 pt-3 border-t border-line/50">
            <Link
              to="/booking"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full text-center text-[0.95rem] py-3"
            >
              Book a 15-min ROI audit
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
