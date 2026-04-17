"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { InvestmentSimulationResult } from "@/lib/simulate-investments";

// Config warna ungu yang konsisten dengan tema
const chartConfig = {
  moneyWithInvestingMax: {
    label: "Potensi Maksimal",
    color: "#a855f7",
  },
  moneyWithInvestingMin: {
    label: "Potensi Minimal",
    color: "#e9d5ff",
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

  // Formatter untuk angka di kartu (Contoh: 1.250,5 jt)
  const formatToMillion = (val: number) => {
    return (val / 10 ** 6).toLocaleString("id-ID", {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    });
  };

  // Formatter untuk Axis (Contoh: 10jt, 1M)
  const formatAxis = (val: number) => {
    if (val >= 10 ** 9) return `${(val / 10 ** 9).toFixed(1)}M`;
    return `${val / 10 ** 6}jt`;
  };

  if (!latestDataPoint) return null;

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em]">
          Estimasi Saldo Akhir Setelah <span className="text-purple-600 underline underline-offset-4">{horizonYears} Tahun</span>
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {/* Card: Dengan Investasi */}
          <Card className="border-purple-100 bg-purple-50/30 shadow-none transition-all hover:bg-purple-50/50">
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-2 text-[10px] font-bold tracking-widest">HASIL INVESTASI</p>
              <div className="flex items-baseline gap-1 text-purple-700">
                <span className="text-sm font-bold">Rp</span>
                <span className="text-3xl font-black tracking-tight">
                  {formatToMillion(latestDataPoint.moneyWithInvestingMin)} - {formatToMillion(latestDataPoint.moneyWithInvestingMax)}
                </span>
                <span className="text-sm font-bold">jt</span>
              </div>
            </CardContent>
          </Card>

          {/* Card: Tanpa Investasi */}
          <Card className="border-muted bg-neutral-50 shadow-none transition-all hover:bg-neutral-100">
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-2 text-[10px] font-bold tracking-widest">TABUNGAN BIASA</p>
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
        {/* ResponsiveContainer memastikan chart mengisi ruang yang tersedia */}
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorInvest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.5} />
          
          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tickFormatter={(value) => `Thn ${value}`}
            className="text-[10px] font-bold text-muted-foreground"
          />
          
          <YAxis
            orientation="right"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tickFormatter={formatAxis}
            className="text-[10px] font-bold text-muted-foreground"
          />

          <ChartTooltip
            cursor={{ stroke: "#a855f7", strokeWidth: 1, strokeDasharray: "4 4" }}
            content={
              <ChartTooltipContent 
                indicator="dot" 
                labelFormatter={(value) => `Tahun ke-${value}`}
                className="w-64 rounded-2xl border-purple-100 shadow-xl"
              />
            }
          />

          {/* Area Maksimal (Area Utama) */}
          <Area
            dataKey="moneyWithInvestingMax"
            type="monotone"
            stroke="#a855f7"
            strokeWidth={3}
            fill="url(#colorInvest)" 
            isAnimationActive={false} // Dimatikan agar transisi antar input terasa instan dan snappy
          />
          
          {/* Area Minimal (Hanya garis putus-putus) */}
          <Area
            dataKey="moneyWithInvestingMin"
            type="monotone"
            stroke="#a855f7"
            strokeWidth={1.5}
            strokeDasharray="6 6"
            fill="transparent"
            isAnimationActive={false}
          />

          {/* Garis Tabungan Biasa */}
          <Area
            dataKey="moneyWithoutInvesting"
            type="monotone"
            stroke="#000000"
            strokeWidth={2}
            strokeDasharray="4 4"
            fill="none"
            isAnimationActive={false}
          />
        </AreaChart>
      </ChartContainer>
      
      {/* Legend Custom */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-1 w-6 rounded-full bg-purple-500" />
          <span>Potensi Investasi</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-6 border-t-2 border-dashed border-black" />
          <span>Tabungan Tanpa Bunga</span>
        </div>
      </div>
    </div>
  );
};

export default PortofolioChart;