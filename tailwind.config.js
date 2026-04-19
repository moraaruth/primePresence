/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0A',
        charcoal: '#111111',
        graphite: '#1A1A1A',
        'graphite-light': '#222222',
        gold: '#C9A84C',
        'gold-light': '#E2C47A',
        'gold-muted': '#8B6914',
        'gold-dark': '#A07830',
        ivory: '#F5F0E8',
        'ivory-dark': '#E8E0D0',
        platinum: '#E8E8E8',
        'platinum-muted': '#9A9A9A',
        'platinum-dark': '#666666',
        emerald: '#2D6A4F',
        'emerald-light': '#40916C',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '0.95' }],
      },
      letterSpacing: {
        widest: '0.25em',
        'ultra-wide': '0.4em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        shimmer: 'shimmer 2.5s infinite',
        'line-grow': 'lineGrow 1s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        lineGrow: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E2C47A 50%, #C9A84C 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
        'hero-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)',
        'card-gradient': 'linear-gradient(145deg, #1A1A1A 0%, #111111 100%)',
        'shimmer-gold': 'linear-gradient(90deg, #C9A84C 0%, #E2C47A 25%, #C9A84C 50%, #E2C47A 75%, #C9A84C 100%)',
      },
      boxShadow: {
        gold: '0 0 30px rgba(201, 168, 76, 0.15)',
        'gold-strong': '0 0 60px rgba(201, 168, 76, 0.25)',
        luxury: '0 25px 80px rgba(0, 0, 0, 0.6)',
        card: '0 8px 40px rgba(0, 0, 0, 0.4)',
      },
      borderColor: {
        'gold-subtle': 'rgba(201, 168, 76, 0.2)',
        'gold-medium': 'rgba(201, 168, 76, 0.4)',
        'white-subtle': 'rgba(255, 255, 255, 0.08)',
        'white-medium': 'rgba(255, 255, 255, 0.15)',
      },
    },
  },
  plugins: [],
};
