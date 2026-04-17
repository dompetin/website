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

// FIX: Konfigurasi warna Donut Chart (Disinkronkan dengan GlossaryKey)
const PORTFOLIO_CHART_CONFIG: ChartConfig = {
  reksa_dana_pasar_uang: { label: "Pasar Uang", color: "#e9d5ff" },
  reksa_dana_pendapatan_tetap: { label: "Pendapatan Tetap", color: "#c084fc" },
  reksa_dana_campuran: { label: "Campuran", color: "#a855f7" },
  reksa_dana_saham: { label: "Saham (RD)", color: "#9333ea" },
  reksa_dana_syariah: { label: "Syariah", color: "#d8b4fe" },
  reksa_dana: { label: "Reksa Dana", color: "#7e22ce" },
  obligasi: { label: "Obligasi", color: "#6366f1" },
  saham: { label: "Saham", color: "#4f46e5" },
  deposito: { label: "Deposito", color: "#94a3b8" },
  emas: { label: "Emas", color: "#fbbf24" },
  diversifikasi: { label: "Diversifikasi", color: "#ec4899" },
  risk_reward: { label: "Risk-to-Reward", color: "#3b82f6" },
};

interface DiyPortfolioInsightProps {
  analysis: PortfolioAnalysisResult;
  latestProjection: InvestmentSimulationResult | null;
  totalDeposited: number;
  horizonYears?: number;
  onOpenGlossary?: (key: GlossaryKey) => void;
}

const DiyPortfolioInsight = ({
  analysis,
  latestProjection,
  totalDeposited,
  horizonYears = SIMULATION_HORIZON_YEARS,
  onOpenGlossary,
}: DiyPortfolioInsightProps) => {
  
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
        
        <div className="mt-8 inline-block">
          <p className="text-sm font-medium text-purple-700 bg-purple-50 px-4 py-2 rounded-full border border-purple-100">
            Analisa Strategi{" "}
            <button 
              onClick={() => onOpenGlossary?.("diversifikasi")}
              className="font-bold underline decoration-dotted underline-offset-2 hover:text-purple-900 transition-colors"
            >
              Diversifikasi
            </button>{" "}
            Kamu
          </p>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-[350px_minmax(0,1fr)] lg:items-center">
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
                  nameKey="type" // FIX: Pakai 'type' sesuai key di ChartConfig
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
                          <tspan x={cx} y={cy + 24} className="fill-muted-foreground text-[10px] uppercase tracking-wider font-bold">
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

        <div className="grid gap-6 md:grid-cols-2">
          {/* DIVERSIFIKASI CARD */}
          <div className="group flex flex-col overflow-hidden rounded-[2rem] bg-white border border-gray-100 shadow-sm transition-all hover:shadow-md">
            <div className="flex h-24 items-center justify-center bg-gradient-to-r from-pink-100 via-purple-100 to-purple-50 p-6">
              <button 
                onClick={() => onOpenGlossary?.("diversifikasi")}
                className="text-2xl font-bold text-purple-950 underline decoration-dotted decoration-purple-400 underline-offset-4 hover:text-purple-700 transition-colors"
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
            <div className="flex h-24 items-center justify-center bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-50 p-6">
              <button 
                onClick={() => onOpenGlossary?.("risk_reward")}
                className="text-2xl font-bold text-purple-950 underline decoration-dotted decoration-purple-400 underline-offset-4 hover:text-purple-700 transition-colors"
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

      <div className="text-muted-foreground/60 text-center text-[10px] uppercase tracking-widest font-bold">
        *Disclaimer: Simulasi ini berdasarkan data historis dan bukan jaminan hasil di masa depan.
      </div>
    </section>
  );
};

export default DiyPortfolioInsight;