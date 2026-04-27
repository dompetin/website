export interface InvestmentSimulationParams {
  currentSavings: number;
  savingsPerMonth: number;
  product: "stocks" | "mutual_fund" | "gold" | "deposit" | "obligation";
  horizonYears: number;
}

export interface InvestmentSimulationResult {
  year: number;
  moneyWithInvestingMax: number;
  moneyWithInvestingMin: number;
  moneyWithoutInvesting: number;
}

// ─── Historical annual return ranges (per product) ────────────────────────────
// Based on Indonesian market averages. min = pessimistic, max = optimistic.
const PRODUCT_RETURNS: Record<
  InvestmentSimulationParams["product"],
  { min: number; max: number }
> = {
  deposit:     { min: 0.03,  max: 0.045 }, // Deposito: 3–4.5% p.a.
  obligation:  { min: 0.055, max: 0.07  }, // SBN/Obligasi: 5.5–7% p.a.
  gold:        { min: 0.08,  max: 0.12  }, // Emas: 8–12% p.a. long-term
  mutual_fund: { min: 0.04,  max: 0.10  }, // Reksa Dana Campuran: 4–10% p.a.
  stocks:      { min: -0.05, max: 0.18  }, // Saham: volatil, –5 to +18% p.a.
};

// Assumed annual purchasing-power erosion for plain savings (no investment).
// Approximates Indonesian inflation + bank admin fees (~2.5% net drag).
const SAVINGS_DRAG = 0.025;

// ─── Simulation ───────────────────────────────────────────────────────────────

export function simulateInvestments(
  params: InvestmentSimulationParams,
): InvestmentSimulationResult[] {
  const { currentSavings, savingsPerMonth, product, horizonYears } = params;

  // Guard against bad inputs — callers may pass raw form strings
  const safeSavings  = Math.max(0, Number(currentSavings)  || 0);
  const safeMonthly  = Math.max(0, Number(savingsPerMonth) || 0);
  const safeHorizon  = Math.max(1, Math.round(Number(horizonYears) || 1));

  const { min: minRate, max: maxRate } = PRODUCT_RETURNS[product];
  const yearlyContribution = safeMonthly * 12;

  const startYear = new Date().getFullYear();

  let balanceMin  = safeSavings;
  let balanceMax  = safeSavings;
  let balanceCash = safeSavings;

  const results: InvestmentSimulationResult[] = [
    {
      year: startYear,
      moneyWithInvestingMax: Math.trunc(balanceMax),
      moneyWithInvestingMin: Math.trunc(balanceMin),
      moneyWithoutInvesting: Math.trunc(balanceCash),
    },
  ];

  for (let i = 1; i <= safeHorizon; i++) {
    // Pro-rata model: principal grows for a full year; contributions are
    // assumed to arrive evenly throughout the year, so they earn half a
    // year of returns on average.
    balanceMin  = balanceMin  * (1 + minRate) + yearlyContribution * (1 + minRate  / 2);
    balanceMax  = balanceMax  * (1 + maxRate) + yearlyContribution * (1 + maxRate  / 2);

    // Plain savings: contributions arrive but real value erodes by SAVINGS_DRAG
    balanceCash = balanceCash * (1 - SAVINGS_DRAG) + yearlyContribution;

    results.push({
      year: startYear + i,
      moneyWithInvestingMax: Math.trunc(balanceMax),
      moneyWithInvestingMin: Math.trunc(balanceMin),
      moneyWithoutInvesting: Math.trunc(balanceCash),
    });
  }

  return results;
}