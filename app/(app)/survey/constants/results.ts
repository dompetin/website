export interface PortfolioAllocation {
  asset: string;
  percentage: number;
  color: string;
}

export interface ResultDescriptionsMap {
  [key: string]: {
    title: string;
    description: string;
    level: string;
    portfolio: PortfolioAllocation[];
    recommendations: string[];
  };
}

export const resultDescriptions: ResultDescriptionsMap = {
  Conservative: {
    title: "Konservatif",
    description:
      "Kamu termasuk tipe yang hati-hati dalam mengelola uang. Tujuan utama kamu adalah menjaga nilai uang agar tidak berkurang.",
    level: "Sangat Konservatif",
    portfolio: [
      { asset: "Deposito", percentage: 90, color: "#E8D5FF" },
      { asset: "Emas", percentage: 10, color: "#C084FC" },
    ],
    recommendations: ["Deposito", "Emas"],
  },
  Conservative2: {
    title: "Konservatif",
    description:
      "Kamu termasuk tipe yang hati-hati dalam mengelola uang. Tujuan utama kamu adalah menjaga nilai uang agar tidak berkurang.",
    level: "Cenderung Konservatif",
    portfolio: [
      { asset: "Deposito", percentage: 70, color: "#E8D5FF" },
      { asset: "Emas", percentage: 30, color: "#C084FC" },
    ],
    recommendations: ["Deposito", "Emas"],
  },
  Conservative3: {
    title: "Konservatif",
    description:
      "Kamu termasuk tipe yang hati-hati dalam mengelola uang. Tujuan utama kamu adalah menjaga nilai uang agar tidak berkurang.",
    level: "Konservatif",
    portfolio: [
      { asset: "Deposito", percentage: 50, color: "#E8D5FF" },
      { asset: "Emas", percentage: 40, color: "#C084FC" },
      { asset: "Obligasi", percentage: 10, color: "#9333EA" },
    ],
    recommendations: ["Deposito", "Emas", "Obligasi"],
  },
  Balanced: {
    title: "Moderat",
    description:
      "Kamu siap mengambil sedikit risiko untuk hasil yang lebih tinggi, tapi tetap ingin ada batas aman. Kamu paham bahwa untuk tumbuh, uang perlu 'bekerja', tapi kamu tetap ingin kontrol atas risiko.",
    level: "Konservatif-Moderat",
    portfolio: [
      { asset: "Emas", percentage: 50, color: "#E8D5FF" },
      { asset: "Reksadana Pasar Uang", percentage: 30, color: "#C084FC" },
      { asset: "Obligasi", percentage: 20, color: "#9333EA" },
    ],
    recommendations: ["Emas", "Reksadana Pasar Uang", "Obligasi"],
  },
  Balanced2: {
    title: "Moderat",
    description:
      "Kamu siap mengambil sedikit risiko untuk hasil yang lebih tinggi, tapi tetap ingin ada batas aman. Kamu paham bahwa untuk tumbuh, uang perlu 'bekerja', tapi kamu tetap ingin kontrol atas risiko.",
    level: "Moderat",
    portfolio: [
      { asset: "Emas", percentage: 50, color: "#E8D5FF" },
      { asset: "Reksadana Pendapatan Tetap", percentage: 45, color: "#C084FC" },
      { asset: "Reksadana Campuran", percentage: 5, color: "#9333EA" },
    ],
    recommendations: [
      "Emas",
      "Reksadana Pendapatan Tetap",
      "Reksadana Campuran",
    ],
  },
  Balanced3: {
    title: "Moderat",
    description:
      "Kamu siap mengambil sedikit risiko untuk hasil yang lebih tinggi, tapi tetap ingin ada batas aman. Kamu paham bahwa untuk tumbuh, uang perlu 'bekerja', tapi kamu tetap ingin kontrol atas risiko.",
    level: "Moderat-Agresif",
    portfolio: [
      { asset: "Emas", percentage: 50, color: "#E8D5FF" },
      { asset: "Reksadana Campuran", percentage: 40, color: "#C084FC" },
      { asset: "Reksadana Pendapatan Tetap", percentage: 10, color: "#9333EA" },
    ],
    recommendations: [
      "Emas",
      "Reksadana Campuran",
      "Reksadana Pendapatan Tetap",
    ],
  },
  Aggressive: {
    title: "Agresif",
    description:
      "Kamu punya toleransi risiko tinggi dan berpikir jangka panjang. Kamu tahu bahwa harga investasi bisa turun sementara, tapi kamu fokus pada potensi imbal hasil besar di masa depan.",
    level: "Cenderung Agresif",
    portfolio: [
      { asset: "Reksadana Campuran", percentage: 50, color: "#E8D5FF" },
      { asset: "Reksadana Pasar Uang", percentage: 30, color: "#C084FC" },
      { asset: "Reksadana Pasar Saham", percentage: 20, color: "#9333EA" },
    ],
    recommendations: [
      "Reksadana Campuran",
      "Reksadana Pasar Uang",
      "Reksadana Pasar Saham",
    ],
  },
  Aggressive2: {
    title: "Agresif",
    description:
      "Kamu punya toleransi risiko tinggi dan berpikir jangka panjang. Kamu tahu bahwa harga investasi bisa turun sementara, tapi kamu fokus pada potensi imbal hasil besar di masa depan.",
    level: "Agresif",
    portfolio: [
      { asset: "Reksadana Campuran", percentage: 50, color: "#E8D5FF" },
      { asset: "Reksadana Pasar Saham", percentage: 30, color: "#C084FC" },
      { asset: "Saham", percentage: 20, color: "#9333EA" },
    ],
    recommendations: ["Reksadana Campuran", "Reksadana Pasar Saham", "Saham"],
  },
  Aggressive3: {
    title: "Agresif",
    description:
      "Kamu punya toleransi risiko tinggi dan berpikir jangka panjang. Kamu tahu bahwa harga investasi bisa turun sementara, tapi kamu fokus pada potensi imbal hasil besar di masa depan.",
    level: "Sangat Agresif",
    portfolio: [
      { asset: "Reksadana Campuran", percentage: 50, color: "#E8D5FF" },
      { asset: "Saham", percentage: 50, color: "#C084FC" },
    ],
    recommendations: ["Reksadana Campuran", "Saham"],
  },
  Aggressive4: {
    title: "Agresif",
    description:
      "Kamu punya toleransi risiko tinggi dan berpikir jangka panjang. Kamu tahu bahwa harga investasi bisa turun sementara, tapi kamu fokus pada potensi imbal hasil besar di masa depan.",
    level: "All In!",
    portfolio: [
      { asset: "Saham", percentage: 80, color: "#E8D5FF" },
      { asset: "Reksadana Campuran", percentage: 20, color: "#C084FC" },
    ],
    recommendations: ["Saham", "Reksadana Campuran"],
  },
};
