import Link from 'next/link';
import { Instagram, Linkedin, Twitter, MapPin } from 'lucide-react';

const footerLinks = {
  Services: [
    { label: 'Luxury Websites', href: '/services#websites' },
    { label: 'SEO & Visibility', href: '/services#seo' },
    { label: 'Lead Generation', href: '/services#leads' },
    { label: 'Social Media', href: '/services#social' },
    { label: 'AI Chatbots', href: '/services#ai' },
    { label: 'Brand Identity', href: '/services#branding' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p className="section-label mb-3">Ready to Elevate?</p>
            <h3 className="font-display text-4xl lg:text-5xl font-light text-platinum">
              Your Premium Digital Presence <br />
              <span className="gold-text italic">Starts Today.</span>
            </h3>
          </div>
          <Link href="/contact" className="btn-gold whitespace-nowrap">
            Book a Free Strategy Call
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex flex-col leading-none mb-6">
              <span className="font-display text-3xl font-light tracking-widest text-platinum">PRIME</span>
              <span className="font-display text-3xl font-light tracking-widest gold-text">PRESENCE</span>
            </Link>
            <p className="text-platinum-muted text-sm leading-relaxed max-w-xs mb-8">
              The premium digital platform built for ambitious businesses across Africa and beyond.
              We don't build websites — we build empires.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, href: 'https://instagram.com/primepresence', label: 'Instagram' },
                { icon: Linkedin, href: 'https://linkedin.com/company/primepresence', label: 'LinkedIn' },
                { icon: Twitter, href: 'https://twitter.com/primepresence', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 border border-white-subtle flex items-center justify-center text-platinum-muted hover:text-gold hover:border-gold transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="section-label mb-6">{category}</p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-platinum-muted hover:text-gold text-sm transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <div className="flex flex-col sm:flex-row gap-6">
            {[
              { icon: MapPin, text: 'Nairobi, Kenya · Global' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-platinum-muted text-sm">
                <Icon size={14} className="text-gold" />
                <span>{text}</span>
              </div>
            ))}
          </div>
          <p className="text-platinum-dark text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} Prime Presence. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
