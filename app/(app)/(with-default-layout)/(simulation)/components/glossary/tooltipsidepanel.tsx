"use client";

import { useEffect } from "react";
import { X, Lightbulb, AlertTriangle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlossaryKey } from "@/lib/glossary";

/**
 * Data detail untuk side panel.
 * Harus mencakup SEMUA kunci yang ada di GlossaryKey (lib/glossary.ts)
 */
const GLOSSARY_DETAILS: Record<GlossaryKey, {
  title: string;
  definition: string;
  example: string;
  riskLevel: "Rendah" | "Menengah" | "Tinggi" | "Sangat Tinggi";
  tips: string;
}> = {
  deposito: {
    title: "Deposito",
    definition: "Produk simpanan bank yang penyetoran maupun penarikannya hanya dapat dilakukan pada waktu tertentu (jatuh tempo).",
    example: "Menyimpan uang Rp10 juta selama 12 bulan. Jika diambil sebelum waktunya, kamu akan dikenakan penalti/denda.",
    riskLevel: "Rendah",
    tips: "Sangat aman karena dijamin LPS. Gunakan untuk dana yang sudah pasti tidak dipakai dalam jangka pendek.",
  },
  obligasi: {
    title: "Obligasi",
    definition: "Surat pernyataan utang dari penerbit (pemerintah atau perusahaan) kepada pemegang obligasi dengan janji membayar bunga berkala (kupon).",
    example: "Membeli ORI atau SBR. Kamu meminjamkan uang ke negara dan negara memberi imbalan bunga setiap bulan.",
    riskLevel: "Rendah",
    tips: "Obligasi pemerintah adalah instrumen investasi yang sangat aman karena dijamin oleh undang-undang.",
  },
  emas: {
    title: "Emas",
    definition: "Logam mulia yang dianggap sebagai aset pelindung nilai (safe haven) karena nilainya cenderung bertahan saat ekonomi tidak pasti.",
    example: "Membeli emas batangan atau emas digital sebagai cadangan nilai kekayaan jangka panjang.",
    riskLevel: "Rendah",
    tips: "Emas cocok untuk menjaga daya beli uangmu terhadap inflasi dalam jangka waktu yang sangat lama.",
  },
  reksa_dana: {
    title: "Reksa Dana",
    definition: "Wadah untuk menghimpun dana dari masyarakat pemodal yang selanjutnya dikelola oleh Manajer Investasi ke dalam berbagai aset keuangan.",
    example: "Ibarat menitipkan uang ke supir bus (Manajer Investasi) agar diantarkan ke tujuan investasi yang aman dan menguntungkan.",
    riskLevel: "Menengah",
    tips: "Pilihan praktis bagi pemula yang tidak memiliki waktu untuk mengelola investasi secara mandiri.",
  },
  reksa_dana_pasar_uang: {
    title: "Reksa Dana Pasar Uang",
    definition: "Reksa dana yang 100% dananya ditempatkan pada instrumen pasar uang seperti deposito bank dan surat utang jangka pendek (< 1 tahun).",
    example: "Tempat menyimpan dana darurat karena pencairannya cepat (likuid) dan risikonya paling rendah.",
    riskLevel: "Rendah",
    tips: "Gunakan untuk tujuan keuangan jangka pendek agar uang tidak menganggur di tabungan biasa.",
  },
  reksa_dana_pendapatan_tetap: {
    title: "Reksa Dana Pendapatan Tetap",
    definition: "Jenis reksa dana yang menginvestasikan minimal 80% aktivanya dalam bentuk efek utang atau obligasi.",
    example: "Memberikan imbal hasil yang lebih stabil dibanding saham namun tetap lebih tinggi dari bunga deposito.",
    riskLevel: "Rendah",
    tips: "Cocok untuk target keuangan jangka menengah (1-3 tahun) seperti DP rumah atau biaya sekolah anak.",
  },
  reksa_dana_saham: {
    title: "Reksa Dana Saham",
    definition: "Reksa dana yang mayoritas portofolionya (minimal 80%) ditempatkan pada instrumen ekuitas atau saham perusahaan.",
    example: "Potensi keuntungan paling besar dalam jangka panjang, namun nilainya bisa fluktuatif (naik-turun) tajam.",
    riskLevel: "Tinggi",
    tips: "Hanya gunakan 'uang dingin' dan tujukan untuk investasi jangka panjang (di atas 5 tahun).",
  },
  reksa_dana_campuran: {
    title: "Reksa Dana Campuran",
    definition: "Investasi yang mengombinasikan berbagai instrumen seperti saham, obligasi, dan pasar uang dalam satu produk.",
    example: "Fleksibel dalam menyesuaikan kondisi pasar; Manajer Investasi akan mengatur porsi aset sesuai kondisi ekonomi.",
    riskLevel: "Menengah",
    tips: "Pilihan tepat jika kamu ingin diversifikasi otomatis antara aset aman dan aset agresif.",
  },
  reksa_dana_syariah: {
    title: "Reksa Dana Syariah",
    definition: "Reksa dana yang dikelola sesuai dengan prinsip syariat Islam dan hanya berinvestasi pada emiten yang masuk Daftar Efek Syariah.",
    example: "Investasi tidak akan masuk ke perusahaan yang menjual alkohol, judi, atau bank konvensional (mengandung riba).",
    riskLevel: "Menengah",
    tips: "Memberikan ketenangan pikiran bagi investor yang ingin investasinya berkah dan halal.",
  },
  saham: {
    title: "Saham",
    definition: "Tanda penyertaan modal atau kepemilikan seseorang dalam suatu perusahaan atau perseroan terbatas.",
    example: "Membeli saham perusahaan seperti BCA atau Telkom. Jika perusahaan untung, kamu bisa dapat dividen.",
    riskLevel: "Sangat Tinggi",
    tips: "Selalu lakukan analisis fundamental dan jangan sekadar ikut-ikutan tren atau 'FOMO'.",
  },
  diversifikasi: {
    title: "Diversifikasi",
    definition: "Strategi menyebar modal ke berbagai jenis aset investasi yang berbeda untuk mengurangi risiko kerugian total.",
    example: "Jangan menaruh semua telur dalam satu keranjang. Jika satu jatuh (satu aset rugi), yang lain masih aman.",
    riskLevel: "Rendah",
    tips: "Kombinasikan aset berisiko tinggi dengan aset aman untuk menjaga stabilitas portofoliomu.",
  },
  risk_reward: {
    title: "Risk to Reward Ratio",
    definition: "Prinsip perbandingan antara potensi keuntungan yang diharapkan dengan risiko kerugian yang mungkin terjadi.",
    example: "Semakin tinggi potensi untung (High Return), maka risiko yang menyertai juga semakin tinggi (High Risk).",
    riskLevel: "Menengah",
    tips: "Sesuaikan pilihan investasimu dengan 'profil risiko' atau tingkat keberanianmu menghadapi kerugian.",
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