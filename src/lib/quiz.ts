import { WORDS, type WordItem } from '@/lib/words';

export function sampleQuestions(deckId: string, count: number) {
  const pool = WORDS.filter((w) => w.deckId === deckId);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function makeOptions(word: WordItem, optionCount = 4) {
  const sameDeck = WORDS.filter((w) => w.deckId === word.deckId && w.id !== word.id);
  const sameCategory = WORDS.filter((w) => w.category === word.category && w.id !== word.id);

  // Prefer same deck/category; fallback to anything else.
  const candidates = [...sameDeck, ...sameCategory].filter((w, i, arr) => arr.findIndex((x) => x.id === w.id) === i);
  const fallback = WORDS.filter((w) => w.id !== word.id);

  const pickFrom = (arr: WordItem[], n: number) => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  };

  const needed = optionCount - 1;
  const distractors = candidates.length >= needed ? pickFrom(candidates, needed) : pickFrom([...candidates, ...fallback], needed);

  const opts = [word.hebrew, ...distractors.map((d) => d.hebrew)];
  // shuffle
  return opts.sort(() => Math.random() - 0.5);
}
