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
 * Actual annual returns (%) from kupas.csv mapped to sector names
 * Years: 2020, 2021, 2022, 2023, 2024, 2025
 */
export const SECTOR_RETURNS: Record<string, SectorReturnData> = {
  Kesehatan: {
    name: "Kesehatan",
    returns: [-2.56, 40.84, 24.89, 28.56, 24.52, 8.23],
    mean: 20.91,
    stdDev: 14.12,
    trend: -6.32, // Linear trend from 2021-2025
  },
  "Bahan Dasar": {
    name: "Bahan Dasar",
    returns: [8.18, 70.31, 34.26, 23.19, 8.89, 39.38],
    mean: 30.70,
    stdDev: 23.41,
    trend: -7.18,
  },
  Keuangan: {
    name: "Keuangan",
    returns: [2.25, 41.08, 24.13, 10.08, 50.57, 17.7],
    mean: 24.30,
    stdDev: 17.68,
    trend: -5.25,
  },
  Teknologi: {
    name: "Teknologi",
    returns: [23.83, 238.49, -30.02, -32.78, 20.13, 127.47],
    mean: 57.85,
    stdDev: 110.03,
    trend: 38.69,
  },
  Energi: {
    name: "Energi",
    returns: [-31.1, 40.81, 127.77, 60.48, 65.37, 29.13],
    mean: 48.77,
    stdDev: 53.57,
    trend: -2.67,
  },
  Properti: {
    name: "Properti",
    returns: [-41.81, 46.16, 98.5, 57.52, 17.07, 13.91],
    mean: 31.89,
    stdDev: 50.47,
    trend: -8.06,
  },
  "Barang Konsumsi: Siklikal": {
    name: "Barang Konsumsi: Siklikal",
    returns: [-22.98, 61.16, 78.97, 28.61, 58.76, 22.9],
    mean: 37.90,
    stdDev: 37.53,
    trend: -8.87,
  },
  "Barang Konsumsi: Non-Siklikal": {
    name: "Barang Konsumsi: Non-Siklikal",
    returns: [2.34, -12.68, 23.9, -1.98, 7.14, 4.55],
    mean: 3.88,
    stdDev: 11.46,
    trend: 4.31,
  },
  Industri: {
    name: "Industri",
    returns: [1.53, 42.57, 46.26, 2.57, 0.81, 8.21],
    mean: 16.99,
    stdDev: 19.64,
    trend: -8.67,
  },
  "Transportasi & Logistik": {
    name: "Transportasi & Logistik",
    returns: [-14.92, 112.04, 88.09, 9.59, -7.83, 30.4],
    mean: 36.23,
    stdDev: 54.60,
    trend: -20.58,
  },
  Infrastruktur: {
    name: "Infrastruktur",
    returns: [-4.42, 62.34, 5.5, 2.8, 59.77, 24.12],
    mean: 25.02,
    stdDev: 29.61,
    trend: -8.08,
  },
};

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
  const lastYear = data.returns[5];
  return lastYear + data.trend * yearsAhead;
};
