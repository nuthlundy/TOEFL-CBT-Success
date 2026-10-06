/**
 * Mini-Lessons Data for Peterson's TOEFL CBT Success
 * Covers:
 * - Section 1: Idiomatic Expressions (Mini-Lessons 1.1 to 1.12)
 * - Section 2: Preposition Use (Mini-Lessons 2.1 to 2.8)
 * - Section 3: Vocabulary Building (Mini-Lessons 3.1 to 3.17)
 */

import { MiniLesson } from '../types/toefl';

export const SECTION1_MINI_LESSONS: MiniLesson[] = [
  {
    id: 'ml-1.1',
    section: 'listening',
    number: '1.1',
    title: 'Idiomatic Expressions: Above all to Break up',
    description: 'Covers essential Part A idioms including about to, add up, as a matter of fact, bank on, be my guest, and break down.',
    sourcePage: 93,
    terms: [
      { term: 'above all', definition: 'most importantly' },
      { term: 'about to', definition: 'almost ready to' },
      { term: 'add up', definition: 'make sense; be logical' },
      { term: 'all at once / all of a sudden', definition: 'suddenly; without warning' },
      { term: 'as a matter of fact', definition: 'in reality; actually' },
      { term: 'as a rule', definition: 'generally; customarily' },
      { term: 'at the drop of a hat', definition: 'quickly; without any preparation time' },
      { term: 'at ease', definition: 'not nervous; calm' },
      { term: 'back out (of)', definition: 'withdraw an offer' },
      { term: 'bank on', definition: 'depend on; count on' },
      { term: 'be my guest', definition: 'do what you want; feel free; help yourself' },
      { term: 'be rusty', definition: 'need practice or review' },
      { term: 'beats me', definition: "I don't know; I have no idea" },
      { term: 'better off', definition: 'in an improved condition' },
      { term: 'bite off more than one can chew', definition: 'take on more responsibility than one can handle' },
      { term: 'bound to', definition: 'certain to; sure to' },
      { term: 'break down', definition: 'stop functioning (e.g. machine)' },
      { term: 'break the ice', definition: 'break through social barriers' },
    ],
    exercise: {
      directions: 'Fill in the blank with the appropriate idiom.',
      questions: [
        {
          id: 'ML-1.1-Q01',
          sentence: '"Can you talk now?" "No, I\'m ________ to go to the grocery store, but I\'ll call you as soon as I get back."',
          choices: [
            { id: 'A', text: 'about' },
            { id: 'B', text: 'bank' },
            { id: 'C', text: 'rusty' },
            { id: 'D', text: 'bound' },
          ],
          correctAnswer: 'A',
          explanation: '"about to" means almost ready to.',
        },
        {
          id: 'ML-1.1-Q02',
          sentence: '"Will you support my proposal at the meeting?" "Certainly. You can ________ on my support."',
          choices: [
            { id: 'A', text: 'break' },
            { id: 'B', text: 'bank' },
            { id: 'C', text: 'add' },
            { id: 'D', text: 'bite' },
          ],
          correctAnswer: 'B',
          explanation: '"bank on" means depend on or count on.',
        },
      ],
    },
  },
  {
    id: 'ml-1.2',
    section: 'listening',
    number: '1.2',
    title: 'Idiomatic Expressions: Call it a day to Cut out for',
    description: 'Idioms from call it a day, call off, catch on, clear up, come down with, to cost an arm and a leg.',
    sourcePage: 95,
    terms: [
      { term: 'call it a day', definition: 'stop working for the day; go home' },
      { term: 'call off', definition: 'cancel' },
      { term: 'calm down', definition: 'relax' },
      { term: 'catch on', definition: 'become popular' },
      { term: 'catch up (with)', definition: 'go as fast as; catch' },
      { term: 'chip in', definition: 'contribute' },
      { term: 'clear up', definition: 'clarify or become sunny' },
      { term: 'come down with', definition: 'become sick with' },
      { term: 'cost an arm and a leg', definition: 'be very expensive' },
      { term: 'cut out for', definition: 'have an aptitude for; be qualified for' },
    ],
    exercise: {
      directions: 'Select the idiom that correctly completes the sentence.',
      questions: [
        {
          id: 'ML-1.2-Q01',
          sentence: 'The reception in the garden was ________ because of a thunderstorm.',
          choices: [
            { id: 'A', text: 'called off' },
            { id: 'B', text: 'called on' },
            { id: 'C', text: 'caught on' },
            { id: 'D', text: 'chipped in' },
          ],
          correctAnswer: 'A',
          explanation: '"called off" means cancelled due to the storm.',
        },
      ],
    },
  },
];

export const SECTION2_MINI_LESSONS: MiniLesson[] = [
  {
    id: 'ml-2.1',
    section: 'structure',
    number: '2.1',
    title: 'Prepositions: Adjectives & Participles with Prepositions (Part A)',
    description: 'Covers fixed collocations: acceptable to, accustomed to, afraid of, aware of, composed of, different from, familiar with, famous for.',
    sourcePage: 256,
    terms: [
      { term: 'acceptable to', definition: 'satisfactory to someone' },
      { term: 'accustomed to', definition: 'used to; familiar with' },
      { term: 'afraid of', definition: 'frightened by' },
      { term: 'aware of', definition: 'conscious of' },
      { term: 'composed of', definition: 'made up of' },
      { term: 'different from', definition: 'not identical with' },
      { term: 'equipped with', definition: 'supplied or furnished with' },
      { term: 'famous for', definition: 'renowned or celebrated for' },
    ],
    exercise: {
      directions: 'Fill in the blank with the correct preposition.',
      questions: [
        {
          id: 'ML-2.1-Q01',
          sentence: 'Washington State is famous ________ its apples.',
          choices: [
            { id: 'A', text: 'with' },
            { id: 'B', text: 'for' },
            { id: 'C', text: 'of' },
            { id: 'D', text: 'to' },
          ],
          correctAnswer: 'B',
          explanation: 'The adjective famous collogates with "for".',
        },
        {
          id: 'ML-2.1-Q02',
          sentence: 'Table salt is composed ________ two elements, sodium and chlorine.',
          choices: [
            { id: 'A', text: 'of' },
            { id: 'B', text: 'from' },
            { id: 'C', text: 'with' },
            { id: 'D', text: 'by' },
          ],
          correctAnswer: 'A',
          explanation: 'Composed is followed by the preposition "of".',
        },
      ],
    },
  },
  {
    id: 'ml-2.6',
    section: 'structure',
    number: '2.6',
    title: 'Prepositions: In, On, and At (Time & Place)',
    description: 'Time: in century/decade/year/month; on days/dates; at time/night. Place: in country/city/building; on street/floor; at address.',
    sourcePage: 261,
    terms: [
      { term: 'in (time)', definition: 'centuries, decades, years, seasons, months, parts of the day' },
      { term: 'on (time)', definition: 'days of the week, specific dates' },
      { term: 'at (time)', definition: 'clock time (at 6 pm, at noon, at night)' },
      { term: 'in (place)', definition: 'continents, countries, states, cities, buildings, rooms' },
      { term: 'on (place)', definition: 'streets, floors of a building, on Earth' },
      { term: 'at (place)', definition: 'exact street addresses (at 1600 Pennsylvania Avenue)' },
    ],
    exercise: {
      directions: 'Select the correct preposition (in, on, or at).',
      questions: [
        {
          id: 'ML-2.6-Q01',
          sentence: 'John F. Kennedy was the first president of the United States to be born ________ the twentieth century.',
          choices: [
            { id: 'A', text: 'in' },
            { id: 'B', text: 'on' },
            { id: 'C', text: 'at' },
          ],
          correctAnswer: 'A',
          explanation: '"In" is used for centuries, decades, and years.',
        },
      ],
    },
  },
];

export const SECTION3_MINI_LESSONS: MiniLesson[] = [
  {
    id: 'ml-3.1',
    section: 'reading',
    number: '3.1',
    title: 'Vocabulary Building: Abandon to Awkward',
    description: 'High-frequency TOEFL academic vocabulary with definitions and exact synonyms.',
    sourcePage: 337,
    terms: [
      { term: 'abandon', pos: 'v.', definition: 'desert, leave behind' },
      { term: 'able', pos: 'adj.', definition: 'capable, qualified, fit' },
      { term: 'acrid', pos: 'adj.', definition: 'bitter, sharp, biting' },
      { term: 'adverse', pos: 'adj.', definition: 'hostile, negative, contrary' },
      { term: 'affluent', pos: 'adj.', definition: 'rich, wealthy, prosperous' },
      { term: 'agile', pos: 'adj.', definition: 'graceful, nimble, lively' },
      { term: 'arduous', pos: 'adj.', definition: 'difficult, exhausting' },
      { term: 'arid', pos: 'adj.', definition: 'dry, barren' },
      { term: 'austere', pos: 'adj.', definition: 'strict, harsh, severe, stern' },
      { term: 'authentic', pos: 'adj.', definition: 'genuine, true' },
    ],
    exercise: {
      directions: 'Select the vocabulary word that best fits into the context.',
      questions: [
        {
          id: 'ML-3.1-Q01',
          sentence: 'Penicillin can have an ________ effect on a person who is allergic to it.',
          choices: [
            { id: 'A', text: 'adverse' },
            { id: 'B', text: 'anxious' },
            { id: 'C', text: 'awkward' },
          ],
          correctAnswer: 'A',
          explanation: 'An adverse effect is a harmful or negative reaction.',
        },
        {
          id: 'ML-3.1-Q02',
          sentence: 'Burning rubber produces an ________ smoke.',
          choices: [
            { id: 'A', text: 'austere' },
            { id: 'B', text: 'arid' },
            { id: 'C', text: 'acrid' },
          ],
          correctAnswer: 'C',
          explanation: 'Acrid means sharp, pungent, and biting in odor.',
        },
      ],
    },
  },
  {
    id: 'ml-3.2',
    section: 'reading',
    number: '3.2',
    title: 'Vocabulary Building: Baffle to Bulky',
    description: 'Academic verbs and adjectives: baffle, balmy, barren, barter, blend, bloom, brittle, bulky.',
    sourcePage: 339,
    terms: [
      { term: 'baffle', pos: 'v.', definition: 'confuse, puzzle, mystify' },
      { term: 'balmy', pos: 'adj.', definition: 'mild, warm' },
      { term: 'barren', pos: 'adj.', definition: 'sterile, unproductive, bleak, lifeless' },
      { term: 'brittle', pos: 'adj.', definition: 'fragile, breakable, weak' },
      { term: 'bulky', pos: 'adj.', definition: 'huge, large, clumsy' },
    ],
    exercise: {
      directions: 'Select the word that best fits.',
      questions: [
        {
          id: 'ML-3.2-Q01',
          sentence: 'The Virgin Islands, located in the Caribbean, have a ________ climate.',
          choices: [
            { id: 'A', text: 'blurry' },
            { id: 'B', text: 'brittle' },
            { id: 'C', text: 'balmy' },
          ],
          correctAnswer: 'C',
          explanation: 'Balmy means mild and comfortably warm.',
        },
      ],
    },
  },
];
