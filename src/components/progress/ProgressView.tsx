/**
 * Student Progress & Mastery Analysis Engine View
 * Comprehensive analytics, skill mastery, accuracy, score conversion history, and improvement
 */

import React from 'react';
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
} from 'lucide-react';
import { UserAnswerAttempt, TestResultRecord, TweSubmission } from '../../types/toefl';
import { ALL_LESSONS } from '../../data/lessonsData';

interface ProgressViewProps {
  attempts: UserAnswerAttempt[];
  testResults: TestResultRecord[];
  tweSubmissions: TweSubmission[];
  completedLessons: string[];
  onNavigateToMistakes: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  attempts,
  testResults,
  tweSubmissions,
  completedLessons,
  onNavigateToMistakes,
}) => {
  const totalQuestions = attempts.length;
  const correctCount = attempts.filter((a) => a.isCorrect).length;
  const incorrectCount = totalQuestions - correctCount;
  const overallAccuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Breakdown by section
  const sectionBreakdown = (['listening', 'structure', 'reading'] as const).map((sec) => {
    const secAttempts = attempts.filter((a) => a.section === sec);
    const secCorrect = secAttempts.filter((a) => a.isCorrect).length;
    const secAcc = secAttempts.length > 0 ? Math.round((secCorrect / secAttempts.length) * 100) : 0;
    const lessonsInSec = ALL_LESSONS.filter((l) => l.section === sec);
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
    isMastered: data.total >= 3 && data.correct / data.total >= 0.8,
  }));

  const masteredSkills = skillsList.filter((s) => s.isMastered);
  const developingSkills = skillsList.filter((s) => !s.isMastered);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Student Performance Engine</span>
            <span aria-hidden="true">·</span>
            <span>Empirical Mastery Tracking</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-blue-600" />
            <span>Progress & Skill Mastery</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Mastery is determined by repeated performance across multiple questions and authentic assessments.
          </p>
        </div>

        <button
          onClick={onNavigateToMistakes}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Review {incorrectCount} Mistakes</span>
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Overall Accuracy
          </span>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            {overallAccuracy}%
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {correctCount} / {totalQuestions} correct
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Mastered Skills
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">
            {masteredSkills.length}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            $\ge$ 80% accuracy over 3+ items
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Full Tests Taken
          </span>
          <div className="text-2xl font-bold font-mono text-blue-600 mt-1">
            {testResults.length}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Practice exams completed
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            TWE Submissions
          </span>
          <div className="text-2xl font-bold font-mono text-indigo-600 mt-1">
            {tweSubmissions.length}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Essays evaluated
          </p>
        </div>
      </div>

      {/* Section Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sectionBreakdown.map((sec) => (
          <div
            key={sec.section}
            className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                {sec.section}
              </span>
              <span className="text-xs font-mono font-bold text-blue-700">
                {sec.accuracy}% Accuracy
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Lessons Completed:</span>
                <span className="font-mono font-bold text-slate-900">
                  {sec.lessonsDone} / {sec.lessonsTotal}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{
                    width: `${Math.round((sec.lessonsDone / sec.lessonsTotal) * 100)}%`,
                  }}
                />
              </div>

              <div className="flex justify-between text-slate-600 pt-2">
                <span>Questions Answered:</span>
                <span className="font-mono text-slate-900">{sec.total}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Correct Answers:</span>
                <span className="font-mono text-emerald-700 font-semibold">{sec.correct}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills Mastery Matrix */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Individual Skill Mastery Performance
        </h2>

        {skillsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {skillsList.map((s) => (
              <div
                key={s.skill}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900">{s.skill}</strong>
                    <span className="text-[10px] text-slate-400 uppercase">({s.section})</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">
                    {s.correct} / {s.total} attempts ({s.accuracy}%)
                  </span>
                </div>

                <div>
                  {s.isMastered ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300">
                      MASTERED
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold text-amber-800 bg-amber-100 border border-amber-300">
                      PRACTICING
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-slate-400">
            No question attempts recorded yet. Begin studying lessons or taking tests to populate your skill performance record.
          </div>
        )}
      </div>

      {/* Test Exam Records */}
      {testResults.length > 0 && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Practice Test Historical Equated Records
          </h2>
          <div className="divide-y divide-slate-100">
            {testResults.map((r) => (
              <div key={r.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-slate-900">{r.testTitle}</strong>
                  <span className="text-slate-400 ml-2">
                    {new Date(r.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-slate-600">
                    Raw: {r.rawTotal} / {r.maxTotal}
                  </span>
                  <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    Equated Score: {r.totalScaledRange}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
