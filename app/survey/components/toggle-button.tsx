"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

type ToggleButtonProps = {
  onPrevious: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canProceed: boolean;
  current: number;
  total: number;
};

export function ToggleButton({
  onPrevious,
  onNext,
  canGoBack,
  canProceed,
  current,
  total,
}: ToggleButtonProps) {
  return (
    <div className="w-full fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center z-50 shadow-lg md:relative md:bottom-auto md:left-auto md:right-auto md:border-t-0 md:shadow-none md:bg-transparent md:p-0 md:mt-8">
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          className="bg-purple-200 text-primary hover:bg-purple-300 rounded-full p-3"
          onClick={onPrevious}
          disabled={!canGoBack}
          aria-disabled={!canGoBack}
          aria-label="Previous question"
          title="Sebelumnya"
        >
          <ChevronLeftIcon />
        </Button>
        <KbdGroup>
          <Kbd>Alt</Kbd>
          <span>+</span>
          <Kbd>&larr;</Kbd>
        </KbdGroup>
      </div>

      <div className="flex items-center gap-2">
        <Kbd>Enter</Kbd>
        <Button
          className="px-5 py-4"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (canProceed) {
              onNext();
            }
          }}
          variant="quiz-toggle"
          disabled={!canProceed}
          aria-disabled={!canProceed}
          aria-label={current === total - 1 ? "Lihat hasil" : "Selanjutnya"}
          title={current === total - 1 ? "Lihat Hasil" : "Selanjutnya"}
        >
          {current === total - 1 ? (
            <span className="flex items-center gap-4 justify-between">
              <div className="flex items-center">
                Lihat Hasil
                <ChevronRightIcon />
              </div>
              <Kbd className="lg:flex hidden">Enter</Kbd>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Selanjutnya
              <ChevronRightIcon />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
