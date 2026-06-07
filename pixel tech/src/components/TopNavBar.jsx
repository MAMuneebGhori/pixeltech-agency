import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/how-it-works', label: 'How It Works' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/testimonials', label: 'Testimonials' },
  { path: '/about', label: 'About' },
  { path: '/help', label: 'More Info' },
];

export default function TopNavBar() {
  const location = useLocation();
  const isBookingPage = location.pathname === '/booking';
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#05050A]/80 backdrop-blur-md border-b border-line w-full">
      <div className="flex items-center justify-between px-6 md:px-12 py-[15px] w-full">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-[1.1rem] shrink-0">
          <img src="/Pixeltech.png" alt="PixelTech Logo" className="h-[34px] w-auto object-contain" />
          <span className="hidden sm:inline">Pixeltech Agency</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[0.85rem] font-medium px-3.5 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'text-accent bg-accent/10'
                    : 'text-mut hover:text-ink hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          {/* CTA Button */}
          {isBookingPage ? (
            <Link to="/" className="group relative overflow-hidden bg-gradient-brand text-[#05050A] font-bold px-6 py-2.5 rounded-full text-[0.85rem] hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:shadow-[0_0_25px_rgba(0,242,254,0.7)] cursor-pointer block">
              <span className="relative z-10 flex items-center justify-center">Home</span>
              <div className="absolute inset-0 w-[150%] h-full -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 ease-in-out pointer-events-none skew-x-[-20deg]" />
            </Link>
          ) : (
            <Link to="/booking" className="group relative overflow-hidden bg-gradient-brand text-[#05050A] font-bold px-6 py-2.5 rounded-full text-[0.85rem] hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:shadow-[0_0_25px_rgba(0,242,254,0.7)] cursor-pointer block">
              <span className="relative z-10">Book Me</span>
              <div className="absolute inset-0 w-[150%] h-full -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 ease-in-out pointer-events-none skew-x-[-20deg]" />
            </Link>
          )}

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-ink hover:text-accent transition-colors p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-[0.95rem] font-medium px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-accent bg-accent/10 border border-accent/20'
                    : 'text-mut hover:text-ink hover:bg-white/5'
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
              Book a Strategy Call
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
