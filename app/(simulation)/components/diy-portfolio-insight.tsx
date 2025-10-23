"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
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

const PORTFOLIO_CHART_CONFIG: ChartConfig = {
  reksadana_pasar_uang: {
    label: "Reksadana Pasar Uang",
    color: "#cbb5ff",
  },
  obligasi: {
    label: "Obligasi",
    color: "#a267dd",
  },
  saham_indonesia: {
    label: "Saham Indonesia",
    color: "#7c6cf4",
  },
  saham_as: {
    label: "Saham AS",
    color: "#4f46e5",
  },
};

interface DiyPortfolioInsightProps {
  analysis: PortfolioAnalysisResult;
  latestProjection: InvestmentSimulationResult | null;
  totalDeposited: number;
  horizonYears?: number;
}

const DiyPortfolioInsight = ({
  analysis,
  latestProjection,
  totalDeposited,
  horizonYears = SIMULATION_HORIZON_YEARS,
}: DiyPortfolioInsightProps) => {
  const latestProjectionCopy = latestProjection
    ? `Tanpa investasi, tabunganmu bisa menjadi sekitar ${formatCurrency(
        latestProjection.moneyWithoutInvesting
      )} dalam ${horizonYears} tahun atau sekitar ${Math.max(
        0,
        Math.round(
          ((totalDeposited - latestProjection.moneyWithoutInvesting) /
            Math.max(totalDeposited, 1)) *
            100
        )
      )}% nilainya tergerus inflasi.`
    : "Masukkan tabungan awal dan setel alokasi asetmu untuk melihat analisa portofolio.";

  return (
    <section className="mt-24 flex flex-col gap-10 rounded-3xl bg-muted/20 px-8 py-10">
      <div className="text-center">
        <h3 className="text-3xl md:text-4xl font-semibold">
          Menginvestasikan Tabunganmu ada Langkah pertama yang baik!
        </h3>
        <p className="text-muted-foreground mt-4 text-base">
          {latestProjectionCopy}
        </p>
        <p className="text-sm font-medium uppercase tracking-wide text-primary mt-6">
          Coba kami analisa portofoliomu
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-center">
        <div className="flex flex-col items-center gap-6">
          {analysis.isReady ? (
            <ChartContainer
              id="portfolio-breakdown"
              className="mx-auto aspect-square w-full max-w-[260px]"
              config={PORTFOLIO_CHART_CONFIG}>
              <PieChart>
                <Pie
                  data={analysis.slices}
                  dataKey="percentage"
                  nameKey="label"
                  innerRadius="70%"
                  outerRadius="100%"
                  strokeWidth={0}>
                  {analysis.slices.map((slice) => (
                    <Cell
                      key={slice.type}
                      fill={`var(--color-${slice.type})`}
                    />
                  ))}
                  <Label
                    content={({ cx, cy }) => {
                      if (typeof cx !== "number" || typeof cy !== "number") {
                        return null;
                      }
                      const topShare = analysis.topAsset?.percentage ?? 0;
                      return (
                        <text
                          x={cx}
                          y={cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-foreground">
                          <tspan className="text-3xl font-semibold">
                            {Math.round(topShare)}%
                          </tspan>
                          <tspan
                            x={cx}
                            dy="1.4em"
                            className="text-muted-foreground text-sm">
                            {analysis.topAsset?.label || "Alokasi terbesar"}
                          </tspan>
                        </text>
                      );
                    }}
                  />
                </Pie>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
              </PieChart>
            </ChartContainer>
          ) : (
            <div className="flex aspect-square w-full max-w-[260px] items-center justify-center rounded-full border-4 border-dashed border-muted-foreground/30">
              <p className="text-center text-sm text-muted-foreground px-6">
                Atur total alokasi ke 100% untuk melihat diagram portofolio.
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="font-medium text-foreground">
                Jenis aset terbesar
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: analysis.topAsset
                      ? `var(--color-${analysis.topAsset.type})`
                      : "#d4d4d8",
                  }}
                />
                {analysis.topAsset?.label ?? "Belum ada"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium text-foreground">Alokasi dana</span>
              <span className="font-semibold text-foreground">
                {analysis.topAsset
                  ? `${analysis.topAsset.percentage.toFixed(1)}%`
                  : "0%"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="relative overflow-hidden rounded-3xl border-0 bg-background/70 shadow-lg">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-pink-200/70 via-purple-200/60 to-purple-100/60" />
            <CardContent className="relative flex h-full flex-col justify-end gap-3 pt-24">
              <CardTitle className="text-lg">Diversifikasi</CardTitle>
              <CardDescription className="text-sm">
                {analysis.diversificationNote}
              </CardDescription>
              <p className="text-5xl font-semibold">
                {analysis.diversificationScore}/10
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden rounded-3xl border-0 bg-background/70 shadow-lg">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-primary/70 via-primary/40 to-indigo-200/50" />
            <CardContent className="relative flex h-full flex-col justify-end gap-3 pt-24">
              <CardTitle className="text-lg">Risk-to-Reward Ratio</CardTitle>
              <CardDescription className="text-sm">
                {analysis.riskRewardNote}
              </CardDescription>
              <p className="text-5xl font-semibold">
                {analysis.riskRewardScore}/10
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        *Bukan ajakan berinvestasi, selalu lakukan riset sendiri sebelum
        mengambil keputusan finansial
      </div>
    </section>
  );
};

export default DiyPortfolioInsight;
