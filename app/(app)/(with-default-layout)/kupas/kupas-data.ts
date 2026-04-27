export type KupasArticle = {
  id:      number;
  real:    boolean;
  tag:     string;
  title:   string;
  desc:    string;
  preview: string;
  insight: string;
  time:    number;
  date:    string;
  src:     string;
  href:    string;
};

export const KUPAS_ARTICLES: KupasArticle[] = [
  {
    id: 1, real: true,  tag: "Saham",
    title:   "Sektor mana yang paling cuan di bursa saham?",
    desc:    "Kalau kamu invest di tiap sektor, siapa yang bikin dompet paling tebal?",
    preview: "Dari 11 sektor di BEI, ternyata sektor energi dan teknologi mencatatkan return tertinggi dalam 5 tahun terakhir. Tapi ada kejutan dari sektor yang sering diabaikan...",
    insight: "📊 Sektor Energi: +142% dalam 5 tahun",
    time: 6, date: "Jan 2026",
    src: "/kupas/jumping.png", href: "/kupas/1",
  },
  {
    id: 2, real: false, tag: "Inflasi",
    title:   "Inflasi 4% terasa kayak berapa sih buat dompetmu?",
    desc:    "Visualisasi sederhana bagaimana daya beli uang Rp 10 juta berubah dalam 10 tahun.",
    preview: "Kalau kamu simpan Rp 10 juta di bawah kasur selama 10 tahun, nilainya setara Rp 6.8 juta di hari ini.",
    insight: "💸 Rp 10 jt → setara Rp 6.8 jt dalam 10 tahun",
    time: 4, date: "Feb 2026",
    src: "/home/cooking.png", href: "#",
  },
  {
    id: 3, real: false, tag: "Gaya Hidup",
    title:   "Kalau uang nongkrong-mu diinvestasiin, jadi berapa?",
    desc:    "Hitung bareng — kalau budget kopi harian dialihkan ke reksa dana selama 5 tahun.",
    preview: "Rata-rata orang Indonesia menghabiskan Rp 35.000/hari untuk kopi. Kalau 50%-nya masuk reksa dana pasar saham selama 5 tahun...",
    insight: "☕ Rp 17.500/hari → Rp 45 jt dalam 5 tahun",
    time: 3, date: "Feb 2026",
    src: "/home/eating.png", href: "#",
  },
  {
    id: 4, real: false, tag: "Makro",
    title:   "Apa yang terjadi ke sahammu saat dolar naik?",
    desc:    "Data dan grafik: korelasi kurs USD/IDR dengan IHSG selama 10 tahun terakhir.",
    preview: "Setiap kali dolar naik 5%, IHSG rata-rata turun 3.2%. Tapi tidak semua sektor bereaksi sama — ada yang justru diuntungkan...",
    insight: "📉 USD naik 5% → IHSG rata-rata turun 3.2%",
    time: 7, date: "Mar 2026",
    src: "/home/laptop.png", href: "#",
  },
  {
    id: 5, real: false, tag: "Properti",
    title:   "Beli rumah vs investasi saham: mana lebih worth it?",
    desc:    "Perbandingan data 20 tahun antara return properti di Jakarta vs IHSG composite.",
    preview: "Properti di Jakarta naik rata-rata 8.3% per tahun dalam 20 tahun terakhir. IHSG mencatatkan 12.1%. Tapi ada biaya tersembunyi yang sering dilupakan...",
    insight: "🏠 Properti Jakarta +8.3% vs IHSG +12.1% / tahun",
    time: 8, date: "Mar 2026",
    src: "/home/walking.png", href: "#",
  },
  {
    id: 6, real: false, tag: "Reksa Dana",
    title:   "Manajer investasi mana yang paling konsisten?",
    desc:    "Kupas performa 10 reksa dana saham terpopuler di Indonesia dalam 5 tahun.",
    preview: "Dari 10 reksa dana saham paling populer, hanya 3 yang konsisten mengalahkan benchmark IHSG setiap tahun.",
    insight: "🏆 Hanya 3 dari 10 reksa dana konsisten outperform",
    time: 9, date: "Mar 2026",
    src: "/home/writing.png", href: "#",
  },
];
