/**
 * Section Lessons Curriculum Browser
 * Displays all lessons for a chosen section with parts, completion states, and mini-lessons
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  PlayCircle,
  BookOpen,
  Headphones,
  FileCode,
  Bookmark,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Lesson, SectionType, MiniLesson, BookId } from '../../types/toefl';
import { ALL_LESSONS } from '../../data/lessonsData';
import {
  SECTION1_MINI_LESSONS,
  SECTION2_MINI_LESSONS,
  SECTION3_MINI_LESSONS,
} from '../../data/miniLessonsData';

interface SectionLessonsViewProps {
  section: SectionType;
  completedLessons: string[];
  onStartLesson: (lessonId: string) => void;
  onToggleBookmark: (id: string, title: string) => void;
  isBookmarked: (id: string) => boolean;
  lessons?: Lesson[];
  activeBookId?: BookId;
}

export const SectionLessonsView: React.FC<SectionLessonsViewProps> = ({
  section,
  completedLessons,
  onStartLesson,
  onToggleBookmark,
  isBookmarked,
  lessons = ALL_LESSONS,
  activeBookId = 'PETERSONS-CBT-SUCCESS',
}) => {
  const [selectedPart, setSelectedPart] = useState<string>('all');
  const [showMiniLessons, setShowMiniLessons] = useState<boolean>(false);
  const [activeMiniLesson, setActiveMiniLesson] = useState<MiniLesson | null>(null);

  const sectionLessons = lessons.filter((l) => l.section === section);
  const parts = Array.from(new Set(sectionLessons.map((l) => l.part)));

  // Corresponding mini-lessons (for Peterson)
  const miniLessons =
    activeBookId === 'PETERSONS-CBT-SUCCESS'
      ? section === 'listening'
        ? SECTION1_MINI_LESSONS
        : section === 'structure'
        ? SECTION2_MINI_LESSONS
        : SECTION3_MINI_LESSONS
      : [];

  const filteredLessons = sectionLessons.filter((l) => {
    if (selectedPart !== 'all' && l.part !== selectedPart) return false;
    return true;
  });

  const getSectionTitle = () => {
    switch (section) {
      case 'listening':
        return 'Section 1: Listening Comprehension';
      case 'structure':
        return 'Section 2: Structure and Written Expression';
      case 'reading':
        return 'Section 3: Reading Comprehension';
      default:
        return 'TOEFL Curriculum';
    }
  };

  const getSectionDescription = () => {
    switch (section) {
      case 'listening':
        return 'Master Part A Dialogs, Part B Extended Conversations, Part C Mini-Talks, and essential American idioms.';
      case 'structure':
        return 'Master Part A Structure (sentence completion) and Part B Written Expression (error identification) with preposition practice.';
      case 'reading':
        return 'Master overview, factual, negative, scanning, inference, vocabulary-in-context, and reference questions.';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Section Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>{activeBookId === 'PETERSONS-CBT-SUCCESS' ? "Peterson's CBT" : activeBookId === 'CLIFFS-TOEFL-PREPARATION-GUIDE' ? 'Cliffs Prep Guide' : 'CliffsTestPrep CBT'}</span>
            <span aria-hidden="true">·</span>
            <span>{sectionLessons.length} {activeBookId === 'PETERSONS-CBT-SUCCESS' ? 'Lessons' : 'Topics'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {getSectionTitle()}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            {getSectionDescription()}
          </p>
        </div>

        {/* Mini-lessons toggle button */}
        {miniLessons.length > 0 && (
          <button
            onClick={() => {
              setShowMiniLessons(!showMiniLessons);
              setActiveMiniLesson(null);
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
              showMiniLessons
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {showMiniLessons
              ? 'View Core Lessons'
              : `View Mini-Lessons (${miniLessons.length})`}
          </button>
        )}
      </div>

      {!showMiniLessons ? (
        <>
          {/* Part Filter Bar */}
          {parts.length > 1 && (
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setSelectedPart('all')}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  selectedPart === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Parts ({lessons.length})
              </button>
              {parts.map((p) => {
                const count = lessons.filter((l) => l.part === p).length;
                return (
                  <button
                    key={p}
                    onClick={() => setSelectedPart(p)}
                    className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                      selectedPart === p
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {p} ({count})
                  </button>
                );
              })}
            </div>
          )}

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLessons.map((l) => {
              const isDone = completedLessons.includes(l.id);
              const isSaved = isBookmarked(l.id);
              return (
                <div
                  key={l.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-all group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-blue-700">
                          Lesson {l.lessonNumber}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{l.part}</span>
                      </div>
                      <span className="font-mono text-slate-400">
                        Book p. {l.sourcePages[0]}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {l.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {l.objective}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isDone ? (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Circle className="w-3.5 h-3.5" />
                          <span>Not started</span>
                        </span>
                      )}

                      <button
                        onClick={() => onToggleBookmark(l.id, l.title)}
                        className={`p-1.5 rounded hover:bg-slate-100 ${
                          isSaved ? 'text-amber-500' : 'text-slate-400'
                        }`}
                        title="Bookmark"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onStartLesson(l.id)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
                    >
                      <span>{isDone ? 'Review' : 'Study'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Mini-Lessons View */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {miniLessons.map((ml) => (
              <div
                key={ml.id}
                onClick={() => setActiveMiniLesson(ml)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeMiniLesson?.id === ml.id
                    ? 'bg-blue-50/70 border-blue-500 shadow-sm'
                    : 'bg-white border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-semibold text-blue-700 font-mono">
                    Mini-Lesson {ml.number}
                  </span>
                  <span className="font-mono">Book p. {ml.sourcePage}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{ml.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {ml.description}
                </p>
                {ml.terms && (
                  <p className="text-[11px] text-slate-400 mt-2">
                    {ml.terms.length} terms & reference items included
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Active Mini-Lesson Viewer */}
          {activeMiniLesson && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-blue-700">
                    Mini-Lesson {activeMiniLesson.number}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                    {activeMiniLesson.title}
                  </h2>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Source: Book p. {activeMiniLesson.sourcePage}
                </span>
              </div>

              {/* Terms Reference Table */}
              {activeMiniLesson.terms && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Terms & Meaning Reference
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto p-1">
                    {activeMiniLesson.terms.map((t, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-0.5"
                      >
                        <div className="font-bold text-slate-900 font-mono">
                          {t.term} {t.pos && <span className="font-sans font-normal text-slate-400 italic">({t.pos})</span>}
                        </div>
                        <div className="text-slate-600">{t.definition}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Practice Questions */}
              {activeMiniLesson.exercise?.questions && (
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Practice Exercises
                  </h4>
                  <p className="text-xs text-slate-500">
                    {activeMiniLesson.exercise.directions}
                  </p>
                  <div className="space-y-3">
                    {activeMiniLesson.exercise.questions.map((q) => (
                      <div
                        key={q.id}
                        className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs"
                      >
                        <p className="font-serif text-sm text-slate-900">{q.sentence}</p>
                        {q.choices && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {q.choices.map((c) => (
                              <span
                                key={c.id}
                                className={`px-3 py-1 rounded-lg border text-xs ${
                                  c.id === q.correctAnswer
                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                                    : 'bg-white border-slate-200 text-slate-600'
                                }`}
                              >
                                <strong>{c.id}.</strong> {c.text}
                              </span>
                            ))}
                          </div>
                        )}
                        {q.explanation && (
                          <p className="text-slate-600 pt-1 text-[11px] italic">
                            {q.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
