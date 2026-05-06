'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { sites as sitesApi } from '@/lib/api';
import Link from 'next/link';
import { Loader, AlertCircle } from 'lucide-react';
import type { Site, Page, Section } from '@/lib/types';

interface PageWithSections extends Page {
  sections: Section[];
}

export default function PublishedSitePage() {
  const params = useParams();
  const slug = (params.slug as string[])?.[0] || 'home';

  const [site, setSite] = useState<Site | null>(null);
  const [activePage, setActivePage] = useState<PageWithSections | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPublishedSite();
  }, [slug]);

  async function loadPublishedSite() {
    try {
      setLoading(true);

      // Extract subdomain from hostname (works when deployed with wildcard DNS)
      const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
      const subdomain = hostname.split('.')[0];

      if (!subdomain || subdomain === 'localhost' || subdomain === 'www') {
        throw new Error('This route requires a subdomain (e.g. mysite.primepresence.site). Use /preview/:id for local testing.');
      }

      const { data, error: err } = await sitesApi.getPublished(subdomain);
      if (err || !data?.site) throw new Error(err || 'Site not found or not published');

      setSite(data.site);

      const pages: PageWithSections[] = data.pages || [];
      const pageSlug = slug === 'home' || slug === '' ? 'home' : slug;
      const page = pages.find((p) => p.slug === pageSlug) || pages[0];

      if (!page) throw new Error('Page not found');
      setActivePage(page);
    } catch (err: any) {
      setError(err.message || 'Failed to load site');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  if (error || !site || !activePage) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center max-w-md px-6">
          <AlertCircle className="mx-auto mb-4 text-red-400" size={32} />
          <p className="text-platinum mb-2">{error || 'Site not found'}</p>
          <p className="text-platinum-muted text-sm mb-4">
            For local testing, use <code className="text-gold">/preview/[siteId]</code> instead.
          </p>
          <Link href="/" className="text-gold hover:text-gold-light transition-colors">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-primary)' }}>
      <nav className="border-b border-white-subtle sticky top-0 z-40" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <span className="font-display text-lg font-light tracking-widest text-platinum">{site.name}</span>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto">
        {activePage.sections.map((section) => (
          <RenderSection key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}

function RenderSection({ section }: { section: Section }) {
  const c = section.content as any;
  switch (section.type) {
    case 'hero':
      return (
        <section className="py-20 px-6 border-b border-white-subtle bg-gradient-to-b from-gold/5 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-5xl md:text-6xl font-light text-platinum mb-6">{c.headline}</h1>
            <p className="text-platinum-muted text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed">{c.subheadline}</p>
            <a href="#contact" className="inline-block px-8 py-4 bg-gold hover:bg-gold-light text-black font-medium rounded transition-colors">{c.cta || 'Get Started'}</a>
          </div>
        </section>
      );
    case 'features':
      return (
        <section className="py-20 px-6 border-b border-white-subtle">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-4xl font-light text-platinum mb-16 text-center">{c.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {(c.features || []).map((f: any, i: number) => (
                <div key={i} className="text-center">
                  <div className="text-4xl mb-4 gold-text">✦</div>
                  <h3 className="font-display text-xl text-platinum mb-3">{f.title}</h3>
                  <p className="text-platinum-muted">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case 'about':
      return (
        <section className="py-20 px-6 border-b border-white-subtle">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl font-light text-platinum mb-8">About</h2>
            <p className="text-platinum-muted text-lg leading-relaxed">{c.text}</p>
          </div>
        </section>
      );
    case 'cta':
      return (
        <section className="py-16 px-6 border-b border-white-subtle">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl font-light text-platinum mb-6">{c.heading}</h2>
            <a href="#contact" className="inline-block px-8 py-3 bg-gold hover:bg-gold-light text-black font-medium rounded transition-colors">{c.ctaText || 'Get Started'}</a>
          </div>
        </section>
      );
    case 'contact':
      return (
        <section id="contact" className="py-20 px-6 border-b border-white-subtle">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-4xl font-light text-platinum mb-8 text-center">{c.title || 'Get In Touch'}</h2>
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <input type="text" className="input-luxury" placeholder="Your name" />
              <input type="email" className="input-luxury" placeholder="you@example.com" />
              <textarea className="input-luxury resize-none" rows={5} placeholder="Your message..." />
              <button type="submit" className="w-full px-6 py-3 bg-gold hover:bg-gold-light text-black font-medium rounded transition-colors">Send Message</button>
            </form>
          </div>
        </section>
      );
    case 'footer':
      return (
        <footer className="py-12 px-6 border-t border-white-subtle">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-platinum-muted text-sm">&copy; {new Date().getFullYear()} {c.company || 'Your Company'}. All rights reserved.</p>
            <p className="text-platinum-muted text-xs mt-2">Built with <span className="gold-text">Prime Presence</span></p>
          </div>
        </footer>
      );
    default:
      return null;
  }
}
