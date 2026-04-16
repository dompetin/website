"use client";

import { useState } from "react";
// Import data dan tipe dari file glossary.ts terpisah
import { GLOSSARY, GlossaryKey } from "@/lib/glossary"; 

/* =========================
   HOOK
========================= */
export const useGlossary = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<GlossaryKey | null>(null);

  const show = (key: GlossaryKey) => {
    setActive(key);
    setOpen(true);
  };

  const hide = () => setOpen(false);

  return { open, active, show, hide };
};

/* =========================
   COMPONENT: GlossaryTerm
   (Trigger yang diklik user)
========================= */
export const GlossaryTerm = ({
  term,
  onClick,
  children,
}: {
  term: GlossaryKey;
  onClick: (key: GlossaryKey) => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      type="button"
      onClick={() => onClick(term)}
      className="underline decoration-dotted decoration-primary/50 underline-offset-4 text-primary hover:text-primary/70 transition-colors font-medium"
    >
      {children}
    </button>
  );
};

/* =========================
   COMPONENT: GlossaryPanel
   (Side Panel yang muncul)
========================= */
export const GlossaryPanel = ({
  open,
  active,
  onClose,
}: {
  open: boolean;
  active: GlossaryKey | null;
  onClose: () => void;
}) => {
  if (!open || !active) return null;

  const data = GLOSSARY[active];

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay Gelap */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Panel Konten */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Tombol Close */}
        <button 
          onClick={onClose}
          className="self-end p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <span className="text-2xl">✕</span>
        </button>

        {/* Header & Deskripsi */}
        <div className="mt-6">
          <span className="text-xs font-bold uppercase tracking-widest text-primary/60">Glosarium Dompetin</span>
          <h2 className="text-3xl font-extrabold mt-2 text-gray-900">
            {data.title}
          </h2>
          <div className="h-1 w-12 bg-primary mt-4 rounded-full" />
          
          <p className="text-lg mt-6 leading-relaxed text-gray-600">
            {data.desc}
          </p>
        </div>

        {/* Hint Section (Lampu Bohlam) */}
        {data.hint && (
          <div className="mt-8 p-5 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl">
            <p className="text-sm text-yellow-800 leading-relaxed">
              {data.hint}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400 italic">
            Belajar finansial jadi simpel bareng Dompetin.
          </p>
        </div>
      </div>
    </div>
  );
};