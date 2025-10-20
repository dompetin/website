"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

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
    <>
      <Button
        size="icon"
        className="mt-4 p-2 bg-blue-500 text-white rounded mb-0 absolute bottom-10 left-70"
        onClick={onPrevious}
        disabled={!canGoBack}
        aria-disabled={!canGoBack}
        aria-label="Previous question"
        title="Sebelumnya"
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        className="mt-4 p-2 bg-blue-500 text-white rounded mb-0 absolute bottom-10 right-70"
        onClick={onNext}
        disabled={!canProceed}
        aria-disabled={!canProceed}
        aria-label={current === total - 1 ? "Lihat hasil" : "Selanjutnya"}
        title={current === total - 1 ? "Lihat Hasil" : "Selanjutnya"}
      >
        {current === total - 1 ? (
          <span className="flex items-center">
            Lihat Hasil <ChevronRightIcon />
          </span>
        ) : (
          <span className="flex items-center gap-x-2">
            Selanjutnya
            <ChevronRightIcon />
          </span>
        )}
      </Button>
    </>
  );
}
