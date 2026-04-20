import type { Metadata } from 'next';
import '../styles/tailwind.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Prime Presence | Premium Digital Presence for Ambitious Businesses',
  description:
    'Prime Presence builds world-class websites and digital platforms for ambitious businesses across Africa and globally. Luxury design, SEO, AI lead generation, and full brand identity — done for you.',
  keywords: 'luxury website design Kenya, premium website agency Nairobi, digital presence Africa, website design for businesses Kenya, SEO Kenya',
  openGraph: {
    title: 'Prime Presence — Premium Digital Presence, Done For You',
    description: 'We design, build, and launch your complete digital presence. Live in 7–14 days.',
    type: 'website',
    url: 'https://primepresence.co',
  },
};

// Inline script — runs before paint to prevent flash of wrong theme
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('pp-theme');
    var system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    var theme = stored || system;
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  // Add transition class after initial paint to prevent flash
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      document.documentElement.classList.add('theme-ready');
    });
  });
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Anti-flash: set theme before first paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className="antialiased overflow-x-hidden"
        style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
