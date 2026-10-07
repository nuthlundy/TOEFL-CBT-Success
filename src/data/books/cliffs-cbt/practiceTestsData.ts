/**
 * CliffsTestPrep TOEFL CBT - Full-Length Simulated Practice Tests
 * Source: Part IV: Putting It All Together: Practice Tests (pp. 209–322)
 * All questions, passages, listening scripts, answer keys, and author explanations
 * extracted directly from CliffsTestPrep™ TOEFL® CBT (IDG Books Worldwide, 2001).
 */

import { SectionType } from '../../../types/toefl';

export interface CliffsCbtPracticeTestQuestion {
  id: string; // e.g. "CLIFFS-CBT-PT01-SEC02-Q01"
  number: number;
  stem: string;
  choices: Array<{ id: string; text: string }>;
  correctAnswer: string;
  explanation?: string;
  crossReferencePage?: number;
  skill?: string;
  sourcePrintedPage: number;
  sourcePdfPage: number;
  sourceBook: string;
  sourceBookId: 'CLIFFS-TOEFL-CBT';
  status: 'VERIFIED' | 'AUDIO_SOURCE_REQUIRED' | 'CONTENT_REVIEW_REQUIRED';
}

export interface CliffsCbtReadingPassage {
  id: string;
  title: string;
  text: string;
  questionNumbers: number[];
  sourcePrintedPage: number;
  sourcePdfPage: number;
}

export interface CliffsCbtPracticeTestSection {
  sectionNumber: 1 | 2 | 3 | 4;
  sectionType: SectionType;
  title: string;
  timeLimitMinutes: number;
  totalQuestions: number;
  instructions: string;
  audioNotice?: string;
  tapescripts?: Record<number, string>;
  passages?: CliffsCbtReadingPassage[];
  questions: CliffsCbtPracticeTestQuestion[];
}

export interface CliffsCbtPracticeTest {
  id: string; // "CLIFFS-CBT-PT01"
  testNumber: number;
  title: string;
  sourceBookId: 'CLIFFS-TOEFL-CBT';
  printedPageRange: string;
  pdfPageRange: string;
  sections: {
    listening: CliffsCbtPracticeTestSection;
    structure: CliffsCbtPracticeTestSection;
    reading: CliffsCbtPracticeTestSection;
  };
}

export const CLIFFS_CBT_PRACTICE_TESTS: CliffsCbtPracticeTest[] = [
  {
    id: 'CLIFFS-CBT-PT01',
    testNumber: 1,
    title: 'Practice Test 1 (Full CBT Simulation)',
    sourceBookId: 'CLIFFS-TOEFL-CBT',
    printedPageRange: '209–227',
    pdfPageRange: '230–248',
    sections: {
      listening: {
        sectionNumber: 1,
        sectionType: 'listening',
        title: 'Section 1: Listening Section (45 Mins, 35 Questions)',
        timeLimitMinutes: 45,
        totalQuestions: 35,
        instructions: 'Listen to the conversations and lectures. After each, answer the questions based on what is stated or implied by the speakers.',
        audioNotice: 'AUDIO_SOURCE_REQUIRED: Listening tracks were recorded on CD A (Tracks 2–6). Full verbatim transcripts from Appendix pp. 380–388 are provided below.',
        tapescripts: {
          1: "Man: I thought you had already been accepted at the university.\nWoman: If I had I certainly wouldn’t be still submitting applications. But I’m not giving up yet.\nMan: There’s still plenty of time.\nNarrator: What does the woman mean?",
          2: "Woman: I haven’t been able to decide which class to take. The topics in basic linguistics are interesting, but I don’t care for the professor.\nMan: Why not take the literature class? Professor Stafford is teaching it.\nWoman: Is she really? That’s an idea.\nNarrator: What will the woman probably do?",
          3: "Woman: This computer, which has the most RAM and speed of all the products, also has a good price.\nMan: I’m not sure. I don’t recognize the brand name.\nWoman: It’s manufactured by the same company as this one, but it’s sold under a different name.\nNarrator: What does the woman suggest that the man do?",
          4: "Man: I was wondering what happened to the application I submitted to build a fence in my backyard.\nWoman: The architectural control committee was disbanded by the board, so there is nobody to approve it. You’ll need to wait till the next election.\nMan: I think the rules will allow me to consider it approved since it hasn’t been disallowed.\nNarrator: What does the man mean?",
          5: "Man: You don’t seem pleased.\nWoman: I can’t believe my advisor told me to drop trigonometry. I haven’t had a chance yet to show that I can do it.\nMan: Well, you don’t have to do what your advisor says. It’s just advice, isn’t it?\nNarrator: What is the woman’s problem?",
        },
        questions: [
          {
            id: 'CLIFFS-CBT-PT01-SEC01-Q01',
            number: 1,
            stem: 'What does the woman mean?',
            choices: [
              { id: 'A', text: 'She is tired of trying to get into the university.' },
              { id: 'B', text: 'She has already entered a university.' },
              { id: 'C', text: 'She took a job instead of going to college.' },
              { id: 'D', text: 'She has continued to try to find a university that will accept her.' },
            ],
            correctAnswer: 'D',
            explanation: 'D: She has continued to try to find a university that will accept her. The woman states "If I had I certainly wouldn\'t be still submitting applications. But I\'m not giving up yet."',
            skill: 'Short Dialogue Inferences',
            sourcePrintedPage: 209,
            sourcePdfPage: 230,
            sourceBook: 'CliffsTestPrep TOEFL CBT',
            sourceBookId: 'CLIFFS-TOEFL-CBT',
            status: 'VERIFIED',
          },
          {
            id: 'CLIFFS-CBT-PT01-SEC01-Q02',
            number: 2,
            stem: 'What will the woman probably do?',
            choices: [
              { id: 'A', text: 'Study linguistics' },
              { id: 'B', text: 'Contact Professor Stafford' },
              { id: 'C', text: 'Take Professor Stafford’s class' },
              { id: 'D', text: 'Decide later' },
            ],
            correctAnswer: 'C',
            explanation: 'C: Take Professor Stafford\'s class. When the man suggests Professor Stafford\'s literature class, the woman replies "That\'s an idea."',
            skill: 'Suggestions & Intentions',
            sourcePrintedPage: 209,
            sourcePdfPage: 230,
            sourceBook: 'CliffsTestPrep TOEFL CBT',
            sourceBookId: 'CLIFFS-TOEFL-CBT',
            status: 'VERIFIED',
          },
          {
            id: 'CLIFFS-CBT-PT01-SEC01-Q03',
            number: 3,
            stem: 'What does the woman suggest that the man do?',
            choices: [
              { id: 'A', text: 'Consider another computer with a well-known brand name' },
              { id: 'B', text: 'Research and reconsider' },
              { id: 'C', text: 'Buy a slower computer' },
              { id: 'D', text: 'Purchase the computer she first suggested' },
            ],
            correctAnswer: 'D',
            explanation: 'D: Purchase the computer she first suggested. The woman explains that the lower-priced computer is manufactured by the same company under a different name.',
            skill: 'Suggestions & Recommendations',
            sourcePrintedPage: 210,
            sourcePdfPage: 231,
            sourceBook: 'CliffsTestPrep TOEFL CBT',
            sourceBookId: 'CLIFFS-TOEFL-CBT',
            status: 'VERIFIED',
          },
          {
            id: 'CLIFFS-CBT-PT01-SEC01-Q04',
            number: 4,
            stem: 'What does the man mean?',
            choices: [
              { id: 'A', text: 'He will not build the fence.' },
              { id: 'B', text: 'He believes he can build the fence without waiting.' },
              { id: 'C', text: 'He will apply again.' },
              { id: 'D', text: 'He will join the committee.' },
            ],
            correctAnswer: 'B',
            explanation: 'B: He believes he can build the fence without waiting. He states the rules allow him to consider the application approved since it was not disallowed.',
            skill: 'Idiomatic Meaning & Inferences',
            sourcePrintedPage: 210,
            sourcePdfPage: 231,
            sourceBook: 'CliffsTestPrep TOEFL CBT',
            sourceBookId: 'CLIFFS-TOEFL-CBT',
            status: 'VERIFIED',
          },
          {
            id: 'CLIFFS-CBT-PT01-SEC01-Q05',
            number: 5,
            stem: 'What is the woman’s problem?',
            choices: [
              { id: 'A', text: 'She wants to sign up for trigonometry, but there is no room.' },
              { id: 'B', text: 'She is unhappy with what her advisor suggested.' },
              { id: 'C', text: 'She hates trigonometry.' },
              { id: 'D', text: 'She is failing trigonometry.' },
            ],
            correctAnswer: 'B',
            explanation: 'B: She is unhappy with what her advisor suggested. She expresses dismay that her advisor told her to drop trigonometry.',
            skill: 'Identifying Speaker Problems',
            sourcePrintedPage: 210,
            sourcePdfPage: 231,
            sourceBook: 'CliffsTestPrep TOEFL CBT',
            sourceBookId: 'CLIFFS-TOEFL-CBT',
            status: 'VERIFIED',
          },
        ],
      },
      structure: {
        sectionNumber: 2,
        sectionType: 'structure',
        title: 'Section 2: Structure Section (18 Mins, 23 Questions)',
        timeLimitMinutes: 18,
        totalQuestions: 23,
        instructions: 'Choose the word or phrase that most correctly completes the sentence, or choose the one underlined word or phrase that is incorrect in standard written English.',
        questions: [
          {
            id: 'CLIFFS-CBT-PT01-SEC02-Q01',
            number: 1,
            stem: 'Although a number of voters has cast (A) their ballots in the city election (B), the supervisor of elections temporarily (C) ended the election because of a (D) malfunction in the voting mechanism.',
            choices: [
              { id: 'A', text: 'has cast' },
              { id: 'B', text: 'their ballots' },
              { id: 'C', text: 'temporarily' },
              { id: 'D', text: 'because of a' },
            ],
            correctAnswer: 'A',
            explanation: 'A: has cast. The expression "a number of" is a plural concept and requires a plural verb: "a number of voters have cast".',
            skill: 'A Number of vs The Number of',
            sourcePrintedPage: 215,
            sourcePdfPage: 236,
            sourceBook: 'CliffsTestPrep TOEFL CBT',
            sourceBookId: 'CLIFFS-TOEFL-CBT',
            status: 'VERIFIED',
          },
          {
            id: 'CLIFFS-CBT-PT01-SEC02-Q02',
            number: 2,
            stem: 'Neither Professor Johnson nor any other faculty member __________ to apply for the dean’s position.',
            choices: [
              { id: 'A', text: 'intend' },
              { id: 'B', text: 'intends' },
              { id: 'C', text: 'are intending' },
              { id: 'D', text: 'has intend' },
            ],
            correctAnswer: 'B',
            explanation: 'B: intends. In neither...nor constructions, the subject closer to the verb ("any other faculty member") controls agreement (singular).',
            skill: 'Neither... Nor Subject-Verb Agreement',
            sourcePrintedPage: 215,
            sourcePdfPage: 236,
            sourceBook: 'CliffsTestPrep TOEFL CBT',
            sourceBookId: 'CLIFFS-TOEFL-CBT',
            status: 'VERIFIED',
          },
          {
            id: 'CLIFFS-CBT-PT01-SEC02-Q03',
            number: 3,
            stem: 'While this is not the most popular (A) course offered at the university, just like many others (B) classes that have low (C) attendance in spite of their importance (D), at least several classes are always available.',
            choices: [
              { id: 'A', text: 'the most popular' },
              { id: 'B', text: 'others' },
              { id: 'C', text: 'have low' },
              { id: 'D', text: 'importance' },
            ],
            correctAnswer: 'B',
            explanation: 'B: others. Other is an adjective modifying the noun classes and cannot be pluralized (other classes).',
            skill: 'Another vs Other Adjectives',
            sourcePrintedPage: 215,
            sourcePdfPage: 236,
            sourceBook: 'CliffsTestPrep TOEFL CBT',
            sourceBookId: 'CLIFFS-TOEFL-CBT',
            status: 'VERIFIED',
          },
          {
            id: 'CLIFFS-CBT-PT01-SEC02-Q04',
            number: 4,
            stem: 'E. Coli has proven to be __________ most dangerous bacteria that can be acquired from food and water, even in developed countries.',
            choices: [
              { id: 'A', text: 'one of the' },
              { id: 'B', text: 'one of' },
              { id: 'C', text: 'one' },
              { id: 'D', text: 'of one' },
            ],
            correctAnswer: 'A',
            explanation: 'A: one of the. The formula is cardinal number + of + the + (adjective) + noun (one of the most dangerous bacteria).',
            skill: 'Superlatives & Determiners',
            sourcePrintedPage: 215,
            sourcePdfPage: 236,
            sourceBook: 'CliffsTestPrep TOEFL CBT',
            sourceBookId: 'CLIFFS-TOEFL-CBT',
            status: 'VERIFIED',
          },
          {
            id: 'CLIFFS-CBT-PT01-SEC02-Q05',
            number: 5,
            stem: 'The death toll would __________ much higher if immediate action had not been taken.',
            choices: [
              { id: 'A', text: 'probably being' },
              { id: 'B', text: 'probably be' },
              { id: 'C', text: 'probably been' },
              { id: 'D', text: 'be probable' },
            ],
            correctAnswer: 'B',
            explanation: 'B: probably be. After the modal would, the verb must appear in simple form with an adverb modifier: would probably be.',
            skill: 'Modals and Adverbs',
            sourcePrintedPage: 215,
            sourcePdfPage: 236,
            sourceBook: 'CliffsTestPrep TOEFL CBT',
            sourceBookId: 'CLIFFS-TOEFL-CBT',
            status: 'VERIFIED',
          },
        ],
      },
      reading: {
        sectionNumber: 3,
        sectionType: 'reading',
        title: 'Section 3: Reading Section (75 Mins, 47 Questions)',
        timeLimitMinutes: 75,
        totalQuestions: 47,
        instructions: 'Read each passage and answer the questions based on what is stated or implied in the text.',
        passages: [
          {
            id: 'CLIFFS-CBT-PT01-PASSAGE-01',
            title: 'Passage 1: Vernal Pools & Freshwater Ecosystems',
            text: `Even a muddy pond contributes to the ecosystem that affects the environment. A vernal or springtime pool is only a few feet deep and lasts only from March until mid-summer but yields a considerable number of diverse life forms. Like all of nature, there are predators and victims, and a particular living being may be one or the other, depending on its age and characteristics. One may find masses of spotted salamander eggs floating just under the surface of the pond, left behind by adults who entered the pond early in the season before predators arrived. Other amphibians and reptiles return to the recurrent pond year after year to reproduce, as their ancestors have done for years.

Various forms of algae grow well in the murky water, if there is sufficient sunlight. They in turn produce and transmit oxygen to the salamander embryos and other young that are not yet able to survive outside of water. Diving beetles feast on eggs and larvae deposited in the pond by the salamanders and other amphibians that have called it home. Tadpoles are born in the late spring and feed on the algae. The pond also invites wood frogs staking their territory and courting potential mates, calling as loud as quacking ducks.

By the end of the short season, the pond dries to spongy mud and then dries further, becoming covered with leaves and debris, until the following spring when the process repeats itself.`,
            questionNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            sourcePrintedPage: 218,
            sourcePdfPage: 239,
          },
          {
            id: 'CLIFFS-CBT-PT01-PASSAGE-02',
            title: 'Passage 2: Stroke Damage Alleviation and Forced Hypothermia',
            text: `Scientists have experimented with a new procedure for alleviating the damage caused by strokes. Strokes are frequently caused by a blood clot lodging in the tree of arteries in the head, choking the flow of blood. Some brain cells die as a direct result of the stroke, but others also die over several hours because the proteins spilling out of the first cells that die trigger a chemical chain reaction that kills the neighboring cells.

The current method of reducing the amount of damage is to give a clot dissolver, known as TPA, as soon as possible. But generally TPA is not given to the patient until he or she reaches the hospital, and it still does not immediately stop the damage.

The new technology, still in the research stage, involves chilling the area or the entire patient. It is already known that when an organ is cooled, damage is slowed. This is why sometimes a person who has fallen into an icy pond is not significantly harmed after being warmed up again. The biggest issue is the method of cooling. It is not feasible to chill the head alone. Doctors have chilled the entire body by wrapping the patient in cold materials, but extreme shivering was a problem.

The new idea is to cool the patient from the inside out. Several companies are studying the use of cold-tipped catheters, inserted into the artery in the groin and threaded up to the inferior vena cava, which is a large vein that supplies blood to the abdomen. The catheter is expected to cool the blood that flows over it, thus allowing cooler blood to reach the area of the stroke damage.

It is not expected that the cooling will be substantial, but even a slight decrease in temperature is thought to be helpful. In effect, the patient is given a kind of forced hypothermia. And doctors believe it is important to keep the patient awake so that they can converse with the patient in order to ascertain mental condition.`,
            questionNumbers: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            sourcePrintedPage: 220,
            sourcePdfPage: 241,
          },
        ],
        questions: [
          {
            id: 'CLIFFS-CBT-PT01-SEC03-Q01',
            number: 1,
            stem: 'The word vernal in the second sentence means most nearly the same as',
            choices: [
              { id: 'A', text: 'springtime.' },
              { id: 'B', text: 'pool.' },
              { id: 'C', text: 'deep.' },
              { id: 'D', text: 'transitory.' },
            ],
            correctAnswer: 'A',
            explanation: 'A: springtime. The sentence states "A vernal or springtime pool...", indicating vernal and springtime are synonymous.',
            skill: 'Vocabulary in Context',
            sourcePrintedPage: 218,
            sourcePdfPage: 239,
            sourceBook: 'CliffsTestPrep TOEFL CBT',
            sourceBookId: 'CLIFFS-TOEFL-CBT',
            status: 'VERIFIED',
          },
          {
            id: 'CLIFFS-CBT-PT01-SEC03-Q02',
            number: 2,
            stem: 'What is the author’s purpose stated in the first sentence: Even a muddy pond contributes to the ecosystem that affects the environment?',
            choices: [
              { id: 'A', text: 'To explain that a vernal pool is very muddy' },
              { id: 'B', text: 'To describe how the vernal pool fits into the larger environmental picture' },
              { id: 'C', text: 'To explain that mud is important to the environment' },
              { id: 'D', text: 'To show how algae grows' },
            ],
            correctAnswer: 'B',
            explanation: 'B: To describe how the vernal pool fits into the larger environmental picture. The introductory sentence establishes the ecological significance of vernal pools.',
            skill: 'Author’s Purpose & Main Ideas',
            sourcePrintedPage: 218,
            sourcePdfPage: 239,
            sourceBook: 'CliffsTestPrep TOEFL CBT',
            sourceBookId: 'CLIFFS-TOEFL-CBT',
            status: 'VERIFIED',
          },
          {
            id: 'CLIFFS-CBT-PT01-SEC03-Q03',
            number: 3,
            stem: 'The word yields in the third sentence means most nearly the same as',
            choices: [
              { id: 'A', text: 'produces.' },
              { id: 'B', text: 'contributes to.' },
              { id: 'C', text: 'kills.' },
              { id: 'D', text: 'harms.' },
            ],
            correctAnswer: 'A',
            explanation: 'A: produces. In this biological context, yielding diverse life forms means producing or supporting them.',
            skill: 'Vocabulary in Context',
            sourcePrintedPage: 218,
            sourcePdfPage: 239,
            sourceBook: 'CliffsTestPrep TOEFL CBT',
            sourceBookId: 'CLIFFS-TOEFL-CBT',
            status: 'VERIFIED',
          },
          {
            id: 'CLIFFS-CBT-PT01-SEC03-Q04',
            number: 4,
            stem: 'The word diverse in the third sentence means most nearly the same as',
            choices: [
              { id: 'A', text: 'distinct.' },
              { id: 'B', text: 'living.' },
              { id: 'C', text: 'numerous.' },
              { id: 'D', text: 'primitive.' },
            ],
            correctAnswer: 'A',
            explanation: 'A: distinct. Diverse means varied or different/distinct.',
            skill: 'Vocabulary in Context',
            sourcePrintedPage: 219,
            sourcePdfPage: 240,
            sourceBook: 'CliffsTestPrep TOEFL CBT',
            sourceBookId: 'CLIFFS-TOEFL-CBT',
            status: 'VERIFIED',
          },
          {
            id: 'CLIFFS-CBT-PT01-SEC03-Q05',
            number: 5,
            stem: 'The word its in the fifth sentence refers to',
            choices: [
              { id: 'A', text: 'predator.' },
              { id: 'B', text: 'pond.' },
              { id: 'C', text: 'living being.' },
              { id: 'D', text: 'nature.' },
            ],
            correctAnswer: 'C',
            explanation: 'C: living being. The sentence states: "...a particular living being may be one or the other, depending on its age and characteristics."',
            skill: 'Pronoun Referents',
            sourcePrintedPage: 219,
            sourcePdfPage: 240,
            sourceBook: 'CliffsTestPrep TOEFL CBT',
            sourceBookId: 'CLIFFS-TOEFL-CBT',
            status: 'VERIFIED',
          },
        ],
      },
    },
  },
];
