'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import { Loader, Check, AlertCircle, Copy } from 'lucide-react';
import type { Site } from '@/lib/types';

export default function PublishPage() {
  const router = useRouter();
  const params = useParams();
  const siteId = params.siteId as string;

  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadSite();
  }, [siteId]);

  async function loadSite() {
    try {
      const supabase = createClient();
      const { data, error: err } = await supabase
        .from('sites')
        .select('*')
        .eq('id', siteId)
        .single();

      if (err) throw err;
      setSite(data);
      if (data.status === 'published') {
        setPublished(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handlePublish() {
    if (!site) return;

    try {
      setPublishing(true);
      const supabase = createClient();

      const { error: err } = await supabase
        .from('sites')
        .update({
          status: 'published',
          published_at: new Date().toISOString(),
        })
        .eq('id', siteId);

      if (err) throw err;
      setPublished(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setPublishing(false);
    }
  }

  const siteUrl = site ? `${site.subdomain}.primepresence.site` : '';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  if (!site) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4" size={32} />
          <p className="text-platinum">Site not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12" style={{ background: 'var(--bg-primary)' }}>
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex flex-col leading-none mb-6">
            <span className="font-display text-2xl font-light tracking-widest text-platinum">PRIME</span>
            <span className="font-display text-2xl font-light tracking-widest gold-text">PRESENCE</span>
          </Link>

          <h1 className="font-display text-3xl font-light text-platinum mb-2">
            {published ? 'Your site is live! 🎉' : 'Ready to publish?'}
          </h1>
          <p className="text-platinum-muted">
            {published
              ? 'Your website is now live and accessible to the world.'
              : `Your website "${site.name}" is ready to be published.`}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 px-4 py-3 border border-red-500/30 bg-red-500/5 text-red-400 text-sm rounded flex items-start gap-3">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <div>{error}</div>
          </div>
        )}

        {/* Content */}
        <div className="border border-white-subtle p-8 rounded" style={{ background: 'var(--bg-secondary)' }}>
          {published ? (
            <>
              <div className="mb-8 flex items-center justify-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Check className="text-green-400" size={32} />
                </div>
              </div>

              <div className="mb-8">
                <p className="text-platinum-muted text-sm mb-3">Your site is live at:</p>
                <div className="p-4 bg-white-subtle rounded border border-white-subtle flex items-center justify-between">
                  <code className="text-platinum font-mono">https://{siteUrl}</code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`https://${siteUrl}`);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="p-2 hover:bg-white-subtle rounded transition-colors text-platinum-muted hover:text-platinum">
                    {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <a
                  href={`https://${siteUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 bg-gold hover:bg-gold-light text-black font-medium rounded transition-colors text-center">
                  View Your Live Site
                </a>

                <button
                  onClick={() => router.push(`/builder/${siteId}`)}
                  className="w-full px-6 py-3 border border-white-subtle hover:border-gold/40 text-platinum rounded transition-colors">
                  Continue Editing
                </button>
              </div>

              <div className="pt-6 border-t border-white-subtle">
                <p className="text-platinum-muted text-xs mb-4">💡 Next steps:</p>
                <ul className="space-y-2 text-platinum-muted text-sm">
                  <li>✓ Share your site URL with clients and customers</li>
                  <li>✓ Connect a custom domain (coming soon)</li>
                  <li>✓ Set up analytics to track visitors</li>
                  <li>✓ Add more pages and content</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6 p-4 bg-gold/10 border border-gold/30 rounded">
                <p className="text-platinum text-sm mb-2">📍 Your site will be accessible at:</p>
                <code className="text-gold font-mono text-lg">https://{siteUrl}</code>
              </div>

              <div className="mb-8 p-4 bg-white-subtle rounded border border-white-subtle">
                <h3 className="text-platinum font-medium mb-3">Publish checklist:</h3>
                <ul className="space-y-2 text-platinum-muted text-sm">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-green-400" />
                    Site name: {site.name}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-green-400" />
                    Industry: {site.industry}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-green-400" />
                    Style: {site.style}
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handlePublish}
                  disabled={publishing}
                  className="w-full px-6 py-3 bg-gold hover:bg-gold-light text-black font-medium rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {publishing && <Loader className="animate-spin" size={16} />}
                  {publishing ? 'Publishing...' : 'Publish Now'}
                </button>

                <button
                  onClick={() => router.push(`/builder/${siteId}`)}
                  className="w-full px-6 py-3 border border-white-subtle hover:border-platinum text-platinum rounded transition-colors">
                  Continue Editing
                </button>
              </div>

              <p className="text-platinum-muted text-xs text-center mt-6">
                You can make changes anytime. Published updates will go live immediately.
              </p>
            </>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-6">
          <Link href="/dashboard" className="text-gold text-sm hover:text-gold-light transition-colors">
            ← Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
