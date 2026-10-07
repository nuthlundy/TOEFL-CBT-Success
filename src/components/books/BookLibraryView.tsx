/**
 * Book Library & Multi-Source Selector Component
 * Allows students to browse, select, and switch between TOEFL preparation books.
 */

import React from 'react';
import { BookMetadata, BookId } from '../../types/toefl';
import {
  BookOpen,
  Award,
  CheckSquare,
  PenTool,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  GraduationCap,
} from 'lucide-react';

interface BookLibraryViewProps {
  books: BookMetadata[];
  activeBookId: BookId;
  onSelectBook: (bookId: BookId) => void;
  getCompletedCount: (bookId: BookId) => number;
  onContinueStudying: () => void;
}

export const BookLibraryView: React.FC<BookLibraryViewProps> = ({
  books,
  activeBookId,
  onSelectBook,
  getCompletedCount,
  onContinueStudying,
}) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-800 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold border border-blue-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multi-Book Preparation Library</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          TOEFL Preparation Source Books
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Switch seamlessly between authentic, verified preparation volumes. Each volume maintains its own structured curriculum, mini-tests, simulated full-length practice tests, and isolated progress tracking.
        </p>
      </div>

      {/* Book Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {books.map((book) => {
          const isActive = book.id === activeBookId;
          const completedCount = getCompletedCount(book.id);
          const totalLessons = book.totalLessons || 39;
          const progressPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

          return (
            <div
              key={book.id}
              className={`rounded-3xl border transition-all flex flex-col justify-between overflow-hidden ${
                isActive
                  ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div className="p-6 sm:p-7 space-y-5">
                {/* Top badges */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono uppercase tracking-wider ${
                      book.format === 'CBT'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {book.format} Format
                  </span>

                  {isActive ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active Book</span>
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">Available</span>
                  )}
                </div>

                {/* Title & Author */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {book.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    By {book.author} · {book.publisher} ({book.edition})
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {book.description}
                </p>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl space-y-0.5">
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      <span>Lessons/Topics</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 font-mono">
                      {book.totalLessons || 39}
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl space-y-0.5">
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
                      <CheckSquare className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Mini-Tests</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 font-mono">
                      {book.totalMiniTests || 6}
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl space-y-0.5">
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Practice Tests</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 font-mono">
                      {book.totalPracticeTests || 3}
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl space-y-0.5">
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
                      <PenTool className="w-3.5 h-3.5 text-amber-600" />
                      <span>TWE Writing</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      Included
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Your Progress</span>
                    <span className="font-mono font-bold text-slate-900">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isActive ? 'bg-blue-600' : 'bg-slate-400'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                {isActive ? (
                  <button
                    onClick={onContinueStudying}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    <span>Continue In This Book</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectBook(book.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors"
                  >
                    <span>Switch to This Book</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Historical & Educational Context Note */}
      <div className="p-6 bg-slate-50 border border-slate-200/90 rounded-2xl flex items-start gap-4 text-xs text-slate-600 leading-relaxed">
        <GraduationCap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-slate-900">
            Source Traceability & Independence Notice
          </p>
          <p>
            This application provides digital study interfaces for classic, verified TOEFL preparation texts (Peterson's Guides and Cliffs Notes). All tests, lessons, and scoring tables preserve the authors' exact terminology and historical context. This platform is an independent educational tool and is not affiliated with or endorsed by Educational Testing Service (ETS).
          </p>
        </div>
      </div>
    </div>
  );
};
