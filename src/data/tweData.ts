/**
 * Guide to the Test of Written English (TWE) Data
 * Based on Peterson's TOEFL CBT Success (Bruce Rogers, Thomson Learning)
 */

export interface TweRubricLevel {
  score: number;
  label: string;
  description: string;
}

export const TWE_RUBRIC: TweRubricLevel[] = [
  {
    score: 6,
    label: 'Demonstrates Clear Competence',
    description: 'Strongly indicates the ability to write a well-organized, well-developed, and logical essay. Specific examples and details support main ideas. Elements are unified and cohesive. A variety of sentence structures and sophisticated vocabulary are employed. Grammatical errors are infrequent.',
  },
  {
    score: 5,
    label: 'Demonstrates Competence',
    description: 'Indicates the ability to write an organized, developed, and logical essay. Main ideas are adequately supported by examples and details. Sentence structure may be less varied than a level 6 essay, and vocabulary less sophisticated. Some minor grammatical errors appear.',
  },
  {
    score: 4,
    label: 'Suggests Competence',
    description: 'Indicates moderate ability to write an acceptable essay. Although main ideas may be adequately supported, weaknesses in organization and development will be apparent. Sentence structure and vocabulary may lack sophistication. Grammatical errors may be frequent.',
  },
  {
    score: 3,
    label: 'Demonstrates Some Developing Competence',
    description: 'Indicates minimal ability in writing an acceptable essay, with serious weaknesses in organization and development. Significant sentence-structure and vocabulary problems occur, with frequent grammatical errors that sometimes make ideas difficult to comprehend.',
  },
  {
    score: 2,
    label: 'Suggests Incompetence',
    description: 'Indicates inability to write an acceptable essay. Organization and development are very weak or nonexistent. Lacks unity and cohesion. Few if any specific details are given. Frequent errors in grammar occur throughout.',
  },
  {
    score: 1,
    label: 'Demonstrates Incompetence',
    description: 'Strongly indicates the inability to write an acceptable essay. No apparent development or organization. Sentences may be brief, fragmentary, and unrelated. Severe grammatical errors make it difficult to understand the author’s ideas.',
  },
];

export const TWE_TEN_KEYS = [
  {
    number: 1,
    title: 'Budget your time carefully',
    text: 'You have only a half hour (30 minutes) in which to complete your essay. Budget it as: Reading & thinking (2 mins), Planning & taking notes (3 mins), Writing the essay (22 mins), Checking the essay (3 mins).',
  },
  {
    number: 2,
    title: 'Read the question carefully',
    text: 'Write on the topic exactly as it is given. If you write on another topic, you receive a score of zero (OFF-TOPIC). Completely address both sides when requested.',
  },
  {
    number: 3,
    title: 'Brainstorm',
    text: 'Spend 1–2 minutes jotting down positive and negative ideas in the NOTES section. There is no "correct" stance—choose whichever side you can support with the strongest examples.',
  },
  {
    number: 4,
    title: 'Plan your essay before you write',
    text: 'Organize an informal outline before you begin writing so your mind is free to concentrate on sentence flow and vocabulary.',
  },
  {
    number: 5,
    title: 'Ensure clean legibility',
    text: 'Clear paragraph breaks and legible text make an immediate positive impression on ETS raters.',
  },
  {
    number: 6,
    title: 'Follow a clear, logical organization',
    text: 'Every TWE essay should consist of: (1) Introduction with thesis statement, (2) Body Paragraph 1, (3) Body Paragraph 2, (4) Conclusion providing closure.',
  },
  {
    number: 7,
    title: 'Use concrete examples and specific reasons',
    text: 'Whenever you state a claim, support it immediately with a specific real-world example, figure, or personal experience.',
  },
  {
    number: 8,
    title: 'Use signal words to indicate transitions',
    text: 'Connect ideas smoothly using transition words: "First, ...", "Furthermore, ...", "On the other hand, ...", "Therefore, ...", "In conclusion, ...".',
  },
  {
    number: 9,
    title: 'Use a variety of sentence types',
    text: 'Balance short simple sentences with complex sentences containing adverb or adjective clauses. Start some sentences with prepositional phrases.',
  },
  {
    number: 10,
    title: 'Check your essay for errors',
    text: 'Reserve 3 minutes at the end to check subject-verb agreement, verb tenses, singular/plural endings, and spelling of common words.',
  },
];

export interface ModelEssay {
  id: string;
  topicType: string;
  topicTitle: string;
  prompt: string;
  notesOutline: {
    intro: string;
    bodyPart1: string;
    bodyPart2: string;
    conclusion: string;
  };
  essayText: string;
  commentary: string;
}

export const MODEL_ESSAYS: ModelEssay[] = [
  {
    id: 'model-a-space',
    topicType: 'Topic Type A: Contrast / Opinion',
    topicTitle: 'Space Research: Benefits vs. Waste',
    prompt: 'Some people believe that money spent on space research benefits all of humanity. Others take the opposite view and say that money for this type of research is wasted. Discuss these two positions, using examples. Tell which view you agree with and explain why.',
    notesOutline: {
      intro: 'Space research + 50 years: expensive — $ well spent or wasted?',
      bodyPart1: 'Negative ideas: costs billions, no real benefits (trip to Moon only brought rocks); money needed on Earth for housing, environment, diseases.',
      bodyPart2: 'Positive ideas: consumer products (PCs, freeze-dried food, pacemakers), weather/comm satellites, scientific knowledge.',
      conclusion: 'Many benefits — human race needs a challenge just as individuals do — worth all money spent.',
    },
    essayText: `For over fifty years, a number of nations have been involved in the exploration of outer space. This research has been very costly, of course. Has this money been well-spent or wasted?

Some people believe that all or most space research should be eliminated because of its incredible expense, not only in terms of money, but also in terms of scientific and human resources. These people point out the fact that it cost billions of dollars to send astronauts to the moon, but all they brought back were some worthless rocks. These people say that the money and effort now being wasted in outer space could be spent on more important projects right here on earth, such as providing housing for homeless people, improving the education system, saving the environment, and finding cures for diseases.

However, other people believe that space research has provided many benefits to mankind. They point out that hundreds of useful products, from personal computers to heart pacemakers to freeze-dried foods, are the direct or indirect results of space research. They say that weather and communication satellites, which are also products of space programs, have benefitted people all over the globe. In addition to these practical benefits, supporters of the space program point to the scientific knowledge that has been acquired about the sun, the moon, the planets, and even our own earth as a result of space research.

I agree with those people who support space research and want it to continue. Space research, as shown, has already brought many benefits to humanity. Perhaps it will bring even more benefits in the future, ones that we can't even imagine now. Moreover, just as individual people need challenges to make their lives more interesting, I believe the human race itself needs a challenge, and I think that the peaceful exploration of outer space provides just such a challenge.`,
    commentary: 'This model essay achieves a 6 score by presenting both positions clearly in Paragraphs 2 and 3 before expressing an authentic, reasoned personal thesis in Paragraph 4.',
  },
  {
    id: 'model-b-jet',
    topicType: 'Topic Type B: Importance of an Invention',
    topicTitle: 'Transportation: International Jet Travel',
    prompt: 'Developments in transportation such as the invention of the automobile have had an enormous impact on modern society. Choose another development in transportation that you think is of great importance. Give reasons for your selection.',
    notesOutline: {
      intro: 'International jet transport since 1950s — speed + low costs changed world concept.',
      bodyPart1: 'Speed: 100 yrs ago took weeks by ship; today hours. Paris meeting + NY dinner same day. World smaller.',
      bodyPart2: 'Low costs: in past only wealthy traveled comfortably; today accessible to students, businessmen, tourists.',
      conclusion: 'Nations no longer isolated; people view the world as their hometown.',
    },
    essayText: `I believe that one of the most important developments in transportation has been the development of international jet transport. Since this style of transportation appeared in the 1950s, it has had some revolutionary effects. Because of the high speeds and the relatively low costs of this type of travel, it has changed the way people look at the world.

The most obviously important characteristic of jet travel is the high speed involved. A hundred years ago, it took weeks to cross the Atlantic or Pacific Oceans by ship. Today, those same trips can be completed in a matter of hours. One can attend a meeting in Paris and have dinner in New York the same day. These amazing speeds have changed people's concepts of space. Today the world is much smaller than it was in the past.

Another important aspect of jet travel is its relatively low cost. An international journey one hundred years ago was extremely expensive. Only wealthy people could afford to travel comfortably, in first class. Poor people had to save for years to purchase a ticket, and the conditions in which they traveled were not very good. Today it is possible for more and more people in every country to travel in comfort. Thus it is possible for businessmen to do business all over the world, for students to attend universities in other countries, and for tourists to take vacations anywhere in the world.

In conclusion, the speed and low cost of international jet travel have changed the world. Individual nations are not as isolated as they were in the past, and people now think of the whole planet as they once thought of their own hometowns.`,
    commentary: 'A classic 4-paragraph structure examining two distinct virtues (speed and affordability) with crisp transitions and closing synthesis.',
  },
];

export interface TweTopicPrompt {
  id: string;
  topicNumber: number;
  title: string;
  prompt: string;
  sourcePage: number;
}

export const TWE_PRACTICE_TOPICS: TweTopicPrompt[] = [
  {
    id: 'twe-topic-1',
    topicNumber: 1,
    title: 'Television Advertising: Beneficial vs. Negative',
    prompt: 'Some people believe that advertising on television is generally beneficial to viewers. Others take the position that television advertising has primarily negative effects. Which position do you agree with? Explain your decision, using specific examples.',
    sourcePage: 380,
  },
  {
    id: 'twe-topic-2',
    topicNumber: 2,
    title: 'University Education: Specialized vs. General',
    prompt: 'Some people say that university students should concentrate on their own field of study, and that all the classes they take should be closely related to that subject. Others believe that university students should get a general education, taking classes in many fields before concentrating on a single field. Discuss both points of view, using concrete examples. Which view do you support? Give reasons for your choice.',
    sourcePage: 383,
  },
  {
    id: 'twe-topic-3',
    topicNumber: 3,
    title: 'Communities: Housing and Quality of Life',
    prompt: 'Good, affordable housing is one of the factors that make a community a desirable place to live. Choose one other factor that you feel is important. Give specific reasons for your choice.',
    sourcePage: 386,
  },
];

/**
 * Heuristic Rubric Evaluator for Student Essay Practice
 * Complies with rule:
 * "Do not automatically claim that an AI-generated essay score is an official TOEFL score."
 * Always labeled: "AI Practice Feedback — Not an Official TOEFL Score"
 */
export function evaluateTweEssay(text: string, notes: string): {
  score: number;
  wordCount: number;
  paragraphCount: number;
  strengths: string[];
  weaknesses: string[];
  scoreDescription: string;
} {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const paragraphCount = paragraphs.length;

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  // Check word count
  if (wordCount >= 250) {
    strengths.push(`Good essay length (${wordCount} words; meets the standard 200–300 word target).`);
  } else if (wordCount >= 180) {
    strengths.push(`Adequate length (${wordCount} words). Try to add one more illustrative example to exceed 250 words.`);
  } else {
    weaknesses.push(`Word count is low (${wordCount} words). A typical competitive TWE response is 200–300 words.`);
  }

  // Check paragraph structure
  if (paragraphCount >= 4) {
    strengths.push(`Solid 4-paragraph organizational structure (Introduction, 2 Body Paragraphs, Conclusion).`);
  } else if (paragraphCount === 3) {
    weaknesses.push(`Only ${paragraphCount} paragraphs detected. Consider separating points into distinct body paragraphs and adding a dedicated conclusion.`);
  } else {
    weaknesses.push(`Too few paragraphs (${paragraphCount}). TWE requires clear multi-paragraph organization.`);
  }

  // Check transitional markers
  const transitions = ['first', 'second', 'furthermore', 'moreover', 'however', 'on the other hand', 'in conclusion', 'for example', 'for instance', 'therefore', 'consequently'];
  const matchedTransitions = transitions.filter((t) => text.toLowerCase().includes(t));
  if (matchedTransitions.length >= 4) {
    strengths.push(`Effective use of signal/transitional words: ${matchedTransitions.slice(0, 4).join(', ')}.`);
  } else {
    weaknesses.push(`Limited transitional signposts. Incorporate signal words like "Furthermore", "However", "In addition", or "Consequently".`);
  }

  // Check notes utilization
  if (notes.trim().length > 30) {
    strengths.push(`Active pre-writing planning notes utilized prior to drafting.`);
  }

  // Score estimate based on rubric criteria
  let score = 3;
  if (wordCount >= 280 && paragraphCount >= 4 && matchedTransitions.length >= 4) {
    score = 6;
  } else if (wordCount >= 220 && paragraphCount >= 4 && matchedTransitions.length >= 3) {
    score = 5;
  } else if (wordCount >= 170 && paragraphCount >= 3) {
    score = 4;
  } else if (wordCount >= 100) {
    score = 3;
  } else if (wordCount >= 50) {
    score = 2;
  } else {
    score = 1;
  }

  const level = TWE_RUBRIC.find((r) => r.score === score) || TWE_RUBRIC[2];

  return {
    score,
    wordCount,
    paragraphCount,
    strengths,
    weaknesses,
    scoreDescription: level.description,
  };
}
