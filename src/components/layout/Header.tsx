/**
 * Top Bar Header Component
 * Strict 3-zone contract: [Brand single text] - [Nav links] - [Primary actions]
 */

import React from 'react';
import { Search, PlayCircle, ShieldCheck, Menu } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSearch: () => void;
  onResumeLast: () => void;
  hasResume: boolean;
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  onResumeLast,
  hasResume,
  onToggleMobileMenu,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand title (single text element) */}
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
            className="text-left group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm"
          >
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold text-white text-base tracking-wider shadow-inner">
              P
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors">
                TOEFL CBT SUCCESS
              </span>
              <span className="hidden sm:inline text-xs text-slate-400 ml-2 font-normal">
                Peterson’s Digital Prep
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Fast Quick Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`transition-colors hover:text-white ${
              activeTab === 'dashboard' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onSelectTab('getting-started')}
            className={`transition-colors hover:text-white ${
              activeTab === 'getting-started' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            Getting Started
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
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700 rounded-lg transition-colors"
            title="Search curriculum & questions (Cmd+K / Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search Guide</span>
            <kbd className="hidden md:inline text-[10px] bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded text-slate-400">
              ⌘K
            </kbd>
          </button>

          {hasResume && (
            <button
              onClick={onResumeLast}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              <PlayCircle className="w-4 h-4" />
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
