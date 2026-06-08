import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Calendar, CheckCircle2, Bot, PhoneCall, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

import RadialOrbitalTimeline from '../components/ui/radial-orbital-timeline';

export default function HowItWorks() {
  const timelineData = [
    {
      id: 1,
      title: "Under 60-Second Response",
      date: "Step 1",
      content: "When a new lead fills out a form on your website or Facebook ad, our system detects it instantly. Within 60 seconds, it sends a personalized, conversational SMS and Email to the lead.",
      category: "Speed",
      icon: Clock,
      relatedIds: [2],
      status: "completed",
      energy: 100,
    },
    {
      id: 2,
      title: "AI Qualification",
      date: "Step 2",
      content: "The system engages the lead in a natural conversation to answer basic questions, pre-qualify their needs, and guide them towards booking a consultation.",
      category: "Automation",
      icon: Bot,
      relatedIds: [1, 3],
      status: "completed",
      energy: 90,
    },
    {
      id: 3,
      title: "Automated Booking",
      date: "Step 3",
      content: "Leads are provided a direct link to your calendar. They pick a time that works for them without you or your front desk having to play phone tag.",
      category: "Conversion",
      icon: Calendar,
      relatedIds: [2, 4],
      status: "in-progress",
      energy: 70,
    },
    {
      id: 4,
      title: "Missed Call Text-Back",
      date: "Step 4",
      content: "If your clinic misses a call during a busy rush or after hours, the system immediately texts the caller: 'Hi, we just missed your call! How can we help you today?'",
      category: "Retention",
      icon: PhoneCall,
      relatedIds: [3, 5],
      status: "pending",
      energy: 50,
    },
    {
      id: 5,
      title: "No-Show Prevention",
      date: "Step 5",
      content: "Automated email and SMS reminders are sent 24 hours and 1 hour before the appointment, drastically reducing your no-show rate.",
      category: "Reliability",
      icon: CheckCircle2,
      relatedIds: [4],
      status: "pending",
      energy: 30,
    }
  ];

  return (
    <main className="min-h-screen pt-[120px] pb-[80px] bg-bg2 relative overflow-hidden">
      <SEO title="How It Works" description="See exactly how our automated follow-up system integrates with your clinic." url="/how-it-works" />
      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            How the <span className="text-gradient">System Works</span>
          </h1>
          <p className="text-mut text-[1.1rem] md:text-[1.2rem] max-w-[600px] mx-auto leading-relaxed">
            We don't just give you software. We build a fully automated, invisible employee for your clinic that works 24/7.
          </p>
        </div>

        {/* Radial Orbital Timeline */}
        <div className="mt-12 -mx-6 md:mx-0">
          <RadialOrbitalTimeline timelineData={timelineData} />
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
