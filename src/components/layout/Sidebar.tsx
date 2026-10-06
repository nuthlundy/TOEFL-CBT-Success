/**
 * Sidebar Navigation Component
 * Provides clean, comprehensive navigation across all book sections and study tools
 */

import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Headphones,
  FileCode,
  BookOpen,
  PenTool,
  CheckSquare,
  Award,
  BarChart2,
  Bookmark,
  FileText,
  Info,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  mistakesCount: number;
  bookmarksCount: number;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  mistakesCount,
  bookmarksCount,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const navSections = [
    {
      label: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'getting-started', label: 'Getting Started', icon: Compass },
      ],
    },
    {
      label: 'Curriculum & Lessons',
      items: [
        { id: 'listening', label: 'Listening Comprehension', icon: Headphones },
        { id: 'structure', label: 'Structure & Written Expression', icon: FileCode },
        { id: 'reading', label: 'Reading Comprehension', icon: BookOpen },
        { id: 'twe', label: 'Test of Written English (TWE)', icon: PenTool },
      ],
    },
    {
      label: 'Assessments',
      items: [
        { id: 'mini-tests', label: 'Mini-Tests (1–8)', icon: CheckSquare },
        { id: 'practice-tests', label: 'Full Practice Tests', icon: Award },
      ],
    },
    {
      label: 'Performance & Review',
      items: [
        { id: 'progress', label: 'Progress & Mastery', icon: BarChart2 },
        {
          id: 'mistakes',
          label: 'Review My Mistakes',
          icon: RotateCcw,
          badge: mistakesCount > 0 ? String(mistakesCount) : undefined,
        },
        {
          id: 'bookmarks',
          label: 'Bookmarks',
          icon: Bookmark,
          badge: bookmarksCount > 0 ? String(bookmarksCount) : undefined,
        },
        { id: 'notes', label: 'My Notes', icon: FileText },
      ],
    },
    {
      label: 'System & Reference',
      items: [
        { id: 'audit', label: 'Content Coverage & Audit', icon: ShieldCheck },
        { id: 'about', label: 'About Peterson’s CBT', icon: Info },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 select-none transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 flex-1 overflow-y-auto space-y-6">
          {navSections.map((group) => (
            <div key={group.label}>
              <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                {group.label}
              </div>
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        onCloseMobile?.();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-white' : 'text-slate-400'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[11px] font-mono px-1.5 py-0.2 rounded ${
                            isActive
                              ? 'bg-blue-800 text-blue-100'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Book Citation Footer */}
        <div className="p-3.5 border-t border-slate-800/80 bg-slate-950/40 text-[11px] text-slate-400">
          <p className="font-semibold text-slate-300">Peterson’s TOEFL CBT Success</p>
          <p className="text-slate-500">Author: Bruce Rogers · Thomson Learning</p>
        </div>
      </aside>
    </>
  );
};
