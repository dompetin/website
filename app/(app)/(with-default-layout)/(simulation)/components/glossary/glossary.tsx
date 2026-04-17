"use client";

import { useState } from "react";
import { GLOSSARY, GlossaryKey } from "@/lib/glossary"; 
import { X, Lightbulb } from "lucide-react"; // Gunakan icon agar lebih konsisten

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
    COMPONENT: GlossaryPanel
    (Wikipedia Side Panel)
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
  if (!active) return null;

  const data = GLOSSARY[active];

  return (
    <div className={`fixed inset-0 z-[110] flex justify-end ${open ? "visible" : "invisible"}`}>
      {/* Overlay Gelap */}
      <div
        className={`absolute inset-0 bg-purple-950/20 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      
      {/* Panel Konten */}
      <div className={`relative w-full max-w-md bg-white h-full shadow-2xl p-8 flex flex-col transition-transform duration-500 ease-out ${
        open ? "translate-x-0" : "translate-x-full"
      }`}>
        {/* Tombol Close */}
        <button 
          onClick={onClose}
          className="self-end p-2 hover:bg-purple-50 rounded-full transition-colors text-purple-400"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header & Deskripsi */}
        <div className="mt-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-500">Glosarium Dompetin</span>
          <h2 className="text-3xl font-extrabold mt-2 text-purple-950 leading-tight">
            {data.title}
          </h2>
          <div className="h-1.5 w-12 bg-purple-500 mt-4 rounded-full" />
          
          <p className="text-base mt-6 leading-relaxed text-gray-600 italic border-l-4 border-purple-100 pl-4">
            {data.desc}
          </p>
        </div>

        {/* Hint Section */}
        {data.hint && (
          <div className="mt-8 p-6 bg-purple-900 text-white rounded-3xl shadow-lg relative overflow-hidden">
            <Lightbulb className="absolute -right-4 -bottom-4 w-24 h-24 text-purple-800/50 rotate-12" />
            <h4 className="font-bold mb-2 flex items-center gap-2">Tips Cerdas</h4>
            <p className="text-sm text-purple-100 leading-relaxed relative z-10">
              {data.hint}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-purple-50">
          <p className="text-xs text-purple-400 italic">
            Belajar finansial jadi simpel bareng Dompetin.
          </p>
        </div>
      </div>
    </div>
  );
};