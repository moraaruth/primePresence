import { useState } from 'react';
import { Loader } from 'lucide-react';
import type { Section } from '@/lib/types';

interface SectionEditorProps {
  section: Section;
  onSave: (sectionId: string, content: any) => Promise<void>;
  saving?: boolean;
}

export default function SectionEditor({ section, onSave, saving }: SectionEditorProps) {
  const [content, setContent] = useState(section.content);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (field: string, value: any) => {
    setContent((prev: any) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    await onSave(section.id, content);
    setHasChanges(false);
  };

  // Different editors based on section type
  const renderEditor = () => {
    const heroContent = content as any;

    switch (section.type) {
      case 'hero':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-platinum text-sm font-medium mb-2">Headline</label>
              <input
                type="text"
                value={heroContent.headline || ''}
                onChange={(e) => handleChange('headline', e.target.value)}
                className="w-full px-4 py-2 bg-white-subtle border border-white-subtle text-platinum placeholder-platinum-muted rounded focus:outline-none focus:border-gold"
                placeholder="Enter headline..."
              />
            </div>

            <div>
              <label className="block text-platinum text-sm font-medium mb-2">Subheadline</label>
              <textarea
                value={heroContent.subheadline || ''}
                onChange={(e) => handleChange('subheadline', e.target.value)}
                className="w-full px-4 py-2 bg-white-subtle border border-white-subtle text-platinum placeholder-platinum-muted rounded focus:outline-none focus:border-gold resize-none"
                rows={3}
                placeholder="Enter subheadline..."
              />
            </div>

            <div>
              <label className="block text-platinum text-sm font-medium mb-2">CTA Button Text</label>
              <input
                type="text"
                value={heroContent.cta || ''}
                onChange={(e) => handleChange('cta', e.target.value)}
                className="w-full px-4 py-2 bg-white-subtle border border-white-subtle text-platinum placeholder-platinum-muted rounded focus:outline-none focus:border-gold"
                placeholder="e.g., Get Started"
              />
            </div>

            <div>
              <label className="block text-platinum text-sm font-medium mb-2">Background Image Description</label>
              <input
                type="text"
                value={heroContent.backgroundImage || ''}
                onChange={(e) => handleChange('backgroundImage', e.target.value)}
                className="w-full px-4 py-2 bg-white-subtle border border-white-subtle text-platinum placeholder-platinum-muted rounded focus:outline-none focus:border-gold"
                placeholder="Describe the background image..."
              />
              <p className="text-platinum-muted text-xs mt-2">Use this description for AI image generation</p>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-platinum text-sm font-medium mb-2">Section Title</label>
              <input
                type="text"
                value={heroContent.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-2 bg-white-subtle border border-white-subtle text-platinum placeholder-platinum-muted rounded focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-platinum text-sm font-medium mb-4">Features</label>
              <div className="space-y-3">
                {(heroContent.features || []).map((feature: any, idx: number) => (
                  <div key={idx} className="p-3 bg-white-subtle rounded">
                    <input
                      type="text"
                      value={feature.title || ''}
                      onChange={(e) => {
                        const newFeatures = [...(heroContent.features || [])];
                        newFeatures[idx].title = e.target.value;
                        handleChange('features', newFeatures);
                      }}
                      className="w-full px-3 py-1 bg-black/20 border border-white-subtle text-platinum rounded focus:outline-none focus:border-gold mb-2 text-sm"
                      placeholder="Feature title"
                    />
                    <textarea
                      value={feature.description || ''}
                      onChange={(e) => {
                        const newFeatures = [...(heroContent.features || [])];
                        newFeatures[idx].description = e.target.value;
                        handleChange('features', newFeatures);
                      }}
                      className="w-full px-3 py-1 bg-black/20 border border-white-subtle text-platinum rounded focus:outline-none focus:border-gold text-sm resize-none"
                      rows={2}
                      placeholder="Feature description"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'about':
      case 'contact':
      case 'footer':
      default:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-platinum text-sm font-medium mb-2">Content</label>
              <textarea
                value={JSON.stringify(content, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setContent(parsed);
                    setHasChanges(true);
                  } catch {
                    // Invalid JSON, don't update
                  }
                }}
                className="w-full px-4 py-2 bg-white-subtle border border-white-subtle text-platinum placeholder-platinum-muted rounded focus:outline-none focus:border-gold resize-none font-mono text-xs"
                rows={12}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="font-display text-2xl text-platinum mb-2">
          Edit {section.type}
        </h2>
        <p className="text-platinum-muted text-sm">Section {section.order + 1}</p>
      </div>

      <div className="bg-white-subtle/20 border border-white-subtle rounded-lg p-6 mb-6">
        {renderEditor()}
      </div>

      {hasChanges && (
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-gold hover:bg-gold-light text-black font-medium rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2">
          {saving && <Loader className="animate-spin" size={16} />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      )}
    </div>
  );
}
