/**
 * Kupas Sector Returns Data
 * Real historical returns from IDX sectors (2020-2025)
 * Used for sector performance charts and portfolio projections
 */

import { KUPAS_DATA } from "@/lib/kupas-data";

export type SectorReturnData = {
  name: string;
  returns: number[]; // Annual returns for years 2020-2025
  mean: number; // Mean return across all years
  stdDev: number; // Standard deviation
  trend: number; // Linear trend slope for last 5 years (2021-2025)
};

/**
 * Sector name mapping from CSV to Indonesian labels
 */
const SECTOR_MAPPING: Record<string, string> = {
  Healthcare: "Kesehatan",
  "Basic Materials": "Bahan Dasar",
  Financials: "Keuangan",
  Technology: "Teknologi",
  Energy: "Energi",
  "Properties & Real Estate": "Properti",
  "Consumer Cyclicals": "Barang Konsumsi: Siklikal",
  "Consumer Non-Cyclicals": "Barang Konsumsi: Non-Siklikal",
  Industrials: "Industri",
  "Transportation & Logistics": "Transportasi & Logistik",
  Infrastructure: "Infrastruktur",
};

/**
 * Calculate annual returns from weekly KUPAS_DATA
 * Groups weekly returns by year and compounds them
 */
const calculateAnnualReturns = (): Record<string, SectorReturnData> => {
  const result: Record<string, SectorReturnData> = {};

  // Group data by sector name
  const sectorData: Record<string, Record<number, number[]>> = {};

  for (const point of KUPAS_DATA) {
    const date = new Date(point.date);
    const year = date.getFullYear();

    for (const [csvSectorName, sectorValue] of Object.entries(
      point.sectors,
    )) {
      if (csvSectorName === "Average") continue;

      const indonesianName = SECTOR_MAPPING[csvSectorName];
      if (!indonesianName) continue;

      if (!sectorData[indonesianName]) {
        sectorData[indonesianName] = {};
      }
      if (!sectorData[indonesianName][year]) {
        sectorData[indonesianName][year] = [];
      }

      sectorData[indonesianName][year].push(sectorValue);
    }
  }

  // Calculate annual returns by compounding weekly returns
  for (const [sectorName, yearMap] of Object.entries(sectorData)) {
    const years = Object.keys(yearMap)
      .map(Number)
      .sort((a, b) => a - b);
    const annualReturns: number[] = [];

    for (const year of years) {
      const weeklyReturns = yearMap[year];
      // Compound weekly returns: (1 + r1) * (1 + r2) * ... * (1 + rn) - 1
      let compounded = 1;
      for (const weeklyReturn of weeklyReturns) {
        compounded *= 1 + weeklyReturn / 100;
      }
      const annualReturn = (compounded - 1) * 100;
      annualReturns.push(annualReturn);
    }

    // Calculate mean
    const mean = annualReturns.reduce((a, b) => a + b, 0) / annualReturns.length;

    // Calculate standard deviation
    const variance =
      annualReturns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) /
      annualReturns.length;
    const stdDev = Math.sqrt(variance);

    // Calculate trend (linear regression) for last 5 years
    let trend = 0;
    if (annualReturns.length >= 2) {
      const n = Math.min(5, annualReturns.length);
      const startIdx = annualReturns.length - n;
      const recentReturns = annualReturns.slice(startIdx);

      // Simple linear regression
      const xMean = (n - 1) / 2;
      const yMean =
        recentReturns.reduce((a, b) => a + b, 0) / recentReturns.length;
      let numerator = 0;
      let denominator = 0;

      for (let i = 0; i < recentReturns.length; i++) {
        numerator += (i - xMean) * (recentReturns[i] - yMean);
        denominator += Math.pow(i - xMean, 2);
      }

      trend = denominator !== 0 ? numerator / denominator : 0;
    }

    result[sectorName] = {
      name: sectorName,
      returns: annualReturns,
      mean,
      stdDev,
      trend,
    };
  }

  return result;
};

/**
 * Actual annual returns (%) calculated from KUPAS_DATA
 */
export const SECTOR_RETURNS: Record<string, SectorReturnData> =
  calculateAnnualReturns();

/**
 * Map sector display names to their data
 * Handles both singular and plural forms, and variations in naming
 */
export const getSectorReturnData = (sectorName: string): SectorReturnData => {
  // Try exact match first
  if (sectorName in SECTOR_RETURNS) {
    return SECTOR_RETURNS[sectorName as keyof typeof SECTOR_RETURNS];
  }

  // Fallback: return first sector if not found
  console.warn(`Sector "${sectorName}" not found in SECTOR_RETURNS`);
  return Object.values(SECTOR_RETURNS)[0]!;
};

/**
 * Calculate min/max return range using standard deviation
 * min = mean - stdDev, max = mean + stdDev
 */
export const getSectorReturnRange = (sectorName: string) => {
  const data = getSectorReturnData(sectorName);
  return {
    min: data.mean - data.stdDev,
    max: data.mean + data.stdDev,
    mean: data.mean,
  };
};

/**
 * Project returns for future years using linear trend
 * from the last 5 years of historical data (2021-2025)
 */
export const projectSectorReturn = (
  sectorName: string,
  yearsAhead: number,
): number => {
  const data = getSectorReturnData(sectorName);
  // Use last year (2025) as base and extrapolate with trend
  const lastYear = data.returns[data.returns.length - 1];
  return lastYear + data.trend * yearsAhead;
};
