'use client';

import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="relative w-9 h-9 flex items-center justify-center border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
      style={{
        borderColor: 'var(--border-subtle)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-muted)',
      }}
    >
      <span
        className="absolute inset-0 flex items-center justify-center transition-all duration-300"
        style={{ opacity: theme === 'dark' ? 1 : 0, transform: theme === 'dark' ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(90deg)' }}
      >
        <Moon size={14} />
      </span>
      <span
        className="absolute inset-0 flex items-center justify-center transition-all duration-300"
        style={{ opacity: theme === 'light' ? 1 : 0, transform: theme === 'light' ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-90deg)', color: '#C9A84C' }}
      >
        <Sun size={14} />
      </span>
    </button>
  );
}
