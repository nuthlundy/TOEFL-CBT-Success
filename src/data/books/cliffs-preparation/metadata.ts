/**
 * Cliffs TOEFL Preparation Guide - Book Metadata
 * Source: Cliffs TOEFL Preparation Guide (5th Edition, 1995)
 */

export interface CliffsBookMetadata {
  id: 'CLIFFS-TOEFL-PREPARATION-GUIDE';
  code: 'CLIFFS-PBT';
  title: 'Cliffs TOEFL Preparation Guide: Test of English as a Foreign Language';
  shortTitle: 'Cliffs TOEFL Prep Guide';
  authors: string[];
  seriesEditor: string;
  publisher: string;
  edition: string;
  copyrightYear: number;
  previousEditions: number[];
  isbn: string;
  isbnEan: string;
  totalPdfPages: number;
  totalPrintedPages: number;
  format: 'PBT';
  historicalStatus: 'Paper-Based TOEFL (PBT) Standard Format';
  partsCount: 6;
  parts: Array<{
    partNumber: string;
    title: string;
    printedPageRange: string;
    pdfPageRange: string;
    description: string;
  }>;
  summary: {
    totalGrammarTopics: number;
    totalStyleTopics: number;
    totalExercises: number;
    totalMiniTests: number;
    totalMiniTestQuestions: number;
    totalPracticeTests: number;
    totalPracticeTestQuestions: number;
    totalTweTopics: number;
    totalSampleEssays: number;
  };
}

export const CLIFFS_PREPARATION_METADATA: CliffsBookMetadata = {
  id: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
  code: 'CLIFFS-PBT',
  title: 'Cliffs TOEFL Preparation Guide: Test of English as a Foreign Language',
  shortTitle: 'Cliffs TOEFL Prep Guide',
  authors: ['Michael A. Pyle, M.A.', 'Mary Ellen Muñoz Page, M.A.'],
  seriesEditor: 'Jerry Bobrow, Ph.D.',
  publisher: 'Cliffs Notes, Inc. / IDG Books Worldwide',
  edition: '5th Edition',
  copyrightYear: 1995,
  previousEditions: [1991, 1986, 1983, 1982],
  isbn: '0-8220-2081-5',
  isbnEan: '0-8220-2079-3',
  totalPdfPages: 674,
  totalPrintedPages: 659,
  format: 'PBT',
  historicalStatus: 'Paper-Based TOEFL (PBT) Standard Format',
  partsCount: 6,
  parts: [
    {
      partNumber: 'PART I',
      title: 'Introduction',
      printedPageRange: '3–13',
      pdfPageRange: '18–28',
      description: 'Format of Recent TOEFL Exams, General Description, Questions Commonly Asked, Taking the TOEFL: A Successful Overall Approach.',
    },
    {
      partNumber: 'PART II',
      title: 'Analysis of Exam Areas',
      printedPageRange: '17–35',
      pdfPageRange: '32–50',
      description: 'Detailed analysis of Section 1 (Listening), Section 2 (Structure & Written Expression), and Section 3 (Reading Comprehension) with Patterned Plans of Attack.',
    },
    {
      partNumber: 'PART III',
      title: 'Subject Area Reviews with Exercises and Mini-Tests',
      printedPageRange: '39–299',
      pdfPageRange: '54–314',
      description: 'Intensive 29-topic Grammar Review, Stylistic Problems Review, Problem Vocabulary & Prepositions, 57 Practice Exercises, and 6 Cumulative Mini-Tests.',
    },
    {
      partNumber: 'PART IV',
      title: 'Practice-Review-Analyze-Practice: Six Full-Length Practice Tests',
      printedPageRange: '303–494',
      pdfPageRange: '318–494',
      description: 'Six authentic simulated full-length TOEFL practice exams (140 questions each: 50 Listening, 40 Structure, 50 Reading).',
    },
    {
      partNumber: 'PART V',
      title: 'Listening Comprehension Scripts, Answers, and Explanations for Practice Tests 1 Through 6',
      printedPageRange: '495–629',
      pdfPageRange: '510–644',
      description: 'Complete tapescripts for all 6 tests, cross-referenced answer keys to Part III review pages, analysis-scoring sheets, converted score conversion tables, and detailed author explanations.',
    },
    {
      partNumber: 'PART VI',
      title: 'Test of Written English (TWE)',
      printedPageRange: '633–654',
      pdfPageRange: '648–668',
      description: 'Essay planning guides (standard and cluster outlines), 3 model sample essays with full paragraph breakdown, 10 authentic practice prompts (with charts/graphs), and 14-item essay evaluation scoring rubric.',
    },
  ],
  summary: {
    totalGrammarTopics: 29,
    totalStyleTopics: 10,
    totalExercises: 57,
    totalMiniTests: 6,
    totalMiniTestQuestions: 255, // Mini-Tests 1(50) + 2(50) + 3(50) + 4(50) + 5(30) + 6(25)
    totalPracticeTests: 6,
    totalPracticeTestQuestions: 840, // 6 tests * 140 questions
    totalTweTopics: 10,
    totalSampleEssays: 3,
  },
};
