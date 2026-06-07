import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HonestFitCheck from '../components/HonestFitCheck';
import { Code2, Zap, Shield, Users, Target, Cpu } from 'lucide-react';
import AboutSection1 from '../components/ui/about-section-1';
import Testimonial1 from '../components/ui/testimonial-1';

export default function About() {
  const values = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Engineering First',
      desc: 'Every project starts with clean architecture and scalable code — not templates bolted together with plugins.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Speed Obsessed',
      desc: 'Sub-second load times, instant lead responses, and rapid development cycles. We move fast and ship quality.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Security by Design',
      desc: 'Enterprise-grade security baked into every layer — from encrypted API endpoints to secure cloud infrastructure.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Partnership Model',
      desc: "We don't hand over a codebase and disappear. We partner with you for the long haul with monthly optimization."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Conversion Driven',
      desc: "Beautiful design is great. Design that converts? That's what we engineer. Every element serves a purpose."
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'AI-Ready Infrastructure',
      desc: 'Our architectures are built to integrate AI automations and machine learning — future-proofing your investment.'
    }
  ];

  const team = [
    {
      name: 'Umer Bin Abdul Aziz',
      role: 'Founder',
      bio: 'Full-stack engineer with a passion for building systems that scale businesses. Specializes in React, Next.js, and automation architecture.',
      linkedIn: 'https://www.linkedin.com/in/umerbinaaziz/'
    },
    {
      name: 'M. A. Muneeb Ghori',
      role: 'Lead Engineer',
      bio: 'Expert software engineer focused on building robust, high-performance web applications and seamless user experiences.',
      linkedIn: 'https://www.linkedin.com/in/m-a-muneeb-ghori-313817414'
    }
  ];

  return (
    <main className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="pt-[140px] pb-[80px] relative overflow-hidden border-b border-line">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(600px_400px_at_30%_0%,rgba(0,242,254,0.1),transparent_70%)] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-[780px] mx-auto px-6 text-center relative z-10"
        >
          <div className="w-full text-left">
            <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase border-l-2 border-accent pl-4 inline-block mb-6">
              About Pixeltech
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            We build digital systems that{' '}
            <span className="text-gradient">actually work.</span>
          </h1>
          <p className="text-mut text-lg max-w-[580px] mx-auto leading-relaxed">
            Pixeltech Agency is an engineering-first digital studio. We don't do cookie-cutter websites — we build custom full-stack applications integrated with automated revenue systems.
          </p>
        </motion.div>
      </section>

      {/* Animated About Section Component */}
      <AboutSection1 />

      {/* Mission */}
      <section className="py-[100px] border-y border-line bg-bg2 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1080px] mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase border-l-2 border-accent pl-4 inline-block mb-4">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-4 mb-6">
                Engineer the gap between <span className="text-gradient">great products</span> and <span className="text-gradient">great growth.</span>
              </h2>
              <p className="text-mut text-[1.05rem] leading-relaxed mb-6">
                Most businesses have incredible services but terrible digital infrastructure. Their websites are slow, their lead follow-up is manual, and they're bleeding money every day.
              </p>
              <p className="text-mut text-[1.05rem] leading-relaxed">
                We close that gap with custom-engineered web applications and automated conversion systems. When a lead hits your site, they should be booked on your calendar within 60 seconds — not lost in an inbox.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card border border-line rounded-2xl p-8 shadow-2xl"
            >
              <div className="grid gap-6">
                {[
                  { num: '01', text: 'Every millisecond of load time matters for conversion' },
                  { num: '02', text: 'Automation beats manual follow-up 100% of the time' },
                  { num: '03', text: 'Custom code outperforms templates in every metric' },
                  { num: '04', text: 'Engineering and marketing must work as one system' },
                ].map((belief) => (
                  <div key={belief.num} className="flex gap-4 items-start">
                    <span className="text-accent font-bold text-lg shrink-0">{belief.num}</span>
                    <p className="text-[0.95rem] text-ink/80 leading-relaxed">{belief.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-[100px] border-b border-line bg-bg relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[780px] mx-auto px-6 text-center relative z-10 mb-16">
          <div className="w-full text-left">
            <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase border-l-2 border-accent pl-4 inline-block mb-6">
              Our Values
            </span>
          </div>
          <h2 className="mb-3.5">
            What drives <span className="text-gradient">every line of code.</span>
          </h2>
        </div>

        <div className="max-w-[1080px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.08 }}
                className="group bg-card border border-line rounded-2xl p-7 hover:border-accent/40 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5 relative z-10 group-hover:shadow-[0_0_15px_rgba(0,242,254,0.2)] transition-shadow">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 relative z-10">{value.title}</h3>
                <p className="text-mut text-[0.95rem] leading-relaxed relative z-10">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-[100px] border-b border-line bg-bg2 relative overflow-hidden">
        <div className="max-w-[780px] mx-auto px-6 text-center relative z-10 mb-16">
          <div className="w-full text-left">
            <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase border-l-2 border-accent pl-4 inline-block mb-6">
              The Team
            </span>
          </div>
          <h2 className="mb-3.5">
            Built by <span className="text-gradient">engineers, for growth.</span>
          </h2>
        </div>

        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
            {team.map((member) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-line rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden group flex flex-col h-full"
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="w-20 h-20 rounded-full bg-gradient-brand mx-auto mb-5 flex items-center justify-center text-[#05050A] font-extrabold text-2xl shadow-[0_0_20px_rgba(0,242,254,0.3)] shrink-0">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-accent text-sm font-medium mb-4">{member.role}</p>
                <p className="text-mut text-[0.95rem] leading-relaxed mb-6 flex-grow">{member.bio}</p>
                <a 
                  href={member.linkedIn} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-mut hover:text-accent transition-colors mt-auto"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  Connect on LinkedIn
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <HonestFitCheck />
      <Testimonial1 />
      
      {/* CTA */}
      <section className="text-center bg-[radial-gradient(700px_360px_at_50%_120%,rgba(0,242,254,0.15),transparent_70%)] py-[86px] border-b border-line bg-bg">
        <div className="max-w-[780px] mx-auto px-6 text-center">
          <h2 className="mb-3.5 text-4xl md:text-5xl">
            Let's build something<br />
            <span className="text-gradient">extraordinary together.</span>
          </h2>
          <p className="max-w-[580px] mx-auto mt-5 mb-8 text-mut text-[1.1rem]">
            We're selective about who we work with — but if you're serious about scaling, we'd love to talk.
          </p>
          <Link to="/booking" className="btn-primary inline-block text-lg shadow-[0_0_20px_rgba(0,242,254,0.2)]">
            Book My Free Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
