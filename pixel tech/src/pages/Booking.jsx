import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import SEO from '../components/SEO';

// Services removed, form is hardcoded to the single offer

export default function Booking() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialService = searchParams.get('service');
  const defaultPackage = (initialService === 'core' || initialService === 'core_and_landing_page') ? initialService : '';

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
    selectedPackage: defaultPackage
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
    if (formData.selectedPackage === 'core_and_landing_page' && !formData.website) {
      alert('Please enter your existing Website Domain so we know what needs replacing.');
      return;
    }
    if (!formData.selectedPackage) {
      alert('Please select a package.');
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
          service: formData.selectedPackage === 'core_and_landing_page' ? 'Booked Solid System + Landing Page' : 'Booked Solid System',
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
    <main className="pt-[100px] lg:pt-[120px] pb-[80px] bg-bg relative overflow-hidden">
      <SEO title="Book a Call" description="Schedule your free lead-leak audit." url="/booking" />
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
              <div className="grid gap-1.5">
                <label className="text-[0.7rem] font-semibold text-mut uppercase tracking-[0.08em]">Select Options <span className="text-red-500">*</span></label>
                <Select required value={formData.selectedPackage || undefined} onValueChange={(val) => setFormData({...formData, selectedPackage: val})}>
                  <SelectTrigger className="w-full h-[42px] bg-white/[0.04] border-white/[0.08] rounded-lg px-3 py-2.5 text-sm focus-visible:border-accent/60 focus-visible:bg-white/[0.06] transition-all duration-300 text-ink">
                    <SelectValue placeholder="Choose a package..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="core">The Booked Solid System (Core)</SelectItem>
                    <SelectItem value="core_and_landing_page">Booked Solid System + Landing Page Add-on</SelectItem>
                  </SelectContent>
                </Select>
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
                  <Select value={formData.budget} onValueChange={(val) => setFormData({...formData, budget: val})}>
                    <SelectTrigger className="w-full h-[42px] bg-white/[0.04] border-white/[0.08] rounded-lg px-3 py-2.5 text-sm focus-visible:border-accent/60 focus-visible:bg-white/[0.06] transition-all duration-300 text-ink">
                      <SelectValue placeholder="Select a range..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="< $5k">&lt; $5,000</SelectItem>
                      <SelectItem value="$5k - $10k">$5,000 - $10,000</SelectItem>
                      <SelectItem value="$10k - $25k">$10,000 - $25,000</SelectItem>
                      <SelectItem value="$25k+">$25,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Website */}
              <div className="grid gap-1.5 transition-all duration-300">
                <label className="text-[0.7rem] font-semibold text-mut uppercase tracking-[0.08em]">
                  Website Domain {formData.selectedPackage === 'core_and_landing_page' && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  required={formData.selectedPackage === 'core_and_landing_page'}
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
