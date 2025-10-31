"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { questions } from "../constants/questions";
import { useQuizStore } from "../store/quiz-store";
import { QuizProgress } from "./progress";
import { ResultScreen } from "./result-screen";
import { ToggleButton } from "./toggle-button";
import { Kbd } from "@/components/ui/kbd";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupMaskInput,
} from "@/components/ui/input-group";
import Image from "next/image";
import { MaskInput } from "@/components/ui/mask-input";

export function Quiz() {
  const { current, total, answers, setAnswer, onPrevious, onNext } =
    useQuizStore();
  const question = questions[current];
  const rawAnswer = answers[question?.id] ?? "";
  // const trimmedAnswer =
  //   typeof rawAnswer === "string" ? rawAnswer.trim() : String(rawAnswer).trim();

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

    if (e.altKey && e.key === "ArrowLeft") {
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
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-100 via-purple-50 to-purple-200">
        <Image
          src="/pattern.png"
          alt="Background Image"
          quality={100}
          width={1920}
          height={1080}
          className="absolute inset-0 top-auto bottom-0 object-cover"
        />

        {/* Background decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-purple-100/40 blur-3xl"></div>
        </div>

        <div
          className="relative z-10 flex min-h-screen translate-y-[4rem] flex-col items-center justify-start px-4 py-8 focus:outline-none lg:translate-y-[5rem]"
          tabIndex={0}
          ref={containerRef}
          onKeyDown={handleKeyDown}
          role="region"
          aria-label={`Pertanyaan ${current + 1} dari ${total}`}
        >
          <div className="flex w-full max-w-4xl flex-col pb-24 md:min-h-[500px] md:pb-0">
            <QuizProgress />

            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-[32px] lg:mb-10 lg:text-4xl">
                {question.text}
              </h2>

              {question.type === "choice" ? (
                <div
                  className="flex flex-col gap-2 lg:gap-4"
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
                        className={`flex h-auto w-full items-center justify-start gap-4 rounded-2xl border-2 px-4 py-2 text-left text-xs transition-all duration-200 sm:text-sm lg:text-base ${
                          isSelected
                            ? "bg-primary border-primary hover:bg-primary text-white shadow-lg hover:text-white"
                            : "border-gray-200 bg-white text-gray-700 hover:bg-white hover:text-gray-700"
                        }`}
                      >
                        <Kbd className="hidden lg:flex">{opt.id}</Kbd>
                        <span className="flex-1 wrap-break-word whitespace-pre-line">
                          {opt.text}
                        </span>
                      </Button>
                    );
                  })}
                  <p className="mt-4 hidden text-end text-xs text-gray-500 lg:block">
                    Tekan angka 1-{Math.min(9, question.options?.length ?? 1)}{" "}
                    untuk memilih jawaban cepat.
                  </p>
                </div>
              ) : (
                <MaskInput
                  ref={inputRef}
                  mask="currency"
                  currency="IDR"
                  locale="id-ID"
                  value={
                    typeof answers[question.id] === "string"
                      ? (answers[question.id] as string)
                      : ""
                  }
                  onValueChange={(maskedValue) =>
                    setAnswer(question.id, maskedValue)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && canProceed) {
                      e.preventDefault();
                      e.stopPropagation();
                      onNext();
                    }
                  }}
                  placeholder="..."
                  aria-label="Jawaban"
                  className="bg-background text-center rounded-full h-10 text-xl"
                />
              )}
            </div>

            {/* Desktop: ToggleButton inside content flow */}
            <div className="mt-auto mb-0 hidden md:block">
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
