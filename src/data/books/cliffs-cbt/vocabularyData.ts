/**
 * CliffsTestPrep TOEFL CBT - Problem Vocabulary & Prepositions
 * Source: Part III: Detailed Review of Items Tested - Word Choice & Prepositions (pp. 128–144)
 */

export interface CliffsCbtVocabularyPair {
  id: string; // e.g. "CLIFFS-CBT-VOCAB-01"
  pair: string;
  words: Array<{
    term: string;
    pos: string;
    definition: string;
    example: string;
  }>;
}

export const CLIFFS_CBT_VOCABULARY: CliffsCbtVocabularyPair[] = [
  {
    id: 'CLIFFS-CBT-VOCAB-01',
    pair: 'AFFECT / EFFECT',
    words: [
      { term: 'AFFECT', pos: 'verb', definition: 'to produce an influence upon or change in', example: 'The weather will affect the flight schedule.' },
      { term: 'EFFECT', pos: 'noun', definition: 'result or consequence', example: 'The new regulations had an immediate effect on air quality.' },
    ],
  },
  {
    id: 'CLIFFS-CBT-VOCAB-02',
    pair: 'ACCEPT / EXCEPT',
    words: [
      { term: 'ACCEPT', pos: 'verb', definition: 'to receive willingly or agree to', example: 'She accepted the research fellowship.' },
      { term: 'EXCEPT', pos: 'preposition', definition: 'with the exclusion of; but', example: 'All members attended the conference except Dr. Evans.' },
    ],
  },
  {
    id: 'CLIFFS-CBT-VOCAB-03',
    pair: 'COMPLIMENT / COMPLEMENT',
    words: [
      { term: 'COMPLIMENT', pos: 'noun/verb', definition: 'praise or flattery', example: 'The professor gave her a compliment on her presentation.' },
      { term: 'COMPLEMENT', pos: 'noun/verb', definition: 'something that completes or pairs well with another', example: 'The practical lab work is a vital complement to the theory.' },
    ],
  },
  {
    id: 'CLIFFS-CBT-VOCAB-04',
    pair: 'EMIGRATE / IMMIGRATE',
    words: [
      { term: 'EMIGRATE', pos: 'verb', definition: 'to leave one country to settle in another', example: 'Many scientists emigrated from Europe during that era.' },
      { term: 'IMMIGRATE', pos: 'verb', definition: 'to enter and settle in a new country', example: 'Her grandparents immigrated to Canada in the 1950s.' },
    ],
  },
  {
    id: 'CLIFFS-CBT-VOCAB-05',
    pair: 'PRINCIPAL / PRINCIPLE',
    words: [
      { term: 'PRINCIPAL', pos: 'noun/adjective', definition: 'head of an institution; main or primary', example: 'The principal investigator published the trial results.' },
      { term: 'PRINCIPLE', pos: 'noun', definition: 'fundamental truth, law, or doctrine', example: 'The experiment was designed around the principle of conservation of energy.' },
    ],
  },
];
