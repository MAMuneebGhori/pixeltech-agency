import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  
  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/#how-it-works', label: 'How It Works' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/about', label: 'About Us' },
    { path: '/booking', label: 'Book a Call' },
  ];

  return (
    <footer className="bg-bg2 w-full py-2xl border-t border-line text-mut text-[0.85rem]">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-xl md:gap-(--gap-columns)">
          
          {/* Brand */}
          <div className="flex flex-col items-start gap-md">
            <Link to="/" className="flex items-center gap-xs font-semibold text-[1.05rem] text-ink hover:text-accent transition-colors">
              <img src="/logo-128.png" alt="PixelTech Logo" width="34" height="34" className="h-[34px] w-[34px] object-contain" />
              Pixeltech Agency
            </Link>
            <p className="text-left text-mut">Building Predictable Growth Systems.</p>
            <p>© {new Date().getFullYear()} Pixeltech Agency.</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start gap-sm">
            <h2 className="text-ink font-semibold text-sm mb-2xs">Quick links</h2>
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="hover:text-accent transition-colors duration-[220ms] ease-out"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col items-start gap-md">
            <h2 className="text-ink font-semibold text-sm mb-2xs">Get in touch</h2>
            
            <a href="mailto:info@pixeltech.agency" className="hover:text-accent transition-colors duration-[220ms] ease-out">
              info@pixeltech.agency
            </a>

            <h2 className="text-ink font-semibold text-sm mb-2xs mt-md">Socials</h2>
            <div className="flex flex-col gap-xs">
              <a href="https://www.instagram.com/pixeltech.agencyy" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors duration-[220ms] ease-out">
                Instagram
              </a>
              <a href="https://x.com/pixeltechglobal" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors duration-[220ms] ease-out">
                X (Twitter)
              </a>
              <a href="https://www.facebook.com/officialpixeltech" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors duration-[220ms] ease-out">
                Facebook
              </a>
              <a href="https://www.linkedin.com/in/umerbinaaziz/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors duration-[220ms] ease-out">
                LinkedIn
              </a>

              <div className="relative">
                <button 
                  onClick={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
                  className="hover:text-accent transition-colors cursor-pointer flex items-center justify-between w-max gap-xs min-h-11"
                >
                  WhatsApp
                </button>
                
                {isWhatsAppOpen && (
                  <div className="absolute bottom-full mb-xs left-0 md:left-auto w-max bg-card rounded-inner p-xs shadow-raised flex flex-col gap-2xs z-50 animate-fade-in">
                    <a href="https://wa.me/923336424891" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-accent px-md py-xs rounded-md hover:bg-bg2 transition-colors text-left flex flex-col gap-2xs">
                      <span className="text-ink">Chat with Umer</span>
                      <span className="text-mut font-normal">+92 333 6424891</span>
                    </a>
                    <div className="h-px w-full bg-line/50 my-2xs"></div>
                    <a href="https://wa.me/923118527408" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-accent px-md py-xs rounded-md hover:bg-bg2 transition-colors text-left flex flex-col gap-2xs">
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
        <div className="mt-xl pt-lg border-t border-line/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md text-xs text-mut">
          <p>Engineered with precision by Pixeltech Agency</p>
          <div className="flex gap-lg">
            <Link to="/booking" className="hover:text-accent transition-colors">Book a Call</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
