import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Globe, TrendingUp, Users, Zap, Star,
  CheckCircle, ChevronRight, Award, BarChart3, Layers,
  Sparkles, Clock, Shield, Cpu
} from 'lucide-react';

const stats = [
  { value: '500+', label: 'Elite Clients' },
  { value: '30min', label: 'Avg Launch Time' },
  { value: '15', label: 'Countries Served' },
  { value: '98%', label: 'Client Retention' },
];

const platformFeatures = [
  {
    icon: Cpu,
    title: 'AI Site Generator',
    desc: 'Answer 7 questions. Get a complete luxury website in 60 seconds — copy, design, and structure included.',
  },
  {
    icon: Layers,
    title: 'Luxury Templates',
    desc: '20+ premium templates built for elite professionals. Real estate, coaching, consulting, and more.',
  },
  {
    icon: Zap,
    title: 'Instant Publishing',
    desc: 'Connect your domain and go live in one click. No FTP, no DNS headaches, no developers needed.',
  },
  {
    icon: TrendingUp,
    title: 'Built-in SEO',
    desc: 'AI-powered SEO tools that optimize every page automatically. Rank higher without hiring an expert.',
  },
  {
    icon: Users,
    title: 'Lead Capture',
    desc: 'Smart forms, WhatsApp widgets, and AI chatbots that capture and qualify leads 24/7.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    desc: 'Real-time insights on visitors, leads, and top-performing pages — all in one clean dashboard.',
  },
];

const agencyServices = [
  {
    icon: Globe,
    title: 'Luxury Website Design',
    desc: 'Bespoke, conversion-optimized websites that position you as the definitive authority in your market.',
  },
  {
    icon: TrendingUp,
    title: 'SEO & Digital Visibility',
    desc: 'Dominate Google search results for high-intent buyers and investors in your target markets.',
  },
  {
    icon: Users,
    title: 'AI Lead Generation',
    desc: 'Intelligent systems that capture, qualify, and nurture leads 24/7 — so you close more, faster.',
  },
  {
    icon: Zap,
    title: 'Social Media Mastery',
    desc: 'Premium content strategy and management that builds authority and attracts high-net-worth clients.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    desc: 'Real-time dashboards that show exactly where your leads come from and what drives conversions.',
  },
  {
    icon: Layers,
    title: 'Brand Identity',
    desc: 'Complete brand systems — logo, identity, messaging — that command premium positioning.',
  },
];

const process = [
  { step: '01', title: 'Strategy Session', desc: 'We audit your current presence and map a custom growth strategy aligned to your market.' },
  { step: '02', title: 'Design & Build', desc: 'Our team crafts your luxury digital platform — website, brand assets, and automation systems.' },
  { step: '03', title: 'Launch & Amplify', desc: 'We go live with precision — SEO, ads, and social campaigns firing from day one.' },
  { step: '04', title: 'Grow & Scale', desc: 'Monthly optimization, reporting, and strategy calls to compound your results over time.' },
];

const testimonials = [
  {
    quote: 'Prime Presence transformed my business. Within 90 days of launching my new platform, I was getting consistent enquiries directly through my website.',
    name: 'Amara Osei',
    title: 'Business Consultant, Nairobi',
    rating: 5,
  },
  {
    quote: 'The level of sophistication they brought to my brand is unmatched. My clients now perceive me as the premium professional I always knew I was.',
    name: 'David Kamau',
    title: 'Executive Coach, Westlands',
    rating: 5,
  },
  {
    quote: 'I needed a platform that spoke to both local and international clients. Prime Presence delivered something that looks truly world-class.',
    name: 'Sarah Njoroge',
    title: 'Brand Strategist, London & Nairobi',
    rating: 5,
  },
];

const pricingHighlights = [
              { plan: 'Starter', price: 'KSh 3,800', period: '/mo', desc: 'Website + basic SEO', cta: 'Enquire Now', href: '/contact', highlight: false },
  { plan: 'Pro', price: 'KSh 10,200', period: '/mo', desc: 'Full digital presence + AI tools', cta: 'Enquire Now', href: '/contact', highlight: true, badge: 'Most Popular' },
  { plan: 'Elite', price: 'KSh 90,000', period: '/mo', desc: 'Full done-for-you management', cta: 'Enquire Now', href: '/contact', highlight: false },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
              alt="Luxury property"
              fill
              sizes="100vw"
              className="object-cover opacity-15"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/40 to-obsidian" />
          </div>

          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center pt-20">
            <div className="inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-4 py-2 mb-10 animate-fade-in">
              <Sparkles size={12} className="text-gold" />
              <span className="text-gold text-xs tracking-ultra-wide uppercase font-medium">Premium Digital Presence — Done For You</span>
            </div>

            <h1 className="font-display font-light text-6xl md:text-8xl lg:text-9xl text-platinum leading-none mb-8 animate-fade-up">
              Your Premium Digital Presence.
              <br />
              <span className="gold-text italic">Built For You.</span>
            </h1>

            <p className="font-body text-platinum-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-up animate-delay-200">
              Prime Presence builds world-class digital platforms for elite professionals —
              powered by AI, designed for impact. No designers. No developers. No compromise.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up animate-delay-300">
              <Link href="/contact" className="btn-gold">
                Start Your Project
                <ArrowRight size={16} />
              </Link>
              <Link href="/portfolio" className="btn-outline">
                See Our Work
              </Link>
            </div>

            {/* Trust bar */}
            <div className="flex flex-wrap items-center justify-center gap-8 animate-fade-in animate-delay-600">
              {[
                { icon: Clock, text: 'Live in 7–14 days' },
                { icon: Shield, text: 'No hidden fees' },
                { icon: Award, text: 'Trusted by 500+ businesses' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-platinum-dark text-xs tracking-widest uppercase">
                  <Icon size={12} className="text-gold" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in animate-delay-600">
              <span className="text-platinum-dark text-xs tracking-widest uppercase">Scroll</span>
              <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <SectionWrapper className="bg-charcoal border-y border-white-subtle">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-5xl lg:text-6xl font-light gold-text mb-2">{stat.value}</p>
                  <p className="text-platinum-muted text-sm tracking-widest uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* ── PLATFORM TEASER ── */}
        <SectionWrapper className="py-28 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="section-label mb-4">The Platform</p>
              <h2 className="font-display text-5xl lg:text-6xl font-light text-platinum">
              We Build It. <span className="gold-text italic">Beautifully.</span>
              </h2>
              <div className="divider-gold" />
              <p className="text-platinum-muted max-w-xl mx-auto text-sm leading-relaxed">
                Our team designs, builds, and manages your complete digital presence —
                from KSh 3,800/month.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white-subtle mb-12">
              {platformFeatures.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="luxury-card bg-charcoal p-10 group">
                  <div className="w-12 h-12 border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold group-hover:bg-gold/5 transition-all duration-300">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <h3 className="font-display text-2xl font-light text-platinum mb-4">{title}</h3>
                  <p className="text-platinum-muted text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* Pricing preview */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {pricingHighlights.map(({ plan, price, period, desc, cta, href, highlight, badge }) => (
                <div
                  key={plan}
                  className={`relative p-8 border transition-all duration-300 ${
                    highlight
                      ? 'border-gold bg-graphite shadow-gold'
                      : 'border-white-subtle bg-charcoal hover:border-gold/40'
                  }`}
                >
                  {badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-obsidian text-xs font-semibold tracking-widest uppercase px-4 py-1">
                      {badge}
                    </div>
                  )}
                  <p className="section-label mb-3">{plan}</p>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="font-display text-4xl font-light text-platinum">{price}</span>
                    <span className="text-platinum-muted text-sm">{period}</span>
                  </div>
                  <p className="text-platinum-muted text-xs mb-6">{desc}</p>
                  <Link
                    href={href}
                    className={`w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                      highlight
                        ? 'bg-gold text-obsidian hover:bg-gold-light'
                        : 'border border-gold text-gold hover:bg-gold hover:text-obsidian'
                    }`}
                  >
                    {cta} <ArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/contact" className="btn-gold">
                Talk to Our Team <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </SectionWrapper>

        {/* ── AGENCY SERVICES ── */}
        <SectionWrapper className="py-28 px-6 lg:px-12 bg-charcoal" id="services">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="section-label mb-4">Done-For-You</p>
              <h2 className="font-display text-5xl lg:text-6xl font-light text-platinum">
                We Build It <span className="gold-text italic">For You.</span>
              </h2>
              <div className="divider-gold" />
              <p className="text-platinum-muted max-w-xl mx-auto text-sm leading-relaxed">
                Prefer a dedicated team? Our agency service delivers a complete luxury digital ecosystem —
                custom-built, fully managed, results-guaranteed.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white-subtle">
              {agencyServices.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="luxury-card bg-charcoal p-10 group">
                  <div className="w-12 h-12 border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold group-hover:bg-gold/5 transition-all duration-300">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <h3 className="font-display text-2xl font-light text-platinum mb-4">{title}</h3>
                  <p className="text-platinum-muted text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/services" className="btn-outline">
                Explore Agency Services <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </SectionWrapper>

        {/* ── VALUE PROPOSITION ── */}
        <SectionWrapper className="py-28 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="section-label mb-6">Why Prime Presence</p>
                <h2 className="font-display text-5xl lg:text-6xl font-light text-platinum leading-tight mb-8">
                  Built for Africa's
                  <br />
                  <span className="gold-text italic">Most Ambitious</span>
                  <br />
                  Professionals.
                </h2>
                <p className="text-platinum-muted leading-relaxed mb-8">
                  While generic platforms build cookie-cutter websites, we architect complete digital ecosystems —
                  combining luxury design, intelligent automation, and data-driven strategy to position you
                  as the undisputed authority in your market.
                </p>
                <ul className="flex flex-col gap-4 mb-10">
                  {[
                    'Luxury-grade design that commands premium positioning',
                    'Done-for-you — we handle design, copy, and launch',
                    'Local market expertise with global execution standards',
                    'Ongoing support and growth strategy included',
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-gold mt-0.5 shrink-0" />
                      <span className="text-platinum-muted text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/about" className="btn-outline">
                  Our Story <ChevronRight size={16} />
                </Link>
              </div>

              <div className="relative">
                <div className="relative h-[500px] lg:h-[600px]">
                  <Image
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                    alt="Luxury real estate"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 border border-gold/20" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-charcoal border border-gold/30 p-6 shadow-gold">
                  <div className="flex items-center gap-3 mb-2">
                    <Award size={20} className="text-gold" />
                    <span className="text-platinum text-sm font-medium">Top Rated Platform</span>
                  </div>
                  <p className="text-platinum-muted text-xs">Trusted by 500+ professionals across 15 countries</p>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* ── PROCESS ── */}
        <SectionWrapper className="py-28 px-6 lg:px-12 bg-charcoal">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="section-label mb-4">How It Works</p>
              <h2 className="font-display text-5xl lg:text-6xl font-light text-platinum">
                From Vision to <span className="gold-text italic">Dominance</span>
              </h2>
              <div className="divider-gold" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map(({ step, title, desc }, i) => (
                <div key={step} className="relative">
                  {i < process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-gold/30 to-transparent z-0" />
                  )}
                  <div className="relative z-10">
                    <p className="font-display text-6xl font-light text-gold/20 mb-4">{step}</p>
                    <h3 className="font-display text-2xl font-light text-platinum mb-3">{title}</h3>
                    <p className="text-platinum-muted text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* ── TESTIMONIALS ── */}
        <SectionWrapper className="py-28 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="section-label mb-4">Client Results</p>
              <h2 className="font-display text-5xl lg:text-6xl font-light text-platinum">
                Trusted by the <span className="gold-text italic">Elite</span>
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

        {/* ── DUAL CTA ── */}
        <SectionWrapper className="py-32 px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-gradient opacity-50" />
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80"
              alt="Luxury skyline"
              fill
              sizes="100vw"
              className="object-cover opacity-10"
            />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <p className="section-label mb-6">The Next Step</p>
            <h2 className="font-display text-6xl lg:text-8xl font-light text-platinum leading-none mb-8">
              Ready to Become
              <br />
              <span className="gold-text italic">Unmissable?</span>
            </h2>
            <p className="text-platinum-muted text-lg max-w-xl mx-auto mb-12">
              Tell us about your business and we'll build you a world-class digital presence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-gold text-base px-12 py-5">
                Start Your Project
                <ArrowRight size={18} />
              </Link>
              <Link href="/services" className="btn-outline text-base px-12 py-5">
                See What We Build
              </Link>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
