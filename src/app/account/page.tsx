'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, subscription as subApi } from '@/lib/api';
import Link from 'next/link';
import { Loader, AlertCircle, LogOut } from 'lucide-react';
import type { AuthUser } from '@/lib/types';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAccount();
  }, []);

  async function loadAccount() {
    try {
      const { data: userData, error: userErr } = await auth.me();
      if (userErr || !userData?.user) {
        router.push('/login');
        return;
      }
      setUser(userData.user);

      const { data: subData } = await subApi.get();
      setSubscription(subData?.subscription || null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await auth.logout();
    router.push('/');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div className="border-b border-white-subtle" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-display text-lg font-light tracking-widest text-platinum">PRIME</span>
            <span className="font-display text-lg font-light tracking-widest gold-text">PRESENCE</span>
          </Link>
          <Link href="/dashboard" className="text-platinum-muted hover:text-platinum transition-colors text-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-display text-4xl font-light text-platinum mb-2">Account Settings</h1>
        <p className="text-platinum-muted mb-12">Manage your account and subscription</p>

        {error && (
          <div className="mb-6 px-4 py-3 border border-red-500/30 bg-red-500/5 text-red-400 text-sm rounded flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* Profile */}
        <div className="mb-12 p-8 border border-white-subtle rounded" style={{ background: 'var(--bg-secondary)' }}>
          <h2 className="font-display text-2xl font-light text-platinum mb-6">Profile</h2>
          <div className="space-y-4">
            <div>
              <p className="text-platinum-muted text-sm mb-1">Name</p>
              <p className="text-platinum">{user?.fullName || `${user?.firstName} ${user?.lastName}`.trim()}</p>
            </div>
            <div>
              <p className="text-platinum-muted text-sm mb-1">Email</p>
              <p className="text-platinum">{user?.email}</p>
            </div>
            <div>
              <p className="text-platinum-muted text-sm mb-1">Member since</p>
              <p className="text-platinum">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}</p>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className="mb-12 p-8 border border-white-subtle rounded" style={{ background: 'var(--bg-secondary)' }}>
          <h2 className="font-display text-2xl font-light text-platinum mb-6">Subscription</h2>
          {subscription ? (
            <div className="space-y-4">
              <div>
                <p className="text-platinum-muted text-sm mb-1">Current Plan</p>
                <p className="text-2xl text-platinum font-medium capitalize">{subscription.plan}</p>
              </div>
              <div>
                <p className="text-platinum-muted text-sm mb-1">Status</p>
                <span className={`px-3 py-1 rounded text-sm font-medium uppercase tracking-wide ${
                  subscription.status === 'active' ? 'bg-green-500/20 text-green-400'
                  : subscription.status === 'trialing' ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-red-500/20 text-red-400'
                }`}>
                  {subscription.status}
                </span>
              </div>
              <div className="pt-4">
                <Link href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black font-medium rounded hover:bg-gold-light transition-colors">
                  View Plans
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-platinum-muted">No subscription found.</p>
          )}
        </div>

        {/* Danger Zone */}
        <div className="p-8 border border-red-500/30 bg-red-500/5 rounded">
          <h2 className="font-display text-2xl font-light text-red-400 mb-4">Danger Zone</h2>
          <p className="text-platinum-muted text-sm mb-6">Sign out from this device.</p>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium rounded transition-colors flex items-center gap-2"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
