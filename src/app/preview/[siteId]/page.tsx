'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { sites as sitesApi } from '@/lib/api';
import Link from 'next/link';
import { Loader, AlertCircle, ArrowLeft } from 'lucide-react';
import type { Site, Page, Section } from '@/lib/types';

interface PageWithSections extends Page {
  sections: Section[];
}

export default function PreviewPage() {
  const params = useParams();
  const siteId = params.siteId as string;

  const [site, setSite] = useState<Site | null>(null);
  const [pages, setPages] = useState<PageWithSections[]>([]);
  const [activePage, setActivePage] = useState<PageWithSections | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!siteId || siteId === 'undefined') {
      setError('Invalid site ID.');
      setLoading(false);
      return;
    }
    loadPreview();
  }, [siteId]);

  async function loadPreview() {
    // Single public request — no auth token needed
    const { data, error: err } = await sitesApi.getPreview(siteId);

    if (err || !data?.site) {
      setError(err || 'Site not found.');
      setLoading(false);
      return;
    }

    setSite(data.site);
    const pageList: PageWithSections[] = data.pages || [];
    setPages(pageList);
    setActivePage(pageList[0] || null);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4" size={32} />
          <p className="text-platinum">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (error || !site) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 text-red-400" size={32} />
          <p className="text-platinum mb-4">{error || 'Site not found'}</p>
          <Link href="/dashboard" className="text-gold hover:text-gold-light transition-colors">
            ← Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Toolbar — only visible to the site owner, hidden for external viewers */}
      <div className="sticky top-0 z-50 border-b border-white-subtle px-6 py-3 flex items-center justify-between print:hidden" style={{ background: 'var(--bg-secondary)' }}>
        <div className="flex items-center gap-4">
          <Link
            href={`/builder/${siteId}`}
            className="flex items-center gap-2 text-platinum-muted hover:text-platinum transition-colors text-sm"
          >
            <ArrowLeft size={16} /> Back to Editor
          </Link>
          <div className="h-4 w-px bg-white-subtle" />
          <span className="text-platinum text-sm font-medium">{site.name}</span>
          <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wide ${
            site.status === 'published'
              ? 'bg-green-500/20 text-green-400'
              : 'bg-yellow-500/20 text-yellow-400'
          }`}>
            {site.status}
          </span>
        </div>
        <div className="text-platinum-muted text-xs hidden sm:block">
          {site.subdomain}.primepresence.site
        </div>
      </div>

      {/* Site nav */}
      <nav className="border-b border-white-subtle" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-display text-xl font-light tracking-widest text-platinum">
            {site.name}
          </span>
          {pages.length > 1 && (
            <div className="flex items-center gap-6">
              {pages.map(page => (
                <button
                  key={page.id}
                  onClick={() => setActivePage(page)}
                  className={`text-sm transition-colors ${
                    activePage?.id === page.id
                      ? 'text-gold'
                      : 'text-platinum-muted hover:text-platinum'
                  }`}
                >
                  {page.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Page content */}
      {activePage ? (
        activePage.sections.length > 0 ? (
          activePage.sections.map(section => (
            <RenderSection key={section.id} section={section} />
          ))
        ) : (
          <div className="py-24 text-center">
            <p className="text-platinum-muted mb-2">This page has no sections yet.</p>
            <Link
              href={`/builder/${siteId}`}
              className="text-gold hover:text-gold-light transition-colors text-sm"
            >
              Add sections in the editor →
            </Link>
          </div>
        )
      ) : null}
    </div>
  );
}

function RenderSection({ section }: { section: Section }) {
  const c = section.content as any;

  switch (section.type) {
    case 'hero':
      return (
        <section className="py-24 px-6 border-b border-white-subtle bg-gradient-to-b from-gold/5 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-5xl md:text-6xl font-light text-platinum mb-6">{c.headline}</h1>
            <p className="text-platinum-muted text-xl md:text-2xl mb-10 max-w-3xl leading-relaxed">{c.subheadline}</p>
            <a href="#contact" className="inline-block px-8 py-4 bg-gold hover:bg-gold-light text-black font-medium rounded transition-colors">
              {c.cta || 'Get Started'}
            </a>
          </div>
        </section>
      );

    case 'features':
      return (
        <section className="py-20 px-6 border-b border-white-subtle">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-4xl font-light text-platinum mb-16 text-center">{c.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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

    case 'testimonials':
      return (
        <section className="py-20 px-6 border-b border-white-subtle" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl font-light text-platinum mb-16 text-center">
              {c.title || 'What Our Clients Say'}
            </h2>
            <div className="space-y-12">
              {(c.testimonials || []).map((t: any, i: number) => (
                <div key={i} className="border-l-2 border-gold pl-6">
                  <p className="text-platinum-muted text-lg mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-gold font-medium">{t.author}</p>
                  <p className="text-platinum-muted text-sm">{t.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'cta':
      return (
        <section className="py-16 px-6 border-b border-white-subtle">
          <div className="max-w-2xl mx-auto text-center p-12 border border-gold/30 rounded" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.08), transparent)' }}>
            <h2 className="font-display text-3xl font-light text-platinum mb-6">{c.heading}</h2>
            <a href="#contact" className="inline-block px-8 py-3 bg-gold hover:bg-gold-light text-black font-medium rounded transition-colors">
              {c.ctaText || 'Get Started'}
            </a>
          </div>
        </section>
      );

    case 'contact':
      return (
        <section id="contact" className="py-20 px-6 border-b border-white-subtle">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-4xl font-light text-platinum mb-8 text-center">
              {c.title || 'Get In Touch'}
            </h2>
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div>
                <label className="block text-platinum text-sm font-medium mb-2">Name</label>
                <input type="text" className="input-luxury" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-platinum text-sm font-medium mb-2">Email</label>
                <input type="email" className="input-luxury" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-platinum text-sm font-medium mb-2">Message</label>
                <textarea className="input-luxury resize-none" rows={5} placeholder="Your message..." />
              </div>
              <button type="submit" className="w-full px-6 py-3 bg-gold hover:bg-gold-light text-black font-medium rounded transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </section>
      );

    case 'footer':
      return (
        <footer className="py-12 px-6 border-t border-white-subtle">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-platinum-muted text-sm">
              &copy; {new Date().getFullYear()} {c.company || 'Your Company'}. All rights reserved.
            </p>
            <p className="text-platinum-muted text-xs mt-2">
              Built with <span className="gold-text">Prime Presence</span>
            </p>
          </div>
        </footer>
      );

    default:
      return null;
  }
}
