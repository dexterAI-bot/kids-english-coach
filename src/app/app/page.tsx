'use client';

import { useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/browser';
import { DECKS } from '@/lib/decks';
import { makeOptions, sampleQuestions } from '@/lib/quiz';

export default function QuizPage() {
  const supabase = useMemo(() => createClient(), []);
  const [deckId, setDeckId] = useState(DECKS[0]?.id ?? '');
  const [sessionWords, setSessionWords] = useState(() => sampleQuestions(deckId, 10));
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const word = sessionWords[i % Math.max(sessionWords.length, 1)];
  const options = word ? makeOptions(word, 4) : [];
  const correct = picked && word && picked === word.hebrew;

  function newSession(nextDeckId = deckId) {
    const next = sampleQuestions(nextDeckId, 10);
    setSessionWords(next);
    setI(0);
    setPicked(null);
  }

  async function recordAttempt(isCorrect: boolean) {
    if (!word) return;
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
    if (!word) return;
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
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-semibold">Quiz</h1>
          <p className="text-sm text-gray-600">בחרי את המשמעות בעברית</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Deck:</label>
          <select
            className="rounded border p-2"
            value={deckId}
            onChange={(e) => {
              const nextDeckId = e.target.value;
              setDeckId(nextDeckId);
              newSession(nextDeckId);
            }}
          >
            {DECKS.map((d) => (
              <option key={d.id} value={d.id}>
                L{d.level} • {d.titleHe}
              </option>
            ))}
          </select>
          <button className="rounded border px-3 py-2" onClick={() => newSession()}>
            New session
          </button>
        </div>
      </div>

      <div className="rounded-xl border p-6 space-y-4">
        {word ? (
          <>
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
              {options.map((opt) => {
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
                  <button key={opt} className={cls} onClick={() => pick(opt)}>
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
          </>
        ) : (
          <div className="text-sm text-gray-600">No words in this deck yet.</div>
        )}
      </div>
    </div>
  );
}
