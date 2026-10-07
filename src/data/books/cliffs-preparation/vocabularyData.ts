/**
 * Cliffs TOEFL Preparation Guide - Problem Vocabulary & Prepositions
 * Source: Part III: Problem Vocabulary and Prepositions (pp. 263–290)
 */

export interface WordPair {
  id: string;
  category: 'COMMONLY_MISUSED' | 'CONFUSINGLY_RELATED';
  words: Array<{
    term: string;
    pos: string;
    definition: string;
    example: string;
  }>;
  sourcePage: number;
}

export interface PrepositionItem {
  id: string;
  preposition: string;
  usages: Array<{
    sense: string;
    example: string;
  }>;
  commonExpressions: Array<{
    expression: string;
    meaning: string;
    example: string;
  }>;
  sourcePages: number[];
}

export interface VerbalIdiom {
  id: string;
  idiom: string;
  meaning: string;
  example: string;
  sourcePages: number[];
}

export const CLIFFS_COMMONLY_MISUSED_WORDS: WordPair[] = [
  {
    id: 'CLIFFS-PREP-VOCAB-01',
    category: 'COMMONLY_MISUSED',
    sourcePage: 264,
    words: [
      { term: 'ANGEL', pos: 'noun', definition: 'a spiritual or heavenly being', example: 'The Christmas card portrayed a choir of angels hovering over the shepherds.' },
      { term: 'ANGLE', pos: 'noun', definition: 'a figure formed by two lines meeting at a common point', example: 'The carpenters placed the planks at right angles.' },
    ],
  },
  {
    id: 'CLIFFS-PREP-VOCAB-02',
    category: 'COMMONLY_MISUSED',
    sourcePage: 264,
    words: [
      { term: 'CITE', pos: 'verb', definition: 'quote as an example', example: 'In her term paper, Janis had to cite many references.' },
      { term: 'SITE', pos: 'noun', definition: 'location', example: 'The corner of North Main and Mimosa Streets will be the site of the new shopping center.' },
      { term: 'SIGHT', pos: 'noun/verb', definition: 'device used to assist aim; view; see', example: 'Through the sight of the rifle, the soldier spotted the enemy. We sighted a ship in the bay.' },
    ],
  },
  {
    id: 'CLIFFS-PREP-VOCAB-03',
    category: 'COMMONLY_MISUSED',
    sourcePage: 264,
    words: [
      { term: 'COSTUME', pos: 'noun', definition: 'clothing, typical style of dress', example: 'We all decided to wear colonial costumes to the Fourth of July celebration.' },
      { term: 'CUSTOM', pos: 'noun', definition: 'a practice traditionally followed by a particular group of people', example: 'It is a custom in Western Europe for little boys to wear short pants to school.' },
    ],
  },
  {
    id: 'CLIFFS-PREP-VOCAB-04',
    category: 'COMMONLY_MISUSED',
    sourcePage: 264,
    words: [
      { term: 'DECENT', pos: 'adjective', definition: 'respectable or suitable', example: 'When one appears in court, one must wear decent clothing.' },
      { term: 'DESCENT', pos: 'noun', definition: 'downward motion; lineage', example: 'The mountain climbers found their descent more hazardous than their ascent. Vladimir is of Russian descent.' },
    ],
  },
  {
    id: 'CLIFFS-PREP-VOCAB-05',
    category: 'COMMONLY_MISUSED',
    sourcePage: 264,
    words: [
      { term: 'DESSERT', pos: 'noun', definition: 'the final course of a meal, usually something sweet', example: 'We had apple pie for dessert last night.' },
      { term: 'DESERT', pos: 'noun/verb', definition: 'a hot, dry place; abandon', example: 'It is difficult to survive in the desert without water. After deserting his post, the soldier ran away.' },
    ],
  },
  {
    id: 'CLIFFS-PREP-VOCAB-06',
    category: 'COMMONLY_MISUSED',
    sourcePage: 265,
    words: [
      { term: 'LATER', pos: 'adverb', definition: 'a time in the future or following a previous action', example: 'We went to the movies and later had ice cream at Dairy Isle.' },
      { term: 'LATTER', pos: 'adjective', definition: 'last of two things mentioned', example: 'Germany and England both developed dirigibles for use during World War II, the latter primarily for coastal reconnaissance.' },
    ],
  },
  {
    id: 'CLIFFS-PREP-VOCAB-07',
    category: 'COMMONLY_MISUSED',
    sourcePage: 265,
    words: [
      { term: 'LOOSE', pos: 'adjective', definition: 'opposite of tight', example: 'After dieting, Marcy found that her clothes had become so loose that she had to buy a new wardrobe.' },
      { term: 'LOSE', pos: 'verb', definition: 'unable to find something; opposite of win', example: 'Mary lost her glasses last week. If Harry doesn’t practice, he may lose the match.' },
    ],
  },
  {
    id: 'CLIFFS-PREP-VOCAB-08',
    category: 'COMMONLY_MISUSED',
    sourcePage: 265,
    words: [
      { term: 'PASSED', pos: 'verb', definition: 'past tense of pass: elapse, go by, succeed', example: 'Five hours passed before the jury reached its verdict. The students are happy that they passed their exams.' },
      { term: 'PAST', pos: 'adjective/noun', definition: 'time or event before the present', example: 'This past week has been very hectic. In the past, he had been a cook.' },
    ],
  },
  {
    id: 'CLIFFS-PREP-VOCAB-09',
    category: 'COMMONLY_MISUSED',
    sourcePage: 265,
    words: [
      { term: 'PEACE', pos: 'noun', definition: 'harmony or freedom from war', example: 'Peace was restored to the community after a week of rioting.' },
      { term: 'PIECE', pos: 'noun', definition: 'part of a whole', example: 'Heidi ate a piece of chocolate cake for dessert.' },
    ],
  },
  {
    id: 'CLIFFS-PREP-VOCAB-10',
    category: 'COMMONLY_MISUSED',
    sourcePage: 265,
    words: [
      { term: 'PRINCIPAL', pos: 'noun/adjective', definition: 'director of a school; main or most important', example: 'The principal called a faculty meeting. An anthropologist was the principal speaker at Friday’s luncheon.' },
      { term: 'PRINCIPLE', pos: 'noun', definition: 'fundamental rule or adherence to such a rule', example: 'Mr. Connors is a man who believes that truthfulness is the best principle.' },
    ],
  },
  {
    id: 'CLIFFS-PREP-VOCAB-11',
    category: 'COMMONLY_MISUSED',
    sourcePage: 266,
    words: [
      { term: 'QUIET', pos: 'adjective', definition: 'serene, without noise', example: 'The night was so quiet that you could hear the breeze blowing.' },
      { term: 'QUITE', pos: 'adverb', definition: 'completely; somewhat or rather', example: 'Louise is quite capable of taking over household chores. He was quite tired after his first day.' },
      { term: 'QUIT', pos: 'verb', definition: 'stop', example: 'Herman quit smoking on his doctor’s advice.' },
    ],
  },
  {
    id: 'CLIFFS-PREP-VOCAB-12',
    category: 'COMMONLY_MISUSED',
    sourcePage: 266,
    words: [
      { term: 'STATIONARY', pos: 'adjective', definition: 'nonmovable, having a fixed location', example: 'The weatherman said that the warm front would be stationary for several days.' },
      { term: 'STATIONERY', pos: 'noun', definition: 'special writing paper', example: 'Lucille used only monogrammed stationery for correspondence.' },
    ],
  },
  {
    id: 'CLIFFS-PREP-VOCAB-13',
    category: 'COMMONLY_MISUSED',
    sourcePage: 266,
    words: [
      { term: 'THAN', pos: 'conjunction', definition: 'used in unequal comparisons', example: 'Today’s weather is better than yesterday’s.' },
      { term: 'THEN', pos: 'adverb', definition: 'a time following a previously mentioned time', example: 'First, Julie filled out her schedule; then, she paid her fees.' },
    ],
  },
  {
    id: 'CLIFFS-PREP-VOCAB-14',
    category: 'COMMONLY_MISUSED',
    sourcePage: 266,
    words: [
      { term: 'THEIR', pos: 'adjective', definition: 'plural possessive adjective', example: 'Their team scored the most points during the game.' },
      { term: 'THERE', pos: 'adverb', definition: 'location away from here; pseudo-subject with be', example: 'Look over there between the trees. There is a book on the teacher’s desk.' },
      { term: "THEY'RE", pos: 'pronoun + verb', definition: 'contraction of they + are', example: 'They’re leaving on the noon flight to Zurich.' },
    ],
  },
  {
    id: 'CLIFFS-PREP-VOCAB-15',
    category: 'COMMONLY_MISUSED',
    sourcePage: 266,
    words: [
      { term: 'TO', pos: 'preposition', definition: 'toward, until, as far as', example: 'Go to the blackboard and write out the equation.' },
      { term: 'TWO', pos: 'noun/adjective', definition: 'number following one', example: 'Two theories have been proposed to explain that incident.' },
      { term: 'TOO', pos: 'adverb', definition: 'excessively; also', example: 'This morning was too cold for the children to go swimming. Jane went to the movie, and we did too.' },
    ],
  },
  {
    id: 'CLIFFS-PREP-VOCAB-16',
    category: 'COMMONLY_MISUSED',
    sourcePage: 266,
    words: [
      { term: 'WEATHER', pos: 'noun', definition: 'atmospheric conditions', example: 'Our flight was delayed because of bad weather.' },
      { term: 'WHETHER', pos: 'conjunction', definition: 'if, indicates a choice', example: 'Because of the gas shortage, we do not know whether we will go away for our vacation or stay home.' },
    ],
  },
  {
    id: 'CLIFFS-PREP-VOCAB-17',
    category: 'COMMONLY_MISUSED',
    sourcePage: 267,
    words: [
      { term: 'WHOSE', pos: 'pronoun/adjective', definition: 'possessive relative pronoun or adjective', example: 'The person whose name is drawn first will win the grand prize.' },
      { term: "WHO'S", pos: 'pronoun + verb', definition: 'contraction of who + is or who + has', example: 'Who’s your new biology professor? Scott is the attorney who’s been reviewing this case.' },
    ],
  },
  {
    id: 'CLIFFS-PREP-VOCAB-18',
    category: 'COMMONLY_MISUSED',
    sourcePage: 267,
    words: [
      { term: 'YOUR', pos: 'adjective', definition: 'possessive of you', example: 'We are all happy about your accepting the position.' },
      { term: "YOU'RE", pos: 'pronoun + verb', definition: 'contraction of you + are', example: 'You’re going to enjoy the panorama from the top of the hill.' },
    ],
  },
];

export const CLIFFS_VERBAL_IDIOMS: VerbalIdiom[] = [
  { id: 'CLIFFS-IDIOM-01', idiom: 'BREAK OFF', meaning: 'end', example: 'As a result of the recent attack, the two countries broke off their diplomatic relations.', sourcePages: [284] },
  { id: 'CLIFFS-IDIOM-02', idiom: 'BRING UP', meaning: 'raise, initiate', example: 'The county commissioner brought up the heated issue of restricting on-street parking.', sourcePages: [284] },
  { id: 'CLIFFS-IDIOM-03', idiom: 'CALL ON', meaning: 'ask; visit', example: 'The teacher called on James to write the equation. The new minister called on each family.', sourcePages: [284] },
  { id: 'CLIFFS-IDIOM-04', idiom: 'CARE FOR', meaning: 'like; look after', example: 'Because Marita doesn’t care for dark colors, she buys brightly colored clothes. My neighbors asked me to care for their children.', sourcePages: [284] },
  { id: 'CLIFFS-IDIOM-05', idiom: 'CHECK OUT', meaning: 'borrow books from library; investigate', example: 'I went to the library and checked out thirty books. Could you check out the problem?', sourcePages: [285] },
  { id: 'CLIFFS-IDIOM-06', idiom: 'CHECK OUT OF', meaning: 'leave (a hotel)', example: 'We were told that we had to check out of the hotel before one o’clock.', sourcePages: [285] },
  { id: 'CLIFFS-IDIOM-07', idiom: 'COME DOWN WITH', meaning: 'become ill with', example: 'During the summer, many people come down with intestinal disorders.', sourcePages: [285] },
  { id: 'CLIFFS-IDIOM-08', idiom: 'COUNT ON', meaning: 'depend on, rely on', example: 'Maria was counting on the grant money to pay her way through graduate school.', sourcePages: [285] },
  { id: 'CLIFFS-IDIOM-09', idiom: 'DO AWAY WITH', meaning: 'eliminate, get rid of', example: 'The director has decided to do away with all sports activities.', sourcePages: [285] },
  { id: 'CLIFFS-IDIOM-10', idiom: 'DRAW UP', meaning: 'write, draft (plans or contracts)', example: 'A new advertising contract was drawn up after the terms had been decided.', sourcePages: [285] },
  { id: 'CLIFFS-IDIOM-11', idiom: 'DROP OUT OF', meaning: 'quit, withdraw from', example: 'This organization has done a great deal to prevent young people from dropping out of school.', sourcePages: [285] },
  { id: 'CLIFFS-IDIOM-12', idiom: 'FIGURE OUT', meaning: 'solve, decipher, understand', example: 'Hal decided to see an accountant to figure out his income tax return.', sourcePages: [285] },
  { id: 'CLIFFS-IDIOM-13', idiom: 'FIND OUT', meaning: 'discover', example: 'Erin just found out that her ancestors had come from Scotland.', sourcePages: [285] },
  { id: 'CLIFFS-IDIOM-14', idiom: 'GET BY', meaning: 'manage to survive', example: 'Despite the high cost of living, we will get by on my salary.', sourcePages: [285] },
  { id: 'CLIFFS-IDIOM-15', idiom: 'GET THROUGH', meaning: 'finish; manage to communicate', example: 'Jerry called because he got through with his project sooner than expected.', sourcePages: [285] },
  { id: 'CLIFFS-IDIOM-16', idiom: 'GIVE UP', meaning: 'stop, cease', example: 'Helen gave up working for the company because employees were not treated fairly.', sourcePages: [286] },
  { id: 'CLIFFS-IDIOM-17', idiom: 'HOLD UP', meaning: 'rob at gunpoint; endure; stop/delay', example: 'The store was held up last night. Last night’s accident held up traffic for two hours.', sourcePages: [286] },
  { id: 'CLIFFS-IDIOM-18', idiom: 'LOOK AFTER', meaning: 'care for', example: 'After my aunt died, her lawyer looked after my uncle’s financial affairs.', sourcePages: [286] },
  { id: 'CLIFFS-IDIOM-19', idiom: 'LOOK INTO', meaning: 'investigate', example: 'Lynnette is looking into the possibility of opening a drugstore in Dallas.', sourcePages: [286] },
  { id: 'CLIFFS-IDIOM-20', idiom: 'PASS OUT / HAND OUT', meaning: 'distribute; faint', example: 'The candidate passed out campaign literature. The intense heat caused Maria to pass out.', sourcePages: [286] },
  { id: 'CLIFFS-IDIOM-21', idiom: 'PUT OFF', meaning: 'postpone', example: 'Because Brian was a poor correspondent, he put off answering his letters.', sourcePages: [286] },
  { id: 'CLIFFS-IDIOM-22', idiom: 'RUN ACROSS', meaning: 'discover', example: 'I ran across my grandmother’s wedding dress in the attic.', sourcePages: [286] },
  { id: 'CLIFFS-IDIOM-23', idiom: 'RUN INTO', meaning: 'meet by accident', example: 'When Jack was in New York, he ran into an old friend at the theater.', sourcePages: [286] },
  { id: 'CLIFFS-IDIOM-24', idiom: 'TAKE OFF', meaning: 'leave the ground to fly', example: 'Our flight to Toronto took off on schedule.', sourcePages: [287] },
  { id: 'CLIFFS-IDIOM-25', idiom: 'TAKE OVER FOR', meaning: 'substitute for', example: 'Marie had a class this afternoon, so Janet took over for her.', sourcePages: [287] },
  { id: 'CLIFFS-IDIOM-26', idiom: 'TURN IN', meaning: 'submit; go to bed', example: 'The students turned in their term papers on Monday. We decided to turn in early.', sourcePages: [287] },
  { id: 'CLIFFS-IDIOM-27', idiom: 'WATCH OUT FOR', meaning: 'be cautious or alert', example: 'We had to watch out for the little children playing in the street.', sourcePages: [287] },
];
