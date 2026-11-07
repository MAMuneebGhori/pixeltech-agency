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
      <div className="container-page flex items-center justify-between py-md">
        <Link to="/" className="flex items-center gap-xs font-semibold text-[1.1rem] shrink-0">
          <img src="/logo-128.png" alt="PixelTech Logo" width="34" height="34" className="h-[34px] w-[34px] object-contain" />
          <span className="hidden sm:inline">Pixeltech Agency</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2xs">
          {navLinks.map((link) => {
            const isActive = location.pathname + location.hash === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm px-md py-xs rounded-lg transition-colors duration-[220ms] ease-out ${
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

        <div className="flex items-center gap-md">
          {/* Outlined, so the hero's filled primary stays the one filled button on the first screen. */}
          <Link to="/booking" data-cta="nav" className="btn-secondary !min-h-11 !px-md text-sm whitespace-nowrap">
            Book a 15-min ROI audit
          </Link>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="lg:hidden text-ink hover:text-accent transition-colors duration-[220ms] ease-out p-2.5 -m-2.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
              <span className={`block w-5 h-0.5 bg-current transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu: mounted when open, faded in with opacity only (no height animation). */}
      {mobileOpen && (
      <div id="mobile-menu" className="lg:hidden animate-fade-in">
        <nav className="container-page pb-lg pt-xs flex flex-col gap-2xs border-t border-line">
          {navLinks.map((link) => {
            const isActive = location.pathname + location.hash === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`px-md py-sm rounded-inner transition-colors duration-[220ms] ease-out ${
                  isActive
                    ? 'text-accent bg-accent/10'
                    : 'text-mut hover:text-ink hover:bg-ink/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-sm pt-sm border-t border-line">
            <Link
              to="/booking"
              data-cta="nav"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full text-center"
            >
              Book a 15-min ROI audit
            </Link>
          </div>
        </nav>
      </div>
      )}
    </header>
  );
}
