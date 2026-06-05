"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GLOSSARY, GlossaryKey } from "@/lib/glossary";
import { Lightbulb, ArrowRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GlossaryPopoverProps {
  term:             GlossaryKey;
  children:         React.ReactNode;
  onOpenFullDetail: (key: GlossaryKey) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const GlossaryPopover = ({
  term,
  children,
  onOpenFullDetail,
}: GlossaryPopoverProps) => {
  const [open, setOpen] = useState(false);

  // closeTimer + 120 ms delay prevents the popover from dismissing when the
  // cursor briefly crosses the gap between trigger and floating content.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // Cleanup on unmount — prevent state update on unmounted component.
  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const handleOpenDetail = useCallback(() => {
    setOpen(false);
    // Give the popover a frame to begin its close animation before
    // the panel opens, avoiding a jarring overlap.
    requestAnimationFrame(() => onOpenFullDetail(term));
  }, [onOpenFullDetail, term]);

  const data = GLOSSARY[term];

  // If the term isn't in the glossary yet, render children unchanged.
  // This is a safety net — all mapped terms should exist in GLOSSARY.
  if (!data) return <>{children}</>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/*
          asChild clones `children` and merges props — but the child must be
          a single DOM element for Radix to forward refs correctly.
          We wrap in a <button> (not <span role="button">) so:
            1. Radix ref forwarding works reliably
            2. Keyboard users get native :focus-visible
            3. Screen readers announce it correctly
          `type="button"` prevents accidental form submission.
        */}
        <button
          type="button"
          aria-label={`Lihat definisi: ${data.title}`}
          className="cursor-help rounded-sm font-medium text-inherit underline decoration-dotted decoration-violet-400 underline-offset-2 transition-colors hover:text-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          onMouseEnter={() => { cancelClose(); setOpen(true); }}
          onMouseLeave={scheduleClose}
          onFocus={() => { cancelClose(); setOpen(true); }}
          onBlur={scheduleClose}
          onClick={handleOpenDetail}
        >
          {children}
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="start"
        sideOffset={8}
        // onMouseEnter/Leave on PopoverContent keeps the popover alive
        // when the cursor moves from trigger into the floating panel.
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        // Explicit z-index keeps the popover above the glossary panel (z-120)
        // when both are open simultaneously.
        className="z-[130] w-72 rounded-2xl bg-white p-4 shadow-2xl"
        // Fix: border-0 + border-t-4 causes Tailwind specificity issues.
        // Use inline style for the accent border to guarantee it applies.
        style={{ borderTop: "4px solid #7c3aed", borderLeft: "none", borderRight: "none", borderBottom: "none" }}
      >
        <div className="flex flex-col gap-3">
          {/* Title */}
          <h4 className="text-sm font-bold text-violet-700">{data.title}</h4>

          {/* Description */}
          <p className="text-xs leading-relaxed text-muted-foreground">
            {data.desc}
          </p>

          {/* Tip pill */}
          {data.hint && (
            <div className="flex items-start gap-2 rounded-xl bg-violet-50 p-3">
              <Lightbulb
                className="mt-0.5 size-3 shrink-0 text-violet-500"
                aria-hidden="true"
              />
              <span className="text-[11px] leading-snug text-violet-700">
                {data.hint}
              </span>
            </div>
          )}

          {/* CTA */}
          <button
            type="button"
            onClick={handleOpenDetail}
            className="group flex items-center gap-1 text-[11px] font-black uppercase tracking-wide text-violet-600 transition-all hover:gap-2 focus-visible:outline-none focus-visible:underline"
          >
            Pelajari lebih lanjut
            <ArrowRight
              className="size-3 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};