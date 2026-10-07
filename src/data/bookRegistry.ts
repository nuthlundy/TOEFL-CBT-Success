/**
 * Multi-Book Source Registry
 * Central metadata foundation for supported TOEFL preparation books.
 */

import { BookMetadata, BookId } from '../types/toefl';

export const BOOK_REGISTRY: Record<BookId, BookMetadata> = {
  'PETERSONS-CBT-SUCCESS': {
    id: 'PETERSONS-CBT-SUCCESS',
    code: 'PETERSON-CBT',
    title: "Peterson's TOEFL CBT Success",
    shortTitle: "Peterson's CBT Success",
    author: 'Bruce Rogers',
    publisher: "Peterson's Guides / Thomson Learning",
    edition: '2002 Edition',
    publicationYear: 2002,
    format: 'CBT',
    description: 'Comprehensive preparation guide for the computer-based TOEFL exam with authentic dialogs, lectures, grammar lessons, and 3 full-length practice tests.',
    totalSections: 4,
    totalLessons: 48,
    totalMiniTests: 8,
    totalPracticeTests: 3,
    status: 'ACTIVE',
  },
  'CLIFFS-TOEFL-PREPARATION-GUIDE': {
    id: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
    code: 'CLIFFS-PBT',
    title: 'Cliffs TOEFL Preparation Guide',
    shortTitle: 'Cliffs TOEFL Prep Guide',
    author: 'Michael A. Pyle, M.A. & Mary Ellen Muñoz Page, M.A.',
    publisher: 'Cliffs Notes, Inc. / IDG Books',
    edition: '5th Edition',
    publicationYear: 1995,
    format: 'PBT',
    description: 'Classic grammar review, intensive pattern practice, problem areas in grammar and style, and 6 full-length simulated practice tests.',
    totalSections: 6,
    totalLessons: 39, // 29 Grammar + 10 Style topics
    totalMiniTests: 6,
    totalPracticeTests: 6,
    status: 'ACTIVE',
  },
  'CLIFFS-TOEFL-CBT': {
    id: 'CLIFFS-TOEFL-CBT',
    code: 'CLIFFS-CBT',
    title: 'CliffsTestPrep TOEFL CBT',
    shortTitle: 'CliffsTestPrep CBT',
    author: 'Michael A. Pyle',
    publisher: 'IDG Books Worldwide, Inc.',
    edition: '2001 Edition',
    publicationYear: 2001,
    format: 'CBT',
    description: 'Proven test-taking strategies for Computer-Based TOEFL (CBT), detailed reviews of Listening, Structure with 6 quizzes, Reading with 5 vocabulary/reading exercises, TWE scoring guide with model essays, and 6 full simulated practice exams with complete explanations and CD tapescripts.',
    totalSections: 4,
    totalLessons: 39,
    totalMiniTests: 6,
    totalPracticeTests: 6,
    status: 'ACTIVE',
  },
};

export const getAllBooks = (): BookMetadata[] => Object.values(BOOK_REGISTRY);

export const getBookById = (id: BookId): BookMetadata | undefined => BOOK_REGISTRY[id];

export const getActiveBook = (): BookMetadata => BOOK_REGISTRY['PETERSONS-CBT-SUCCESS'];
