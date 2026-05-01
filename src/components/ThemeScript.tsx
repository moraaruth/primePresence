'use client';
import { useEffect } from 'react';

export default function ThemeScript() {
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pp-theme') as 'dark' | 'light' | null;
      const system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      const theme = stored ?? system;
      document.documentElement.setAttribute('data-theme', theme);
    } catch {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add('theme-ready');
      });
    });
  }, []);

  return null;
}
