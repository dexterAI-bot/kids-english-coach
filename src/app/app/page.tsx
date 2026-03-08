'use client';

import { useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/browser';

type Word = {
  id: string;
  english: string;
  hebrew: string;
  optionsHe: string[];
};

const WORDS: Word[] = [
  { id: 'cat', english: 'cat', hebrew: 'חתול', optionsHe: ['חתול', 'כלב', 'עכבר', 'סוס'] },
  { id: 'red', english: 'red', hebrew: 'אדום', optionsHe: ['ירוק', 'כחול', 'אדום', 'צהוב'] },
  { id: 'apple', english: 'apple', hebrew: 'תפוח', optionsHe: ['בננה', 'תפוח', 'לחם', 'גבינה'] },
];

export default function QuizPage() {
  const supabase = useMemo(() => createClient(), []);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const word = WORDS[i % WORDS.length];
  const correct = picked && picked === word.hebrew;

  async function recordAttempt(isCorrect: boolean) {
    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('attempts').insert({
        user_id: user.id,
        word_id: word.id,
        is_correct: isCorrect,
        chosen_hebrew: picked,
      });
    } finally {
      setSaving(false);
    }
  }

  async function pick(opt: string) {
    if (picked) return;
    setPicked(opt);
    await recordAttempt(opt === word.hebrew);
  }

  function next() {
    setPicked(null);
    setI((x) => x + 1);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Quiz</h1>
        <p className="text-sm text-gray-600">בחרי את המשמעות בעברית</p>
      </div>

      <div className="rounded-xl border p-6 space-y-4">
        <div className="text-4xl font-bold" data-testid="english-word">
          {word.english}
        </div>

        <button
          data-testid="play-audio"
          className="rounded border px-3 py-2"
          onClick={() => {
            const u = new SpeechSynthesisUtterance(word.english);
            u.lang = 'en-US';
            window.speechSynthesis.speak(u);
          }}
        >
          🔊 Play
        </button>

        <div className="grid grid-cols-2 gap-3">
          {word.optionsHe.map((opt) => {
            const isCorrectOpt = opt === word.hebrew;
            const isPicked = picked === opt;

            const cls =
              'rounded-xl border p-4 text-right ' +
              (picked
                ? isPicked
                  ? isCorrectOpt
                    ? 'bg-green-100 border-green-400'
                    : 'bg-red-100 border-red-400'
                  : isCorrectOpt
                    ? 'bg-green-50 border-green-300'
                    : 'opacity-60'
                : 'hover:bg-gray-50');

            return (
              <button
                key={opt}
                data-testid={`answer-${opt}`}
                className={cls}
                onClick={() => pick(opt)}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {picked ? (
          <div className="flex items-center justify-between">
            <div className="text-sm">
              {correct ? 'מעולה!' : `התשובה הנכונה: ${word.hebrew}`}
              {saving ? <span className="ml-2 text-gray-500">Saving…</span> : null}
            </div>
            <button className="rounded bg-blue-600 text-white px-4 py-2" onClick={next}>
              Next
            </button>
          </div>
        ) : (
          <div className="text-xs text-gray-500">4 אפשרויות • בלי ניקוד</div>
        )}
      </div>
    </div>
  );
}
