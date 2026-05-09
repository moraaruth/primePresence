'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, sites as sitesApi, subscription as subApi } from '@/lib/api';
import Link from 'next/link';
import { Plus, Edit2, Eye, Trash2, Loader, LogOut, Settings, AlertCircle } from 'lucide-react';
import type { Site, AuthUser } from '@/lib/types';

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
      const { data: userData, error: userErr } = await auth.me();
      if (userErr || !userData?.user) {
        router.push('/login');
        return;
      }
      setUser(userData.user);

      const { data: sitesData, error: sitesErr } = await sitesApi.list();
      if (sitesErr) throw new Error(sitesErr);
      setSites(sitesData?.sites || []);

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
      <div className="min-h-screen flex items-center justify-center bg-theme-primary">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4 text-gold" size={32} />
          <p className="text-theme-secondary">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const siteLimit = PLAN_LIMITS[plan] ?? 1;
  const canCreateMore = sites.length < siteLimit;

  return (
    <div className="min-h-screen bg-theme-primary">
      {/* Header */}
      <div
        className="border-b border-theme-subtle sticky top-0 z-40"
        style={{ background: 'var(--bg-elevated)', backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-display text-xl font-light tracking-widest text-theme-primary">PRIME</span>
            <span className="font-display text-xl font-light tracking-widest gold-text">PRESENCE</span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-theme-primary text-sm">{user?.email}</p>
              <p className="text-theme-muted text-xs mt-1 uppercase tracking-wide">{plan} tier</p>
            </div>
            <button
              onClick={() => router.push('/account')}
              className="p-2 rounded text-theme-secondary hover:text-theme-primary hover:bg-theme-secondary transition-colors"
              aria-label="Account settings"
            >
              <Settings size={20} />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded text-theme-secondary hover:text-theme-primary hover:bg-theme-secondary transition-colors"
              aria-label="Log out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-light text-theme-primary mb-2">Your Websites</h1>
          <p className="text-theme-muted">
            {sites.length} of {siteLimit === Infinity ? '∞' : siteLimit} site{sites.length !== 1 ? 's' : ''} used
          </p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 border rounded text-sm flex items-start gap-3 alert-error">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <div>{error}</div>
          </div>
        )}

        {canCreateMore && (
          <Link
            href="/onboarding"
            className="group mb-8 block p-8 border-2 border-dashed border-theme-subtle hover:border-gold/50 rounded transition-all duration-300 bg-theme-secondary"
          >
            <div className="flex items-center gap-4 text-theme-muted group-hover:text-theme-primary transition-colors">
              <Plus size={28} className="text-gold" />
              <div>
                <h3 className="font-display text-lg text-theme-primary">Create New Website</h3>
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
                className="group border border-theme-subtle hover:border-gold/40 transition-all rounded overflow-hidden card-surface"
              >
                {/* Thumbnail */}
                <div
                  className="h-40 flex items-center justify-center relative overflow-hidden"
                  style={{ background: 'color-mix(in srgb, var(--gold) 8%, var(--bg-tertiary))' }}
                >
                  <div className="text-center relative z-10">
                    <div className="text-4xl gold-text mb-2">🌐</div>
                    <p className="text-theme-muted text-xs">{site.industry}</p>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display text-lg text-theme-primary">{site.name}</h3>
                      <p className="text-theme-muted text-sm">{site.subdomain}.primepresence.site</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium uppercase tracking-wide ${
                      site.status === 'published' ? 'badge-success' : 'badge-warning'
                    }`}>
                      {site.status}
                    </span>
                  </div>

                  <p className="text-theme-muted text-xs mb-4">
                    Created {new Date(site.createdAt || site.created_at || '').toLocaleDateString()}
                  </p>

                  <div className="flex gap-2 pt-4 border-t border-theme-subtle">
                    <button
                      onClick={() => router.push(`/builder/${site.id}`)}
                      className="flex-1 px-3 py-2 bg-gold/15 hover:bg-gold/25 text-gold transition-colors rounded text-xs font-medium flex items-center justify-center gap-2"
                    >
                      <Edit2 size={14} /> Edit
                    </button>
                    <Link
                      href={`/preview/${site.id}`}
                      className="flex-1 px-3 py-2 bg-theme-secondary hover:bg-theme-tertiary text-theme-secondary transition-colors rounded text-xs font-medium flex items-center justify-center gap-2"
                    >
                      <Eye size={14} /> Preview
                    </Link>
                    <button
                      onClick={() => handleDelete(site.id)}
                      disabled={deleting === site.id}
                      className="px-3 py-2 badge-error hover:opacity-80 transition-opacity rounded text-xs font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Trash2 size={14} /> {deleting === site.id ? '...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-theme-subtle rounded card-surface-secondary">
            <p className="text-theme-muted mb-4">No websites yet. Create your first one!</p>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 btn-gold"
            >
              <Plus size={18} /> Build Your First Website
            </Link>
          </div>
        )}

        {plan === 'free' && (
          <div className="mt-12 p-6 rounded promo-banner">
            <h3 className="font-display text-lg text-theme-primary mb-2">Unlock More Websites</h3>
            <p className="text-theme-muted text-sm mb-4">Upgrade to Starter for 3 sites, or Pro for unlimited.</p>
            <Link href="/pricing" className="btn-gold text-sm px-6 py-3">
              View Plans
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
