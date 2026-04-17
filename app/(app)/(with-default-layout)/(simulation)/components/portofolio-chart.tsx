"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { InvestmentSimulationResult } from "@/lib/simulate-investments";

// Mengembalikan warna UNGU ke Config
const chartConfig = {
  moneyWithInvestingMax: {
    label: "Potensi Maksimal",
    color: "#a855f7", // Warna ungu primary
  },
  moneyWithInvestingMin: {
    label: "Potensi Minimal",
    color: "#e9d5ff", // Warna ungu muda
  },
  moneyWithoutInvesting: {
    label: "Tabungan Biasa",
    color: "#000000",
  },
} satisfies ChartConfig;

const PortofolioChart = ({
  data,
  horizonYears,
}: {
  data: InvestmentSimulationResult[];
  horizonYears: number;
}) => {
  const [latestDataPoint, setLatestDataPoint] = useState<InvestmentSimulationResult | null>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setLatestDataPoint(data[data.length - 1]);
    }
  }, [data]);

  const formatToMillion = (val: number) => {
    return (val / 10 ** 6).toLocaleString("id-ID", {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    });
  };

  if (!latestDataPoint) return null;

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
          Estimasi Saldo Akhir Setelah <span className="text-foreground font-bold">{horizonYears} Tahun</span>
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {/* Kartu Hasil Investasi Tetap UNGU */}
          <Card className="border-purple-100 bg-purple-50/50 shadow-sm transition-all hover:shadow-md">
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-1 text-xs font-semibold">DENGAN INVESTASI</p>
              <div className="flex items-baseline gap-1 text-purple-700">
                <span className="text-sm font-bold">Rp</span>
                <span className="text-3xl font-black tracking-tight">
                  {formatToMillion(latestDataPoint.moneyWithInvestingMin)} - {formatToMillion(latestDataPoint.moneyWithInvestingMax)}
                </span>
                <span className="text-sm font-bold">jt</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-muted bg-neutral-50 shadow-sm transition-all hover:shadow-md">
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-1 text-xs font-semibold">TABUNGAN BIASA</p>
              <div className="flex items-baseline gap-1 text-neutral-900">
                <span className="text-sm font-bold">Rp</span>
                <span className="text-3xl font-black tracking-tight">
                  {formatToMillion(latestDataPoint.moneyWithoutInvesting)}
                </span>
                <span className="text-sm font-bold">jt</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="aspect-[2/1] w-full lg:aspect-[3/1]">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          {/* Mengembalikan Definisi Gradien UNGU */}
          <defs>
            <linearGradient id="colorInvest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
          
          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => `Thn ${value}`}
            className="text-[10px] font-medium text-muted-foreground"
          />
          
          <YAxis
            orientation="right"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => `Rp ${value / 10 ** 6}jt`}
            className="text-[10px] font-medium text-muted-foreground"
          />

          <ChartTooltip
            cursor={{ stroke: "#a855f7", strokeWidth: 1, strokeDasharray: "4 4" }}
            content={
              <ChartTooltipContent 
                indicator="line" 
                labelFormatter={(value) => `Tahun ke-${value}`}
                className="w-56"
              />
            }
          />

          {/* Area Grafik menggunakan Gradien UNGU */}
          <Area
            dataKey="moneyWithInvestingMax"
            type="monotone"
            stroke="#a855f7"
            strokeWidth={2}
            fill="url(#colorInvest)" 
            stackId="1"
            isAnimationActive={true}
          />
          
          <Area
            dataKey="moneyWithInvestingMin"
            type="monotone"
            stroke="#a855f7"
            strokeWidth={1}
            strokeDasharray="4 4"
            fill="transparent"
            stackId="2"
          />

          <Area
            dataKey="moneyWithoutInvesting"
            type="monotone"
            stroke="#000000"
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="none"
          />
        </AreaChart>
      </ChartContainer>
      
      <div className="flex gap-6 text-xs text-muted-foreground p-4 bg-gray-50 rounded-full border">
        <div className="flex items-center gap-1.5">
          <div className="h-0.5 w-4 bg-purple-500" />
          <span>Estimasi Investasi (Min - Max)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-0.5 w-4 border-t-2 border-dashed border-black" />
          <span>Tabungan Tanpa Bunga</span>
        </div>
      </div>
    </div>
  );
};

export default PortofolioChart;