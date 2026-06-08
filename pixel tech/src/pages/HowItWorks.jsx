import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Calendar, CheckCircle2, Bot, PhoneCall, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Clock className="w-6 h-6 text-[#05050A]" />,
      title: "Under 60-Second Response",
      description: "When a new lead fills out a form on your website or Facebook ad, our system detects it instantly. Within 60 seconds, it sends a personalized, conversational SMS and Email to the lead.",
      delay: 0.1
    },
    {
      icon: <Bot className="w-6 h-6 text-[#05050A]" />,
      title: "AI Qualification",
      description: "The system engages the lead in a natural conversation to answer basic questions, pre-qualify their needs, and guide them towards booking a consultation.",
      delay: 0.2
    },
    {
      icon: <Calendar className="w-6 h-6 text-[#05050A]" />,
      title: "Automated Booking",
      description: "Leads are provided a direct link to your calendar. They pick a time that works for them without you or your front desk having to play phone tag.",
      delay: 0.3
    },
    {
      icon: <PhoneCall className="w-6 h-6 text-[#05050A]" />,
      title: "Missed Call Text-Back",
      description: "If your clinic misses a call during a busy rush or after hours, the system immediately texts the caller: 'Hi, we just missed your call! How can we help you today?'",
      delay: 0.4
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-[#05050A]" />,
      title: "No-Show Prevention",
      description: "Automated email and SMS reminders are sent 24 hours and 1 hour before the appointment, drastically reducing your no-show rate.",
      delay: 0.5
    }
  ];

  return (
    <main className="min-h-screen pt-[120px] pb-[80px] bg-bg2 relative overflow-hidden">
      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            How the <span className="text-gradient">System Works</span>
          </h1>
          <p className="text-mut text-[1.1rem] md:text-[1.2rem] max-w-[600px] mx-auto leading-relaxed">
            We don't just give you software. We build a fully automated, invisible employee for your clinic that works 24/7.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-line to-transparent md:-translate-x-1/2" />

          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: step.delay, type: 'spring', stiffness: 100, damping: 20 }}
                className={`relative flex items-center mb-12 md:mb-20 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline Node */}
                <div className="absolute left-6 md:left-1/2 w-12 h-12 rounded-full bg-gradient-brand shadow-[0_0_20px_rgba(0,242,254,0.4)] flex items-center justify-center z-10 -translate-x-1/2">
                  {step.icon}
                </div>

                {/* Content Card */}
                <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                  <div className="bg-card border border-line p-6 rounded-2xl shadow-lg hover:border-accent/40 transition-colors">
                    <h3 className="text-xl font-bold mb-3 text-ink">{step.title}</h3>
                    <p className="text-mut leading-relaxed text-[0.95rem]">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/booking" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
            Book My Free Lead-Leak Audit
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </main>
  );
}
