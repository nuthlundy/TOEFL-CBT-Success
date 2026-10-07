/**
 * Global Multi-Book Search Modal
 * Searches across all 3 source books (Peterson, Cliffs Prep Guide, Cliffs CBT)
 * Includes Book and Content Type filter controls.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Headphones, FileCode, PenTool, CheckSquare, Award, ArrowRight, Layers } from 'lucide-react';
import { BookId } from '../../types/toefl';
import { bookContentService } from '../../services/bookContentService';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (targetTab: string, targetId?: string, bookId?: BookId) => void;
  activeBookId: BookId;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
  activeBookId,
}) => {
  const [query, setQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<BookId | 'ALL'>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = bookContentService.searchContent(query, selectedBook, selectedType);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson':
      case 'topic':
        return BookOpen;
      case 'test':
        return Award;
      case 'writing':
        return PenTool;
      default:
        return FileCode;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 overflow-y-auto bg-slate-950/70 backdrop-blur-xs">
      <div
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all lessons, grammar rules, mini-tests, passages, vocabulary, or writing topics..."
            className="w-full text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-3 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Book Filter */}
          <div className="flex items-center gap-1 overflow-x-auto">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
              Book:
            </span>
            <button
              onClick={() => setSelectedBook('ALL')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedBook === 'ALL'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/80'
              }`}
            >
              All Books
            </button>
            <button
              onClick={() => setSelectedBook('PETERSONS-CBT-SUCCESS')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedBook === 'PETERSONS-CBT-SUCCESS'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/80'
              }`}
            >
              Peterson's CBT
            </button>
            <button
              onClick={() => setSelectedBook('CLIFFS-TOEFL-PREPARATION-GUIDE')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedBook === 'CLIFFS-TOEFL-PREPARATION-GUIDE'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/80'
              }`}
            >
              Cliffs Prep
            </button>
            <button
              onClick={() => setSelectedBook('CLIFFS-TOEFL-CBT')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedBook === 'CLIFFS-TOEFL-CBT'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/80'
              }`}
            >
              Cliffs CBT
            </button>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedType('ALL')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                selectedType === 'ALL' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setSelectedType('lessons')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                selectedType === 'lessons' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lessons/Topics
            </button>
            <button
              onClick={() => setSelectedType('tests')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                selectedType === 'tests' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tests
            </button>
            <button
              onClick={() => setSelectedType('writing')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                selectedType === 'writing' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Writing
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-slate-100">
          {query.trim().length < 2 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              Type at least 2 characters to search across all curriculum lessons, tests, and writing models.
            </div>
          ) : results.length > 0 ? (
            results.map((res) => {
              const Icon = getTypeIcon(res.contentType);
              return (
                <div
                  key={`${res.bookId}_${res.id}`}
                  onClick={() => {
                    onSelectResult(res.targetTab, res.targetId, res.bookId);
                    onClose();
                  }}
                  className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-700 mt-0.5 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {res.title}
                        </span>
                        <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded text-[10px] font-mono shrink-0">
                          {res.bookTitle}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {res.snippet}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {res.sourcePage && (
                      <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                        p. {res.sourcePage}
                      </span>
                    )}
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              No results found for "{query}". Try searching for terms like "subjunctive", "conditionals", "dialogs", or "passage".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Search spans 3 preparation guides: Peterson's CBT, Cliffs Prep, Cliffs CBT</span>
          <span>Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
