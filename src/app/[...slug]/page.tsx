'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import { Loader, AlertCircle } from 'lucide-react';
import type { Site, Page, Section } from '@/lib/types';

interface PublishedPageData {
  page: Page;
  sections: Section[];
}

export default function PublishedSitePage() {
  const params = useParams();
  const slug = (params.slug as string[])?.[0] || 'home';

  const [site, setSite] = useState<Site | null>(null);
  const [pageData, setPageData] = useState<PublishedPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPublishedSite();
  }, [slug]);

  async function loadPublishedSite() {
    try {
      setLoading(true);

      // Extract subdomain from pathname
      // When deployed, Vercel will route subdomain.primepresence.site to this route
      // For local development, we'll use URL params
      const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
      const subdomain = pathname.split('/')[1]?.split('.')[0];

      if (!subdomain) {
        throw new Error('Invalid site URL');
      }

      const supabase = createClient();

      // Get site by subdomain
      const { data: siteData, error: siteError } = await supabase
        .from('sites')
        .select('*')
        .eq('subdomain', subdomain)
        .eq('status', 'published')
        .single();

      if (siteError) throw new Error('Site not found or not published');
      setSite(siteData);

      // Get pages
      const { data: pagesData, error: pagesError } = await supabase
        .from('pages')
        .select('*')
        .eq('site_id', siteData.id)
        .order('order', { ascending: true });

      if (pagesError) throw pagesError;

      // Get the requested page or home
      const pageSlug = slug === 'home' || slug === '' ? 'home' : slug;
      const page = pagesData?.find((p) => p.slug === pageSlug) || pagesData?.[0];

      if (!page) {
        throw new Error('Page not found');
      }

      // Get sections for this page
      const { data: sectionsData, error: sectionsError } = await supabase
        .from('sections')
        .select('*')
        .eq('page_id', page.id)
        .order('order', { ascending: true });

      if (sectionsError) throw sectionsError;

      setPageData({
        page,
        sections: sectionsData || [],
      });
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

  if (error || !site || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4" size={32} />
          <p className="text-platinum mb-2">{error || 'Site not found'}</p>
          <Link href="/" className="text-gold hover:text-gold-light transition-colors">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-primary)' }}>
      {/* Simple Navigation */}
      <nav className="border-b border-white-subtle sticky top-0 z-40" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-display text-lg font-light tracking-widest text-platinum">{site.name}</span>
          </Link>
        </div>
      </nav>

      {/* Rendered Sections */}
      <div className="max-w-7xl mx-auto">
        {pageData.sections.map((section) => (
          <RenderSection key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}

function RenderSection({ section }: { section: Section }) {
  const content = section.content as any;

  switch (section.type) {
    case 'hero':
      return (
        <section className="py-20 px-6 border-b border-white-subtle bg-gradient-to-b from-gold/5 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-5xl md:text-6xl font-light text-platinum mb-6">
              {content.headline}
            </h1>
            <p className="text-platinum-muted text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed">
              {content.subheadline}
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-gold hover:bg-gold-light text-black font-medium rounded transition-colors">
              {content.cta || 'Get Started'}
            </a>
          </div>
        </section>
      );

    case 'features':
      return (
        <section className="py-20 px-6 border-b border-white-subtle">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-4xl font-light text-platinum mb-16 text-center">
              {content.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {(content.features || []).map((feature: any, idx: number) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl mb-4 gold-text">✨</div>
                  <h3 className="font-display text-xl text-platinum mb-3">{feature.title}</h3>
                  <p className="text-platinum-muted">{feature.description}</p>
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
            <p className="text-platinum-muted text-lg leading-relaxed">{content.text}</p>
          </div>
        </section>
      );

    case 'testimonials':
      return (
        <section className="py-20 px-6 border-b border-white-subtle bg-white-subtle/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl font-light text-platinum mb-16 text-center">
              {content.title || 'What Our Clients Say'}
            </h2>
            <div className="space-y-12">
              {(content.testimonials || []).map((testimonial: any, idx: number) => (
                <div key={idx} className="border-l-2 border-gold pl-6">
                  <p className="text-platinum-muted text-lg mb-4 italic">"{testimonial.quote}"</p>
                  <p className="text-gold font-medium">{testimonial.author}</p>
                  <p className="text-platinum-muted text-sm">{testimonial.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'cta':
      return (
        <section className="py-16 px-6 border-b border-white-subtle bg-gradient-to-r from-gold/10 to-transparent rounded-lg mx-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl font-light text-platinum mb-6">
              {content.heading}
            </h2>
            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-gold hover:bg-gold-light text-black font-medium rounded transition-colors">
              {content.ctaText || 'Get Started'}
            </a>
          </div>
        </section>
      );

    case 'contact':
      return (
        <section id="contact" className="py-20 px-6 border-b border-white-subtle">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-4xl font-light text-platinum mb-8 text-center">
              {content.title || 'Get In Touch'}
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-platinum text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white-subtle border border-white-subtle text-platinum placeholder-platinum-muted rounded focus:outline-none focus:border-gold"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-platinum text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white-subtle border border-white-subtle text-platinum placeholder-platinum-muted rounded focus:outline-none focus:border-gold"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-platinum text-sm font-medium mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-3 bg-white-subtle border border-white-subtle text-platinum placeholder-platinum-muted rounded focus:outline-none focus:border-gold resize-none"
                  rows={5}
                  placeholder="Your message..."></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gold hover:bg-gold-light text-black font-medium rounded transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </section>
      );

    case 'footer':
      return (
        <footer className="py-12 px-6 border-t border-white-subtle">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <p className="text-platinum-muted text-sm">
                &copy; 2024 {content.company || 'Your Company'}. All rights reserved.
              </p>
              <p className="text-platinum-muted text-xs mt-2">
                Built with <span className="gold-text">Prime Presence</span>
              </p>
            </div>
          </div>
        </footer>
      );

    default:
      return null;
  }
}
