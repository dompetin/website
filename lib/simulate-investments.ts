export interface InvestmentSimulationParams {
  currentSavings: number;
  savingsPerMonth: number;
  product:
    | "stocks"
    | "mutual_fund"
    | "gold"
    | "deposit"
    | "obligation";
  horizonYears: number;
}

export interface InvestmentSimulationResult {
  year: number;
  moneyWithInvestingMax: number;
  moneyWithInvestingMin: number;
  moneyWithoutInvesting: number;
}

// Data return historis (rata-rata per tahun)
const productMap = {
  deposit: { min: 0.03, max: 0.045 },    // Deposito stabil di 3-4%
  obligation: { min: 0.055, max: 0.07 }, // SBN/Obligasi
  gold: { min: 0.08, max: 0.12 },       // Emas jangka panjang
  mutual_fund: { min: 0.04, max: 0.10 }, // Reksa Dana Campuran/Pendapatan Tetap
  stocks: { min: -0.05, max: 0.18 },     // Saham volatil tapi potensi tinggi
};

export function simulateInvestments(
  data: InvestmentSimulationParams,
): InvestmentSimulationResult[] {
  const newChartData: InvestmentSimulationResult[] = [];
  const initialYear = 0; // Menggunakan index tahun (0, 1, 2...) lebih aman untuk grafik linear

  const baseReturn = productMap[data.product];
  const INFLATION_RATE = 0.03; // Rata-rata inflasi Indonesia ~3%

  let currentMin = data.currentSavings;
  let currentMax = data.currentSavings;
  let currentCash = data.currentSavings;

  for (let year = 0; year <= data.horizonYears; year++) {
    if (year === 0) {
      newChartData.push({
        year,
        moneyWithInvestingMax: Math.trunc(currentMax),
        moneyWithInvestingMin: Math.trunc(currentMin),
        moneyWithoutInvesting: Math.trunc(currentCash),
      });
      continue;
    }

    const annualContribution = data.savingsPerMonth * 12;

    // Logika: (Saldo Awal * Return) + (Nabung Bulanan * Setengah Return)
    // Diasumsikan nabung bulanan masuk bertahap, jadi rata-rata dapat bunga 6 bulan
    currentMin = (currentMin * (1 + baseReturn.min)) + (annualContribution * (1 + baseReturn.min / 2));
    currentMax = (currentMax * (1 + baseReturn.max)) + (annualContribution * (1 + baseReturn.max / 2));
    
    // Tabungan Biasa: Secara nominal bertambah terus tanpa bunga (tapi dipotong biaya admin tipis)
    // Kita tidak kurangi inflasi di sini agar user melihat angka nominal yang mereka kenal
    currentCash += annualContribution;

    newChartData.push({
      year,
      moneyWithInvestingMax: Math.trunc(currentMax),
      moneyWithInvestingMin: Math.trunc(currentMin),
      moneyWithoutInvesting: Math.trunc(currentCash),
    });
  }

  return newChartData;
}