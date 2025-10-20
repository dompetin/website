export const questions = [
  {
    id: 1,
    text: "Berapa tabunganmu sekarang?",
    type: "input",
    placeholder: "Rp...",
  },
  {
    id: 2,
    text: "Berapa yang kamu siap tabung per bulan?",
    type: "input",
    placeholder: "Rp...",
  },
  {
    id: 3,
    text: "Kamu dapat uang lebih dari beasiswa atau kerja part-time. Apa yang kamu lakukan?",
    type: "choice",
    options: [
      {
        text: "Langsung disimpan di tabungan biar aman",
        category: "Conservative",
        score: 0,
      },
      {
        text: "Simpan sebagian, sisanya buat coba investasi kecil-kecilan",
        category: "Balanced",
        score: 1,
      },
      {
        text: "Gunakan untuk investasi jangka panjang walau belum butuh sekarang",
        category: "Aggressive",
        score: 2,
      },
    ],
  },
  {
    id: 4,
    text: "Harga saham yang kamu beli turun 15% dalam sebulan. Apa reaksimu?",
    type: "choice",
    options: [
      {
        text: "Beli lagi karena harga diskon",
        category: "Aggressive",
        score: 2,
      },
      {
        text: "Tenang aja, tunggu aja nanti naik lagi",
        category: "Balanced",
        score: 1,
      },
      {
        text: "Jual supaya gak rugi lebih banyak",
        category: "Conservative",
        score: 0,
      },
    ],
  },
  {
    id: 5,
    text: "Kalau kamu menabung atau berinvestasi, kamu ingin hasilnya terlihat dalam…",
    type: "choice",
    options: [
      { text: "Kurang dari 1 tahun", category: "Conservative", score: 0 },
      { text: "1–3 tahun", category: "Balanced", score: 1 },
      { text: "Lebih dari 3 tahun", category: "Aggressive", score: 2 },
    ],
  },
  {
    id: 6,
    text: "Kamu mau beli laptop baru 1 tahun lagi, tapi juga ingin uangmu berkembang. Pilih mana?",
    type: "choice",
    options: [
      { text: "Tabung aja biar pasti ada", category: "Conservative", score: 0 },
      {
        text: "Coba invest di produk risiko rendah biar ada tambahan sedikit",
        category: "Balanced",
        score: 1,
      },
      {
        text: "Invest di produk berisiko tinggi walau mungkin untungnya lebih tinggi",
        category: "Aggressive",
        score: 2,
      },
    ],
  },
  {
    id: 7,
    text: "Temanmu ajak investasi di saham yang trennya lagi naik. Gimana responmu?",
    type: "choice",
    options: [
      {
        text: "Coba pelajari dulu, kalau masuk akal baru invest sedikit",
        category: "Balanced",
        score: 1,
      },
      { text: "Gak ikut, takut rugi", category: "Conservative", score: 0 },
      {
        text: "Langsung ikut karena peluang gak datang dua kali",
        category: "Aggressive",
        score: 2,
      },
    ],
  },
];
