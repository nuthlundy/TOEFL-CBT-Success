/**
 * Storage Service for TOEFL CBT Success
 * Manages persistent user progress, error log, bookmarks, notes, and tests
 */

import { Bookmark, NoteItem, TestResultRecord, TweSubmission, UserAnswerAttempt } from '../types/toefl';

const STORAGE_KEYS = {
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
  // Attempts & Mistakes
  getAttempts(): UserAnswerAttempt[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  recordAttempt(attempt: UserAnswerAttempt): void {
    const attempts = this.getAttempts();
    // Keep last 1000 attempts
    const updated = [attempt, ...attempts].slice(0, 1000);
    try {
      localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save attempt', e);
    }
  },

  getMistakes(): UserAnswerAttempt[] {
    const attempts = this.getAttempts();
    // Group by questionId, if most recent attempt is incorrect
    const latestByQ = new Map<string, UserAnswerAttempt>();
    for (const att of attempts) {
      if (!latestByQ.has(att.questionId)) {
        latestByQ.set(att.questionId, att);
      }
    }
    return Array.from(latestByQ.values()).filter((att) => !att.isCorrect);
  },

  // Completed Lessons
  getCompletedLessons(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  markLessonComplete(lessonId: string): void {
    const current = new Set(this.getCompletedLessons());
    current.add(lessonId);
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(Array.from(current)));
    } catch (e) {
      console.error(e);
    }
  },

  // Test Results
  getTestResults(): TestResultRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TEST_RESULTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveTestResult(result: TestResultRecord): void {
    const list = this.getTestResults();
    list.unshift(result);
    try {
      localStorage.setItem(STORAGE_KEYS.TEST_RESULTS, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  },

  // TWE
  getTweSubmissions(): TweSubmission[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TWE_SUBMISSIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveTweSubmission(sub: TweSubmission): void {
    const list = this.getTweSubmissions();
    list.unshift(sub);
    try {
      localStorage.setItem(STORAGE_KEYS.TWE_SUBMISSIONS, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  },

  // Bookmarks
  getBookmarks(): Bookmark[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleBookmark(bookmark: Bookmark): boolean {
    const list = this.getBookmarks();
    const idx = list.findIndex((b) => b.targetId === bookmark.targetId);
    let isAdded = false;
    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      list.unshift(bookmark);
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
    return this.getBookmarks().some((b) => b.targetId === targetId);
  },

  // Notes
  getNotes(): NoteItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveNote(note: NoteItem): void {
    const notes = this.getNotes();
    const idx = notes.findIndex((n) => n.id === note.id || n.targetId === note.targetId);
    if (idx >= 0) {
      notes[idx] = note;
    } else {
      notes.unshift(note);
    }
    try {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    } catch (e) {
      console.error(e);
    }
  },

  deleteNote(id: string): void {
    const notes = this.getNotes().filter((n) => n.id !== id);
    try {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    } catch (e) {
      console.error(e);
    }
  },

  // Navigation resume
  getLastLocation(): { tab: string; lessonId?: string; testId?: string } | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LAST_LOCATION);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setLastLocation(loc: { tab: string; lessonId?: string; testId?: string }): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_LOCATION, JSON.stringify(loc));
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
