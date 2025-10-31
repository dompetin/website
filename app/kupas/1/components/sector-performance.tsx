"use client";

import { useMemo, useState } from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";

import { SECTOR_ITEMS } from "./sectors";
import { getSectorReturnRange, projectSectorReturn } from "./kupas-sector-data";

const YEARS = [1, 2, 3, 4, 5] as const;
const LINE_COLORS = [
  "oklch(60% 0.22 315)",
  "oklch(70% 0.13 312)",
  "oklch(65% 0.17 305)",
  "oklch(75% 0.11 318)",
] as const;

type SectorPoint = {
  year: number;
  label: string;
  stock0: number;
  stock1: number;
  stock2: number;
  stock3: number;
};

/**
 * Generate dataset for sector chart using real sector returns
 * Individual stock values vary around sector mean (±10-30% variation)
 */
const getSectorDataset = (sectorName: string): SectorPoint[] => {
  const { min, max, mean } = getSectorReturnRange(sectorName);

  return YEARS.map((year) => {
    // Project sector return for this year
    const yearsSinceStart = year; // Assume we're projecting from 2025
    const sectorReturn = projectSectorReturn(sectorName, yearsSinceStart - 1);

    // Base value: 100 (index baseline)
    // Compound growth: (1 + return/100)^years
    const compoundFactor = Math.pow(1 + sectorReturn / 100, year);
    const baseMoney = 100 * compoundFactor;

    // Create 4 stock variations around the sector performance
    // Stock 0: perform slightly below mean
    const stock0 = baseMoney * (1 - (mean - sectorReturn) / 100 * 0.5);
    // Stock 1: outperformer (mean + 15% of stdDev)
    const stock1 = baseMoney * (1 + (max - sectorReturn) / 100 * 0.4);
    // Stock 2: underperformer (mean - 20% of stdDev)
    const stock2 = baseMoney * (1 - (sectorReturn - min) / 100 * 0.4);
    // Stock 3: close to mean performance
    const stock3 = baseMoney * (1 + (sectorReturn - min) / 100 * 0.3);

    return {
      year,
      label: `${year} tahun`,
      stock0: Math.round(stock0 * 10) / 10,
      stock1: Math.round(stock1 * 10) / 10,
      stock2: Math.round(stock2 * 10) / 10,
      stock3: Math.round(stock3 * 10) / 10,
    };
  });
};

const SectorPerformance = () => {
  const [selectedSector, setSelectedSector] = useState(
    SECTOR_ITEMS[0]?.title ?? "",
  );

  const activeSectorIndex = useMemo(
    () => SECTOR_ITEMS.findIndex((item) => item.title === selectedSector),
    [selectedSector],
  );

  const activeSector = useMemo(
    () =>
      activeSectorIndex >= 0
        ? SECTOR_ITEMS[activeSectorIndex]
        : SECTOR_ITEMS[0],
    [activeSectorIndex],
  );

  const stocks = useMemo(
    () => activeSector.topStocks.slice(0, 4),
    [activeSector],
  );

  const dataset = useMemo(
    () => getSectorDataset(selectedSector),
    [selectedSector],
  );

  const chartConfig = useMemo<ChartConfig>(() => {
    const config: ChartConfig = {};

    stocks.forEach((stock, index) => {
      config[`stock${index}`] = {
        label: stock,
        color: LINE_COLORS[index % LINE_COLORS.length],
      };
    });

    return config;
  }, [stocks]);

  const lineKeys = useMemo(
    () => stocks.map((_, index) => `stock${index}` as const),
    [stocks],
  );

  return (
    <section className="flex w-full flex-col gap-6">
      <header className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold text-balance sm:text-4xl">
          Yuk cek performa saham berdasarkan sektor
        </h2>

        <Select value={selectedSector} onValueChange={setSelectedSector}>
          <SelectTrigger className="bg-white shadow-lg">
            <SelectValue placeholder="Pilih sektor" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl">
            {SECTOR_ITEMS.map((item) => (
              <SelectItem key={item.title} value={item.title}>
                {item.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </header>

      <ChartContainer config={chartConfig} className="w-full">
        <LineChart
          data={dataset}
          margin={{ top: 12, right: 24, left: 0, bottom: 12 }}
        >
          <CartesianGrid />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tickFormatter={(value: number) => `${value} jt`}
          />
          <ChartTooltip
            cursor={{ strokeDasharray: "4 4" }}
            content={
              <ChartTooltipContent
                indicator="dot"
                hideLabel
                formatter={(value, name) => (
                  <div className="flex w-full justify-between gap-4">
                    <span>{name}</span>
                    <span className="font-mono font-medium">
                      {formatCurrency((value as number) * 1_000_000)}
                    </span>
                  </div>
                )}
              />
            }
          />
          <ChartLegend
            verticalAlign="top"
            align="center"
            iconType="circle"
            content={<ChartLegendContent className="pt-0" />}
          />
          {lineKeys.map((key) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={`var(--color-${key})`}
              strokeWidth={2.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              strokeOpacity={0.95}
            />
          ))}
        </LineChart>
      </ChartContainer>

      <p className="text-muted-foreground text-center text-sm">
        Simulasi dibuat berdasarkan kinerja masa lalu dan tidak menjamin kinerja
        masa depan.
      </p>
    </section>
  );
};

export default SectorPerformance;
