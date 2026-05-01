'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Loader, Check } from 'lucide-react';
import type { OnboardingData } from '@/lib/types';

const INDUSTRIES = ['Real Estate', 'Consulting', 'Healthcare / Wellness', 'Restaurant / Hospitality', 'Law / Legal Services', 'Coaching / Training', 'Retail / E-commerce', 'Creative / Portfolio', 'Tech / Startup', 'Other'];
const STYLES = [
  { id: 'luxury', label: 'Luxury', desc: 'Dark, gold accents, premium feel' },
  { id: 'minimal', label: 'Minimal', desc: 'Clean, white space, understated' },
  { id: 'bold', label: 'Bold', desc: 'Strong colours, high contrast' },
  { id: 'warm', label: 'Warm', desc: 'Earthy tones, approachable' },
];
const PAGES = ['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact', 'Pricing', 'Testimonials'];
const GOALS = ['Generate leads / enquiries', 'Showcase my work / portfolio', 'Sell products online', 'Build my personal brand', 'Provide information / resources'];
const COLORS = [
  { id: 'dark-gold', label: 'Dark & Gold', bg: '#0A0A0A', accent: '#C9A84C' },
  { id: 'white-navy', label: 'White & Navy', bg: '#FFFFFF', accent: '#1A2B3C' },
  { id: 'cream-sage', label: 'Cream & Sage', bg: '#FAF7F2', accent: '#5A8A4A' },
  { id: 'dark-teal', label: 'Dark & Teal', bg: '#0F1A1C', accent: '#4ECDC4' },
  { id: 'white-terracotta', label: 'White & Terracotta', bg: '#FAFAF8', accent: '#C4622D' },
];

const STEPS = ['Business', 'Industry', 'Style', 'Pages', 'Audience', 'Goal', 'Colours'];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    businessName: '',
    industry: '',
    style: '',
    pages: ['Home', 'About', 'Services', 'Contact'],
    audience: '',
    goal: '',
    colorPreference: 'dark-gold',
  });

  const progress = ((step + 1) / STEPS.length) * 100;

  function togglePage(page: string) {
    setData(d => ({
      ...d,
      pages: d.pages.includes(page) ? d.pages.filter(p => p !== page) : [...d.pages, page],
    }));
  }

  async function handleGenerate() {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const { siteId } = await res.json();
      router.push(`/builder/${siteId}`);
    } catch {
      setLoading(false);
    }
  }

  const canNext = () => {
    if (step === 0) return data.businessName.trim().length > 0;
    if (step === 1) return data.industry.length > 0;
    if (step === 2) return data.style.length > 0;
    if (step === 3) return data.pages.length > 0;
    if (step === 4) return data.audience.trim().length > 0;
    if (step === 5) return data.goal.length > 0;
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="border-b border-white-subtle px-6 py-4 flex items-center justify-between" style={{ background: 'var(--bg-secondary)' }}>
        <div className="flex flex-col leading-none">
          <span className="font-display text-lg font-light tracking-widest text-platinum">PRIME</span>
          <span className="font-display text-lg font-light tracking-widest gold-text">PRESENCE</span>
        </div>
        <div className="text-platinum-muted text-sm">
          Step {step + 1} of {STEPS.length} — <span className="text-gold">{STEPS[step]}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white-subtle">
        <div className="h-full bg-gold transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl">

          {/* Step 0 — Business Name */}
          {step === 0 && (
            <div className="animate-fade-up">
              <p className="section-label mb-3">Step 1 of 7</p>
              <h1 className="font-display text-4xl font-light text-platinum mb-3">What's your business called?</h1>
              <p className="text-platinum-muted text-sm mb-8">This will be used throughout your website.</p>
              <input
                type="text" placeholder="e.g. Kova Advisory, Bahari Retreats..."
                value={data.businessName}
                onChange={e => setData(d => ({ ...d, businessName: e.target.value }))}
                className="input-luxury text-lg py-5" autoFocus
                onKeyDown={e => e.key === 'Enter' && canNext() && setStep(1)}
              />
            </div>
          )}

          {/* Step 1 — Industry */}
          {step === 1 && (
            <div className="animate-fade-up">
              <p className="section-label mb-3">Step 2 of 7</p>
              <h1 className="font-display text-4xl font-light text-platinum mb-3">What industry are you in?</h1>
              <p className="text-platinum-muted text-sm mb-8">We'll tailor your website content to your field.</p>
              <div className="grid grid-cols-2 gap-3">
                {INDUSTRIES.map(ind => (
                  <button key={ind} onClick={() => setData(d => ({ ...d, industry: ind }))}
                    className={`px-4 py-3 text-sm text-left border transition-all duration-200 ${data.industry === ind ? 'border-gold bg-gold/10 text-gold' : 'border-white-subtle text-platinum-muted hover:border-gold/40'}`}>
                    {ind}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Style */}
          {step === 2 && (
            <div className="animate-fade-up">
              <p className="section-label mb-3">Step 3 of 7</p>
              <h1 className="font-display text-4xl font-light text-platinum mb-3">Choose your website style</h1>
              <p className="text-platinum-muted text-sm mb-8">Pick the aesthetic that best represents your brand.</p>
              <div className="grid grid-cols-2 gap-4">
                {STYLES.map(s => (
                  <button key={s.id} onClick={() => setData(d => ({ ...d, style: s.id }))}
                    className={`p-5 text-left border transition-all duration-200 ${data.style === s.id ? 'border-gold bg-gold/10' : 'border-white-subtle hover:border-gold/40'}`}>
                    <p className={`font-display text-xl font-light mb-1 ${data.style === s.id ? 'text-gold' : 'text-platinum'}`}>{s.label}</p>
                    <p className="text-platinum-muted text-xs">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 — Pages */}
          {step === 3 && (
            <div className="animate-fade-up">
              <p className="section-label mb-3">Step 4 of 7</p>
              <h1 className="font-display text-4xl font-light text-platinum mb-3">Which pages do you need?</h1>
              <p className="text-platinum-muted text-sm mb-8">Select all that apply. You can add more later.</p>
              <div className="grid grid-cols-2 gap-3">
                {PAGES.map(page => (
                  <button key={page} onClick={() => togglePage(page)}
                    className={`px-4 py-3 text-sm text-left border transition-all duration-200 flex items-center justify-between ${data.pages.includes(page) ? 'border-gold bg-gold/10 text-gold' : 'border-white-subtle text-platinum-muted hover:border-gold/40'}`}>
                    {page}
                    {data.pages.includes(page) && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4 — Audience */}
          {step === 4 && (
            <div className="animate-fade-up">
              <p className="section-label mb-3">Step 5 of 7</p>
              <h1 className="font-display text-4xl font-light text-platinum mb-3">Who are your ideal clients?</h1>
              <p className="text-platinum-muted text-sm mb-8">Describe them briefly — the AI will write copy that speaks directly to them.</p>
              <textarea
                placeholder="e.g. High-net-worth individuals in Nairobi looking for premium consulting services..."
                value={data.audience}
                onChange={e => setData(d => ({ ...d, audience: e.target.value }))}
                className="input-luxury resize-none" rows={4} autoFocus
              />
            </div>
          )}

          {/* Step 5 — Goal */}
          {step === 5 && (
            <div className="animate-fade-up">
              <p className="section-label mb-3">Step 6 of 7</p>
              <h1 className="font-display text-4xl font-light text-platinum mb-3">What's your primary goal?</h1>
              <p className="text-platinum-muted text-sm mb-8">This shapes your website's calls-to-action and structure.</p>
              <div className="flex flex-col gap-3">
                {GOALS.map(goal => (
                  <button key={goal} onClick={() => setData(d => ({ ...d, goal }))}
                    className={`px-5 py-4 text-sm text-left border transition-all duration-200 ${data.goal === goal ? 'border-gold bg-gold/10 text-gold' : 'border-white-subtle text-platinum-muted hover:border-gold/40'}`}>
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6 — Colours */}
          {step === 6 && (
            <div className="animate-fade-up">
              <p className="section-label mb-3">Step 7 of 7</p>
              <h1 className="font-display text-4xl font-light text-platinum mb-3">Choose your colour palette</h1>
              <p className="text-platinum-muted text-sm mb-8">Pick the palette that feels right for your brand.</p>
              <div className="flex flex-col gap-3">
                {COLORS.map(c => (
                  <button key={c.id} onClick={() => setData(d => ({ ...d, colorPreference: c.id }))}
                    className={`px-5 py-4 text-sm text-left border transition-all duration-200 flex items-center gap-4 ${data.colorPreference === c.id ? 'border-gold' : 'border-white-subtle hover:border-gold/40'}`}>
                    <div className="flex gap-2 shrink-0">
                      <div className="w-6 h-6 rounded-full border border-white-subtle" style={{ background: c.bg }} />
                      <div className="w-6 h-6 rounded-full" style={{ background: c.accent }} />
                    </div>
                    <span className={data.colorPreference === c.id ? 'text-gold' : 'text-platinum-muted'}>{c.label}</span>
                    {data.colorPreference === c.id && <Check size={14} className="text-gold ml-auto" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            <button onClick={() => setStep(s => s - 1)} disabled={step === 0}
              className="btn-outline py-3 px-6 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2">
              <ArrowLeft size={16} /> Back
            </button>

            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canNext()}
                className="btn-gold py-3 px-8 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2">
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={handleGenerate} disabled={loading}
                className="btn-gold py-3 px-8 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2">
                {loading ? <><Loader size={16} className="animate-spin" /> Generating your site...</> : <>Generate My Website <ArrowRight size={16} /></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
