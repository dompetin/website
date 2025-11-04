"use client";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { MaskInput } from "@/components/ui/mask-input";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { questions } from "../constants/questions";
import { useQuizStore } from "../store/quiz-store";
import { QuizProgress } from "./progress";
import { ResultScreen } from "./result-screen";
import { ToggleButton } from "./toggle-button";
import * as m from "@/lib/motion";

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
          className="relative z-10 flex min-h-screen translate-y-[5rem] flex-col items-center justify-start px-4 py-8 focus:outline-none lg:translate-y-[7rem]"
          tabIndex={0}
          ref={containerRef}
          onKeyDown={handleKeyDown}
          role="region"
          aria-label={`Pertanyaan ${current + 1} dari ${total}`}
        >
          <m.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex w-full max-w-4xl flex-col pb-24 md:min-h-[500px] md:pb-0"
          >
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <QuizProgress />
            </m.div>

            <div className="mb-8">
              <m.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="mb-4 text-2xl font-bold text-gray-800 md:text-[32px] lg:mb-10 lg:text-4xl"
              >
                {question.text}
              </m.h2>

              {question.type === "choice" ? (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
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
                      <m.div
                        key={idx.toString()}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.35 + idx * 0.08,
                          ease: "easeOut",
                        }}
                      >
                        <Button
                          onClick={() => setAnswer(question.id, opt.text)}
                          aria-pressed={isSelected}
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
                      </m.div>
                    );
                  })}
                  <m.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                    className="mt-4 hidden text-end text-xs text-gray-500 lg:block"
                  >
                    Tekan angka 1-{Math.min(9, question.options?.length ?? 1)}{" "}
                    untuk memilih jawaban cepat.
                  </m.p>
                </m.div>
              ) : (
                <m.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                >
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
                    className="bg-background h-10 rounded-full text-center text-xl"
                  />
                </m.div>
              )}
            </div>

            {/* Desktop: ToggleButton inside content flow */}
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
              className="mt-auto mb-0 hidden md:block"
            >
              <ToggleButton
                onPrevious={onPrevious}
                onNext={onNext}
                canGoBack={canGoBack}
                canProceed={canProceed}
                current={current}
                total={total}
              />
            </m.div>
          </m.div>
        </div>
      </div>

      {/* Mobile: ToggleButton fixed at bottom */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
        className="md:hidden"
      >
        <ToggleButton
          onPrevious={onPrevious}
          onNext={onNext}
          canGoBack={canGoBack}
          canProceed={canProceed}
          current={current}
          total={total}
        />
      </m.div>
    </>
  );
}
