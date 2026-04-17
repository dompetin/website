"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GlossaryKey } from "@/lib/glossary";

// Preview singkat ala Wikipedia yang sudah diperbarui
const PREVIEW_DATA: Record<string, string> = {
  reksadana_pasar_uang: "Investasi paling aman dengan risiko rendah, dana ditempatkan di deposito & surat berharga jangka pendek.",
  reksadana_pendapatan_tetap: "Fokus pada obligasi untuk memberikan hasil stabil dalam jangka menengah.",
  reksadana_campuran: "Kombinasi saham dan obligasi untuk menyeimbangkan risiko dan potensi keuntungan.",
  reksadana_pasar_saham: "Investasi pada saham perusahaan untuk pertumbuhan maksimal dalam jangka panjang.",
  obligasi: "Surat utang yang memberikan imbal hasil berupa bunga (kupon) secara berkala.",
  saham: "Bukti kepemilikan modal pada sebuah perusahaan dengan potensi profit dari kenaikan harga.",
  // Penambahan data baru
  deposit: "Simpanan berjangka di bank dengan bunga tetap yang lebih tinggi dari tabungan biasa.",
  gold: "Aset 'Safe Haven' yang berfungsi melindungi nilai kekayaan dari inflasi dan ketidakpastian ekonomi.",
  diversifikasi: "Strategi menyebar investasi ke berbagai aset berbeda untuk meminimalisir risiko kerugian total.",
  risk_reward: "Analisis perbandingan antara potensi keuntungan yang bisa didapat dengan tingkat risiko yang harus diambil.",
};

interface Props {
  term: GlossaryKey;
  children: React.ReactNode;
  onOpenFullDetail: (key: GlossaryKey) => void;
}

export const GlossaryPopover = ({ term, children, onOpenFullDetail }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger 
        asChild
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <span 
          className="cursor-help border-b border-dotted border-purple-400 hover:text-purple-600 hover:border-purple-600 transition-all font-medium"
          onClick={() => onOpenFullDetail(term)}
        >
          {children}
        </span>
      </PopoverTrigger>

      <PopoverContent 
        side="top" 
        align="start"
        className="w-72 p-4 shadow-xl border-t-4 border-t-purple-500 bg-white/95 backdrop-blur-sm z-[100]"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="space-y-2">
          <h4 className="font-bold text-purple-700 capitalize text-sm">
            {term.replace(/_/g, " ")}
          </h4>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {PREVIEW_DATA[term] || "Klik untuk penjelasan mendalam mengenai instrumen keuangan ini."}
          </p>
          <button 
            onClick={() => {
              setIsOpen(false);
              onOpenFullDetail(term);
            }}
            className="text-[10px] font-black text-purple-600 hover:tracking-widest transition-all flex items-center gap-1 uppercase"
          >
            Pelajari Detail →
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};