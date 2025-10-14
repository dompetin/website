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

export function simulateInvestments(
  data: InvestmentSimulationParams,
): InvestmentSimulationResult[] {
  const newChartData: InvestmentSimulationResult[] = [];

  // generate new data (dummy data for now)
  for (let year = 2025; year <= 2030; year++) {
    let investedValue, nonInvestedValue;
    if (year === 2025) {
      investedValue = data.currentSavings;
      nonInvestedValue = data.currentSavings;
    } else {
      // add a natural error rate to simulate market fluctuations
      investedValue =
        newChartData[newChartData.length - 1].moneyWithInvesting *
        (1.07 + Math.random() * 0.02) +
        data.savingsPerMonth * 12;
      nonInvestedValue =
        newChartData[newChartData.length - 1].moneyWithoutInvesting *
        (0.95 + Math.random() * 0.05) +
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
