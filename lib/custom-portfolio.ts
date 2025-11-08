import { InvestmentSimulationResult } from "./simulate-investments";

export const SIMULATION_HORIZON_YEARS = 25;

export const assetCatalog = {
  reksadana_pasar_uang: {
    label: "Reksadana Pasar Uang",
    upswing: 0.0562,
    downswing: 0.0385,
    riskFreeRate: -0.0198,
    riskLevel: 3,
  },
  reksadana_pendapatan_tetap: {
    label: "Reksadana Pendapatan Tetap",
    upswing: 0.078,
    downswing: 0.0459,
    riskFreeRate: 0.0459,
    riskLevel: 3,
  },
  reksadana_campuran: {
    label: "Reksadana Campuran",
    upswing: 0.1531,
    downswing: 0.0124,
    riskFreeRate: 0.0124,
    riskLevel: 3,
  },
  reksadana_pasar_saham: {
    label: "Reksadana Pasar Saham",
    upswing: 0.1226,
    downswing: -0.0688,
    riskFreeRate: -0.0688,
    riskLevel: 5,
  },
  obligasi: {
    label: "Obligasi",
    upswing: 0.0623,
    downswing: 0.0475,
    riskFreeRate: 0.0475,
    riskLevel: 2,
  },
  saham: {
    label: "Saham",
    upswing: 0.2202,
    downswing: -0.1873,
    riskFreeRate: -0.1873,
    riskLevel: 5,
  },
  deposit: {
    label: "Deposito",
    upswing: 0.0475,
    downswing: 0.0225,
    riskFreeRate: 0.0225,
    riskLevel: 1,
  },
  gold: {
    label: "Emas",
    upswing: 0.11,
    downswing: 0.08,
    riskFreeRate: 0.08,
    riskLevel: 3,
  },
} as const;

export type AssetType = keyof typeof assetCatalog;

export type AssetAllocationInput = {
  type: AssetType;
  percentage: number;
};

export interface CustomSimulationInputs {
  currentSavings: number;
  savingsPerMonth: number;
  upswing: number;
  downswing: number;
  horizonYears: number;
}

export type PortfolioSlice = {
  type: AssetType;
  label: string;
  value: number;
  percentage: number;
};

export interface PortfolioAnalysisResult {
  slices: PortfolioSlice[];
  isReady: boolean;
  diversificationScore: number;
  diversificationNote: string;
  riskRewardScore: number;
  riskRewardNote: string;
  topAsset: PortfolioSlice | null;
  avgReturn: number;
  portfolioStdDev: number;
  weightedRiskFreeRate: number;
}

export interface PortfolioAnalysisParams {
  allocation: AssetAllocationInput[];
  allocationIsValid: boolean;
}

export const simulateCustomPortfolio = ({
  currentSavings,
  savingsPerMonth,
  upswing,
  downswing,
  horizonYears,
}: CustomSimulationInputs): InvestmentSimulationResult[] => {
  const startYear = new Date().getFullYear();
  const yearlyContribution = savingsPerMonth * 12;

  let minBalance = currentSavings;
  let maxBalance = currentSavings;
  let savingsBalance = currentSavings;

  const results: InvestmentSimulationResult[] = [
    {
      year: startYear,
      moneyWithInvestingMin: Math.trunc(minBalance),
      moneyWithInvestingMax: Math.trunc(maxBalance),
      moneyWithoutInvesting: Math.trunc(savingsBalance),
    },
  ];

  for (let yearIndex = 1; yearIndex <= horizonYears; yearIndex++) {
    minBalance = minBalance * (1 + downswing) + yearlyContribution;
    maxBalance = maxBalance * (1 + upswing) + yearlyContribution;
    savingsBalance = savingsBalance * (1 - 0.025) + yearlyContribution;

    results.push({
      year: startYear + yearIndex,
      moneyWithInvestingMin: Math.trunc(minBalance),
      moneyWithInvestingMax: Math.trunc(maxBalance),
      moneyWithoutInvesting: Math.trunc(savingsBalance),
    });
  }

  return results;
};

export const analyzeCustomPortfolio = ({
  allocation,
  allocationIsValid,
}: PortfolioAnalysisParams): PortfolioAnalysisResult => {
  const totals = allocation.reduce((acc, entry) => {
    const value = Number.isFinite(entry.percentage) ? entry.percentage : 0;
    if (value <= 0) {
      return acc;
    }

    acc[entry.type] = (acc[entry.type] || 0) + value;
    return acc;
  }, {} as Record<AssetType, number>);

  const aggregated = (Object.entries(totals) as [AssetType, number][])
    .filter(([, value]) => value > 0)
    .map(([type, value]) => ({
      type,
      label: assetCatalog[type].label,
      value,
    }))
    .sort((a, b) => b.value - a.value);

  const totalValue = aggregated.reduce((acc, item) => acc + item.value, 0);
  const normalized = totalValue
    ? aggregated.map((item) => ({
        ...item,
        percentage: (item.value / totalValue) * 100,
      }))
    : [];

  const ready = allocationIsValid && normalized.length > 0;

  // Calculate weighted upswing and downswing
  let totalWeightedUpswing = 0;
  let totalWeightedDownswing = 0;
  let weightedRiskFreeRate = 0;

  allocation.forEach((entry) => {
    const weight = entry.percentage / 100;
    const asset = assetCatalog[entry.type];
    totalWeightedUpswing += weight * asset.upswing;
    totalWeightedDownswing += weight * asset.downswing;
    weightedRiskFreeRate += weight * asset.riskFreeRate;
  });

  // Calculate Average Return
  const avgReturn = (totalWeightedUpswing + totalWeightedDownswing) / 2;

  // Calculate Portfolio Standard Deviation
  const portfolioStdDev = Math.sqrt(
    (Math.pow(totalWeightedUpswing - avgReturn, 2) +
      Math.pow(totalWeightedDownswing - avgReturn, 2)) /
      2,
  );

  // Calculate Risk-to-Reward Ratio
  const rawRiskReward =
    ready && portfolioStdDev > 0
      ? (avgReturn + weightedRiskFreeRate) / portfolioStdDev
      : 0;
  const riskRewardScore = Math.round(Math.max(-1, Math.min(1, rawRiskReward)) * 100) / 100;

  // Calculate Diversification (1 - SUMSQ of percentages as decimals)
  const sumSquares = allocation.reduce((acc, entry) => {
    const weight = entry.percentage / 100;
    return acc + weight * weight;
  }, 0);
  const diversificationRaw = ready ? (1 - sumSquares) * 100 : 0;
  const diversificationScore = Math.max(0, Math.min(100, diversificationRaw));

  // Diversification notes based on percentage
  const diversificationNote = !ready
    ? "Lengkapi komposisi asetmu dulu supaya kami bisa analisa."
    : diversificationScore < 50
    ? "Portofoliomu masih terpusat di sedikit aset (kurang)."
    : diversificationScore < 70
    ? "Sebaran asetmu lumayan, coba tambah variasi lagi."
    : diversificationScore < 80
    ? "Komposisi asetmu sudah bagus tersebar."
    : "Komposisi asetmu sudah tersebar dengan sangat baik!";

  // Risk-to-reward notes
  const riskRewardNote = !ready
    ? "Kami butuh alokasi yang valid untuk hitung rasio risiko."
    : riskRewardScore <= 0
    ? "Potensi imbal hasil belum sebanding dengan risiko."
    : riskRewardScore <= 0.3
    ? "Keuntunganmu mulai sepadan dengan risikomu."
    : riskRewardScore <= 0.6
    ? "Keuntunganmu sudah bagus dibanding risikomu!"
    : "Imbal hasilmu sangat melampaui risiko yang diambil!";

  const topAsset = normalized[0] ?? null;

  return {
    slices: normalized,
    isReady: ready,
    diversificationScore,
    diversificationNote,
    riskRewardScore,
    riskRewardNote,
    topAsset,
    avgReturn,
    portfolioStdDev,
    weightedRiskFreeRate,
  };
};
