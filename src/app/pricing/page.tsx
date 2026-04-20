import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import Link from 'next/link';
import { CheckCircle, X, ArrowRight, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    tagline: 'For businesses launching their digital presence',
    priceKES: '15,000',
    setupKES: '45,000',
    billing: '/month',
    highlight: false,
    features: [
      { text: '5-page luxury website', included: true },
      { text: 'Mobile-optimized design', included: true },
      { text: 'Basic SEO setup', included: true },
      { text: 'Lead capture forms', included: true },
      { text: 'Google Analytics integration', included: true },
      { text: 'SSL & hosting included', included: true },
      { text: '2 content updates/month', included: true },
      { text: 'Email support', included: true },
      { text: 'AI chatbot', included: false },
      { text: 'Social media management', included: false },
      { text: 'Paid ads management', included: false },
      { text: 'CRM integration', included: false },
    ],
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    tagline: 'For serious businesses scaling their brand',
    priceKES: '35,000',
    setupKES: '95,000',
    billing: '/month',
    highlight: true,
    badge: 'Most Popular',
    features: [
      { text: '10-page luxury website', included: true },
      { text: 'Custom brand identity', included: true },
      { text: 'Advanced SEO + content', included: true },
      { text: 'AI lead qualification chatbot', included: true },
      { text: 'CRM integration', included: true },
      { text: 'Social media (3 platforms)', included: true },
      { text: '12 posts/month', included: true },
      { text: 'Monthly strategy call', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'Priority support', included: true },
      { text: 'Paid ads management', included: false },
      { text: 'WhatsApp automation', included: false },
    ],
    cta: 'Start Growing',
  },
  {
    name: 'Elite',
    tagline: 'For established businesses demanding the best',
    priceKES: '75,000',
    setupKES: '185,000',
    billing: '/month',
    highlight: false,
    features: [
      { text: 'Unlimited pages', included: true },
      { text: 'Full brand identity system', included: true },
      { text: 'Enterprise SEO strategy', included: true },
      { text: 'AI chatbot + WhatsApp automation', included: true },
      { text: 'Full CRM + pipeline management', included: true },
      { text: 'Social media (all platforms)', included: true },
      { text: 'Daily posting + community mgmt', included: true },
      { text: 'Google + Meta ads management', included: true },
      { text: 'Weekly strategy calls', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Custom AI integrations', included: true },
      { text: 'Quarterly brand audits', included: true },
    ],
    cta: 'Go Elite',
  },
];

const faqs = [
  {
    q: 'How long does it take to launch my website?',
    a: 'Starter sites launch in 7–10 days. Growth and Elite platforms take 14–21 days depending on complexity and how quickly you provide content.',
  },
  {
    q: 'Is there a contract or can I cancel anytime?',
    a: 'We offer month-to-month plans after the initial 3-month commitment. Most clients stay because they see results — not because they\'re locked in.',
  },
  {
    q: 'What\'s included in the setup fee?',
    a: 'The one-time setup fee covers custom design, development, brand strategy, initial SEO setup, and onboarding. It\'s a one-time investment.',
  },
  {
    q: 'Do you work with all types of businesses?',
    a: 'Absolutely. We work with businesses across all industries — consulting, hospitality, law, healthcare, retail, coaching, and more. If you need a premium digital presence, we can help.',
  },
  {
    q: 'Can I upgrade my plan later?',
    a: 'Yes. You can upgrade at any time. We\'ll credit your current plan\'s remaining value toward the new plan.',
  },
  {
    q: 'How do I pay?',
    a: 'We accept M-Pesa, bank transfer, and all major cards. All prices are in Kenyan Shillings (KSh).',
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-obsidian pt-40 pb-20 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="section-label mb-6">Investment</p>
            <h1 className="font-display text-6xl lg:text-8xl font-light text-platinum leading-none mb-6">
              Transparent.
              <br />
              <span className="gold-text italic">Premium. Fair.</span>
            </h1>
            <p className="text-platinum-muted text-lg max-w-xl mx-auto">
              Every plan includes a dedicated team, luxury-grade design, and a commitment to your growth. 
              No hidden fees. No surprises.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <SectionWrapper className="py-16 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {plans.map(({ name, tagline, priceKES, setupKES, billing, highlight, badge, features, cta }) => (
                <div
                  key={name}
                  className={`relative flex flex-col border transition-all duration-300 ${
                    highlight
                      ? 'border-gold bg-graphite shadow-gold-strong'
                      : 'border-white-subtle bg-charcoal hover:border-gold/40'
                  }`}
                >
                  {badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-obsidian text-xs font-semibold tracking-widest uppercase px-4 py-1.5 flex items-center gap-1">
                      <Zap size={12} />
                      {badge}
                    </div>
                  )}

                  <div className={`p-8 border-b ${highlight ? 'border-gold/30' : 'border-white-subtle'}`}>
                    <p className="section-label mb-2">{name}</p>
                    <p className="text-platinum-muted text-sm mb-6">{tagline}</p>
                    <div className="mb-2">
                      <span className="font-display text-5xl font-light text-platinum">KSh {priceKES}</span>
                      <span className="text-platinum-muted text-sm">{billing}</span>
                    </div>
                    <p className="text-platinum-dark text-xs border-t border-white-subtle pt-4">
                      One-time setup: <span className="text-platinum-muted">KSh {setupKES}</span>
                    </p>
                  </div>

                  <div className="p-8 flex-1">
                    <ul className="flex flex-col gap-3">
                      {features.map(({ text, included }) => (
                        <li key={text} className="flex items-start gap-3">
                          {included ? (
                            <CheckCircle size={15} className="text-gold mt-0.5 shrink-0" />
                          ) : (
                            <X size={15} className="text-platinum-dark mt-0.5 shrink-0" />
                          )}
                          <span className={`text-sm ${included ? 'text-platinum-muted' : 'text-platinum-dark line-through'}`}>
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
                          ? 'bg-gold text-obsidian hover:bg-gold-light'
                          : 'border border-gold text-gold hover:bg-gold hover:text-obsidian'
                      }`}
                    >
                      {cta} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-platinum-dark text-sm mt-8">
              Need a custom solution?{' '}
              <Link href="/contact" className="text-gold hover:text-gold-light transition-colors">
                Contact us for enterprise pricing →
              </Link>
            </p>
          </div>
        </SectionWrapper>

        {/* FAQ */}
        <SectionWrapper className="py-28 px-6 lg:px-12 bg-charcoal">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="section-label mb-4">Questions</p>
              <h2 className="font-display text-5xl font-light text-platinum">
                Frequently <span className="gold-text italic">Asked</span>
              </h2>
              <div className="divider-gold" />
            </div>
            <div className="flex flex-col divide-y divide-white-subtle">
              {faqs.map(({ q, a }) => (
                <div key={q} className="py-8">
                  <h3 className="font-display text-xl font-light text-platinum mb-3">{q}</h3>
                  <p className="text-platinum-muted text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* CTA */}
        <SectionWrapper className="py-24 px-6 lg:px-12 border-t border-white-subtle">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-5xl font-light text-platinum mb-6">
              Still Deciding?
              <br />
              <span className="gold-text italic">Let's Talk.</span>
            </h2>
            <p className="text-platinum-muted mb-10">
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
