import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  
  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/proof', label: 'Testimonials' },
    { path: '/about', label: 'About Us' },
    { path: '/booking', label: 'Book a Call' },
  ];

  return (
    <footer className="bg-bg2 w-full py-[60px] border-t border-line text-[#6f6f80] text-[0.85rem]">
      <div className="max-w-[1080px] mx-auto px-[22px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link to="/" className="flex items-center gap-2 font-extrabold text-[1.05rem] text-ink hover:text-accent transition-colors">
              <img src="/Pixeltech.png" alt="PixelTech Logo" className="h-[34px] w-auto object-contain" />
              Pixeltech Agency
            </Link>
            <p className="text-center md:text-left">Building Predictable Growth Systems.</p>
            <p>© {new Date().getFullYear()} Pixeltech Agency.</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h4 className="text-ink font-bold text-sm uppercase tracking-wider mb-1">Quick Links</h4>
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="hover:text-accent transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-ink font-bold text-sm uppercase tracking-wider mb-1">Get In Touch</h4>
            
            <a href="mailto:info@pixeltech.agency" className="hover:text-accent transition-colors font-medium">
              info@pixeltech.agency
            </a>

            <h4 className="text-ink font-bold text-sm uppercase tracking-wider mb-1 mt-4">Socials</h4>
            <div className="flex flex-col gap-2">
              <a href="https://www.instagram.com/pixeltech.agencyy" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors font-medium">
                Instagram
              </a>
              <a href="https://x.com/pixeltechglobal" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors font-medium">
                X (Twitter)
              </a>
              <a href="https://www.facebook.com/officialpixeltech" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors font-medium">
                Facebook
              </a>
              <a href="https://www.linkedin.com/in/umerbinaaziz/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors font-medium">
                LinkedIn
              </a>

              <div className="relative">
                <button 
                  onClick={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
                  className="hover:text-accent transition-colors font-medium cursor-pointer flex items-center justify-between w-max gap-2 outline-none"
                >
                  WhatsApp
                </button>
                
                {isWhatsAppOpen && (
                  <div className="absolute bottom-full mb-2 left-0 md:left-auto w-max bg-card border border-line rounded-lg p-2 shadow-2xl flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <a href="https://wa.me/923336424891" target="_blank" rel="noopener noreferrer" className="text-xs font-medium hover:text-accent px-4 py-2 rounded-md hover:bg-bg2 transition-colors text-left flex flex-col gap-1">
                      <span className="text-ink">Chat with Umer</span>
                      <span className="text-mut font-normal">+92 333 6424891</span>
                    </a>
                    <div className="h-px w-full bg-line/50 my-1"></div>
                    <a href="https://wa.me/923118527408" target="_blank" rel="noopener noreferrer" className="text-xs font-medium hover:text-accent px-4 py-2 rounded-md hover:bg-bg2 transition-colors text-left flex flex-col gap-1">
                      <span className="text-ink">Chat with Muneeb</span>
                      <span className="text-mut font-normal">+92 311 8527408</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-line/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#4a4a5a]">
          <p>Engineered with precision by Pixeltech Agency</p>
          <div className="flex gap-6">
            <Link to="/booking" className="hover:text-accent transition-colors">Book a Call</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
