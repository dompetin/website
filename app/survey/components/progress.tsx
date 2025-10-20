"use client";

import { useQuizStore } from "../store/quiz-store";

export function QuizProgress() {
  const { current, total } = useQuizStore();
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="mb-10 min-w-4xl">
      <div className="flex justify-between text-sm mb-1">
        <span>
          {current + 1} dari {total} Soal
        </span>
        <span>{progress.toFixed(0)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
