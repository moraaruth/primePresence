'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/api';
import { Eye, EyeOff, Loader } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: err } = await auth.login(email, password);
    if (err) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
      return;
    }
    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12" style={{ background: 'var(--bg-primary)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col leading-none items-center">
            <span className="font-display text-2xl font-light tracking-widest text-platinum">PRIME</span>
            <span className="font-display text-2xl font-light tracking-widest gold-text">PRESENCE</span>
          </Link>
        </div>

        <div className="border border-white-subtle p-8" style={{ background: 'var(--bg-secondary)' }}>
          <h1 className="font-display text-3xl font-light text-platinum mb-2">Welcome back</h1>
          <p className="text-platinum-muted text-sm mb-8">Sign in to your account to continue building.</p>

          {error && (
            <div className="mb-4 px-4 py-3 border border-red-500/30 bg-red-500/5 text-red-400 text-sm">{error}</div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="section-label block mb-2">Email Address</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="input-luxury"
                required
                autoFocus
              />
            </div>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <label className="section-label">Password</label>
                <Link href="/forgot-password" className="text-gold text-xs hover:text-gold-light transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder="Your password"
                className="input-luxury pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[2.6rem] text-platinum-dark hover:text-platinum transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full justify-center py-4 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? <><Loader size={16} className="animate-spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-platinum-dark text-sm mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-gold hover:text-gold-light transition-colors">Create one free</Link>
        </p>
      </div>
    </div>
  );
}
