/**
 * CliffsTestPrep TOEFL CBT - Style & Elimination Review
 * Source: Part III: Detailed Review of Items Tested - Style & Word Order (pp. 88–144)
 */

export interface CliffsCbtStyleTopic {
  id: string; // e.g. "CLIFFS-CBT-STYLE-01"
  itemNumber: number;
  title: string;
  rules: string[];
  examples: Array<{
    sentence: string;
    note?: string;
    isCorrect?: boolean;
  }>;
}

export const CLIFFS_CBT_STYLE_TOPICS: CliffsCbtStyleTopic[] = [
  {
    id: 'CLIFFS-CBT-STYLE-01',
    itemNumber: 1,
    title: 'Dangling and Misplaced Participial Modifiers',
    rules: [
      'An introductory verbal modifier must be immediately followed by the agent logically performing the action.',
      'If the logical subject is absent or misplaced after the comma, the modifier dangles.',
    ],
    examples: [
      { sentence: 'Having finished the lab experiment, the students recorded their data.', isCorrect: true, note: 'The students performed the experiment' },
      { sentence: 'Having finished the lab experiment, the data was recorded.', isCorrect: false, note: 'Dangling: data cannot finish an experiment' },
    ],
  },
  {
    id: 'CLIFFS-CBT-STYLE-02',
    itemNumber: 2,
    title: 'Parallelism in Series and Comparisons',
    rules: [
      'All items connected by coordinating conjunctions (and, but, or) or in a series must share identical grammatical form.',
      'Parallel nouns, parallel adjectives, parallel infinitives, or parallel gerunds.',
    ],
    examples: [
      { sentence: 'The candidate is articulate, energetic, and experienced.', isCorrect: true, note: 'Parallel adjectives' },
    ],
  },
  {
    id: 'CLIFFS-CBT-STYLE-03',
    itemNumber: 3,
    title: 'Redundancy and Wordiness Elimination',
    rules: [
      'Eliminate words that duplicate meaning (e.g. repeat again, join together, return back, advance forward, new innovations, sufficient enough).',
      'Prefer concise, direct phrasing over wordy periphrastic expressions.',
    ],
    examples: [
      { sentence: 'The committee joined the two proposals.', isCorrect: true, note: 'Not "joined together"' },
    ],
  },
  {
    id: 'CLIFFS-CBT-STYLE-04',
    itemNumber: 4,
    title: 'Inversion After Limiting and Negative Adverbials',
    rules: [
      'When negative or restrictive adverbials (hardly, scarcely, seldom, rarely, never, only with, not only) begin a sentence, subject and auxiliary must invert.',
      'Formula: Negative/Limiting Adverbial + Auxiliary + Subject + Main Verb.',
    ],
    examples: [
      { sentence: 'Only by rigorous testing can scientists verify the hypothesis.', isCorrect: true, note: 'Inverted: can + scientists + verify' },
      { sentence: 'Rarely have we witnessed such astronomical phenomena.', isCorrect: true, note: 'Inverted: have + we + witnessed' },
    ],
  },
];
