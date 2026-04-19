import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Target, Eye, Heart } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Precision',
    desc: 'Every pixel, every word, every strategy is intentional. We obsess over the details that drive results.',
  },
  {
    icon: Eye,
    title: 'Elevation',
    desc: 'We don\'t meet the standard — we set it. Our work positions clients above the market, not within it.',
  },
  {
    icon: Heart,
    title: 'Partnership',
    desc: 'We are not vendors. We are growth partners invested in your long-term success and market dominance.',
  },
];

const team = [
  {
    name: 'Ruth Moraa',
    role: 'Founder & CEO',
    bio: 'Digital strategist and brand builder with a passion for helping African businesses command premium positioning online.',
    initials: 'RM',
    color: 'from-gold/20 to-gold/5',
  },
  {
    name: 'Aisha Omondi',
    role: 'Lead Designer',
    bio: 'Creative director who has crafted digital experiences for top-tier brands across Africa and globally.',
    initials: 'AO',
    color: 'from-platinum/10 to-platinum/5',
  },
  {
    name: 'Kevin Njoroge',
    role: 'Growth Strategist',
    bio: 'Performance marketing specialist who has generated millions in client revenue through digital channels across Africa.',
    initials: 'KN',
    color: 'from-gold/10 to-graphite',
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden bg-obsidian pt-32">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80"
              alt="Nairobi skyline"
              fill
              sizes="100vw"
              className="object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            <p className="section-label mb-6">Our Story</p>
            <h1 className="font-display text-6xl lg:text-8xl font-light text-platinum leading-none">
              We Exist to Make
              <br />
              <span className="gold-text italic">Africa's Best</span>
              <br />
              Look Their Best.
            </h1>
          </div>
        </section>

        {/* Brand Story */}
        <SectionWrapper className="py-28 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="section-label mb-6">Why We Exist</p>
              <h2 className="font-display text-4xl lg:text-5xl font-light text-platinum mb-8">
                Africa's Businesses Are World-Class.
                <br />
                <span className="gold-text italic">Their Digital Presence Wasn't.</span>
              </h2>
              <div className="flex flex-col gap-5 text-platinum-muted text-sm leading-relaxed">
                <p>
                  We saw it everywhere — brilliant professionals with extraordinary services,
                  deep expertise, and genuine talent — held back by digital presences that
                  didn't reflect their caliber.
                </p>
                <p>
                  Generic templates. Slow websites. No lead systems. No strategy. Meanwhile, their international
                  counterparts were winning clients through polished digital platforms that worked around the clock.
                </p>
                <p>
                  Prime Presence was built to close that gap. We bring the same level of digital sophistication
                  that powers the world's top premium brands — and we make it accessible to Africa's
                  most ambitious businesses.
                </p>
                <p className="text-platinum font-medium">
                  Because your digital presence should be as premium as the service you deliver.
                </p>
              </div>
            </div>
            <div className="relative h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                alt="Luxury interior"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 border border-gold/20" />
            </div>
          </div>
        </SectionWrapper>

        {/* Values */}
        <SectionWrapper className="py-28 px-6 lg:px-12 bg-charcoal">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="section-label mb-4">What Drives Us</p>
              <h2 className="font-display text-5xl font-light text-platinum">
                Our <span className="gold-text italic">Core Values</span>
              </h2>
              <div className="divider-gold" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="luxury-card p-10 text-center group">
                  <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mx-auto mb-6 group-hover:border-gold transition-all duration-300">
                    <Icon size={24} className="text-gold" />
                  </div>
                  <h3 className="font-display text-3xl font-light text-platinum mb-4">{title}</h3>
                  <p className="text-platinum-muted text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Team */}
        <SectionWrapper className="py-28 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="section-label mb-4">The Team</p>
              <h2 className="font-display text-5xl font-light text-platinum">
                Built by <span className="gold-text italic">Obsessives</span>
              </h2>
              <div className="divider-gold" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map(({ name, role, bio, initials, color }) => (
                <div key={name} className="group">
                  <div className={`relative h-80 mb-6 overflow-hidden bg-gradient-to-br ${color} border border-white-subtle group-hover:border-gold/30 transition-colors duration-300 flex items-center justify-center`}>
                    <div className="text-center">
                      <span className="font-display text-8xl font-light gold-text">{initials}</span>
                    </div>
                    {/* Animated corner accents */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/40 group-hover:border-gold transition-colors duration-500" />
                    <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold/40 group-hover:border-gold transition-colors duration-500" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold/40 group-hover:border-gold transition-colors duration-500" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/40 group-hover:border-gold transition-colors duration-500" />
                  </div>
                  <p className="section-label mb-1">{role}</p>
                  <h3 className="font-display text-2xl font-light text-platinum mb-3">{name}</h3>
                  <p className="text-platinum-muted text-sm leading-relaxed">{bio}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* CTA */}
        <SectionWrapper className="py-24 px-6 lg:px-12 bg-charcoal border-t border-white-subtle">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-5xl font-light text-platinum mb-6">
              Ready to Work with <span className="gold-text italic">the Best?</span>
            </h2>
            <p className="text-platinum-muted mb-10">
              Let's build something extraordinary together.
            </p>
            <Link href="/contact" className="btn-gold">
              Start the Conversation <ArrowRight size={16} />
            </Link>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
