import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, MessageSquarePlus } from 'lucide-react';

export default function TestimonialsPage() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', clinic: '', review: '', rating: 5 });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviewSubmitted(true);
    
    // Attempt to save to backend silently as a feedback lead
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    fetch(`${apiUrl}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: formData.name,
        lastName: formData.clinic,
        email: 'review@pixeltech.agency', // Placeholder for DB constraints
        phone: 'N/A',
        budget: `Rating: ${formData.rating} Stars`,
        goal: `CLIENT REVIEW: ${formData.review}`,
        service: 'Client Feedback',
        source: 'Review Form'
      })
    }).catch(err => console.error('Failed to submit review lead:', err));
  };

  const testimonials = [
    {
      quote: "We were spending thousands on ads every month, but leads would sit for hours before anyone replied. After PixelTech installed the system, every lead started getting an immediate response, even after business hours. Our booking rate doubled in the first 30 days.",
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop",
      name: "Dr. Sarah Jenkins",
      role: "Owner, Lumina Med Spa",
      metric: "+104% Bookings"
    },
    {
      quote: "The biggest issue we had was no-shows and endless phone tag. Since launching the automated follow-up and booking infrastructure, our front desk is no longer stressed out. Patients book themselves online, and the automatic reminders have cut our no-shows down to almost zero.",
      src: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=250&auto=format&fit=crop",
      name: "Michael Chen",
      role: "Director, Revive Aesthetics",
      metric: "98% Show Rate"
    },
    {
      quote: "We've tried three different marketing agencies before, and all they did was send us raw leads that we couldn't close. PixelTech is the only one that actually built the system to follow up with them automatically. I literally wake up to new appointments on my calendar.",
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&auto=format&fit=crop",
      name: "Jessica Alvarez",
      role: "Founder, Glow Clinic",
      metric: "24/7 Automated Booking"
    },
    {
      quote: "The missed-call text-back feature alone paid for the entire setup in the first week. We had a client call while we were with another patient, and the system instantly texted them. They replied, got qualified by the AI, and booked a $1,200 package before we even finished our treatment.",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop",
      name: "David Rossi",
      role: "Partner, Elite Wellness",
      metric: "$1,200 Saved in Week 1"
    }
  ];

  return (
    <main className="min-h-screen pt-[120px] pb-[80px] bg-bg relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent/5 blur-[100px] rounded-full pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent/5 blur-[100px] rounded-full pointer-events-none translate-x-1/2" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-[0.65rem] tracking-[0.18em] uppercase text-accent border border-accent/20 rounded-full px-3.5 py-1.5 mb-6 bg-accent/5">
            <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
            Client Success Stories
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Don't Just Take <span className="text-gradient">Our Word For It.</span>
          </h1>
          <p className="text-mut text-[1.1rem] md:text-[1.2rem] leading-relaxed max-w-[650px] mx-auto">
            See how Med Spas and Clinics are transforming their lead flow, stopping leakage, and booking their calendars solid.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0B1120]/80 backdrop-blur-xl border border-line p-8 rounded-3xl hover:border-accent/40 hover:shadow-[0_0_30px_rgba(0,242,254,0.15)] transition-all duration-300 flex flex-col"
            >
              {/* Stars & Metric */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="text-[0.7rem] font-bold uppercase tracking-wider bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20">
                  {t.metric}
                </div>
              </div>

              {/* Quote */}
              <p className="text-[1.05rem] text-ink leading-relaxed mb-8 flex-grow">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-line/50">
                <img src={t.src} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-accent/20" />
                <div>
                  <h4 className="font-bold text-ink">{t.name}</h4>
                  <p className="text-mut text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Review Submission Form */}
        <div className="mb-20 max-w-[800px] mx-auto bg-card border border-line rounded-3xl p-8 md:p-12 text-center shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          {!showReviewForm && !reviewSubmitted ? (
            <div>
              <MessageSquarePlus className="w-12 h-12 text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Are you a PixelTech client?</h3>
              <p className="text-mut mb-8 max-w-[500px] mx-auto">
                We'd love to hear about your experience. Share your results and help other clinic owners discover predictable growth.
              </p>
              <button 
                onClick={() => setShowReviewForm(true)}
                className="btn-primary px-8 py-3 bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-[#05050A]"
              >
                Write a Review
              </button>
            </div>
          ) : reviewSubmitted ? (
            <div className="py-8 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-accent fill-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Thank you!</h3>
              <p className="text-mut">Your review has been securely submitted. It will be published shortly after moderation.</p>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="text-left animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-2xl font-bold mb-8 text-center">Submit Your Review</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-mut uppercase tracking-wider mb-2">Your Name</label>
                  <input required type="text" placeholder="Dr. John Doe" className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-ink focus:border-accent outline-none transition-colors" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-mut uppercase tracking-wider mb-2">Clinic Name</label>
                  <input required type="text" placeholder="Lumina Med Spa" className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-ink focus:border-accent outline-none transition-colors" value={formData.clinic} onChange={(e) => setFormData({...formData, clinic: e.target.value})} />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-mut uppercase tracking-wider mb-2">Rating</label>
                <div className="flex gap-2 bg-bg border border-line rounded-xl px-4 py-3 w-max">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      type="button" 
                      key={star} 
                      onClick={() => setFormData({...formData, rating: star})}
                      className="hover:scale-110 transition-transform focus:outline-none"
                    >
                      <Star className={`w-8 h-8 ${star <= formData.rating ? 'text-yellow-400 fill-yellow-400 shadow-yellow-400 drop-shadow-md' : 'text-mut'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-xs font-bold text-mut uppercase tracking-wider mb-2">Your Experience</label>
                <textarea required rows="4" placeholder="How has PixelTech's automated system impacted your clinic?" className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-ink focus:border-accent outline-none resize-none transition-colors" value={formData.review} onChange={(e) => setFormData({...formData, review: e.target.value})}></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button type="submit" className="btn-primary sm:flex-1 py-4 text-lg">Submit Review</button>
                <button type="button" onClick={() => setShowReviewForm(false)} className="px-8 py-4 border border-line rounded-full text-mut hover:text-ink hover:bg-white/5 transition-colors font-bold">Cancel</button>
              </div>
            </form>
          )}
        </div>

        <div className="text-center pb-8 border-t border-line/50 pt-16">
          <h2 className="text-3xl font-bold mb-6">Ready to stop losing leads?</h2>
          <Link to="/booking" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
            Book My Free Lead-Leak Audit
          </Link>
        </div>

      </div>
    </main>
  );
}
