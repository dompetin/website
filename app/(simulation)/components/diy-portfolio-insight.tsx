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
                <ChartLegend content={<ChartLegendContent nameKey="type" />} />
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
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl overflow-clip flex flex-col shadow-md">
            <div className="h-28 flex items-center justify-center text-3xl text-center bg-gradient-to-r from-pink-200/70 via-purple-200/60 to-purple-100/60 font-bold">
              Disverifikasi
            </div>
            <div className="bg-white text-center p-6 flex flex-col items-center gap-3">
              <p className="text-4xl font-bold">
                {analysis.diversificationScore}/10
              </p>

              <p className="text-sm mt-auto">{analysis.diversificationNote}</p>
            </div>
          </div>

          <div className="rounded-3xl overflow-clip flex flex-col shadow-md">
            <div className="h-28 flex items-center justify-center text-3xl text-center bg-gradient-to-r from-primary/70 via-primary/40 to-indigo-200/80 font-bold">
              Risk-to-Reward Ratio
            </div>
            <div className="bg-white text-center p-6 flex flex-col items-center gap-3">
              <p className="text-4xl font-bold">
                {analysis.riskRewardScore}/10
              </p>

              <p className="text-sm mt-auto">{analysis.riskRewardNote}</p>
            </div>
          </div>
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
