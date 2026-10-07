/**
 * "Review My Mistakes" Component
 * Allows students to filter their errors by section, skill, and review explanations with book citations.
 */

import React, { useState } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Filter,
  Bookmark,
  Volume2,
  BookOpen,
} from 'lucide-react';
import { UserAnswerAttempt, Question, BookId } from '../../types/toefl';
import { bookContentService } from '../../services/bookContentService';
import { ttsService } from '../../services/ttsService';

interface MistakeReviewViewProps {
  attempts: UserAnswerAttempt[];
  onToggleBookmark: (id: string, title: string) => void;
  isBookmarked: (id: string) => boolean;
  activeBookId?: BookId;
}

export const MistakeReviewView: React.FC<MistakeReviewViewProps> = ({
  attempts,
  onToggleBookmark,
  isBookmarked,
  activeBookId = 'PETERSONS-CBT-SUCCESS',
}) => {
  const [filterMode, setFilterMode] = useState<'CURRENT' | 'ALL'>('CURRENT');
  const [sectionFilter, setSectionFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'skill'>('recent');

  // Filter incorrect attempts by book and section
  const incorrectAttempts = attempts.filter((a) => {
    if (a.isCorrect) return false;
    if (filterMode === 'CURRENT') {
      return (a.sourceBookId || 'PETERSONS-CBT-SUCCESS') === activeBookId;
    }
    return true;
  });

  // Helper to find the original question from all data sources
  const findQuestion = (qId: string): Question | undefined => {
    const bookIds: BookId[] = ['PETERSONS-CBT-SUCCESS', 'CLIFFS-TOEFL-PREPARATION-GUIDE', 'CLIFFS-TOEFL-CBT'];
    for (const bId of bookIds) {
      // 1. Lessons
      const lessons = bookContentService.getLessons(bId);
      for (const l of lessons) {
        for (const ex of l.exercises) {
          const found = ex.questions.find((q) => q.id === qId);
          if (found) return found;
        }
      }
      // 2. Mini-tests
      const miniTests = bookContentService.getMiniTests(bId);
      for (const mt of miniTests) {
        const found = mt.questions.find((q) => q.id === qId);
        if (found) return found;
      }
      // 3. Practice tests
      const practiceTests = bookContentService.getPracticeTests(bId);
      for (const pt of practiceTests) {
        for (const secKey of ['listening', 'structure', 'reading'] as const) {
          const found = pt.sections[secKey]?.questions.find((q) => q.id === qId);
          if (found) return found;
        }
      }
    }
    return undefined;
  };

  const filteredAttempts = incorrectAttempts.filter((att) => {
    if (sectionFilter !== 'all' && att.section !== sectionFilter) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Diagnostic Mastery</span>
            <span aria-hidden="true">·</span>
            <span>Key #12: Learn From Mistakes</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-rose-600" />
            <span>Review My Mistakes ({filteredAttempts.length})</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Carefully review each incorrect item and read the author's explanation to turn weaknesses into strengths.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Book Filter Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilterMode('CURRENT')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterMode === 'CURRENT'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Current Book
            </button>
            <button
              onClick={() => setFilterMode('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterMode === 'ALL'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Books
            </button>
          </div>

          {/* Section Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            {['all', 'listening', 'structure', 'reading'].map((sec) => (
              <button
                key={sec}
                onClick={() => setSectionFilter(sec)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                  sectionFilter === sec
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mistake Items List */}
      {filteredAttempts.length > 0 ? (
        <div className="space-y-4">
          {filteredAttempts.map((attempt, idx) => {
            const question = findQuestion(attempt.questionId);
            return (
              <div
                key={`${attempt.questionId}_${attempt.timestamp}_${idx}`}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4"
              >
                {/* Meta Bar */}
                <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 uppercase tracking-wide">
                      {attempt.section}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-blue-700 font-medium">Skill: {attempt.skill}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-slate-400">{attempt.questionId}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">
                      Book p. {attempt.sourcePage || question?.sourcePage || 'N/A'}
                    </span>
                    <button
                      onClick={() =>
                        onToggleBookmark(
                          attempt.questionId,
                          `Question ${attempt.questionId} (${attempt.skill})`
                        )
                      }
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isBookmarked(attempt.questionId)
                          ? 'bg-amber-50 border-amber-300 text-amber-700'
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                      }`}
                      title="Bookmark Question"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Question Stem */}
                <div className="text-sm sm:text-base font-serif text-slate-900 whitespace-pre-line leading-relaxed">
                  {question ? question.stem : `Question ID: ${attempt.questionId}`}
                </div>

                {/* Choices breakdown */}
                {question && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {question.choices.map((c) => {
                      const isUser = c.id === attempt.userAnswer;
                      const isCorrect = c.id === question.correctAnswer;
                      let badge = '';

                      if (isCorrect) badge = 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium';
                      else if (isUser) badge = 'bg-rose-50 border-rose-300 text-rose-950';
                      else badge = 'bg-slate-50/50 border-slate-200 text-slate-600';

                      return (
                        <div key={c.id} className={`p-2.5 rounded-lg border flex items-center justify-between ${badge}`}>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold">{c.id}.</span>
                            <span>{c.text}</span>
                          </div>
                          {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                          {isUser && !isCorrect && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Result Comparison */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5 text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md font-medium">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Your Answer: ({attempt.userAnswer})</span>
                  </div>
                  {question && (
                    <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Correct Answer: ({question.correctAnswer})</span>
                    </div>
                  )}
                </div>

                {/* Author's Explanation */}
                {question?.explanation && (
                  <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-slate-800 space-y-1">
                    <strong className="text-blue-900 block flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
                      <span>Author's Explanation:</span>
                    </strong>
                    <p className="leading-relaxed">{question.explanation}</p>
                  </div>
                )}

                {/* Tapescript if available */}
                {question?.tapescript && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 whitespace-pre-line">
                    <div className="flex items-center justify-between font-sans font-bold text-slate-900 mb-1">
                      <span>Audio Tapescript</span>
                      <button
                        onClick={() => ttsService.speak(question.tapescript!)}
                        className="text-blue-700 flex items-center gap-1 font-normal text-[11px]"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Play Dialogue</span>
                      </button>
                    </div>
                    {question.tapescript}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center space-y-3 shadow-xs">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h2 className="text-base font-bold text-slate-900">No Recorded Mistakes</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You currently have no recorded errors in this category. As you work through lessons, mini-tests, and practice tests, any mistakes will be automatically logged here for analysis.
          </p>
        </div>
      )}
    </div>
  );
};
