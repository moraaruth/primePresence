import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';
import { getPost, getAllSlugs, posts } from '../data';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Prime Presence Blog`,
    description: post.excerpt,
  };
}

function renderContent(content: string) {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={key++} className="h-4" />);
    } else if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="font-display text-3xl lg:text-4xl font-light text-platinum mt-12 mb-6">
          {trimmed.replace('## ', '')}
        </h2>
      );
    } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      elements.push(
        <p key={key++} className="text-platinum font-semibold text-base mb-3">
          {trimmed.replace(/\*\*/g, '')}
        </p>
      );
    } else if (trimmed.startsWith('- ')) {
      elements.push(
        <li key={key++} className="text-platinum-muted text-base leading-relaxed ml-4 mb-2 list-disc">
          {trimmed.replace('- ', '')}
        </li>
      );
    } else {
      // Handle inline bold within paragraphs
      const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
      elements.push(
        <p key={key++} className="text-platinum-muted text-base leading-relaxed mb-4">
          {parts.map((part, i) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={i} className="text-platinum font-semibold">{part.replace(/\*\*/g, '')}</strong>
              : part
          )}
        </p>
      );
    }
  }
  return elements;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[55vh] flex items-end pb-16 overflow-hidden bg-obsidian pt-32">
          <div className="absolute inset-0">
            <Image
              src={post.img}
              alt={post.title}
              fill
              sizes="100vw"
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/30" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 w-full">
            <Link href="/blog" className="inline-flex items-center gap-2 text-platinum-dark text-xs tracking-widest uppercase hover:text-gold transition-colors mb-8">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs text-gold border border-gold/30 px-3 py-1">{post.category}</span>
            </div>
            <h1 className="font-display text-4xl lg:text-6xl font-light text-platinum leading-tight mb-8">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-platinum-dark text-xs">
              <span className="flex items-center gap-2"><User size={13} className="text-gold" /> {post.author}</span>
              <span className="flex items-center gap-2"><Calendar size={13} className="text-gold" /> {post.date}</span>
              <span className="flex items-center gap-2"><Clock size={13} className="text-gold" /> {post.readTime}</span>
            </div>
          </div>
        </section>

        {/* Article */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Author bar */}
            <div className="flex items-center gap-4 border border-white-subtle p-6 mb-12">
              <div className="w-12 h-12 bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center shrink-0">
                <span className="font-display text-xl font-light gold-text">RM</span>
              </div>
              <div>
                <p className="text-platinum text-sm font-medium">{post.author}</p>
                <p className="text-platinum-dark text-xs">{post.authorRole}</p>
              </div>
            </div>

            {/* Content */}
            <div className="prose-luxury">
              {renderContent(post.content)}
            </div>

            {/* Divider */}
            <div className="border-t border-white-subtle mt-16 pt-12">
              <div className="bg-charcoal border border-gold/20 p-8 text-center">
                <p className="section-label mb-3">Ready to Take Action?</p>
                <h3 className="font-display text-3xl font-light text-platinum mb-4">
                  Let's Build Your <span className="gold-text italic">Digital Presence</span>
                </h3>
                <p className="text-platinum-muted text-sm mb-6 max-w-md mx-auto">
                  Talk to our team about transforming your business's digital presence.
                </p>
                <Link href="/contact" className="btn-gold">
                  Start Your Project
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-16 px-6 lg:px-12 bg-charcoal border-t border-white-subtle">
          <div className="max-w-7xl mx-auto">
            <p className="section-label mb-4">Keep Reading</p>
            <h2 className="font-display text-4xl font-light text-platinum mb-10">
              More <span className="gold-text italic">Insights</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="luxury-card group overflow-hidden flex flex-col">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs text-gold border border-gold/30 bg-obsidian/80 backdrop-blur-sm px-3 py-1">
                        {p.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-lg font-light text-platinum leading-tight mb-3 group-hover:text-gold transition-colors duration-300 flex-1">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-4 text-platinum-dark text-xs border-t border-white-subtle pt-4 mt-auto">
                      <span className="flex items-center gap-1"><User size={11} /> {p.author}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {p.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
