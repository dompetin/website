"use client";

import { useEffect } from "react";
import { X, Lightbulb, AlertTriangle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlossaryKey } from "@/lib/glossary";

// Data Glossary Lengkap untuk Side Panel
const GLOSSARY_DETAILS: Record<GlossaryKey, {
  title: string;
  definition: string;
  example: string;
  riskLevel: "Rendah" | "Menengah" | "Tinggi" | "Sangat Tinggi";
  tips: string;
}> = {
  reksadana_pasar_uang: {
    title: "Reksa Dana Pasar Uang",
    definition: "Instrumen investasi yang menempatkan 100% dananya pada instrumen pasar uang seperti deposito bank dan surat berharga dengan jatuh tempo kurang dari satu tahun.",
    example: "Sangat cocok untuk menyimpan dana darurat karena pencairannya yang relatif cepat dan nilainya stabil.",
    riskLevel: "Rendah",
    tips: "Gunakan untuk tujuan jangka pendek (< 1 tahun) agar uangmu tidak tergerus inflasi tabungan biasa.",
  },
  reksadana_pendapatan_tetap: {
    title: "Reksa Dana Pendapatan Tetap",
    definition: "Jenis reksa dana yang menginvestasikan minimal 80% aktivanya dalam bentuk efek utang atau obligasi.",
    example: "Memberikan imbal hasil yang lebih stabil dibanding saham namun lebih tinggi dari pasar uang.",
    riskLevel: "Rendah",
    tips: "Cocok untuk tujuan keuangan jangka menengah (1-3 tahun).",
  },
  reksadana_campuran: {
    title: "Reksa Dana Campuran",
    definition: "Investasi yang mengombinasikan berbagai instrumen seperti saham, obligasi, dan pasar uang dalam satu wadah.",
    example: "Fleksibel dalam menyesuaikan kondisi pasar karena Manajer Investasi bisa memindahkan porsi aset.",
    riskLevel: "Menengah",
    tips: "Pilihan tepat bagi investor yang ingin moderat; tidak terlalu agresif tapi tetap mengejar pertumbuhan.",
  },
  reksadana_pasar_saham: {
    title: "Reksa Dana Saham",
    definition: "Reksa dana yang mayoritas portofolionya (minimal 80%) ditempatkan pada instrumen ekuitas atau saham.",
    example: "Potensi keuntungan sangat besar dalam jangka panjang, namun bisa turun drastis dalam jangka pendek.",
    riskLevel: "Tinggi",
    tips: "Hanya gunakan uang dingin dan untuk jangka waktu panjang (> 5 tahun).",
  },
  obligasi: {
    title: "Obligasi",
    definition: "Surat pernyataan utang dari penerbit (pemerintah/perusahaan) kepada pemegang obligasi dengan janji membayar bunga berkala.",
    example: "Seperti memberikan pinjaman ke negara dan kamu mendapatkan imbalan bunga (kupon) setiap bulannya.",
    riskLevel: "Rendah",
    tips: "Obligasi Negara (SBN) adalah salah satu investasi paling aman karena dijamin undang-undang.",
  },
  saham: {
    title: "Saham",
    definition: "Tanda penyertaan modal seseorang atau pihak dalam suatu perusahaan atau perseroan terbatas.",
    example: "Jika perusahaan untung, kamu bisa dapat dividen atau keuntungan dari kenaikan harga sahamnya.",
    riskLevel: "Sangat Tinggi",
    tips: "Lakukan analisis fundamental sebelum membeli saham perusahaan tertentu.",
  },
  deposit: {
    title: "Deposito",
    definition: "Produk simpanan bank yang penyetoran maupun penarikannya hanya dapat dilakukan pada waktu tertentu.",
    example: "Bunga lebih tinggi dari tabungan biasa, tapi ada penalti jika diambil sebelum jatuh tempo.",
    riskLevel: "Rendah",
    tips: "Pastikan bank tempatmu menaruh deposito terdaftar di LPS.",
  },
  gold: {
    title: "Emas",
    definition: "Logam mulia yang dianggap sebagai aset pelindung nilai (safe haven) saat kondisi ekonomi tidak pasti.",
    example: "Harga emas cenderung naik saat inflasi tinggi atau terjadi krisis global.",
    riskLevel: "Rendah",
    tips: "Cocok untuk menjaga daya beli uangmu dalam jangka waktu yang sangat lama.",
  },
  diversifikasi: {
    title: "Diversifikasi",
    definition: "Strategi menyebar modal ke berbagai jenis aset untuk mengurangi risiko kerugian.",
    example: "Jangan menaruh semua telur dalam satu keranjang. Jika satu jatuh, yang lain masih aman.",
    riskLevel: "Rendah",
    tips: "Kombinasikan aset berisiko tinggi (saham) dengan aset aman (emas/pasar uang).",
  },
  risk_reward: {
    title: "Risk to Reward Ratio",
    definition: "Perbandingan antara potensi keuntungan yang diharapkan dengan risiko kerugian yang mungkin terjadi.",
    example: "Semakin tinggi potensi untung (High Return), maka risiko yang menyertainya juga semakin tinggi (High Risk).",
    riskLevel: "Menengah",
    tips: "Jangan hanya melihat angka profit, selalu cek apakah kamu siap dengan risiko penurunan nilainya.",
  },
};

interface Props {
  open: boolean;
  onClose: () => void;
  activeKey: GlossaryKey | null;
}

const TooltipSidePanel = ({ open, onClose, activeKey }: Props) => {
  const item = activeKey ? GLOSSARY_DETAILS[activeKey] : null;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  if (!item) return null;

  return (
    <>
      {/* Overlay Background */}
      <div
        className={cn(
          "fixed inset-0 bg-purple-900/20 backdrop-blur-sm z-[110] transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Side Panel */}
      <aside
        className={cn(
          "fixed z-[120] right-0 top-0 h-full w-full sm:w-[450px] bg-white shadow-2xl transition-transform duration-500 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-50">
          <div>
            <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Edukasi Dompetin</span>
            <h2 className="font-bold text-xl text-purple-950 leading-none">{item.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-50 rounded-full transition-colors text-purple-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 space-y-8 overflow-y-auto h-[calc(100vh-100px)]">
          {/* Definition */}
          <section className="space-y-3">
            <h3 className="font-bold text-sm text-purple-900 flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> Apa itu {item.title}?
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 italic border-l-4 border-purple-200 pl-4">
              "{item.definition}"
            </p>
          </section>

          {/* Risk Badge */}
          <div className="bg-purple-50 rounded-2xl p-4 flex items-center justify-between">
            <span className="text-sm font-medium text-purple-900">Profil Risiko</span>
            <span className={cn(
              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
              item.riskLevel === "Rendah" && "bg-green-100 text-green-700",
              item.riskLevel === "Menengah" && "bg-yellow-100 text-yellow-700",
              item.riskLevel === "Tinggi" && "bg-red-100 text-red-700",
              item.riskLevel === "Sangat Tinggi" && "bg-red-200 text-red-900",
            )}>
              {item.riskLevel}
            </span>
          </div>

          {/* Tips / Insight */}
          <section className="bg-purple-900 text-white rounded-3xl p-6 shadow-lg space-y-3 relative overflow-hidden">
            <Lightbulb className="absolute -right-4 -bottom-4 w-24 h-24 text-purple-800/50 rotate-12" />
            <h3 className="font-bold text-lg flex items-center gap-2">
               Tips Cerdas
            </h3>
            <p className="text-sm leading-relaxed text-purple-100 relative z-10">
              {item.tips}
            </p>
          </section>

          {/* Example */}
          <section className="space-y-3">
            <h3 className="font-bold text-sm text-purple-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-purple-400" /> Contoh Sederhana
            </h3>
            <div className="p-4 rounded-2xl border border-dashed border-purple-200 bg-gray-50 text-sm text-gray-500 leading-relaxed">
              {item.example}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-white border-t border-purple-50">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition-all shadow-md active:scale-95"
          >
            SAYA MENGERTI
          </button>
        </div>
      </aside>
    </>
  );
};

export default TooltipSidePanel;