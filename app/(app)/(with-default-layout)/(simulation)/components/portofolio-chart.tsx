"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { InvestmentSimulationResult } from "@/lib/simulate-investments";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

// ─── Chart config ─────────────────────────────────────────────────────────────

const chartConfig = {
  moneyWithInvestingMax: {
    label: "Investasi (Maksimum)",
    color: "var(--primary)",
  },
  moneyWithInvestingMin: {
    label: "Investasi (Minimum)",
    color: "var(--primary)",
  },
  moneyWithoutInvesting: {
    label: "Tanpa Investasi",
    color: "#a8a29e",
  },
} satisfies ChartConfig;

// ─── Helper ───────────────────────────────────────────────────────────────────

function formatJt(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)} M`;
  if (value >= 1_000_000)     return `${(value / 1_000_000).toFixed(1)} jt`;
  if (value >= 1_000)         return `${Math.floor(value / 1_000)} rb`;
  return String(value);
}

// ─── Summary card ─────────────────────────────────────────────────────────────

function SummaryCard({
  label,
  value,
  sub,
  valueClass = "text-primary",
}: {
  label:       string;
  value:       string;
  sub:         string;
  valueClass?: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-white px-5 py-4 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className={`text-xl font-bold leading-tight ${valueClass}`}>
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyChart() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-muted/20 py-14 text-center">
      <p className="text-sm font-semibold text-foreground">Simulasi belum berjalan</p>
      <p className="max-w-[220px] text-xs text-muted-foreground">
        Pastikan total alokasi aset tepat 100% dan isi tabungan awal di atas.
      </p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export const PortofolioChart = ({
  data,
  horizonYears,
}: {
  data:         InvestmentSimulationResult[];
  horizonYears: number;
}) => {
  const [latest, setLatest] = useState<InvestmentSimulationResult>({
    year:                  0,
    moneyWithInvestingMax: 0,
    moneyWithInvestingMin: 0,
    moneyWithoutInvesting: 0,
  });

  useEffect(() => {
    if (data.length > 0) setLatest(data[data.length - 1]);
  }, [data]);

  // Growth % vs no-invest baseline
  const firstMax  = data[0]?.moneyWithInvestingMax ?? 0;
  const growthPct = firstMax > 0
    ? Math.round(((latest.moneyWithInvestingMax - firstMax) / firstMax) * 100)
    : 0;

  const yearLabel = `Tahun ${latest.year}`;

  return (
    <div className="flex w-full flex-col gap-5">

      {/*
        ┌──────────────┬──────────────┬──────────────┬──────────────┐
        │ POTENSI      │ POTENSI      │ TANPA        │ PERTUMBUHAN  │
        │ TERTINGGI    │ TERENDAH     │ INVESTASI    │ MAKS         │
        │ Rp 120.9 jt  │ Rp 26.5 jt  │ Rp 23.0 jt  │ +11992%      │
        │ Tahun 2051   │ Tahun 2051   │ Tahun 2051   │ Dalam 25 thn │
        └──────────────┴──────────────┴──────────────┴──────────────┘
      */}
      {data.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SummaryCard
            label="Potensi Tertinggi"
            value={`Rp ${formatJt(latest.moneyWithInvestingMax)}`}
            sub={yearLabel}
            valueClass="text-primary"
          />
          <SummaryCard
            label="Potensi Terendah"
            value={`Rp ${formatJt(latest.moneyWithInvestingMin)}`}
            sub={yearLabel}
            valueClass="text-violet-400"
          />
          <SummaryCard
            label="Tanpa Investasi"
            value={`Rp ${formatJt(latest.moneyWithoutInvesting)}`}
            sub={yearLabel}
            valueClass="text-stone-500"
          />
          <SummaryCard
            label="Pertumbuhan Maks"
            value={`+${growthPct}%`}
            sub={`Dalam ${horizonYears} tahun`}
            valueClass="text-emerald-600"
          />
        </div>
      )}

      {/* Chart */}
      {data.length === 0 ? (
        <EmptyChart />
      ) : (
        <>
          <ChartContainer config={chartConfig} className="aspect-video w-full">
            <AreaChart
              data={data}
              margin={{ top: 4, right: 8, left: 4, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradMax" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.25} />

              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={true}
                tickMargin={8}
                tickFormatter={(v: number) => `'${String(v).slice(2)}`}
                className="text-[10px] text-muted-foreground"
              />

              <YAxis
                orientation="right"
                tickLine={false}
                axisLine={false}
                tickMargin={6}
                width={44}
                tickFormatter={(v: number) => formatJt(v)}
                className="text-[10px] text-muted-foreground"
              />

              <ChartTooltip
                cursor={{ stroke: "var(--primary)", strokeWidth: 1, strokeDasharray: "4 4" }}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    labelFormatter={(v) => `Tahun ke-${v}`}
                    formatter={(value, name) => [
                      `Rp ${formatJt(Number(value))}`,
                      chartConfig[name as keyof typeof chartConfig]?.label ?? name,
                    ]}
                    className="w-56 rounded-xl text-xs shadow-xl"
                  />
                }
              />

              {/* Max potential — solid purple fill */}
              <Area
                dataKey="moneyWithInvestingMax"
                type="monotone"
                fill="url(#gradMax)"
                fillOpacity={1}
                stroke="var(--color-moneyWithInvestingMax)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, fill: "var(--primary)", stroke: "#fff", strokeWidth: 2 }}
              />

              {/* Min potential — dashed line, no fill */}
              <Area
                dataKey="moneyWithInvestingMin"
                type="monotone"
                fill="none"
                stroke="var(--color-moneyWithInvestingMin)"
                strokeWidth={1.5}
                strokeDasharray="5 4"
                dot={false}
                activeDot={{ r: 3, fill: "var(--primary)", stroke: "#fff", strokeWidth: 2 }}
              />

              {/* No-invest — dashed dark line */}
              <Area
                dataKey="moneyWithoutInvesting"
                type="monotone"
                fill="none"
                stroke="var(--color-moneyWithoutInvesting)"
                strokeWidth={1.5}
                strokeDasharray="4 3"
                dot={false}
                activeDot={{ r: 3, fill: "#a8a29e", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ChartContainer>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-5 rounded-full bg-primary" />
              <span className="font-medium">Potensi tertinggi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-5 rounded-full border-t-2 border-dashed border-primary opacity-60" style={{background:"none"}} />
              <span className="font-medium">Potensi terendah</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-5 border-t-2 border-dashed border-stone-400" />
              <span className="font-medium">Tanpa investasi</span>
            </div>
          </div>

          <p className="text-center text-[10px] leading-relaxed text-muted-foreground">
            Garis ungu menunjukkan rentang kemungkinan hasil investasi (bisa naik atau turun).
            Garis abu-abu menunjukkan jika kamu hanya menabung biasa tanpa investasi.
          </p>
        </>
      )}
    </div>
  );
};

export default PortofolioChart;