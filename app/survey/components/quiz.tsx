"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { questions } from "../constants/questions";
import { useQuizStore } from "../store/quiz-store";
import { QuizProgress } from "./progress";
import { ResultScreen } from "./result-screen";
import { ToggleButton } from "./toggle-button";

export function Quiz() {
  const { current, total, answers, setAnswer, onPrevious, onNext } =
    useQuizStore();
  const question = questions[current];
  const rawAnswer = answers[question?.id] ?? "";
  const trimmedAnswer =
    typeof rawAnswer === "string" ? rawAnswer.trim() : String(rawAnswer).trim();

  const canProceed =
    question?.type === "choice" ? rawAnswer !== "" : trimmedAnswer.length > 0;
  const canGoBack = current > 0;

  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      window.requestAnimationFrame(() => el.focus());
    }
  }, [current]);

  if (current >= total) {
    return <ResultScreen />;
  }

  const parseNumericKey = (e: React.KeyboardEvent) => {
    if (/^[1-9]$/.test(e.key)) {
      return Number(e.key);
    }
    if (typeof e.code === "string" && e.code.startsWith("Numpad")) {
      const suffix = e.code.replace("Numpad", "");
      if (/^[1-9]$/.test(suffix)) {
        return Number(suffix);
      }
    }
    return null;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!question) return;

    if (e.key === "Enter") {
      if (canProceed) {
        e.preventDefault();
        onNext();
      }
      return;
    }

    if (e.key === "ArrowRight") {
      if (canProceed) {
        e.preventDefault();
        onNext();
      }
      return;
    }
    if (e.key === "ArrowLeft") {
      if (canGoBack) {
        e.preventDefault();
        onPrevious();
      }
      return;
    }

    const num = parseNumericKey(e);
    if (question.type === "choice" && question.options && num !== null) {
      const index = num - 1;
      if (index >= 0 && index < question.options.length) {
        e.preventDefault();
        const selected = question.options[index];
        if (selected) {
          setAnswer(
            question.id,
            String(
              typeof selected.score === "number"
                ? selected.score
                : selected.text,
            ),
          );
        }
      }
    }
  };

  return (
    <div
      className="flex items-center justify-start flex-col mt-32"
      tabIndex={0}
      ref={containerRef}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={`Pertanyaan ${current + 1} dari ${total}`}
    >
      <QuizProgress />

      <div className="max-w-3xl w-full">
        <h2 className="font-bold text-2xl lg:text-4xl mb-10 text-left w-full">
          {question.text}
        </h2>

        {question.type === "choice" ? (
          <div className="space-y-2" role="list" aria-label="Pilihan jawaban">
            {question.options?.map((opt, idx) => {
              const ans = answers[question.id];
              const isSelected =
                typeof ans === "number" ? ans === opt.score : ans === opt.text;
              return (
                <Button
                  key={opt.text}
                  onClick={() =>
                    setAnswer(
                      question.id,
                      String(
                        typeof opt.score === "number" ? opt.score : opt.text,
                      ),
                    )
                  }
                  aria-pressed={isSelected}
                  role="listitem"
                  className={`w-full p-2 border rounded text-left flex items-center justify-start gap-x-3 ${
                    isSelected ? "bg-blue-300" : ""
                  }`}
                >
                  <span className="font-bold mr-2 w-6 text-center">
                    {idx + 1}.
                  </span>
                  <span className="flex-1">{opt.text}</span>
                </Button>
              );
            })}
            <p className="text-sm text-muted-foreground mt-2">
              Tekan angka 1-{Math.min(9, question.options?.length ?? 1)} untuk
              memilih jawaban cepat.
            </p>
          </div>
        ) : (
          <input
            type="text"
            value={answers[question.id] || ""}
            onChange={(e) => setAnswer(question.id, e.target.value)}
            onKeyDown={(e) => {
              // keep enter handling local to the input as well
              if (e.key === "Enter" && trimmedAnswer.length > 0) {
                e.preventDefault();
                onNext();
              }
            }}
            className="border rounded p-2 w-full"
            placeholder={question.placeholder || "Ketik jawaban..."}
            aria-label="Jawaban"
          />
        )}
      </div>

      <div>
        <ToggleButton
          onPrevious={onPrevious}
          onNext={onNext}
          canGoBack={canGoBack}
          canProceed={canProceed}
          current={current}
          total={total}
        />
      </div>
    </div>
  );
}
