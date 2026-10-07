/**
 * Cliffs TOEFL Preparation Guide - Practice Tests 1 Through 6
 * Source: Part IV (pp. 303–494) & Part V (pp. 495–629)
 * Format: 6 Full-Length PBT Exams (140 questions per test: 50 Listening, 40 Structure, 50 Reading)
 */

import { SectionType } from '../../../types/toefl';

export interface CliffsPracticeTestQuestion {
  id: string; // e.g. "CLIFFS-PREP-PT01-SEC02-Q01"
  number: number;
  stem: string;
  choices: Array<{ id: string; text: string }>;
  correctAnswer: string;
  explanation?: string;
  crossReferencePage?: number;
  skill?: string;
  sourcePrintedPage: number;
  sourcePdfPage: number;
  sourceBook: 'CLIFFS-TOEFL-PREPARATION-GUIDE';
  status: 'VERIFIED' | 'AUDIO_SOURCE_REQUIRED' | 'CONTENT_REVIEW_REQUIRED';
}

export interface CliffsReadingPassage {
  id: string;
  title: string;
  text: string;
  questionNumbers: number[];
  sourcePrintedPage: number;
  sourcePdfPage: number;
}

export interface CliffsPracticeTestSection {
  sectionNumber: 1 | 2 | 3;
  sectionType: SectionType;
  title: string;
  timeLimitMinutes: number;
  totalQuestions: number;
  instructions: string;
  audioNotice?: string;
  tapescripts?: Record<number, string>;
  passages?: CliffsReadingPassage[];
  questions: CliffsPracticeTestQuestion[];
}

export interface CliffsPracticeTest {
  id: string; // "CLIFFS-PREP-PT01"
  testNumber: number;
  title: string;
  sourceBookId: 'CLIFFS-TOEFL-PREPARATION-GUIDE';
  printedPageRange: string;
  pdfPageRange: string;
  sections: {
    listening: CliffsPracticeTestSection;
    structure: CliffsPracticeTestSection;
    reading: CliffsPracticeTestSection;
  };
}

export const CLIFFS_PRACTICE_TESTS: CliffsPracticeTest[] = [
  {
    id: 'CLIFFS-PREP-PT01',
    testNumber: 1,
    title: 'Cliffs Practice Test 1 (Full PBT Exam)',
    sourceBookId: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
    printedPageRange: '315–342',
    pdfPageRange: '330–357',
    sections: {
      listening: {
        sectionNumber: 1,
        sectionType: 'listening',
        title: 'Section 1: Listening Comprehension',
        timeLimitMinutes: 30,
        totalQuestions: 50,
        instructions: 'Section 1 has three parts: Part A (Short Conversations), Part B (Longer Conversations), Part C (Oral Talks/Lectures). You will hear each conversation or talk spoken once.',
        audioNotice: 'AUDIO_SOURCE_REQUIRED: Listening audio tracks were originally published on cassette tapes. Authentic verbatim tapescripts are provided in Part V (pp. 501–508).',
        tapescripts: {
          1: "Man: I hear Jan isn't teaching here this term.\nWoman: That's right. She was fired.\nThird Voice: What does the woman say about Jan?",
          2: "Man: Nancy, I heard you were late for class this morning.\nWoman: I overslept and missed the bus.\nThird Voice: Why does the woman say she was late?",
          3: "Woman: I heard on the radio that the eastbound lanes of Interstate 4 are closed.\nMan: Yes, a tractor-trailer jackknifed and caused a huge pileup.\nThird Voice: What are the speakers discussing?",
          4: "Man: What do you think of Professor Conrad's class?\nWoman: Well, his lectures are interesting enough, but I think he could choose more appropriate questions for the tests.\nThird Voice: What does the woman say about Professor Conrad's class?",
          5: "Woman: Are you going to watch the movie on TV tonight?\nMan: No, I think I'll watch the soccer game and then the documentary on volcanoes.\nThird Voice: What does the man say is the first program he is planning to watch?",
          6: "Man: Where did Suzanne come from?\nWoman: She was born in Switzerland and grew up in Sweden, but she's a citizen of England.\nThird Voice: Which country does the woman say is Suzanne's present home?",
          7: "Woman: Karen is entering Stetson University this fall.\nMan: So she did apply.\nThird Voice: What had the man assumed about Karen?",
          8: "Man: Why are you wearing that cream all over your arms?\nWoman: I ate wild berries at the picnic last week, and I broke out in a rash.\nThird Voice: What does the woman say happened to her?",
          9: "Woman: Would you please spell your name for me, sir?\nMan: Sure. W-I-double T-N-E-R.\nThird Voice: How does the man say he spells his last name?",
          10: "Woman: I have to go out of town for a meeting tomorrow, and I need somebody to work for me.\nMan: Sure. I could use the extra hours!\nThird Voice: What is the man probably going to do?",
        },
        questions: [
          {
            id: 'CLIFFS-PREP-PT01-SEC01-Q01',
            number: 1,
            stem: '(A) She’s tired of teaching.\n(B) She was dismissed from her job.\n(C) She’s changing jobs.\n(D) The school is too hot.',
            choices: [
              { id: 'A', text: 'She’s tired of teaching.' },
              { id: 'B', text: 'She was dismissed from her job.' },
              { id: 'C', text: 'She’s changing jobs.' },
              { id: 'D', text: 'The school is too hot.' },
            ],
            correctAnswer: 'B',
            explanation: 'The woman states "She was fired", which means she was dismissed from her job (B).',
            skill: 'Short Dialogs / Synonyms',
            sourcePrintedPage: 316,
            sourcePdfPage: 331,
            sourceBook: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
            status: 'VERIFIED',
          },
          {
            id: 'CLIFFS-PREP-PT01-SEC01-Q02',
            number: 2,
            stem: '(A) She got up later than usual.\n(B) The bus was late.\n(C) She forgot her class.\n(D) Her clock was wrong.',
            choices: [
              { id: 'A', text: 'She got up later than usual.' },
              { id: 'B', text: 'The bus was late.' },
              { id: 'C', text: 'She forgot her class.' },
              { id: 'D', text: 'Her clock was wrong.' },
            ],
            correctAnswer: 'A',
            explanation: '"I overslept" means she got up later than usual (A).',
            skill: 'Idiomatic Expressions',
            sourcePrintedPage: 316,
            sourcePdfPage: 331,
            sourceBook: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
            status: 'VERIFIED',
          },
        ],
      },
      structure: {
        sectionNumber: 2,
        sectionType: 'structure',
        title: 'Section 2: Structure and Written Expression',
        timeLimitMinutes: 25,
        totalQuestions: 40,
        instructions: 'Questions 1–15 are incomplete sentences. Choose the one word or phrase that best completes the sentence. Questions 16–40 consist of sentences with four underlined portions; identify the one underlined portion that must be changed.',
        questions: [
          {
            id: 'CLIFFS-PREP-PT01-SEC02-Q01',
            number: 1,
            stem: 'After the funeral, the residents of the apartment building ________.',
            choices: [
              { id: 'A', text: 'sent faithfully flowers all weeks to the cemetery' },
              { id: 'B', text: 'sent to the cemetery each week flowers faithfully' },
              { id: 'C', text: 'sent flowers faithfully to the cemetery each week' },
              { id: 'D', text: 'sent each week faithfully to the cemetery flowers' },
            ],
            correctAnswer: 'C',
            crossReferencePage: 39,
            explanation: '(C) The word order should be: subject + verb + complement + modifier of manner + modifier of place + modifier of time (p. 39).',
            skill: 'Normal Sentence Pattern / Modifier Order',
            sourcePrintedPage: 324,
            sourcePdfPage: 339,
            sourceBook: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
            status: 'VERIFIED',
          },
          {
            id: 'CLIFFS-PREP-PT01-SEC02-Q02',
            number: 2,
            stem: 'Because the first pair of pants did not fit properly, he asked for ________.',
            choices: [
              { id: 'A', text: 'another pants' },
              { id: 'B', text: 'others pants' },
              { id: 'C', text: 'the others ones' },
              { id: 'D', text: 'another pair' },
            ],
            correctAnswer: 'D',
            crossReferencePage: 52,
            explanation: '(D) Choice (A) is incorrect because another is singular and pants is plural. (B) and (C) are incorrect because other cannot be used in the plural form when it is functioning as an adjective. (D) is correct; pair is preceded by singular article (an + other pair) (p. 52).',
            skill: 'Other / Determiners',
            sourcePrintedPage: 324,
            sourcePdfPage: 339,
            sourceBook: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
            status: 'VERIFIED',
          },
          {
            id: 'CLIFFS-PREP-PT01-SEC02-Q03',
            number: 3,
            stem: 'The committee has met and ________.',
            choices: [
              { id: 'A', text: 'they have reached a decision' },
              { id: 'B', text: 'it has formulated themselves some opinions' },
              { id: 'C', text: 'its decision was reached at' },
              { id: 'D', text: 'it has reached a decision' },
            ],
            correctAnswer: 'D',
            crossReferencePage: 74,
            explanation: '(D) Committee is singular, so the pronoun that follows it must be it and the verb must be has (pp. 74–75).',
            skill: 'Collective Nouns & Pronoun Agreement',
            sourcePrintedPage: 325,
            sourcePdfPage: 340,
            sourceBook: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
            status: 'VERIFIED',
          },
          {
            id: 'CLIFFS-PREP-PT01-SEC02-Q16',
            number: 16,
            stem: 'The main office (A) of the factory can be found in (B) Maple Street (C) in New York City (D).',
            choices: [
              { id: 'A', text: 'main office' },
              { id: 'B', text: 'can be found' },
              { id: 'C', text: 'in' },
              { id: 'D', text: 'in New York City' },
            ],
            correctAnswer: 'C',
            crossReferencePage: 280,
            explanation: '(C) should be on. On + the name of a street (pp. 280–281).',
            skill: 'Prepositions of Place',
            sourcePrintedPage: 328,
            sourcePdfPage: 343,
            sourceBook: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
            status: 'VERIFIED',
          },
          {
            id: 'CLIFFS-PREP-PT01-SEC02-Q17',
            number: 17,
            stem: 'Because there are less (A) members present tonight than there were (B) last night, we must wait (C) until the next meeting to vote (D).',
            choices: [
              { id: 'A', text: 'less' },
              { id: 'B', text: 'were' },
              { id: 'C', text: 'must wait' },
              { id: 'D', text: 'to vote' },
            ],
            correctAnswer: 'A',
            crossReferencePage: 44,
            explanation: '(A) should be fewer. Members is a count noun and must be preceded by fewer (pp. 44–49).',
            skill: 'Fewer vs Less (Count/Non-Count)',
            sourcePrintedPage: 328,
            sourcePdfPage: 343,
            sourceBook: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
            status: 'VERIFIED',
          },
        ],
      },
      reading: {
        sectionNumber: 3,
        sectionType: 'reading',
        title: 'Section 3: Reading Comprehension',
        timeLimitMinutes: 55,
        totalQuestions: 50,
        instructions: 'Read each passage and choose the one best answer (A, B, C, or D) for questions 1–50 based on what is stated or implied in the passage.',
        passages: [
          {
            id: 'CLIFFS-PREP-PT01-PASSAGE-01',
            title: 'The Stone Age: Paleolithic, Mesolithic, and Neolithic Eras',
            text: 'The Stone Age was a period of history which began in approximately 2 million B.C. and lasted until 3000 B.C. Its name was derived from the stone tools and weapons that modern scientists found. This period was divided into the Paleolithic, Mesolithic, and Neolithic Ages. During the first period (2 million to 8000 B.C.), the first hatchet and use of fire for heating and cooking were developed. As a result of the Ice Age, which evolved about 1 million years into the Paleolithic Age, people were forced to seek shelter in caves, wear clothing, and develop new tools.\nDuring the Mesolithic Age (8000 to 6000 B.C.), people made crude pottery and the first fish hooks, took dogs hunting, and developed the bow and arrow, which were used until the fourteenth century A.D.\nThe Neolithic Age (6000 to 3000 B.C.) saw humankind domesticating sheep, goats, pigs, and cattle, being less nomadic than in previous eras, establishing permanent settlements, and creating governments.',
            questionNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            sourcePrintedPage: 332,
            sourcePdfPage: 347,
          },
          {
            id: 'CLIFFS-PREP-PT01-PASSAGE-02',
            title: 'Hot Boning Technique in Meat Processing',
            text: 'Hot boning is an energy-saving technique for the meat processing industry. It has received significant attention in recent years when increased pressure for energy conservation has accentuated the need for more efficient methods of processing the bovine carcass. Cooling an entire carcass requires a considerable amount of refrigerated space, since bone and trimmable fat are cooled along with the muscle. It is also necessary to space the carcasses adequately in the refrigerated room for better air movement and prevention of microbial contamination, thus adding to the volume requirements for carcass chillers.\nConventional handling of meat involves holding the beef sides in the cooler for 24 to 36 hours before boning. Chilling in the traditional fashion is also associated with a loss of carcass weight ranging from 2 percent to 4 percent due to evaporation of moisture from the meat tissue.\nEarly excision, or hot boning, of muscle prerigor followed by vacuum packaging has several potential advantages. By removing only the edible muscle and fat prerigor, refrigeration space and costs are minimized, boning labor is decreased, and storage yields increased. Because hot boning often results in the toughening of meat, a more recent approach, hot boning following electrical stimulation, has been used to reduce the necessary time of rigor mortis. Some researchers have found this method beneficial in maintaining tender meat, while others have found that the meat also becomes tough after electrical stimulation.',
            questionNumbers: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            sourcePrintedPage: 334,
            sourcePdfPage: 349,
          },
        ],
        questions: [
          {
            id: 'CLIFFS-PREP-PT01-SEC03-Q01',
            number: 1,
            stem: 'Into how many periods was the Stone Age divided?',
            choices: [{ id: 'A', text: '2' }, { id: 'B', text: '3' }, { id: 'C', text: '4' }, { id: 'D', text: '5' }],
            correctAnswer: 'B',
            explanation: '(B) The three periods are the Paleolithic, Mesolithic, and Neolithic.',
            skill: 'Direct Detail',
            sourcePrintedPage: 333,
            sourcePdfPage: 348,
            sourceBook: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
            status: 'VERIFIED',
          },
          {
            id: 'CLIFFS-PREP-PT01-SEC03-Q02',
            number: 2,
            stem: 'In line 3, the word “derived” is closest in meaning to',
            choices: [{ id: 'A', text: 'originated' }, { id: 'B', text: 'destroyed' }, { id: 'C', text: 'hallucinated' }, { id: 'D', text: 'discussed' }],
            correctAnswer: 'A',
            explanation: '(A) The sentence indicates that the name "Stone Age" was "derived from," or "came from," the tools and weapons that were used.',
            skill: 'Vocabulary in Context',
            sourcePrintedPage: 333,
            sourcePdfPage: 348,
            sourceBook: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
            status: 'VERIFIED',
          },
          {
            id: 'CLIFFS-PREP-PT01-SEC03-Q03',
            number: 3,
            stem: 'Which of the following was developed earliest?',
            choices: [{ id: 'A', text: 'Fish hook' }, { id: 'B', text: 'Hatchet' }, { id: 'C', text: 'Bow and arrow' }, { id: 'D', text: 'Pottery' }],
            correctAnswer: 'B',
            explanation: '(B) The hatchet was developed between 2 million B.C. and 8000 B.C., during the first period.',
            skill: 'Factual Inference / Chronology',
            sourcePrintedPage: 333,
            sourcePdfPage: 348,
            sourceBook: 'CLIFFS-TOEFL-PREPARATION-GUIDE',
            status: 'VERIFIED',
          },
        ],
      },
    },
  },
];
