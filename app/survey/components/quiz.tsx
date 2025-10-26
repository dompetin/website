"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { questions } from "../constants/questions";
import { useQuizStore } from "../store/quiz-store";
import { QuizProgress } from "./progress";
import { ResultScreen } from "./result-screen";
import { ToggleButton } from "./toggle-button";
import { Kbd } from "@/components/ui/kbd";
import Image from "next/image";

export function Quiz() {
  const { current, total, answers, setAnswer, onPrevious, onNext } =
    useQuizStore();
  const question = questions[current];
  const rawAnswer = answers[question?.id] ?? "";
  const trimmedAnswer =
    typeof rawAnswer === "string" ? rawAnswer.trim() : String(rawAnswer).trim();

  const canProceed = (() => {
    if (!question) return false;

    if (question.type === "choice") {
      return rawAnswer !== "";
    } else if (question.type === "input") {
      return typeof rawAnswer === "string" && rawAnswer.trim().length > 0;
    }

    return false;
  })();

  const canGoBack = current > 0;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      window.requestAnimationFrame(() => el.focus());
    }
  }, [current]);

  // Auto-focus input fields for text questions
  useEffect(() => {
    if (question?.type === "input" && inputRef.current) {
      window.requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [current, question?.type]);

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

    // Prevent double navigation
    if (e.key === "Enter" || (e.altKey && e.key === "ArrowRight")) {
      if (canProceed) {
        e.preventDefault();
        e.stopPropagation();
        onNext();
      }
      return;
    }

    if (e.key === "ArrowLeft") {
      if (canGoBack) {
        e.preventDefault();
        e.stopPropagation();
        onPrevious();
      }
      return;
    }

    const num = parseNumericKey(e);
    if (question.type === "choice" && question.options && num !== null) {
      const index = num - 1;
      if (index >= 0 && index < question.options.length) {
        e.preventDefault();
        e.stopPropagation();
        const selected = question.options[index];
        if (selected) {
          setAnswer(question.id, selected.text);
        }
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-purple-200 relative overflow-hidden">
        <Image
          src="/pattern.png"
          alt="Background Image"
          quality={100}
          width={1920}
          height={1080}
          className="absolute inset-0 object-cover bottom-0 top-auto"
        />

        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl"></div>
        </div>

        <div
          className="flex items-center justify-start translate-y-[4rem] lg:translate-y-[5rem] flex-col min-h-screen px-4 py-8 focus:outline-none relative z-10"
          tabIndex={0}
          ref={containerRef}
          onKeyDown={handleKeyDown}
          role="region"
          aria-label={`Pertanyaan ${current + 1} dari ${total}`}
        >
          <div className="w-full max-w-4xl md:min-h-[500px] flex flex-col pb-24 md:pb-0">
            <QuizProgress />

            <div className="mb-8">
              <h2 className="font-bold text-2xl md:text-[32px] lg:text-4xl mb-4 lg:mb-10 text-gray-800">
                {question.text}
              </h2>

              {question.type === "choice" ? (
                <div
                  className="flex flex-col lg:gap-4 gap-2"
                  role="list"
                  aria-label="Pilihan jawaban"
                >
                  {question.options?.map((opt, idx) => {
                    const ans = answers[question.id];
                    const isSelected =
                      typeof ans === "number"
                        ? ans === opt.score
                        : ans === opt.text;
                    return (
                      <Button
                        key={idx.toString()}
                        onClick={() => setAnswer(question.id, opt.text)}
                        aria-pressed={isSelected}
                        // role="listitem"
                        className={`w-full px-4 py-2 border-2 rounded-2xl text-left flex items-center justify-start lg:justify-between gap-4 text-xs sm:text-sm lg:text-base transition-all duration-200 h-auto ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-lg hover:bg-primary hover:text-white"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-white hover:text-gray-700"
                        }`}
                      >
                        <span className="flex-1 break-words whitespace-pre-line">
                          {opt.text}
                        </span>
                        <Kbd className="lg:flex hidden">{opt.id}</Kbd>
                      </Button>
                    );
                  })}
                  <p className="text-xs text-gray-500 hidden lg:block mt-4 text-end">
                    Tekan angka 1-{Math.min(9, question.options?.length ?? 1)}{" "}
                    untuk memilih jawaban cepat.
                  </p>
                </div>
              ) : (
                <div className="w-full border-2 border-gray-200 rounded-full px-4 py-3 lg:text-lg md:text-xl focus-within:border-primary focus-within:outline-none transition-all duration-200 placeholder-gray-400 bg-white text-base flex items-center justify-center">
                  <div className="inline-flex items-center justify-center">
                    <p className="text-right">Rp</p>
                    <input
                      ref={inputRef}
                      type="text"
                      value={answers[question.id] || ""}
                      onChange={(e) => setAnswer(question.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && canProceed) {
                          e.preventDefault();
                          e.stopPropagation();
                          onNext();
                        }
                      }}
                      placeholder="..."
                      aria-label="Jawaban"
                      className="text-left w-auto min-w-[2ch] max-w-[20ch] bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Desktop: ToggleButton inside content flow */}
            <div className="hidden md:block mb-0 mt-auto">
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
        </div>
      </div>

      {/* Mobile: ToggleButton fixed at bottom */}
      <div className="md:hidden">
        <ToggleButton
          onPrevious={onPrevious}
          onNext={onNext}
          canGoBack={canGoBack}
          canProceed={canProceed}
          current={current}
          total={total}
        />
      </div>
    </>
  );
}
