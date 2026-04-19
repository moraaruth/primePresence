import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, User } from 'lucide-react';
import { posts } from './data';

const featured = posts[0];
const restPosts = posts.slice(1);
const categories = ['All', 'Strategy', 'Design', 'SEO', 'Social Media', 'AI & Tech', 'Growth'];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-obsidian pt-40 pb-20 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <p className="section-label mb-6">Insights</p>
            <h1 className="font-display text-6xl lg:text-8xl font-light text-platinum leading-none">
              The Intelligence
              <br />
              <span className="gold-text italic">Behind the Elite.</span>
            </h1>
          </div>
        </section>

        {/* Featured Post */}
        <SectionWrapper className="py-12 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <Link href={`/blog/${featured.slug}`} className="group grid lg:grid-cols-2 gap-0 border border-white-subtle hover:border-gold/40 transition-all duration-300">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <Image
                  src={featured.img}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-10 lg:p-14 flex flex-col justify-center bg-charcoal">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs text-gold border border-gold/30 px-3 py-1">{featured.category}</span>
                  <span className="text-platinum-dark text-xs">Featured</span>
                </div>
                <h2 className="font-display text-3xl lg:text-4xl font-light text-platinum leading-tight mb-6 group-hover:text-gold transition-colors duration-300">
                  {featured.title}
                </h2>
                <p className="text-platinum-muted text-sm leading-relaxed mb-8">{featured.excerpt}</p>
                <div className="flex items-center gap-6 text-platinum-dark text-xs">
                  <span className="flex items-center gap-1"><User size={12} /> {featured.author}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {featured.readTime}</span>
                  <span>{featured.date}</span>
                </div>
              </div>
            </Link>
          </div>
        </SectionWrapper>

        {/* Category Filter */}
        <SectionWrapper className="px-6 lg:px-12 pb-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-300 ${
                    cat === 'All'
                      ? 'border-gold bg-gold text-obsidian'
                      : 'border-white-subtle text-platinum-muted hover:border-gold hover:text-gold'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Posts Grid */}
        <SectionWrapper className="py-12 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {restPosts.map(({ title, excerpt, category, readTime, author, date, img, slug }) => (
                <Link key={slug} href={`/blog/${slug}`} className="luxury-card group overflow-hidden flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={img}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs text-gold border border-gold/30 bg-obsidian/80 backdrop-blur-sm px-3 py-1">
                        {category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="font-display text-xl font-light text-platinum leading-tight mb-4 group-hover:text-gold transition-colors duration-300 flex-1">
                      {title}
                    </h3>
                    <p className="text-platinum-muted text-xs leading-relaxed mb-6">{excerpt}</p>
                    <div className="flex items-center justify-between text-platinum-dark text-xs border-t border-white-subtle pt-4">
                      <span className="flex items-center gap-1"><User size={11} /> {author}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Newsletter */}
        <SectionWrapper className="py-24 px-6 lg:px-12 bg-charcoal border-t border-white-subtle">
          <div className="max-w-2xl mx-auto text-center">
            <p className="section-label mb-4">Stay Sharp</p>
            <h2 className="font-display text-4xl font-light text-platinum mb-4">
              The <span className="gold-text italic">Intelligence Brief</span>
            </h2>
            <p className="text-platinum-muted text-sm mb-8">
              Weekly insights on digital strategy, branding, and growth for ambitious businesses.
              No fluff. Just actionable intelligence.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="input-luxury flex-1"
              />
              <button type="submit" className="btn-gold whitespace-nowrap">
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
