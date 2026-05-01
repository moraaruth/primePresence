import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Trash2 } from 'lucide-react';
import type { Section } from '@/lib/types';

interface SectionListProps {
  sections: Section[];
  selectedId?: string;
  onSelect: (section: Section) => void;
  onReorder: (id: string, direction: 'up' | 'down') => void;
  onDelete: (id: string) => void;
}

export default function SectionList({
  sections,
  selectedId,
  onSelect,
  onReorder,
  onDelete,
}: SectionListProps) {
  return (
    <div className="space-y-2">
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={`p-3 rounded border transition-all cursor-pointer group ${
            selectedId === section.id
              ? 'border-gold bg-gold/10'
              : 'border-white-subtle hover:border-gold/30'
          }`}
          onClick={() => onSelect(section)}>
          
          <div className="flex items-center justify-between mb-1">
            <div className="flex-1 min-w-0">
              <p className="text-platinum text-sm font-medium capitalize truncate">
                {section.type}
              </p>
              <p className="text-platinum-muted text-xs">
                Section {index + 1}
              </p>
            </div>

            <div className="flex gap-1 ml-2">
              {index > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onReorder(section.id, 'up');
                  }}
                  className="p-1 rounded hover:bg-white-subtle text-platinum-muted hover:text-platinum transition-colors opacity-0 group-hover:opacity-100">
                  <ChevronUp size={14} />
                </button>
              )}

              {index < sections.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onReorder(section.id, 'down');
                  }}
                  className="p-1 rounded hover:bg-white-subtle text-platinum-muted hover:text-platinum transition-colors opacity-0 group-hover:opacity-100">
                  <ChevronDown size={14} />
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(section.id);
                }}
                className="p-1 rounded hover:bg-red-500/10 text-platinum-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
