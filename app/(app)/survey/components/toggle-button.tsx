"use client";

import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { ChevronLeftIcon } from "lucide-react";

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
    <div className="fixed right-0 bottom-0 left-0 z-50 flex w-full items-center justify-between border-t border-gray-200 bg-white p-4 shadow-lg md:relative md:right-auto md:bottom-auto md:left-auto md:mt-8 md:border-t-0 md:bg-transparent md:p-0 md:shadow-none">
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          className="text-primary rounded-full bg-purple-200 p-3 hover:bg-purple-300"
          onClick={onPrevious}
          disabled={!canGoBack}
          aria-disabled={!canGoBack}
          aria-label="Previous question"
          title="Sebelumnya"
        >
          <ChevronLeftIcon />
          <KbdGroup>
            <Kbd>Alt</Kbd>
            <span>+</span>
            <Kbd>&larr;</Kbd>
          </KbdGroup>
        </Button>
      </div>

      <div className="flex items-center gap-2">
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
            <>
              Lihat Hasil
              <Kbd>Enter</Kbd>
            </>
          ) : (
            <>
              Selanjutnya
              <Kbd>Enter</Kbd>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
