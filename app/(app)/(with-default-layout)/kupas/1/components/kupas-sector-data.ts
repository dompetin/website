import { KUPAS_DATA } from "@/lib/kupas-data";

/**
 * Kupas Sector Returns Data
 * Real historical returns from IDX sectors (2020-2025)
 * Used for sector performance charts and portfolio projections
 */

export type SectorReturnData = {
  name: string;
  returns: number[]; // Annual returns for years 2020-2025
  mean: number; // Mean return across all years
  stdDev: number; // Standard deviation
  trend: number; // Linear trend slope for last 5 years (2021-2025)
};

/**
 * Map Indonesian sector names to English names used in KUPAS_DATA
 */
const SECTOR_NAME_MAP: Record<string, string> = {
  Kesehatan: "Healthcare",
  "Bahan Dasar": "Basic Materials",
  Keuangan: "Financials",
  Teknologi: "Technology",
  Energi: "Energy",
  Properti: "Properties & Real Estate",
  "Barang Konsumsi: Siklikal": "Consumer Cyclicals",
  "Barang Konsumsi: Non-Siklikal": "Consumer Non-Cyclicals",
  Industri: "Industrials",
  "Transportasi & Logistik": "Transportation & Logistics",
  Infrastruktur: "Infrastructure",
};

/**
 * Translate Indonesian sector name to English
 */
const getEnglishSectorName = (indonesianName: string): string => {
  return SECTOR_NAME_MAP[indonesianName] || indonesianName;
};

/**
 * Calculate annual returns from weekly percentage changes
 * Compounds weekly returns to get annual return for each year/sector
 */
function calculateAnnualReturns(): Record<string, SectorReturnData> {
  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const sectors: Set<string> = new Set();

  // Collect all sector names
  KUPAS_DATA.forEach((entry) => {
    Object.keys(entry.sectors).forEach((sector) => {
      if (sector !== "Average") {
        sectors.add(sector);
      }
    });
  });

  const result: Record<string, SectorReturnData> = {};

  sectors.forEach((sector) => {
    const annualReturns: number[] = [];

    years.forEach((year) => {
      // Filter entries for the current year
      const yearEntries = KUPAS_DATA.filter((entry) => {
        const date = new Date(entry.date);
        return date.getFullYear() === year;
      });

      if (yearEntries.length === 0) {
        annualReturns.push(0);
        return;
      }

      // Compound weekly returns: (1 + r1) * (1 + r2) * ... - 1
      let compounded = 1;
      yearEntries.forEach((entry) => {
        const weeklyReturn = (entry.sectors[sector as keyof typeof entry.sectors] || 0) / 100;
        compounded *= 1 + weeklyReturn;
      });

      const annualReturn = (compounded - 1) * 100;
      annualReturns.push(parseFloat(annualReturn.toFixed(2)));
    });

    // Calculate mean
    const mean = parseFloat(
      (annualReturns.reduce((a, b) => a + b, 0) / annualReturns.length).toFixed(2)
    );

    // Calculate standard deviation
    const variance =
      annualReturns.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
      annualReturns.length;
    const stdDev = parseFloat(Math.sqrt(variance).toFixed(2));

    // Calculate linear trend from last 5 years (2021-2025, indices 1-5)
    const last5Years = annualReturns.slice(1, 6);
    const xValues = [0, 1, 2, 3, 4];
    const xMean = 2;
    const yMean = last5Years.reduce((a, b) => a + b, 0) / 5;

    const numerator = xValues.reduce(
      (sum, x, i) => sum + (x - xMean) * (last5Years[i] - yMean),
      0
    );
    const denominator = xValues.reduce((sum, x) => sum + Math.pow(x - xMean, 2), 0);
    const trend = denominator > 0 ? parseFloat((numerator / denominator).toFixed(2)) : 0;

    result[sector] = {
      name: sector,
      returns: annualReturns,
      mean,
      stdDev,
      trend,
    };
  });

  return result;
}

/**
 * Actual annual returns (%) from KUPAS_DATA calculated from weekly data
 * Years: 2020, 2021, 2022, 2023, 2024, 2025
 */
export const SECTOR_RETURNS = calculateAnnualReturns();

/**
 * Get weekly sector performance data for charting
 * Returns array of {date, value} for each sector
 * Accepts Indonesian or English sector names
 */
export const getWeeklySectorData = (sectorName: string) => {
  const englishName = getEnglishSectorName(sectorName);
  return KUPAS_DATA.map((entry) => {
    const sectorKey = englishName as keyof typeof entry.sectors;
    return {
      date: entry.date,
      value: entry.sectors[sectorKey] || 0,
    };
  });
};

/**
 * Map sector display names to their data
 * Handles Indonesian and English sector names
 */
export const getSectorReturnData = (sectorName: string): SectorReturnData => {
  const englishName = getEnglishSectorName(sectorName);

  // Try exact match with English name
  if (englishName in SECTOR_RETURNS) {
    return SECTOR_RETURNS[englishName as keyof typeof SECTOR_RETURNS];
  }

  // Fallback: return first sector if not found
  console.warn(`Sector "${sectorName}" (${englishName}) not found in SECTOR_RETURNS`);
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
  const lastYear = data.returns[5];
  return lastYear + data.trend * yearsAhead;
};
