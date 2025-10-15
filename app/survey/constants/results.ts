export interface ResultDescriptionsMap {
  [key: string]: {
    title: string;
    description: string;
    recommendations: string[];
  };
}

export const resultDescriptions: ResultDescriptionsMap = {
  Conservative: {
    title: "Tipe Aman",
    description:
      "Kamu lebih suka menjaga kestabilan dan keamanan finansial. Pilihanmu cenderung konservatif dan minim risiko.",
    recommendations: [
      "Deposito Berjangka",
      "Obligasi Pemerintah",
      "Reksa Dana Pasar Uang",
    ],
  },
  Balanced: {
    title: "Tipe Seimbang",
    description:
      "Kamu punya keseimbangan antara keamanan dan potensi keuntungan. Tahu kapan harus ambil risiko.",
    recommendations: ["Reksa Dana Campuran", "Saham Blue Chip", "Properti"],
  },
  Aggressive: {
    title: "Tipe Agresif",
    description:
      "Kamu berani ambil risiko demi hasil lebih tinggi. Cocok untuk investasi jangka panjang dengan potensi besar.",
    recommendations: [
      "Saham IPO",
      "Kripto",
      "Reksa Dana Saham Sektor Teknologi",
    ],
  },
};
