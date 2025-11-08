"use client";

import { useMemo, useState } from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
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

import { SECTOR_ITEMS } from "./sectors";
import { getWeeklySectorData } from "./kupas-sector-data";

const SectorPerformance = () => {
  const [selectedSector, setSelectedSector] = useState(
    SECTOR_ITEMS[0]?.title ?? "",
  );

  const dataset = useMemo(
    () => getWeeklySectorData(selectedSector),
    [selectedSector],
  );

  const chartConfig = useMemo<ChartConfig>(() => ({
    value: {
      label: selectedSector,
      color: "var(--primary)",
    },
  }), [selectedSector]);

  return (
    <section className="flex w-full flex-col gap-6">
      <header className="flex flex-col items-center gap-4 text-center">
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
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tick={{ fontSize: 12 }}
            interval={Math.floor(dataset.length / 10) || 0}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            label={{ value: "Weekly Return (%)", angle: -90, position: "insideLeft" }}
          />
          <ChartTooltip
            cursor={{ strokeDasharray: "4 4" }}
            content={
              <ChartTooltipContent
                indicator="dot"
                hideLabel
                formatter={(value) => (
                  <div className="flex w-full justify-between gap-4">
                    <span>Weekly Return</span>
                    <span className="font-mono font-medium">{(value as number).toFixed(2)}%</span>
                  </div>
                )}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-value)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
          />
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
