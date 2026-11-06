import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Section } from '../components/HomeSections';

// Claims here stay within the SRD and the home page. No client results until client #1 (plan rule 3).
const PRINCIPLES = [
  ['Speed decides who gets the booking', 'Leads reached within an hour are about 7× more likely to have a real conversation than leads reached an hour later (Harvard Business Review, 2011). The system replies to missed calls and DMs within 60 seconds.'],
  ['Done for you', "You don't learn new software. We set up your receptionist, connect your calendar, test it with you and keep it running."],
  ['Med spas only', 'Every service menu, script and guardrail is written for aesthetic clinics: Botox, fillers, laser, facials, IV and consults. Medical questions always go to your clinician.'],
];

export default function About() {
  return (
    <main className="bg-bg">
      <SEO title="About" description="PixelTech builds the Booked Solid System: an AI receptionist and lead-reactivation system for med spas." url="/about" />

      <Section
        titleAs="h1"
        eyebrow="About PixelTech"
        title={<>We help med spas stop <em className="text-accent">leaking revenue.</em></>}
        intro="Clinics spend thousands a month on ads and SEO. Then the call lands while the front desk is with a patient, the DM sits until morning, and the lead books somewhere else."
      >
        <div className="max-w-[720px] space-y-5 text-ink text-[1.05rem] leading-relaxed">
          <p>
            Practitioners are great at treating patients. They don't have time to watch the phone for someone asking "How much is Botox?" at 9 PM.
          </p>
          <p>
            Most agencies sell you more leads. We work on what happens after the lead arrives. The Booked Solid System answers your calls, replies to texts and Instagram and Facebook DMs, books into your calendar and follows up with past clients.
          </p>
        </div>
      </Section>

      <Section eyebrow="How we work" title="Three things we won't compromise on." alt>
        <div className="grid gap-5 md:grid-cols-3">
          {PRINCIPLES.map(([title, text]) => (
            <div key={title} className="bg-card border border-line rounded-[18px] p-6">
              <h3 className="text-[1.6rem] leading-tight mb-3">{title}</h3>
              <p className="text-mut leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link to="/booking" className="btn-primary text-base">Book a 15-min ROI audit</Link>
        </div>
      </Section>
    </main>
  );
}
