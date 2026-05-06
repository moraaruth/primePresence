'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, sites as sitesApi, subscription as subApi } from '@/lib/api';
import Link from 'next/link';
import { Plus, Edit2, Eye, Trash2, Loader, LogOut, Settings, AlertCircle } from 'lucide-react';
import type { Site, AuthUser, Subscription } from '@/lib/types';

const PLAN_LIMITS: Record<string, number> = {
  free: 1,
  starter: 3,
  pro: Infinity,
  elite: Infinity,
};

export default function DashboardPage() {
  const router = useRouter();
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [plan, setPlan] = useState<string>('free');
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      // Auth check
      const { data: userData, error: userErr } = await auth.me();
      if (userErr || !userData?.user) {
        router.push('/login');
        return;
      }
      setUser(userData.user);

      // Load sites
      const { data: sitesData, error: sitesErr } = await sitesApi.list();
      if (sitesErr) throw new Error(sitesErr);
      setSites(sitesData?.sites || []);

      // Load subscription
      const { data: subData } = await subApi.get();
      if (subData?.subscription?.plan) setPlan(subData.subscription.plan);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(siteId: string) {
    if (!confirm('Delete this site? This cannot be undone.')) return;
    try {
      setDeleting(siteId);
      const { error: err } = await sitesApi.delete(siteId);
      if (err) throw new Error(err);
      setSites(prev => prev.filter(s => s.id !== siteId));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeleting(null);
    }
  }

  async function handleLogout() {
    await auth.logout();
    router.push('/');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4" size={32} />
          <p className="text-platinum">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const siteLimit = PLAN_LIMITS[plan] ?? 1;
  const canCreateMore = sites.length < siteLimit;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="border-b border-white-subtle sticky top-0 z-40" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-display text-xl font-light tracking-widest text-platinum">PRIME</span>
            <span className="font-display text-xl font-light tracking-widest gold-text">PRESENCE</span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-platinum text-sm">{user?.email}</p>
              <p className="text-platinum-muted text-xs mt-1 uppercase tracking-wide">{plan} TIER</p>
            </div>
            <button
              onClick={() => router.push('/account')}
              className="p-2 hover:bg-white-subtle rounded transition-colors text-platinum"
            >
              <Settings size={20} />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-white-subtle rounded transition-colors text-platinum"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-light text-platinum mb-2">Your Websites</h1>
          <p className="text-platinum-muted">
            {sites.length} of {siteLimit === Infinity ? '∞' : siteLimit} site{sites.length !== 1 ? 's' : ''} used
          </p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 border border-red-500/30 bg-red-500/5 text-red-400 text-sm flex items-start gap-3">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <div>{error}</div>
          </div>
        )}

        {canCreateMore && (
          <Link
            href="/onboarding"
            className="group mb-8 block p-8 border-2 border-dashed border-white-subtle hover:border-gold/50 transition-all rounded"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <div className="flex items-center gap-4 text-platinum-muted group-hover:text-platinum transition-colors">
              <Plus size={28} className="text-gold" />
              <div>
                <h3 className="font-display text-lg text-platinum">Create New Website</h3>
                <p className="text-sm">Build a professional website in 60 seconds with AI</p>
              </div>
            </div>
          </Link>
        )}

        {sites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map(site => (
              <div
                key={site.id}
                className="group border border-white-subtle hover:border-gold/40 transition-all rounded overflow-hidden"
                style={{ background: 'var(--bg-secondary)' }}
              >
                {/* Thumbnail */}
                <div className="h-40 bg-gradient-to-br from-gold/10 to-transparent flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white-subtle opacity-20" />
                  <div className="text-center relative z-10">
                    <div className="text-4xl gold-text mb-2">🌐</div>
                    <p className="text-platinum-muted text-xs">{site.industry}</p>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display text-lg text-platinum">{site.name}</h3>
                      <p className="text-platinum-muted text-sm">{site.subdomain}.primepresence.site</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium uppercase tracking-wide ${
                      site.status === 'published'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {site.status}
                    </span>
                  </div>

                  <p className="text-platinum-muted text-xs mb-4">
                    Created {new Date(site.createdAt || site.created_at || '').toLocaleDateString()}
                  </p>

                  <div className="flex gap-2 pt-4 border-t border-white-subtle">
                    <button
                      onClick={() => router.push(`/builder/${site.id}`)}
                      className="flex-1 px-3 py-2 bg-gold/20 hover:bg-gold/30 text-gold transition-colors rounded text-xs font-medium flex items-center justify-center gap-2"
                    >
                      <Edit2 size={14} /> Edit
                    </button>
                    <Link
                      href={`/preview/${site.id}`}
                      className="flex-1 px-3 py-2 bg-platinum/10 hover:bg-platinum/20 text-platinum transition-colors rounded text-xs font-medium flex items-center justify-center gap-2"
                    >
                      <Eye size={14} /> Preview
                    </Link>
                    <button
                      onClick={() => handleDelete(site.id)}
                      disabled={deleting === site.id}
                      className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors rounded text-xs font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Trash2 size={14} /> {deleting === site.id ? '...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-white-subtle rounded" style={{ background: 'var(--bg-secondary)' }}>
            <p className="text-platinum-muted mb-4">No websites yet. Create your first one!</p>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black font-medium rounded hover:bg-gold-light transition-colors"
            >
              <Plus size={18} /> Build Your First Website
            </Link>
          </div>
        )}

        {plan === 'free' && (
          <div className="mt-12 p-6 border border-gold/30 rounded" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.05), transparent)' }}>
            <h3 className="font-display text-lg text-platinum mb-2">Unlock More Websites</h3>
            <p className="text-platinum-muted text-sm mb-4">Upgrade to Starter for 3 sites, or Pro for unlimited.</p>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-black font-medium rounded hover:bg-gold-light transition-colors text-sm">
              View Plans
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
