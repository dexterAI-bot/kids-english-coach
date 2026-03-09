'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/browser';
import { DECKS } from '@/lib/decks';
import { makeOptions, sampleQuestions } from '@/lib/quiz';
import { KidCard } from './KidCard';
import { Mascot } from '@/components/Mascot';

export default function QuizPage() {
  const supabase = useMemo(() => createClient(), []);

  const [deckId, setDeckId] = useState(DECKS[0]?.id ?? '');
  const [sessionWords, setSessionWords] = useState(() => sampleQuestions(deckId, 10));
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    try {
      const v = localStorage.getItem('kc_autoplay');
      if (v === '0') setAutoPlay(false);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('kc_autoplay', autoPlay ? '1' : '0');
    } catch {}
  }, [autoPlay]);

  const totalQs = 10;
  const word = sessionWords[i % Math.max(sessionWords.length, 1)];
  const options = word ? makeOptions(word, 4) : [];
  const isDone = i >= totalQs;

  function speak(text: string) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  useEffect(() => {
    if (!word) return;
    if (!autoPlay) return;
    if (isDone) return;
    // slight delay feels nicer
    const t = setTimeout(() => speak(word.english), 220);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word?.id, autoPlay, isDone]);

  function newSession(nextDeckId = deckId) {
    const next = sampleQuestions(nextDeckId, totalQs);
    setSessionWords(next);
    setI(0);
    setPicked(null);
    setStars(0);
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
    const ok = opt === word.hebrew;
    if (ok) setStars((s) => s + 1);
    await recordAttempt(ok);
  }

  function next() {
    setPicked(null);
    setI((x) => x + 1);
  }

  const progressLabel = `שאלה ${Math.min(i + 1, totalQs)} מתוך ${totalQs}`;

  return (
    <div className="space-y-5">
      <KidCard>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <Mascot className="w-[84px] h-[54px]" />
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">בואי נשחק באנגלית!</h1>
              <p className="text-sm text-slate-700">בחרי את המשמעות בעברית</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold rounded-full bg-white border border-slate-200 px-3 py-1">
              {progressLabel} • ⭐ {stars}
            </span>

            <label className="text-sm font-semibold flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3 py-1">
              <input
                type="checkbox"
                checked={autoPlay}
                onChange={(e) => setAutoPlay(e.target.checked)}
              />
              להשמיע אוטומטית
            </label>
          </div>
        </div>
      </KidCard>

      <KidCard>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">נושא:</span>
            <select
              className="rounded-2xl border border-slate-200 bg-white px-3 py-2"
              value={deckId}
              onChange={(e) => {
                const nextDeckId = e.target.value;
                setDeckId(nextDeckId);
                newSession(nextDeckId);
              }}
            >
              {DECKS.map((d) => (
                <option key={d.id} value={d.id}>
                  רמה {d.level} • {d.titleHe}
                </option>
              ))}
            </select>
          </div>

          <button
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 hover:bg-slate-50"
            onClick={() => newSession()}
          >
            התחלה מחדש
          </button>
        </div>

        {isDone ? (
          <div className="mt-6 text-center space-y-4">
            <div className="text-3xl font-extrabold">כל הכבוד!</div>
            <div className="text-lg text-slate-700">צברת ⭐ {stars} מתוך {totalQs}</div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button
                className="rounded-2xl bg-blue-600 text-white px-6 py-3 text-lg font-bold shadow hover:bg-blue-700"
                onClick={() => newSession()}
              >
                שחקי שוב
              </button>
              <button
                className="rounded-2xl border border-white/70 bg-white/60 px-6 py-3 text-lg font-bold hover:bg-white/80"
                onClick={() => {
                  const nextDeck = DECKS[(DECKS.findIndex((d) => d.id === deckId) + 1) % DECKS.length];
                  setDeckId(nextDeck.id);
                  newSession(nextDeck.id);
                }}
              >
                החליפי נושא
              </button>
            </div>
          </div>
        ) : word ? (
          <div className="mt-6 space-y-5">
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-black tracking-wide text-slate-900" data-testid="english-word">
                {word.english}
              </div>
              <div className="mt-3 flex items-center justify-center gap-2">
                <button
                  data-testid="play-audio"
                  className="rounded-full bg-white border border-slate-200 px-5 py-3 text-lg font-bold shadow hover:bg-slate-50"
                  onClick={() => speak(word.english)}
                >
                  🔊 השמעה
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {options.map((opt) => {
                const isCorrectOpt = opt === word.hebrew;
                const isPicked = picked === opt;
                const isLocked = !!picked;

                const base =
                  'rounded-3xl border px-6 py-6 text-right text-2xl font-extrabold shadow-sm transition active:scale-[0.98] ';

                const cls =
                  base +
                  (isLocked
                    ? isPicked
                      ? isCorrectOpt
                        ? 'bg-green-200/70 border-green-400'
                        : 'bg-rose-200/70 border-rose-400'
                      : isCorrectOpt
                        ? 'bg-green-100/70 border-green-300'
                        : 'opacity-60'
                    : 'bg-white/70 border-white/70 hover:bg-white');

                return (
                  <button key={opt} className={cls} onClick={() => pick(opt)}>
                    {opt}
                  </button>
                );
              })}
            </div>

            {picked ? (
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="text-base sm:text-lg font-bold">
                  {picked === word.hebrew ? 'מעולה!!' : `התשובה הנכונה: ${word.hebrew}`}
                  {saving ? <span className="ml-2 text-sm text-slate-500">שומר…</span> : null}
                </div>
                <button
                  className="rounded-2xl bg-blue-600 text-white px-6 py-3 text-lg font-bold shadow hover:bg-blue-700"
                  onClick={next}
                >
                  הבא
                </button>
              </div>
            ) : (
              <div className="text-xs text-slate-500 text-center">4 אפשרויות • בלי ניקוד</div>
            )}
          </div>
        ) : (
          <div className="mt-6 text-sm text-slate-600">אין מילים בחבילה הזאת עדיין.</div>
        )}
      </KidCard>
    </div>
  );
}
