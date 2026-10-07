/**
 * Student Progress & Mastery Analysis Engine View
 * Multi-Book aware performance analytics, skill mastery, accuracy, score conversion history, and improvement
 */

import React, { useState } from 'react';
import {
  BarChart2,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Award,
  Clock,
  BookOpen,
  Headphones,
  FileCode,
  PenTool,
  RotateCcw,
  Library,
  ChevronDown,
} from 'lucide-react';
import { UserAnswerAttempt, TestResultRecord, TweSubmission, BookId, BookMetadata, Lesson } from '../../types/toefl';
import { ALL_LESSONS } from '../../data/lessonsData';
import { getAllBooks } from '../../data/bookRegistry';

interface ProgressViewProps {
  attempts: UserAnswerAttempt[];
  testResults: TestResultRecord[];
  tweSubmissions: TweSubmission[];
  completedLessons: string[];
  onNavigateToMistakes: () => void;
  activeBookId?: BookId;
  books?: BookMetadata[];
  onSelectBook?: (bookId: BookId) => void;
  lessons?: Lesson[];
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  attempts,
  testResults,
  tweSubmissions,
  completedLessons,
  onNavigateToMistakes,
  activeBookId = 'PETERSONS-CBT-SUCCESS',
  books = getAllBooks(),
  onSelectBook,
  lessons = ALL_LESSONS,
}) => {
  const currentBook = books.find((b) => b.id === activeBookId) || books[0];

  const totalQuestions = attempts.length;
  const correctCount = attempts.filter((a) => a.isCorrect).length;
  const incorrectCount = totalQuestions - correctCount;
  const overallAccuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Breakdown by section for current book
  const sectionBreakdown = (['listening', 'structure', 'reading'] as const).map((sec) => {
    const secAttempts = attempts.filter((a) => a.section === sec);
    const secCorrect = secAttempts.filter((a) => a.isCorrect).length;
    const secAcc = secAttempts.length > 0 ? Math.round((secCorrect / secAttempts.length) * 100) : 0;
    const lessonsInSec = lessons.filter((l) => l.section === sec);
    const doneLessonsInSec = lessonsInSec.filter((l) => completedLessons.includes(l.id)).length;
    return {
      section: sec,
      total: secAttempts.length,
      correct: secCorrect,
      accuracy: secAcc,
      lessonsDone: doneLessonsInSec,
      lessonsTotal: lessonsInSec.length,
    };
  });

  // Repeated Skill Mastery (>80% accuracy with at least 3 attempts = MASTERED)
  const skillMap: Record<string, { total: number; correct: number; section: string }> = {};
  for (const a of attempts) {
    if (!skillMap[a.skill]) {
      skillMap[a.skill] = { total: 0, correct: 0, section: a.section };
    }
    skillMap[a.skill].total += 1;
    if (a.isCorrect) skillMap[a.skill].correct += 1;
  }

  const skillsList = Object.entries(skillMap).map(([skill, data]) => ({
    skill,
    section: data.section,
    total: data.total,
    correct: data.correct,
    accuracy: Math.round((data.correct / data.total) * 100),
  }));

  const masteredSkills = skillsList.filter((s) => s.total >= 3 && s.accuracy >= 80);
  const developingSkills = skillsList.filter((s) => s.accuracy < 80);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header with Book Switcher */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Diagnostic Learning Analytics</span>
            <span aria-hidden="true">·</span>
            <span>Source: {currentBook.shortTitle}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-blue-600" />
            <span>Progress & Mastery Dashboard</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time evaluation of question attempts, section accuracy, and verified mastery milestones.
          </p>
        </div>

        {onSelectBook && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Book:</span>
            <div className="relative">
              <select
                value={activeBookId}
                onChange={(e) => onSelectBook(e.target.value as BookId)}
                aria-label="Filter Progress by Book"
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
          </div>
        )}
      </div>

      {/* Top 4 Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Overall Accuracy</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {overallAccuracy}%
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {correctCount} correct of {totalQuestions} attempts
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Lessons Completed</span>
            <BookOpen className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {completedLessons.length}/{lessons.length}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {lessons.length > 0 ? Math.round((completedLessons.length / lessons.length) * 100) : 0}% of active curriculum
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Logged Mistakes</span>
            <RotateCcw className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-rose-600 font-mono">
            {incorrectCount}
          </div>
          <button
            onClick={onNavigateToMistakes}
            className="text-[11px] text-blue-600 hover:underline mt-1 block font-medium"
          >
            Review Error Log →
          </button>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Exams Completed</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {testResults.length}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {tweSubmissions.length} TWE essays written
          </p>
        </div>
      </div>

      {/* Section Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {sectionBreakdown.map((sb) => {
          const Icon =
            sb.section === 'listening'
              ? Headphones
              : sb.section === 'structure'
              ? FileCode
              : BookOpen;
          return (
            <div
              key={sb.section}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      {sb.section}
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      {sb.lessonsDone}/{sb.lessonsTotal} Lessons
                    </span>
                  </div>
                </div>
                <span className="text-sm font-bold font-mono text-slate-900">
                  {sb.accuracy}%
                </span>
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${sb.accuracy}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                <span>{sb.correct} Correct</span>
                <span>{sb.total} Total Attempts</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mastery & Focus Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mastered Skills */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Mastered Skills (≥80% Accuracy)
            </h3>
          </div>

          {masteredSkills.length > 0 ? (
            <div className="space-y-2.5">
              {masteredSkills.map((s) => (
                <div
                  key={s.skill}
                  className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-emerald-950">{s.skill}</span>
                    <span className="block text-[10px] text-emerald-700 uppercase">
                      {s.section}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700">
                    {s.accuracy}% ({s.correct}/{s.total})
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-4 text-center">
              Complete at least 3 practice questions per skill with 80%+ accuracy to log mastery.
            </p>
          )}
        </div>

        {/* Areas for Improvement */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-rose-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Areas for Improvement (&lt;80% Accuracy)
            </h3>
          </div>

          {developingSkills.length > 0 ? (
            <div className="space-y-2.5">
              {developingSkills.slice(0, 5).map((s) => (
                <div
                  key={s.skill}
                  className="p-3 bg-rose-50/70 border border-rose-200/80 rounded-xl flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-rose-950">{s.skill}</span>
                    <span className="block text-[10px] text-rose-700 uppercase">
                      {s.section}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-rose-700">
                    {s.accuracy}% ({s.correct}/{s.total})
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-4 text-center">
              No low-accuracy skills identified yet for this book.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
