/**
 * Student Dashboard View
 * Displays overall progress, section mastery, weakest skills, recommended next lesson,
 * practice test launchpad, recent attempts, and study goal tracker.
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
} from 'lucide-react';
import { HISTORICAL_NOTICE } from '../../data/gettingStartedData';
import { ALL_LESSONS } from '../../data/lessonsData';
import { UserAnswerAttempt, TestResultRecord } from '../../types/toefl';

interface DashboardViewProps {
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
  // Calculations
  const totalLessons = ALL_LESSONS.length;
  const completedCount = completedLessons.length;
  const overallPercentage = Math.round((completedCount / totalLessons) * 100);

  // Section progress
  const listeningTotal = ALL_LESSONS.filter((l) => l.section === 'listening').length;
  const listeningDone = ALL_LESSONS.filter((l) => l.section === 'listening' && completedLessons.includes(l.id)).length;
  const listeningPct = Math.round((listeningDone / listeningTotal) * 100);

  const structureTotal = ALL_LESSONS.filter((l) => l.section === 'structure').length;
  const structureDone = ALL_LESSONS.filter((l) => l.section === 'structure' && completedLessons.includes(l.id)).length;
  const structurePct = Math.round((structureDone / structureTotal) * 100);

  const readingTotal = ALL_LESSONS.filter((l) => l.section === 'reading').length;
  const readingDone = ALL_LESSONS.filter((l) => l.section === 'reading' && completedLessons.includes(l.id)).length;
  const readingPct = Math.round((readingDone / readingTotal) * 100);

  // Weak skills calculation from attempt history
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

  // Recommended next lesson
  const nextLesson = ALL_LESSONS.find((l) => !completedLessons.includes(l.id)) || ALL_LESSONS[0];

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

      {/* Hero Welcome & Continue Studying Card */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <span>Interactive Learning System</span>
              <span aria-hidden="true">·</span>
              <span>Peterson’s Complete Course</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Master the TOEFL Computer-Based Test
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Step-by-step guidance for Listening, Structure & Written Expression, Reading Comprehension, and TWE Essays with authentic practice questions and test equating.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 w-full md:w-80 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-medium text-slate-200">Recommended Next Step</span>
              <span className="text-blue-300 font-mono">Lesson {nextLesson.lessonNumber}</span>
            </div>
            <div>
              <h3 className="font-semibold text-white text-base leading-snug">
                {nextLesson.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                {nextLesson.part} · Book p. {nextLesson.sourcePages[0]}
              </p>
            </div>
            <button
              onClick={() => onStartLesson(nextLesson.id)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-lg shadow-sm transition-colors"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Continue Lesson</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Overall Progress + Section Mastery + Study Goals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Progress */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
              <span>Curriculum Completion</span>
              <span className="font-mono text-slate-900 font-bold">{overallPercentage}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(overallPercentage, 3)}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-3">
              {completedCount} of {totalLessons} core lessons completed across all 3 sections.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-600">
            <span>Questions Attempted: <strong className="text-slate-900 font-mono">{attempts.length}</strong></span>
            <span>Mistakes Logged: <strong className="text-slate-900 font-mono">{attempts.filter((a) => !a.isCorrect).length}</strong></span>
          </div>
        </div>

        {/* Section Progress Bars */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-3">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Section Mastery
          </h2>
          <div className="space-y-2.5 text-xs">
            <div>
              <div className="flex justify-between text-slate-700 font-medium mb-1">
                <span className="flex items-center gap-1.5">
                  <Headphones className="w-3.5 h-3.5 text-blue-600" />
                  Listening
                </span>
                <span className="font-mono text-slate-900">{listeningPct}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: `${listeningPct}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 font-medium mb-1">
                <span className="flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-indigo-600" />
                  Structure & Expression
                </span>
                <span className="font-mono text-slate-900">{structurePct}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full"
                  style={{ width: `${structurePct}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 font-medium mb-1">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
                  Reading
                </span>
                <span className="font-mono text-slate-900">{readingPct}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-600 h-full rounded-full"
                  style={{ width: `${readingPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Today's Goal & Study Rhythm */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Today’s Goal (30-5-5 Rule)
              </span>
              <span className="font-mono font-bold text-slate-900">{dailyMinutes} / 30 mins</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(Math.round((dailyMinutes / 30) * 100), 100)}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              Key #2: Study for 30 minutes, take a 5-minute break, review for 5 minutes before your next topic.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <button
              onClick={() => onNavigateTab('bookmarks')}
              className="hover:text-blue-600 flex items-center gap-1"
            >
              <Bookmark className="w-3.5 h-3.5 text-slate-400" />
              <span>Bookmarks ({bookmarksCount})</span>
            </button>
            <button
              onClick={() => onNavigateTab('notes')}
              className="hover:text-blue-600 flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Notes ({notesCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Middle Row: Weak Skills & Quick Test Access */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weakest Skills / Focus Areas */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-amber-500" />
              <span>Priority Focus & Weak Skills</span>
            </h2>
            <button
              onClick={() => onNavigateTab('mistakes')}
              className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>Review Mistakes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {weakSkills.length > 0 ? (
            <div className="space-y-2.5">
              {weakSkills.map(([skill, data], idx) => {
                const errorRate = Math.round((data.incorrect / data.total) * 100);
                return (
                  <div
                    key={skill}
                    className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-mono text-slate-400 mr-2">0{idx + 1}.</span>
                      <strong className="text-slate-800 font-medium">{skill}</strong>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <span className="text-rose-600 font-semibold font-mono">{errorRate}% incorrect</span>
                      <span aria-hidden="true">·</span>
                      <span>({data.incorrect}/{data.total})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-500 border border-dashed border-slate-200 rounded-lg">
              <p>No recurring weak skills recorded yet.</p>
              <p className="mt-1 text-slate-400">
                Complete lesson exercises or mini-tests to identify areas needing focused practice.
              </p>
            </div>
          )}
        </div>

        {/* Full-Length Practice Tests Quick Launch */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Full-Length Practice Tests</span>
            </h2>
            <button
              onClick={() => onNavigateTab('practice-tests')}
              className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>View All Tests</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((num) => {
              const testId = `practice-test-0${num}`;
              const pastResult = testResults.find((r) => r.testId === testId);
              return (
                <div
                  key={testId}
                  className="p-3.5 border border-slate-200/80 rounded-lg flex items-center justify-between hover:border-blue-300 transition-colors bg-slate-50/50"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      Practice Test {num}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      140 CBT Questions · 3 Sections · Equated 0–300 Scale
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {pastResult ? (
                      <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                        Score: {pastResult.totalScaledRange}
                      </span>
                    ) : null}
                    <button
                      onClick={() => onStartPracticeTest(testId)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
                    >
                      {pastResult ? 'Retake' : 'Start Test'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Launch Cards for Major Study Areas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => onNavigateTab('listening')}
          className="p-4 bg-white border border-slate-200/90 rounded-xl text-left hover:border-blue-400 hover:shadow-xs transition-all group"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Headphones className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Listening</h3>
          <p className="text-xs text-slate-500 mt-1">16 Lessons & 12 Idiom Mini-Lessons</p>
        </button>

        <button
          onClick={() => onNavigateTab('structure')}
          className="p-4 bg-white border border-slate-200/90 rounded-xl text-left hover:border-indigo-400 hover:shadow-xs transition-all group"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <FileCode className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Structure & Expression</h3>
          <p className="text-xs text-slate-500 mt-1">27 Grammar Lessons & Prepositions</p>
        </button>

        <button
          onClick={() => onNavigateTab('reading')}
          className="p-4 bg-white border border-slate-200/90 rounded-xl text-left hover:border-cyan-400 hover:shadow-xs transition-all group"
        >
          <div className="w-9 h-9 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
            <BookOpen className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Reading</h3>
          <p className="text-xs text-slate-500 mt-1">5 Core Skills & 500+ Word Bank</p>
        </button>

        <button
          onClick={() => onNavigateTab('twe')}
          className="p-4 bg-white border border-slate-200/90 rounded-xl text-left hover:border-emerald-400 hover:shadow-xs transition-all group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <PenTool className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">TWE Essay</h3>
          <p className="text-xs text-slate-500 mt-1">10 Keys, Models & 3 Prompts</p>
        </button>
      </div>
    </div>
  );
};
