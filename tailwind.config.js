/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        /* ── Theme tokens (CSS variables) ── */
        'bg-primary':    'var(--bg-primary)',
        'bg-secondary':  'var(--bg-secondary)',
        'bg-tertiary':   'var(--bg-tertiary)',
        'bg-elevated':   'var(--bg-elevated)',
        'text-primary':  'var(--text-primary)',
        'text-secondary':'var(--text-secondary)',
        'text-muted':    'var(--text-muted)',
        'text-inverse':  'var(--text-inverse)',
        'border-subtle': 'var(--border-subtle)',
        'border-medium': 'var(--border-medium)',
        gold:            'var(--gold)',
        'gold-light':    'var(--gold-light)',
        'gold-dark':     'var(--gold-dark)',

        /* ── Static palette (for hardcoded uses) ── */
        obsidian:        '#0A0A0A',
        charcoal:        '#111111',
        graphite:        '#1A1A1A',
        'graphite-light':'#222222',
        ivory:           '#F5F0E8',
        'ivory-dark':    '#E8E0D0',
        platinum:        '#E8E8E8',
        'platinum-muted':'#9A9A9A',
        'platinum-dark': '#666666',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
        '8xl': ['6rem',   { lineHeight: '1'    }],
        '9xl': ['8rem',   { lineHeight: '0.95' }],
      },
      letterSpacing: {
        widest:      '0.25em',
        'ultra-wide':'0.4em',
      },
      animation: {
        'fade-up':  'fadeUp 0.8s ease forwards',
        'fade-in':  'fadeIn 1s ease forwards',
        shimmer:    'shimmer 2.5s infinite',
        'line-grow':'lineGrow 1s ease forwards',
      },
      keyframes: {
        fadeUp:   { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        shimmer:  { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
        lineGrow: { '0%': { width: '0' }, '100%': { width: '100%' } },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%)',
        'hero-gradient': 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-tertiary) 50%, var(--bg-primary) 100%)',
      },
      boxShadow: {
        gold:         'var(--shadow-gold)',
        'gold-strong':'var(--shadow-gold-strong)',
        card:         'var(--shadow-card)',
      },
      borderColor: {
        'gold-subtle': 'rgba(201, 168, 76, 0.2)',
        'gold-medium': 'rgba(201, 168, 76, 0.4)',
        'white-subtle':'var(--border-subtle)',
        'white-medium':'var(--border-medium)',
      },
    },
  },
  plugins: [],
};
