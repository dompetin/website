"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupMaskInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InvestmentSimulationResult } from "@/lib/simulate-investments";
import { formatCurrency } from "@/lib/utils";
import { Area, AreaChart, XAxis, YAxis } from "recharts";

import { SECTOR_ITEMS } from "./sectors";
import { getSectorReturnRange } from "./kupas-sector-data";

type SectorDatasetMap = Record<string, InvestmentSimulationResult[]>;

const chartConfig = {
  moneyWithInvestingMax: {
    label: "With Investing Max",
    color: "var(--primary)",
  },
  moneyWithInvestingMin: {
    label: "With Investing Min",
    color: "var(--primary)",
  },
  moneyWithoutInvesting: {
    label: "Without Investing",
    color: "var(--black)",
  },
} satisfies ChartConfig;

const YEARS = [1, 2, 3, 4, 5] as const;
const NON_INVEST_LOSS_RATE = 0.025;

const projectSectorReturns = (
  currentSavings: number,
  savingsPerMonth: number,
  sectorName: string,
): InvestmentSimulationResult[] => {
  if (!currentSavings && !savingsPerMonth) {
    return [];
  }

  const maxYear = YEARS[YEARS.length - 1];
  const targets = new Set<number>(YEARS);

  // Get real min/max rates from sector data (mean ± stdDev)
  const { min: minRate, max: maxRate } = getSectorReturnRange(sectorName);

  // Convert annual rates to decimal (e.g., 25% -> 0.25)
  const minAnnualRate = minRate / 100;
  const maxAnnualRate = maxRate / 100;

  let minBalance = currentSavings;
  let maxBalance = currentSavings;
  let savingsBalance = currentSavings;

  const results: InvestmentSimulationResult[] = [];

  for (let year = 1; year <= maxYear; year++) {
    for (let month = 1; month <= 12; month++) {
      minBalance = minBalance * (1 + minAnnualRate / 12) + savingsPerMonth;
      maxBalance = maxBalance * (1 + maxAnnualRate / 12) + savingsPerMonth;
      savingsBalance =
        savingsBalance * (1 - NON_INVEST_LOSS_RATE / 12) + savingsPerMonth;
    }

    if (targets.has(year)) {
      results.push({
        year,
        moneyWithInvestingMin: Math.round(minBalance),
        moneyWithInvestingMax: Math.round(maxBalance),
        moneyWithoutInvesting: Math.round(savingsBalance),
      });
    }
  }

  return results;
};

const buildSectorDatasets = (
  currentSavings: number,
  savingsPerMonth: number,
): SectorDatasetMap => {
  if (Number.isNaN(currentSavings) || Number.isNaN(savingsPerMonth)) {
    return {};
  }

  return SECTOR_ITEMS.reduce<SectorDatasetMap>((acc, sector) => {
    acc[sector.title] = projectSectorReturns(
      currentSavings,
      savingsPerMonth,
      sector.title,
    );
    return acc;
  }, {});
};

const EMPTY_POINT: InvestmentSimulationResult = {
  year: 0,
  moneyWithInvestingMax: 0,
  moneyWithInvestingMin: 0,
  moneyWithoutInvesting: 0,
};

const KupasPortofolioChart = () => {
  const [formData, setFormData] = useState({
    currentSavings: "1500000",
    savingsPerMonth: "100000",
  });
  const [selectedSector, setSelectedSector] = useState(
    SECTOR_ITEMS[0]?.title ?? "",
  );

  const numericCurrentSavings = useMemo(
    () => Number(formData.currentSavings || 0),
    [formData.currentSavings],
  );
  const numericSavingsPerMonth = useMemo(
    () => Number(formData.savingsPerMonth || 0),
    [formData.savingsPerMonth],
  );

  const sectorDatasets = useMemo(
    () => buildSectorDatasets(numericCurrentSavings, numericSavingsPerMonth),
    [numericCurrentSavings, numericSavingsPerMonth],
  );

  const activeDataset = useMemo(() => {
    const fallback = sectorDatasets[SECTOR_ITEMS[0]?.title ?? ""] ?? [];
    return sectorDatasets[selectedSector]?.length
      ? sectorDatasets[selectedSector]
      : fallback;
  }, [sectorDatasets, selectedSector]);

  const latestDataPoint = useMemo(() => {
    if (!activeDataset.length) {
      return EMPTY_POINT;
    }

    return activeDataset[activeDataset.length - 1];
  }, [activeDataset]);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-balance sm:text-4xl">
          Berapa yang bisa aku dompetin kalau...
        </h2>

        <FieldGroup className="flex flex-col gap-3 md:flex-row md:items-end">
          <Field className="flex-1">
            <FieldLabel>Tabunganku isinya</FieldLabel>
            <FieldContent>
              <InputGroup>
                <InputGroupMaskInput
                  name="kupas_current_savings"
                  mask="currency"
                  currency="IDR"
                  locale="id-ID"
                  value={formData.currentSavings}
                  placeholder="Rp 150.000.000"
                  autoComplete="off"
                  onValueChange={(_, value) =>
                    setFormData((prev) => ({
                      ...prev,
                      currentSavings: value,
                    }))
                  }
                />
                <InputGroupAddon align="inline-end">IDR</InputGroupAddon>
              </InputGroup>
            </FieldContent>
          </Field>

          <Field className="flex-1">
            <FieldLabel>Mau nabung per bulan</FieldLabel>
            <FieldContent>
              <InputGroup>
                <InputGroupMaskInput
                  name="kupas_savings_per_month"
                  mask="currency"
                  currency="IDR"
                  locale="id-ID"
                  value={formData.savingsPerMonth}
                  placeholder="Rp 2.500.000"
                  autoComplete="off"
                  onValueChange={(_, value) =>
                    setFormData((prev) => ({
                      ...prev,
                      savingsPerMonth: value,
                    }))
                  }
                />
                <InputGroupAddon align="inline-end">IDR</InputGroupAddon>
              </InputGroup>
            </FieldContent>
          </Field>

          <Field className="md:w-60">
            <FieldLabel>Sektor</FieldLabel>
            <FieldContent>
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="w-full bg-white shadow-lg">
                  <SelectValue placeholder="Pilih sektor" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  {SECTOR_ITEMS.map((sector) => (
                    <SelectItem key={sector.title} value={sector.title}>
                      {sector.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>
        </FieldGroup>
      </div>

      <div className="flex flex-col items-center gap-4 *:data-[slot=card]:bg-neutral-50 *:data-[slot=card]:shadow-lg">
        <p>
          Uang yang kamu dompetin selama{" "}
          <span className="font-semibold">5 tahun </span>
        </p>
        <Card className="w-full max-w-md text-center shadow-lg">
          <CardContent className="">
            <p>Jika diinvestasikan jadi</p>
            <p className="text-primary text-lg font-bold">
              Rp {(latestDataPoint.moneyWithInvestingMin / 10 ** 6).toFixed(1)}{" "}
              -{(latestDataPoint.moneyWithInvestingMax / 10 ** 6).toFixed(1)} jt
            </p>
          </CardContent>
        </Card>

        <ChartContainer config={chartConfig} className="aspect-video w-full">
          <AreaChart
            accessibilityLayer
            data={activeDataset}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <XAxis
              dataKey="year"
              tickFormatter={(value) => `${value} tahun`}
              tickLine={false}
              axisLine={false}
              tickMargin={2}
            />
            <YAxis
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={2}
              tickFormatter={(value) =>
                `${formatCurrency(value / 10 ** 6, "decimal")} jt`
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="moneyWithInvestingMax"
              type="natural"
              fill="var(--color-primary)"
              fillOpacity={0.4}
              stroke="var(--color-primary)"
            />
            <Area
              dataKey="moneyWithInvestingMin"
              type="natural"
              fill="var(--color-white)"
              fillOpacity={1}
              stroke="var(--color-primary)"
            />
            <Area
              dataKey="moneyWithoutInvesting"
              type="natural"
              fill="var(--color-white)"
              fillOpacity={1}
              stroke="var(--color-black)"
            />
          </AreaChart>
        </ChartContainer>
      </div>

      <p className="text-muted-foreground text-center text-xs">
        Simulasi dibuat berdasarkan kinerja masa lalu dan tidak menjamin kinerja
        masa depan.
      </p>
    </div>
  );
};

export default KupasPortofolioChart;
