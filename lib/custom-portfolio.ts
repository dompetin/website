import { InvestmentSimulationResult } from "./simulate-investments";

export const SIMULATION_HORIZON_YEARS = 25;

export const assetCatalog = {
  reksadana_pasar_uang: {
    label: "Reksadana Pasar Uang",
    minReturn: 0.03,
    maxReturn: 0.045,
    riskLevel: 1,
  },
  saham_as: {
    label: "Saham AS",
    minReturn: 0.06,
    maxReturn: 0.1,
    riskLevel: 5,
  },
  obligasi: {
    label: "Obligasi",
    minReturn: 0.04,
    maxReturn: 0.06,
    riskLevel: 2,
  },
  saham_indonesia: {
    label: "Saham Indonesia",
    minReturn: 0.05,
    maxReturn: 0.085,
    riskLevel: 4,
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
  minReturn: number;
  maxReturn: number;
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
}

export interface PortfolioAnalysisParams {
  allocation: AssetAllocationInput[];
  allocationIsValid: boolean;
  minReturn: number;
  maxReturn: number;
}

const MIN_RISK_FLOOR = 0.5;
const RISK_SCALER = 0.75;

export const simulateCustomPortfolio = ({
  currentSavings,
  savingsPerMonth,
  minReturn,
  maxReturn,
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

  for (let yearIndex = 1; yearIndex <= SIMULATION_HORIZON_YEARS; yearIndex++) {
    minBalance = minBalance * (1 + minReturn) + yearlyContribution;
    maxBalance = maxBalance * (1 + maxReturn) + yearlyContribution;
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
  minReturn,
  maxReturn,
}: PortfolioAnalysisParams): PortfolioAnalysisResult => {
  const totals = allocation.reduce((acc, entry) => {
    const value = Number.isFinite(entry.percentage) ? entry.percentage : 0;
    if (value <= 0) {
      return acc;
    }

    acc[entry.type] = (acc[entry.type] || 0) + value;
    return acc;
  }, {} as Record<AssetType, number>);

  const aggregated = (Object.entries(totals) as [AssetType, number][]) // typed entries
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

  const weights = normalized.map((item) => item.percentage / 100);
  const entropy = weights.reduce((acc, weight) => {
    if (weight <= 0) {
      return acc;
    }
    return acc - weight * Math.log(weight);
  }, 0);

  const maxEntropy = weights.length > 1 ? Math.log(weights.length) : 0;
  const diversificationScore =
    allocationIsValid && maxEntropy > 0
      ? Math.max(0, Math.min(10, Math.round((entropy / maxEntropy) * 10)))
      : allocationIsValid && weights.length === 1
      ? 0
      : 0;

  const weightedRisk = weights.reduce((acc, weight, index) => {
    const assetType = normalized[index]?.type;
    if (!assetType) {
      return acc;
    }
    return acc + weight * assetCatalog[assetType].riskLevel;
  }, 0);

  const averageReturn = (minReturn + maxReturn) / 2;
  const rawRiskReward =
    allocationIsValid && weights.length
      ? (averageReturn * 100) /
        Math.max(weightedRisk * RISK_SCALER, MIN_RISK_FLOOR)
      : 0;
  const riskRewardScore = Math.max(0, Math.min(10, Math.round(rawRiskReward)));

  const ready = allocationIsValid && normalized.length > 0;

  const diversificationNote = !ready
    ? "Lengkapi komposisi asetmu dulu supaya kami bisa analisa."
    : diversificationScore <= 3
    ? "Portofoliomu masih terpusat di sedikit aset."
    : diversificationScore <= 7
    ? "Sebaran asetmu cukup oke, coba tambah variasi kecil lagi."
    : "Komposisi asetmu sudah tersebar dengan baik.";

  const riskRewardNote = !ready
    ? "Kami butuh alokasi yang valid untuk hitung rasio risiko."
    : riskRewardScore <= 3
    ? "Potensi imbal hasil belum sebanding dengan risiko."
    : riskRewardScore <= 7
    ? "Keuntunganmu impas dengan risikomu!"
    : "Imbal hasilmu sudah melampaui risiko yang diambil.";

  const topAsset = normalized[0] ?? null;

  return {
    slices: normalized,
    isReady: ready,
    diversificationScore,
    diversificationNote,
    riskRewardScore,
    riskRewardNote,
    topAsset,
  };
};
