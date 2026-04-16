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
// IMPORT GLOSSARY
import { GlossaryTerm } from "./glossary";
import { GlossaryKey } from "@/lib/glossary";

const PORTFOLIO_CHART_CONFIG: ChartConfig = {
  reksadana_pasar_uang: { label: "Pasar Uang", color: "#e9d5ff" },
  reksadana_pendapatan_tetap: { label: "Pendapatan Tetap", color: "#c084fc" },
  reksadana_campuran: { label: "Campuran", color: "#a855f7" },
  reksadana_pasar_saham: { label: "Pasar Saham", color: "#9333ea" },
  obligasi: { label: "Obligasi", color: "#6366f1" },
  saham: { label: "Saham", color: "#4f46e5" },
  deposit: { label: "Deposito", color: "#94a3b8" },
  gold: { label: "Emas", color: "#fbbf24" },
};

interface DiyPortfolioInsightProps {
  analysis: PortfolioAnalysisResult;
  latestProjection: InvestmentSimulationResult | null;
  totalDeposited: number;
  horizonYears?: number;
  onOpenGlossary?: (key: GlossaryKey) => void; // PROP BARU
}

const DiyPortfolioInsight = ({
  analysis,
  latestProjection,
  totalDeposited,
  horizonYears = SIMULATION_HORIZON_YEARS,
  onOpenGlossary,
}: DiyPortfolioInsightProps) => {
  
  // RENDER COPY DENGAN EDUKASI INFLASI
  const latestProjectionCopy = latestProjection ? (
    <div className="space-y-2">
      <p>
        Tanpa investasi, uangmu senilai{" "}
        <strong className="text-foreground">{formatCurrency(totalDeposited)}</strong> akan kehilangan daya beli.
      </p>
      <p className="text-sm">
        Dalam {horizonYears} tahun, nilainya bisa setara hanya{" "}
        <strong className="text-foreground">
          {formatCurrency(latestProjection.moneyWithoutInvesting)}
        </strong>{" "}
        karena{" "}
        <span className="text-destructive font-bold inline-flex items-center gap-1">
          {Math.max(
            0,
            Math.round(
              ((totalDeposited - latestProjection.moneyWithoutInvesting) /
                Math.max(totalDeposited, 1)) *
                100,
            ),
          )}% nilainya tergerus inflasi.
        </span>
      </p>
    </div>
  ) : (
    "Tentukan tabunganmu dan pilih aset di atas untuk mulai menganalisa."
  );

  return (
    <section className="bg-muted/10 mt-24 flex flex-col gap-12 rounded-[2.5rem] px-8 py-12 border border-muted">
      <div className="text-center max-w-3xl mx-auto">
        <h3 className="text-3xl font-extrabold md:text-4xl tracking-tight">
          Investasi Membantu Uangmu Berkembang, Bukan Hanya Tersimpan.
        </h3>
        <div className="mt-6 text-muted-foreground text-lg leading-relaxed">
          {latestProjectionCopy}
        </div>
        
        {/* MICROCOPY DENGAN GLOSSARY */}
        <p className="mt-8 text-sm font-medium text-primary bg-primary/5 inline-block px-4 py-2 rounded-full border border-primary/10">
          Analisa Strategi{" "}
          <GlossaryTerm term="diversifikasi" onClick={() => onOpenGlossary?.("diversifikasi")}>
            Diversifikasi
          </GlossaryTerm>{" "}
          Kamu
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[350px_minmax(0,1fr)] lg:items-center">
        {/* PIE CHART SECTION */}
        <div className="flex flex-col items-center">
          {analysis.isReady ? (
            <ChartContainer
              id="portfolio-breakdown"
              className="mx-auto aspect-square w-full max-w-[280px]"
              config={PORTFOLIO_CHART_CONFIG}
            >
              <PieChart>
                <Pie
                  data={analysis.slices}
                  dataKey="percentage"
                  nameKey="label"
                  innerRadius="72%"
                  outerRadius="100%"
                  strokeWidth={4}
                  stroke="#fff"
                >
                  {analysis.slices.map((slice) => (
                    <Cell
                      key={slice.type}
                      fill={`var(--color-${slice.type})`}
                      className="hover:opacity-80 transition-opacity"
                    />
                  ))}
                  <Label
                    content={({ cx, cy }) => {
                      if (typeof cx !== "number" || typeof cy !== "number") return null;
                      return (
                        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={cx} y={cy} className="fill-foreground text-3xl font-bold">
                            {Math.round(analysis.topAsset?.percentage ?? 0)}%
                          </tspan>
                          <tspan x={cx} y={cy + 24} className="fill-muted-foreground text-xs uppercase tracking-wider font-medium">
                            {analysis.topAsset?.label || "Aset Utama"}
                          </tspan>
                        </text>
                      );
                    }}
                  />
                </Pie>
                <ChartLegend className="mt-8" content={<ChartLegendContent nameKey="type" />} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              </PieChart>
            </ChartContainer>
          ) : (
            <div className="border-muted-foreground/20 flex aspect-square w-full max-w-[260px] items-center justify-center rounded-full border-4 border-dashed bg-muted/5">
              <p className="text-muted-foreground px-8 text-center text-sm italic">
                Selesaikan alokasi aset (100%) untuk melihat komposisi portofolio.
              </p>
            </div>
          )}
        </div>

        {/* METRICS CARDS SECTION */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* DIVERSIFIKASI CARD */}
          <div className="group flex flex-col overflow-hidden rounded-[2rem] bg-white border border-gray-100 shadow-sm transition-all hover:shadow-md">
            <div className="flex h-24 items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
              <button 
                onClick={() => onOpenGlossary?.("diversifikasi")}
                className="text-2xl font-bold text-indigo-900 underline decoration-dotted decoration-indigo-300 underline-offset-4 hover:text-indigo-600 transition-colors"
              >
                Diversifikasi
              </button>
            </div>
            <div className="flex flex-col items-center gap-4 p-8 text-center grow">
              <div className="relative">
                 <span className="text-5xl font-black text-gray-900">{Math.round(analysis.diversificationScore)}%</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                {analysis.diversificationNote}
              </p>
            </div>
          </div>

          {/* RISK REWARD CARD */}
          <div className="group flex flex-col overflow-hidden rounded-[2rem] bg-white border border-gray-100 shadow-sm transition-all hover:shadow-md">
            <div className="flex h-24 items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
              <button 
                onClick={() => onOpenGlossary?.("risk_reward")}
                className="text-2xl font-bold text-blue-900 underline decoration-dotted decoration-blue-300 underline-offset-4 hover:text-blue-600 transition-colors"
              >
                Risk-to-Reward
              </button>
            </div>
            <div className="flex flex-col items-center gap-4 p-8 text-center grow">
              <div className="relative">
                 <span className="text-5xl font-black text-gray-900">{analysis.riskRewardScore}</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                {analysis.riskRewardNote}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-white/50 border border-muted rounded-2xl">
        <p className="text-sm text-center text-muted-foreground italic leading-relaxed">
          &ldquo;Dengan{" "}
          <GlossaryTerm term="diversifikasi" onClick={() => onOpenGlossary?.("diversifikasi")}>
            diversifikasi
          </GlossaryTerm>{" "}
          yang tepat, kamu membagi risiko agar jika satu aset turun, aset lainnya bisa menyeimbangkan. Ini kunci investasi jangka panjang.&rdquo;
        </p>
      </div>

      <div className="text-muted-foreground/60 text-center text-[10px] uppercase tracking-widest font-bold">
        *Disclaimer: Simulasi ini berdasarkan data historis dan bukan jaminan hasil di masa depan.
      </div>
    </section>
  );
};

export default DiyPortfolioInsight;