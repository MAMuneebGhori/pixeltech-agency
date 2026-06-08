import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function TopNavBar() {
  const location = useLocation();
  const isBookingPage = location.pathname === '/booking';

  return (
    <header className="sticky top-0 z-50 bg-[#05050A]/80 backdrop-blur-md border-b border-line w-full">
      <div className="flex items-center justify-between px-6 md:px-12 py-[15px] w-full">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-[1.1rem] shrink-0">
          <img src="/Pixeltech.png" alt="PixelTech Logo" className="h-[34px] w-auto object-contain" />
          <span className="hidden sm:inline">Pixeltech Agency</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {/* CTA Button */}
          {isBookingPage ? (
            <Link to="/" className="group relative overflow-hidden bg-gradient-brand text-[#05050A] font-bold px-6 py-2.5 rounded-full text-[0.85rem] hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:shadow-[0_0_25px_rgba(0,242,254,0.7)] cursor-pointer block">
              <span className="relative z-10 flex items-center justify-center">Home</span>
              <div className="absolute inset-0 w-[150%] h-full -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 ease-in-out pointer-events-none skew-x-[-20deg]" />
            </Link>
          ) : (
            <Link to="/booking" className="group relative overflow-hidden bg-gradient-brand text-[#05050A] font-bold px-6 py-2.5 rounded-full text-[0.85rem] hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:shadow-[0_0_25px_rgba(0,242,254,0.7)] cursor-pointer block">
              <span className="relative z-10">Book My Free Audit</span>
              <div className="absolute inset-0 w-[150%] h-full -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 ease-in-out pointer-events-none skew-x-[-20deg]" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
