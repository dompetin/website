"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GLOSSARY, GlossaryKey } from "@/lib/glossary";
import { X, Lightbulb, BookOpen } from "lucide-react";

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useGlossary = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<GlossaryKey | null>(null);

  const show = useCallback((key: GlossaryKey) => {
    setActive(key);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
    // Keep `active` alive during close animation — clear after transition
    setTimeout(() => setActive(null), 500);
  }, []);

  return { open, active, show, hide };
};

// ─── Panel ────────────────────────────────────────────────────────────────────

interface GlossaryPanelProps {
  open: boolean;
  active: GlossaryKey | null;
  onClose: () => void;
}

export const GlossaryPanel = ({ open, active, onClose }: GlossaryPanelProps) => {
  // Retain last-seen data during close animation so panel doesn't blank out
  const lastDataRef = useRef<(typeof GLOSSARY)[GlossaryKey] | null>(null);
  const data = active ? GLOSSARY[active] : null;
  if (data) lastDataRef.current = data;
  const displayData = data ?? lastDataRef.current;

  // Escape key + scroll lock
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={[
          "fixed inset-0 z-[110] bg-violet-950/20 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* Slide-in panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={displayData?.title ?? "Glosarium"}
        className={[
          "fixed right-0 top-0 z-[120] flex h-full w-full max-w-md flex-col bg-white shadow-2xl",
          "transition-transform duration-500 ease-[cubic-bezier(.32,1,.25,1)]",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {displayData ? (
          <>
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-violet-50 px-6 py-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-violet-500">
                <BookOpen className="size-3" />
                Glosarium Dompetin
              </div>
              <button
                onClick={onClose}
                aria-label="Tutup panel"
                className="group rounded-full p-2 transition-colors hover:bg-violet-50"
              >
                <X className="size-5 text-violet-400 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-8">
              {/* Title */}
              <div>
                <h2 className="text-3xl font-extrabold leading-tight text-violet-950">
                  {displayData.title}
                </h2>
                <div className="mt-3 h-1.5 w-10 rounded-full bg-violet-500" />
              </div>

              {/* Description */}
              <p className="border-l-4 border-violet-100 pl-4 text-base leading-relaxed text-stone-600 italic">
                {displayData.desc}
              </p>

              {/* Tip */}
              {displayData.hint && (
                <div className="relative overflow-hidden rounded-3xl bg-violet-900 px-6 py-5 text-white shadow-lg">
                  {/* Decorative icon */}
                  <Lightbulb className="absolute -bottom-4 -right-4 size-24 rotate-12 text-violet-800/40" />

                  <h4 className="relative z-10 mb-2 flex items-center gap-2 text-sm font-bold">
                    <Lightbulb className="size-4 text-yellow-300" />
                    Tips Cerdas
                  </h4>
                  <p className="relative z-10 text-sm leading-relaxed text-violet-100">
                    {displayData.hint}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-violet-50 px-6 py-4">
              <p className="text-xs text-violet-400 italic">
                Belajar finansial jadi simpel bareng Dompetin.
              </p>
            </div>
          </>
        ) : (
          /* Empty / loading state */
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-muted-foreground">Memuat glosarium…</p>
          </div>
        )}
      </aside>
    </>
  );
};