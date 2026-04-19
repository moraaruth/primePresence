import type { Metadata } from 'next';
import '../styles/tailwind.css';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-obsidian text-platinum antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
