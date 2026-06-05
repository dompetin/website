"use client";

import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FaqItem {
  q: string;
  a: string;
}

// ─── FaqRow ───────────────────────────────────────────────────────────────────
// Isolated component so each row manages its own height measurement.
// This avoids having to lift per-item refs into the parent.

function FaqRow({ faq, index }: { faq: FaqItem; index: number }) {
  const [expanded, setExpanded] = useState(false);

  // We animate with max-height rather than conditional rendering so there's
  // no layout jump and the CSS transition plays smoothly in both directions.
  // The ref measures actual content height so we never need a magic number.
  const contentRef = useRef<HTMLDivElement>(null);

  const triggerId = `faq-trigger-${index}`;
  const panelId   = `faq-panel-${index}`;

  const toggle = () => setExpanded((prev) => !prev);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Trigger */}
      <button
        id={triggerId}
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={toggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40"
      >
        <span className="text-sm font-semibold text-foreground">
          {faq.q}
        </span>

        {/* Lucide icon rotates — cheaper than swapping between Plus and Minus */}
        <span
          aria-hidden="true"
          className={[
            "shrink-0 rounded-full border border-border p-0.5 text-primary transition-transform duration-300",
            expanded ? "rotate-45" : "rotate-0",
          ].join(" ")}
        >
          <Plus className="size-3.5" />
        </span>
      </button>

      {/* Answer panel — CSS max-height transition, no unmount flash */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        ref={contentRef}
        style={{
          maxHeight: expanded
            ? `${contentRef.current?.scrollHeight ?? 500}px`
            : "0px",
          transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
        }}
      >
        <div className="border-t border-border px-5 pb-5 pt-3 text-sm leading-relaxed text-muted-foreground">
          {faq.a}
        </div>
      </div>
    </div>
  );
}

// ─── TentangFaq ───────────────────────────────────────────────────────────────

export function TentangFaq({ faqs }: { faqs: FaqItem[] }) {
  return (
    // role="list" + role="listitem" is not needed here — these are not
    // homogenous list items but independent disclosure widgets. A plain
    // div wrapper is semantically correct.
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => (
        // faq.q is a stable, unique string — safer key than index.
        // Index keys cause React to reuse DOM nodes incorrectly on reorder.
        <FaqRow key={faq.q} faq={faq} index={i} />
      ))}
    </div>
  );
}