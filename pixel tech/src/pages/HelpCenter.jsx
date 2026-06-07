import React, { useState } from "react"
import { FAQSection } from "../components/ui/faqsection"
import { Link } from "react-router-dom"

const faqCategories = {
  general: {
    title: "General Questions",
    faqs: [
      {
        question: "Do you use WordPress or templates?",
        answer: "No. We engineer custom full-stack applications (usually React/Next.js for the frontend and Node.js for the backend). This ensures blazing-fast load times, maximum security, and the flexibility to build any specific business logic you need."
      },
      {
        question: "How long does a custom build take?",
        answer: "It depends on the complexity of your requirements. A standard landing page with the automation engine can be live in 14 days. More complex SaaS or full-stack platforms generally take 4-8 weeks to engineer and deploy."
      },
      {
        question: "Can I manage the content on the website myself?",
        answer: "Absolutely. We can integrate an easy-to-use Headless CMS (like Sanity or Strapi) so you and your team can update copy, images, and blogs without needing to touch a single line of code."
      },
      {
        question: "Do you handle domain registration and hosting?",
        answer: "Yes. We handle everything from domain registration and DNS configuration to cloud hosting setup (AWS, Vercel, or your preferred provider). Your domain and infrastructure are fully managed as part of our service."
      }
    ]
  },
  services: {
    title: "Our Services",
    faqs: [
      {
        question: "How does the Booked Solid automation work?",
        answer: "We integrate a CRM and automation engine directly into your new application. When a user submits a form or misses a call, the system instantly triggers an SMS and email sequence to capture their attention and guide them to a self-booking calendar."
      },
      {
        question: "Will my current CRM/EMR integrate?",
        answer: "In most cases, yes. Our engineering team can build custom API integrations or utilize Zapier/Make webhooks to pass data seamlessly between your new custom application and your existing tools."
      },
      {
        question: "Do you provide SEO services?",
        answer: "Our web applications are built with technical SEO best practices out of the box (fast load times, semantic HTML, dynamic metadata). For ongoing content SEO, we can partner with you on a monthly basis."
      },
      {
        question: "Can you build mobile apps too?",
        answer: "While our core focus is web applications, we can build Progressive Web Apps (PWAs) that work seamlessly on mobile devices, or recommend trusted partners for native iOS/Android development."
      }
    ]
  },
  support: {
    title: "Account & Support",
    faqs: [
      {
        question: "What is the $650/mo fee for?",
        answer: "This covers the ongoing cloud hosting of your application, maintenance, software updates, and the full licensing/usage of the Booked Solid automation engine (SMS/Email costs included). We also provide monthly technical reviews to optimize conversion rates."
      },
      {
        question: "What happens after the site launches?",
        answer: "We offer ongoing maintenance and support packages, which include server management, security updates, and regular performance optimizations. You're never left in the dark."
      },
      {
        question: "How do we get started?",
        answer: "Simply go to the 'Book Me' page, select the service you are interested in, and fill out the quick form. We'll get back to you within 60 minutes to schedule a consultation."
      },
      {
        question: "What if I want to cancel?",
        answer: "We don't believe in long-term lock-ins. Our monthly plans can be cancelled with 30 days notice. You own your codebase — we'll hand everything over cleanly."
      }
    ]
  }
}

export default function HelpCenter() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <main className="min-h-screen pt-[120px] pb-20 relative bg-bg">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1080px] mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-12 items-start">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-[280px] shrink-0 sticky top-[100px]">
          <h1 className="text-3xl font-extrabold mb-3">More Info</h1>
          <p className="text-mut text-sm mb-8">Everything you need to know about working with Pixeltech.</p>
          <nav className="flex flex-col gap-2">
            {Object.keys(faqCategories).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`text-left px-5 py-4 rounded-xl font-bold transition-all ${
                  activeTab === key
                    ? 'bg-gradient-brand text-[#05050A] shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                    : 'bg-card border border-line text-mut hover:text-ink hover:border-accent/50'
                }`}
              >
                {faqCategories[key].title}
              </button>
            ))}
          </nav>

          <div className="mt-12 bg-card border border-line rounded-xl p-6 text-center">
            <h3 className="font-bold text-lg mb-2">Need direct help?</h3>
            <p className="text-sm text-mut mb-6">Talk to one of our technical experts today.</p>
            <Link to="/booking" className="inline-block w-full bg-line text-ink hover:bg-accent hover:text-[#05050A] font-bold py-3 px-4 rounded-lg transition-colors">
              Book a Call
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full min-h-[500px]">
          <FAQSection
            title={faqCategories[activeTab].title}
            faqs={faqCategories[activeTab].faqs}
            className="w-full max-w-full"
          />
        </div>
      </div>

      <div className="max-w-[1080px] mx-auto px-6 mt-24 text-center border-t border-line/50 pt-16 relative z-10">
        <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
        <p className="text-mut mb-8 max-w-lg mx-auto">
          Reach out to us on our social channels or directly book a consultation. Our team is ready to help you scale.
        </p>
        <div className="flex items-center justify-center gap-6">
          <a href="https://www.instagram.com/pixeltech.agencyy" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-card border border-line flex items-center justify-center hover:border-accent hover:text-accent transition-all text-mut shadow-sm">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://x.com/pixeltechglobal" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-card border border-line flex items-center justify-center hover:border-accent hover:text-accent transition-all text-mut shadow-sm">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
          </a>
          <a href="https://www.facebook.com/officialpixeltech" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-card border border-line flex items-center justify-center hover:border-accent hover:text-accent transition-all text-mut shadow-sm">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <div className="relative group flex items-center justify-center">
            <button aria-label="WhatsApp Support Options" className="w-12 h-12 rounded-full bg-card border border-line flex items-center justify-center hover:border-accent hover:text-accent transition-all text-mut shadow-sm cursor-pointer outline-none">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </button>
            <div className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-max bg-card border border-line rounded-lg p-2 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col gap-1 z-50">
              <a href="https://wa.me/923336424891" target="_blank" rel="noreferrer" className="text-xs font-medium hover:text-accent px-4 py-2 rounded-md hover:bg-bg2 transition-colors text-left flex flex-col gap-1">
                <span className="text-ink">Chat with Umer</span>
                <span className="text-mut font-normal">+92 333 6424891</span>
              </a>
              <div className="h-px w-full bg-line/50 my-1"></div>
              <a href="https://wa.me/923118527408" target="_blank" rel="noreferrer" className="text-xs font-medium hover:text-accent px-4 py-2 rounded-md hover:bg-bg2 transition-colors text-left flex flex-col gap-1">
                <span className="text-ink">Chat with Muneeb</span>
                <span className="text-mut font-normal">+92 311 8527408</span>
              </a>
            </div>
          </div>
          <a href="https://www.linkedin.com/in/umerbinaaziz/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-card border border-line flex items-center justify-center hover:border-accent hover:text-accent transition-all text-mut shadow-sm">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>
      </div>
    </main>
  )
}
