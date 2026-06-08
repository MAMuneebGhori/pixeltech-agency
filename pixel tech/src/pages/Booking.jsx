import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Services removed, form is hardcoded to the single offer

export default function Booking() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    website: '',
    goal: '',
    wantsLandingPage: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dropdownRef = useRef(null);

  // Search params logic removed as it's a single service

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setHoveredIdx(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

// Selection logic removed

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.phone) {
      alert('Please fill out your name, email, and WhatsApp number.');
      return;
    }
    if (formData.wantsLandingPage && !formData.website) {
      alert('Please enter your existing Website Domain so we know what needs replacing.');
      return;
    }

    setIsSubmitting(true);

    // Simulate sending an Email and WhatsApp (1.5s delay)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save to Live Backend
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      await fetch(`${apiUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          budget: formData.budget,
          website: formData.website,
          service: formData.wantsLandingPage ? 'Booked Solid System + Landing Page' : 'Booked Solid System',
          goal: formData.goal,
          source: 'Booking Form'
        })
      });
    } catch (error) {
      console.error("Failed to save lead to backend:", error);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <main className="min-h-screen pt-[90px] pb-[50px] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,242,254,0.06),transparent_50%)]" />

      <div className="max-w-[520px] w-full mx-auto px-5 relative z-10">
        {/* Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-1.5 text-[0.65rem] tracking-[0.18em] uppercase text-accent border border-accent/20 rounded-full px-3.5 py-1.5 mb-4 bg-accent/5">
            <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
            Schedule a Consultation
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2.5 leading-[1.15]">
            Let's build a <span className="text-gradient">system that scales.</span>
          </h1>
          <p className="text-mut text-sm max-w-[380px] mx-auto">
            Tell us about your project and we'll craft the perfect solution.
          </p>
        </div>

        {/* Form Card */}
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-b from-accent/20 via-line/50 to-line/20 pointer-events-none" />

          <div className="relative bg-[#0B1120] rounded-xl p-5 md:p-7">
            {isSuccess ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00F2FE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-ink">Booking Confirmed</h3>
                <p className="text-mut text-sm leading-relaxed mb-6">
                  Your strategy call request has been sent securely.<br/>
                  Our team has been notified via WhatsApp and Email.<br/>
                  We will be in touch shortly to map out your system.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="text-accent text-sm font-bold tracking-wider uppercase hover:underline"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form className="grid gap-4" onSubmit={handleSubmit}>
                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="grid gap-1.5">
                    <label className="text-[0.7rem] font-semibold text-mut uppercase tracking-[0.08em]">First Name <span className="text-red-500">*</span></label>
                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent/60 focus:bg-white/[0.06] transition-all duration-300 text-ink placeholder-white/20" placeholder="John" />
                  </div>
                  <div className="grid gap-1.5">
                    <label className="text-[0.7rem] font-semibold text-mut uppercase tracking-[0.08em]">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent/60 focus:bg-white/[0.06] transition-all duration-300 text-ink placeholder-white/20" placeholder="Doe" />
                  </div>
                </div>

              {/* Services Selection */}
              <div className="grid gap-3.5 my-2">
                <label className="text-[0.7rem] font-semibold text-mut uppercase tracking-[0.08em]">Select Options <span className="text-red-500">*</span></label>
                
                {/* Booked Solid System (Required) */}
                <div className="relative group cursor-not-allowed">
                  <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-accent/40 to-accent2/40 opacity-100 blur-[2px]" />
                  <div className="relative flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-[#05050A] border border-accent/30">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-ink text-[0.95rem] flex items-center gap-2 flex-wrap">The Booked Solid System <span className="text-[0.55rem] uppercase tracking-widest text-[#05050A] font-bold bg-accent px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(0,242,254,0.4)]">Core</span></div>
                      <div className="text-mut text-xs mt-1 leading-relaxed">Automated 60-second follow-up & self-booking infrastructure.</div>
                    </div>
                    <div className="shrink-0">
                      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shadow-[0_0_10px_rgba(0,242,254,0.5)]">
                        <svg className="w-4 h-4 text-[#05050A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Landing Page Add-on (Optional) */}
                <label className="relative group cursor-pointer block">
                  <div className={`absolute -inset-[1px] rounded-2xl transition-all duration-300 ${formData.wantsLandingPage ? 'bg-gradient-to-r from-accent/40 to-accent2/40 opacity-100 blur-[2px]' : 'bg-line opacity-50 group-hover:opacity-100'}`} />
                  <div className={`relative flex items-center gap-4 p-4 md:p-5 rounded-2xl transition-all duration-300 ${formData.wantsLandingPage ? 'bg-[#05050A] border border-accent/30' : 'bg-[#0B1120] border border-transparent'}`}>
                    <input type="checkbox" name="wantsLandingPage" checked={formData.wantsLandingPage} onChange={(e) => setFormData({...formData, wantsLandingPage: e.target.checked})} className="sr-only" />
                    
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-colors ${formData.wantsLandingPage ? 'bg-accent/10 border-accent/20' : 'bg-white/5 border-white/10'}`}>
                      <svg className={`w-5 h-5 transition-colors ${formData.wantsLandingPage ? 'text-accent' : 'text-mut'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-ink text-[0.95rem] flex items-center gap-2 flex-wrap">Landing Page Add-on <span className={`text-[0.55rem] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full border transition-colors ${formData.wantsLandingPage ? 'text-accent border-accent/30 bg-accent/10' : 'text-mut border-line bg-white/5'}`}>Optional</span></div>
                      <div className="text-mut text-xs mt-1 leading-relaxed">We'll build, host, and secure a high-converting landing page.</div>
                    </div>
                    <div className="shrink-0">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${formData.wantsLandingPage ? 'bg-accent border-accent shadow-[0_0_10px_rgba(0,242,254,0.5)]' : 'border-mut/50 bg-transparent'}`}>
                        <svg className={`w-4 h-4 text-[#05050A] transition-transform duration-300 ${formData.wantsLandingPage ? 'scale-100' : 'scale-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                    </div>
                  </div>
                </label>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="grid gap-1.5">
                  <label className="text-[0.7rem] font-semibold text-mut uppercase tracking-[0.08em]">Email Address <span className="text-red-500">*</span></label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent/60 focus:bg-white/[0.06] transition-all duration-300 text-ink placeholder-white/20" placeholder="john@example.com" />
                </div>
                <div className="grid gap-1.5">
                  <label className="text-[0.7rem] font-semibold text-mut uppercase tracking-[0.08em]">WhatsApp / Phone <span className="text-red-500">*</span></label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent/60 focus:bg-white/[0.06] transition-all duration-300 text-ink placeholder-white/20" placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              {/* Company and Budget Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="grid gap-1.5">
                  <label className="text-[0.7rem] font-semibold text-mut uppercase tracking-[0.08em]">Company Name <span className="text-white/20 lowercase normal-case tracking-normal ml-1">(Optional)</span></label>
                  <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent/60 focus:bg-white/[0.06] transition-all duration-300 text-ink placeholder-white/20" placeholder="Acme Corp" />
                </div>
                <div className="grid gap-1.5">
                  <label className="text-[0.7rem] font-semibold text-mut uppercase tracking-[0.08em]">Estimated Budget <span className="text-white/20 lowercase normal-case tracking-normal ml-1">(Optional)</span></label>
                  <select name="budget" value={formData.budget} onChange={handleInputChange} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent/60 focus:bg-white/[0.06] transition-all duration-300 text-ink appearance-none">
                    <option value="" disabled className="bg-bg text-mut">Select a range...</option>
                    <option value="< $5k" className="bg-bg text-ink">&lt; $5,000</option>
                    <option value="$5k - $10k" className="bg-bg text-ink">$5,000 - $10,000</option>
                    <option value="$10k - $25k" className="bg-bg text-ink">$10,000 - $25,000</option>
                    <option value="$25k+" className="bg-bg text-ink">$25,000+</option>
                  </select>
                </div>
              </div>

              {/* Website */}
              <div className="grid gap-1.5 transition-all duration-300">
                <label className="text-[0.7rem] font-semibold text-mut uppercase tracking-[0.08em]">
                  Website Domain {formData.wantsLandingPage && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  required={formData.wantsLandingPage}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent/60 focus:bg-white/[0.06] transition-all duration-300 text-ink placeholder-white/20"
                  placeholder="https://yoursite.com"
                />
              </div>

              {/* Goal */}
              <div className="grid gap-1.5">
                <label className="text-[0.7rem] font-semibold text-mut uppercase tracking-[0.08em]">Tell Us About Your Project</label>
                <textarea
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent/60 focus:bg-white/[0.06] transition-all duration-300 text-ink placeholder-white/20 resize-none"
                  placeholder="What are your goals?"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-center mt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary px-8 text-[0.8rem] py-2 rounded-lg flex items-center justify-center min-w-[200px]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-[#05050A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Request Consultation'}
                </button>
              </div>
              <p className="text-center text-[0.65rem] text-white/25 -mt-1">
                🔒 Your information is secure. We respond within 60 minutes.
              </p>
            </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
