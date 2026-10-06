/**
 * Global Search Modal
 * Searches across all lessons, concepts, grammar topics, vocabulary items, and TWE prompts.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Headphones, FileCode, PenTool, ArrowRight } from 'lucide-react';
import { ALL_LESSONS } from '../../data/lessonsData';
import {
  SECTION1_MINI_LESSONS,
  SECTION2_MINI_LESSONS,
  SECTION3_MINI_LESSONS,
} from '../../data/miniLessonsData';
import { TWE_PRACTICE_TOPICS } from '../../data/tweData';

interface SearchResult {
  id: string;
  type: 'lesson' | 'vocabulary' | 'grammar' | 'twe';
  title: string;
  subtitle: string;
  targetTab: string;
  targetId?: string;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (targetTab: string, targetId?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Search logic
  const q = query.trim().toLowerCase();
  const results: SearchResult[] = [];

  if (q.length >= 2) {
    // 1. Search core lessons
    for (const l of ALL_LESSONS) {
      if (
        l.title.toLowerCase().includes(q) ||
        l.objective.toLowerCase().includes(q) ||
        l.summary.toLowerCase().includes(q) ||
        l.part.toLowerCase().includes(q)
      ) {
        results.push({
          id: l.id,
          type: 'lesson',
          title: `Lesson ${l.lessonNumber}: ${l.title}`,
          subtitle: `${l.part} · Book pp. ${l.sourcePages.join('-')}`,
          targetTab: l.section,
          targetId: l.id,
        });
      }
    }

    // 2. Search vocabulary mini-lessons
    for (const ml of SECTION3_MINI_LESSONS) {
      if (ml.terms) {
        for (const t of ml.terms) {
          if (t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)) {
            results.push({
              id: `${ml.id}_${t.term}`,
              type: 'vocabulary',
              title: `${t.term} ${t.pos || ''}`,
              subtitle: `Definition: ${t.definition} (Mini-Lesson ${ml.number})`,
              targetTab: 'reading',
              targetId: ml.id,
            });
          }
        }
      }
    }

    // 3. Search idioms mini-lessons
    for (const ml of SECTION1_MINI_LESSONS) {
      if (ml.terms) {
        for (const t of ml.terms) {
          if (t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)) {
            results.push({
              id: `${ml.id}_${t.term}`,
              type: 'grammar',
              title: `Idiom: "${t.term}"`,
              subtitle: `Meaning: ${t.definition} (Mini-Lesson ${ml.number})`,
              targetTab: 'listening',
              targetId: ml.id,
            });
          }
        }
      }
    }

    // 4. Search TWE topics
    for (const t of TWE_PRACTICE_TOPICS) {
      if (t.title.toLowerCase().includes(q) || t.prompt.toLowerCase().includes(q)) {
        results.push({
          id: t.id,
          type: 'twe',
          title: `TWE Topic ${t.topicNumber}: ${t.title}`,
          subtitle: `Book p. ${t.sourcePage}`,
          targetTab: 'twe',
          targetId: t.id,
        });
      }
    }
  }

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'lesson':
        return BookOpen;
      case 'vocabulary':
        return BookOpen;
      case 'grammar':
        return FileCode;
      case 'twe':
        return PenTool;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Box */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, grammar rules, vocabulary, idioms, TWE topics..."
            className="w-full text-sm focus:outline-none placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 flex-1 divide-y divide-slate-100">
          {q.length >= 2 ? (
            results.length > 0 ? (
              results.map((res) => {
                const Icon = getIcon(res.type);
                return (
                  <div
                    key={res.id}
                    onClick={() => {
                      onSelectResult(res.targetTab, res.targetId);
                      onClose();
                    }}
                    className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {res.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1">{res.subtitle}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors shrink-0" />
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center text-xs text-slate-500">
                No matching lessons or terms found for "{query}".
              </div>
            )
          ) : (
            <div className="py-10 text-center text-xs text-slate-400 space-y-1">
              <p>Type at least 2 characters to search.</p>
              <p className="text-[11px] text-slate-400">
                Try searching: "appositives", "antler", "idiom", "adverb clause", "inversion"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
