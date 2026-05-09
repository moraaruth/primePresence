import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import Link from 'next/link';
import { CheckCircle, X, ArrowRight, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    tagline: 'For businesses launching their presence',
    priceKES: '45,000',
    setupNote: 'One-time project fee',
    highlight: false,
    features: [
      { text: '5-page luxury website', included: true },
      { text: 'Custom domain + free SSL', included: true },
      { text: 'Mobile-optimised design', included: true },
      { text: 'Basic SEO setup', included: true },
      { text: 'Lead capture forms', included: true },
      { text: '2 rounds of revisions', included: true },
      { text: 'Blog / CMS', included: false },
      { text: 'AI chatbot widget', included: false },
      { text: 'Social media management', included: false },
      { text: 'Monthly strategy call', included: false },
    ],
    cta: 'Enquire Now',
  },
  {
    name: 'Growth',
    tagline: 'For businesses scaling their brand',
    priceKES: '95,000',
    setupNote: 'One-time project fee',
    highlight: true,
    badge: 'Most Popular',
    features: [
      { text: 'Up to 10 pages', included: true },
      { text: 'Custom domain + free SSL', included: true },
      { text: 'Full brand identity', included: true },
      { text: 'Advanced SEO + content', included: true },
      { text: 'Blog / CMS', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'Lead capture + notifications', included: true },
      { text: 'Unlimited revisions', included: true },
      { text: 'Monthly strategy call', included: true },
      { text: 'AI chatbot widget', included: false },
    ],
    cta: 'Enquire Now',
  },
  {
    name: 'Elite',
    tagline: 'For premium brands demanding the best',
    priceKES: '185,000',
    setupNote: 'One-time project fee',
    highlight: false,
    features: [
      { text: 'Unlimited pages', included: true },
      { text: 'Custom domain + free SSL', included: true },
      { text: 'Full brand identity system', included: true },
      { text: 'Enterprise SEO strategy', included: true },
      { text: 'AI chatbot widget', included: true },
      { text: 'Social media management', included: true },
      { text: 'Analytics + lead scoring', included: true },
      { text: 'WhatsApp integration', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Unlimited revisions', included: true },
    ],
    cta: 'Enquire Now',
  },
];

const faqs = [
  {
    q: 'Do I need to do anything myself?',
    a: 'Very little. You fill in our enquiry form, share your brand details and any content you have, then review and approve our work. We handle everything else.',
  },
  {
    q: 'How long does it take to launch?',
    a: 'Most projects go live within 7–14 days depending on the plan and how quickly you provide feedback.',
  },
  {
    q: 'What if I already have a domain?',
    a: 'No problem. We connect your existing domain. If you need one, we can register it for you.',
  },
  {
    q: 'How many revisions do I get?',
    a: 'Starter includes 2 rounds of revisions. Growth and Elite include unlimited revisions until you are happy.',
  },
  {
    q: 'Do you offer monthly management after launch?',
    a: 'Yes. We offer monthly retainer packages for content updates, SEO, social media, and ongoing support.',
  },
  {
    q: 'Do you accept M-Pesa?',
    a: 'Yes. We accept M-Pesa, bank transfer, and all major cards. All prices are in Kenyan Shillings (KSh).',
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-theme-secondary pt-40 pb-20 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="section-label mb-6">Investment</p>
            <h1 className="font-display text-6xl lg:text-8xl font-light text-theme-primary leading-none mb-6">
              Transparent.
              <br />
              <span className="gold-text italic">Premium. Fair.</span>
            </h1>
            <p className="text-theme-muted text-lg max-w-xl mx-auto">
              Every plan includes a dedicated team, luxury-grade design, and a commitment to your growth.
              No hidden fees. No surprises.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <SectionWrapper className="py-16 px-6 lg:px-12 bg-theme-primary">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {plans.map(({ name, tagline, priceKES, setupNote, highlight, badge, features, cta }) => (
                <div
                  key={name}
                  className={`relative flex flex-col border transition-all duration-300 ${
                    highlight
                      ? 'border-gold shadow-gold'
                      : 'border-theme-subtle hover:border-gold/40'
                  }`}
                  style={{ background: highlight ? 'color-mix(in srgb, var(--gold) 5%, var(--bg-elevated))' : 'var(--bg-elevated)' }}
                >
                  {badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-text-inverse text-xs font-semibold tracking-widest uppercase px-4 py-1.5 flex items-center gap-1">
                      <Zap size={12} />
                      {badge}
                    </div>
                  )}

                  <div className={`p-8 border-b ${highlight ? 'border-gold/30' : 'border-theme-subtle'}`}>
                    <p className="section-label mb-2">{name}</p>
                    <p className="text-theme-muted text-sm mb-6">{tagline}</p>
                    <div className="mb-1">
                      <span className="font-display text-5xl font-light text-theme-primary">KSh {priceKES}</span>
                    </div>
                    <p className="text-theme-muted text-xs mt-2">{setupNote}</p>
                  </div>

                  <div className="p-8 flex-1">
                    <ul className="flex flex-col gap-3">
                      {features.map(({ text, included }) => (
                        <li key={text} className="flex items-start gap-3">
                          {included ? (
                            <CheckCircle size={15} className="text-gold mt-0.5 shrink-0" />
                          ) : (
                            <X size={15} className="text-theme-muted mt-0.5 shrink-0 opacity-40" />
                          )}
                          <span className={`text-sm ${included ? 'text-theme-secondary' : 'text-theme-muted opacity-50 line-through'}`}>
                            {text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 pt-0">
                    <Link
                      href="/contact"
                      className={`w-full flex items-center justify-center gap-2 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 ${
                        highlight
                          ? 'bg-gold text-text-inverse hover:bg-gold-light'
                          : 'border border-gold text-gold hover:bg-gold hover:text-text-inverse'
                      }`}
                    >
                      {cta} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-theme-muted text-sm mt-8">
              Need a monthly management plan?{' '}
              <Link href="/contact" className="text-gold hover:text-gold-light transition-colors">
                Contact us for retainer pricing →
              </Link>
            </p>
          </div>
        </SectionWrapper>

        {/* FAQ */}
        <SectionWrapper className="py-28 px-6 lg:px-12 bg-theme-secondary">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="section-label mb-4">Questions</p>
              <h2 className="font-display text-5xl font-light text-theme-primary">
                Frequently <span className="gold-text italic">Asked</span>
              </h2>
              <div className="divider-gold" />
            </div>
            <div className="flex flex-col divide-y divide-theme-subtle">
              {faqs.map(({ q, a }) => (
                <div key={q} className="py-8">
                  <h3 className="font-display text-xl font-light text-theme-primary mb-3">{q}</h3>
                  <p className="text-theme-muted text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* CTA */}
        <SectionWrapper className="py-24 px-6 lg:px-12 border-t border-theme-subtle bg-theme-primary">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-5xl font-light text-theme-primary mb-6">
              Still Deciding?
              <br />
              <span className="gold-text italic">Let's Talk.</span>
            </h2>
            <p className="text-theme-muted mb-10">
              Book a free 30-minute strategy call. No pressure, no pitch — just clarity on what's right for you.
            </p>
            <Link href="/contact" className="btn-gold">
              Book Free Strategy Call <ArrowRight size={16} />
            </Link>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
