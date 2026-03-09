export type WordItem = {
  id: string;
  deckId: string;
  english: string;
  hebrew: string;
  level: 1 | 2;
  category: string;
};

// v0 seed content (expand later + move to DB)
export const WORDS: WordItem[] = [
  // Level 1 - Animals
  { id: 'cat', deckId: 'lvl1-animals', english: 'cat', hebrew: 'חתול', level: 1, category: 'animals' },
  { id: 'dog', deckId: 'lvl1-animals', english: 'dog', hebrew: 'כלב', level: 1, category: 'animals' },
  { id: 'mouse', deckId: 'lvl1-animals', english: 'mouse', hebrew: 'עכבר', level: 1, category: 'animals' },
  { id: 'horse', deckId: 'lvl1-animals', english: 'horse', hebrew: 'סוס', level: 1, category: 'animals' },
  { id: 'lion', deckId: 'lvl1-animals', english: 'lion', hebrew: 'אריה', level: 1, category: 'animals' },
  { id: 'bear', deckId: 'lvl1-animals', english: 'bear', hebrew: 'דוב', level: 1, category: 'animals' },

  // Level 1 - Colors
  { id: 'red', deckId: 'lvl1-colors', english: 'red', hebrew: 'אדום', level: 1, category: 'colors' },
  { id: 'blue', deckId: 'lvl1-colors', english: 'blue', hebrew: 'כחול', level: 1, category: 'colors' },
  { id: 'green', deckId: 'lvl1-colors', english: 'green', hebrew: 'ירוק', level: 1, category: 'colors' },
  { id: 'yellow', deckId: 'lvl1-colors', english: 'yellow', hebrew: 'צהוב', level: 1, category: 'colors' },
  { id: 'black', deckId: 'lvl1-colors', english: 'black', hebrew: 'שחור', level: 1, category: 'colors' },
  { id: 'white', deckId: 'lvl1-colors', english: 'white', hebrew: 'לבן', level: 1, category: 'colors' },

  // Level 1 - School
  { id: 'book', deckId: 'lvl1-school', english: 'book', hebrew: 'ספר', level: 1, category: 'school' },
  { id: 'pencil', deckId: 'lvl1-school', english: 'pencil', hebrew: 'עיפרון', level: 1, category: 'school' },
  { id: 'pen', deckId: 'lvl1-school', english: 'pen', hebrew: 'עט', level: 1, category: 'school' },
  { id: 'bag', deckId: 'lvl1-school', english: 'bag', hebrew: 'תיק', level: 1, category: 'school' },
  { id: 'teacher', deckId: 'lvl1-school', english: 'teacher', hebrew: 'מורה', level: 1, category: 'school' },

  // Level 2 - Verbs
  { id: 'run', deckId: 'lvl2-verbs', english: 'run', hebrew: 'לרוץ', level: 2, category: 'verbs' },
  { id: 'eat', deckId: 'lvl2-verbs', english: 'eat', hebrew: 'לאכול', level: 2, category: 'verbs' },
  { id: 'play', deckId: 'lvl2-verbs', english: 'play', hebrew: 'לשחק', level: 2, category: 'verbs' },
  { id: 'sleep', deckId: 'lvl2-verbs', english: 'sleep', hebrew: 'לישון', level: 2, category: 'verbs' },

  // Level 2 - Adjectives
  { id: 'big', deckId: 'lvl2-adjectives', english: 'big', hebrew: 'גדול', level: 2, category: 'adjectives' },
  { id: 'small', deckId: 'lvl2-adjectives', english: 'small', hebrew: 'קטן', level: 2, category: 'adjectives' },
  { id: 'happy', deckId: 'lvl2-adjectives', english: 'happy', hebrew: 'שמח', level: 2, category: 'adjectives' },
  { id: 'sad', deckId: 'lvl2-adjectives', english: 'sad', hebrew: 'עצוב', level: 2, category: 'adjectives' },
];
