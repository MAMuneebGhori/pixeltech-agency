import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SERVICES = [
  { label: 'Full-Stack Web App', tag: 'Popular', details: 'End-to-end custom web application tailored to your business needs.', needsWebsite: false },
  { label: 'Custom Web Applications', tag: 'Code', details: 'Bespoke React/Next.js frontends paired with robust Node.js backends.', needsWebsite: false },
  { label: 'Introduce AI to Your Website', tag: 'Trending', details: 'Integrate smart AI agents, chatbots, and automation into your platform.', needsWebsite: true },
  { label: 'Take Your Web to the Next Level', tag: null, details: 'Upgrade your current site with modern tech, animations, and blazing fast performance.', needsWebsite: true },
  { label: 'Automated Lead Generation', tag: null, details: 'Set up automated funnels and systems to capture and convert more leads.', needsWebsite: true },
  { label: '60-Second Lead Response', tag: 'Speed', details: 'Instant SMS + email to every new lead, day or night.', needsWebsite: true },
  { label: 'Self-Booking Infrastructure', tag: 'Growth', details: 'Leads pick a slot themselves. Confirmations and reminders go out automatically.', needsWebsite: true },
  { label: 'Lead Reactivation', tag: 'Sales', details: 'Automated win-back campaign for old leads and past inquiries.', needsWebsite: true },
  { label: 'Lightning Performance', tag: 'Perf', details: 'Optimized Core Web Vitals, edge caching, and semantic HTML.', needsWebsite: true },
  { label: 'Dashboard & Analytics', tag: 'Data', details: 'One clear view of traffic, leads, response times, and bookings.', needsWebsite: true },
  { label: 'Pixeltech AI Chatbot', tag: 'New', details: 'A fully functional conversational AI to capture leads and qualify them automatically.', needsWebsite: true },
  { label: 'Custom Solution', tag: null, details: 'Have a unique idea? We will architect and build a bespoke solution for you.', needsWebsite: false },
];

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
    goal: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceFromUrl = params.get('service');
    if (serviceFromUrl) {
      const match = SERVICES.find(s => s.label === serviceFromUrl);
      if (match) {
        setSelected(match.label);
      }
    }
  }, [location.search]);

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

  const handleSelect = (service) => {
    setSelected(service);
    setIsOpen(false);
    setHoveredIdx(-1);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const needsWebsite = selected && SERVICES.find(s => s.label === selected)?.needsWebsite;
    if (!formData.firstName || !formData.email || !formData.phone || !selected) {
      alert('Please fill out your name, email, WhatsApp number, and select a service.');
      return;
    }
    if (needsWebsite && !formData.website) {
      alert('Please enter your Website Domain — it is required for the selected service.');
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
          service: selected,
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

              {/* Select Service */}
              <div className="grid gap-1.5">
                <label className="text-[0.7rem] font-semibold text-mut uppercase tracking-[0.08em]">Select Service <span className="text-red-500">*</span></label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between bg-white/[0.04] border rounded-lg px-3 py-2.5 text-sm text-left transition-all duration-300 cursor-pointer focus:outline-none"
                    style={{
                      borderColor: isOpen ? 'rgba(0,242,254,0.5)' : 'rgba(255,255,255,0.08)',
                      boxShadow: isOpen ? '0 0 12px rgba(0,242,254,0.06)' : 'none',
                    }}
                  >
                    <span style={{ color: selected ? '#F8FAFC' : 'rgba(255,255,255,0.2)' }}>
                      {selected || 'Choose your service...'}
                    </span>
                    <svg
                      width="12" height="12" viewBox="0 0 16 16" fill="none"
                      className="transition-transform duration-300 flex-shrink-0"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      <path d="M4 6L8 10L12 6" stroke="rgba(148,163,184,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {/* Dropdown */}
                  <div
                    className="absolute z-50 top-[calc(100%+5px)] left-0 w-full rounded-lg border border-white/[0.08] overflow-hidden transition-all duration-300 origin-top"
                    style={{
                      background: 'linear-gradient(180deg, rgba(11,17,32,0.98), rgba(8,12,24,0.98))',
                      backdropFilter: 'blur(24px)',
                      boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 1px rgba(0,242,254,0.1)',
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'scaleY(1) translateY(0)' : 'scaleY(0.95) translateY(-4px)',
                      pointerEvents: isOpen ? 'auto' : 'none',
                    }}
                  >
                    <div className="py-1 max-h-56 overflow-y-auto custom-scrollbar">
                      {SERVICES.map((svc, index) => {
                        const isSelected = selected === svc.label;
                        const isHovered = hoveredIdx === index;
                        return (
                          <div key={svc.label}>
                            <button
                              type="button"
                              onClick={() => handleSelect(svc.label)}
                              onMouseEnter={() => setHoveredIdx(index)}
                              onMouseLeave={() => setHoveredIdx(-1)}
                              className="w-full flex items-center gap-2 px-3.5 py-2 text-left text-[0.8rem] transition-all duration-200 cursor-pointer relative"
                              style={{
                                color: isSelected ? '#00F2FE' : isHovered ? '#E2E8F0' : '#94A3B8',
                                background: isHovered ? 'rgba(0,242,254,0.06)' : isSelected ? 'rgba(0,242,254,0.04)' : 'transparent',
                              }}
                            >
                              <div
                                className="absolute left-0 top-[25%] bottom-[25%] w-[2px] rounded-full transition-all duration-300"
                                style={{
                                  background: isSelected || isHovered ? '#00F2FE' : 'transparent',
                                  boxShadow: isSelected || isHovered ? '0 0 6px rgba(0,242,254,0.4)' : 'none',
                                }}
                              />
                              <span className="flex-1">{svc.label}</span>
                              {svc.tag && (
                                <span className="text-[0.55rem] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                                  style={{
                                    background: svc.tag === 'Popular' ? 'rgba(0,242,254,0.12)' : svc.tag === 'Trending' ? 'rgba(168,85,247,0.12)' : 'rgba(16,185,129,0.12)',
                                    color: svc.tag === 'Popular' ? '#00F2FE' : svc.tag === 'Trending' ? '#A855F7' : '#10B981',
                                  }}
                                >
                                  {svc.tag}
                                </span>
                              )}
                              {isSelected && (
                                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                  <path d="M4 8L7 11L12 5" stroke="#00F2FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </button>
                            {index < SERVICES.length - 1 && (
                              <div
                                className="mx-3.5 h-px transition-all duration-300"
                                style={{
                                  background: isHovered
                                    ? 'linear-gradient(90deg, transparent, rgba(0,242,254,0.25), transparent)'
                                    : 'rgba(255,255,255,0.04)',
                                  boxShadow: isHovered ? '0 0 4px rgba(0,242,254,0.1)' : 'none',
                                }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Details (Shows when a service is selected) */}
              <div className={`overflow-hidden transition-all duration-300 ${selected ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 -mt-2'}`}>
                {selected && (
                  <div className="flex items-start gap-2.5 bg-accent/[0.04] border border-accent/20 rounded-lg px-3.5 py-3 shadow-[inset_0_0_20px_rgba(0,242,254,0.02)]">
                    <div className="mt-[2px] text-accent">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M8 15A7 7 0 108 1a7 7 0 000 14zm0-10v3m0 3h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-[0.72rem] text-mut leading-relaxed">
                      <strong className="text-accent font-semibold mr-1.5 uppercase tracking-wider text-[0.68rem]">Includes:</strong> 
                      {SERVICES.find(s => s.label === selected)?.details}
                    </p>
                  </div>
                )}
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
              {selected && SERVICES.find(s => s.label === selected)?.needsWebsite && (
                <div className="grid gap-1.5 animate-in fade-in slide-in-from-top-1 duration-300">
                  <label className="text-[0.7rem] font-semibold text-mut uppercase tracking-[0.08em]">
                    Website Domain <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent/60 focus:bg-white/[0.06] transition-all duration-300 text-ink placeholder-white/20"
                    placeholder="https://yoursite.com"
                  />
                </div>
              )}

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
