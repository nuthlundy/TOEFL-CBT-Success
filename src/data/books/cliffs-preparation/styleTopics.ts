/**
 * Cliffs TOEFL Preparation Guide - Style in Written English
 * Source: Part III: Style in Written English (pp. 204–231)
 */

export interface StyleTopic {
  id: string; // e.g. "CLIFFS-PREP-STYLE-01"
  itemNumber: number;
  title: string;
  printedPages: number[];
  pdfPages: number[];
  rules: string[];
  examples: Array<{
    sentence: string;
    note?: string;
    isCorrect?: boolean;
  }>;
  exercises?: Array<{
    exerciseNumber: number;
    title: string;
    directions: string;
    printedPage: number;
    itemCount: number;
  }>;
}

export const CLIFFS_STYLE_TOPICS: StyleTopic[] = [
  {
    id: 'CLIFFS-PREP-STYLE-01',
    itemNumber: 1,
    title: 'Sequence of Tenses',
    printedPages: [204, 205, 206],
    pdfPages: [219, 220, 221],
    rules: [
      'When two clauses make up a sentence, the verb tense of the main clause determines the dependent clause tense.',
      'If main clause is present tense -> dependent can be present progressive, will/can/may + verb, past tense, or present perfect.',
      'If main clause is past tense -> dependent can be past progressive/simple past, would/could/might + verb, or past perfect. NO present form can come after past tense in the main clause.',
    ],
    examples: [
      { sentence: 'He says that he will look for a job next week.', note: 'Present main + modal' },
      { sentence: 'He said that he would look for a job next week.', note: 'Past main + past modal' },
      { sentence: 'They thought he had been here last night.', note: 'Past main + past perfect' },
    ],
    exercises: [
      { exerciseNumber: 44, title: 'Exercise 44: Sequence of Tenses', directions: 'Change main clause to past and adjust dependent clause.', printedPage: 206, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-STYLE-02',
    itemNumber: 2,
    title: 'Say and Tell',
    printedPages: [207, 208],
    pdfPages: [222, 223],
    rules: [
      'If there is an indirect object (the person to whom words are spoken), use "tell": subject + tell + indirect object + (that) + clause.',
      'If there is NO indirect object, use "say": subject + say + (that) + clause.',
      'Fixed expressions with "tell" (whether indirect object is present or not): a story, a joke, a secret, a lie, the truth, (the) time.',
    ],
    examples: [
      { sentence: 'John told a story last night. / John told us a story last night.', note: 'Tell with direct object "a story"' },
      { sentence: 'The little boy was punished because he told a lie.', note: 'Tell a lie' },
    ],
    exercises: [
      { exerciseNumber: 45, title: 'Exercise 45: Say/Tell', directions: 'Write the correct form of say or tell.', printedPage: 208, itemCount: 20 },
    ],
  },
  {
    id: 'CLIFFS-PREP-STYLE-03',
    itemNumber: 3,
    title: 'Antecedents of Pronouns',
    printedPages: [209, 210, 211],
    pdfPages: [224, 225, 226],
    rules: [
      'If a pronoun is used, there must be one clear noun of the same person and number before it (the antecedent).',
      'Avoid vague pronoun references like using "they" without mentioning people/members.',
      'Avoid ambiguous pronouns that could refer to either of two preceding nouns.',
    ],
    examples: [
      { sentence: 'The members of the admissions committee denied Henry admission because they did not believe he could handle the work load.', isCorrect: true, note: 'Clear antecedent "members"' },
    ],
    exercises: [
      { exerciseNumber: 46, title: 'Exercise 46: Antecedents of Pronouns', directions: 'Rewrite sentences so each pronoun has a clear antecedent.', printedPage: 210, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-STYLE-04',
    itemNumber: 4,
    title: 'The Pronouns One and You',
    printedPages: [211, 212],
    pdfPages: [226, 227],
    rules: [
      'If "one" is used, subsequent pronouns must also be "one", "one\'s", "he", or "his".',
      'If "you" is used, subsequent pronouns must be "you" or "your".',
      'NEVER shift between one and you or one and they in the same sentence.',
    ],
    examples: [
      { sentence: 'If one takes this exam without studying, one is likely to fail.', note: 'Consistent pronoun one' },
      { sentence: 'If you take this exam without studying, you are likely to fail.', note: 'Consistent pronoun you' },
    ],
    exercises: [],
  },
  {
    id: 'CLIFFS-PREP-STYLE-05',
    itemNumber: 5,
    title: 'Illogical Participial Modifiers (Dangling Participles)',
    printedPages: [212, 213, 214, 215, 216],
    pdfPages: [227, 228, 229, 230, 231],
    rules: [
      'An introductory participial phrase must be followed immediately by the noun logically responsible for the action.',
      'Dangling participles occur when the implied subject of the participle does not match the subject of the main clause.',
      'Passive participles can be reduced by dropping "having been" and using the past participle alone.',
    ],
    examples: [
      { sentence: 'After jumping out of the boat, the man was bitten by a shark.', isCorrect: true, note: 'The man jumped out of the boat' },
      { sentence: 'After jumping out of a boat, the shark bit the man.', isCorrect: false, note: 'Illogical: shark did not jump out of boat' },
    ],
    exercises: [
      { exerciseNumber: 47, title: 'Exercise 47: Illogical Participial Modifiers', directions: 'Correct illogical participial modifiers.', printedPage: 216, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-STYLE-06',
    itemNumber: 6,
    title: 'Participles as Adjectives (-ing vs. -ed)',
    printedPages: [216, 217, 218],
    pdfPages: [231, 232, 233],
    rules: [
      'Present participle [verb + ing]: Used when the noun performs or causes the action ("the crying baby", "the boring lecture").',
      'Past participle [verb + ed / en]: Used when the noun receives the action ("the sorted mail", "the bored students").',
    ],
    examples: [
      { sentence: 'The boring lecture put the students to sleep.', note: 'Lecture causes boredom (-ing)' },
      { sentence: 'The bored students went to sleep during the boring lecture.', note: 'Students receive boredom (-ed)' },
    ],
    exercises: [
      { exerciseNumber: 48, title: 'Exercise 48: Participles as Adjectives', directions: 'Choose correct participle form.', printedPage: 218, itemCount: 20 },
    ],
  },
  {
    id: 'CLIFFS-PREP-STYLE-07',
    itemNumber: 7,
    title: 'Redundancy',
    printedPages: [219, 220, 221],
    pdfPages: [234, 235, 236],
    rules: [
      'Avoid unnecessary repetition of meaning in words.',
      'Redundant pairs to eliminate: advance forward -> advance; return back -> return; sufficient enough -> sufficient; compete together -> compete; reason... because -> reason... that; join together -> join; repeat again -> repeat; new innovations -> innovations; matinee performance -> matinee; same identical -> same; two twins -> twins; the time when -> the time/when; the place where -> the place/where.',
    ],
    examples: [
      { sentence: 'The reason I want to take that class is that the professor is supposed to be very eloquent.', isCorrect: true, note: 'Reason... that (not reason... because)' },
    ],
    exercises: [
      { exerciseNumber: 49, title: 'Exercise 49: Redundancy', directions: 'Cross out redundant words.', printedPage: 220, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-STYLE-08',
    itemNumber: 8,
    title: 'Parallel Structure',
    printedPages: [221, 222, 223, 224],
    pdfPages: [236, 237, 238, 239],
    rules: [
      'When elements are joined in a list or series, all components must be grammatically parallel (noun with noun, adjective with adjective, infinitive with infinitive, gerund with gerund, past tense with past tense).',
    ],
    examples: [
      { sentence: 'Peter is rich, handsome, and popular.', isCorrect: true, note: 'Parallel adjectives' },
      { sentence: 'She likes to fish, to swim, and to surf.', isCorrect: true, note: 'Parallel infinitives' },
    ],
    exercises: [
      { exerciseNumber: 50, title: 'Exercise 50: Parallel Structure', directions: 'Change sentences so that they are parallel.', printedPage: 223, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-STYLE-09',
    itemNumber: 9,
    title: 'Transformation of Direct and Indirect Objects',
    printedPages: [224, 225, 226],
    pdfPages: [239, 240, 241],
    rules: [
      'Pattern 1: subject + verb + direct object + {to/for} + indirect object ("I gave the book to Dan").',
      'Pattern 2: subject + verb + indirect object + direct object ("I gave Dan the book" — NO preposition!).',
      'When both objects are pronouns: use Pattern 1 ("They gave it to us", NOT "They gave us it").',
      'Verbs "introduce" and "mention" MUST use preposition "to" and CANNOT undergo object transformation.',
    ],
    examples: [
      { sentence: 'The director’s secretary sent the manuscript to them last night.', isCorrect: true },
      { sentence: 'The director’s secretary sent them the manuscript last night.', isCorrect: true },
    ],
    exercises: [
      { exerciseNumber: 51, title: 'Exercise 51: Transformation of Direct and Indirect Object', directions: 'Rewrite placing indirect object immediately after verb.', printedPage: 226, itemCount: 10 },
      { exerciseNumber: 52, title: 'Exercise 52: Transformation of Direct and Indirect Object', directions: 'Rewrite placing direct object after verb with preposition.', printedPage: 226, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-STYLE-10',
    itemNumber: 10,
    title: 'Adverbials at the Beginning of a Sentence (Inversion)',
    printedPages: [227, 228, 229, 230, 231],
    pdfPages: [242, 243, 244, 245, 246],
    rules: [
      'When negative or limiting adverbials (hardly, rarely, seldom, never, only...) begin a sentence for emphasis, subject-auxiliary inversion is REQUIRED: {hardly/rarely/seldom/never/only...} + auxiliary + subject + verb.',
      'Elimination strategy in style questions: 1. Check faulty grammar; 2. Eliminate wordy/verbose answers; 3. Eliminate improper vocabulary; 4. Eliminate slang expressions.',
    ],
    examples: [
      { sentence: 'Hardly does Juan remember the accident that took his sister’s life.', note: 'Inverted: adverbial + does + Juan + remember' },
      { sentence: 'Never have so many people been unemployed as today.', note: 'Inverted: Never + have + so many people + been' },
    ],
    exercises: [
      { exerciseNumber: 53, title: 'Exercise 53: Adverbials at the Beginning of a Sentence', directions: 'Rewrite with adverbial at beginning.', printedPage: 228, itemCount: 10 },
    ],
  },
];
