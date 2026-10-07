/**
 * Central Multi-Book Content Provider Service
 * Connects and unifies content across:
 * 1. PETERSONS-CBT-SUCCESS
 * 2. CLIFFS-TOEFL-PREPARATION-GUIDE
 * 3. CLIFFS-TOEFL-CBT
 */

import { BookId, Lesson, MiniTest, PracticeTest, Question, SectionType } from '../types/toefl';
import { BOOK_REGISTRY, getAllBooks, getBookById } from '../data/bookRegistry';

// Source 1: Peterson Data
import { ALL_LESSONS as PETERSON_LESSONS } from '../data/lessonsData';
import { MINI_TESTS as PETERSON_MINI_TESTS } from '../data/miniTestsData';
import { PRACTICE_TESTS as PETERSON_PRACTICE_TESTS } from '../data/practiceTestsData';
import { TWE_PRACTICE_TOPICS as PETERSON_TWE_TOPICS } from '../data/tweData';

// Source 2: Cliffs Preparation Data
import {
  CLIFFS_PREPARATION_METADATA,
  CLIFFS_GRAMMAR_TOPICS as CLIFFS_PREP_GRAMMAR,
  CLIFFS_STYLE_TOPICS as CLIFFS_PREP_STYLE,
  CLIFFS_COMMONLY_MISUSED_WORDS as CLIFFS_PREP_MISUSED,
  CLIFFS_VERBAL_IDIOMS as CLIFFS_PREP_IDIOMS,
  CLIFFS_MINI_TESTS as CLIFFS_PREP_MINI_TESTS,
  CLIFFS_PRACTICE_TESTS as CLIFFS_PREP_PRACTICE_TESTS,
  CLIFFS_TWE_SAMPLE_ESSAYS as CLIFFS_PREP_TWE_SAMPLES,
  CLIFFS_TWE_PROMPTS as CLIFFS_PREP_TWE_PROMPTS,
} from '../data/books/cliffs-preparation';

// Source 3: Cliffs CBT Data
import {
  CLIFFS_CBT_METADATA,
  CLIFFS_CBT_GRAMMAR_TOPICS,
  CLIFFS_CBT_STYLE_TOPICS,
  CLIFFS_CBT_VOCABULARY,
  CLIFFS_CBT_MINI_TESTS,
  CLIFFS_CBT_PRACTICE_TESTS,
  CLIFFS_CBT_SAMPLE_ESSAYS,
  CLIFFS_CBT_TWE_PROMPTS,
} from '../data/books/cliffs-cbt';

// Convert Cliffs Prep topics to universal Lesson format
const convertCliffsPrepLessons = (): Lesson[] => {
  const lessons: Lesson[] = [];

  // 1. Listening Analysis Topic (Part II)
  lessons.push({
    id: 'CLIFFS-PREP-LESSON-LISTEN-01',
    sourceBookId: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
    section: 'listening',
    part: 'Part II: Analysis of Exam Areas',
    lessonNumber: 1,
    title: 'Listening Comprehension: Short Dialogs, Long Conversations, and Talks',
    sourcePages: [17, 18, 19, 20, 21, 22, 23, 24],
    objective: 'Master the listening strategies for Part A (Short Conversations), Part B (Long Conversations), and Part C (Oral Readings/Talks).',
    summary: 'The Listening section tests your ability to understand and interpret spoken English. Glancing at answer choices before each audio track enables focused listening for specific clues.',
    strategy: [
      'Skim the answer choices first to imagine the scenario and question type.',
      'Listen actively to the entire sentence or passage, noting key vocabulary clusters.',
      'Answer within the 12-second pause to preserve time for previewing the next item.',
    ],
    examples: [
      {
        id: 'CLIFFS-PREP-EG-L01',
        dialogue: [
          { speaker: 'Man', text: "I don't feel like going out tonight. Let's just stay home instead." },
          { speaker: 'Woman', text: 'OK, but I was looking forward to seeing that new movie about Alcatraz.' },
          { speaker: 'Third Voice', text: 'What does the man want to do tonight?' },
        ],
        choices: [
          { id: 'A', text: 'go to a party' },
          { id: 'B', text: 'stay home' },
          { id: 'C', text: 'see a movie' },
          { id: 'D', text: 'sleep' },
        ],
        correctAnswer: 'B',
        explanation: 'Answer (B) means most nearly the same as what the man said he would like to do ("stay home instead").',
        sourcePage: 18,
      },
    ],
    exercises: [],
    status: 'VERIFIED',
  });

  // 2. Grammar Review Topics (Part III)
  CLIFFS_PREP_GRAMMAR.forEach((gt) => {
    lessons.push({
      id: gt.id,
      sourceBookId: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
      section: 'structure',
      part: 'Part III: Grammar Review',
      lessonNumber: gt.itemNumber,
      title: gt.title,
      sourcePages: gt.printedPages,
      sourcePdfPages: gt.pdfPages,
      objective: `Understand the core grammatical generalizations, formulas, and usage rules for ${gt.title}.`,
      summary: gt.rules.slice(0, 2).join(' '),
      strategy: gt.rules,
      examples: gt.examples.map((eg, idx) => ({
        id: `${gt.id}-EG-${idx + 1}`,
        sentence: eg.sentence,
        explanation: eg.note || (eg.isCorrect ? 'Correct pattern' : 'Incorrect usage on TOEFL'),
        sourcePage: gt.printedPages[0],
      })),
      exercises: gt.exercises?.map((ex) => ({
        id: `${gt.id}-EX-${ex.exerciseNumber}`,
        title: ex.title,
        focus: gt.title,
        directions: ex.directions,
        questions: [],
      })) || [],
      status: 'VERIFIED',
    });
  });

  // 3. Style Review Topics (Part III)
  CLIFFS_PREP_STYLE.forEach((st) => {
    lessons.push({
      id: st.id,
      sourceBookId: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
      section: 'structure',
      part: 'Part III: Style in Written English',
      lessonNumber: 29 + st.itemNumber,
      title: st.title,
      sourcePages: st.printedPages,
      sourcePdfPages: st.pdfPages,
      objective: `Eliminate stylistic errors in formal written English: ${st.title}.`,
      summary: st.rules.slice(0, 2).join(' '),
      strategy: st.rules,
      examples: st.examples.map((eg, idx) => ({
        id: `${st.id}-EG-${idx + 1}`,
        sentence: eg.sentence,
        explanation: eg.note || (eg.isCorrect ? 'Stylistically correct' : 'Stylistic error'),
        sourcePage: st.printedPages[0],
      })),
      exercises: st.exercises?.map((ex) => ({
        id: `${st.id}-EX-${ex.exerciseNumber}`,
        title: ex.title,
        focus: st.title,
        directions: ex.directions,
        questions: [],
      })) || [],
      status: 'VERIFIED',
    });
  });

  // 4. Reading Comprehension Analysis (Part II)
  lessons.push({
    id: 'CLIFFS-PREP-LESSON-READ-01',
    sourceBookId: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
    section: 'reading',
    part: 'Part II: Analysis of Exam Areas',
    lessonNumber: 40,
    title: 'Reading Comprehension: Factual, Inference, and Vocabulary Questions',
    sourcePages: [29, 30, 31, 32, 33, 34, 35],
    objective: 'Learn the patterned plan of attack for reading passages, factual detail, NOT/EXCEPT questions, and vocabulary in context.',
    summary: 'The Reading Comprehension section tests college-level vocabulary, factual recall, inferences, and main ideas across science, history, and humanities topics.',
    strategy: [
      'Skim the questions first to note important nouns and verbs.',
      'Skim the passage quickly, reading the first sentence of each paragraph.',
      'Read actively, noting definitions, names, and contrast connectors.',
      'Answer questions without spending excess time on any single question.',
    ],
    examples: [],
    exercises: [],
    status: 'VERIFIED',
  });

  return lessons;
};

// Convert Cliffs CBT topics to universal Lesson format
const convertCliffsCbtLessons = (): Lesson[] => {
  const lessons: Lesson[] = [];

  // Listening CBT Analysis & Review (Part II & III, pp. 17–62)
  lessons.push({
    id: 'CLIFFS-CBT-LESSON-LISTEN-01',
    sourceBookId: 'CLIFFS-TOEFL-CBT',
    section: 'listening',
    part: 'Part II & III: CBT Listening Analysis & Review',
    lessonNumber: 1,
    title: 'CBT Listening: Computer-Adaptive Strategies and Audio Item Types',
    sourcePages: [17, 18, 19, 20, 21, 22, 23, 24, 25, 39, 40],
    objective: 'Navigate CBT computer-adaptive listening, dialogue cues, and academic lecture structures.',
    summary: 'CBT listening questions adjust difficulty dynamically. Visuals provide situational context. Pay close attention to tone, time indicators, and causal connectors.',
    strategy: [
      'Observe the photo/diagram for situational cues before the audio begins.',
      'Pay strict attention to verb tenses, passive voice reversals, and modal nuances.',
      'Confirm answers deliberately since CBT does not permit returning to previous listening items.',
    ],
    examples: [],
    exercises: [],
    status: 'VERIFIED',
  });

  // CBT Structure & Grammar Topics (Part III, pp. 63–152)
  CLIFFS_CBT_GRAMMAR_TOPICS.forEach((gt) => {
    lessons.push({
      id: gt.id,
      sourceBookId: 'CLIFFS-TOEFL-CBT',
      section: 'structure',
      part: 'Part III: Detailed Review of Items Tested - Structure',
      lessonNumber: gt.itemNumber,
      title: gt.title,
      sourcePages: [63 + gt.itemNumber * 7],
      objective: `Master ${gt.title} for the Computer-Adaptive Structure section.`,
      summary: gt.rules.join(' '),
      strategy: [...gt.rules, gt.cbtTip || ''],
      examples: gt.examples.map((eg, idx) => ({
        id: `${gt.id}-EG-${idx + 1}`,
        sentence: eg.sentence,
        explanation: eg.note || 'Standard CBT grammar pattern',
      })),
      exercises: [],
      status: 'VERIFIED',
    });
  });

  // CBT Style Topics (Part III, pp. 88–144)
  CLIFFS_CBT_STYLE_TOPICS.forEach((st) => {
    lessons.push({
      id: st.id,
      sourceBookId: 'CLIFFS-TOEFL-CBT',
      section: 'structure',
      part: 'Part III: Detailed Review of Items Tested - Style & Word Order',
      lessonNumber: 10 + st.itemNumber,
      title: st.title,
      sourcePages: [88 + st.itemNumber * 6],
      objective: `Apply elimination tactics to solve ${st.title} on CBT.`,
      summary: st.rules.join(' '),
      strategy: st.rules,
      examples: st.examples.map((eg, idx) => ({
        id: `${st.id}-EG-${idx + 1}`,
        sentence: eg.sentence,
        explanation: eg.note || 'CBT stylistic guideline',
      })),
      exercises: [],
      status: 'VERIFIED',
    });
  });

  // CBT Reading Analysis & Review (Part II & III, pp. 29–33, 153–200)
  lessons.push({
    id: 'CLIFFS-CBT-LESSON-READ-01',
    sourceBookId: 'CLIFFS-TOEFL-CBT',
    section: 'reading',
    part: 'Part II & III: CBT Reading Analysis & Vocabulary Review',
    lessonNumber: 20,
    title: 'CBT Reading: Main Ideas, Suffixes/Prefixes, and Context Clues',
    sourcePages: [29, 30, 31, 32, 33, 153, 154, 155],
    objective: 'Master reading strategies for main ideas, detail skimming, vocabulary in context, and pronoun referents on CBT.',
    summary: 'CBT reading is non-adaptive and allows backward/forward navigation within each passage. Analyze Greek and Latin roots and affixes to deduce unfamiliar word meanings.',
    strategy: [
      'Skim the entire passage first, focusing on the first sentence of each paragraph.',
      'For vocabulary questions, determine the part of speech and examine prefix/root/suffix elements.',
      'Use context definitions (appositives, relative clauses, contrasts) to verify word meaning.',
    ],
    examples: [],
    exercises: [],
    status: 'VERIFIED',
  });

  return lessons;
};

// Convert Cliffs Prep Mini-Tests to universal MiniTest format
const convertCliffsPrepMiniTests = (): MiniTest[] => {
  return CLIFFS_PREP_MINI_TESTS.map((mt) => ({
    id: mt.id,
    sourceBookId: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
    number: mt.testNumber,
    title: mt.title,
    section: mt.id.includes('05') || mt.id.includes('06') ? 'reading' : 'structure',
    timeLimitMinutes: mt.totalQuestions <= 30 ? 20 : 30,
    sourcePage: parseInt(mt.printedPageRange.split('–')[0], 10) || 105,
    instructions: mt.directions,
    questions: mt.questions,
  }));
};

// Convert Cliffs CBT Mini-Tests (Structure Quizzes 1–6) to universal MiniTest format
const convertCliffsCbtMiniTests = (): MiniTest[] => {
  return CLIFFS_CBT_MINI_TESTS.map((mt) => ({
    id: mt.id,
    sourceBookId: 'CLIFFS-TOEFL-CBT',
    number: mt.testNumber,
    title: mt.title,
    section: 'structure',
    timeLimitMinutes: 15,
    sourcePage: parseInt(mt.printedPageRange.split('–')[0], 10) || 69,
    instructions: mt.directions,
    questions: mt.questions,
  }));
};

// Convert Cliffs Prep Practice Tests to universal PracticeTest format
const convertCliffsPrepPracticeTests = (): PracticeTest[] => {
  return CLIFFS_PREP_PRACTICE_TESTS.map((pt) => ({
    id: pt.id,
    sourceBookId: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
    number: pt.testNumber,
    title: pt.title,
    sourcePages: {
      start: parseInt(pt.printedPageRange.split('–')[0], 10) || 315,
      end: parseInt(pt.printedPageRange.split('–')[1], 10) || 342,
    },
    sections: {
      listening: {
        id: `${pt.id}-SEC1`,
        name: pt.sections.listening.title,
        sectionType: 'listening',
        timeLimitMinutes: pt.sections.listening.timeLimitMinutes,
        totalQuestions: pt.sections.listening.totalQuestions,
        instructions: pt.sections.listening.instructions,
        questions: pt.sections.listening.questions.map((q) => ({
          ...q,
          skill: q.skill || 'Listening Comprehension',
          sourceBook: 'Cliffs TOEFL Preparation Guide',
          sourceBookId: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
        })),
        tapescripts: Object.fromEntries(
          Object.entries(pt.sections.listening.tapescripts || {}).map(([k, v]) => [k, v])
        ),
      },
      structure: {
        id: `${pt.id}-SEC2`,
        name: pt.sections.structure.title,
        sectionType: 'structure',
        timeLimitMinutes: pt.sections.structure.timeLimitMinutes,
        totalQuestions: pt.sections.structure.totalQuestions,
        instructions: pt.sections.structure.instructions,
        questions: pt.sections.structure.questions.map((q) => ({
          ...q,
          skill: q.skill || 'Structure & Written Expression',
          sourceBook: 'Cliffs TOEFL Preparation Guide',
          sourceBookId: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
        })),
      },
      reading: {
        id: `${pt.id}-SEC3`,
        name: pt.sections.reading.title,
        sectionType: 'reading',
        timeLimitMinutes: pt.sections.reading.timeLimitMinutes,
        totalQuestions: pt.sections.reading.totalQuestions,
        instructions: pt.sections.reading.instructions,
        questions: pt.sections.reading.questions.map((q) => ({
          ...q,
          skill: q.skill || 'Reading Comprehension',
          sourceBook: 'Cliffs TOEFL Preparation Guide',
          sourceBookId: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
        })),
        passages: pt.sections.reading.passages?.map((p) => ({
          id: p.id,
          title: p.title,
          text: p.text,
          questionIds: p.questionNumbers.map((n) => `CLIFFS-PREP-PT01-SEC03-Q${String(n).padStart(2, '0')}`),
          lineNumbered: true,
        })),
      },
    },
  }));
};

// Convert Cliffs CBT Practice Tests to universal PracticeTest format
const convertCliffsCbtPracticeTests = (): PracticeTest[] => {
  return CLIFFS_CBT_PRACTICE_TESTS.map((pt) => ({
    id: pt.id,
    sourceBookId: 'CLIFFS-TOEFL-CBT',
    number: pt.testNumber,
    title: pt.title,
    sourcePages: {
      start: parseInt(pt.printedPageRange.split('–')[0], 10) || 295,
      end: parseInt(pt.printedPageRange.split('–')[1], 10) || 340,
    },
    sections: {
      listening: {
        id: `${pt.id}-SEC1`,
        name: pt.sections.listening.title,
        sectionType: 'listening',
        timeLimitMinutes: pt.sections.listening.timeLimitMinutes,
        totalQuestions: pt.sections.listening.totalQuestions,
        instructions: pt.sections.listening.instructions,
        questions: pt.sections.listening.questions.map((q) => ({
          ...q,
          skill: q.skill || 'Listening Comprehension',
          sourceBook: 'CliffsTestPrep TOEFL CBT',
          sourceBookId: 'CLIFFS-TOEFL-CBT',
        })),
        tapescripts: Object.fromEntries(
          Object.entries(pt.sections.listening.tapescripts || {}).map(([k, v]) => [k, v])
        ),
      },
      structure: {
        id: `${pt.id}-SEC2`,
        name: pt.sections.structure.title,
        sectionType: 'structure',
        timeLimitMinutes: pt.sections.structure.timeLimitMinutes,
        totalQuestions: pt.sections.structure.totalQuestions,
        instructions: pt.sections.structure.instructions,
        questions: pt.sections.structure.questions.map((q) => ({
          ...q,
          skill: q.skill || 'Structure & Written Expression',
          sourceBook: 'CliffsTestPrep TOEFL CBT',
          sourceBookId: 'CLIFFS-TOEFL-CBT',
        })),
      },
      reading: {
        id: `${pt.id}-SEC3`,
        name: pt.sections.reading.title,
        sectionType: 'reading',
        timeLimitMinutes: pt.sections.reading.timeLimitMinutes,
        totalQuestions: pt.sections.reading.totalQuestions,
        instructions: pt.sections.reading.instructions,
        questions: pt.sections.reading.questions.map((q) => ({
          ...q,
          skill: q.skill || 'Reading Comprehension',
          sourceBook: 'CliffsTestPrep TOEFL CBT',
          sourceBookId: 'CLIFFS-TOEFL-CBT',
        })),
        passages: pt.sections.reading.passages?.map((p) => ({
          id: p.id,
          title: p.title,
          text: p.text,
          questionIds: p.questionNumbers.map((n) => `CLIFFS-CBT-PT01-SEC03-Q${String(n).padStart(2, '0')}`),
          lineNumbered: true,
        })),
      },
    },
  }));
};

export const bookContentService = {
  // Books list
  getBooks: () => getAllBooks(),
  getBookMetadata: (bookId: BookId) => getBookById(bookId) || BOOK_REGISTRY['PETERSONS-CBT-SUCCESS'],

  // Lessons / Topics
  getLessons(bookId: BookId): Lesson[] {
    switch (bookId) {
      case 'CLIFFS-TOEFL-PREPARATION-GUIDE':
        return convertCliffsPrepLessons();
      case 'CLIFFS-TOEFL-CBT':
        return convertCliffsCbtLessons();
      case 'PETERSONS-CBT-SUCCESS':
      default:
        return PETERSON_LESSONS.map((l) => ({
          ...l,
          sourceBookId: 'PETERSONS-CBT-SUCCESS',
        }));
    }
  },

  getLessonById(lessonId: string, bookId?: BookId): Lesson | undefined {
    if (bookId) {
      const lessons = this.getLessons(bookId);
      const found = lessons.find((l) => l.id === lessonId);
      if (found) return found;
    }
    // Search across all books
    const all = [
      ...this.getLessons('PETERSONS-CBT-SUCCESS'),
      ...this.getLessons('CLIFFS-TOEFL-PREPARATION-GUIDE'),
      ...this.getLessons('CLIFFS-TOEFL-CBT'),
    ];
    return all.find((l) => l.id === lessonId);
  },

  // Mini-Tests
  getMiniTests(bookId: BookId): MiniTest[] {
    switch (bookId) {
      case 'CLIFFS-TOEFL-PREPARATION-GUIDE':
        return convertCliffsPrepMiniTests();
      case 'CLIFFS-TOEFL-CBT':
        return convertCliffsCbtMiniTests();
      case 'PETERSONS-CBT-SUCCESS':
      default:
        return PETERSON_MINI_TESTS.map((mt) => ({
          ...mt,
          sourceBookId: 'PETERSONS-CBT-SUCCESS',
        }));
    }
  },

  // Practice Tests
  getPracticeTests(bookId: BookId): PracticeTest[] {
    switch (bookId) {
      case 'CLIFFS-TOEFL-PREPARATION-GUIDE':
        return convertCliffsPrepPracticeTests();
      case 'CLIFFS-TOEFL-CBT':
        return convertCliffsCbtPracticeTests();
      case 'PETERSONS-CBT-SUCCESS':
      default:
        return PETERSON_PRACTICE_TESTS.map((pt) => ({
          ...pt,
          sourceBookId: 'PETERSONS-CBT-SUCCESS',
        }));
    }
  },

  // TWE Prompts & Models
  getTweData(bookId: BookId) {
    switch (bookId) {
      case 'CLIFFS-TOEFL-PREPARATION-GUIDE':
        return {
          topics: CLIFFS_PREP_TWE_PROMPTS.map((p) => ({
            id: p.id,
            sourceBookId: 'CLIFFS-TOEFL-PREPARATION-GUIDE' as BookId,
            number: p.topicNumber,
            title: `Topic ${p.topicNumber}: ${p.prompt.slice(0, 45)}...`,
            category: 'Cliffs Preparation TWE Prompt',
            prompt: p.prompt,
            sourcePage: p.sourcePrintedPage,
          })),
          sampleEssays: CLIFFS_PREP_TWE_SAMPLES,
        };
      case 'CLIFFS-TOEFL-CBT':
        return {
          topics: CLIFFS_CBT_TWE_PROMPTS.map((p) => ({
            id: p.id,
            sourceBookId: 'CLIFFS-TOEFL-CBT' as BookId,
            number: p.topicNumber,
            title: `Topic ${p.topicNumber}: ${p.prompt.slice(0, 45)}...`,
            category: p.category,
            prompt: p.prompt,
            sourcePage: p.sourcePrintedPage,
          })),
          sampleEssays: CLIFFS_CBT_SAMPLE_ESSAYS,
        };
      case 'PETERSONS-CBT-SUCCESS':
      default:
        return {
          topics: PETERSON_TWE_TOPICS.map((t) => ({
            ...t,
            sourceBookId: 'PETERSONS-CBT-SUCCESS' as BookId,
          })),
          sampleEssays: [],
        };
    }
  },

  // Universal Question Search
  searchContent(
    query: string,
    bookFilter: BookId | 'ALL' = 'ALL',
    typeFilter: string = 'ALL'
  ): Array<{
    id: string;
    title: string;
    snippet: string;
    bookId: BookId;
    bookTitle: string;
    contentType: 'lesson' | 'topic' | 'test' | 'question' | 'grammar' | 'vocabulary' | 'writing';
    targetTab: string;
    targetId: string;
    sourcePage?: number | string;
  }> {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const results: Array<{
      id: string;
      title: string;
      snippet: string;
      bookId: BookId;
      bookTitle: string;
      contentType: 'lesson' | 'topic' | 'test' | 'question' | 'grammar' | 'vocabulary' | 'writing';
      targetTab: string;
      targetId: string;
      sourcePage?: number | string;
    }> = [];

    const booksToSearch: BookId[] =
      bookFilter === 'ALL'
        ? ['PETERSONS-CBT-SUCCESS', 'CLIFFS-TOEFL-PREPARATION-GUIDE', 'CLIFFS-TOEFL-CBT']
        : [bookFilter];

    booksToSearch.forEach((bId) => {
      const bMeta = BOOK_REGISTRY[bId];
      const lessons = this.getLessons(bId);
      const miniTests = this.getMiniTests(bId);
      const practiceTests = this.getPracticeTests(bId);
      const twe = this.getTweData(bId);

      // Search lessons
      if (typeFilter === 'ALL' || typeFilter === 'lessons') {
        lessons.forEach((l) => {
          if (
            l.title.toLowerCase().includes(q) ||
            l.objective.toLowerCase().includes(q) ||
            l.summary.toLowerCase().includes(q) ||
            l.strategy.some((s) => s.toLowerCase().includes(q))
          ) {
            results.push({
              id: l.id,
              title: l.title,
              snippet: l.objective || l.summary,
              bookId: bId,
              bookTitle: bMeta.shortTitle,
              contentType: bId === 'PETERSONS-CBT-SUCCESS' ? 'lesson' : 'topic',
              targetTab: 'lesson-player',
              targetId: l.id,
              sourcePage: l.sourcePages.join('–'),
            });
          }
        });
      }

      // Search Mini-Tests
      if (typeFilter === 'ALL' || typeFilter === 'tests') {
        miniTests.forEach((mt) => {
          if (mt.title.toLowerCase().includes(q) || mt.instructions.toLowerCase().includes(q)) {
            results.push({
              id: mt.id,
              title: mt.title,
              snippet: mt.instructions,
              bookId: bId,
              bookTitle: bMeta.shortTitle,
              contentType: 'test',
              targetTab: 'mini-tests',
              targetId: mt.id,
              sourcePage: mt.sourcePage,
            });
          }
        });

        practiceTests.forEach((pt) => {
          if (pt.title.toLowerCase().includes(q)) {
            results.push({
              id: pt.id,
              title: pt.title,
              snippet: `Full Exam covering Listening, Structure, and Reading.`,
              bookId: bId,
              bookTitle: bMeta.shortTitle,
              contentType: 'test',
              targetTab: 'practice-tests',
              targetId: pt.id,
              sourcePage: `${pt.sourcePages.start}–${pt.sourcePages.end}`,
            });
          }
        });
      }

      // Search Writing
      if (typeFilter === 'ALL' || typeFilter === 'writing') {
        twe.topics.forEach((t) => {
          if (t.title.toLowerCase().includes(q) || t.prompt.toLowerCase().includes(q)) {
            results.push({
              id: t.id,
              title: t.title,
              snippet: t.prompt,
              bookId: bId,
              bookTitle: bMeta.shortTitle,
              contentType: 'writing',
              targetTab: 'twe',
              targetId: t.id,
              sourcePage: t.sourcePage,
            });
          }
        });
      }
    });

    return results.slice(0, 40);
  },
};
