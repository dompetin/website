"use client";

import { useQuizStore } from "../store/quiz-store";

export function QuizProgress() {
  const { current, total } = useQuizStore();
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="mb-4 lg:mb-10 lg:min-w-4xl">
      <div className="flex justify-between text-sm md:text-lg mb-1">
        <span>
          {current + 1} dari {total} Soal
        </span>
        <span>{progress.toFixed(0)}%</span>
      </div>
      <div className="w-full bg-purple-200 rounded-full h-3 lg:h-5">
        <div
          className="bg-primary h-3 lg:h-5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
