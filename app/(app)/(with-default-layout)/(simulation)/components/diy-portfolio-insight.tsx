"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  PortfolioAnalysisResult,
  SIMULATION_HORIZON_YEARS,
} from "@/lib/custom-portfolio";
import { InvestmentSimulationResult } from "@/lib/simulate-investments";
import { formatCurrency } from "@/lib/utils";
import { Cell, Label, Pie, PieChart } from "recharts";
import { GlossaryKey } from "@/lib/glossary";
import { GlossaryPopover } from "../components/glossary/glossary-popover";

// ─── Chart config ─────────────────────────────────────────────────────────────

const PORTFOLIO_CHART_CONFIG: ChartConfig = {
  reksadana_pasar_uang:       { label: "Pasar Uang",       color: "#e9d5ff" },
  reksadana_pendapatan_tetap: { label: "Pendapatan Tetap", color: "#c084fc" },
  reksadana_campuran:         { label: "Campuran",         color: "#a855f7" },
  reksadana_pasar_saham:      { label: "Saham (RD)",       color: "#9333ea" },
  obligasi:                   { label: "Obligasi",         color: "#6366f1" },
  saham:                      { label: "Saham",            color: "#4f46e5" },
  deposit:                    { label: "Deposito",         color: "#94a3b8" },
  gold:                       { label: "Emas",             color: "#fbbf24" },
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface DiyPortfolioInsightProps {
  analysis:         PortfolioAnalysisResult;
  latestProjection: InvestmentSimulationResult | null;
  totalDeposited:   number;
  horizonYears?:    number;
  onOpenGlossary?:  (key: GlossaryKey) => void;
}

// ─── Score bar ────────────────────────────────────────────────────────────────

function ScoreBar({ value, color }: { value: number; color: string }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

// ─── Metric card ──────────────────────────────────────────────────────────────
// Matches Image 2 / Image 3: white bg, border, rounded-2xl, title + sub + big
// value + progress bar + note — all inside a clearly visible card box.

function MetricCard({
  title,
  sub,
  value,
  valueClass,
  barValue,
  barColor,
  note,
  glossaryKey,
  onOpenGlossaryPanel,
  headerGradient,
}: {
  title:                string;
  sub:                  string;
  value:                string;
  valueClass:           string;
  barValue:             number;
  barColor:             string;
  note:                 string;
  glossaryKey?:         GlossaryKey;
  onOpenGlossaryPanel?: (key: GlossaryKey) => void;
  headerGradient?:      string; // tailwind bg-gradient classes
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border shadow-sm">
      {/* Gradient header — large bold title matching Image 2 */}
      <div className={`flex items-center px-6 py-5 min-h-[72px] ${headerGradient ?? "bg-white"}`}>
        {glossaryKey ? (
          <GlossaryPopover
            term={glossaryKey}
            onOpenFullDetail={(key) => onOpenGlossaryPanel?.(key)}
          >
            <span className="cursor-help text-xl font-bold text-foreground underline decoration-dotted underline-offset-4">
              {title}
            </span>
          </GlossaryPopover>
        ) : (
          <p className="text-xl font-bold text-foreground">{title}</p>
        )}
      </div>

      {/* White body — sub + value + bar + note */}
      <div className="flex flex-col gap-3 bg-white px-5 py-4">
        <p className="text-xs text-muted-foreground -mt-1">{sub}</p>
        {/* Big value */}
        <p className={`text-4xl font-black tabular-nums ${valueClass}`}>
          {value}
        </p>

        {/* Progress bar */}
        <ScoreBar value={barValue} color={barColor} />

        {/* Note */}
        <p className="text-xs text-muted-foreground leading-relaxed">{note}</p>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const DiyPortfolioInsight = ({
  analysis,
  latestProjection,
  totalDeposited,
  horizonYears = SIMULATION_HORIZON_YEARS,
  onOpenGlossary,
}: DiyPortfolioInsightProps) => {

  const inflationLoss =
    latestProjection && totalDeposited > 0
      ? Math.max(
          0,
          Math.round(
            ((totalDeposited - latestProjection.moneyWithoutInvesting) /
              totalDeposited) * 100,
          ),
        )
      : 0;

  const latestProjectionCopy = latestProjection ? (
    <>
      <p>
        Tanpa investasi, uangmu sebesar{" "}
        <strong>{formatCurrency(totalDeposited)}</strong> akan kehilangan daya
        beli akibat inflasi.
      </p>
      <p className="mt-2">
        Dalam <strong>{horizonYears} tahun</strong>, nilainya menyusut menjadi
        sekitar{" "}
        <strong>
          {formatCurrency(latestProjection.moneyWithoutInvesting)}
        </strong>{" "}
        — turun{" "}
        <span className="font-bold text-destructive">{inflationLoss}%</span>{" "}
        dari nilai awal.
      </p>
    </>
  ) : (
    <p>
      Atur tabungan awal dan setel alokasi asetmu untuk melihat analisa
      portofolio.
    </p>
  );

  return (
    /*
      mt-16 adds clear breathing room between the chart section above
      and this "Analisa Portofolio" heading — fixes the "too close" issue.
    */
    <section className="mt-16 flex flex-col gap-10 rounded-3xl bg-muted/20 px-6 py-10 md:px-8">

      {/* Header */}
      <div className="text-center">
        <h3 className="text-3xl font-bold md:text-4xl">
          Analisa Portofoliomu
        </h3>
        <div className="text-muted-foreground mt-4 text-sm leading-relaxed max-w-xl mx-auto">
          {latestProjectionCopy}
        </div>

        <button
          onClick={() => onOpenGlossary?.("diversifikasi")}
          className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10"
        >
          Pelajari strategi{" "}
          <span className="underline decoration-dotted">Diversifikasi →</span>
        </button>
      </div>

      {/* Donut + 4-card grid */}
      <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">

        {/* Donut chart */}
        <div className="flex flex-col items-center">
          {analysis.isReady ? (
            <ChartContainer
              id="portfolio-breakdown"
              className="mx-auto aspect-square w-full max-w-[260px]"
              config={PORTFOLIO_CHART_CONFIG}
            >
              <PieChart>
                <Pie
                  data={analysis.slices}
                  dataKey="percentage"
                  nameKey="label"
                  innerRadius="70%"
                  outerRadius="100%"
                  strokeWidth={0}
                >
                  {analysis.slices.map((slice) => (
                    <Cell
                      key={slice.type}
                      fill={
                        PORTFOLIO_CHART_CONFIG[slice.type]?.color ?? "#a855f7"
                      }
                    />
                  ))}
                  <Label
                    content={({ cx, cy }) => {
                      if (typeof cx !== "number" || typeof cy !== "number")
                        return null;
                      return (
                        <text
                          x={cx}
                          y={cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={cx}
                            dy="-0.4em"
                            fontSize={28}
                            fontWeight={800}
                            fill="currentColor"
                          >
                            {Math.round(analysis.topAsset?.percentage ?? 0)}%
                          </tspan>
                          <tspan
                            x={cx}
                            dy="1.5em"
                            fontSize={10}
                            fontWeight={600}
                            fill="#888"
                          >
                            {(analysis.topAsset?.label ?? "Alokasi").slice(0, 16)}
                          </tspan>
                        </text>
                      );
                    }}
                  />
                </Pie>
                <ChartLegend
                  content={<ChartLegendContent nameKey="type" />}
                  className="mt-4 flex-wrap text-[11px]"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
              </PieChart>
            </ChartContainer>
          ) : (
            <div className="flex aspect-square w-full max-w-[260px] items-center justify-center rounded-full border-4 border-dashed border-muted-foreground/30">
              <p className="px-6 text-center text-sm text-muted-foreground">
                Atur total alokasi ke 100% untuk melihat diagram portofolio.
              </p>
            </div>
          )}
        </div>

        {/*
          4 metric cards in a 2×2 grid.
          Each card has: title + sub, big value, progress bar, note.
          Matches Image 3 (current target).
        */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <MetricCard
            title="Diversifikasi"
            sub="Seberapa tersebar asetmu"
            value={`${Math.round(analysis.diversificationScore)}%`}
            valueClass="text-foreground"
            barValue={analysis.diversificationScore}
            barColor="#7c3aed"
            note={analysis.diversificationNote}
            glossaryKey="diversifikasi"
            onOpenGlossaryPanel={onOpenGlossary}
            headerGradient="bg-gradient-to-r from-pink-100/80 via-purple-100/60 to-purple-50/40"
          />

          <MetricCard
            title="Risk-to-Reward"
            sub="Imbal hasil vs risiko"
            value={String(analysis.riskRewardScore.toFixed(2))}
            valueClass="text-foreground"
            barValue={(analysis.riskRewardScore + 1) * 50}
            barColor={
              analysis.riskRewardScore > 0.3
                ? "#16a34a"
                : analysis.riskRewardScore > 0
                ? "#d97706"
                : "#dc2626"
            }
            note={analysis.riskRewardNote}
            glossaryKey="risk_reward"
            onOpenGlossaryPanel={onOpenGlossary}
            headerGradient="bg-gradient-to-r from-primary/20 via-primary/10 to-indigo-100/50"
          />

          <MetricCard
            title="Rata-rata Imbal Hasil"
            sub="Per tahun (estimasi)"
            value={
              analysis.isReady
                ? `${(analysis.avgReturn * 100).toFixed(1)}%`
                : "—"
            }
            valueClass="text-emerald-600"
            barValue={analysis.isReady ? analysis.avgReturn * 500 : 0}
            barColor="#16a34a"
            note="Rata-rata antara skenario optimis dan pesimis portofoliomu."
            glossaryKey="imbal_hasil"
            onOpenGlossaryPanel={onOpenGlossary}
            headerGradient="bg-gradient-to-r from-emerald-50 via-green-50/60 to-white"
          />

          <MetricCard
            title="Volatilitas"
            sub="Standar deviasi portofolio"
            value={
              analysis.isReady
                ? `${(analysis.portfolioStdDev * 100).toFixed(1)}%`
                : "—"
            }
            valueClass="text-amber-600"
            barValue={analysis.isReady ? analysis.portfolioStdDev * 300 : 0}
            barColor="#d97706"
            note="Semakin kecil, semakin stabil nilainya dari tahun ke tahun."
            glossaryKey="volatilitas"
            onOpenGlossaryPanel={onOpenGlossary}
            headerGradient="bg-gradient-to-r from-amber-50 via-orange-50/60 to-white"
          />
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-[10px] uppercase tracking-widest text-muted-foreground">
        *Simulasi berdasarkan data historis — bukan jaminan hasil di masa depan
      </p>
    </section>
  );
};

export default DiyPortfolioInsight;