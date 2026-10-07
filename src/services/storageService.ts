/**
 * Storage Service for TOEFL CBT Success
 * Manages persistent user progress, error log, bookmarks, notes, and tests
 */

import { BookId, Bookmark, NoteItem, TestResultRecord, TweSubmission, UserAnswerAttempt } from '../types/toefl';

const STORAGE_KEYS = {
  ACTIVE_BOOK: 'toefl_cbt_active_book',
  ATTEMPTS: 'toefl_cbt_attempts',
  COMPLETED_LESSONS: 'toefl_cbt_completed_lessons',
  TEST_RESULTS: 'toefl_cbt_test_results',
  TWE_SUBMISSIONS: 'toefl_cbt_twe_submissions',
  BOOKMARKS: 'toefl_cbt_bookmarks',
  NOTES: 'toefl_cbt_notes',
  LAST_LOCATION: 'toefl_cbt_last_location',
  STUDY_GOAL_MINS: 'toefl_cbt_study_goal',
  TIME_SPENT_TODAY: 'toefl_cbt_time_spent_today',
  LAST_ACTIVE_DATE: 'toefl_cbt_last_date',
};

export const storageService = {
  // Active Book Selection
  getActiveBookId(): BookId {
    try {
      const bId = localStorage.getItem(STORAGE_KEYS.ACTIVE_BOOK);
      if (
        bId === 'PETERSONS-CBT-SUCCESS' ||
        bId === 'CLIFFS-TOEFL-PREPARATION-GUIDE' ||
        bId === 'CLIFFS-TOEFL-CBT'
      ) {
        return bId;
      }
      return 'PETERSONS-CBT-SUCCESS';
    } catch {
      return 'PETERSONS-CBT-SUCCESS';
    }
  },

  setActiveBookId(bookId: BookId): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_BOOK, bookId);
    } catch (e) {
      console.error('Failed to save active book', e);
    }
  },

  // Attempts & Mistakes (Isolated by bookId)
  getAttempts(bookId?: BookId | 'ALL'): UserAnswerAttempt[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
      const all: UserAnswerAttempt[] = data ? JSON.parse(data) : [];
      if (!bookId || bookId === 'ALL') {
        return all;
      }
      return all.filter((a) => (a.sourceBookId || 'PETERSONS-CBT-SUCCESS') === bookId);
    } catch {
      return [];
    }
  },

  recordAttempt(attempt: UserAnswerAttempt): void {
    const attempts = this.getAttempts('ALL');
    const enrichedAttempt = {
      ...attempt,
      sourceBookId: attempt.sourceBookId || this.getActiveBookId(),
    };
    const updated = [enrichedAttempt, ...attempts].slice(0, 2000);
    try {
      localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save attempt', e);
    }
  },

  getMistakes(bookId?: BookId | 'ALL'): UserAnswerAttempt[] {
    const attempts = this.getAttempts(bookId);
    const latestByQ = new Map<string, UserAnswerAttempt>();
    for (const att of attempts) {
      if (!latestByQ.has(att.questionId)) {
        latestByQ.set(att.questionId, att);
      }
    }
    return Array.from(latestByQ.values()).filter((att) => !att.isCorrect);
  },

  // Completed Lessons / Topics (Isolated by bookId)
  getCompletedLessons(bookId?: BookId): string[] {
    try {
      const targetBook = bookId || this.getActiveBookId();
      const key = `${STORAGE_KEYS.COMPLETED_LESSONS}_${targetBook}`;
      const data = localStorage.getItem(key);
      if (data) return JSON.parse(data);
      // Fallback for legacy Peterson key
      if (targetBook === 'PETERSONS-CBT-SUCCESS') {
        const legacyData = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
        return legacyData ? JSON.parse(legacyData) : [];
      }
      return [];
    } catch {
      return [];
    }
  },

  markLessonComplete(lessonId: string, bookId?: BookId): void {
    const targetBook = bookId || this.getActiveBookId();
    const current = new Set(this.getCompletedLessons(targetBook));
    current.add(lessonId);
    const key = `${STORAGE_KEYS.COMPLETED_LESSONS}_${targetBook}`;
    try {
      localStorage.setItem(key, JSON.stringify(Array.from(current)));
      if (targetBook === 'PETERSONS-CBT-SUCCESS') {
        localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(Array.from(current)));
      }
    } catch (e) {
      console.error(e);
    }
  },

  // Test Results
  getTestResults(bookId?: BookId | 'ALL'): TestResultRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TEST_RESULTS);
      const list: TestResultRecord[] = data ? JSON.parse(data) : [];
      if (!bookId || bookId === 'ALL') return list;
      return list.filter((r) => (r.sourceBookId || 'PETERSONS-CBT-SUCCESS') === bookId);
    } catch {
      return [];
    }
  },

  saveTestResult(result: TestResultRecord): void {
    const list = this.getTestResults('ALL');
    const enriched = {
      ...result,
      sourceBookId: result.sourceBookId || this.getActiveBookId(),
    };
    list.unshift(enriched);
    try {
      localStorage.setItem(STORAGE_KEYS.TEST_RESULTS, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  },

  // TWE
  getTweSubmissions(bookId?: BookId | 'ALL'): TweSubmission[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TWE_SUBMISSIONS);
      const list: TweSubmission[] = data ? JSON.parse(data) : [];
      if (!bookId || bookId === 'ALL') return list;
      return list.filter((s) => (s.sourceBookId || 'PETERSONS-CBT-SUCCESS') === bookId);
    } catch {
      return [];
    }
  },

  saveTweSubmission(sub: TweSubmission): void {
    const list = this.getTweSubmissions('ALL');
    const enriched = {
      ...sub,
      sourceBookId: sub.sourceBookId || this.getActiveBookId(),
    };
    list.unshift(enriched);
    try {
      localStorage.setItem(STORAGE_KEYS.TWE_SUBMISSIONS, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  },

  // Bookmarks
  getBookmarks(bookId?: BookId | 'ALL'): Bookmark[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      const list: Bookmark[] = data ? JSON.parse(data) : [];
      if (!bookId || bookId === 'ALL') return list;
      return list.filter((b) => (b.sourceBookId || 'PETERSONS-CBT-SUCCESS') === bookId);
    } catch {
      return [];
    }
  },

  toggleBookmark(bookmark: Bookmark): boolean {
    const list = this.getBookmarks('ALL');
    const enriched: Bookmark = {
      ...bookmark,
      sourceBookId: bookmark.sourceBookId || this.getActiveBookId(),
    };
    const idx = list.findIndex((b) => b.targetId === enriched.targetId);
    let isAdded = false;
    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      list.unshift(enriched);
      isAdded = true;
    }
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
    return isAdded;
  },

  isBookmarked(targetId: string): boolean {
    return this.getBookmarks('ALL').some((b) => b.targetId === targetId);
  },

  // Notes
  getNotes(bookId?: BookId | 'ALL'): NoteItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTES);
      const list: NoteItem[] = data ? JSON.parse(data) : [];
      if (!bookId || bookId === 'ALL') return list;
      return list.filter((n) => (n.sourceBookId || 'PETERSONS-CBT-SUCCESS') === bookId);
    } catch {
      return [];
    }
  },

  saveNote(note: NoteItem): void {
    const notes = this.getNotes('ALL');
    const enriched: NoteItem = {
      ...note,
      sourceBookId: note.sourceBookId || this.getActiveBookId(),
    };
    const idx = notes.findIndex((n) => n.id === enriched.id || n.targetId === enriched.targetId);
    if (idx >= 0) {
      notes[idx] = enriched;
    } else {
      notes.unshift(enriched);
    }
    try {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    } catch (e) {
      console.error(e);
    }
  },

  deleteNote(id: string): void {
    const notes = this.getNotes('ALL').filter((n) => n.id !== id);
    try {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    } catch (e) {
      console.error(e);
    }
  },

  // Navigation resume per book
  getLastLocation(bookId?: BookId): { tab: string; lessonId?: string; testId?: string; bookId?: BookId } | null {
    try {
      const targetBook = bookId || this.getActiveBookId();
      const key = `${STORAGE_KEYS.LAST_LOCATION}_${targetBook}`;
      const data = localStorage.getItem(key);
      if (data) return JSON.parse(data);
      if (targetBook === 'PETERSONS-CBT-SUCCESS') {
        const legacy = localStorage.getItem(STORAGE_KEYS.LAST_LOCATION);
        return legacy ? JSON.parse(legacy) : null;
      }
      return null;
    } catch {
      return null;
    }
  },

  setLastLocation(loc: { tab: string; lessonId?: string; testId?: string; bookId?: BookId }): void {
    try {
      const targetBook = loc.bookId || this.getActiveBookId();
      const key = `${STORAGE_KEYS.LAST_LOCATION}_${targetBook}`;
      localStorage.setItem(key, JSON.stringify({ ...loc, bookId: targetBook }));
      if (targetBook === 'PETERSONS-CBT-SUCCESS') {
        localStorage.setItem(STORAGE_KEYS.LAST_LOCATION, JSON.stringify(loc));
      }
    } catch (e) {
      console.error(e);
    }
  },

  // Time & Streak
  getDailyTimeSpent(): number {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE_DATE);
    if (lastDate !== today) {
      localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE_DATE, today);
      localStorage.setItem(STORAGE_KEYS.TIME_SPENT_TODAY, '0');
      return 0;
    }
    return parseInt(localStorage.getItem(STORAGE_KEYS.TIME_SPENT_TODAY) || '0', 10);
  },

  addTimeSpent(minutes: number): void {
    const cur = this.getDailyTimeSpent();
    localStorage.setItem(STORAGE_KEYS.TIME_SPENT_TODAY, String(cur + minutes));
  },
};
