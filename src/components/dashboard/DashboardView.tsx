/**
 * Student Dashboard View
 * Multi-Book aware dashboard displaying overall progress, section mastery, weakest skills,
 * recommended next lesson/topic, practice test launchpad, recent attempts, and study goal tracker.
 */

import React from 'react';
import {
  PlayCircle,
  Award,
  Headphones,
  FileCode,
  BookOpen,
  PenTool,
  Clock,
  ArrowRight,
  Bookmark,
  FileText,
  AlertTriangle,
  RotateCcw,
  Library,
  ChevronDown,
} from 'lucide-react';
import { HISTORICAL_NOTICE } from '../../data/gettingStartedData';
import { UserAnswerAttempt, TestResultRecord, BookId, BookMetadata, Lesson } from '../../types/toefl';

interface DashboardViewProps {
  activeBookId: BookId;
  books: BookMetadata[];
  onSelectBook: (bookId: BookId) => void;
  lessons: Lesson[];
  completedLessons: string[];
  attempts: UserAnswerAttempt[];
  testResults: TestResultRecord[];
  bookmarksCount: number;
  notesCount: number;
  dailyMinutes: number;
  onNavigateTab: (tab: string, meta?: any) => void;
  onStartLesson: (lessonId: string) => void;
  onStartPracticeTest: (testId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  activeBookId,
  books,
  onSelectBook,
  lessons,
  completedLessons,
  attempts,
  testResults,
  bookmarksCount,
  notesCount,
  dailyMinutes,
  onNavigateTab,
  onStartLesson,
  onStartPracticeTest,
}) => {
  const currentBook = books.find((b) => b.id === activeBookId) || books[0];

  // Calculations for active book
  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;
  const overallPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Section progress
  const listeningTotal = lessons.filter((l) => l.section === 'listening').length;
  const listeningDone = lessons.filter((l) => l.section === 'listening' && completedLessons.includes(l.id)).length;
  const listeningPct = listeningTotal > 0 ? Math.round((listeningDone / listeningTotal) * 100) : 0;

  const structureTotal = lessons.filter((l) => l.section === 'structure').length;
  const structureDone = lessons.filter((l) => l.section === 'structure' && completedLessons.includes(l.id)).length;
  const structurePct = structureTotal > 0 ? Math.round((structureDone / structureTotal) * 100) : 0;

  const readingTotal = lessons.filter((l) => l.section === 'reading').length;
  const readingDone = lessons.filter((l) => l.section === 'reading' && completedLessons.includes(l.id)).length;
  const readingPct = readingTotal > 0 ? Math.round((readingDone / readingTotal) * 100) : 0;

  // Weak skills calculation from attempt history (active book only)
  const skillAttempts: Record<string, { total: number; incorrect: number }> = {};
  for (const att of attempts) {
    if (!skillAttempts[att.skill]) {
      skillAttempts[att.skill] = { total: 0, incorrect: 0 };
    }
    skillAttempts[att.skill].total += 1;
    if (!att.isCorrect) {
      skillAttempts[att.skill].incorrect += 1;
    }
  }

  const weakSkills = Object.entries(skillAttempts)
    .filter(([_, stats]) => stats.total >= 2 && stats.incorrect > 0)
    .sort((a, b) => b[1].incorrect / b[1].total - a[1].incorrect / a[1].total)
    .slice(0, 3);

  // Recommended next lesson for current book
  const nextLesson = lessons.find((l) => !completedLessons.includes(l.id)) || lessons[0];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Historical TOEFL Notice Banner */}
      <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-xl text-amber-900 text-xs flex items-start gap-3 shadow-xs">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">{HISTORICAL_NOTICE.title}: </span>
          <span className="text-amber-800">{HISTORICAL_NOTICE.text}</span>
        </div>
      </div>

      {/* Book Context & Switcher Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl">
            <Library className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Study Source
            </span>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              {currentBook.title}
            </h2>
            <p className="text-xs text-slate-500">
              {currentBook.author} · {currentBook.publisher} ({currentBook.edition})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={activeBookId}
              onChange={(e) => onSelectBook(e.target.value as BookId)}
              aria-label="Change Active Study Source"
              className="appearance-none bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2 pl-3 pr-8 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.shortTitle}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-3 pointer-events-none" />
          </div>

          <button
            onClick={() => onNavigateTab('books')}
            className="px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors whitespace-nowrap"
          >
            All 3 Books
          </button>
        </div>
      </div>

      {/* Hero Welcome & Continue Studying Card */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30">
              <span>{currentBook.format} Format Study Plan</span>
              <span aria-hidden="true">·</span>
              <span>{completedCount} of {totalLessons} Finished</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to continue your preparation?
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {nextLesson
                ? `Next Up in ${currentBook.shortTitle}: Lesson ${nextLesson.lessonNumber} — "${nextLesson.title}"`
                : `You've completed all lessons in ${currentBook.shortTitle}! Take a full practice test.`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            {nextLesson && (
              <button
                onClick={() => onStartLesson(nextLesson.id)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl shadow-sm transition-all transform hover:scale-[1.02]"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Continue Lesson {nextLesson.lessonNumber}</span>
              </button>
            )}
            <button
              onClick={() => onNavigateTab('practice-tests')}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800/90 hover:bg-slate-800 text-slate-200 font-medium text-xs rounded-xl border border-slate-700 transition-colors"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Launch Practice Test</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400">
              {currentBook.shortTitle} Curriculum Progress
            </span>
            <span className="font-mono font-bold text-blue-400">{overallPercentage}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4 Core Section Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Section 1: Listening */}
        <div
          onClick={() => onNavigateTab('listening')}
          className="bg-white border border-slate-200/90 hover:border-blue-400 rounded-2xl p-5 shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Headphones className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-400">
                {listeningDone}/{listeningTotal}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Listening
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Dialogs, conversations, lectures
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-semibold text-blue-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono text-slate-400">{listeningPct}%</span>
          </div>
        </div>

        {/* Section 2: Structure */}
        <div
          onClick={() => onNavigateTab('structure')}
          className="bg-white border border-slate-200/90 hover:border-blue-400 rounded-2xl p-5 shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <FileCode className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-400">
                {structureDone}/{structureTotal}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                Structure & Written
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Grammar rules, formulas, error recognition
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-semibold text-indigo-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono text-slate-400">{structurePct}%</span>
          </div>
        </div>

        {/* Section 3: Reading */}
        <div
          onClick={() => onNavigateTab('reading')}
          className="bg-white border border-slate-200/90 hover:border-blue-400 rounded-2xl p-5 shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-400">
                {readingDone}/{readingTotal}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Reading
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Passages, inference, vocabulary
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-semibold text-emerald-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono text-slate-400">{readingPct}%</span>
          </div>
        </div>

        {/* Section 4: TWE */}
        <div
          onClick={() => onNavigateTab('twe')}
          className="bg-white border border-slate-200/90 hover:border-blue-400 rounded-2xl p-5 shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <PenTool className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-400">
                TWE Essay
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                Essay Writing
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Models, outlines, rubric
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-semibold text-amber-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Practice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono text-slate-400">Workspace</span>
          </div>
        </div>
      </div>

      {/* Two-Column Utility & Performance Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Weak Skills & Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weak Skills Target Area */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-rose-50 text-rose-600 rounded-lg">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Targeted Error Analysis ({currentBook.shortTitle})
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('mistakes')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-600"
              >
                Review All Mistakes →
              </button>
            </div>

            {weakSkills.length > 0 ? (
              <div className="space-y-3">
                {weakSkills.map(([skill, stats]) => {
                  const errorPct = Math.round((stats.incorrect / stats.total) * 100);
                  return (
                    <div
                      key={skill}
                      className="p-3 bg-slate-50 rounded-xl flex items-center justify-between gap-4 text-xs"
                    >
                      <div>
                        <span className="font-semibold text-slate-800">{skill}</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {stats.incorrect} error{stats.incorrect > 1 ? 's' : ''} out of {stats.total} attempts
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-rose-600 font-bold font-mono">
                          {errorPct}% error rate
                        </span>
                        <button
                          onClick={() => onNavigateTab('structure')}
                          className="px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-300 rounded-lg font-medium text-slate-700 transition-colors"
                        >
                          Review Skill
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-3 text-center">
                No recurring mistake patterns logged yet for this book. Work through practice exercises and mini-tests to track skill diagnostics!
              </p>
            )}
          </div>

          {/* Quick Study Tools row */}
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => onNavigateTab('bookmarks')}
              className="p-4 bg-white border border-slate-200/90 hover:border-amber-400 rounded-2xl cursor-pointer transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 text-amber-700 rounded-xl">
                  <Bookmark className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Bookmarks</h4>
                  <p className="text-[11px] text-slate-500">{bookmarksCount} saved</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </div>

            <div
              onClick={() => onNavigateTab('notes')}
              className="p-4 bg-white border border-slate-200/90 hover:border-blue-400 rounded-2xl cursor-pointer transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Study Notes</h4>
                  <p className="text-[11px] text-slate-500">{notesCount} notes</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Right Col: Daily Goal & Test Results */}
        <div className="space-y-6">
          {/* Daily Study Goal */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 text-blue-700 rounded-lg">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Daily Study Target</h3>
              </div>
              <span className="text-xs font-mono font-bold text-blue-700">
                {dailyMinutes}/30 min
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.round((dailyMinutes / 30) * 100))}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Target: 30 minutes daily practice for consistent score gains.
            </p>
          </div>

          {/* Test Performance Launchpad */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Practice Exams ({currentBook.shortTitle})
              </h3>
              <button
                onClick={() => onNavigateTab('practice-tests')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-600"
              >
                View All →
              </button>
            </div>

            {testResults.length > 0 ? (
              <div className="space-y-2">
                {testResults.slice(0, 2).map((tr) => (
                  <div key={tr.id} className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{tr.testTitle}</span>
                      <span className="text-blue-700 font-mono">
                        {tr.rawTotal}/{tr.maxTotal}
                      </span>
                    </div>
                    {tr.totalScaledRange && (
                      <p className="text-[11px] text-slate-500">
                        Converted Score: {tr.totalScaledRange}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 space-y-2">
                <Award className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500">
                  No full practice exams completed yet for this book.
                </p>
                <button
                  onClick={() => onNavigateTab('practice-tests')}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-500"
                >
                  Start Practice Test 1
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
