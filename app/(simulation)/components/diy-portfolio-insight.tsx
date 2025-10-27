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
        latestProjection.moneyWithoutInvesting,
      )} dalam ${horizonYears} tahun atau sekitar ${Math.max(
        0,
        Math.round(
          ((totalDeposited - latestProjection.moneyWithoutInvesting) /
            Math.max(totalDeposited, 1)) *
            100,
        ),
      )}% nilainya tergerus inflasi.`
    : "Masukkan tabungan awal dan setel alokasi asetmu untuk melihat analisa portofolio.";

  return (
    <section className="bg-muted/20 mt-24 flex flex-col gap-10 rounded-3xl px-8 py-10">
      <div className="text-center">
        <h3 className="text-3xl font-semibold md:text-4xl">
          Menginvestasikan Tabunganmu ada Langkah pertama yang baik!
        </h3>
        <p className="text-muted-foreground mt-4 text-base">
          {latestProjectionCopy}
        </p>
        <p className="text-primary mt-6 text-sm font-medium tracking-wide uppercase">
          Coba kami analisa portofoliomu
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-center">
        <div className="flex flex-col items-center gap-6">
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
                          className="fill-foreground"
                        >
                          <tspan className="text-3xl font-semibold">
                            {Math.round(topShare)}%
                          </tspan>
                          <tspan
                            x={cx}
                            dy="1.4em"
                            className="text-muted-foreground text-sm"
                          >
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
            <div className="border-muted-foreground/30 flex aspect-square w-full max-w-[260px] items-center justify-center rounded-full border-4 border-dashed">
              <p className="text-muted-foreground px-6 text-center text-sm">
                Atur total alokasi ke 100% untuk melihat diagram portofolio.
              </p>
            </div>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col overflow-clip rounded-3xl shadow-md">
            <div className="flex h-28 items-center justify-center bg-gradient-to-r from-pink-200/70 via-purple-200/60 to-purple-100/60 text-center text-3xl font-bold">
              Disverifikasi
            </div>
            <div className="flex flex-col items-center gap-3 bg-white p-6 text-center">
              <p className="text-4xl font-bold">
                {analysis.diversificationScore}/10
              </p>

              <p className="mt-auto text-sm">{analysis.diversificationNote}</p>
            </div>
          </div>

          <div className="flex flex-col overflow-clip rounded-3xl shadow-md">
            <div className="from-primary/70 via-primary/40 flex h-28 items-center justify-center bg-gradient-to-r to-indigo-200/80 text-center text-3xl font-bold">
              Risk-to-Reward Ratio
            </div>
            <div className="flex flex-col items-center gap-3 bg-white p-6 text-center">
              <p className="text-4xl font-bold">
                {analysis.riskRewardScore}/10
              </p>

              <p className="mt-auto text-sm">{analysis.riskRewardNote}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-muted-foreground text-center text-xs">
        *Bukan ajakan berinvestasi, selalu lakukan riset sendiri sebelum
        mengambil keputusan finansial
      </div>
    </section>
  );
};

export default DiyPortfolioInsight;
