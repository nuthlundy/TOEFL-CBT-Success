/**
 * Bookmarks Management View
 * Multi-Book aware with source book filtering
 */

import React, { useState } from 'react';
import { Bookmark as BookmarkIcon, Trash2, ArrowRight } from 'lucide-react';
import { Bookmark, BookId } from '../../types/toefl';

interface BookmarksViewProps {
  bookmarks: Bookmark[];
  onRemoveBookmark: (targetId: string, title: string) => void;
  onNavigateToTarget: (bookmark: Bookmark) => void;
  activeBookId?: BookId;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  bookmarks,
  onRemoveBookmark,
  onNavigateToTarget,
  activeBookId = 'PETERSONS-CBT-SUCCESS',
}) => {
  const [filterMode, setFilterMode] = useState<'CURRENT' | 'ALL'>('CURRENT');

  const filteredBookmarks = bookmarks.filter((b) => {
    if (filterMode === 'CURRENT') {
      return (b.sourceBookId || 'PETERSONS-CBT-SUCCESS') === activeBookId;
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookmarkIcon className="w-5 h-5 text-amber-500" />
            <span>Saved Bookmarks ({filteredBookmarks.length})</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Access your saved lessons, difficult questions, and reference sections.
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setFilterMode('CURRENT')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filterMode === 'CURRENT'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Current Book
          </button>
          <button
            onClick={() => setFilterMode('ALL')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filterMode === 'ALL'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Books ({bookmarks.length})
          </button>
        </div>
      </div>

      {filteredBookmarks.length > 0 ? (
        <div className="space-y-3">
          {filteredBookmarks.map((b) => (
            <div
              key={b.id}
              className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex items-center justify-between hover:border-blue-300 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">
                    {b.type} · {b.section}
                  </span>
                  {b.sourceBookId && (
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">
                      {b.sourceBookId === 'PETERSONS-CBT-SUCCESS'
                        ? "Peterson's CBT"
                        : b.sourceBookId === 'CLIFFS-TOEFL-PREPARATION-GUIDE'
                        ? 'Cliffs Prep'
                        : 'Cliffs CBT'}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mt-0.5">{b.title}</h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  Saved {new Date(b.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigateToTarget(b)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onRemoveBookmark(b.targetId, b.title)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                  title="Remove Bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center space-y-3 shadow-xs">
          <BookmarkIcon className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="text-base font-bold text-slate-900">No Bookmarks Found</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {filterMode === 'CURRENT'
              ? 'No bookmarks saved for the current active book. Click the bookmark icon on any lesson to save it.'
              : 'Click the bookmark icon on any lesson or question to save it for quick review here.'}
          </p>
        </div>
      )}
    </div>
  );
};
