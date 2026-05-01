import { ChevronDown } from 'lucide-react';
import type { Page } from '@/lib/types';

interface PageNavProps {
  pages: Page[];
  currentPage: Page | null;
  onPageSelect: (page: Page) => void;
}

export default function PageNav({ pages, currentPage, onPageSelect }: PageNavProps) {
  return (
    <div>
      <h3 className="font-display text-sm text-platinum mb-4">Pages</h3>
      <div className="space-y-1">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => onPageSelect(page)}
            className={`w-full px-3 py-2 rounded text-left transition-all ${
              currentPage?.id === page.id
                ? 'bg-gold/20 text-gold border border-gold/40'
                : 'text-platinum hover:text-gold border border-transparent hover:border-gold/20'
            }`}>
            <p className="text-sm font-medium capitalize truncate">{page.title}</p>
            <p className="text-xs opacity-70">/{page.slug}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
