'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { sites as sitesApi } from '@/lib/api';
import Link from 'next/link';
import { Loader, Check, AlertCircle, Copy, Eye } from 'lucide-react';
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
    if (!siteId || siteId === 'undefined') {
      setError('Invalid site ID.');
      setLoading(false);
      return;
    }
    loadSite();
  }, [siteId]);

  async function loadSite() {
    const { data, error: err } = await sitesApi.get(siteId);
    if (err || !data?.site) {
      setError(err || 'Site not found');
      setLoading(false);
      return;
    }
    setSite(data.site);
    if (data.site.status === 'published') setPublished(true);
    setLoading(false);
  }

  async function handlePublish() {
    if (!site) return;
    try {
      setPublishing(true);
      const { data, error: err } = await sitesApi.publish(siteId);
      if (err) throw new Error(err);
      setPublished(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setPublishing(false);
    }
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Preview URL always works — renders from MongoDB, no DNS needed
  const previewUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/preview/${siteId}`;
  const publicUrl = site ? `https://${site.subdomain}.primepresence.site` : '';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  if (!site && error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 text-red-400" size={32} />
          <p className="text-platinum mb-4">{error}</p>
          <Link href="/dashboard" className="text-gold hover:text-gold-light transition-colors">← Back to dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12" style={{ background: 'var(--bg-primary)' }}>
      <div className="w-full max-w-xl">
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
              ? 'Your website is published and can be previewed instantly.'
              : `"${site?.name}" is ready to be published.`}
          </p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 border border-red-500/30 bg-red-500/5 text-red-400 text-sm flex items-start gap-3">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        <div className="border border-white-subtle p-8 rounded" style={{ background: 'var(--bg-secondary)' }}>
          {published ? (
            <>
              <div className="mb-8 flex items-center justify-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Check className="text-green-400" size={32} />
                </div>
              </div>

              {/* Preview URL — always works, renders from MongoDB */}
              <div className="mb-4">
                <p className="text-platinum-muted text-sm mb-2">🔍 Preview URL (works immediately):</p>
                <div className="p-4 bg-white-subtle rounded border border-white-subtle flex items-center justify-between gap-3">
                  <code className="text-gold font-mono text-sm truncate">{previewUrl}</code>
                  <button onClick={() => copyUrl(previewUrl)} className="p-2 hover:bg-white-subtle rounded transition-colors text-platinum-muted hover:text-platinum flex-shrink-0">
                    {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {/* Public URL — requires DNS setup */}
              <div className="mb-8">
                <p className="text-platinum-muted text-sm mb-2">🌐 Public URL (requires DNS setup):</p>
                <div className="p-4 bg-white-subtle rounded border border-white-subtle flex items-center justify-between gap-3">
                  <code className="text-platinum font-mono text-sm truncate">{publicUrl}</code>
                  <button onClick={() => copyUrl(publicUrl)} className="p-2 hover:bg-white-subtle rounded transition-colors text-platinum-muted hover:text-platinum flex-shrink-0">
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <Link
                  href={`/preview/${siteId}`}
                  target="_blank"
                  className="flex w-full items-center justify-center gap-2 px-6 py-3 bg-gold hover:bg-gold-light text-black font-medium rounded transition-colors"
                >
                  <Eye size={16} /> View Preview
                </Link>
                <button
                  onClick={() => router.push(`/builder/${siteId}`)}
                  className="w-full px-6 py-3 border border-white-subtle hover:border-gold/40 text-platinum rounded transition-colors"
                >
                  Continue Editing
                </button>
              </div>

              <div className="pt-6 border-t border-white-subtle">
                <p className="text-platinum-muted text-xs mb-3">💡 Next steps:</p>
                <ul className="space-y-2 text-platinum-muted text-sm">
                  <li>✓ Share the preview URL with clients</li>
                  <li>✓ Set up DNS wildcard to activate the public URL</li>
                  <li>✓ Connect a custom domain (coming soon)</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6 p-4 bg-gold/10 border border-gold/30 rounded">
                <p className="text-platinum text-sm mb-1">📍 Preview will be available at:</p>
                <code className="text-gold font-mono">{previewUrl}</code>
              </div>

              <div className="mb-8 p-4 bg-white-subtle rounded border border-white-subtle">
                <h3 className="text-platinum font-medium mb-3">Publish checklist:</h3>
                <ul className="space-y-2 text-platinum-muted text-sm">
                  <li className="flex items-center gap-2"><Check size={14} className="text-green-400" /> Site name: {site?.name}</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-green-400" /> Industry: {site?.industry}</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-green-400" /> Style: {site?.style}</li>
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handlePublish}
                  disabled={publishing}
                  className="w-full px-6 py-3 bg-gold hover:bg-gold-light text-black font-medium rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {publishing && <Loader className="animate-spin" size={16} />}
                  {publishing ? 'Publishing...' : 'Publish Now'}
                </button>
                <button
                  onClick={() => router.push(`/builder/${siteId}`)}
                  className="w-full px-6 py-3 border border-white-subtle hover:border-platinum text-platinum rounded transition-colors"
                >
                  Continue Editing
                </button>
              </div>
            </>
          )}
        </div>

        <div className="mt-6">
          <Link href="/dashboard" className="text-gold text-sm hover:text-gold-light transition-colors">
            ← Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
