export type GlossaryKey =
  | "deposito"
  | "obligasi"
  | "emas"
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
  emas: {
    title: "Emas",
    desc: "Aset pelindung nilai (safe haven) yang harganya cenderung naik saat ekonomi tidak stabil.",
    hint: "💡 Cocok untuk menjaga nilai uang dalam jangka panjang.",
  },
  reksa_dana: {
    title: "Reksa Dana",
    desc: "Wadah investasi yang dikelola profesional (Manajer Investasi) untuk disalurkan ke berbagai aset.",
    hint: "💡 Solusi praktis buat yang nggak punya waktu pantau pasar.",
  },
  reksa_dana_pasar_uang: {
    title: "Reksa Dana Pasar Uang",
    desc: "Investasi di instrumen jangka pendek (deposito/SBI) dengan risiko paling rendah.",
    hint: "💡 Cocok untuk tempat menyimpan dana darurat.",
  },
  reksa_dana_pendapatan_tetap: {
    title: "Reksa Dana Pendapatan Tetap",
    desc: "Reksa dana yang mayoritas dananya dibelikan obligasi atau surat utang.",
    hint: "💡 Balance antara stabil dan tetap berkembang.",
  },
  reksa_dana_saham: {
    title: "Reksa Dana Saham",
    desc: "Investasi di saham dengan potensi return tinggi namun fluktuatif.",
    hint: "💡 Cocok untuk jangka panjang (>5 tahun).",
  },
  reksa_dana_campuran: {
    title: "Reksa Dana Campuran",
    desc: "Gabungan saham, obligasi, dan pasar uang dalam satu portofolio.",
    hint: "💡 Pilihan fleksibel untuk investor moderat.",
  },
  reksa_dana_syariah: {
    title: "Reksa Dana Syariah",
    desc: "Investasi yang dikelola sesuai prinsip syariat Islam dan hanya masuk ke instrumen halal.",
    hint: "💡 Bebas riba, maysir, dan gharar.",
  },
  saham: {
    title: "Saham",
    desc: "Bukti kepemilikan sebuah perusahaan yang nilainya naik turun sesuai kinerja pasar.",
    hint: "💡 Potensi tinggi, tapi harus siap dengan fluktuasi harga.",
  },
  diversifikasi: {
    title: "Diversifikasi",
    desc: "Strategi menyebar investasi ke berbagai aset berbeda untuk mengurangi risiko.",
    hint: "💡 Jangan taruh semua telur dalam satu keranjang.",
  },
  risk_reward: {
    title: "Risk-to-Reward",
    desc: "Prinsip bahwa potensi keuntungan besar selalu dibarengi risiko yang besar pula.",
    hint: "💡 Pahami profil risikomu sebelum mulai berinvestasi.",
  },
};