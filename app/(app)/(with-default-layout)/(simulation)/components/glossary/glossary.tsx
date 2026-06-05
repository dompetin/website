"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GLOSSARY, GlossaryKey } from "@/lib/glossary";
import { X, Lightbulb, BookOpen } from "lucide-react";

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useGlossary = () => {
  const [open,   setOpen]   = useState(false);
  const [active, setActive] = useState<GlossaryKey | null>(null);

  // Ref lets hide() cancel a pending clear if show() fires during
  // the close animation (rapid open → close → open scenario).
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((key: GlossaryKey) => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
    setActive(key);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
    // Delay clearing `active` so the slide-out animation has content to render.
    clearTimer.current = setTimeout(() => setActive(null), 500);
  }, []);

  // Cleanup on unmount — prevent setState on unmounted component.
  useEffect(() => () => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
  }, []);

  return { open, active, show, hide };
};

// ─── GlossaryPanel ────────────────────────────────────────────────────────────

interface GlossaryPanelProps {
  open:    boolean;
  active:  GlossaryKey | null;
  onClose: () => void;
}

export const GlossaryPanel = ({ open, active, onClose }: GlossaryPanelProps) => {
  // lastDataRef keeps content visible during slide-out animation.
  // Mutated in render (not useEffect) because it's not observable state —
  // it's a display cache. This is the established React pattern for this case.
  const lastDataRef = useRef<(typeof GLOSSARY)[GlossaryKey] | null>(null);
  const liveData    = active ? GLOSSARY[active] : null;
  if (liveData) lastDataRef.current = liveData;
  const displayData = liveData ?? lastDataRef.current;

  // ── Body scroll lock + scrollbar-shift compensation ───────────────────────
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Measure scrollbar width before locking so we can compensate.
    // This prevents the page "jumping" when overflow:hidden removes the scrollbar.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow   = document.body.style.overflow;
    const prevPadding    = document.body.style.paddingRight;

    document.body.style.overflow     = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow     = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  return (
    <>
      {/* ── Backdrop ─────────────────────────────────────────────────────── */}
      {/* pointer-events controlled via class, not conditional render,
          so the fade-out transition plays before it disappears */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={[
          "fixed inset-0 z-[110] bg-violet-950/20 backdrop-blur-sm",
          "transition-opacity duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* ── Panel ────────────────────────────────────────────────────────── */}
      {/* inert when closed prevents keyboard focus reaching hidden content.
          The HTML `inert` attribute is now broadly supported (Chrome 102+,
          Firefox 112+, Safari 15.5+). TypeScript needs the attribute whitelisted
          which is handled by the undefined fallback below. */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={displayData?.title ?? "Glosarium"}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore — `inert` is a valid HTML attribute not yet in React types
        inert={!open ? "" : undefined}
        className={[
          "fixed right-0 top-0 z-[120]",
          "flex h-full w-full max-w-sm flex-col bg-white shadow-2xl",
          "transition-transform duration-500 ease-[cubic-bezier(.32,1,.25,1)]",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {displayData ? (
          <>
            {/* Top bar */}
            <div className="flex shrink-0 items-center justify-between border-b border-violet-100 px-6 py-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-violet-500">
                <BookOpen className="size-3" aria-hidden="true" />
                Glosarium Dompetin
              </div>
              <button
                onClick={onClose}
                aria-label="Tutup panel glosarium"
                className="group rounded-full p-1.5 transition-colors hover:bg-violet-50"
              >
                <X
                  className="size-4 text-violet-400 transition-transform duration-300 group-hover:rotate-90"
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-8">
              {/* Title + accent bar */}
              <div>
                <h2 className="text-2xl font-extrabold leading-tight text-violet-950">
                  {displayData.title}
                </h2>
                <div className="mt-3 h-1 w-8 rounded-full bg-violet-500" />
              </div>

              {/* Description */}
              <p className="border-l-4 border-violet-100 pl-4 text-base italic leading-relaxed text-stone-600">
                {displayData.desc}
              </p>

              {/* Tips card */}
              {displayData.hint && (
                <div className="relative overflow-hidden rounded-2xl bg-violet-900 px-5 py-5 text-white">
                  <Lightbulb
                    aria-hidden="true"
                    className="absolute -bottom-3 -right-3 size-20 rotate-12 text-violet-800/40"
                  />
                  <h4 className="relative z-10 mb-2 flex items-center gap-2 text-sm font-bold">
                    <Lightbulb className="size-3.5 text-yellow-300" aria-hidden="true" />
                    Tips Cerdas
                  </h4>
                  <p className="relative z-10 text-sm leading-relaxed text-violet-100">
                    {displayData.hint}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-violet-50 px-6 py-4">
              <p className="text-xs italic text-violet-400">
                Belajar finansial jadi simpel bareng Dompetin.
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-muted-foreground">Memuat glosarium…</p>
          </div>
        )}
      </aside>
    </>
  );
};