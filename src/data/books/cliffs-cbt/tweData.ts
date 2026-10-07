/**
 * CliffsTestPrep TOEFL CBT - Test of Written English (TWE)
 * Source: Part III: Detailed Review of Items Tested - Writing (pp. 201–206)
 * All scoring guidelines, model essays, and sample essay topics extracted directly from PDF.
 */

export interface CliffsCbtTwePrompt {
  id: string; // e.g. "CLIFFS-CBT-TWE-01"
  topicNumber: number;
  prompt: string;
  category: string;
  sourcePrintedPage: number;
  sourcePdfPage: number;
}

export interface CliffsCbtSampleEssay {
  id: string;
  title: string;
  topic: string;
  outline: {
    intro: string;
    points: string[];
    conclusion: string;
  };
  essayText: string;
  authorCommentary: string;
  sourcePrintedPage: number;
}

export const CLIFFS_CBT_TWE_PROMPTS: CliffsCbtTwePrompt[] = [
  {
    id: 'CLIFFS-CBT-TWE-01',
    topicNumber: 1,
    prompt: 'A significant effort and significant expense are spent on space travel and research, including sending unmanned spacecraft to faraway planets. Do you agree or disagree with this practice? Why? Use specific reasons and examples to support your answer.',
    category: 'Science & Society',
    sourcePrintedPage: 205,
    sourcePdfPage: 226,
  },
  {
    id: 'CLIFFS-CBT-TWE-02',
    topicNumber: 2,
    prompt: 'Some people believe that the public should be able to keep guns for protection. Others believe that guns should be illegal. Give your opinion on the issue. Use specific reasons and examples to support your answer.',
    category: 'Public Policy',
    sourcePrintedPage: 205,
    sourcePdfPage: 226,
  },
  {
    id: 'CLIFFS-CBT-TWE-03',
    topicNumber: 3,
    prompt: 'Some students prefer to attend a large university, while others prefer to attend a smaller one. Indicate your opinion of the best choice. Use specific reasons and examples to support your answer.',
    category: 'Higher Education',
    sourcePrintedPage: 205,
    sourcePdfPage: 226,
  },
  {
    id: 'CLIFFS-CBT-TWE-04',
    topicNumber: 4,
    prompt: 'Many young people have the opportunity to participate in organized sporting events. The more organized the event, the greater the cost. Do you believe that organized sports are important to young people? Why or why not? Use specific reasons and examples to support your answer.',
    category: 'Youth & Athletics',
    sourcePrintedPage: 205,
    sourcePdfPage: 226,
  },
  {
    id: 'CLIFFS-CBT-TWE-05',
    topicNumber: 5,
    prompt: 'What is one of the most important decisions that a teenager will have to make? Why is it so important? Use specific reasons and examples to support your answer.',
    category: 'Life Decisions',
    sourcePrintedPage: 205,
    sourcePdfPage: 226,
  },
  {
    id: 'CLIFFS-CBT-TWE-06',
    topicNumber: 6,
    prompt: 'Do you agree or disagree with the statement "haste makes waste"? Use specific reasons and examples to support your answer.',
    category: 'Proverbs & Philosophy',
    sourcePrintedPage: 205,
    sourcePdfPage: 226,
  },
  {
    id: 'CLIFFS-CBT-TWE-07',
    topicNumber: 7,
    prompt: 'Do you believe that the increasing use of computers and the Internet is beneficial to society or not? Use specific reasons and examples to support your answer.',
    category: 'Technology & Culture',
    sourcePrintedPage: 205,
    sourcePdfPage: 226,
  },
  {
    id: 'CLIFFS-CBT-TWE-08',
    topicNumber: 8,
    prompt: 'What improvement would you make to the city where you live to make it a better place, or in the alternative, why does it require no improvement? Use specific reasons and examples to support your answer.',
    category: 'Community & Environment',
    sourcePrintedPage: 205,
    sourcePdfPage: 226,
  },
  {
    id: 'CLIFFS-CBT-TWE-09',
    topicNumber: 9,
    prompt: 'Do you believe that home ownership is a goal that is important to many people? Use specific reasons and examples to support your answer.',
    category: 'Social Values',
    sourcePrintedPage: 205,
    sourcePdfPage: 226,
  },
  {
    id: 'CLIFFS-CBT-TWE-10',
    topicNumber: 10,
    prompt: 'Do you believe that people work better when they have sufficient free time? Use specific reasons and examples to support your answer.',
    category: 'Work & Leisure',
    sourcePrintedPage: 205,
    sourcePdfPage: 226,
  },
];

export const CLIFFS_CBT_SAMPLE_ESSAYS: CliffsCbtSampleEssay[] = [
  {
    id: 'CLIFFS-CBT-ESSAY-01',
    title: 'Model Essay: Large Multi-Purpose Neighborhood Store',
    topic: 'It has recently been announced that a large multi-purpose store, similar to those that offer a great number of different items and are open all the time, will be built near your neighborhood. Do you support or oppose this plan? Why? Use specific reasons and details to support your answer.',
    outline: {
      intro: 'Support building large multi-purpose store: convenience, jobs, and eliminating eyesores.',
      points: [
        'Convenience: close to home, combines groceries, clothing, and electronics under one roof, 24-hour shopping flexibility.',
        'Employment: jobs for high school students after class and retired seniors seeking supplemental income.',
        'Community improvement: replaces abandoned homes, vacant lots with trash/rodents with a clean, well-lit commercial facility.',
      ],
      conclusion: 'Major community asset that brings convenience, economic opportunity, and neighborhood safety.',
    },
    essayText: `I support the idea of building a new large multi-purpose store near my neighborhood. It will provide convenience to me and my neighbors and additional jobs, as well as eliminating unattractive areas of the neighborhood.

Having such a store near our neighborhood will provide convenience. Currently we have to travel in one direction for a grocery store, another direction for clothing stores, and several other places for other types of stores. All of these stores are at least several miles from our neighborhood. We will have much less travel time to this one store. Because this store combines a number of different product classes, we can avoid going to different stores for everything we want to buy. We will be able to buy our groceries, clothing, electronic items and other products all at one time. And we will also have the added convenience of shopping at any hour of the day when we are too busy to shop during normal hours.

At the present time, there are students who would like to work after class, but there are not sufficient jobs available. In addition, there are retired people in our neighborhood who would like to supplement their meager income with some light work. A multi-purpose store like the one that is proposed for our neighborhood will provide a number of different job opportunities for these two classes of people as well as others in the community who need full-time jobs. This benefits the overall economic base of the community.

Now, there are two abandoned homes, one occupied home with junk cars and another with debris in the yard, and several overgrown vacant lots on the property where this store will be built. There is nothing beneficial about any of these properties. They contribute to rodent and insect growth, contain hiding places for criminals, and are dangerous for our young children. Replacing these lots with the contemplated store will eliminate these dangers.

Allowing this store to be built will be much more convenient for the people in my neighborhood than our current situation. Because it will provide additional jobs and clean up eyesores in the neighborhood, it has many benefits, and we should all support it.`,
    authorCommentary: 'Michael A. Pyle: This response attains a high score on the CBT 0–6 scale because it directly answers the prompt with structured paragraphs, concrete details (3 distinct body arguments: convenience, jobs, eliminating eyesores), clear transitions, and accurate grammar without superficial verbosity.',
    sourcePrintedPage: 203,
  },
];
