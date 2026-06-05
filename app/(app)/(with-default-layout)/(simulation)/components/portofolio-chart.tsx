"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { InvestmentSimulationResult } from "@/lib/simulate-investments";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

// ─── Chart config ─────────────────────────────────────────────────────────────

const chartConfig = {
  moneyWithInvestingMax: { label: "Investasi (Maksimum)", color: "var(--primary)" },
  moneyWithInvestingMin: { label: "Investasi (Minimum)",  color: "var(--primary)" },
  moneyWithoutInvesting: { label: "Tanpa Investasi",      color: "#a8a29e"        },
} satisfies ChartConfig;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Format a rupiah amount for the Y-axis and summary cards.
 * Rules:
 *  - Always returns a single unbreakable token (no space between number and unit)
 *  - Rounds to nearest 100k before dividing so 153_800_000 → "153.8 jt" not "153.8 jt"
 *  - Integer values show no decimal: 120_000_000 → "120 jt"
 *  - ≥ 1 M (miliar): "1.5 M"
 *  - < 1 jt: falls through to "rb"
 */
function formatJt(value: number): string {
  if (value >= 1_000_000_000) {
    const n = value / 1_000_000_000;
    return `${Number.isInteger(n) ? n : n.toFixed(1)}\u00a0M`;
  }
  if (value >= 1_000_000) {
    // Round to nearest 100k to avoid "153.85 jt" → "153.9 jt" surprises
    const n = Math.round(value / 100_000) / 10;
    return `${Number.isInteger(n) ? n : n.toFixed(1)}\u00a0jt`;
  }
  if (value >= 1_000) {
    return `${Math.floor(value / 1_000)}\u00a0rb`;
  }
  return String(value);
}

// ─── SummaryCard ──────────────────────────────────────────────────────────────
//
// Key fix: `whitespace-nowrap` on the value prevents "Rp 154" and "jt" from
// wrapping onto separate lines when the card is narrow.
// `text-lg` instead of `text-xl` keeps long values fitting in a 2-column grid.

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
    <div className="flex flex-col gap-1.5 rounded-2xl bg-white px-4 py-3 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-tight">
        {label}
      </p>
      {/* whitespace-nowrap + overflow-hidden prevents the value wrapping */}
      <p className={`text-lg font-bold leading-tight whitespace-nowrap overflow-hidden text-ellipsis ${valueClass}`}>
        {value}
      </p>
      <p className="text-[11px] text-muted-foreground">{sub}</p>
    </div>
  );
}

// ─── EmptyChart ───────────────────────────────────────────────────────────────

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

// ─── PortofolioChart ──────────────────────────────────────────────────────────

export const PortofolioChart = ({
  data,
  horizonYears,
}: {
  data:         InvestmentSimulationResult[];
  horizonYears: number;
}) => {
  const [latest, setLatest] = useState<InvestmentSimulationResult>({
    year: 0, moneyWithInvestingMax: 0, moneyWithInvestingMin: 0, moneyWithoutInvesting: 0,
  });

  useEffect(() => {
    if (data.length > 0) setLatest(data[data.length - 1]);
  }, [data]);

  const firstMax  = data[0]?.moneyWithInvestingMax ?? 0;
  const growthPct = firstMax > 0
    ? Math.round(((latest.moneyWithInvestingMax - firstMax) / firstMax) * 100)
    : 0;
  const yearLabel = `Tahun ${latest.year}`;

  return (
    <div className="flex w-full flex-col gap-5">

      {/* ── Summary cards ── */}
      {data.length > 0 && (
        <div
          className="grid grid-cols-2 gap-2 sm:grid-cols-4"
          aria-label={`Ringkasan proyeksi: tertinggi ${formatJt(latest.moneyWithInvestingMax)}, terendah ${formatJt(latest.moneyWithInvestingMin)}, tanpa investasi ${formatJt(latest.moneyWithoutInvesting)}, pertumbuhan +${growthPct}%`}
        >
          <SummaryCard
            label="Potensi Tertinggi"
            value={`Rp\u00a0${formatJt(latest.moneyWithInvestingMax)}`}
            sub={yearLabel}
            valueClass="text-primary"
          />
          <SummaryCard
            label="Potensi Terendah"
            value={`Rp\u00a0${formatJt(latest.moneyWithInvestingMin)}`}
            sub={yearLabel}
            valueClass="text-violet-400"
          />
          <SummaryCard
            label="Tanpa Investasi"
            value={`Rp\u00a0${formatJt(latest.moneyWithoutInvesting)}`}
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

      {/* ── Chart ── */}
      {data.length === 0 ? (
        <EmptyChart />
      ) : (
        <>
          <ChartContainer
            config={chartConfig}
            className="aspect-video w-full"
            role="img"
            aria-label={`Grafik proyeksi investasi ${horizonYears} tahun. Potensi tertinggi: Rp ${formatJt(latest.moneyWithInvestingMax)}, terendah: Rp ${formatJt(latest.moneyWithInvestingMin)}, tanpa investasi: Rp ${formatJt(latest.moneyWithoutInvesting)}.`}
          >
            <AreaChart data={data} margin={{ top: 4, right: 8, left: 4, bottom: 0 }}>
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
                width={48}
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
                      `Rp\u00a0${formatJt(Number(value))}`,
                      chartConfig[name as keyof typeof chartConfig]?.label ?? name,
                    ]}
                    className="w-56 rounded-xl text-xs shadow-xl"
                  />
                }
              />

              {/* Max — solid line with gradient fill */}
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

              {/* Min — dashed, no fill */}
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

              {/* No-invest — dashed grey */}
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

          {/* Screen-reader text summary */}
          <p className="sr-only" aria-live="polite">
            Proyeksi investasi dalam {horizonYears} tahun:
            potensi tertinggi Rp {formatJt(latest.moneyWithInvestingMax)},
            potensi terendah Rp {formatJt(latest.moneyWithInvestingMin)},
            tanpa investasi Rp {formatJt(latest.moneyWithoutInvesting)}.
          </p>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-5 rounded-full bg-primary" />
              <span className="font-medium">Potensi tertinggi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-5" style={{ borderTop: "2px dashed var(--primary)", opacity: 0.6 }} />
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