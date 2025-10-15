"use client";

import { Button } from "@/components/ui/button";
import { questions } from "../constants/questions";
import { useQuizStore } from "../store/quiz-store";
import { QuizProgress } from "./progress";
import { ResultScreen } from "./result-screen";

export function Quiz() {
  const { current, total, answers, setAnswer, next } = useQuizStore();
  const question = questions[current];
  const rawAnswer = answers[question?.id] ?? "";
  const trimmedAnswer =
    typeof rawAnswer === "string" ? rawAnswer.trim() : String(rawAnswer).trim();
  const canProceed =
    question?.type === "choice" ? Boolean(rawAnswer) : trimmedAnswer.length > 0;

  if (current >= total) {
    return <ResultScreen />;
  }

  return (
    <div className="p-6 max-w-md mx-auto border rounded shadow">
      <QuizProgress />

      <h2 className="font-bold text-lg mb-3">{question.text}</h2>

      {question.type === "choice" ? (
        <div className="space-y-2">
          {question.options?.map((opt) => (
            <Button
              key={opt.text}
              onClick={() => setAnswer(question.id, opt.text)}
              className={`block w-full p-2 border rounded ${
                answers[question.id] === opt.text ? "bg-blue-300" : ""
              }`}
            >
              {opt.text}
            </Button>
          ))}
        </div>
      ) : (
        <input
          type="text"
          value={answers[question.id] || ""}
          onChange={(e) => setAnswer(question.id, e.target.value)}
          className="border rounded p-2 w-full"
          placeholder={question.placeholder || "Ketik jawaban..."}
        />
      )}

      <Button
        className="mt-4 w-full p-2 bg-blue-500 text-white rounded"
        onClick={next}
        disabled={!canProceed}
        aria-disabled={!canProceed}
      >
        {current === total - 1 ? "Lihat Hasil" : "Lanjut"}
      </Button>
    </div>
  );
}
