"use client";

import React, { useCallback, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GLOSSARY, GlossaryKey } from "@/lib/glossary";
import { Lightbulb, ArrowRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GlossaryPopoverProps {
  term: GlossaryKey;
  children: React.ReactNode;
  onOpenFullDetail: (key: GlossaryKey) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const GlossaryPopover = ({
  term,
  children,
  onOpenFullDetail,
}: GlossaryPopoverProps) => {
  const [open, setOpen] = useState(false);

  // Use a close-delay so the popover doesn't dismiss when the cursor briefly
  // moves between the trigger and the floating content.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const handleOpenDetail = useCallback(() => {
    setOpen(false);
    onOpenFullDetail(term);
  }, [onOpenFullDetail, term]);

  const data = GLOSSARY[term];

  // If the term isn't in the glossary, render children as-is — no crash.
  if (!data) return <>{children}</>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* Wrap in a span so we can attach mouse events without conflicting
            with whatever element `children` already is. */}
        <span
          role="button"
          tabIndex={0}
          aria-label={`Lihat definisi: ${data.title}`}
          className="cursor-help border-b border-dotted border-violet-400 font-medium transition-colors hover:border-violet-600 hover:text-violet-600"
          onMouseEnter={() => { cancelClose(); setOpen(true); }}
          onMouseLeave={scheduleClose}
          onFocus={() => setOpen(true)}
          onBlur={scheduleClose}
          onClick={handleOpenDetail}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleOpenDetail(); }}
        >
          {children}
        </span>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="start"
        sideOffset={8}
        // Keep popover alive when the cursor moves into it
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        className="z-[130] w-72 rounded-2xl border-0 border-t-4 border-t-violet-500 bg-white p-4 shadow-2xl"
      >
        <div className="flex flex-col gap-3">
          {/* Title */}
          <h4 className="text-sm font-bold text-violet-700">{data.title}</h4>

          {/* Description */}
          <p className="text-xs leading-relaxed text-muted-foreground">
            {data.desc}
          </p>

          {/* Tip */}
          {data.hint && (
            <div className="flex items-start gap-2 rounded-xl bg-violet-50 p-3">
              <Lightbulb className="mt-0.5 size-3 shrink-0 text-violet-500" />
              <span className="text-[11px] leading-snug text-violet-700">
                {data.hint}
              </span>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handleOpenDetail}
            className="group flex items-center gap-1 text-[11px] font-black uppercase tracking-wide text-violet-600 transition-all hover:gap-2"
          >
            Pelajari lebih lanjut
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};