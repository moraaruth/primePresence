'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import { Loader, AlertCircle, LogOut, Save } from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadAccount();
  }, []);

  async function loadAccount() {
    try {
      const supabase = createClient();

      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        router.push('/login');
        return;
      }
      setUser(authUser);

      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', authUser.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        setFullName(profileData.full_name || '');
      }

      const { data: subData } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', authUser.id)
        .single();

      setSubscription(subData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveProfile() {
    try {
      setSaving(true);
      const supabase = createClient();

      const { error: err } = await supabase
        .from('user_profiles')
        .update({ full_name: fullName, updated_at: new Date().toISOString() })
        .eq('user_id', user.id);

      if (err) throw err;
      setSuccess('Profile updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
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
      {/* Header */}
      <div className="border-b border-white-subtle" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-display text-lg font-light tracking-widest text-platinum">PRIME</span>
            <span className="font-display text-lg font-light tracking-widest gold-text">PRESENCE</span>
          </Link>

          <div className="flex gap-4">
            <Link href="/dashboard" className="text-platinum-muted hover:text-platinum transition-colors text-sm">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-display text-4xl font-light text-platinum mb-2">Account Settings</h1>
        <p className="text-platinum-muted mb-12">Manage your account and subscription</p>

        {error && (
          <div className="mb-6 px-4 py-3 border border-red-500/30 bg-red-500/5 text-red-400 text-sm rounded flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 px-4 py-3 border border-green-500/30 bg-green-500/5 text-green-400 text-sm rounded">
            {success}
          </div>
        )}

        {/* Profile Section */}
        <div className="mb-12 p-8 border border-white-subtle rounded" style={{ background: 'var(--bg-secondary)' }}>
          <h2 className="font-display text-2xl font-light text-platinum mb-6">Profile</h2>

          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-platinum text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-3 bg-white-subtle border border-white-subtle text-platinum-muted rounded cursor-not-allowed opacity-50"
              />
              <p className="text-platinum-dark text-xs mt-2">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-platinum text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 bg-white-subtle border border-white-subtle text-platinum rounded focus:outline-none focus:border-gold"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-platinum text-sm font-medium mb-2">Account Created</label>
              <input
                type="text"
                value={new Date(user?.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                disabled
                className="w-full px-4 py-3 bg-white-subtle border border-white-subtle text-platinum-muted rounded cursor-not-allowed opacity-50"
              />
            </div>
          </div>

          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="px-6 py-3 bg-gold hover:bg-gold-light text-black font-medium rounded transition-colors disabled:opacity-60 flex items-center gap-2">
            {saving && <Loader className="animate-spin" size={16} />}
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>

        {/* Subscription Section */}
        <div className="mb-12 p-8 border border-white-subtle rounded" style={{ background: 'var(--bg-secondary)' }}>
          <h2 className="font-display text-2xl font-light text-platinum mb-6">Subscription</h2>

          {subscription && (
            <div className="space-y-4">
              <div>
                <p className="text-platinum-muted text-sm mb-2">Current Plan</p>
                <p className="text-2xl text-platinum font-medium capitalize">{subscription.plan}</p>
              </div>

              <div>
                <p className="text-platinum-muted text-sm mb-2">Status</p>
                <span className={`px-3 py-1 rounded text-sm font-medium uppercase tracking-wide ${
                  subscription.status === 'active'
                    ? 'bg-green-500/20 text-green-400'
                    : subscription.status === 'trialing'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {subscription.status}
                </span>
              </div>

              {subscription.trial_ends_at && (
                <div>
                  <p className="text-platinum-muted text-sm mb-2">Trial Ends</p>
                  <p className="text-platinum">
                    {new Date(subscription.trial_ends_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}

              <div className="pt-6">
                <p className="text-platinum-muted text-sm mb-4">
                  Upgrade your plan to unlock more features and sites.
                </p>
                <Link href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black font-medium rounded hover:bg-gold-light transition-colors">
                  View Plans
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div className="p-8 border border-red-500/30 bg-red-500/5 rounded">
          <h2 className="font-display text-2xl font-light text-red-400 mb-4">Danger Zone</h2>

          <p className="text-platinum-muted text-sm mb-6">
            Sign out from this device. You can log back in anytime with your email.
          </p>

          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium rounded transition-colors flex items-center gap-2">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
