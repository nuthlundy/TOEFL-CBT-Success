/**
 * CliffsTestPrep TOEFL CBT - Book Metadata
 * Source: CliffsTestPrep™ TOEFL® CBT by Michael A. Pyle (IDG Books Worldwide, Inc., 2001)
 * ISBN: 0-7645-8609-2
 */

export interface CliffsCbtBookMetadata {
  id: 'CLIFFS-TOEFL-CBT';
  code: 'CLIFFS-CBT';
  title: 'CliffsTestPrep TOEFL CBT';
  shortTitle: 'CliffsTestPrep CBT';
  authors: string[];
  publisher: string;
  edition: string;
  copyrightYear: number;
  isbn: string;
  totalPdfPages: number;
  totalPrintedPages: number;
  format: 'CBT';
  historicalStatus: 'Computer-Based TOEFL (CBT) Standard Adaptive Format';
  partsCount: 4;
  parts: Array<{
    partNumber: string;
    title: string;
    description: string;
    pageRange: string;
  }>;
  summary: {
    totalReviewSections: number;
    totalStructureQuizzes: number;
    totalStructureQuizQuestions: number;
    totalReadingExercises: number;
    totalPracticeTests: number;
    totalPracticeTestQuestions: number;
    totalSampleEssayTopics: number;
  };
}

export const CLIFFS_CBT_METADATA: CliffsCbtBookMetadata = {
  id: 'CLIFFS-TOEFL-CBT',
  code: 'CLIFFS-CBT',
  title: 'CliffsTestPrep TOEFL CBT',
  shortTitle: 'CliffsTestPrep CBT',
  authors: ['Michael A. Pyle'],
  publisher: 'IDG Books Worldwide, Inc.',
  edition: '2001 Edition',
  copyrightYear: 2001,
  isbn: '0-7645-8609-2',
  totalPdfPages: 449,
  totalPrintedPages: 428,
  format: 'CBT',
  historicalStatus: 'Computer-Based TOEFL (CBT) Standard Adaptive Format',
  partsCount: 4,
  parts: [
    {
      partNumber: 'PART I',
      title: 'Introduction to the TOEFL Computer-Based Test',
      description: 'General description of the TOEFL CBT test, score usage by colleges, CBT vs PBT, computer tutorials, scoring scale (0–300 total, 0–30 section scales), FAQs, and overall approach.',
      pageRange: 'pp. 3–14',
    },
    {
      partNumber: 'PART II',
      title: 'Analysis of Exam Areas',
      description: 'Detailed analysis of basic skills, expectations, and patterned plans of attack for Listening (Part A Dialogues, Part B Talks/Lectures), Structure, Reading, and Writing sections.',
      pageRange: 'pp. 17–36',
    },
    {
      partNumber: 'PART III',
      title: 'Detailed Review of Items Tested',
      description: 'Review of Listening (tenses, passives, modals, conditionals, idioms, phrasal verbs), Structure (sentence structure, unusual subjects, complex sentences, reverse order, word order, word form, word choice, prepositions, missing/extra words with 6 Structure Quizzes), Reading (main ideas, prefixes, roots, suffixes, vocabulary context, referents), and Writing (scoring checklist, outline method, model essay, 10 topics).',
      pageRange: 'pp. 39–206',
    },
    {
      partNumber: 'PART IV',
      title: 'Putting It All Together: Practice Tests',
      description: 'Six full-length simulated CBT practice exams (Tests 1–6) complete with Listening, Structure, Reading, and Writing sections, answer keys, comprehensive author explanations, and score conversion tables.',
      pageRange: 'pp. 209–376',
    },
  ],
  summary: {
    totalReviewSections: 4,
    totalStructureQuizzes: 6,
    totalStructureQuizQuestions: 70, // Quiz 1: 10 Qs, Quiz 2: 12 Qs, Quiz 3: 12 Qs, Quiz 4: 12 Qs, Quiz 5: 12 Qs, Quiz 6: 12 Qs
    totalReadingExercises: 5, // Prefixes (25), Roots (20), Suffixes (25), Vocabulary (30), Practice Reading (23)
    totalPracticeTests: 6,
    totalPracticeTestQuestions: 647, // 6 CBT exams with 103-111 Qs each
    totalSampleEssayTopics: 10,
  },
};
