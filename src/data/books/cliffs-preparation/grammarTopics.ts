/**
 * Cliffs TOEFL Preparation Guide - Grammar Review Topics
 * Source: Part III: Subject Area Reviews (pp. 39–195)
 */

export interface GrammarTopic {
  id: string; // e.g. "CLIFFS-PREP-GRAMMAR-01"
  itemNumber: number;
  title: string;
  printedPages: number[];
  pdfPages: number[];
  rules: string[];
  formulas?: string[];
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

export const CLIFFS_GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'CLIFFS-PREP-GRAMMAR-01',
    itemNumber: 1,
    title: 'Rules and Method of Study',
    printedPages: [39],
    pdfPages: [54],
    rules: [
      'A rule in grammar is a generalization and formula accounting for how a construction usually behaves.',
      'Parentheses ( ) indicate optional usage in a rule.',
      'Braces { } indicate a choice between options (e.g. {has / have}).',
      'Study formulas and sample sentences, then complete practice exercises. Re-check cross-referenced pages for errors.',
    ],
    examples: [],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-03',
    itemNumber: 3,
    title: 'Normal Sentence Pattern in English',
    printedPages: [39, 40, 41, 42, 43],
    pdfPages: [54, 55, 56, 57, 58],
    rules: [
      'Normal English sentence pattern follows: Subject + Verb + Complement + Modifier.',
      'Subject: The agent of the sentence in active voice; performs or is responsible for the action. Must precede the verb (except commands where [you] is understood). Cannot begin with a preposition.',
      'Verb: Follows the subject in declarative sentences; shows action or state. May be single verb or auxiliary + main verb.',
      'Complement: Completes the verb. Answers "what?" or "whom?". Cannot begin with a preposition.',
      'Modifier: Tells time, place, or manner. Prepositional phrases or adverbs. Time modifier usually comes last. Modifier cannot separate verb and complement.',
    ],
    formulas: [
      'Subject + Verb + Complement + Modifier',
      'There + was/were + subject (pseudo-subject construction)',
      'It + verb (impersonal subject construction)',
    ],
    examples: [
      { sentence: 'John and I ate a pizza last night.', note: 'Subject: John and I | Verb: ate | Complement: a pizza | Modifier: last night' },
      { sentence: 'She drove the car on the street.', isCorrect: true, note: 'Correct modifier placement' },
      { sentence: 'She drove on the street the car.', isCorrect: false, note: 'Incorrect: modifier separates verb and complement' },
    ],
    exercises: [
      {
        exerciseNumber: 1,
        title: 'Exercise 1: Subject, Verb, Complement, and Modifier',
        directions: 'Identify the subject, verb, complement, and modifier in each sentence.',
        printedPage: 43,
        itemCount: 10,
      },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-04',
    itemNumber: 4,
    title: 'The Noun Phrase (Count/Non-Count, A/An, The, Other)',
    printedPages: [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
    pdfPages: [59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    rules: [
      'Count nouns can be counted with numbers (one book, two books). Non-count nouns cannot be counted directly (milk, sand, information, news, homework).',
      'Determiners with Count: a(n), the, some, any, this/that/these/those, many, a few, fewer...than, a number of.',
      'Determiners with Non-Count: the, some, any, this/that, much, a little, less...than, a large amount of.',
      'Irregular count plurals: person-people, child-children, tooth-teeth, foot-feet, mouse-mice, man-men, woman-women.',
      'Articles: "A" before consonant sounds (a university, a European); "An" before vowel sounds (an hour, an umbrella).',
      'Definite article "The": Used when specific/known to listener, unique items (the moon, the earth), oceans/rivers/seas/plural lakes/mountain ranges.',
      'Do NOT use "The" with singular lakes, mounts, planets/constellations, single continents/countries/states, sports, abstract nouns, academic subjects.',
      'Other forms: another (singular count), the other (specific last one), others (pronoun plural), the others (specific plural pronoun). "Other" cannot be plural when followed by a noun.',
    ],
    examples: [
      { sentence: 'I don’t want this book. Please give me another.', note: 'another = any other book (nonspecific)' },
      { sentence: 'I don’t want this book. Please give me the other.', note: 'the other = the specific other one' },
      { sentence: 'This chemical is poisonous. Others are poisonous too.', note: 'others = other chemicals (pronoun)' },
    ],
    exercises: [
      { exerciseNumber: 2, title: 'Exercise 2: Count and Non-Count Nouns', directions: 'Identify nouns as count or non-count.', printedPage: 46, itemCount: 16 },
      { exerciseNumber: 3, title: 'Exercise 3: Determiners', directions: 'Choose the correct determiners.', printedPage: 47, itemCount: 10 },
      { exerciseNumber: 4, title: 'Exercise 4: Articles', directions: 'Supply a, an, or the if necessary.', printedPage: 51, itemCount: 30 },
      { exerciseNumber: 5, title: 'Exercise 5: Other', directions: 'Fill in blanks with the appropriate form of other.', printedPage: 53, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-05',
    itemNumber: 5,
    title: 'The Verb Phrase (Tenses and Aspects)',
    printedPages: [54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67],
    pdfPages: [69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82],
    rules: [
      'Simple Present: Habitual actions or stative verbs (know, believe, hear, see, smell, hate, love, want, sound, have, need, appear, seem, taste, own). Stative verbs are rarely used in continuous aspects.',
      'Present Progressive: subject + {am/is/are} + [verb + ing] for actions happening right now or future plans.',
      'Simple Past: Completed action at a specific time in the past.',
      'Past Progressive: subject + {was/were} + [verb + ing]. Used for interrupted actions (when + simple past), parallel simultaneous actions (while + past progressive), or specific time in past.',
      'Present Perfect: subject + {has/have} + [past participle]. Indefinite past time, repeated past actions, or action starting in past and continuing to present (for + duration, since + point in time).',
      'Yet and Already: "already" in affirmative sentences; "yet" in negative sentences and questions.',
      'Past Perfect: subject + had + [past participle]. Indicates an action completed before another action in the past (before/after/when formulas).',
      'Past Perfect Progressive: subject + had + been + [verb + ing] for continuous actions continuing up to a past event.',
    ],
    examples: [
      { sentence: 'John had gone to the store before he went home.', note: '1st action: had gone | 2nd action: went' },
      { sentence: 'While Martha was watching television, John read a book.', note: 'Simultaneous past events' },
    ],
    exercises: [
      { exerciseNumber: 6, title: 'Exercise 6: Simple Present and Present Progressive', directions: 'Choose simple present or present progressive.', printedPage: 58, itemCount: 10 },
      { exerciseNumber: 7, title: 'Exercise 7: Simple Past Tense and Past Progressive', directions: 'Choose simple past or past progressive.', printedPage: 61, itemCount: 10 },
      { exerciseNumber: 8, title: 'Exercise 8: Present Perfect and Simple Past', directions: 'Choose present perfect or simple past.', printedPage: 65, itemCount: 10 },
      { exerciseNumber: 9, title: 'Exercise 9: Past Perfect and Simple Past', directions: 'Supply past perfect or simple past.', printedPage: 68, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-06',
    itemNumber: 6,
    title: 'Subject-Verb Agreement',
    printedPages: [68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78],
    pdfPages: [83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93],
    rules: [
      'Prepositional phrases between subject and verb have NO effect on verb number (e.g., "The study of languages is interesting").',
      'Expressions like "together with", "accompanied by", "along with", "as well as" do not make the subject plural.',
      'Words taking singular verbs: anyone, anybody, anything, everyone, everybody, everything, someone, somebody, something, no one, nobody, nothing, each, either/neither (alone).',
      'None/No: "none of the + non-count noun + singular verb"; "none of the + plural count noun + plural verb".',
      'Either/or and Neither/nor: The noun closest to the verb determines whether the verb is singular or plural.',
      'Gerunds as subjects always take singular verbs ("Dieting is very popular").',
      'Collective nouns (committee, jury, family, group, team, class, government) take singular verbs when acting as a unit.',
      'Measurements of time, money, and distance take singular verbs ("Twenty-five dollars is too much").',
      '"A number of + plural noun + plural verb" (meaning many); "The number of + plural noun + singular verb".',
      'Nouns always plural: scissors, shorts, pants, jeans, tongs, trousers, eyeglasses, pliers, tweezers (use "a pair of" for singular).',
      'There is / There are: Verb agrees with the noun following the verb.',
    ],
    examples: [
      { sentence: 'The actress, along with her manager and friends, is going to a party tonight.', note: 'Singular subject "actress" controls singular verb "is"' },
      { sentence: 'A number of students are going to the picnic.', note: 'A number of = plural' },
      { sentence: 'The number of days in a week is seven.', note: 'The number of = singular' },
    ],
    exercises: [
      { exerciseNumber: 10, title: 'Exercise 10: Subject-Verb Agreement', directions: 'Choose the correct form of the verb.', printedPage: 70, itemCount: 10 },
      { exerciseNumber: 11, title: 'Exercise 11: Subject-Verb Agreement', directions: 'Choose the correct form of the verb.', printedPage: 77, itemCount: 20 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-07',
    itemNumber: 7,
    title: 'Pronouns (Subject, Complement, Possessive, Reflexive)',
    printedPages: [78, 79, 80, 81, 82, 83],
    pdfPages: [93, 94, 95, 96, 97, 98],
    rules: [
      'Subject Pronouns: I, you, he, she, it, we, they. Used in subject position and after the verb "be" ("It was she who called you"). Also after than, as, that.',
      'Complement Pronouns: me, you, him, her, it, us, them. Used in object position and after prepositions.',
      'Possessive Adjectives (my, your, his, her, its, our, their) modify nouns. "Its" has no apostrophe; "It\'s" means it is/has.',
      'Possessive Pronouns (mine, yours, his, hers, its, ours, theirs) replace nouns and cannot precede a noun.',
      'Reflexive Pronouns (myself, yourself, himself, herself, itself, ourselves, yourselves, themselves). "Hisself" and "theirselves" are always incorrect.',
      '"By + reflexive pronoun" means alone ("John washed the dishes by himself").',
    ],
    examples: [
      { sentence: 'It was she who called you.', note: 'Subject pronoun after verb "be"' },
      { sentence: 'We students are going to have a party.', note: '"We" modifies student subject' },
    ],
    exercises: [
      { exerciseNumber: 12, title: 'Exercise 12: Pronouns', directions: 'Circle the correct pronoun form.', printedPage: 83, itemCount: 20 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-08',
    itemNumber: 8,
    title: 'Verbs as Complements (Infinitives and Gerunds)',
    printedPages: [83, 84, 85, 86, 87, 88, 89, 90],
    pdfPages: [98, 99, 100, 101, 102, 103, 104, 105],
    rules: [
      'Verbs followed ONLY by Infinitive: agree, attempt, claim, decide, demand, desire, expect, fail, forget, hesitate, hope, intend, learn, need, offer, plan, prepare, pretend, refuse, seem, strive, tend, want, wish.',
      'Verbs followed ONLY by Gerund: admit, appreciate, avoid, can’t help, consider, delay, deny, enjoy, finish, mind, miss, postpone, practice, quit, recall, report, resent, resist, resume, risk, suggest.',
      'Verbs + Prepositions followed by Gerund: approve of, be better off, count on, depend on, give up, insist on, keep on, put off, rely on, succeed in, think about, think of, worry about, object to, look forward to, confess to.',
      'Adjectives + Prepositions followed by Gerund: accustomed to, afraid of, capable of, fond of, intent on, interested in, successful in, tired of.',
      'Nouns + Prepositions followed by Gerund: choice of, excuse for, intention of, method for/of, possibility of, reason for.',
      'Adjectives followed by Infinitive: anxious, boring, dangerous, hard, eager, easy, good, strange, pleased, prepared, ready, able, difficult, usual, common.',
      'Pronouns before Gerund must be in Possessive form ("We don\'t approve of John\'s buying this house").',
      'Pronouns before Infinitive must be in Complement form ("Joe asked Mary to call him").',
    ],
    examples: [
      { sentence: 'John stopped studying.', note: 'Stopped the activity of studying' },
      { sentence: 'John stopped to study.', note: 'Stopped another activity in order to study' },
    ],
    exercises: [
      { exerciseNumber: 13, title: 'Exercise 13: Verbs as Complements', directions: 'Choose infinitive or gerund.', printedPage: 88, itemCount: 20 },
      { exerciseNumber: 14, title: 'Exercise 14: Pronouns with Verbs as Complements', directions: 'Choose correct pronoun form.', printedPage: 90, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-09',
    itemNumber: 9,
    title: 'The Verb Need and In Need Of',
    printedPages: [90, 91, 92],
    pdfPages: [105, 106, 107],
    rules: [
      'Animate subject + need + [verb in infinitive] ("John needs to paint the house").',
      'Inanimate subject + need + {[verb + ing] OR to be + [past participle]} ("The grass needs cutting" OR "The grass needs to be cut").',
      'In Need Of: subject + be + in need of + noun ("Jill is in need of money").',
    ],
    examples: [
      { sentence: 'The television needs repairing.', note: 'Inanimate subject + gerund' },
      { sentence: 'The television needs to be repaired.', note: 'Inanimate subject + to be + past participle' },
    ],
    exercises: [
      { exerciseNumber: 15, title: 'Exercise 15: Need', directions: 'Supply correct form of verb after need.', printedPage: 91, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-10',
    itemNumber: 10,
    title: 'Questions (Yes/No, Information, Embedded, Tag Questions)',
    printedPages: [92, 93, 94, 95, 96, 97, 98],
    pdfPages: [107, 108, 109, 110, 111, 112, 113],
    rules: [
      'Yes/No questions: {auxiliary / be / do, does, did} + subject + verb.',
      'Information questions: Who/what as subject takes direct verb without auxiliary ("Who opened the door?"). Whom/what as complement takes auxiliary ("Whom did George meet?").',
      'Embedded Questions: subject + verb + question word + subject + verb (NO auxiliary inversion!).',
      'Tag Questions: Same auxiliary/tense as main clause. Affirmative main -> negative tag; Negative main -> affirmative tag. Pronoun subject matching main clause.',
    ],
    examples: [
      { sentence: 'We haven’t ascertained where the meeting will take place.', note: 'Embedded: question word + subject + verb' },
      { sentence: 'There are only twenty-eight days in February, aren’t there?', note: 'Tag with pseudo-subject "there"' },
    ],
    exercises: [
      { exerciseNumber: 16, title: 'Exercise 16: Embedded Questions', directions: 'Complete sentences making embedded questions.', printedPage: 96, itemCount: 10 },
      { exerciseNumber: 17, title: 'Exercise 17: Tag Questions', directions: 'Finish sentences by adding tag questions.', printedPage: 98, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-11',
    itemNumber: 11,
    title: 'Affirmative and Negative Agreement (Too/So, Either/Neither)',
    printedPages: [98, 99, 100, 101, 102],
    pdfPages: [113, 114, 115, 116, 117],
    rules: [
      'Affirmative: and + {subject + auxiliary + too} OR and + {so + auxiliary + subject}.',
      'Negative: and + {subject + negative auxiliary + either} OR and + {neither + positive auxiliary + subject}.',
      'When main clause has single verb (not be), supply do, does, or did in agreement clause.',
    ],
    examples: [
      { sentence: 'They will work in the lab tomorrow, and you will too.', note: 'Affirmative agreement with too' },
      { sentence: 'They will work in the lab tomorrow, and so will you.', note: 'Affirmative agreement with so' },
      { sentence: 'I didn’t see Mary this morning, and John didn’t either.', note: 'Negative agreement with either' },
      { sentence: 'I didn’t see Mary this morning, and neither did John.', note: 'Negative agreement with neither' },
    ],
    exercises: [
      { exerciseNumber: 18, title: 'Exercise 18: Affirmative Agreement', directions: 'Supply correct verb form.', printedPage: 100, itemCount: 10 },
      { exerciseNumber: 19, title: 'Exercise 19: Negative Agreement', directions: 'Fill in either or neither.', printedPage: 101, itemCount: 10 },
      { exerciseNumber: 20, title: 'Exercise 20: Negative Agreement', directions: 'Supply correct auxiliary verb.', printedPage: 101, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-13',
    itemNumber: 13,
    title: 'Negation and Negative Words (Some/Any, Hardly, Barely, Seldom)',
    printedPages: [102, 103],
    pdfPages: [117, 118],
    rules: [
      'Use "some" in affirmative; "any" in negative sentences and questions.',
      'Double negatives are ungrammatical in standard English.',
      'Hardly, barely, scarcely (almost nothing/not at all) and rarely, seldom (almost never) have negative meaning and must be used with POSITIVE verbs.',
    ],
    examples: [
      { sentence: 'John rarely comes to class on time.', note: 'Positive verb with negative adverb' },
      { sentence: 'Jerry hardly studied last night.', note: 'Meaning: Jerry studied very little' },
    ],
    exercises: [],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-14',
    itemNumber: 14,
    title: 'Commands (Direct, Negative, and Indirect)',
    printedPages: [103, 104],
    pdfPages: [118, 119],
    rules: [
      'Direct command: Simple form of the verb with understood subject (you).',
      'Negative command: Don’t + [verb in simple form].',
      'Indirect command: order/ask/tell/say + complement + [to + verb].',
      'Negative indirect command: subject + verb + complement + not + [verb in infinitive].',
    ],
    examples: [
      { sentence: 'John told Mary not to close the door.', note: 'Negative indirect command' },
    ],
    exercises: [],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-15',
    itemNumber: 15,
    title: 'Modal Auxiliaries and Conditionals (Real, Unreal, As If, Hope/Wish)',
    printedPages: [112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133],
    pdfPages: [127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148],
    rules: [
      'Modals are followed directly by the simple form (never verb+ing, verb+s, or infinitive).',
      'Real Condition (Future): if + simple present ... {will/can/may/must} + simple form.',
      'Unreal Condition (Present/Future): if + simple past (were for all persons) ... {would/could/might} + simple form.',
      'Unreal Condition (Past): if + past perfect ... {would/could/might} + have + past participle. Can invert: Had + subject + past participle.',
      'As if / As though: Followed by past tense for present contrary-to-fact, or past perfect for past contrary-to-fact.',
      'Hope vs. Wish: "Hope" indicates something possible (can take present/future tenses). "Wish" indicates contrary-to-fact (NEVER followed by present tense verb).',
      'Used To: "used to + simple form" (past habit); "be/get used to + [verb + ing]" (accustomed to).',
      'Would Rather: "would rather + simple form than ..."; with 2 subjects: "would rather that subject2 + simple past" (present) or "past perfect" (past).',
      'Must vs. Have To: "Must" = obligation or logical conclusion. Past obligation MUST use "had to" (must + perfective means logical conclusion in past).',
      'Should + perfective: Unfulfilled past obligation (something supposed to happen that did not).',
    ],
    examples: [
      { sentence: 'If today were Saturday, we could go to the beach.', note: 'Unreal present condition with were' },
      { sentence: 'Had we known that you were there, we would have written you a letter.', note: 'Inverted past unreal conditional' },
      { sentence: 'The grass is wet. It must have rained last night.', note: 'Must + perfective = logical conclusion' },
      { sentence: 'I should have gone to the post office this morning.', note: 'Should + perfective = unfulfilled obligation' },
    ],
    exercises: [
      { exerciseNumber: 21, title: 'Exercise 21: Conditional Sentences', directions: 'Supply correct verb forms.', printedPage: 122, itemCount: 30 },
      { exerciseNumber: 22, title: 'Exercise 22: Used To', directions: 'Supply simple form or [verb+ing].', printedPage: 124, itemCount: 10 },
      { exerciseNumber: 23, title: 'Exercise 23: Would Rather', directions: 'Fill in correct form of verb.', printedPage: 127, itemCount: 10 },
      { exerciseNumber: 24, title: 'Exercise 24: Must/Should + Perfective', directions: 'Choose between must and should + perfective.', printedPage: 132, itemCount: 10 },
      { exerciseNumber: 25, title: 'Exercise 25: Modals + Perfective', directions: 'Choose correct modal construction.', printedPage: 133, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-16',
    itemNumber: 16,
    title: 'Adjectives and Adverbs (Descriptive, Limiting, Linking Verbs)',
    printedPages: [134, 135, 136, 137, 138],
    pdfPages: [149, 150, 151, 152, 153],
    rules: [
      'Adjectives modify nouns/pronouns and follow linking verbs. Never pluralize adjectives modifying plural nouns.',
      'Adverbs modify verbs, adjectives, or other adverbs (formed by adding -ly to adjective base).',
      'Linking (copulative) verbs (be, become, remain, stay, appear, seem, sound, feel, look, smell, taste) must be followed by predicate adjectives, NOT adverbs.',
      'When feel, look, smell, taste take direct objects, they function as action verbs and are modified by adverbs.',
    ],
    examples: [
      { sentence: 'Mary feels bad about her test grade.', note: 'Linking verb + adjective' },
      { sentence: 'The doctor felt the leg carefully.', note: 'Action verb + direct object + adverb' },
    ],
    exercises: [
      { exerciseNumber: 26, title: 'Exercise 26: Adjectives and Adverbs', directions: 'Circle correct form in parentheses.', printedPage: 135, itemCount: 10 },
      { exerciseNumber: 27, title: 'Exercise 27: Linking (Copulative) Verbs', directions: 'Circle correct form in parentheses.', printedPage: 137, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-17',
    itemNumber: 17,
    title: 'Comparisons (Equal, Unequal, Illogical, Double, No Sooner)',
    printedPages: [138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150],
    pdfPages: [153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165],
    rules: [
      'Equal: subject + verb + as + {adj/adv} + as + {noun/pronoun}. Or: the same + (noun) + as. Opposite: different from (NEVER different than).',
      'Unequal: {adj+er / more + adj} + than. Intensified by far or much before comparative.',
      'Illogical Comparisons: Compare like entities using possessives (\'s), that of (singular), or those of (plural).',
      'Multiple Number: number multiple (half, twice, three times) + as + {much/many} + (noun) + as.',
      'Double Comparatives: the + comparative + S + V, the + comparative + S + V ("The hotter it is, the more miserable I feel").',
      'No Sooner: No sooner + auxiliary + subject + verb + than + subject + verb.',
      'Superlatives: Used for 3 or more entities (the + adj+est / the most + adj). Comparative used for 2 entities (the + comparative + of the two).',
    ],
    examples: [
      { sentence: 'The salary of a professor is higher than that of a secretary.', note: 'Logical comparison with "that of"' },
      { sentence: 'No sooner had we started out for California than it started to rain.', note: 'Inverted auxiliary after no sooner' },
    ],
    exercises: [
      { exerciseNumber: 28, title: 'Exercise 28: Comparisons', directions: 'Supply correct comparative/superlative forms.', printedPage: 144, itemCount: 10 },
      { exerciseNumber: 29, title: 'Exercise 29: Comparisons', directions: 'Supply than, as, or from.', printedPage: 145, itemCount: 10 },
      { exerciseNumber: 30, title: 'Exercise 30: Comparisons', directions: 'Select correct form in parentheses.', printedPage: 149, itemCount: 20 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-18',
    itemNumber: 18,
    title: 'Nouns Functioning as Adjectives',
    printedPages: [150, 151],
    pdfPages: [165, 166],
    rules: [
      'When a noun modifies another noun, it functions as an adjective and is ALWAYS in the singular form ("a wool coat", "a history teacher").',
      'Number-noun combinations functioning as adjectives are hyphenated and singular ("a ten-minute call", "a five-week tour", "a twenty-dollar shoe").',
    ],
    examples: [
      { sentence: 'We took a five-week tour.', note: 'Hyphenated singular noun-adjective' },
    ],
    exercises: [
      { exerciseNumber: 31, title: 'Exercise 31: Nouns Functioning as Adjectives', directions: 'Supply appropriate noun-adjective form.', printedPage: 151, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-19',
    itemNumber: 19,
    title: 'Enough with Adjectives, Adverbs, and Nouns',
    printedPages: [152, 153],
    pdfPages: [167, 168],
    rules: [
      '{Adjective / Adverb} + enough ("crisp enough", "well enough", "cold enough").',
      'Enough + Noun ("enough sugar", "enough money").',
    ],
    examples: [
      { sentence: 'She speaks Spanish well enough to be an interpreter.', note: 'Adverb + enough' },
      { sentence: 'Do you have enough sugar for the cake?', note: 'Enough + noun' },
    ],
    exercises: [
      { exerciseNumber: 32, title: 'Exercise 32: Enough', directions: 'Choose correct word order with enough.', printedPage: 153, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-20',
    itemNumber: 20,
    title: 'Cause Connectors (Because/Because Of, So That, So/Such)',
    printedPages: [153, 154, 155, 156, 157, 158, 159],
    pdfPages: [168, 169, 170, 171, 172, 173, 174],
    rules: [
      'Because + clause (subject + verb).',
      'Because of + noun phrase (no conjugated verb). Due to is interchangeable.',
      'Purpose: subject + verb + so that + subject + verb.',
      'Cause and Effect with So: subject + verb + so + {adj/adv} + that + subject + verb.',
      'So + {many/few} + plural count noun + that; So + {much/little} + non-count noun + that.',
      'Cause and Effect with Such: such + a + adjective + singular count noun + that; such + adjective + {plural count / non-count noun} + that.',
    ],
    examples: [
      { sentence: 'Jan was worried because it had started to rain.', note: 'because + clause' },
      { sentence: 'Jan was worried because of the rain.', note: 'because of + noun phrase' },
      { sentence: 'The soprano sang so well that she received a standing ovation.', note: 'so + adverb + that' },
      { sentence: 'It was such a hot day that we decided to stay indoors.', note: 'such + a + adj + noun + that' },
    ],
    exercises: [
      { exerciseNumber: 33, title: 'Exercise 33: Because/Because Of', directions: 'Supply because or because of.', printedPage: 155, itemCount: 10 },
      { exerciseNumber: 34, title: 'Exercise 34: So/Such', directions: 'Use either so or such.', printedPage: 159, itemCount: 15 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-21',
    itemNumber: 21,
    title: 'Passive Voice',
    printedPages: [167, 168, 169, 170],
    pdfPages: [182, 183, 184, 185],
    rules: [
      'Passive form: subject + [be in appropriate tense] + [past participle] (+ by + agent).',
      'Simple present/past: {am/is/are/was/were} + past participle.',
      'Progressive: {am/is/are/was/were} + being + past participle.',
      'Perfect: {has/have/had} + been + past participle.',
      'Modals: modal + be + past participle; Modal Perfect: modal + have + been + past participle.',
    ],
    examples: [
      { sentence: 'A great deal of property is destroyed by hurricanes each year.', note: 'Simple present passive' },
      { sentence: 'Several new proposals are being considered by the committee.', note: 'Present progressive passive' },
    ],
    exercises: [
      { exerciseNumber: 35, title: 'Exercise 35: Passive Voice', directions: 'Change sentences from active to passive voice.', printedPage: 170, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-22',
    itemNumber: 22,
    title: 'Causative Verbs (Have, Get, Make, Let, Help)',
    printedPages: [170, 171, 172, 173, 174],
    pdfPages: [185, 186, 187, 188, 189],
    rules: [
      'Have (active): subject + have + person complement + [verb in simple form] ("Mary had John wash the car").',
      'Get (active): subject + get + person complement + [to + verb] ("Mary got John to wash the car").',
      'Have / Get (passive): subject + {have/get} + thing complement + [past participle] ("Mary got the car washed").',
      'Make (force): subject + make + complement + [verb in simple form] ("The robber made the teller give him the money").',
      'Let (allow/permit): subject + let + complement + [verb in simple form] ("John let his daughter swim").',
      'Help (assist): subject + help + complement + {[verb in simple form] OR [to + verb]}.',
    ],
    examples: [
      { sentence: 'The president had his advisors arrange a press conference.', note: 'Have + person + simple form' },
      { sentence: 'Pat is having her car repaired this week.', note: 'Have + thing + past participle' },
    ],
    exercises: [
      { exerciseNumber: 36, title: 'Exercise 36: Causative Verbs', directions: 'Use correct verb form in causative constructions.', printedPage: 174, itemCount: 15 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-23',
    itemNumber: 23,
    title: 'Relative Clauses and Clause Reduction',
    printedPages: [174, 175, 176, 177, 178, 179, 180, 181],
    pdfPages: [189, 190, 191, 192, 193, 194, 195, 196],
    rules: [
      'Pronouns: that (things/restrictive), which (things/nonrestrictive), who (people/subject), whom (people/complement), whose (possession).',
      'No duplicate object pronoun inside the relative clause ("This is the book that I bought at the bookstore", NOT "bought it").',
      'Who vs. Whom: who + verb; whom + noun (subject of clause). Preposition + whom.',
      'Restrictive: Essential to meaning (no commas); Nonrestrictive: Extra information (set off by commas).',
      'Relative Clause Reduction: Omit relative pronoun + be in passive (reduced to past participle), prepositional phrases, and progressive structures (reduced to present participle).',
    ],
    examples: [
      { sentence: 'The men who are in this room are angry.', note: 'Who as subject' },
      { sentence: 'The man whom we are going to recommend is John.', note: 'Whom as complement' },
      { sentence: 'George is the man chosen to represent the committee.', note: 'Reduced passive relative clause' },
    ],
    exercises: [
      { exerciseNumber: 37, title: 'Exercise 37: Relative Clauses', directions: 'Combine sentences into single sentences with relative clauses.', printedPage: 179, itemCount: 15 },
      { exerciseNumber: 38, title: 'Exercise 38: Relative Clause Reduction', directions: 'Reduce relative clauses.', printedPage: 180, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-24',
    itemNumber: 24,
    title: 'That—Other Uses (Optional That, Obligatory That, That Clauses)',
    printedPages: [181, 182, 183],
    pdfPages: [196, 197, 198],
    rules: [
      'Optional that after: say, tell, think, believe ("John said (that) he was leaving").',
      'Obligatory that after: mention, declare, report, state.',
      'That Clauses: Reversible noun clauses ("It is well known that many residents are dying" = "That many residents are dying is well known").',
    ],
    examples: [
      { sentence: 'The mayor declared that on June the first he would announce the results.', note: 'Obligatory that' },
      { sentence: 'That the earth revolves around the sun wasn’t believed until the fifteenth century.', note: 'That clause as subject' },
    ],
    exercises: [],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-25',
    itemNumber: 25,
    title: 'Subjunctive',
    printedPages: [183, 184, 185],
    pdfPages: [198, 199, 200],
    rules: [
      'Subjunctive uses the simple form of the verb in a that-clause after verbs of urgency/demand: advise, ask, command, decree, demand, insist, move, order, prefer, propose, recommend, request, require, stipulate, suggest, urge.',
      'Formula: subject + verb + that + subject + [verb in simple form] (never third person -s, past tense, or modal).',
      'Impersonal adjectives: It + be + {advised, important, mandatory, necessary, obligatory, proposed, recommended, required, suggested, urgent, imperative} + that + subject + [verb in simple form].',
    ],
    examples: [
      { sentence: 'The judge insisted that the jury return a verdict immediately.', note: 'Subjunctive simple form "return"' },
      { sentence: 'It is necessary that he find the books.', note: 'Impersonal subjunctive "find"' },
    ],
    exercises: [
      { exerciseNumber: 39, title: 'Exercise 39: Subjunctive', directions: 'Correct errors in subjunctive sentences.', printedPage: 184, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-26',
    itemNumber: 26,
    title: 'Inclusives (Not Only... But Also, As Well As, Both... And)',
    printedPages: [185, 186, 187, 188],
    pdfPages: [200, 201, 202, 203],
    rules: [
      'Not only... but also: Correlative conjunction connecting parallel entities (noun with noun, adjective with adjective, verb with verb, etc.).',
      'As well as: Connects parallel entities. When connecting subjects, verb agrees with the first subject ("The teacher, as well as her students, is going").',
      'Both... and: Connects two parallel entities. It is NEVER correct to say "both and as well as" in the same sentence.',
    ],
    examples: [
      { sentence: 'Robert is not only talented but also handsome.', note: 'Parallel adjectives' },
      { sentence: 'Paul Anka both plays the piano and composes music.', note: 'Parallel verbs' },
    ],
    exercises: [
      { exerciseNumber: 40, title: 'Exercise 40: Inclusives', directions: 'Supply missing connectors.', printedPage: 187, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-27',
    itemNumber: 27,
    title: 'Know and Know How',
    printedPages: [188, 189],
    pdfPages: [203, 204],
    rules: [
      'Know how + [verb in infinitive] indicates having the skill/ability to do something ("Maggie knows how to prepare Chinese food").',
      'Know + {noun / prepositional phrase / sentence} indicates possessing information ("Jason knew the answer to the question").',
    ],
    examples: [
      { sentence: 'Bill knows how to play tennis well.', note: 'Know how + infinitive' },
      { sentence: 'I didn’t know that you were going to France.', note: 'Know + that-clause' },
    ],
    exercises: [
      { exerciseNumber: 41, title: 'Exercise 41: Know/Know How', directions: 'Choose know or know how.', printedPage: 189, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-28',
    itemNumber: 28,
    title: 'Clauses of Concession (Despite/In Spite Of vs. Although/Even Though)',
    printedPages: [189, 190, 191],
    pdfPages: [204, 205, 206],
    rules: [
      'Prepositions: {despite / in spite of} + noun phrase ("Despite his physical handicap, he became successful").',
      'Subordinate Conjunctions: {although / even though / though} + clause (subject + verb).',
    ],
    examples: [
      { sentence: 'In spite of the bad weather, we had a picnic.', note: 'Preposition + noun phrase' },
      { sentence: 'Although the weather was very bad, we had a picnic.', note: 'Conjunction + clause' },
    ],
    exercises: [
      { exerciseNumber: 42, title: 'Exercise 42: Clauses of Concession', directions: 'Incorporate expressions in parentheses.', printedPage: 191, itemCount: 10 },
    ],
  },
  {
    id: 'CLIFFS-PREP-GRAMMAR-29',
    itemNumber: 29,
    title: 'Problem Verbs (Rise/Raise, Lie/Lay, Sit/Set)',
    printedPages: [191, 192, 193, 194, 195],
    pdfPages: [206, 207, 208, 209, 210],
    rules: [
      'Intransitive (no complement): Rise / rose / risen / rising (move up on own). Lie / lay / lain / lying (rest/repose). Sit / sat / sat / sitting (take seat).',
      'Transitive (requires complement): Raise / raised / raised / raising (lift an object). Lay / laid / laid / laying (put something on surface). Set / set / set / setting (put something in place).',
      'Idioms: lay off employees, set broken bones, set alarm, set fire to, raise chickens.',
    ],
    examples: [
      { sentence: 'The sun rises early in the summer.', note: 'Intransitive rise' },
      { sentence: 'The students raise their hands in class.', note: 'Transitive raise + complement' },
      { sentence: 'Don’t lay your clothes on the bed.', note: 'Transitive lay + complement' },
      { sentence: 'If the children are tired, they should lie down.', note: 'Intransitive lie' },
    ],
    exercises: [
      { exerciseNumber: 43, title: 'Exercise 43: Problem Verbs', directions: 'Circle correct form and underline complement.', printedPage: 195, itemCount: 10 },
    ],
  },
];
