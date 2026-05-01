'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
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
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
      return;
    }
    router.push('/dashboard');
  }

  async function handleGoogle() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
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

          <button onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 py-3.5 mb-6 border border-white-subtle text-platinum text-sm font-medium transition-all duration-300 hover:border-gold/40"
            style={{ background: 'var(--bg-tertiary)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
            <span className="text-platinum-dark text-xs">or</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 border border-red-500/30 bg-red-500/5 text-red-400 text-sm">{error}</div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="section-label block mb-2">Email Address</label>
              <input value={email} onChange={e => setEmail(e.target.value)}
                type="email" placeholder="ruth@example.com" className="input-luxury" required />
            </div>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <label className="section-label">Password</label>
                <Link href="/forgot-password" className="text-gold text-xs hover:text-gold-light transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input value={password} onChange={e => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'} placeholder="Your password"
                className="input-luxury pr-12" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[2.6rem] text-platinum-dark hover:text-platinum transition-colors">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button type="submit" disabled={loading}
              className="btn-gold w-full justify-center py-4 mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? <><Loader size={16} className="animate-spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-platinum-dark text-sm mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-gold hover:text-gold-light transition-colors">Create one free</Link>
        </p>
      </div>
    </div>
  );
}
