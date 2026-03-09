export type DeckLevel = 1 | 2;

export type Deck = {
  id: string;
  titleHe: string;
  level: DeckLevel;
  category: string;
  descriptionHe?: string;
};

export const DECKS: Deck[] = [
  {
    id: 'lvl1-animals',
    titleHe: 'חיות',
    level: 1,
    category: 'animals',
    descriptionHe: 'מילים בסיסיות על חיות',
  },
  {
    id: 'lvl1-colors',
    titleHe: 'צבעים',
    level: 1,
    category: 'colors',
    descriptionHe: 'צבעים נפוצים',
  },
  {
    id: 'lvl1-school',
    titleHe: 'בית ספר',
    level: 1,
    category: 'school',
    descriptionHe: 'דברים מבית הספר',
  },
  {
    id: 'lvl2-verbs',
    titleHe: 'פעולות',
    level: 2,
    category: 'verbs',
    descriptionHe: 'פעלים בסיסיים (מתחילים)',
  },
  {
    id: 'lvl2-adjectives',
    titleHe: 'תארים',
    level: 2,
    category: 'adjectives',
    descriptionHe: 'גדול/קטן וכו׳',
  },
];
