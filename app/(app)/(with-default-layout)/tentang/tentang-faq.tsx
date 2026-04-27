"use client";

import { useState } from "react";

interface Faq {
  q: string;
  a: string;
}

export function TentangFaq({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
          >
            <span className="font-semibold text-sm text-foreground pr-4">
              {faq.q}
            </span>
            <span className="shrink-0 text-primary font-bold text-lg leading-none">
              {open === i ? "−" : "+"}
            </span>
          </button>

          {open === i && (
            <div className="border-t border-border px-5 pb-4 pt-3 text-sm text-muted-foreground leading-relaxed">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}