'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { sites as sitesApi, pages as pagesApi, sections as sectionsApi } from '@/lib/api';
import Link from 'next/link';
import {
  Menu, X, Eye, Monitor, Smartphone, Loader,
  Plus, Trash2, AlertCircle, ChevronUp, ChevronDown,
} from 'lucide-react';
import type { Site, Page, Section } from '@/lib/types';
import SectionEditor from '@/components/builder/SectionEditor';
import PageNav from '@/components/builder/PageNav';
import SectionList from '@/components/builder/SectionList';
import LivePreview from '@/components/builder/LivePreview';

export default function BuilderPage() {
  const router = useRouter();
  const params = useParams();
  const siteId = params.siteId as string;

  const [site, setSite] = useState<Site | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Guard: never proceed with undefined siteId
  useEffect(() => {
    if (!siteId || siteId === 'undefined') {
      console.error('[Builder] Invalid siteId in URL:', siteId);
      setError('Invalid site ID. Please go back to your dashboard.');
      setLoading(false);
      return;
    }
    loadBuilder();
  }, [siteId]);

  async function loadBuilder() {
    try {
      const { data: siteData, error: siteErr } = await sitesApi.get(siteId);
      if (siteErr || !siteData?.site) throw new Error(siteErr || 'Site not found');
      setSite(siteData.site);

      const { data: pagesData, error: pagesErr } = await pagesApi.list(siteId);
      if (pagesErr) throw new Error(pagesErr);
      const pageList: Page[] = pagesData?.pages || [];
      setPages(pageList);
      if (pageList.length > 0) setCurrentPage(pageList[0]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (currentPage) loadSections();
  }, [currentPage?.id]);

  async function loadSections() {
    if (!currentPage) return;
    try {
      const { data, error: err } = await sectionsApi.list(siteId, currentPage.id);
      if (err) throw new Error(err);
      setSections(data?.sections || []);
      setSelectedSection(null);
    } catch (err: any) {
      setError(err.message);
    }
  }

  const handleSaveSection = useCallback(async (sectionId: string, content: any) => {
    try {
      setSaving(true);
      const { error: err } = await sectionsApi.update(sectionId, content);
      if (err) throw new Error(err);
      setSections(prev => prev.map(s => s.id === sectionId ? { ...s, content } : s));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }, []);

  const handleDeleteSection = useCallback(async (sectionId: string) => {
    if (!confirm('Delete this section?')) return;
    try {
      setSaving(true);
      const { error: err } = await sectionsApi.delete(sectionId);
      if (err) throw new Error(err);
      setSections(prev => prev.filter(s => s.id !== sectionId));
      setSelectedSection(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }, []);

  const handleReorderSection = useCallback(async (sectionId: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(s => s.id === sectionId);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === sections.length - 1)) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...sections];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];

    const updates = reordered.map((s, i) => ({ id: s.id, order: i }));
    setSections(reordered);
    await sectionsApi.reorder(updates);
  }, [sections]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  if (error && !site) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 text-red-400" size={32} />
          <p className="text-platinum mb-4">{error}</p>
          <Link href="/dashboard" className="text-gold hover:text-gold-light transition-colors">
            ← Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="border-b border-white-subtle flex-shrink-0" style={{ background: 'var(--bg-secondary)' }}>
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white-subtle rounded text-platinum lg:hidden"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link href="/dashboard" className="flex flex-col leading-none">
              <span className="font-display text-sm font-light tracking-widest text-platinum">PRIME</span>
              <span className="font-display text-sm font-light tracking-widest gold-text">PRESENCE</span>
            </Link>
            <div className="hidden md:block">
              <h1 className="font-display text-lg text-platinum">{site?.name}</h1>
              <p className="text-platinum-muted text-xs">{site?.subdomain}.primepresence.site</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saving && <span className="text-platinum-muted text-xs flex items-center gap-1"><Loader size={12} className="animate-spin" /> Saving...</span>}
            <Link
              href={`/preview/${siteId}`}
              target="_blank"
              className="px-4 py-2 border border-white-subtle hover:border-gold/40 text-platinum rounded text-sm transition-colors flex items-center gap-2"
            >
              <Eye size={14} /> Preview
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 border border-white-subtle hover:border-gold/40 text-platinum rounded text-sm transition-colors"
            >
              ← Back
            </Link>
            <button
              onClick={() => router.push(`/builder/${siteId}/publish`)}
              className="px-4 py-2 bg-gold hover:bg-gold-light text-black rounded text-sm font-medium transition-colors"
            >
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="px-6 py-3 bg-red-500/10 border-b border-red-500/30 text-red-400 text-sm flex items-center gap-2 flex-shrink-0">
          <AlertCircle size={16} /> {error}
          <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-300"><X size={14} /></button>
        </div>
      )}

      {/* Main layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 border-r border-white-subtle overflow-y-auto flex-shrink-0 ${sidebarOpen ? 'w-64' : 'w-0'}`}
          style={{ background: 'var(--bg-secondary)' }}
        >
          <div className="p-4">
            <PageNav pages={pages} currentPage={currentPage} onPageSelect={setCurrentPage} />

            {currentPage && (
              <>
                <div className="mt-6 mb-4">
                  <h3 className="font-display text-sm text-platinum mb-4">Sections</h3>
                  <SectionList
                    sections={sections}
                    selectedId={selectedSection?.id}
                    onSelect={setSelectedSection}
                    onReorder={handleReorderSection}
                    onDelete={handleDeleteSection}
                  />
                </div>
                <button
                  onClick={() => {/* TODO: add section modal */}}
                  className="w-full px-4 py-2 border border-gold/50 text-gold text-sm font-medium rounded hover:bg-gold/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Add Section
                </button>
              </>
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedSection && currentPage ? (
            <div className="flex-1 overflow-y-auto p-6">
              <SectionEditor section={selectedSection} onSave={handleSaveSection} saving={saving} />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-platinum-muted mb-2">Select a section from the sidebar to edit</p>
                <p className="text-platinum-dark text-sm">or add a new section</p>
              </div>
            </div>
          )}
        </div>

        {/* Live Preview panel */}
        <div className="hidden xl:flex flex-col w-96 border-l border-white-subtle overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
          <div className="p-4 border-b border-white-subtle flex items-center justify-between flex-shrink-0">
            <h3 className="font-display text-sm text-platinum">Live Preview</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`p-2 rounded transition-colors ${previewMode === 'desktop' ? 'bg-gold/20 text-gold' : 'text-platinum-muted hover:text-platinum'}`}
              >
                <Monitor size={18} />
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`p-2 rounded transition-colors ${previewMode === 'mobile' ? 'bg-gold/20 text-gold' : 'text-platinum-muted hover:text-platinum'}`}
              >
                <Smartphone size={18} />
              </button>
            </div>
          </div>
          {currentPage && sections.length > 0 ? (
            <div className="flex-1 overflow-y-auto p-4">
              <LivePreview page={currentPage} sections={sections} mode={previewMode} />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-platinum-muted text-sm">
              No sections yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
