/**
 * CliffsTestPrep TOEFL CBT - Grammar Review Topics
 * Source: Part III: Detailed Review of Items Tested - Structure (pp. 63–152)
 */

export interface CliffsCbtGrammarTopic {
  id: string; // e.g. "CLIFFS-CBT-GRAMMAR-01"
  itemNumber: number;
  title: string;
  rules: string[];
  formulas?: string[];
  cbtTip?: string;
  examples: Array<{
    sentence: string;
    note?: string;
    isCorrect?: boolean;
  }>;
}

export const CLIFFS_CBT_GRAMMAR_TOPICS: CliffsCbtGrammarTopic[] = [
  {
    id: 'CLIFFS-CBT-GRAMMAR-01',
    itemNumber: 1,
    title: 'Sentence Structure and Clause Elements',
    rules: [
      'Every complete sentence in English requires a subject and a finite verb.',
      'In active voice sentences, normal order is Subject + Verb + Complement + Modifier.',
      'Modifiers (adverbs or prepositional phrases) must not separate the transitive verb from its direct object complement.',
    ],
    formulas: [
      'Subject + Verb + (Complement) + (Modifier of Manner) + (Modifier of Place) + (Modifier of Time)',
    ],
    cbtTip: 'On the CBT Structure section, questions are computer-adaptive. An early sentence structure error lowers the initial question difficulty tier.',
    examples: [
      { sentence: 'The committee approved the budget yesterday.', isCorrect: true, note: 'S + V + Direct Object + Modifier of Time' },
      { sentence: 'The committee approved yesterday the budget.', isCorrect: false, note: 'Incorrect: modifier separates verb and object' },
    ],
  },
  {
    id: 'CLIFFS-CBT-GRAMMAR-02',
    itemNumber: 2,
    title: 'Noun Phrases, Countability, and Quantifiers',
    rules: [
      'Count nouns have singular and plural forms (one book, two books). Non-count nouns cannot be made plural directly (information, evidence, homework, equipment, research).',
      'Quantifiers with count nouns: many, few, fewer...than, a number of.',
      'Quantifiers with non-count nouns: much, little, less...than, an amount of.',
      'Articles: a/an with singular count nouns; the with specific count and non-count nouns.',
    ],
    cbtTip: 'Look out for pluralized non-count nouns (e.g. informations, homeworks, researches), which are frequent distractors in CBT error recognition.',
    examples: [
      { sentence: 'She has less money and fewer expenses this month.', isCorrect: true, note: 'Less + non-count (money); fewer + plural count (expenses)' },
    ],
  },
  {
    id: 'CLIFFS-CBT-GRAMMAR-03',
    itemNumber: 3,
    title: 'Verb Tenses, Aspects, and Time Clues',
    rules: [
      'Simple Present: Habitual actions and general truths; stative verbs (know, believe, understand, recognize, seem).',
      'Present Progressive: Actions in progress now or planned future events.',
      'Simple Past vs Present Perfect: Simple past requires specific past time (yesterday, in 1995, last week). Present perfect connects past to present (since, for, already, yet).',
      'Past Perfect: Indicates an action completed before another past event (had + past participle).',
    ],
    formulas: [
      'had + [past participle] ... before + [simple past]',
      'after + had + [past participle] ... [simple past]',
    ],
    examples: [
      { sentence: 'John had finished the experiment before the professor arrived.', isCorrect: true },
    ],
  },
  {
    id: 'CLIFFS-CBT-GRAMMAR-04',
    itemNumber: 4,
    title: 'Subject-Verb Agreement and Complex Subjects',
    rules: [
      'Intervening prepositional phrases ("together with", "as well as", "accompanied by") do not alter the number of the subject.',
      'Indefinite pronouns (everyone, everybody, someone, nobody, each, either/neither alone) take singular verbs.',
      '"A number of + plural noun" takes a plural verb; "The number of + plural noun" takes a singular verb.',
      'Expressions of quantity, time, distance, and money take singular verbs when considered as a single unit.',
    ],
    examples: [
      { sentence: 'The director, accompanied by her assistants, is attending the seminar.', isCorrect: true, note: 'Singular subject "director" takes "is"' },
      { sentence: 'A number of participants have registered.', isCorrect: true, note: 'A number of = plural verb' },
    ],
  },
  {
    id: 'CLIFFS-CBT-GRAMMAR-05',
    itemNumber: 5,
    title: 'Modals, Perfectives, and Conditionals',
    rules: [
      'Modals (can, could, will, would, shall, should, may, might, must) are followed by the simple form of the verb.',
      'Real Conditionals: if + simple present ... {will/can/may} + simple form.',
      'Present Unreal Conditionals: if + simple past (were) ... {would/could/might} + simple form.',
      'Past Unreal Conditionals: if + had + past participle ... {would/could/might} + have + past participle.',
      'Must + perfective indicates a logical conclusion in the past ("It must have rained").',
      'Should + perfective indicates an unfulfilled obligation ("He should have studied").',
    ],
    examples: [
      { sentence: 'If I had known about the change, I would have arrived earlier.', isCorrect: true },
      { sentence: 'Had she submitted the application on time, she would have been accepted.', isCorrect: true, note: 'Inverted past conditional' },
    ],
  },
  {
    id: 'CLIFFS-CBT-GRAMMAR-06',
    itemNumber: 6,
    title: 'Subjunctive and Verbs of Demand',
    rules: [
      'Verbs of demand/urgency (advise, ask, demand, insist, propose, recommend, request, require, suggest, urge) take a that-clause with simple form of verb.',
      'Formula: subject + verb + that + subject + [simple verb] (no -s, no past tense, no modal).',
      'Impersonal adjectives: It + be + {essential/important/necessary/urgent/vital} + that + subject + [simple verb].',
    ],
    examples: [
      { sentence: 'The instructor insisted that the student submit the paper today.', isCorrect: true, note: 'Subjunctive simple form "submit"' },
      { sentence: 'It is essential that everyone be on time.', isCorrect: true, note: 'Subjunctive "be"' },
    ],
  },
  {
    id: 'CLIFFS-CBT-GRAMMAR-07',
    itemNumber: 7,
    title: 'Causatives and Verb Complements',
    rules: [
      'Have (active): have + person + [simple verb].',
      'Get (active): get + person + [to + verb].',
      'Have/Get (passive): have/get + thing + [past participle].',
      'Make (force): make + person + [simple verb].',
      'Let (allow): let + person + [simple verb].',
    ],
    examples: [
      { sentence: 'The professor had the research assistant compile the data.', isCorrect: true },
      { sentence: 'She got her mechanic to inspect the brakes.', isCorrect: true },
      { sentence: 'He had the document notarized before submitting it.', isCorrect: true },
    ],
  },
  {
    id: 'CLIFFS-CBT-GRAMMAR-08',
    itemNumber: 8,
    title: 'Relative Clauses, Reductions, and Connectors',
    rules: [
      'Who/whom for people; which/that for things; whose for possession.',
      'Reduced relative clauses: drop relative pronoun and "be" to create participial modifiers.',
      'Correlative connectors (both...and, not only...but also, either...or, neither...nor) must connect parallel grammatical structures.',
    ],
    examples: [
      { sentence: 'The scientist whose findings were published today won the award.', isCorrect: true },
      { sentence: 'The report written by the committee was approved.', isCorrect: true, note: 'Reduced passive relative clause' },
    ],
  },
];
