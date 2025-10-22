import { create } from "zustand";
import { questions } from "../constants/questions";

type QuizState = {
  current: number;
  answers: Record<number, number | string>;
  total: number;
  setAnswer: (id: number, answer: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  reset: () => void;
  getResult: () => string;
  getNumericResult: () => number;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  current: 0,
  answers: {},
  total: questions.length,

  setAnswer: (id, answer) => {
    const q = questions.find((qq) => qq.id === id);
    if (q && q.type === "choice" && q.options) {
      const opt = q.options.find((o) => o.text === answer);
      const score = typeof opt?.score === "number" ? opt!.score : null;
      if (score !== null) {
        set((s) => ({
          answers: { ...s.answers, [id]: score },
        }));
        return;
      }
    }

    set((s) => ({
      answers: { ...s.answers, [id]: answer },
    }));
  },

  onPrevious: () => set((s) => ({ current: Math.max(s.current - 1, 0) })),
  onNext: () => set((s) => ({ current: Math.min(s.current + 1, s.total) })),
  reset: () => set({ current: 0, answers: {} }),

  getNumericResult: () => {
    const allAnswers = Object.values(get().answers);

    const numericScores = allAnswers.filter(
      (v): v is number => typeof v === "number"
    );

    const scorableCount = questions.filter((q) => q.type === "choice").length;

    if (scorableCount === 0) {
      return 5;
    }

    const sum = numericScores.reduce((a, b) => a + b, 0);

    const maxPossible = scorableCount * 2;

    const normalized = Math.round((sum / maxPossible) * 9) + 1;
    const clamped = Math.min(10, Math.max(1, normalized));
    return clamped;
  },

  getResult: () => {
    const numeric = get().getNumericResult();

    if (numeric >= 1 && numeric <= 3) return "Conservative";
    if (numeric >= 4 && numeric <= 6) return "Balanced";
    return "Aggressive";
  },
}));
