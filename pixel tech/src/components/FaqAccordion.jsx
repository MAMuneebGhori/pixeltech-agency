import React from 'react';

export default function FaqAccordion() {
  const faqs = [
    {
      q: 'Do you use WordPress or templates?',
      a: 'No. We engineer custom full-stack applications (usually React/Next.js for the frontend and Node.js for the backend). This ensures blazing-fast load times, maximum security, and the flexibility to build any specific business logic you need.'
    },
    {
      q: 'How does the Booked Solid automation work?',
      a: 'We integrate a CRM and automation engine directly into your new application. When a user submits a form or misses a call, the system instantly triggers an SMS and email sequence to capture their attention and guide them to a self-booking calendar.'
    },
    {
      q: 'Will my current CRM/EMR integrate?',
      a: 'In most cases, yes. Our engineering team can build custom API integrations or utilize Zapier/Make webhooks to pass data seamlessly between your new custom application and your existing tools.'
    },
    {
      q: 'How long does a custom build take?',
      a: 'It depends on the complexity of your requirements. A standard landing page with the automation engine can be live in 14 days. More complex SaaS or full-stack platforms generally take 4-8 weeks to engineer and deploy.'
    },
    {
      q: 'What is the $650/mo fee for?',
      a: 'This covers the ongoing cloud hosting of your application, maintenance, software updates, and the full licensing/usage of the Booked Solid automation engine (SMS/Email costs included). We also provide monthly technical reviews to optimize conversion rates.'
    }
  ];

  return (
    <section className="py-[86px] border-b border-line bg-bg">
      <div className="max-w-[640px] mx-auto px-[22px]">
        <h2 className="text-center mb-[44px]">Frequently Asked Questions</h2>
        
        <div className="grid gap-[14px]">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group bg-card border border-line rounded-[14px] overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-[22px_24px] font-bold text-[1.05rem] cursor-pointer hover:text-accent transition-colors">
                {faq.q}
                <span className="text-[1.4rem] font-light text-mut transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <div className="px-[24px] pb-[24px] text-mut leading-relaxed border-t border-line/50 mt-2 pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
