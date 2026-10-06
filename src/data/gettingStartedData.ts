/**
 * Red Alert Guidance & Getting Started Data
 * Extracted directly from Peterson's TOEFL CBT Success (Bruce Rogers, Thomson Learning)
 */

export const HISTORICAL_NOTICE = {
  title: 'Historical TOEFL CBT Preparation Material',
  text: 'This course digitizes the educational content of the source book (Peterson’s TOEFL CBT Success by Bruce Rogers). Current TOEFL formats (such as TOEFL iBT), scoring scales (0–120 vs. 0–300 CBT / 200–670 PBT), question types, and testing policies may differ.',
};

export interface QAndAItem {
  question: string;
  answer: string;
}

export interface KeyItem {
  number: number;
  title: string;
  description: string;
  tips: string[];
}

export const GETTING_STARTED_CONTENT = {
  redAlert1: {
    title: 'Red Alert 1: What is Computer-Based TOEFL?',
    sourcePage: 1,
    overview: `The computer-based TOEFL tests your English language proficiency in an electronic format. Parts of the test are a linear computerized test (like Reading Comprehension), while other parts are a Computer-Adaptive Test (CAT), including Listening Comprehension and Structure.`,
    whatIsCat: `A computer-adaptive test (CAT) is adaptive: each time you answer a question, the computer adjusts to your responses when determining which question to present next. The first question is of moderate difficulty. If you answer it correctly, the next question is more difficult; if incorrectly, the next is easier. Questions at the beginning of a section affect your score more than those at the end because early questions establish your general ability level. Therefore, take as much time as you can afford to answer early questions accurately.`,
    scoringExplanation: `Scores are reported separately for each section (0–30 scaled). The range for the entire CBT test is 0–300 (equivalent to 200–670 on the paper-based test). The scaled scores from each section are added together, multiplied by 10, and divided by 3: (Section 1 + Section 2 + Section 3) × 10 ÷ 3.`,
    questionsAndAnswers: [
      {
        question: 'What is TOEFL?',
        answer: 'TOEFL stands for Test of English as a Foreign Language. It measures the English language ability of people whose first language is not English and who plan to study at colleges and universities in North America. Administered by ETS (Educational Testing Service) since 1965.',
      },
      {
        question: 'What format does the test follow?',
        answer: 'The test consists of three main multiple-choice sections in set order: (1) Listening Comprehension (30–50 questions, CAT), (2) Structure and Written Expression (20–25 questions, CAT), and (3) Reading Comprehension (44–60 questions, linear), plus an essay (TWE).',
      },
      {
        question: 'How are scores calculated?',
        answer: 'Raw scores (number of correct answers) are converted into scaled scores (0–30 per section) through statistical test equating. The combined total score reflects balanced performance across all sections.',
      },
      {
        question: 'Is there a penalty for guessing?',
        answer: 'Unlike some standardized exams, TOEFL has NO penalty for guessing. Incorrect answers are never subtracted from your score. You should ALWAYS answer every question, using the process of elimination to make an educated guess.',
      },
      {
        question: 'What should I bring to the exam?',
        answer: 'Your valid photo identification (passport), admission ticket, and watch without alarm. Reference books, dictionaries, food, and cell phones are strictly prohibited.',
      },
      {
        question: 'Can I cancel my scores?',
        answer: 'You can cancel before seeing your scores by filling out the score cancellation form immediately upon test completion. However, once results are viewed, scores cannot be cancelled, nor can sections be cancelled separately.',
      },
    ] as QAndAItem[],
    twelveKeys: [
      {
        number: 1,
        title: 'Increase your general knowledge of English',
        description: 'Combine knowledge of test tactics with deep command of English built through active reading, listening to broadcasts, and conversing daily in English.',
        tips: ['Keep a personal vocabulary notebook.', 'Listen to English radio and lectures.', 'Think in English throughout the day.'],
      },
      {
        number: 2,
        title: 'Make the most of your preparation time',
        description: 'Train consistently with a dedicated study schedule rather than cramming.',
        tips: ['Use the "30-5-5" method: Study 30 mins, take a 5-min break, review 5 mins before previewing the next.'],
      },
      {
        number: 3,
        title: 'Be in good physical condition',
        description: 'Sufficient sleep and physical exercise prevent exhaustion during the long test.',
        tips: ['Sleep well the entire week before test day.', 'Never sacrifice sleep for last-minute cramming.'],
      },
      {
        number: 4,
        title: 'Choose your test date carefully',
        description: 'Allow enough time to prepare and schedule ahead so university deadlines are comfortably met.',
        tips: ['Register 4 to 6 weeks in advance.', 'Select dates that allow retakes if needed.'],
      },
      {
        number: 5,
        title: 'Be familiar with the format and directions',
        description: 'Knowing directions in advance saves critical minutes during the exam.',
        tips: ['Memorize instructions for each question type so you don’t waste precious time reading them.'],
      },
      {
        number: 6,
        title: 'Organize your pre-exam time',
        description: 'Rest the evening before the exam. Relax, prepare your clothes and documents, and sleep early.',
        tips: ['Do not study the night before.', 'Eat a nutritious breakfast.', 'Arrive early at the testing venue.'],
      },
      {
        number: 7,
        title: 'Use time wisely during the test',
        description: 'Balance speed and accuracy. Easy, medium, and difficult questions carry the same weight.',
        tips: ['Work steadily.', 'Never spend too long on any single problem.'],
      },
      {
        number: 8,
        title: 'Know how to mark and confirm answers',
        description: 'For CAT items, verify your answer choice before confirming, as you cannot return.',
        tips: ['On linear sections, keep question numbers strictly aligned with your answer sheet.'],
      },
      {
        number: 9,
        title: 'Improve your concentration',
        description: 'Mental stamina is crucial for a 2.5-hour exam. Dismiss intrusive thoughts until after the exam.',
        tips: ['Practice 2-hour uninterrupted mock tests to build stamina.'],
      },
      {
        number: 10,
        title: 'Use the process of elimination to make the best guess',
        description: 'Distractors are designed to tempt you; identify flawed choices to boost your odds from 25% to 50% or 100%.',
        tips: ['Spot and eliminate main distractors.', 'Never leave any question blank.'],
      },
      {
        number: 11,
        title: 'Learn to control test anxiety',
        description: 'Channel nervous energy into heightened alertness. Practice the "10-second mental vacation" to reset focus.',
        tips: ['Take three deep breaths, relax shoulders, and view the test as an engaging intellectual challenge.'],
      },
      {
        number: 12,
        title: 'Learn from taking practice tests and official exams',
        description: 'Analyze mistakes immediately after test sessions to identify specific grammatical or reading weaknesses.',
        tips: ['Maintain a mistake notebook.', 'Review the precise explanation for every incorrect item.'],
      },
    ] as KeyItem[],
  },
  redAlert2: {
    title: 'Red Alert 2: Listening Comprehension',
    sourcePage: 14,
    description: 'Overview of Section 1: Dialogs (Part A), Extended Conversations (Part B), and Mini-Talks (Part C). Covers American accent nuances, conversational idiom, and previewing strategies.',
    tactics: [
      'Familiarize yourself with directions in advance so you can preview answer choices.',
      'Concentrate on the second speaker in short dialogs.',
      'Anticipate the question by scanning answer choice structures (verbs, times, locations).',
      'Never leave any item blank.',
    ],
  },
  redAlert3: {
    title: 'Red Alert 3: Structure and Written Expression',
    sourcePage: 114,
    description: 'The highest-yield section for score improvement. Covers sentence structure (Part A) and error identification in written expression (Part B).',
    tactics: [
      'Allocate ~30 seconds per question.',
      'Use both the analytical (grammatical clause analysis) and intuitive ("sounds wrong") approaches.',
      'Check the 6 most common error types: word forms, word choice, verbs, parallel structure, pronouns, and noun number.',
      'Never leave any blank answers.',
    ],
  },
  redAlert4: {
    title: 'Red Alert 4: Reading Comprehension',
    sourcePage: 266,
    description: 'Tests formal academic English reading with 50 questions across 5 passages. Features overview, factual, negative, scanning, inference, vocabulary-in-context, and reference questions.',
    tactics: [
      'Preview question stems quickly before reading the passage.',
      'Read in units of thought and identify each paragraph’s topic sentence.',
      'Answer line-numbered questions (vocabulary and reference) quickly.',
      'Never get stuck on an obscure word—use contextual contrast and clues.',
    ],
  },
};
