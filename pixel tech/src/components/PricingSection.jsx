import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import * as PricingCard from './ui/pricing-card';
import { CheckCircle2, Terminal, Layers, Cpu } from 'lucide-react';

export default function PricingSection() {
  const plans = [
    {
      icon: <Terminal />,
      name: 'Digital Presence',
      description: 'Perfect for startups needing an immediate, high-performing footprint.',
      price: '$1.5k',
      period: ' starting',
      variant: 'outline',
      features: [
        'High-converting Landing Page',
        'Next.js & React Framework',
        'Core Web Vitals Optimization',
        'Lead Capture Integration',
        'Basic SEO Setup'
      ],
    },
    {
      icon: <Layers />,
      name: 'Pixeltech System',
      description: 'The complete automated machine for established businesses.',
      badge: 'Popular',
      price: 'Custom',
      original: '',
      period: ' quote',
      variant: 'accent',
      features: [
        'Custom Full-Stack Web App',
        'React/Next.js Frontend & Node Backend',
        'Booked Solid Automation Integration',
        'Missed-Call Text-Back & SMS Follow-up',
        'Self-Booking Calendar Infrastructure',
        'Dashboard + Monthly Optimization'
      ],
    },
    {
      icon: <Cpu />,
      name: 'Enterprise Growth',
      description: 'Uncapped scaling with dedicated architecture and AI integrations.',
      price: '$4k',
      period: '/month',
      variant: 'outline',
      features: [
        'Everything in Pixeltech System',
        'Dedicated Technical Account Manager',
        'Custom Data Dashboards & Analytics',
        'Proprietary AI Automations',
        'Enterprise Security & Compliance',
        'Priority 24/7 SLA Support'
      ],
    },
  ];

  return (
    <section id="pricing" className="py-[86px] border-b border-line bg-bg2 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[780px] mx-auto px-[22px] text-center relative z-10">
        <div className="w-full text-left">
          <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase border-l-2 border-accent pl-4 inline-block mb-6">
            The Solution
          </span>
        </div>
        <h2 className="mb-3.5 text-3xl md:text-4xl font-extrabold tracking-tight">
          Enterprise engineering. <span className="text-gradient">Accessible.</span>
        </h2>
        <p className="text-mut text-[1.05rem]">
          Stop piecing together disparate tools. Get a unified, scalable system.
        </p>
      </div>
      
      <div className="max-w-[1280px] mx-auto px-[22px] relative z-10 mt-[54px]">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, idx) => (
            <motion.div
               key={plan.name}
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ delay: idx * 0.1, type: 'spring', stiffness: 80, damping: 20 }}
            >
              <PricingCard.Card className="h-full">
                <PricingCard.Header>
                  <PricingCard.Plan>
                    <PricingCard.PlanName>
                      {plan.icon}
                      <span>{plan.name}</span>
                    </PricingCard.PlanName>
                    {plan.badge && (
                      <PricingCard.Badge>{plan.badge}</PricingCard.Badge>
                    )}
                  </PricingCard.Plan>
                  
                  <PricingCard.Price>
                    <PricingCard.MainPrice>{plan.price}</PricingCard.MainPrice>
                    <PricingCard.Period>{plan.period}</PricingCard.Period>
                  </PricingCard.Price>
                  
                  <Link to="/booking" className="block mt-4">
                    <Button
                      variant={plan.variant}
                      className="w-full font-bold tracking-wider uppercase text-[0.8rem]"
                    >
                      Book a Technical Audit
                    </Button>
                  </Link>
                </PricingCard.Header>

                <PricingCard.Body>
                  <PricingCard.Description>
                    {plan.description}
                  </PricingCard.Description>
                  
                  <PricingCard.Separator />
                  
                  <PricingCard.List>
                    {plan.features.map((item) => (
                      <PricingCard.ListItem key={item}>
                        <CheckCircle2
                          className="text-accent h-4 w-4 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </PricingCard.ListItem>
                    ))}
                  </PricingCard.List>
                </PricingCard.Body>
              </PricingCard.Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
