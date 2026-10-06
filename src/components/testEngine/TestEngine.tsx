/**
 * Reusable Test Engine for Mini-Tests & Full-Length Practice Tests
 * Features:
 * - Active test mode vs. Review mode (explanations hidden until submitted)
 * - Countdown timer with warnings
 * - Question palette with answered/unanswered and flagged status
 * - Flag for review toggle
 * - Previous/Next navigation
 * - Authentic scoring and score conversion chart equating
 */

import React, { useState, useEffect } from 'react';
import {
  Clock,
  Flag,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  Volume2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Question, TestResultRecord } from '../../types/toefl';
import { calculateScaledScores } from '../../data/practiceTestsData';
import { ttsService } from '../../services/ttsService';

interface TestEngineProps {
  testId: string;
  testTitle: string;
  timeLimitMinutes: number;
  questions: Question[];
  passages?: Array<{
    id: string;
    title: string;
    text: string;
    questionIds: string[];
    lineNumbered?: boolean;
  }>;
  onFinishTest: (record: TestResultRecord) => void;
  onExit: () => void;
  initialMode?: 'active' | 'review';
  initialAnswers?: Record<string, string>;
}

export const TestEngine: React.FC<TestEngineProps> = ({
  testId,
  testTitle,
  timeLimitMinutes,
  questions,
  passages,
  onFinishTest,
  onExit,
  initialMode = 'active',
  initialAnswers = {},
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>(initialAnswers);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [remainingSeconds, setRemainingSeconds] = useState(timeLimitMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(initialMode === 'review');
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center bg-white border border-slate-200 rounded-2xl shadow-xs mt-8">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-900">No Questions Available</h2>
        <p className="text-sm text-slate-600 mt-2">
          This test currently contains no active items or could not be loaded.
        </p>
        <button
          onClick={onExit}
          className="mt-6 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors"
        >
          Return to Assessments
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex] || questions[0];

  // Find passage if this is reading
  const currentPassage = passages?.find((p) => currentQ && p.questionIds.includes(currentQ.id));

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || remainingSeconds <= 0) return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, remainingSeconds]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectAnswer = (choiceId: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: choiceId,
    }));
  };

  const handleToggleFlag = (qId: string) => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(qId)) {
        next.delete(qId);
      } else {
        next.add(qId);
      }
      return next;
    });
  };

  const handleSubmitTest = () => {
    setIsSubmitted(true);
    ttsService.stop();

    // Calculate score
    let correctCount = 0;
    for (const q of questions) {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    }

    // Equated scores
    const scaled = calculateScaledScores({
      listening: correctCount,
      structure: correctCount,
      reading: correctCount,
    });

    const record: TestResultRecord = {
      id: `result_${Date.now()}`,
      testId,
      testTitle,
      date: Date.now(),
      durationSeconds: timeLimitMinutes * 60 - remainingSeconds,
      sectionScores: {
        listening: { raw: correctCount, total: questions.length, scaledRange: scaled.listening },
      },
      totalScaledRange: scaled.total,
      rawTotal: correctCount,
      maxTotal: questions.length,
      answers: userAnswers,
    };

    onFinishTest(record);
  };

  const handlePlayAudio = (text: string) => {
    if (isPlayingAudio) {
      ttsService.stop();
      setIsPlayingAudio(false);
      return;
    }
    setIsPlayingAudio(true);
    ttsService.speak(text, {
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  // Stats for review
  const correctCount = questions.filter((q) => userAnswers[q.id] === q.correctAnswer).length;
  const answeredCount = Object.keys(userAnswers).length;
  const accuracyPct = Math.round((correctCount / questions.length) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-4 pb-12">
      {/* Top Bar for Test Session */}
      <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Exit Test"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
              {testTitle}
            </h1>
            <span className="text-[11px] text-slate-400">
              {isSubmitted ? 'Review Mode (Answer Key & Explanations)' : 'Active CBT Examination'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!isSubmitted && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-sm font-semibold ${
                remainingSeconds < 300
                  ? 'bg-rose-950/80 text-rose-300 border border-rose-800 animate-pulse'
                  : 'bg-slate-800 text-blue-400 border border-slate-700'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTime(remainingSeconds)}</span>
            </div>
          )}

          {!isSubmitted ? (
            <button
              onClick={handleSubmitTest}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={onExit}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              Close Review
            </button>
          )}
        </div>
      </div>

      {/* Post-Submission Summary Banner */}
      {isSubmitted && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center font-bold font-mono text-blue-700 text-lg">
              {accuracyPct}%
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Test Completed: {correctCount} of {questions.length} Correct
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Estimated Historical Scaled Score: <strong>{calculateScaledScores({ listening: correctCount, structure: correctCount, reading: correctCount }).total}</strong> (Based on Peterson's Conversion Table)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPalette(!showPalette)}
              className="px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
            >
              {showPalette ? 'Hide Question Grid' : 'Show Question Grid'}
            </button>
          </div>
        </div>
      )}

      {/* Main Question + Passage Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Reading Passage if present (6 cols) or Spoken Dialogue / Tapescript */}
        {currentPassage ? (
          <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs max-h-[70vh] overflow-y-auto font-serif text-sm leading-relaxed text-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2 sticky top-0 bg-white z-10">
              <span className="text-xs font-bold font-sans text-slate-500 uppercase tracking-wider">
                Reading Passage
              </span>
              <span className="text-xs font-sans text-blue-700 font-medium">
                {currentPassage.title}
              </span>
            </div>
            <div className="whitespace-pre-line select-text">
              {currentPassage.text}
            </div>
          </div>
        ) : null}

        {/* Right Column (or Full Width): Question & Choices */}
        <div
          className={`${
            currentPassage ? 'lg:col-span-6' : 'lg:col-span-9'
          } bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5`}
        >
          {/* Question Status Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-slate-400">{currentQ.id}</span>
            </div>

            <button
              onClick={() => handleToggleFlag(currentQ.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                flaggedQuestions.has(currentQ.id)
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              <span>{flaggedQuestions.has(currentQ.id) ? 'Flagged' : 'Flag for Review'}</span>
            </button>
          </div>

          {/* Audio narration button for listening questions */}
          {currentQ.tapescript && (
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Spoken Audio Prompt</span>
              </div>
              <button
                onClick={() => handlePlayAudio(currentQ.tapescript || currentQ.stem)}
                className="text-blue-700 hover:underline font-semibold"
              >
                {isPlayingAudio ? 'Stop Playing' : 'Listen with Audio'}
              </button>
            </div>
          )}

          {/* Question Text */}
          <div className="text-base sm:text-lg font-serif text-slate-900 leading-snug whitespace-pre-line">
            {currentQ.stem}
          </div>

          {/* Choices */}
          <div className="space-y-2.5 pt-2">
            {currentQ.choices.map((choice) => {
              const isSelected = userAnswers[currentQ.id] === choice.id;
              const isCorrectAnswer = choice.id === currentQ.correctAnswer;
              let choiceStyle =
                'p-3.5 rounded-xl border text-sm flex items-center justify-between transition-all ';

              if (isSubmitted) {
                if (isCorrectAnswer) {
                  choiceStyle += 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold';
                } else if (isSelected && !isCorrectAnswer) {
                  choiceStyle += 'bg-rose-50 border-rose-300 text-rose-950 line-through';
                } else {
                  choiceStyle += 'bg-white border-slate-200 text-slate-500 opacity-60';
                }
              } else {
                if (isSelected) {
                  choiceStyle +=
                    'bg-blue-50/80 border-blue-500 text-blue-950 font-medium shadow-xs ring-1 ring-blue-500/20';
                } else {
                  choiceStyle +=
                    'bg-white border-slate-200 text-slate-800 hover:bg-slate-50/80 cursor-pointer';
                }
              }

              return (
                <div
                  key={choice.id}
                  onClick={() => handleSelectAnswer(choice.id)}
                  className={choiceStyle}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-bold ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {choice.id}
                    </span>
                    <span>{choice.text}</span>
                  </div>

                  {isSubmitted && isCorrectAnswer && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {isSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation in Review Mode */}
          {isSubmitted && currentQ.explanation && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 space-y-1 mt-4">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Author Explanation (Peterson’s p. {currentQ.sourcePage})</span>
              </div>
              <p className="leading-relaxed text-slate-700">{currentQ.explanation}</p>
              {currentQ.tapescript && (
                <div className="pt-2 mt-2 border-t border-slate-200 font-mono text-[11px] text-slate-600 whitespace-pre-line">
                  <strong>Full Tapescript:</strong>
                  <div>{currentQ.tapescript}</div>
                </div>
              )}
            </div>
          )}

          {/* Previous / Next Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
              }}
              disabled={currentIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                currentIndex === 0
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => {
                if (currentIndex + 1 < questions.length) setCurrentIndex((prev) => prev + 1);
              }}
              disabled={currentIndex + 1 >= questions.length}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                currentIndex + 1 >= questions.length
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
              }`}
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Question Palette (Visible on Desktop or toggled) */}
        {!currentPassage && (
          <div className="lg:col-span-3 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Question Palette ({answeredCount}/{questions.length})
            </h3>
            <div className="grid grid-cols-5 gap-1.5 max-h-[60vh] overflow-y-auto p-1">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = !!userAnswers[q.id];
                const isFlagged = flaggedQuestions.has(q.id);
                const isCorrect = userAnswers[q.id] === q.correctAnswer;

                let btnClass = 'h-8 text-xs font-mono font-medium rounded border transition-all ';
                if (isCurrent) {
                  btnClass += 'ring-2 ring-blue-500 font-bold ';
                }

                if (isSubmitted) {
                  if (isCorrect) {
                    btnClass += 'bg-emerald-100 border-emerald-300 text-emerald-800';
                  } else if (isAnswered) {
                    btnClass += 'bg-rose-100 border-rose-300 text-rose-800';
                  } else {
                    btnClass += 'bg-slate-100 border-slate-200 text-slate-400';
                  }
                } else {
                  if (isAnswered) {
                    btnClass += 'bg-blue-600 border-blue-600 text-white';
                  } else {
                    btnClass += 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';
                  }
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`${btnClass} relative`}
                  >
                    <span>{idx + 1}</span>
                    {isFlagged && (
                      <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-blue-600" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-amber-500" />
                <span>Flagged</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded border border-slate-300 bg-white" />
                <span>Unanswered</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Exit Test Session?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to exit? Your answered questions will be saved.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Keep Testing
              </button>
              <button
                onClick={onExit}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg"
              >
                Exit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
