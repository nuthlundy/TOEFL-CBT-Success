/**
 * Top Bar Header Component
 * Multi-Book aware with Book Switcher and Quick Navigation
 */

import React from 'react';
import { Search, PlayCircle, ShieldCheck, Menu, BookOpen, ChevronDown } from 'lucide-react';
import { BookId, BookMetadata } from '../../types/toefl';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSearch: () => void;
  onResumeLast: () => void;
  hasResume: boolean;
  onToggleMobileMenu?: () => void;
  activeBookId: BookId;
  books: BookMetadata[];
  onSelectBook: (bookId: BookId) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  onResumeLast,
  hasResume,
  onToggleMobileMenu,
  activeBookId,
  books,
  onSelectBook,
}) => {
  const currentBook = books.find((b) => b.id === activeBookId) || books[0];

  return (
    <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Zone 1: Brand title & Book Selector */}
        <div className="flex items-center gap-3">
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => onSelectTab('dashboard')}
            className="text-left group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm tracking-wider shadow-inner shrink-0">
              T
            </div>
            <div className="hidden sm:block">
              <span className="text-base font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors">
                TOEFL SUCCESS
              </span>
              <span className="block text-[10px] text-slate-400 font-normal leading-tight">
                Multi-Source Learning Suite
              </span>
            </div>
          </button>

          {/* Quick Book Selector Dropdown */}
          <div className="relative flex items-center ml-1 sm:ml-2">
            <select
              value={activeBookId}
              onChange={(e) => onSelectBook(e.target.value as BookId)}
              aria-label="Select Active Source Book"
              className="appearance-none bg-slate-800 text-xs font-semibold text-blue-300 hover:text-white py-1.5 pl-3 pr-8 rounded-lg border border-slate-700 hover:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer max-w-[150px] sm:max-w-[210px] md:max-w-[260px] truncate"
            >
              {books.map((b) => (
                <option key={b.id} value={b.id} className="bg-slate-900 text-white">
                  {b.shortTitle} ({b.format})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Zone 2: Fast Quick Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-slate-300">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`transition-colors hover:text-white ${
              activeTab === 'dashboard' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onSelectTab('books')}
            className={`transition-colors hover:text-white flex items-center gap-1.5 ${
              activeTab === 'books' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Book Library</span>
          </button>
          <button
            onClick={() => onSelectTab('mini-tests')}
            className={`transition-colors hover:text-white ${
              activeTab === 'mini-tests' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            Mini-Tests
          </button>
          <button
            onClick={() => onSelectTab('practice-tests')}
            className={`transition-colors hover:text-white ${
              activeTab === 'practice-tests' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            Practice Tests
          </button>
          <button
            onClick={() => onSelectTab('progress')}
            className={`transition-colors hover:text-white ${
              activeTab === 'progress' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            Progress
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700 rounded-lg transition-colors"
            title="Search curriculum & questions (Cmd+K / Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline text-[10px] bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded text-slate-400">
              ⌘K
            </kbd>
          </button>

          {hasResume && (
            <button
              onClick={onResumeLast}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          )}

          <button
            onClick={() => onSelectTab('audit')}
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg border transition-colors ${
              activeTab === 'audit'
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Content Ingestion & Verification Audit"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px]">Audit</span>
          </button>
        </div>
      </div>
    </header>
  );
};

