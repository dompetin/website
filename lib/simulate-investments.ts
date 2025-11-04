export interface InvestmentSimulationParams {
  currentSavings: number;
  savingsPerMonth: number;
  product:
    | "mixed"
    | "stocks"
    | "mutual_fund"
    | "gold"
    | "deposit"
    | "obligation";
}

export interface InvestmentSimulationResult {
  year: number;
  moneyWithInvestingMax: number;
  moneyWithInvestingMin: number;
  moneyWithoutInvesting: number;
}

const productMap = {
  deposit: {
    min: 0.02,
    max: 0.05,
  },
  obligation: {
    min: 0.05,
    max: 0.06,
  },
  gold: {
    min: 0.08,
    max: 0.11,
  },
  // mixed: {
  //   min: 0.03,
  //   max: 0.05,
  // },
  mutual_fund: {
    min: -0.02,
    max: 0.11,
  },
  stocks: {
    min: -0.19,
    max: 0.22,
  },
};

export function simulateInvestments(
  data: InvestmentSimulationParams,
): InvestmentSimulationResult[] {
  const newChartData: InvestmentSimulationResult[] = [];
  const initialYear = new Date().getFullYear();

  const baseReturn = productMap[data.product];

  for (let year = initialYear; year <= initialYear + 10; year++) {
    let investedMin, investedMax, nonInvested;
    // if it's the first year, just set the initial savings
    if (year === 2025) {
      investedMin = data.currentSavings;
      investedMax = data.currentSavings;
      nonInvested = data.currentSavings;
    } else {
      investedMin =
        newChartData[newChartData.length - 1].moneyWithInvestingMin *
          (1 + baseReturn.min) +
        data.savingsPerMonth * 12;

      investedMax =
        newChartData[newChartData.length - 1].moneyWithInvestingMax *
          (1 + baseReturn.max) +
        data.savingsPerMonth * 12;

      nonInvested =
        newChartData[newChartData.length - 1].moneyWithoutInvesting *
          (1 - 0.025) +
        data.savingsPerMonth * 12;
    }

    newChartData.push({
      year,
      moneyWithInvestingMax: Math.trunc(investedMax),
      moneyWithInvestingMin: Math.trunc(investedMin),
      moneyWithoutInvesting: Math.trunc(nonInvested),
    });
  }

  return newChartData;
}
