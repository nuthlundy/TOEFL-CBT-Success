/**
 * Cliffs TOEFL Preparation Guide - Test of Written English (TWE)
 * Source: Part VI: Test of Written English (pp. 633–654)
 */

export interface CliffsTweSampleEssay {
  id: string; // e.g. "CLIFFS-PREP-TWE-SAMPLE-01"
  essayNumber: number;
  title: string;
  prompt: string;
  outlineType: 'STANDARD' | 'CLUSTER';
  outline: {
    introductionPlan?: string[];
    bodyParagraphPlans: Array<{ heading: string; points: string[] }>;
    conclusionPlan?: string[];
  };
  introductoryMethod: string; // e.g. "Generalize-Focus-Survey"
  fullEssayText: {
    introduction: string;
    bodyParagraphs: string[];
    conclusion: string;
  };
  sourcePrintedPage: number;
  sourcePdfPage: number;
}

export interface CliffsTwePrompt {
  id: string; // "CLIFFS-PREP-TWE-TOPIC-01"
  topicNumber: number;
  prompt: string;
  hasVisualAid?: boolean;
  visualAidDescription?: string;
  sourcePrintedPage: number;
  sourcePdfPage: number;
}

export interface CliffsTweRubricCriterion {
  number: number;
  category: 'Address the Topic' | 'Organize Its Thoughts' | 'Support Its Points' | 'Use Language Correctly';
  question: string;
}

export const CLIFFS_TWE_RUBRIC: CliffsTweRubricCriterion[] = [
  { number: 1, category: 'Address the Topic', question: 'Does it focus on the assigned topic?' },
  { number: 2, category: 'Address the Topic', question: 'Does it complete all tasks set forth by the assignment?' },
  { number: 3, category: 'Organize Its Thoughts', question: 'Is there an effective introduction?' },
  { number: 4, category: 'Organize Its Thoughts', question: 'Are the paragraphs logically arranged?' },
  { number: 5, category: 'Organize Its Thoughts', question: 'Does each paragraph focus on one main idea?' },
  { number: 6, category: 'Organize Its Thoughts', question: 'Are there smooth transitions between paragraphs?' },
  { number: 7, category: 'Organize Its Thoughts', question: 'Is there an effective closing?' },
  { number: 8, category: 'Support Its Points', question: 'Are there sufficient specific details for each point?' },
  { number: 9, category: 'Support Its Points', question: 'Are the examples given relevant to the issue?' },
  { number: 10, category: 'Support Its Points', question: 'Are the examples fully developed?' },
  { number: 11, category: 'Use Language Correctly', question: 'Are grammar and usage correct?' },
  { number: 12, category: 'Use Language Correctly', question: 'Is punctuation correct?' },
  { number: 13, category: 'Use Language Correctly', question: 'Is spelling correct?' },
  { number: 14, category: 'Use Language Correctly', question: 'Is vocabulary correct?' },
];

export const CLIFFS_TWE_SAMPLE_ESSAYS: CliffsTweSampleEssay[] = [
  {
    id: 'CLIFFS-PREP-TWE-SAMPLE-01',
    essayNumber: 1,
    title: 'Buying vs. Renting a Home',
    prompt: 'Some people purchase a home and others rent. Describe one or two benefits of owning a home and one or two benefits of renting. Compare the two options and explain which you think might be better for someone your age and in your situation.',
    outlineType: 'STANDARD',
    outline: {
      bodyParagraphPlans: [
        {
          heading: 'I. Benefits of owning',
          points: [
            'A. It is yours and you can do what you want (no noise worries, can redecorate without deposit penalty)',
            'B. Financial reasons (interest tax deductible, home appreciates in value)',
          ],
        },
        {
          heading: 'II. Benefits of renting',
          points: [
            'A. Not tied down (easy to move, only worry about lease)',
            'B. Financial reasons (no down payment, no credit qualification)',
          ],
        },
        {
          heading: 'III. Renting better for foreign student in early 20s',
          points: [
            'A. Not tied down (may transfer, return to own country)',
            'B. Financial reasons (cannot afford to buy, no credit)',
          ],
        },
      ],
    },
    introductoryMethod: 'Generalize-Focus-Survey (3–4 sentence formula: Generalize topic -> Focus on core thesis -> Survey key body arguments)',
    fullEssayText: {
      introduction: 'Many find it advantageous to purchase a home, but others find renting more suited to their needs. While there are advantages for both options, renting is generally the best choice for young foreign students. Foreign students often do not have good credit histories or enough money to buy a home and need to know that it will not be necessary to find a buyer for the home if they decide to transfer to another school or return home.',
      bodyParagraphs: [
        'Owning a home provides a number of benefits. For example, a homeowner can make more noise than someone who lives in an apartment without having to worry that every small noise might disturb neighbors. Unlike apartment dwellers, homeowners can also put holes in walls and redecorate without being concerned about losing part or all of a security deposit. Owning is also an advantage because the interest on mortgage payments can be deducted on their income tax. In addition, real estate generally appreciates in value over the years.',
        'There are also benefits to renting. A renter is tied down only by the terms of the rental agreement or lease. If a renter wants to move, it is not necessary to find a buyer. In addition, a renter does not have to provide a large down payment as does a home owner and does not have to have a good credit history.',
        'A foreign student who plans to return home after college or who wishes to transfer to another school often cannot be tied down to a house. The foreign student often does not have enough money for a down payment or a credit history sufficient to borrow money to purchase a home. Consequently, renting is the answer for most young foreign students.',
      ],
      conclusion: 'At various times of their lives, people have different needs. While purchasing a home is often the best choice for somebody with an adequate income and roots in a community, for the reasons discussed, it is often not the most feasible choice for young foreign students.',
    },
    sourcePrintedPage: 637,
    sourcePdfPage: 652,
  },
  {
    id: 'CLIFFS-PREP-TWE-SAMPLE-02',
    essayNumber: 2,
    title: 'Calcuholism: Overdependence on Calculators',
    prompt: 'A writer has accused teachers and parents of causing children to develop calcuholism—a reliance on calculators and resulting loss of mathematical ability. Describe what you believe the writer means by calcuholism and what you believe causes it. Also state what you believe can be done to alleviate the problem.',
    outlineType: 'CLUSTER',
    outline: {
      bodyParagraphPlans: [
        {
          heading: 'I. What the writer means by calcuholism',
          points: [
            'A. Term indicates an addiction or dependency',
            'B. Generally such a dependency is unhealthy',
            'C. Problem: if children rely too much on calculators, they lose ability to do math easily without it',
          ],
        },
        {
          heading: 'II. What causes it—more technology',
          points: [
            'A. Emphasis in schools on advanced math and technical classes requiring calculators',
            'B. Emphasis in offices on speed and efficiency—word processors and computers',
            'C. Emphasis in industry on technologically advanced machines',
          ],
        },
        {
          heading: 'III. What can be done to alleviate it',
          points: [
            'A. Schools should avoid causing students to rely on calculators too early',
            'B. All should avoid becoming too dependent: restrict use, keep up actual math practice',
          ],
        },
      ],
    },
    introductoryMethod: 'Outline-Form Introduction (Presents general thesis statement corresponding to outline sections)',
    fullEssayText: {
      introduction: 'It has been said that many people are victims of calcuholism, a dependence on the use of calculators, causing a diminished ability to do mathematics on one’s own. Technology in schools, offices, and industry has resulted in an unfortunate overdependence on all types of modern devices, but particularly on calculators. Calcuholism can be avoided if schools and individuals concentrate on using the mind to do mathematics rather than relying on calculators for simple tasks.',
      bodyParagraphs: [
        'Obviously the term calcuholism has been coined with the intent to compare it to other addictions such as alcoholism. While it is not nearly as serious as alcoholism, dependence on the calculator can be harmful. Abuse of something normally beneficial may lead to a harmful reliance on it. It is not that calculators are harmful, but that overuse may cause harm by causing people to forget how to do mathematics with their own minds.',
        'The problem arises from modern technological advances. In schools, classes become more complicated because of the technology for which students must be prepared when they graduate. Calculators are permitted and essential in many such classes. In offices, calculators, computers, and word processing systems are commonplace because they increase speed and improve efficiency. Business people may spend hours working with numbers and rarely calculate mentally. In industry as well, the emphasis on advanced machines results in individuals solving fewer mathematical problems on their own.',
        'To alleviate the problem, schools should avoid allowing students to use calculators too early and should require sufficient in-class work without them. All of us should restrict our use of calculators and strive to do math on our own so that we will not lose our basic math skills.',
      ],
      conclusion: 'Calcuholism has increased in recent years and will continue to increase due to advances in technology. To avoid dependency, we must do mathematics with our minds from time to time rather than with a machine.',
    },
    sourcePrintedPage: 641,
    sourcePdfPage: 656,
  },
  {
    id: 'CLIFFS-PREP-TWE-SAMPLE-03',
    essayNumber: 3,
    title: 'World Petroleum Production and Consumption Analysis',
    prompt: 'The chart below shows the number of barrels of oil produced and the number consumed by various regions of the world (Australasia, Asia, Latin America, Africa, United States and Canada, Europe, Middle East). What does the chart tell you? Write one or more paragraphs that convey the information displayed in the chart.',
    outlineType: 'STANDARD',
    outline: {
      bodyParagraphPlans: [
        {
          heading: 'I. Regions that use more than they produce',
          points: [
            'A. Australasia and Asia: each uses about 50% more than produced',
            'B. Europe: uses ~75% more than produced; almost largest producer, but largest user',
            'C. U.S. and Canada: produce 3/5 of what is used; produce twice what many others produce, but use most except Europe',
          ],
        },
        {
          heading: 'II. Regions that produce more than they use',
          points: [
            'A. Latin America: uses 6/7 of what it produces; biggest user among surplus regions',
            'B. Africa: produces more than twice what it uses; low usage',
            'C. Middle East: produces more than any other region; tied with Africa for smallest usage',
          ],
        },
        {
          heading: 'III. Possible explanations and results',
          points: [
            'A. Heavy industrial and vehicle needs in U.S. and Europe',
            'B. Lower petroleum needs in Africa and Middle East industry/transport',
            'C. Surplus regions profit selling to deficit regions',
          ],
        },
      ],
    },
    introductoryMethod: 'Generalize-Focus-Survey Graph Analysis',
    fullEssayText: {
      introduction: 'A graph of world petroleum consumption compared to petroleum use shows a tremendous difference among regions. Some use more than they produce, while others produce more than they use. Certain regions have large petroleum production but lack the industry and transportation to utilize it. They are able to make a profit by selling to regions that need it.',
      bodyParagraphs: [
        'Four regions shown consume more petroleum than they produce. Both Australasia and Asia consume about fifty percent more than they produce. Europe consumes about seventy-five percent more than it produces. It is one of the largest producers but also is the largest consumer of all the regions. The United States and Canada together produce about three fifths of what they consume; while they produce more than twice as much as many other regions, they consume the most with the exception of Europe.',
        'Three regions shown on the chart produce more than they consume. Latin America produces approximately ten percent more than it consumes. It is the biggest consumer among the regions that produce more than they consume. Africa produces more than twice what it consumes, and the Middle East is the biggest producer of all. However, those two regions are tied for consuming the smallest amount.',
        'The United States, Canada, and Europe use a great deal more than they produce, but each produces a considerable amount. The high usage probably results from their industrial and transportation requirements. On the other hand, Africa and the Middle East produce much more than they use, which probably indicates low petroleum needs in industry and transportation.',
      ],
      conclusion: 'As the chart describes, certain regions produce more petroleum than they consume, and others consume more than they produce. Those with a surplus can profit by selling it to the large consumers that cannot produce all that they need.',
    },
    sourcePrintedPage: 645,
    sourcePdfPage: 660,
  },
];

export const CLIFFS_TWE_PROMPTS: CliffsTwePrompt[] = [
  {
    id: 'CLIFFS-PREP-TWE-TOPIC-01',
    topicNumber: 1,
    prompt: 'You are an employer who must decide how to handle the smoking issue in your office. Many of your employees are nonsmokers, but some, including your managers, are smokers. Devise a plan that would satisfy both groups. Explain the benefits of the plan you choose and its advantages over other options.',
    sourcePrintedPage: 648,
    sourcePdfPage: 663,
  },
  {
    id: 'CLIFFS-PREP-TWE-TOPIC-02',
    topicNumber: 2,
    prompt: 'Is having a college education and a degree all that important today? Explain advantages and disadvantages to seeking a college degree as opposed to beginning work after high school and explain which of the courses of action you support.',
    sourcePrintedPage: 648,
    sourcePdfPage: 663,
  },
  {
    id: 'CLIFFS-PREP-TWE-TOPIC-03',
    topicNumber: 3,
    prompt: 'In American colleges and universities, students study material from a variety of areas. Should courses concentrate only in the area of the student’s future careers, or should they continue to be in many different areas? Compare the benefits of the two options and explain which position you support.',
    sourcePrintedPage: 648,
    sourcePdfPage: 663,
  },
  {
    id: 'CLIFFS-PREP-TWE-TOPIC-04',
    topicNumber: 4,
    prompt: 'Being bilingual has many advantages, but it is very difficult for many people to achieve. What are some benefits of being bilingual or multilingual?',
    sourcePrintedPage: 648,
    sourcePdfPage: 663,
  },
  {
    id: 'CLIFFS-PREP-TWE-TOPIC-05',
    topicNumber: 5,
    prompt: 'Some major companies in the United States are discussing the idea of having their employees work ten-hour days, forty hours a week, with three days off instead of two. What are the advantages and disadvantages of such a plan? Decide whether this plan or the standard eight-hour day and five-day week would be better for a business that you are familiar with and support your choice.',
    sourcePrintedPage: 648,
    sourcePdfPage: 663,
  },
  {
    id: 'CLIFFS-PREP-TWE-TOPIC-06',
    topicNumber: 6,
    prompt: 'The four charts below show various information regarding farming in the United States for the years 1900, 1925, 1950, and 1975 (Farm population, Numbers of farms, Average size of farms in acres, Average crop production per acre in bushels). What do the charts tell you? Write one or more paragraphs that convey the information in the four charts.',
    hasVisualAid: true,
    visualAidDescription: 'Four historical bar charts comparing farm population in millions (declining 30M to 8M), number of farms in millions (declining 5.7M to 2.3M), average farm size in acres (increasing 150 to 440 acres), and crop yield per acre in bushels (increasing 50 to 120 bushels) from 1900 to 1975.',
    sourcePrintedPage: 649,
    sourcePdfPage: 664,
  },
  {
    id: 'CLIFFS-PREP-TWE-TOPIC-07',
    topicNumber: 7,
    prompt: 'Students who live away from home while attending classes face the task of choosing housing accommodations. Some live in dormitories; others prefer living alone in apartments. Explain the benefits and disadvantages of the different options and support the option you prefer.',
    sourcePrintedPage: 650,
    sourcePdfPage: 665,
  },
  {
    id: 'CLIFFS-PREP-TWE-TOPIC-08',
    topicNumber: 8,
    prompt: 'Some educators believe that students should receive letter grades in the courses in their major areas of concentration and pass-fail grades in all other subjects. Give the advantages and disadvantages of the two positions and explain which position you support.',
    sourcePrintedPage: 650,
    sourcePdfPage: 665,
  },
  {
    id: 'CLIFFS-PREP-TWE-TOPIC-09',
    topicNumber: 9,
    prompt: 'The diagram below shows the hydrologic cycle (clouds, precipitation, rivers and lakes, groundwater, runoff, percolation, ocean, evaporation, wind, condensation). What does the diagram tell you? Write one or two paragraphs that convey the information shown in the diagram.',
    hasVisualAid: true,
    visualAidDescription: 'Hydrologic cycle diagram illustrating precipitation falling onto land/lakes, percolation into groundwater, surface runoff into oceans, evaporation rising into clouds, condensation, and wind transportation.',
    sourcePrintedPage: 650,
    sourcePdfPage: 665,
  },
  {
    id: 'CLIFFS-PREP-TWE-TOPIC-10',
    topicNumber: 10,
    prompt: 'The four charts below show percentages of manufactured products, agricultural products, and mineral products produced in four states (New Mexico: 65% mineral, 21% agriculture, 14% manufactured; New Hampshire: 96% manufactured, 3% agriculture, 1% mineral; Nebraska: 64% agriculture, 34% manufactured, 2% mineral; Florida: 66% manufactured, 23% agriculture, 11% mineral). What do the charts tell you? Write one or more paragraphs that convey the information in the four charts.',
    hasVisualAid: true,
    visualAidDescription: 'Four state economy pie charts showing product breakdown between manufacturing, agriculture, and minerals for New Mexico, New Hampshire, Nebraska, and Florida.',
    sourcePrintedPage: 651,
    sourcePdfPage: 666,
  },
];
