export interface InvestmentSimulationParams {
  currentSavings: number;
  savingsPerMonth: number;
  risk: "low" | "medium" | "high";
  product: "mixed" | "stocks" | "mutual_fund" | "obligation";
}

export interface InvestmentSimulationResult {
  year: number;
  moneyWithInvesting: number;
  moneyWithoutInvesting: number;
}

const riskMap = {
  low: 0.03,
  medium: 0.07,
  high: 0.12,
};

const productMap = {
  obligation: 0.02,
  mixed: 0.05,
  mutual_fund: 0.07,
  stocks: 0.1,
};

export function simulateInvestments(
  data: InvestmentSimulationParams,
): InvestmentSimulationResult[] {
  const newChartData: InvestmentSimulationResult[] = [];

  // get base return rate from product type and add risk premium
  const baseReturn = productMap[data.product];
  const riskPremium = riskMap[data.risk];
  const expectedReturn = baseReturn + riskPremium;

  // volatility increases with risk (for market fluctuation simulation)
  const volatility = riskMap[data.risk];

  for (let year = 2025; year <= 2030; year++) {
    let investedValue, nonInvestedValue;
    // if it's the first year, just set the initial savings
    if (year === 2025) {
      investedValue = data.currentSavings;
      nonInvestedValue = data.currentSavings;
    } else {
      // Add market fluctuations based on volatility (risk level)
      const marketFluctuation = (Math.random() - 0.5) * 2 * volatility;

      investedValue =
        newChartData[newChartData.length - 1].moneyWithInvesting *
        (1 + expectedReturn + marketFluctuation) +
        data.savingsPerMonth * 12;

      // Money without investing loses value to inflation (2-3% annually)
      nonInvestedValue =
        newChartData[newChartData.length - 1].moneyWithoutInvesting *
        (1 - 0.025) +
        data.savingsPerMonth * 12;
    }

    newChartData.push({
      year,
      moneyWithInvesting: Math.trunc(investedValue),
      moneyWithoutInvesting: Math.trunc(nonInvestedValue),
    });
  }

  return newChartData;
}
