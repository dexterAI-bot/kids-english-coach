export type DeckLevel = 1 | 2;

export type Deck = {
  id: string;
  titleHe: string;
  level: DeckLevel;
  category: string;
  descriptionHe?: string;
};

// Level 1 = single-word translations (Hebrew UI, no nikud)
// Level 2 = simple verbs/adjectives/phrases later
export const DECKS: Deck[] = [
  // L1
  { id: 'lvl1-animals', titleHe: 'חיות', level: 1, category: 'animals', descriptionHe: 'חיות נפוצות' },
  { id: 'lvl1-colors', titleHe: 'צבעים', level: 1, category: 'colors', descriptionHe: 'צבעים בסיסיים' },
  { id: 'lvl1-school', titleHe: 'בית ספר', level: 1, category: 'school', descriptionHe: 'דברים מבית הספר' },
  { id: 'lvl1-food', titleHe: 'אוכל', level: 1, category: 'food', descriptionHe: 'מילים טעימות' },
  { id: 'lvl1-family', titleHe: 'משפחה', level: 1, category: 'family', descriptionHe: 'אמא, אבא ועוד' },
  { id: 'lvl1-toys', titleHe: 'צעצועים', level: 1, category: 'toys', descriptionHe: 'דברים שאוהבים לשחק איתם' },
  { id: 'lvl1-clothes', titleHe: 'בגדים', level: 1, category: 'clothes', descriptionHe: 'מה לובשים?' },
  { id: 'lvl1-numbers', titleHe: 'מספרים', level: 1, category: 'numbers', descriptionHe: '1–20' },
  { id: 'lvl1-body', titleHe: 'גוף', level: 1, category: 'body', descriptionHe: 'ראש, ידיים, רגליים' },
  { id: 'lvl1-home', titleHe: 'בית', level: 1, category: 'home', descriptionHe: 'חדרים וחפצים בבית' },

  // L2 (kept for later growth)
  { id: 'lvl2-verbs', titleHe: 'פעולות', level: 2, category: 'verbs', descriptionHe: 'פעלים בסיסיים' },
  { id: 'lvl2-adjectives', titleHe: 'תארים', level: 2, category: 'adjectives', descriptionHe: 'גדול/קטן וכו׳' },
];
