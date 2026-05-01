import type { Page, Section } from '@/lib/types';

interface LivePreviewProps {
  page: Page;
  sections: Section[];
  mode: 'desktop' | 'mobile';
}

const SectionPreview = ({ section }: { section: Section }) => {
  const content = section.content as any;

  switch (section.type) {
    case 'hero':
      return (
        <div className="py-20 px-6 bg-gradient-to-b from-gold/10 to-transparent border-b border-white-subtle">
          <h1 className="font-display text-4xl font-light text-platinum mb-4">
            {content.headline || 'Your Headline Here'}
          </h1>
          <p className="text-platinum-muted text-lg mb-8 max-w-2xl">
            {content.subheadline || 'Your subheading goes here'}
          </p>
          <button className="px-6 py-3 bg-gold text-black font-medium rounded hover:bg-gold-light transition-colors">
            {content.cta || 'Get Started'}
          </button>
        </div>
      );

    case 'features':
      return (
        <div className="py-16 px-6 border-b border-white-subtle">
          <h2 className="font-display text-3xl font-light text-platinum mb-12 text-center">
            {content.title || 'Features'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(content.features || []).map((feature: any, idx: number) => (
              <div key={idx} className="p-4 bg-white-subtle/20 rounded border border-white-subtle/30">
                <h3 className="text-platinum font-medium mb-2">{feature.title || `Feature ${idx + 1}`}</h3>
                <p className="text-platinum-muted text-sm">{feature.description || 'Feature description'}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'about':
      return (
        <div className="py-16 px-6 border-b border-white-subtle">
          <h2 className="font-display text-3xl font-light text-platinum mb-6">About</h2>
          <p className="text-platinum-muted max-w-2xl">
            {content.text || 'About section content goes here'}
          </p>
        </div>
      );

    case 'testimonials':
      return (
        <div className="py-16 px-6 bg-white-subtle/10 border-b border-white-subtle">
          <h2 className="font-display text-3xl font-light text-platinum mb-12 text-center">Testimonials</h2>
          <div className="space-y-8">
            {(content.testimonials || []).map((testimonial: any, idx: number) => (
              <div key={idx} className="max-w-2xl mx-auto">
                <p className="text-platinum mb-4 italic">{testimonial.quote || 'Testimonial quote'}</p>
                <p className="text-gold font-medium">{testimonial.author || 'Author Name'}</p>
                <p className="text-platinum-muted text-sm">{testimonial.title || 'Title'}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'cta':
      return (
        <div className="py-16 px-6 bg-gold/10 border border-gold/30 rounded text-center">
          <h2 className="font-display text-2xl font-light text-platinum mb-4">
            {content.heading || 'Ready to get started?'}
          </h2>
          <button className="px-6 py-3 bg-gold text-black font-medium rounded hover:bg-gold-light transition-colors">
            {content.ctaText || 'Get Started'}
          </button>
        </div>
      );

    case 'contact':
      return (
        <div className="py-16 px-6 border-b border-white-subtle">
          <h2 className="font-display text-3xl font-light text-platinum mb-8">Contact</h2>
          <form className="max-w-md space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 bg-white-subtle border border-white-subtle text-platinum placeholder-platinum-muted rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 bg-white-subtle border border-white-subtle text-platinum placeholder-platinum-muted rounded"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full px-4 py-2 bg-white-subtle border border-white-subtle text-platinum placeholder-platinum-muted rounded"
            />
            <button type="submit" className="w-full px-4 py-2 bg-gold text-black font-medium rounded">
              Send
            </button>
          </form>
        </div>
      );

    case 'footer':
      return (
        <div className="py-12 px-6 border-t border-white-subtle">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {['Product', 'Services', 'Company', 'Legal'].map((col) => (
              <div key={col}>
                <h3 className="text-platinum font-medium mb-4">{col}</h3>
                <ul className="space-y-2 text-platinum-muted text-sm">
                  <li><a href="#" className="hover:text-gold transition-colors">Link 1</a></li>
                  <li><a href="#" className="hover:text-gold transition-colors">Link 2</a></li>
                  <li><a href="#" className="hover:text-gold transition-colors">Link 3</a></li>
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white-subtle pt-6 text-platinum-muted text-sm text-center">
            <p>&copy; 2024 {content.company || 'Your Company'}. All rights reserved.</p>
          </div>
        </div>
      );

    default:
      return (
        <div className="py-8 px-6 border-b border-white-subtle">
          <div className="text-platinum-muted text-sm">
            <p className="mb-2">Section type: {section.type}</p>
            <pre className="text-xs bg-black/20 p-2 rounded overflow-auto">
              {JSON.stringify(content, null, 2)}
            </pre>
          </div>
        </div>
      );
  }
};

export default function LivePreview({ page, sections, mode }: LivePreviewProps) {
  const containerClass = mode === 'mobile' ? 'max-w-sm mx-auto border border-white-subtle rounded' : '';

  return (
    <div className={containerClass}>
      <div className="bg-white-subtle/5">
        {/* Page title */}
        <div className="px-6 py-4 border-b border-white-subtle">
          <p className="text-platinum-muted text-xs uppercase tracking-wide mb-1">Preview</p>
          <h2 className="font-display text-lg text-platinum">{page.title}</h2>
        </div>

        {/* Sections */}
        <div>
          {sections.length > 0 ? (
            sections.map((section) => (
              <SectionPreview key={section.id} section={section} />
            ))
          ) : (
            <div className="py-12 px-6 text-center">
              <p className="text-platinum-muted">No sections yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
