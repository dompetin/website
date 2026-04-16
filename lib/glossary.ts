export type GlossaryKey =
  | "deposito"
  | "obligasi"
  | "reksa_dana"
  | "reksa_dana_pasar_uang"
  | "reksa_dana_pendapatan_tetap"
  | "reksa_dana_saham"
  | "reksa_dana_campuran"
  | "reksa_dana_syariah"
  | "saham"
  | "diversifikasi"
  | "risk_reward";

export const GLOSSARY: Record<
  GlossaryKey,
  { title: string; desc: string; hint?: string }
> = {
  deposito: {
    title: "Deposito",
    desc: "Simpanan berjangka di bank dengan bunga tetap, dana dikunci sampai jatuh tempo.",
    hint: "💡 Cocok untuk yang ingin aman tanpa fluktuasi.",
  },
  obligasi: {
    title: "Obligasi",
    desc: "Surat utang dari pemerintah atau perusahaan yang membayar bunga (kupon) secara berkala.",
    hint: "💡 Biasanya lebih stabil dibanding saham.",
  },
  reksa_dana: {
    title: "Reksa Dana",
    desc: "Wadah investasi yang dikelola profesional dan dibagi ke berbagai aset.",
  },
  reksa_dana_pasar_uang: {
    title: "Reksa Dana Pasar Uang",
    desc: "Investasi di instrumen jangka pendek seperti deposito dan SBI, dengan risiko rendah.",
    hint: "💡 Cocok untuk dana darurat atau jangka pendek.",
  },
  reksa_dana_pendapatan_tetap: {
    title: "Reksa Dana Pendapatan Tetap",
    desc: "Investasi di obligasi dengan potensi return stabil dari kupon.",
    hint: "💡 Balance antara stabil dan tetap berkembang.",
  },
  reksa_dana_saham: {
    title: "Reksa Dana Saham",
    desc: "Investasi di saham dengan potensi return tinggi namun fluktuatif.",
    hint: "💡 Cocok untuk jangka panjang dan siap naik turun.",
  },
  reksa_dana_campuran: {
    title: "Reksa Dana Campuran",
    desc: "Gabungan saham, obligasi, dan pasar uang untuk menyeimbangkan risiko.",
    hint: "💡 Pilihan fleksibel untuk investor pemula.",
  },
  reksa_dana_syariah: {
    title: "Reksa Dana Syariah",
    desc: "Investasi sesuai prinsip Islam, hanya ke instrumen halal.",
  },
  saham: {
    title: "Saham",
    desc: "Kepemilikan perusahaan yang nilainya naik turun sesuai pasar.",
    hint: "💡 Potensi tinggi, tapi harus siap fluktuasi.",
  },
  diversifikasi: {
    title: "Diversifikasi",
    desc: "Membagi investasi ke beberapa aset untuk mengurangi risiko.",
    hint: "💡 Jangan taruh semua uang di satu tempat.",
  },
  risk_reward: {
    title: "Risk-to-Reward",
    desc: "Perbandingan antara risiko dan potensi keuntungan.",
    hint: "💡 Return tinggi biasanya datang dengan risiko tinggi.",
  },
};