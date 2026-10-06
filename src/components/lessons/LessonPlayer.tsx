/**
 * Interactive Lesson Player Component
 * Enforces the pedagogical sequence:
 * 1. Learn (Objective & Rules)
 * 2. Example (Walkthrough with model analysis)
 * 3. Try (Interactive practice item)
 * 4. Submit
 * 5. Feedback (Instant evaluation)
 * 6. Explanation
 * 7. Continue to next lesson / exercise
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Bookmark,
  Volume2,
  Square,
  CheckSquare,
  ArrowRight,
  ArrowLeft,
  BookOpen,
} from 'lucide-react';
import { Lesson, Question } from '../../types/toefl';
import { ttsService } from '../../services/ttsService';

interface LessonPlayerProps {
  lesson: Lesson;
  onComplete: () => void;
  onBackToCurriculum?: () => void;
  onRecordAttempt: (qId: string, answer: string, isCorrect: boolean, skill: string, page?: number) => void;
  onToggleBookmark: (id: string, title: string) => void;
  isBookmarked: boolean;
  onSaveNote: (targetId: string, title: string, content: string) => void;
  existingNote?: string;
}

export const LessonPlayer: React.FC<LessonPlayerProps> = ({
  lesson,
  onComplete,
  onBackToCurriculum,
  onRecordAttempt,
  onToggleBookmark,
  isBookmarked,
  onSaveNote,
  existingNote = '',
}) => {
  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center bg-white border border-slate-200 rounded-2xl shadow-xs mt-8">
        <HelpCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-900">Lesson Unavailable</h2>
        <p className="text-sm text-slate-600 mt-2">
          The requested lesson could not be loaded. Please return to the curriculum.
        </p>
        <button
          onClick={onBackToCurriculum || onComplete}
          className="mt-6 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors"
        >
          Return to Curriculum
        </button>
      </div>
    );
  }

  // Steps in sequence: 'learn' | 'example' | 'practice' | 'summary'
  const [currentStep, setCurrentStep] = useState<'learn' | 'example' | 'practice' | 'summary'>('learn');
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showTapescript, setShowTapescript] = useState(false);
  const [noteContent, setNoteContent] = useState(existingNote);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const currentExercise = lesson.exercises[activeExerciseIndex];
  const currentQuestion: Question | undefined = currentExercise?.questions[activeQuestionIndex];

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

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentQuestion) return;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setIsAnswerSubmitted(true);
    onRecordAttempt(
      currentQuestion.id,
      selectedAnswer,
      isCorrect,
      currentQuestion.skill,
      currentQuestion.sourcePage
    );
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setShowTapescript(false);

    if (currentExercise && activeQuestionIndex + 1 < currentExercise.questions.length) {
      setActiveQuestionIndex((prev) => prev + 1);
    } else if (activeExerciseIndex + 1 < lesson.exercises.length) {
      setActiveExerciseIndex((prev) => prev + 1);
      setActiveQuestionIndex(0);
    } else {
      setCurrentStep('summary');
      onComplete();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Header Card with Citation */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>{lesson.part}</span>
            <span aria-hidden="true">·</span>
            <span>Lesson {lesson.lessonNumber}</span>
            <span aria-hidden="true">·</span>
            <span className="text-blue-700 font-semibold">Source: Book pp. {lesson.sourcePages.join('–')}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {lesson.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {onBackToCurriculum && (
            <button
              onClick={onBackToCurriculum}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Lessons</span>
            </button>
          )}
          <button
            onClick={() => onToggleBookmark(lesson.id, lesson.title)}
            className={`p-2 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-amber-50 border-amber-300 text-amber-700'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
            title="Bookmark this lesson"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sequence Stepper Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-100/90 rounded-xl overflow-x-auto">
        <button
          onClick={() => setCurrentStep('learn')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all whitespace-nowrap text-center ${
            currentStep === 'learn'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Learn Objective
        </button>
        <button
          onClick={() => setCurrentStep('example')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all whitespace-nowrap text-center ${
            currentStep === 'example'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. Examples & Strategy
        </button>
        <button
          onClick={() => setCurrentStep('practice')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all whitespace-nowrap text-center ${
            currentStep === 'practice'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. Try Exercises ({lesson.exercises.reduce((acc, ex) => acc + ex.questions.length, 0)})
        </button>
      </div>

      {/* STEP 1: LEARN */}
      {currentStep === 'learn' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-2">
              Learning Objective
            </h2>
            <p className="text-base text-slate-800 leading-relaxed font-medium">
              {lesson.objective}
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
              Concept Overview
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {lesson.summary}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Core Test-Taking Tactics
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {lesson.strategy.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setCurrentStep('example')}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-lg shadow-sm transition-colors"
            >
              <span>View Examples</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: EXAMPLE */}
      {currentStep === 'example' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900">
              Authentic Sample Item Walkthrough
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Source: Book p. {lesson.examples[0]?.sourcePage || lesson.sourcePages[0]}
            </span>
          </div>

          {lesson.examples.map((eg, idx) => (
            <div key={eg.id || idx} className="space-y-4">
              {eg.dialogue && (
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Spoken Dialog
                    </span>
                    <button
                      onClick={() =>
                        handlePlayAudio(
                          eg.dialogue?.map((d) => `${d.speaker}: ${d.text}`).join('. ') || ''
                        )
                      }
                      className="flex items-center gap-1.5 text-xs text-blue-700 font-medium hover:underline"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isPlayingAudio ? 'Stop Audio' : 'Listen with Audio'}</span>
                    </button>
                  </div>
                  {eg.dialogue.map((line, lIdx) => (
                    <p key={lIdx} className="text-sm text-slate-800 font-serif">
                      <strong className="text-slate-900 font-mono text-xs mr-2">{line.speaker}:</strong>
                      {line.text}
                    </p>
                  ))}
                </div>
              )}

              {eg.passage && (
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-sm font-serif leading-relaxed text-slate-800">
                  {eg.passage}
                </div>
              )}

              {eg.prompt && (
                <p className="text-sm font-semibold text-slate-900">{eg.prompt}</p>
              )}

              {eg.choices && (
                <div className="grid grid-cols-1 gap-2 pt-2">
                  {eg.choices.map((c) => {
                    const isCorrect = c.id === eg.correctAnswer;
                    return (
                      <div
                        key={c.id}
                        className={`p-3 rounded-lg border text-sm flex items-center justify-between ${
                          isCorrect
                            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs w-5 h-5 rounded bg-slate-100 flex items-center justify-center font-bold text-slate-700">
                            {c.id}
                          </span>
                          <span>{c.text}</span>
                        </div>
                        {isCorrect && (
                          <span className="text-xs text-emerald-700 font-semibold">
                            Correct Answer
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="p-4 bg-blue-50/60 border border-blue-200/70 rounded-xl text-xs text-slate-800 space-y-1">
                <span className="font-bold text-blue-900">Explanation & Analysis:</span>
                <p className="leading-relaxed">{eg.explanation}</p>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep('learn')}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Objective</span>
            </button>
            <button
              onClick={() => setCurrentStep('practice')}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-lg shadow-sm transition-colors"
            >
              <span>Start Exercises</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: TRY / PRACTICE */}
      {currentStep === 'practice' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          {currentQuestion ? (
            <>
              {/* Exercise meta & Progress */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                    {currentExercise.title}
                  </span>
                  <p className="text-xs text-slate-500 mt-0.5">{currentExercise.directions}</p>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  Question {activeQuestionIndex + 1} of {currentExercise.questions.length}
                </div>
              </div>

              {/* Audio controls if exercise has audio */}
              {currentExercise.hasAudio && (
                <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-amber-700" />
                    <span>
                      {currentExercise.tapescriptNotice || 'AUDIO_SOURCE_REQUIRED'}
                    </span>
                  </div>
                  <button
                    onClick={() => handlePlayAudio(currentQuestion.stem)}
                    className="font-medium text-blue-700 hover:underline flex items-center gap-1"
                  >
                    <span>{isPlayingAudio ? 'Stop' : 'Listen via Audio'}</span>
                  </button>
                </div>
              )}

              {/* Question Stem */}
              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-sm sm:text-base font-serif text-slate-900 leading-relaxed whitespace-pre-line">
                  {currentQuestion.stem}
                </div>

                {/* Answer Choices */}
                <div className="space-y-2.5">
                  {currentQuestion.choices.map((choice) => {
                    const isSelected = selectedAnswer === choice.id;
                    const isCorrect = choice.id === currentQuestion.correctAnswer;
                    let containerClasses =
                      'p-3.5 rounded-xl border text-sm flex items-center justify-between transition-all cursor-pointer ';

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        containerClasses += 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium';
                      } else if (isSelected && !isCorrect) {
                        containerClasses += 'bg-rose-50 border-rose-300 text-rose-950';
                      } else {
                        containerClasses += 'bg-white border-slate-200 text-slate-500 opacity-70';
                      }
                    } else {
                      if (isSelected) {
                        containerClasses += 'bg-blue-50/70 border-blue-500 text-blue-950 font-medium shadow-xs';
                      } else {
                        containerClasses += 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50/80';
                      }
                    }

                    return (
                      <div
                        key={choice.id}
                        onClick={() => {
                          if (!isAnswerSubmitted) setSelectedAnswer(choice.id);
                        }}
                        className={containerClasses}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-bold ${
                              isSelected
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {choice.id}
                          </span>
                          <span>{choice.text}</span>
                        </div>

                        {isAnswerSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Immediate Feedback & Explanation */}
              {isAnswerSubmitted && (
                <div
                  className={`p-4 rounded-xl border text-xs space-y-2 ${
                    selectedAnswer === currentQuestion.correctAnswer
                      ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                      : 'bg-rose-50/90 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {selectedAnswer === currentQuestion.correctAnswer ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>
                          Incorrect — Correct Answer is ({currentQuestion.correctAnswer})
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-800 leading-relaxed pt-1">
                    {currentQuestion.explanation}
                  </p>
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/50 flex items-center justify-between">
                    <span>Skill: {currentQuestion.skill}</span>
                    <span>Source: Book p. {currentQuestion.sourcePage}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setShowTapescript(!showTapescript)}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showTapescript ? 'Hide Tapescript' : 'View Tapescript'}</span>
                </button>

                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer}
                    className={`px-5 py-2.5 font-medium text-sm rounded-lg shadow-sm transition-colors ${
                      selectedAnswer
                        ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Confirm Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-lg shadow-sm transition-colors"
                  >
                    <span>
                      {activeQuestionIndex + 1 < currentExercise.questions.length
                        ? 'Next Question'
                        : 'Finish Exercise'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {showTapescript && currentQuestion.tapescript && (
                <div className="p-4 bg-slate-100 rounded-xl text-xs font-mono text-slate-800 whitespace-pre-line border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">Authentic Tapescript:</div>
                  {currentQuestion.tapescript}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 space-y-4">
              <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                Lesson Material Review Ready
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                You have studied the rules, strategy, and sample items for this lesson. Work through the corresponding mini-test or practice test section to test your mastery under timed conditions.
              </p>
              <button
                onClick={() => setCurrentStep('learn')}
                className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                Review Lesson Rules
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: SUMMARY & COMPLETE */}
      {currentStep === 'summary' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-8 text-center space-y-5 shadow-xs">
          <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">
            Lesson Completed!
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Great work! You have finished Lesson {lesson.lessonNumber}: "{lesson.title}". All practice attempts have been logged to your progress tracking.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentStep('learn')}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              Review Lesson
            </button>
            <button
              onClick={onComplete}
              className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm"
            >
              Back to Curriculum
            </button>
          </div>
        </div>
      )}

      {/* Personal Study Notes Section */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          My Study Notes for Lesson {lesson.lessonNumber}
        </h3>
        <textarea
          value={noteContent}
          onChange={(e) => {
            setNoteContent(e.target.value);
            onSaveNote(lesson.id, `Notes on Lesson ${lesson.lessonNumber}: ${lesson.title}`, e.target.value);
          }}
          placeholder="Write your personal grammar rules, reminders, or vocabulary notes here. Autosaved."
          rows={3}
          className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
    </div>
  );
};
