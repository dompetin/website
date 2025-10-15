import { create } from "zustand";
import { questions } from "../constants/questions";

type QuizState = {
  current: number;
  answers: Record<number, string>;
  total: number;
  setAnswer: (id: number, answer: string) => void;
  next: () => void;
  reset: () => void;
  getResult: () => string;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  current: 0,
  answers: {},
  total: questions.length,
  setAnswer: (id, answer) =>
    set((s) => ({
      answers: { ...s.answers, [id]: answer },
    })),
  next: () => set((s) => ({ current: Math.min(s.current + 1, s.total) })),
  reset: () => set({ current: 0, answers: {} }),
  getResult: () => {
    const counts: Record<string, number> = {};

    for (const q of questions) {
      const answer = get().answers[q.id];
      const option = q.options?.find((o) => o.text === answer);
      if (option?.category) {
        counts[option.category] = (counts[option.category] || 0) + 1;
      }
    }

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const topCategory = sorted[0]?.[0] || "Balanced"; // fallback default

    return topCategory;
  },
}));
