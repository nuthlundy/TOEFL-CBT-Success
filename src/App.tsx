/**
 * TOEFL CBT SUCCESS - Interactive Digital Learning System
 * Main Application Orchestrator with Multi-Book Support
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { BookLibraryView } from './components/books/BookLibraryView';
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
import { bookContentService } from './services/bookContentService';
import { ALL_LESSONS } from './data/lessonsData';
import {
  Bookmark,
  NoteItem,
  TestResultRecord,
  TweSubmission,
  UserAnswerAttempt,
  MiniTest,
  PracticeTest,
  BookId,
} from './types/toefl';

export default function App() {
  const [activeBookId, setActiveBookId] = useState<BookId>(() => storageService.getActiveBookId());
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
  const [lastLocation, setLastLocation] = useState<{ tab: string; lessonId?: string; testId?: string; bookId?: BookId } | null>(null);

  const allBooks = bookContentService.getBooks();
  const currentLessons = bookContentService.getLessons(activeBookId);
  const currentMiniTests = bookContentService.getMiniTests(activeBookId);
  const currentPracticeTests = bookContentService.getPracticeTests(activeBookId);
  const currentBookMetadata = bookContentService.getBookMetadata(activeBookId);

  // Initialize from storage for the active book
  useEffect(() => {
    setCompletedLessons(storageService.getCompletedLessons(activeBookId));
    setAttempts(storageService.getAttempts(activeBookId));
    setTestResults(storageService.getTestResults(activeBookId));
    setTweSubmissions(storageService.getTweSubmissions(activeBookId));
    setBookmarks(storageService.getBookmarks(activeBookId));
    setNotes(storageService.getNotes(activeBookId));
    setDailyMinutes(storageService.getDailyTimeSpent());
    setLastLocation(storageService.getLastLocation(activeBookId));

    // Timer heartbeat for 30-min daily target
    const interval = setInterval(() => {
      storageService.addTimeSpent(1);
      setDailyMinutes(storageService.getDailyTimeSpent());
    }, 60000);

    return () => clearInterval(interval);
  }, [activeBookId]);

  // Book Selection Handler
  const handleSelectBook = (bookId: BookId) => {
    storageService.setActiveBookId(bookId);
    setActiveBookId(bookId);
    setCompletedLessons(storageService.getCompletedLessons(bookId));
    setAttempts(storageService.getAttempts(bookId));
    setTestResults(storageService.getTestResults(bookId));
    setTweSubmissions(storageService.getTweSubmissions(bookId));
    setBookmarks(storageService.getBookmarks(bookId));
    setNotes(storageService.getNotes(bookId));
    setLastLocation(storageService.getLastLocation(bookId));
  };

  // Sync tab with URL hash/route on load & on hashchange / popstate
  useEffect(() => {
    const parseUrlRoute = () => {
      const hash = window.location.hash.replace('#', '').trim();
      const pathname = window.location.pathname.replace(/^\//, '').trim();
      const route = hash || pathname;

      if (!route) return;

      if (route.startsWith('lesson/')) {
        const lid = route.replace('lesson/', '');
        const found = bookContentService.getLessonById(lid);
        if (found) {
          if (found.sourceBookId && found.sourceBookId !== activeBookId) {
            handleSelectBook(found.sourceBookId);
          }
          setActiveLessonId(lid);
          setActiveTab('lesson-player');
          return;
        }
      }

      const validTabs = [
        'dashboard',
        'books',
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
  }, [activeBookId]);

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
    storageService.setLastLocation({ tab, bookId: activeBookId });
    setLastLocation({ tab, bookId: activeBookId });
    if (window.location.hash !== `#${tab}`) {
      window.history.pushState(null, '', `#${tab}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLesson = (lessonId: string) => {
    const lessonObj = bookContentService.getLessonById(lessonId);
    if (lessonObj && lessonObj.sourceBookId && lessonObj.sourceBookId !== activeBookId) {
      handleSelectBook(lessonObj.sourceBookId);
    }
    setActiveLessonId(lessonId);
    setActiveTab('lesson-player');
    storageService.setLastLocation({ tab: 'lesson-player', lessonId, bookId: lessonObj?.sourceBookId || activeBookId });
    setLastLocation({ tab: 'lesson-player', lessonId, bookId: lessonObj?.sourceBookId || activeBookId });
    window.history.pushState(null, '', `#lesson/${lessonId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteLesson = (lessonId: string) => {
    storageService.markLessonComplete(lessonId, activeBookId);
    setCompletedLessons(storageService.getCompletedLessons(activeBookId));
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
      sourceBookId: activeBookId,
    };
    storageService.recordAttempt(attempt);
    setAttempts(storageService.getAttempts(activeBookId));
  };

  const handleToggleBookmark = (id: string, title: string) => {
    const bookmark: Bookmark = {
      id: `bm_${id}`,
      type: id.includes('L') || id.includes('lesson') || id.includes('GRAMMAR') || id.includes('STYLE') ? 'lesson' : 'question',
      targetId: id,
      title,
      section: 'structure',
      createdAt: Date.now(),
      sourceBookId: activeBookId,
    };
    storageService.toggleBookmark(bookmark);
    setBookmarks(storageService.getBookmarks(activeBookId));
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
      sourceBookId: activeBookId,
    };
    storageService.saveNote(note);
    setNotes(storageService.getNotes(activeBookId));
  };

  const handleDeleteNote = (id: string) => {
    storageService.deleteNote(id);
    setNotes(storageService.getNotes(activeBookId));
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
    const recordWithBook: TestResultRecord = {
      ...record,
      sourceBookId: activeBookId,
    };
    storageService.saveTestResult(recordWithBook);
    setTestResults(storageService.getTestResults(activeBookId));

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
          sourceBookId: activeBookId,
        };
        storageService.recordAttempt(attempt);
      }
    }
    setAttempts(storageService.getAttempts(activeBookId));
  };

  const handleSaveTweSubmission = (sub: TweSubmission) => {
    const subWithBook: TweSubmission = {
      ...sub,
      sourceBookId: activeBookId,
    };
    storageService.saveTweSubmission(subWithBook);
    setTweSubmissions(storageService.getTweSubmissions(activeBookId));
  };

  const handleResumeLast = () => {
    if (lastLocation) {
      if (lastLocation.bookId && lastLocation.bookId !== activeBookId) {
        handleSelectBook(lastLocation.bookId);
      }
      if (lastLocation.lessonId) {
        handleStartLesson(lastLocation.lessonId);
      } else {
        handleSelectTab(lastLocation.tab);
      }
    }
  };

  // Find active lesson object
  const activeLesson =
    (activeLessonId ? bookContentService.getLessonById(activeLessonId, activeBookId) : null) ||
    currentLessons[0] ||
    ALL_LESSONS[0];

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
        activeBookId={activeBookId}
        books={allBooks}
        onSelectBook={handleSelectBook}
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
          activeBookId={activeBookId}
          books={allBooks}
          onSelectBook={handleSelectBook}
        />

        {/* Scrollable Content Stage */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              activeBookId={activeBookId}
              books={allBooks}
              onSelectBook={handleSelectBook}
              lessons={currentLessons}
              completedLessons={completedLessons}
              attempts={attempts}
              testResults={testResults}
              bookmarksCount={bookmarks.length}
              notesCount={notes.length}
              dailyMinutes={dailyMinutes}
              onNavigateTab={handleSelectTab}
              onStartLesson={handleStartLesson}
              onStartPracticeTest={(testId) => {
                const pt = currentPracticeTests.find((t) => t.id === testId) || currentPracticeTests[0];
                if (pt) handleStartFullPracticeTest(pt, 'dashboard');
              }}
            />
          )}

          {activeTab === 'books' && (
            <BookLibraryView
              books={allBooks}
              activeBookId={activeBookId}
              onSelectBook={handleSelectBook}
              getCompletedCount={(bId) => storageService.getCompletedLessons(bId).length}
              onContinueStudying={() => handleSelectTab('dashboard')}
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
              lessons={currentLessons}
              activeBookId={activeBookId}
            />
          )}

          {activeTab === 'structure' && (
            <SectionLessonsView
              section="structure"
              completedLessons={completedLessons}
              onStartLesson={handleStartLesson}
              onToggleBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked}
              lessons={currentLessons}
              activeBookId={activeBookId}
            />
          )}

          {activeTab === 'reading' && (
            <SectionLessonsView
              section="reading"
              completedLessons={completedLessons}
              onStartLesson={handleStartLesson}
              onToggleBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked}
              lessons={currentLessons}
              activeBookId={activeBookId}
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
              miniTests={currentMiniTests}
              activeBookId={activeBookId}
              bookTitle={currentBookMetadata.title}
            />
          )}

          {activeTab === 'practice-tests' && (
            <PracticeTestsView
              onStartFullTest={(pt) => handleStartFullPracticeTest(pt, 'practice-tests')}
              onStartSectionTest={handleStartSectionPracticeTest}
              testResults={testResults}
              practiceTests={currentPracticeTests}
              activeBookId={activeBookId}
              bookTitle={currentBookMetadata.title}
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
              activeBookId={activeBookId}
            />
          )}

          {activeTab === 'mistakes' && (
            <MistakeReviewView
              attempts={attempts}
              onToggleBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked}
              activeBookId={activeBookId}
            />
          )}

          {activeTab === 'progress' && (
            <ProgressView
              attempts={attempts}
              testResults={testResults}
              tweSubmissions={tweSubmissions}
              completedLessons={completedLessons}
              onNavigateToMistakes={() => handleSelectTab('mistakes')}
              activeBookId={activeBookId}
              books={allBooks}
              onSelectBook={handleSelectBook}
              lessons={currentLessons}
            />
          )}

          {activeTab === 'bookmarks' && (
            <BookmarksView
              bookmarks={bookmarks}
              onRemoveBookmark={handleToggleBookmark}
              activeBookId={activeBookId}
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
              activeBookId={activeBookId}
              onSaveNote={(note) => {
                storageService.saveNote(note);
                setNotes(storageService.getNotes(activeBookId));
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
        activeBookId={activeBookId}
        onSelectResult={(tab, id, bookId) => {
          if (bookId && bookId !== activeBookId) {
            handleSelectBook(bookId);
          }
          if (id && (id.includes('lesson') || id.includes('GRAMMAR') || id.includes('STYLE') || id.includes('LISTEN') || id.includes('READ'))) {
            handleStartLesson(id);
          } else {
            handleSelectTab(tab);
          }
        }}
      />
    </div>
  );
}
