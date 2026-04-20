import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, CheckCircle, X, Zap, Cpu, Layers, Globe,
  TrendingUp, BarChart3, Users, Shield, Clock, Sparkles,
  Star, ChevronRight, MessageSquare
} from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Tell Us About Your Business',
    desc: 'Fill in our enquiry form. We learn about your goals, audience, and brand in detail.',
    icon: MessageSquare,
  },
  {
    step: '02',
    title: 'We Design & Build',
    desc: 'Our team crafts your complete luxury digital presence — website, copy, SEO, and branding.',
    icon: Sparkles,
  },
  {
    step: '03',
    title: 'You Review & Approve',
    desc: 'We present your site for feedback. Revisions included until you are completely satisfied.',
    icon: Layers,
  },
  {
    step: '04',
    title: 'We Launch & Support',
    desc: 'We go live, handle your domain, and stay on to support and grow your presence.',
    icon: Globe,
  },
];

const features = [
  {
    icon: Cpu,
    title: 'Custom Website Design',
    desc: 'Bespoke luxury website designed from scratch for your brand. No templates, no shortcuts.',
  },
  {
    icon: Layers,
    title: 'Brand Identity',
    desc: 'Logo, colours, fonts, and messaging — a complete brand system built for premium positioning.',
  },
  {
    icon: Globe,
    title: 'Domain & Hosting',
    desc: 'We connect your domain, set up hosting, and handle SSL. Everything just works.',
  },
  {
    icon: TrendingUp,
    title: 'SEO Setup',
    desc: 'On-page SEO, meta tags, sitemap, and Google indexing — done properly from day one.',
  },
  {
    icon: Users,
    title: 'Lead Capture',
    desc: 'Contact forms, WhatsApp integration, and lead notifications straight to your inbox.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    desc: 'Google Analytics and a clean dashboard so you always know how your site is performing.',
  },
  {
    icon: Sparkles,
    title: 'Professional Copywriting',
    desc: 'We write all the words on your site — headlines, service descriptions, about page, and CTAs.',
  },
  {
    icon: Shield,
    title: 'Security & Maintenance',
    desc: 'SSL, backups, uptime monitoring, and monthly maintenance. Your site is always safe and fast.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    desc: 'Most projects go live within 7–14 days. We move fast without cutting corners.',
  },
];

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

const comparisons = [
  { feature: 'Custom luxury design', prime: true, generic: false, cheap: false, offshore: false },
  { feature: 'Done-for-you copywriting', prime: true, generic: false, cheap: false, offshore: false },
  { feature: 'Live in 7–14 days', prime: true, generic: false, cheap: false, offshore: false },
  { feature: 'SEO setup included', prime: true, generic: false, cheap: false, offshore: false },
  { feature: 'Ongoing support & maintenance', prime: true, generic: false, cheap: false, offshore: false },
  { feature: 'Africa-based team', prime: true, generic: false, cheap: false, offshore: false },
  { feature: 'M-Pesa & local payments', prime: true, generic: false, cheap: false, offshore: false },
  { feature: 'Premium brand positioning', prime: true, generic: false, cheap: false, offshore: false },
];

const testimonials = [
  {
    quote: 'Prime Presence built my entire website and wrote all the copy. I just reviewed and approved. It was live in 10 days and my clients are genuinely impressed.',
    name: 'Wanjiru Kamau',
    title: 'Executive Coach, Nairobi',
    rating: 5,
  },
  {
    quote: 'I was quoted KSh 500,000 by another agency. Prime Presence delivered a better result for a fraction of the cost — and faster.',
    name: 'Michael Otieno',
    title: 'Real Estate Consultant, Mombasa',
    rating: 5,
  },
  {
    quote: 'They handled everything — design, copy, domain, SEO. I did not have to figure out anything technical. My site looks world-class.',
    name: 'Amina Hassan',
    title: 'Brand Strategist, Nairobi',
    rating: 5,
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

export default function PlatformPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian pt-20">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1547658719-da2b51169166?w=1920&q=80"
              alt="Premium website design"
              fill
              sizes="100vw"
              className="object-cover opacity-10"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/50 to-obsidian" />
          </div>

          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <div className="inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-4 py-2 mb-10 animate-fade-in">
              <Sparkles size={12} className="text-gold" />
              <span className="text-gold text-xs tracking-ultra-wide uppercase font-medium">
                Premium · Done For You · Live in 7–14 Days
              </span>
            </div>

            <h1 className="font-display font-light text-6xl md:text-8xl lg:text-[7rem] text-platinum leading-none mb-8 animate-fade-up">
              Your Premium Website.
              <br />
              <span className="gold-text italic">Built by Our Team.</span>
              <br />
              Owned by You.
            </h1>

            <p className="font-body text-platinum-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-up animate-delay-200">
              Tell us about your business. We design, build, write the copy, set up SEO,
              and launch your complete digital presence — you just approve and go live.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up animate-delay-300">
              <Link href="/contact" className="btn-gold text-base px-12 py-5">
                Start Your Project
                <ArrowRight size={18} />
              </Link>
              <Link href="#how-it-works" className="btn-outline text-base px-12 py-5">
                See How It Works
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-platinum-dark text-xs tracking-widest uppercase animate-fade-in animate-delay-600">
              {[
                { icon: Clock, text: 'Live in 7–14 days' },
                { icon: Shield, text: 'No hidden fees' },
                { icon: Star, text: 'Trusted by 500+ businesses' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon size={12} className="text-gold" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <SectionWrapper id="how-it-works" className="py-28 px-6 lg:px-12 bg-charcoal">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="section-label mb-4">The Process</p>
              <h2 className="font-display text-5xl lg:text-6xl font-light text-platinum">
                From Brief to <span className="gold-text italic">Live</span> in 4 Steps
              </h2>
              <div className="divider-gold" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map(({ step, title, desc, icon: Icon }, i) => (
                <div key={step} className="relative">
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-gold/30 to-transparent z-0" />
                  )}
                  <div className="relative z-10">
                    <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mb-6 bg-graphite">
                      <Icon size={24} className="text-gold" />
                    </div>
                    <p className="font-display text-5xl font-light text-gold/20 mb-3">{step}</p>
                    <h3 className="font-display text-2xl font-light text-platinum mb-3">{title}</h3>
                    <p className="text-platinum-muted text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* ── FEATURES ── */}
        <SectionWrapper className="py-28 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="section-label mb-4">What's Included</p>
              <h2 className="font-display text-5xl lg:text-6xl font-light text-platinum">
                Everything Done. <span className="gold-text italic">Nothing Left Out.</span>
              </h2>
              <div className="divider-gold" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white-subtle">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="luxury-card bg-obsidian p-10 group">
                  <div className="w-12 h-12 border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold group-hover:bg-gold/5 transition-all duration-300">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <h3 className="font-display text-2xl font-light text-platinum mb-4">{title}</h3>
                  <p className="text-platinum-muted text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* ── COMPARISON ── */}
        <SectionWrapper className="py-28 px-6 lg:px-12 bg-charcoal">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="section-label mb-4">Why Prime Presence</p>
              <h2 className="font-display text-5xl lg:text-6xl font-light text-platinum">
                The Obvious <span className="gold-text italic">Choice.</span>
              </h2>
              <div className="divider-gold" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white-subtle">
                    <th className="text-left py-4 pr-8 text-platinum-muted text-xs tracking-widest uppercase font-medium w-1/3">Feature</th>
                    <th className="py-4 px-4 text-center">
                      <span className="text-gold text-xs tracking-widest uppercase font-semibold">Prime Presence</span>
                    </th>
                    <th className="py-4 px-4 text-center text-platinum-dark text-xs tracking-widest uppercase">Generic Agency</th>
                    <th className="py-4 px-4 text-center text-platinum-dark text-xs tracking-widest uppercase">Cheap Website</th>
                    <th className="py-4 px-4 text-center text-platinum-dark text-xs tracking-widest uppercase">Offshore Studio</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map(({ feature, prime, generic, cheap, offshore }) => (
                    <tr key={feature} className="border-b border-white-subtle hover:bg-graphite/50 transition-colors">
                      <td className="py-4 pr-8 text-platinum-muted text-sm">{feature}</td>
                      {[prime, generic, cheap, offshore].map((val, i) => (
                        <td key={i} className="py-4 px-4 text-center">
                          {val
                            ? <CheckCircle size={16} className="text-gold mx-auto" />
                            : <X size={16} className="text-platinum-dark mx-auto" />
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionWrapper>

        {/* ── PRICING ── */}
        <SectionWrapper id="pricing" className="py-28 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="section-label mb-4">Investment</p>
              <h2 className="font-display text-5xl lg:text-6xl font-light text-platinum">
                Transparent. <span className="gold-text italic">Premium. Fair.</span>
              </h2>
              <div className="divider-gold" />
              <p className="text-platinum-muted text-sm max-w-md mx-auto">
                One-time project fees. No hidden costs. We handle everything.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              {plans.map(({ name, tagline, priceKES, setupNote, highlight, badge, features: planFeatures, cta }) => (
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
                    <div className="mb-1">
                      <span className="font-display text-5xl font-light text-platinum">KSh {priceKES}</span>
                    </div>
                    <p className="text-platinum-dark text-xs">{setupNote}</p>
                  </div>

                  <div className="p-8 flex-1">
                    <ul className="flex flex-col gap-3">
                      {planFeatures.map(({ text, included }) => (
                        <li key={text} className="flex items-start gap-3">
                          {included
                            ? <CheckCircle size={15} className="text-gold mt-0.5 shrink-0" />
                            : <X size={15} className="text-platinum-dark mt-0.5 shrink-0" />
                          }
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

            <p className="text-center text-platinum-dark text-sm">
              Need a monthly management plan?{' '}
              <Link href="/contact" className="text-gold hover:text-gold-light transition-colors">
                Contact us for retainer pricing →
              </Link>
            </p>
          </div>
        </SectionWrapper>

        {/* ── TESTIMONIALS ── */}
        <SectionWrapper className="py-28 px-6 lg:px-12 bg-charcoal">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="section-label mb-4">Client Results</p>
              <h2 className="font-display text-5xl lg:text-6xl font-light text-platinum">
                Built by Us. <span className="gold-text italic">Loved by Clients.</span>
              </h2>
              <div className="divider-gold" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map(({ quote, name, title, rating }) => (
                <div key={name} className="luxury-card p-8 flex flex-col gap-6">
                  <div className="flex gap-1">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-platinum-muted text-sm leading-relaxed italic flex-1">"{quote}"</p>
                  <div className="border-t border-white-subtle pt-6">
                    <p className="text-platinum font-medium text-sm">{name}</p>
                    <p className="text-platinum-dark text-xs mt-1">{title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* ── FAQ ── */}
        <SectionWrapper className="py-28 px-6 lg:px-12">
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

        {/* ── FINAL CTA ── */}
        <SectionWrapper className="py-32 px-6 lg:px-12 bg-charcoal border-t border-white-subtle relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-gradient opacity-30" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <p className="section-label mb-6">Ready to Get Started?</p>
            <h2 className="font-display text-6xl lg:text-8xl font-light text-platinum leading-none mb-8">
              Your Competitors Are
              <br />
              <span className="gold-text italic">Already Online.</span>
            </h2>
            <p className="text-platinum-muted text-lg max-w-xl mx-auto mb-12">
              Contact us today. We'll discuss your project and have you live within 7–14 days.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-gold text-base px-12 py-5">
                Start Your Project
                <ArrowRight size={18} />
              </Link>
              <Link href="/services" className="btn-outline text-base px-12 py-5">
                See Our Services <ChevronRight size={16} />
              </Link>
            </div>
            <p className="text-platinum-dark text-xs mt-8 tracking-widest uppercase">
              No hidden fees · Revisions included · M-Pesa accepted
            </p>
          </div>
        </SectionWrapper>

      </main>
      <Footer />
    </>
  );
}
