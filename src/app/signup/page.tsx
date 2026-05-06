'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/api';
import { Eye, EyeOff, Loader, Sparkles } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const parts = name.trim().split(' ');
    const firstName = parts[0] || name.trim();
    const lastName = parts.slice(1).join(' ');

    const { error: err } = await auth.register(firstName, lastName, email, password);
    if (err) {
      setError(err);
      setLoading(false);
      return;
    }
    router.push('/onboarding');
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-14" style={{ background: 'var(--bg-secondary)' }}>
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl font-light tracking-widest text-platinum">PRIME</span>
          <span className="font-display text-2xl font-light tracking-widest gold-text">PRESENCE</span>
        </Link>
        <div>
          <div className="w-12 h-12 border border-gold/30 flex items-center justify-center mb-6">
            <Sparkles size={20} className="text-gold" />
          </div>
          <h2 className="font-display text-4xl font-light text-platinum mb-4">
            Build a luxury website<br />
            <span className="gold-text italic">in minutes.</span>
          </h2>
          <p className="text-platinum-muted text-sm leading-relaxed mb-8">
            Answer 7 questions. Our AI generates a complete, premium website.
            Customise it. Publish it. Look elite — without a designer.
          </p>
          <div className="flex flex-col gap-3">
            {[
              'AI-generated copy and structure',
              'Premium luxury templates',
              'Publish to your own domain',
              'Starting at KSh 3,800/month',
            ].map(item => (
              <div key={item} className="flex items-center gap-3 text-sm text-platinum-muted">
                <span className="text-gold">✦</span> {item}
              </div>
            ))}
          </div>
        </div>
        <p className="text-platinum-dark text-xs">© {new Date().getFullYear()} Prime Presence</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex flex-col leading-none">
              <span className="font-display text-xl font-light tracking-widest text-platinum">PRIME</span>
              <span className="font-display text-xl font-light tracking-widest gold-text">PRESENCE</span>
            </Link>
          </div>

          <h1 className="font-display text-3xl font-light text-platinum mb-2">Create your account</h1>
          <p className="text-platinum-muted text-sm mb-8">Start building your luxury website today.</p>

          {error && (
            <div className="mb-4 px-4 py-3 border border-red-500/30 bg-red-500/5 text-red-400 text-sm">{error}</div>
          )}

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div>
              <label className="section-label block mb-2">Full Name</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
                placeholder="Jane Doe"
                className="input-luxury"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="section-label block mb-2">Email Address</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="input-luxury"
                required
              />
            </div>
            <div className="relative">
              <label className="section-label block mb-2">Password</label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                className="input-luxury pr-12"
                required
                minLength={8}
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
              {loading ? <><Loader size={16} className="animate-spin" /> Creating account...</> : 'Create Free Account'}
            </button>
          </form>

          <p className="text-center text-platinum-dark text-sm mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-gold hover:text-gold-light transition-colors">Sign in</Link>
          </p>
          <p className="text-center text-platinum-dark text-xs mt-4">
            By signing up you agree to our{' '}
            <Link href="/terms" className="text-gold hover:text-gold-light transition-colors">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-gold hover:text-gold-light transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
