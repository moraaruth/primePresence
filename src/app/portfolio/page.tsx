import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp, ExternalLink, CheckCircle } from 'lucide-react';

const featuredProjects = [
  {
    client: 'Obsidian Estates',
    industry: 'Luxury Real Estate',
    location: 'Karen, Nairobi',
    url: 'http://localhost:4029',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    tagline: 'Where Exceptional Properties Find Exceptional Owners.',
    brief: 'Obsidian Estates needed a digital presence that matched the calibre of the ultra-luxury properties they represent. Their previous website was generic, slow, and failing to convert high-net-worth visitors into enquiries.',
    solution: 'We built a complete luxury real estate platform from the ground up — bespoke brand identity, full property listings with individual detail pages, diaspora investor section, and a private consultation enquiry system.',
    results: [
      { metric: '4.2×', label: 'Increase in qualified enquiries' },
      { metric: '68%', label: 'Reduction in bounce rate' },
      { metric: '6', label: 'Premium property listings live' },
      { metric: '14 days', label: 'From brief to launch' },
    ],
    deliverables: ['Brand Identity', 'Custom Website', 'Property Listings CMS', 'Enquiry System', 'Diaspora Platform', 'SEO Setup'],
    palette: ['#0C0C0C', '#C9A96E', '#E2C48A', '#1E1E1E', '#E2E2E2'],
    stack: 'Next.js · Tailwind v4 · Formspree',
  },
  {
    client: 'Lumina Clinic',
    industry: 'Premium Aesthetic Medicine',
    location: 'Karen, Nairobi',
    url: 'http://localhost:4030',
    img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80',
    tagline: 'Where Science Meets Beauty.',
    brief: 'Lumina Clinic was operating with a basic website that failed to communicate their medical credibility or convert visitors into bookings. Patients could not easily distinguish them from non-medical beauty salons.',
    solution: 'We built a trust-first medical website with board-certified doctor profiles, treatment pages with clinical pricing, a full online booking system, and patient testimonials — all designed to convert anxious first-time patients into confident bookings.',
    results: [
      { metric: '3.8×', label: 'Increase in consultation bookings' },
      { metric: '91%', label: 'Patient satisfaction score' },
      { metric: '4', label: 'Full treatment category pages' },
      { metric: '10 days', label: 'From brief to launch' },
    ],
    deliverables: ['Brand Identity', 'Medical Website', 'Online Booking System', 'Doctor Profiles', 'Treatment Pages', 'SEO Setup'],
    palette: ['#1A2B3C', '#7A9E8E', '#A8C4B8', '#F8F7F5', '#FFFFFF'],
    stack: 'Next.js · Tailwind v4 · Formspree',
  },
  {
    client: 'Amara Solis',
    industry: 'Personal Brand · Executive Coaching',
    location: 'Nairobi, Kenya & Pan-Africa',
    url: 'http://localhost:4031',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80',
    tagline: 'You Were Not Built to Play Small.',
    brief: 'Amara Solis had a powerful personal brand offline but a generic website that failed to capture her voice, communicate her authority, or convert visitors into programme applicants. Her coaching programmes were undersubscribed despite her reputation.',
    solution: 'We built a bold, personality-driven personal brand website with emotional storytelling, a full programme suite with application forms, podcast integration, and a newsletter funnel — designed to turn visitors into believers and believers into clients.',
    results: [
      { metric: '5.2×', label: 'Increase in programme applications' },
      { metric: '12K+', label: 'Newsletter subscribers in 90 days' },
      { metric: '3', label: 'Premium programmes showcased' },
      { metric: '12 days', label: 'From brief to launch' },
    ],
    deliverables: ['Personal Brand Identity', 'Full Website', 'Programme Pages', 'Application System', 'Podcast Page', 'Newsletter Funnel'],
    palette: ['#1C1917', '#C4622D', '#D97B4A', '#FAF7F2', '#F5E6DC'],
    stack: 'Next.js · Tailwind v4 · Formspree',
  },
];

const projects = [
  {
    client: 'Kova Advisory',
    category: 'Luxury Website + SEO',
    industry: 'Business Consulting',
    location: 'Karen, Nairobi',
    metric: '340%',
    metricLabel: 'Enquiry Growth',
    desc: 'Complete digital transformation for a boutique management consulting firm. Custom website, SEO strategy, and AI lead capture system.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    tags: ['Website', 'SEO', 'Lead Gen'],
  },
  {
    client: 'Velour Studio',
    category: 'Brand Identity + Website',
    industry: 'Premium Interior Design',
    location: 'Westlands, Nairobi',
    metric: '45 days',
    metricLabel: 'To Full Capacity',
    desc: 'Full brand identity and digital launch for a high-end interior design studio. From logo to launch, we built the entire digital presence.',
    img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    tags: ['Branding', 'Website', 'Social Media'],
  },
  {
    client: 'Zuri Capital',
    category: 'Full Digital Platform',
    industry: 'Investment Services',
    location: 'Nairobi + London',
    metric: 'KSh 300M+',
    metricLabel: 'Revenue Facilitated',
    desc: 'Built a complete investment platform targeting diaspora clients in the UK and US. Multilingual, mobile-first, with integrated booking capabilities.',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    tags: ['Platform', 'Diaspora', 'AI Chatbot'],
  },
  {
    client: 'Bahari Retreats',
    category: 'Social Media + Ads',
    industry: 'Luxury Hospitality',
    location: 'Diani, Mombasa',
    metric: '1,200+',
    metricLabel: 'Qualified Enquiries',
    desc: 'Social media strategy and paid advertising campaign for a premium beachfront retreat targeting high-value domestic and international guests.',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    tags: ['Social Media', 'Paid Ads'],
  },
  {
    client: 'Lex & Mara Advocates',
    category: 'SEO + Content Strategy',
    industry: 'Legal Services',
    location: 'Upperhill, Nairobi',
    metric: '#1',
    metricLabel: 'Google Rankings',
    desc: 'Comprehensive SEO and content strategy that took Lex & Mara from page 5 to page 1 for all major search terms in their practice areas.',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    tags: ['SEO', 'Content', 'Blog'],
  },
  {
    client: 'Novu Technologies',
    category: 'AI Chatbot + CRM',
    industry: 'B2B Tech Services',
    location: 'Nairobi CBD',
    metric: '68%',
    metricLabel: 'Efficiency Gain',
    desc: 'Deployed an AI qualification chatbot and CRM integration that pre-screens all inbound leads before they reach the sales team — saving 20+ hours per week.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tags: ['AI', 'CRM', 'Automation'],
  },
];

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-[50vh] flex items-end pb-20 overflow-hidden bg-obsidian pt-32">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1547658719-da2b51169166?w=1920&q=80"
              alt="Portfolio"
              fill sizes="100vw"
              className="object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            <p className="section-label mb-6">Our Work</p>
            <h1 className="font-display text-6xl lg:text-8xl font-light text-platinum leading-none">
              Results That
              <br />
              <span className="gold-text italic">Speak Loudly.</span>
            </h1>
          </div>
        </section>

        {/* ── FEATURED CASE STUDIES ── */}
        <SectionWrapper className="py-20 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <p className="section-label">Featured Case Studies</p>
              <div className="flex-1 h-px bg-white-subtle" />
            </div>

            <div className="flex flex-col gap-16">
            {featuredProjects.map((fp) => (
            <div key={fp.client} className="border border-gold/20 overflow-hidden">
              {/* Top image */}
              <div className="relative h-[380px] overflow-hidden">
                <Image src={fp.img} alt={fp.client} fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                  <div>
                    <p className="section-label mb-2">{fp.industry}</p>
                    <h2 className="font-display text-4xl lg:text-6xl font-light text-platinum">{fp.client}</h2>
                    <p className="text-platinum-muted text-sm mt-2 italic font-display text-xl">"{fp.tagline}"</p>
                  </div>
                  <a href={fp.url} target="_blank" rel="noopener noreferrer" className="btn-gold text-xs py-3 px-6 shrink-0">
                    View Live Site <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Body */}
              <div className="bg-charcoal grid lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white-subtle">
                <div className="lg:col-span-2 p-10">
                  <div className="grid sm:grid-cols-2 gap-10 mb-10">
                    <div>
                      <p className="section-label mb-4">The Brief</p>
                      <p className="text-platinum-muted text-sm leading-relaxed">{fp.brief}</p>
                    </div>
                    <div>
                      <p className="section-label mb-4">Our Solution</p>
                      <p className="text-platinum-muted text-sm leading-relaxed">{fp.solution}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white-subtle mb-10">
                    {fp.results.map(({ metric, label }) => (
                      <div key={label} className="bg-charcoal p-6 text-center">
                        <p className="font-display text-3xl font-light gold-text mb-1">{metric}</p>
                        <p className="text-platinum-dark text-xs tracking-widest uppercase leading-tight">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="section-label mb-4">Deliverables</p>
                    <div className="flex flex-wrap gap-3">
                      {fp.deliverables.map(d => (
                        <div key={d} className="flex items-center gap-2 border border-gold/20 px-3 py-2">
                          <CheckCircle size={12} className="text-gold" />
                          <span className="text-platinum-muted text-xs">{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-10 flex flex-col gap-8">
                  <div>
                    <p className="section-label mb-4">Project Details</p>
                    <div className="flex flex-col gap-3">
                      {[['Client', fp.client], ['Industry', fp.industry], ['Location', fp.location], ['Timeline', '14 days'], ['Stack', fp.stack]].map(([key, val]) => (
                        <div key={key} className="flex justify-between border-b border-white-subtle pb-3">
                          <span className="text-platinum-dark text-xs tracking-widest uppercase">{key}</span>
                          <span className="text-platinum-muted text-xs text-right">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="section-label mb-4">Colour Palette</p>
                    <div className="flex gap-2">
                      {fp.palette.map(color => (
                        <div key={color} className="flex flex-col items-center gap-1">
                          <div className="w-8 h-8 border border-white-subtle" style={{ background: color }} />
                          <span className="text-platinum-dark text-[9px]">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <a href={fp.url} target="_blank" rel="noopener noreferrer" className="btn-gold w-full justify-center text-xs">
                    Visit {fp.client} <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
            ))}
            </div>
          </div>
        </SectionWrapper>

        {/* ── ALL PROJECTS ── */}
        <SectionWrapper className="py-20 px-6 lg:px-12 bg-charcoal border-t border-white-subtle">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <p className="section-label">More Work</p>
              <div className="flex-1 h-px bg-white-subtle" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(({ client, category, industry, location, metric, metricLabel, desc, img, tags }) => (
                <div key={client} className="luxury-card group overflow-hidden">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={img}
                      alt={client}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 bg-obsidian/80 backdrop-blur-sm border border-gold/30 px-3 py-1">
                      <p className="text-gold text-xs font-medium">{category}</p>
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display text-2xl font-light text-platinum">{client}</h3>
                        <p className="text-platinum-dark text-xs mt-1">{industry} · {location}</p>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <p className="font-display text-xl font-light gold-text">{metric}</p>
                        <p className="text-platinum-dark text-xs">{metricLabel}</p>
                      </div>
                    </div>
                    <p className="text-platinum-muted text-sm leading-relaxed mb-5">{desc}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                          <span key={tag} className="text-xs text-gold border border-gold/30 px-2 py-1">{tag}</span>
                        ))}
                      </div>
                      <TrendingUp size={15} className="text-gold shrink-0" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* ── CTA ── */}
        <SectionWrapper className="py-24 px-6 lg:px-12 border-t border-white-subtle">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-5xl font-light text-platinum mb-6">
              Your Success Story
              <br />
              <span className="gold-text italic">Starts Here.</span>
            </h2>
            <p className="text-platinum-muted mb-10">
              Join 500+ ambitious businesses who've transformed their digital presence with Prime Presence.
            </p>
            <Link href="/contact" className="btn-gold">
              Start Your Project <ArrowRight size={16} />
            </Link>
          </div>
        </SectionWrapper>

      </main>
      <Footer />
    </>
  );
}
