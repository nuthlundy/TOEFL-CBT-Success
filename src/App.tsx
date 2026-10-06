/**
 * TOEFL CBT SUCCESS - Interactive Digital Learning System
 * Main Application Orchestrator
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { GettingStartedView } from './components/gettingStarted/GettingStartedView';
import { SectionLessonsView } from './components/curriculum/SectionLessonsView';
import { LessonPlayer } from './components/lessons/LessonPlayer';
import { MiniTestsView } from './components/assessments/MiniTestsView';
import { PracticeTestsView } from './components/assessments/PracticeTestsView';
import { TestEngine } from './components/testEngine/TestEngine';
import { TweWorkspace } from './components/twe/TweWorkspace';
import { MistakeReviewView } from './components/review/MistakeReviewView';
import { ProgressView } from './components/progress/ProgressView';
import { BookmarksView } from './components/tools/BookmarksView';
import { NotesView } from './components/tools/NotesView';
import { AboutView } from './components/about/AboutView';
import { AuditCoverageView } from './components/audit/AuditCoverageView';
import { GlobalSearchModal } from './components/tools/GlobalSearchModal';

import { storageService } from './services/storageService';
import { ALL_LESSONS } from './data/lessonsData';
import { MINI_TESTS } from './data/miniTestsData';
import { PRACTICE_TESTS } from './data/practiceTestsData';
import {
  Bookmark,
  NoteItem,
  TestResultRecord,
  TweSubmission,
  UserAnswerAttempt,
  MiniTest,
  PracticeTest,
} from './types/toefl';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [activeTestConfig, setActiveTestConfig] = useState<{
    testId: string;
    testTitle: string;
    timeLimitMinutes: number;
    questions: any[];
    passages?: any[];
  } | null>(null);

  // Persistent User State
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<UserAnswerAttempt[]>([]);
  const [testResults, setTestResults] = useState<TestResultRecord[]>([]);
  const [tweSubmissions, setTweSubmissions] = useState<TweSubmission[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [dailyMinutes, setDailyMinutes] = useState<number>(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastLocation, setLastLocation] = useState<{ tab: string; lessonId?: string; testId?: string } | null>(null);

  // Initialize from storage
  useEffect(() => {
    setCompletedLessons(storageService.getCompletedLessons());
    setAttempts(storageService.getAttempts());
    setTestResults(storageService.getTestResults());
    setTweSubmissions(storageService.getTweSubmissions());
    setBookmarks(storageService.getBookmarks());
    setNotes(storageService.getNotes());
    setDailyMinutes(storageService.getDailyTimeSpent());
    setLastLocation(storageService.getLastLocation());

    // Timer heartbeat for 30-min daily target
    const interval = setInterval(() => {
      storageService.addTimeSpent(1);
      setDailyMinutes(storageService.getDailyTimeSpent());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Sync tab with URL hash/route on load & on hashchange / popstate
  useEffect(() => {
    const parseUrlRoute = () => {
      const hash = window.location.hash.replace('#', '').trim();
      const pathname = window.location.pathname.replace(/^\//, '').trim();
      const route = hash || pathname;

      if (!route) return;

      if (route.startsWith('lesson/')) {
        const lid = route.replace('lesson/', '');
        const exists = ALL_LESSONS.some((l) => l.id === lid);
        if (exists) {
          setActiveLessonId(lid);
          setActiveTab('lesson-player');
          return;
        }
      }

      const validTabs = [
        'dashboard',
        'getting-started',
        'listening',
        'structure',
        'reading',
        'mini-tests',
        'practice-tests',
        'twe',
        'mistakes',
        'progress',
        'bookmarks',
        'notes',
        'audit',
        'about',
      ];

      if (validTabs.includes(route)) {
        setActiveTab(route);
        setActiveLessonId(null);
        setActiveTestConfig(null);
      }
    };

    parseUrlRoute();
    window.addEventListener('hashchange', parseUrlRoute);
    window.addEventListener('popstate', parseUrlRoute);
    return () => {
      window.removeEventListener('hashchange', parseUrlRoute);
      window.removeEventListener('popstate', parseUrlRoute);
    };
  }, []);

  // Keyboard shortcut for Cmd+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation handlers
  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    setActiveLessonId(null);
    setActiveTestConfig(null);
    storageService.setLastLocation({ tab });
    setLastLocation({ tab });
    if (window.location.hash !== `#${tab}`) {
      window.history.pushState(null, '', `#${tab}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setActiveTab('lesson-player');
    storageService.setLastLocation({ tab: 'lesson-player', lessonId });
    setLastLocation({ tab: 'lesson-player', lessonId });
    window.history.pushState(null, '', `#lesson/${lessonId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteLesson = (lessonId: string) => {
    storageService.markLessonComplete(lessonId);
    setCompletedLessons(storageService.getCompletedLessons());
  };

  const handleRecordAttempt = (
    qId: string,
    answer: string,
    isCorrect: boolean,
    skill: string,
    page?: number
  ) => {
    const section = activeTab === 'listening' ? 'listening' : activeTab === 'reading' ? 'reading' : 'structure';
    const attempt: UserAnswerAttempt = {
      questionId: qId,
      userAnswer: answer,
      isCorrect,
      timestamp: Date.now(),
      section,
      skill,
      sourcePage: page,
      lessonId: activeLessonId || undefined,
    };
    storageService.recordAttempt(attempt);
    setAttempts(storageService.getAttempts());
  };

  const handleToggleBookmark = (id: string, title: string) => {
    const bookmark: Bookmark = {
      id: `bm_${id}`,
      type: id.includes('L') || id.includes('lesson') ? 'lesson' : 'question',
      targetId: id,
      title,
      section: 'structure',
      createdAt: Date.now(),
    };
    storageService.toggleBookmark(bookmark);
    setBookmarks(storageService.getBookmarks());
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some((b) => b.targetId === id);
  };

  const handleSaveNote = (targetId: string, title: string, content: string) => {
    const note: NoteItem = {
      id: `note_${targetId}`,
      targetId,
      title,
      content,
      section: 'structure',
      updatedAt: Date.now(),
    };
    storageService.saveNote(note);
    setNotes(storageService.getNotes());
  };

  const handleDeleteNote = (id: string) => {
    storageService.deleteNote(id);
    setNotes(storageService.getNotes());
  };

  const [returnTabAfterTest, setReturnTabAfterTest] = useState<string>('dashboard');

  // Test launches
  const handleStartMiniTest = (miniTest: MiniTest) => {
    setReturnTabAfterTest('mini-tests');
    setActiveTestConfig({
      testId: miniTest.id,
      testTitle: miniTest.title,
      timeLimitMinutes: miniTest.timeLimitMinutes,
      questions: miniTest.questions,
    });
    setActiveTab('test-engine');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartFullPracticeTest = (pt: PracticeTest, originTab: string = 'practice-tests') => {
    setReturnTabAfterTest(originTab);
    // Combine all questions
    const allQuestions = [
      ...pt.sections.listening.questions,
      ...pt.sections.structure.questions,
      ...pt.sections.reading.questions,
    ];
    setActiveTestConfig({
      testId: pt.id,
      testTitle: `${pt.title} (Full Examination)`,
      timeLimitMinutes: 110,
      questions: allQuestions,
      passages: pt.sections.reading.passages,
    });
    setActiveTab('test-engine');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartSectionPracticeTest = (
    pt: PracticeTest,
    secKey: 'listening' | 'structure' | 'reading'
  ) => {
    setReturnTabAfterTest('practice-tests');
    const sec = pt.sections[secKey];
    setActiveTestConfig({
      testId: `${pt.id}_${secKey}`,
      testTitle: `${pt.title} — ${sec.name}`,
      timeLimitMinutes: sec.timeLimitMinutes,
      questions: sec.questions,
      passages: sec.passages,
    });
    setActiveTab('test-engine');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishTest = (record: TestResultRecord) => {
    storageService.saveTestResult(record);
    setTestResults(storageService.getTestResults());

    // Record individual attempts for mistake log
    for (const [qId, ans] of Object.entries(record.answers)) {
      const q = activeTestConfig?.questions.find((item) => item.id === qId);
      if (q) {
        const attempt: UserAnswerAttempt = {
          questionId: qId,
          userAnswer: ans,
          isCorrect: ans === q.correctAnswer,
          timestamp: Date.now(),
          section: qId.includes('L') ? 'listening' : qId.includes('R') ? 'reading' : 'structure',
          skill: q.skill,
          sourcePage: q.sourcePage,
        };
        storageService.recordAttempt(attempt);
      }
    }
    setAttempts(storageService.getAttempts());
  };

  const handleSaveTweSubmission = (sub: TweSubmission) => {
    storageService.saveTweSubmission(sub);
    setTweSubmissions(storageService.getTweSubmissions());
  };

  const handleResumeLast = () => {
    if (lastLocation) {
      if (lastLocation.lessonId) {
        handleStartLesson(lastLocation.lessonId);
      } else {
        handleSelectTab(lastLocation.tab);
      }
    }
  };

  // Find active lesson object
  const activeLesson = ALL_LESSONS.find((l) => l.id === activeLessonId) || ALL_LESSONS[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onResumeLast={handleResumeLast}
        hasResume={!!lastLocation}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Split Layout: Sidebar + View Content */}
      <div className="flex-1 flex overflow-hidden max-w-[1440px] w-full mx-auto">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          mistakesCount={attempts.filter((a) => !a.isCorrect).length}
          bookmarksCount={bookmarks.length}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Scrollable Content Stage */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              completedLessons={completedLessons}
              attempts={attempts}
              testResults={testResults}
              bookmarksCount={bookmarks.length}
              notesCount={notes.length}
              dailyMinutes={dailyMinutes}
              onNavigateTab={handleSelectTab}
              onStartLesson={handleStartLesson}
              onStartPracticeTest={(testId) => {
                const pt = PRACTICE_TESTS.find((t) => t.id === testId);
                if (pt) handleStartFullPracticeTest(pt);
              }}
            />
          )}

          {activeTab === 'getting-started' && <GettingStartedView />}

          {activeTab === 'listening' && (
            <SectionLessonsView
              section="listening"
              completedLessons={completedLessons}
              onStartLesson={handleStartLesson}
              onToggleBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked}
            />
          )}

          {activeTab === 'structure' && (
            <SectionLessonsView
              section="structure"
              completedLessons={completedLessons}
              onStartLesson={handleStartLesson}
              onToggleBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked}
            />
          )}

          {activeTab === 'reading' && (
            <SectionLessonsView
              section="reading"
              completedLessons={completedLessons}
              onStartLesson={handleStartLesson}
              onToggleBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked}
            />
          )}

          {activeTab === 'lesson-player' && (
            <LessonPlayer
              lesson={activeLesson}
              onComplete={() => {
                handleCompleteLesson(activeLesson.id);
                handleSelectTab(activeLesson.section);
              }}
              onBackToCurriculum={() => handleSelectTab(activeLesson.section)}
              onRecordAttempt={handleRecordAttempt}
              onToggleBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked(activeLesson.id)}
              onSaveNote={handleSaveNote}
              existingNote={notes.find((n) => n.targetId === activeLesson.id)?.content || ''}
            />
          )}

          {activeTab === 'mini-tests' && (
            <MiniTestsView
              onStartMiniTest={handleStartMiniTest}
              testResults={testResults}
            />
          )}

          {activeTab === 'practice-tests' && (
            <PracticeTestsView
              onStartFullTest={(pt) => handleStartFullPracticeTest(pt, 'practice-tests')}
              onStartSectionTest={handleStartSectionPracticeTest}
              testResults={testResults}
            />
          )}

          {activeTab === 'test-engine' && activeTestConfig && (
            <TestEngine
              testId={activeTestConfig.testId}
              testTitle={activeTestConfig.testTitle}
              timeLimitMinutes={activeTestConfig.timeLimitMinutes}
              questions={activeTestConfig.questions}
              passages={activeTestConfig.passages}
              onFinishTest={handleFinishTest}
              onExit={() => handleSelectTab(returnTabAfterTest)}
            />
          )}

          {activeTab === 'twe' && (
            <TweWorkspace
              onSaveSubmission={handleSaveTweSubmission}
              submissions={tweSubmissions}
            />
          )}

          {activeTab === 'mistakes' && (
            <MistakeReviewView
              attempts={attempts}
              onToggleBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked}
            />
          )}

          {activeTab === 'progress' && (
            <ProgressView
              attempts={attempts}
              testResults={testResults}
              tweSubmissions={tweSubmissions}
              completedLessons={completedLessons}
              onNavigateToMistakes={() => handleSelectTab('mistakes')}
            />
          )}

          {activeTab === 'bookmarks' && (
            <BookmarksView
              bookmarks={bookmarks}
              onRemoveBookmark={handleToggleBookmark}
              onNavigateToTarget={(b) => {
                if (b.type === 'lesson') {
                  handleStartLesson(b.targetId);
                } else {
                  handleSelectTab('mistakes');
                }
              }}
            />
          )}

          {activeTab === 'notes' && (
            <NotesView
              notes={notes}
              onSaveNote={(note) => {
                storageService.saveNote(note);
                setNotes(storageService.getNotes());
              }}
              onDeleteNote={handleDeleteNote}
            />
          )}

          {activeTab === 'audit' && <AuditCoverageView />}

          {activeTab === 'about' && <AboutView />}
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(tab, id) => {
          if (id && id.includes('lesson')) {
            handleStartLesson(id);
          } else {
            handleSelectTab(tab);
          }
        }}
      />
    </div>
  );
}
