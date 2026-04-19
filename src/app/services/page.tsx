import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import Link from 'next/link';
import Image from 'next/image';
import {
  Globe, TrendingUp, Users, Zap, BarChart3, Layers,
  Bot, Mail, Camera, ArrowRight, CheckCircle
} from 'lucide-react';

const coreServices = [
  {
    id: 'websites',
    icon: Globe,
    title: 'Luxury Website Design & Development',
    tagline: 'Your digital flagship — built to impress and convert.',
    desc: 'We design and build bespoke, high-performance websites that position you as the definitive authority in your industry. Every site is custom-crafted — no templates, no shortcuts.',
    features: [
      'Custom luxury design tailored to your brand',
      'Mobile-first, lightning-fast performance',
      'Service and portfolio pages built to convert',
      'Lead capture forms and CRM integration',
      'SSL, security, and hosting included',
      'Ongoing maintenance and updates',
    ],
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
  },
  {
    id: 'seo',
    icon: TrendingUp,
    title: 'SEO & Digital Visibility',
    tagline: 'Be found by your ideal clients before your competitors.',
    desc: 'We engineer your search presence so that high-intent clients find you first. Our SEO strategy is built specifically for your industry and target market in Kenya and globally.',
    features: [
      'Keyword research for your industry and niche',
      'On-page and technical SEO optimisation',
      'Local SEO for Nairobi, Mombasa, and beyond',
      'Content strategy and blog management',
      'Google Business Profile optimisation',
      'Monthly ranking reports and strategy calls',
    ],
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    id: 'leads',
    icon: Users,
    title: 'AI-Powered Lead Generation',
    tagline: 'Your best salesperson works 24/7 and never sleeps.',
    desc: 'We build intelligent lead capture and qualification systems that identify serious prospects, nurture them automatically, and deliver them to you ready to convert.',
    features: [
      'AI chatbot for instant lead qualification',
      'Automated email and WhatsApp follow-up sequences',
      'Lead scoring and prioritisation',
      'CRM integration and pipeline management',
      'Retargeting ad campaigns',
      'Monthly lead performance reporting',
    ],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    id: 'social',
    icon: Zap,
    title: 'Social Media Management',
    tagline: 'Build authority. Attract premium clients.',
    desc: 'We manage your Instagram, LinkedIn, and Facebook presence with premium content that positions you as the go-to expert in your field.',
    features: [
      'Custom content strategy and calendar',
      'Professional photography and video direction',
      'Daily posting and community management',
      'Instagram Reels and LinkedIn articles',
      'Paid social campaigns for lead generation',
      'Monthly analytics and growth reporting',
    ],
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
  },
  {
    id: 'ai',
    icon: Bot,
    title: 'AI Chatbots & Automation',
    tagline: 'Intelligent systems that scale your business.',
    desc: 'Deploy AI-powered chatbots on your website and WhatsApp that qualify leads, answer client questions, schedule appointments, and follow up — all automatically.',
    features: [
      'Custom-trained AI chatbot for your business',
      'WhatsApp Business API integration',
      'Automated appointment scheduling',
      'Lead qualification and scoring',
      'CRM sync and notification system',
      'Multilingual support (English, Swahili)',
    ],
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
  },
  {
    id: 'branding',
    icon: Layers,
    title: 'Brand Identity & Strategy',
    tagline: 'The foundation everything else is built on.',
    desc: 'We craft complete brand identities that command premium positioning — from logo and visual identity to messaging strategy and brand guidelines.',
    features: [
      'Logo design and brand mark',
      'Complete visual identity system',
      'Brand messaging and tone of voice',
      'Business card and stationery design',
      'Pitch deck and presentation templates',
      'Brand guidelines document',
    ],
    img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
  },
];

const addons = [
  { icon: Camera, title: 'Professional Photography Direction', desc: 'Art direction for brand and product shoots that make your business look world-class.' },
  { icon: Mail, title: 'Email Marketing', desc: 'Automated drip campaigns that nurture your audience and turn subscribers into paying clients.' },
  { icon: BarChart3, title: 'Paid Ads Management', desc: 'Google and Meta ad campaigns optimised for lead generation and client acquisition.' },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-end pb-20 overflow-hidden bg-obsidian pt-32">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
              alt="Services"
              fill
              sizes="100vw"
              className="object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            <p className="section-label mb-6">What We Offer</p>
            <h1 className="font-display text-6xl lg:text-8xl font-light text-platinum leading-none">
              Everything You Need
              <br />
              <span className="gold-text italic">to Dominate.</span>
            </h1>
          </div>
        </section>

        {/* Services */}
        <div className="py-8">
          {coreServices.map(({ id, icon: Icon, title, tagline, desc, features, img }, i) => (
            <SectionWrapper key={id} id={id} className="py-20 px-6 lg:px-12 border-b border-white-subtle">
              <div className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 border border-gold/30 flex items-center justify-center">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <p className="section-label">{tagline}</p>
                  </div>
                  <h2 className="font-display text-4xl lg:text-5xl font-light text-platinum mb-6">{title}</h2>
                  <p className="text-platinum-muted text-sm leading-relaxed mb-8">{desc}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-gold mt-0.5 shrink-0" />
                        <span className="text-platinum-muted text-xs leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-outline">
                    Get This Service <ArrowRight size={16} />
                  </Link>
                </div>
                <div className={`relative h-[400px] ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <Image src={img} alt={title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  <div className="absolute inset-0 border border-gold/20" />
                </div>
              </div>
            </SectionWrapper>
          ))}
        </div>

        {/* Add-ons */}
        <SectionWrapper className="py-28 px-6 lg:px-12 bg-charcoal">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="section-label mb-4">Power-Ups</p>
              <h2 className="font-display text-5xl font-light text-platinum">
                Premium <span className="gold-text italic">Add-Ons</span>
              </h2>
              <div className="divider-gold" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {addons.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="luxury-card p-8 group">
                  <div className="w-12 h-12 border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold transition-all duration-300">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <h3 className="font-display text-2xl font-light text-platinum mb-3">{title}</h3>
                  <p className="text-platinum-muted text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* CTA */}
        <SectionWrapper className="py-24 px-6 lg:px-12 border-t border-white-subtle">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-5xl font-light text-platinum mb-6">
              Not Sure Where to <span className="gold-text italic">Start?</span>
            </h2>
            <p className="text-platinum-muted mb-10">
              Book a free strategy call. We'll assess your current presence and recommend exactly what you need.
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
