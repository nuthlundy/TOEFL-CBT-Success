/**
 * Peterson's TOEFL CBT Success - Type Definitions
 */

export type BookId =
  | 'PETERSONS-CBT-SUCCESS'
  | 'CLIFFS-TOEFL-PREPARATION-GUIDE'
  | 'CLIFFS-TOEFL-CBT';

export interface BookMetadata {
  id: BookId;
  code: string;
  title: string;
  shortTitle: string;
  author: string;
  publisher: string;
  edition?: string;
  publicationYear?: number;
  format: 'PBT' | 'CBT' | 'iBT';
  description: string;
  totalSections: number;
  totalLessons?: number;
  totalMiniTests?: number;
  totalPracticeTests?: number;
  status: 'ACTIVE' | 'PLANNED';
}

export type SectionType = 'listening' | 'structure' | 'reading' | 'twe';

export type QuestionType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'written_expression'
  | 'reading_passage_mc';

export interface AnswerChoice {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
}

export interface Question {
  id: string; // e.g. "LISTENING-L01-EX01-Q01" or "CLIFFS-PREP-PT01-SEC02-Q01"
  stem: string;
  choices: AnswerChoice[];
  correctAnswer: string; // e.g. "B"
  explanation?: string;
  skill: string;
  sourcePage?: number;
  sourcePdfPage?: number;
  sourceBook?: string; // e.g. "Peterson's TOEFL CBT Success"
  sourceBookId?: BookId;
  tapescript?: string;
  crossReferencePage?: number;
  status: 'VERIFIED' | 'NEEDS_REVIEW' | 'CONTENT_REVIEW_REQUIRED' | 'AUDIO_SOURCE_REQUIRED';
}

export interface ExampleItem {
  id: string;
  dialogue?: Array<{ speaker: string; text: string }>;
  prompt?: string;
  sentence?: string;
  passage?: string;
  choices?: AnswerChoice[];
  correctAnswer?: string;
  explanation: string;
  sourcePage?: number;
  sourcePdfPage?: number;
}

export interface ExerciseItem {
  id: string;
  title: string;
  focus: string;
  directions: string;
  hasAudio?: boolean;
  tapescriptNotice?: string;
  questions: Question[];
}

export interface Lesson {
  id: string;
  sourceBookId?: BookId;
  section: SectionType;
  part: string;
  lessonNumber: number;
  title: string;
  sourcePages: number[];
  sourcePdfPages?: number[];
  objective: string;
  summary: string;
  strategy: string[];
  examples: ExampleItem[];
  exercises: ExerciseItem[];
  status: 'VERIFIED' | 'READY';
}

export interface MiniLesson {
  id: string;
  sourceBookId?: BookId;
  section: SectionType;
  number: string; // "1.1", "2.1", "3.1"
  title: string;
  description: string;
  sourcePage: number;
  terms?: Array<{ term: string; definition: string; pos?: string }>;
  exercise: {
    directions: string;
    questions: Array<{
      id: string;
      sentence: string;
      choices?: AnswerChoice[];
      correctAnswer: string;
      explanation?: string;
    }>;
  };
}

export interface MiniTest {
  id: string;
  sourceBookId?: BookId;
  number: number;
  title: string;
  section: SectionType;
  timeLimitMinutes: number;
  sourcePage: number;
  instructions: string;
  questions: Question[];
  tapescripts?: Record<string, string>;
}

export interface PracticeTestSection {
  id: string;
  name: string;
  sectionType: SectionType;
  timeLimitMinutes: number;
  totalQuestions: number;
  instructions: string;
  questions: Question[];
  passages?: Array<{
    id: string;
    title: string;
    text: string;
    questionIds: string[];
    lineNumbered?: boolean;
  }>;
  tapescripts?: Record<string, string>;
}

export interface PracticeTest {
  id: string;
  sourceBookId?: BookId;
  number: number;
  title: string;
  sourcePages: { start: number; end: number };
  sections: {
    listening: PracticeTestSection;
    structure: PracticeTestSection;
    reading: PracticeTestSection;
  };
}

export interface UserAnswerAttempt {
  questionId: string;
  sourceBookId?: BookId;
  userAnswer: string;
  isCorrect: boolean;
  timestamp: number;
  section: SectionType;
  skill: string;
  sourcePage?: number;
  lessonId?: string;
}

export interface TestResultRecord {
  id: string;
  sourceBookId?: BookId;
  testId: string;
  testTitle: string;
  date: number;
  durationSeconds: number;
  sectionScores: {
    listening?: { raw: number; total: number; scaledRange: string };
    structure?: { raw: number; total: number; scaledRange: string };
    reading?: { raw: number; total: number; scaledRange: string };
  };
  totalScaledRange?: string;
  rawTotal: number;
  maxTotal: number;
  answers: Record<string, string>;
}

export interface TweSubmission {
  id: string;
  sourceBookId?: BookId;
  topicId: string;
  topicTitle: string;
  prompt: string;
  notes: string;
  essay: string;
  wordCount: number;
  timestamp: number;
  timeSpentSeconds: number;
  estimatedScore?: number;
  feedback?: {
    strengths: string[];
    weaknesses: string[];
    scoreDescription: string;
  };
}

export interface Bookmark {
  id: string;
  sourceBookId?: BookId;
  type: 'lesson' | 'topic' | 'question' | 'test' | 'vocabulary';
  targetId: string;
  title: string;
  section: SectionType;
  createdAt: number;
}

export interface NoteItem {
  id: string;
  sourceBookId?: BookId;
  targetId: string;
  title: string;
  content: string;
  section: SectionType;
  updatedAt: number;
}

export interface AuditItem {
  category: 'Section' | 'Lesson' | 'Exercise' | 'Question' | 'Mini-Test' | 'Practice Test' | 'TWE';
  id: string;
  title: string;
  sourcePage: string;
  status: 'VERIFIED' | 'NEEDS_REVIEW' | 'CONTENT_REVIEW_REQUIRED' | 'READY';
  notes: string;
}
