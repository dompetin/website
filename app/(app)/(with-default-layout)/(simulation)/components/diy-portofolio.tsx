"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Container from "@/components/container";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupMaskInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle, AlertCircle, CheckCircle2, Share2, Printer, BookOpen, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  analyzeCustomPortfolio,
  assetCatalog,
  AssetType,
  simulateCustomPortfolio,
} from "@/lib/custom-portfolio";
import { GlossaryKey } from "@/lib/glossary";
import { useGlossary, GlossaryPanel } from "../components/glossary/glossary";
import { GlossaryPopover } from "../components/glossary/glossary-popover";
import { PortofolioChart } from "./portofolio-chart";
import DiyPortfolioInsight from "./diy-portfolio-insight";

// ─── Constants ────────────────────────────────────────────────────────────────

const ASSET_TO_GLOSSARY: Record<AssetType, GlossaryKey> = {
  reksadana_pasar_uang:       "reksa_dana_pasar_uang",
  reksadana_pendapatan_tetap: "reksa_dana_pendapatan_tetap",
  reksadana_campuran:         "reksa_dana_campuran",
  reksadana_pasar_saham:      "reksa_dana_saham",
  obligasi:                   "obligasi",
  saham:                      "saham",
  deposit:                    "deposito",
  gold:                       "emas",
};

type RiskLevel = "safe" | "low" | "medium" | "high" | "very-high";

const ASSET_RISK: Record<AssetType, { label: string; level: RiskLevel }> = {
  deposit:                    { label: "Aman",                 level: "safe"      },
  obligasi:                   { label: "Risiko Rendah",        level: "low"       },
  reksadana_pasar_uang:       { label: "Risiko Rendah",        level: "low"       },
  reksadana_pendapatan_tetap: { label: "Risiko Rendah",        level: "low"       },
  gold:                       { label: "Stabil",               level: "medium"    },
  reksadana_campuran:         { label: "Risiko Menengah",      level: "medium"    },
  reksadana_pasar_saham:      { label: "Risiko Tinggi",        level: "high"      },
  saham:                      { label: "Risiko Sangat Tinggi", level: "very-high" },
};

const RISK_TEXT: Record<RiskLevel, string> = {
  safe:        "text-emerald-600",
  low:         "text-green-600",
  medium:      "text-amber-600",
  high:        "text-orange-600",
  "very-high": "text-red-600",
};

const ALL_ASSET_TYPES = Object.keys(assetCatalog) as AssetType[];
const MAX_ASSETS = 8;

const DEFAULT_FORM = {
  currentSavings:  "1000000",
  savingsPerMonth: "100000",
  horizonYears:    25,
};

const SAVINGS_PRESETS = [
  { label: "1 Jt",  value: "1000000"  },
  { label: "5 Jt",  value: "5000000"  },
  { label: "10 Jt", value: "10000000" },
] as const;

const MONTHLY_PRESETS = [
  { label: "100 Rb", value: "100000"  },
  { label: "500 Rb", value: "500000"  },
  { label: "1 Jt",   value: "1000000" },
] as const;

// ─── Types ────────────────────────────────────────────────────────────────────

interface AssetRow {
  uid:        string;
  type:       AssetType;
  percentage: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const makeUid = () => Math.random().toString(36).slice(2);
const pickUnused = (used: AssetType[]) =>
  ALL_ASSET_TYPES.find((t) => !used.includes(t)) ?? ALL_ASSET_TYPES[0];
const clamp = (v: number) => Math.min(100, Math.max(0, Math.round(v)));
const fmtIDR = (n: number) => `Rp ${Number(n).toLocaleString("id-ID")}`;
const fmtJt  = (n: number) => `Rp ${(n / 1_000_000).toFixed(1)} jt`;

// ─── PresetButton ─────────────────────────────────────────────────────────────

function PresetButton({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
        active
          ? "border-primary bg-primary text-white"
          : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary",
      )}
    >
      {label}
    </button>
  );
}

// ─── AssetRowItem ─────────────────────────────────────────────────────────────

interface AssetRowItemProps {
  row:            AssetRow;
  usedTypes:      AssetType[];
  remainingPct:   number;
  onChangeType:   (uid: string, type: AssetType) => void;
  onChangePct:    (uid: string, pct: number) => void;
  onRemove:       (uid: string) => void;
  onOpenGlossary: (key: GlossaryKey) => void;
  canRemove:      boolean;
}

function AssetRowItem({
  row, usedTypes, remainingPct,
  onChangeType, onChangePct, onRemove, onOpenGlossary, canRemove,
}: AssetRowItemProps) {
  const risk = ASSET_RISK[row.type];

  const handlePctChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
      if (isNaN(raw)) return;
      onChangePct(row.uid, clamp(Math.min(raw, row.percentage + remainingPct)));
    },
    [onChangePct, remainingPct, row.uid, row.percentage],
  );

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Asset select + risk */}
      <div className="min-w-0 flex-1 space-y-1.5">
        <Select
          value={row.type}
          onValueChange={(v) => onChangeType(row.uid, v as AssetType)}
        >
          <SelectTrigger className="h-auto border-0 bg-transparent p-0 text-[15px] font-bold shadow-none focus:ring-0 justify-start gap-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ALL_ASSET_TYPES.map((type) => (
              <SelectItem
                key={type}
                value={type}
                disabled={usedTypes.includes(type) && type !== row.type}
              >
                {assetCatalog[type].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1.5">
          <span className={cn("text-[11px] font-bold uppercase tracking-wide", RISK_TEXT[risk.level])}>
            {risk.label}
          </span>
          <GlossaryPopover
            term={ASSET_TO_GLOSSARY[row.type]}
            onOpenFullDetail={onOpenGlossary}
          >
            <span className="inline-flex cursor-help items-center text-muted-foreground transition-colors hover:text-primary">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                <text x="7" y="11" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor">i</text>
              </svg>
            </span>
          </GlossaryPopover>
        </div>
      </div>

      {/* Percentage + remove */}
      <div className="flex shrink-0 items-center gap-3">
        <div className="relative w-[72px]">
          <input
            type="number"
            min={0}
            max={100}
            value={row.percentage}
            onChange={handlePctChange}
            className="h-9 w-full rounded-lg border border-border bg-background pr-6 text-right text-sm font-bold tabular-nums text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
            %
          </span>
        </div>

        <button
          type="button"
          onClick={() => onRemove(row.uid)}
          disabled={!canRemove}
          aria-label="Hapus aset"
          className={cn(
            "rounded-full border border-border p-1 transition-colors",
            canRemove
              ? "text-muted-foreground hover:border-destructive/50 hover:text-destructive"
              : "cursor-not-allowed opacity-30",
          )}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeWidth="1" />
            <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── AllocationBar ────────────────────────────────────────────────────────────

const BAR_COLORS = [
  "bg-violet-500", "bg-purple-400", "bg-indigo-400", "bg-blue-400",
  "bg-emerald-400", "bg-amber-400", "bg-rose-400",  "bg-pink-400",
];

function AllocationBar({ total, assets }: { total: number; assets: AssetRow[] }) {
  const isValid = total === 100;
  const isOver  = total > 100;

  return (
    <div className="space-y-1.5">
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
        {assets.map((a, i) => (
          <div
            key={a.uid}
            style={{ width: `${a.percentage}%` }}
            className={cn("h-full motion-safe:transition-all motion-safe:duration-300", BAR_COLORS[i % 8])}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className={cn(
          "flex items-center gap-1 font-semibold",
          isValid ? "text-green-600" : isOver ? "text-red-500" : "text-amber-600",
        )}>
          {isValid ? (
            <><CheckCircle2 className="size-3" />Alokasi sempurna</>
          ) : (
            <><AlertCircle className="size-3" />
              {isOver ? `Melebihi 100% (${total}%)` : `Sisa ${100 - total}%`}
            </>
          )}
        </span>
        <span className="font-mono font-bold">
          {total}<span className="text-muted-foreground">/100%</span>
        </span>
      </div>
    </div>
  );
}

// ─── PrintLayout ─────────────────────────────────────────────────────────────
// Hidden on screen, rendered only when window.print() fires.

function PrintLayout({
  formData, assets, totalAllocation, lastResult, totalDeposited, portfolioAnalysis,
}: {
  formData:          typeof DEFAULT_FORM;
  assets:            AssetRow[];
  totalAllocation:   number;
  lastResult:        ReturnType<typeof simulateCustomPortfolio>[number] | null;
  totalDeposited:    number;
  portfolioAnalysis: ReturnType<typeof analyzeCustomPortfolio>;
}) {
  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  const metrics = [
    {
      title: "Diversifikasi",
      value: `${Math.round(portfolioAnalysis.diversificationScore)}%`,
      note:  portfolioAnalysis.diversificationNote,
      color: "#7c3aed",
    },
    {
      title: "Risk-to-Reward",
      value: portfolioAnalysis.riskRewardScore.toFixed(2),
      note:  portfolioAnalysis.riskRewardNote,
      color: portfolioAnalysis.riskRewardScore > 0.3 ? "#16a34a" : "#d97706",
    },
    {
      title: "Rata-rata Imbal Hasil",
      value: portfolioAnalysis.isReady ? `${(portfolioAnalysis.avgReturn * 100).toFixed(1)}%` : "—",
      note:  "Rata-rata antara skenario optimis dan pesimis.",
      color: "#16a34a",
    },
    {
      title: "Volatilitas",
      value: portfolioAnalysis.isReady ? `${(portfolioAnalysis.portfolioStdDev * 100).toFixed(1)}%` : "—",
      note:  "Semakin kecil, semakin stabil nilainya.",
      color: "#d97706",
    },
  ];

  return (
    <div id="dompetin-print-root" className="hidden">
      {/* PAGE 1 */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#7c3aed" }}>Dompetin</div>
            <div style={{ fontSize: 11, color: "#78716c" }}>Platform Simulasi Investasi</div>
          </div>
          <div style={{ textAlign: "right", fontSize: 11, color: "#a8a29e" }}>
            <div>Dicetak {today}</div>
            <div style={{ fontWeight: 600, color: "#57534e" }}>Hasil Simulasi Portofolio</div>
          </div>
        </div>

        {/* Inputs */}
        <div style={{ display: "flex", gap: 24, borderBottom: "1px solid #f5f5f4", paddingBottom: 16, marginBottom: 20, fontSize: 13 }}>
          {[
            { label: "Tabungan Awal",  val: fmtIDR(Number(formData.currentSavings)) },
            { label: "Nabung Bulanan", val: fmtIDR(Number(formData.savingsPerMonth)) },
            { label: "Jangka Waktu",   val: `${formData.horizonYears} Tahun` },
          ].map((f) => (
            <div key={f.label}>
              <div style={{ color: "#a8a29e", fontSize: 11 }}>{f.label}</div>
              <div style={{ fontWeight: 700 }}>{f.val}</div>
            </div>
          ))}
        </div>

        {/* Projection numbers */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Proyeksi Pertumbuhan</div>
          {lastResult && (
            <div style={{ display: "flex", gap: 24, fontSize: 13 }}>
              {[
                { label: "Potensi Tertinggi", val: fmtJt(lastResult.moneyWithInvestingMax), color: "#7c3aed" },
                { label: "Potensi Terendah",  val: fmtJt(lastResult.moneyWithInvestingMin), color: "#a78bfa" },
                { label: "Tanpa Investasi",   val: fmtJt(lastResult.moneyWithoutInvesting), color: "#78716c" },
              ].map((c) => (
                <div key={c.label}>
                  <div style={{ color: "#a8a29e", fontSize: 11 }}>{c.label}</div>
                  <div style={{ fontWeight: 700, color: c.color }}>{c.val}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Asset table */}
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Komposisi Aset</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e7e5e4", color: "#a8a29e", fontSize: 11 }}>
              <th style={{ textAlign: "left", padding: "6px 8px 6px 0" }}>Aset</th>
              <th style={{ textAlign: "right", padding: "6px 0" }}>Alokasi</th>
              <th style={{ textAlign: "right", padding: "6px 0 6px 8px" }}>Profil Risiko</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((a) => (
              <tr key={a.uid} style={{ borderBottom: "1px solid #f5f5f4" }}>
                <td style={{ padding: "6px 8px 6px 0", fontWeight: 500 }}>{assetCatalog[a.type].label}</td>
                <td style={{ padding: "6px 0", textAlign: "right", fontWeight: 700, color: "#7c3aed" }}>{a.percentage}%</td>
                <td style={{ padding: "6px 0 6px 8px", textAlign: "right", color: "#78716c" }}>{ASSET_RISK[a.type].label}</td>
              </tr>
            ))}
            <tr style={{ fontWeight: 700, color: "#44403c" }}>
              <td style={{ padding: "8px 8px 0 0" }}>Total</td>
              <td style={{ padding: "8px 0 0", textAlign: "right" }}>{totalAllocation}%</td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      {/* PAGE BREAK */}
      <div style={{ pageBreakBefore: "always" }} />

      {/* PAGE 2 */}
      <div>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Analisa Portofolio</div>
        {lastResult && (
          <p style={{ fontSize: 13, color: "#57534e", marginBottom: 20, lineHeight: 1.6 }}>
            Tanpa investasi, uangmu sebesar <strong>{fmtIDR(totalDeposited)}</strong> akan
            kehilangan daya beli. Dalam <strong>{formData.horizonYears} tahun</strong>, nilainya
            menjadi sekitar <strong>{fmtIDR(lastResult.moneyWithoutInvesting)}</strong>.
          </p>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {metrics.map((m) => (
            <div key={m.title} style={{ border: "1px solid #e7e5e4", borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 11, color: "#a8a29e", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>{m.title}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: m.color, marginBottom: 4 }}>{m.value}</div>
              <div style={{ fontSize: 11, color: "#78716c" }}>{m.note}</div>
            </div>
          ))}
        </div>

        <div style={{ border: "1px solid #fde68a", background: "#fffbeb", borderRadius: 10, padding: "10px 14px", fontSize: 11, color: "#92400e" }}>
          <strong>⚠️ Disclaimer:</strong> Hasil simulasi bersifat estimasi berdasarkan data historis.
          Bukan ajakan berinvestasi. Selalu lakukan riset sendiri.
        </div>

        <div style={{ marginTop: 32, textAlign: "center", fontSize: 11, color: "#a8a29e" }}>
          <div style={{ fontWeight: 700, color: "#7c3aed" }}>💚 Dompetin</div>
          <div>Platform Edukasi Investasi — Ada uang sisa? Dompetin Aja.</div>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const DiyPortofolio = () => {
  const glossary = useGlossary();

  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [assets, setAssets] = useState<AssetRow[]>([
    { uid: makeUid(), type: "reksadana_campuran",          percentage: 50 },
    { uid: makeUid(), type: "reksadana_pendapatan_tetap",  percentage: 30 },
    { uid: makeUid(), type: "reksadana_pasar_uang",        percentage: 20 },
  ]);

  // ── Derived ───────────────────────────────────────────────────────────────

  const totalAllocation = useMemo(
    () => assets.reduce((s, a) => s + (Number(a.percentage) || 0), 0),
    [assets],
  );
  const isValid   = totalAllocation === 100;
  const remaining = 100 - totalAllocation;
  const usedTypes = useMemo(() => assets.map((a) => a.type), [assets]);

  const { upswing, downswing } = useMemo(
    () =>
      assets.reduce(
        (acc, a) => {
          const w = (Number(a.percentage) || 0) / 100;
          const c = assetCatalog[a.type];
          return { upswing: acc.upswing + w * c.upswing, downswing: acc.downswing + w * c.downswing };
        },
        { upswing: 0, downswing: 0 },
      ),
    [assets],
  );

  const chartData = useMemo(() => {
    if (!isValid) return [];
    return simulateCustomPortfolio({
      currentSavings:  Number(formData.currentSavings),
      savingsPerMonth: Number(formData.savingsPerMonth),
      upswing,
      downswing,
      horizonYears: formData.horizonYears,
    });
  }, [formData, isValid, upswing, downswing]);

  const lastResult = chartData.length > 0 ? chartData[chartData.length - 1] : null;

  const portfolioAnalysis = useMemo(
    () =>
      analyzeCustomPortfolio({
        allocation:        assets.map(({ type, percentage }) => ({ type, percentage })),
        allocationIsValid: isValid,
      }),
    [assets, isValid],
  );

  const totalDeposited = useMemo(
    () =>
      Number(formData.currentSavings) +
      Number(formData.savingsPerMonth) * 12 * formData.horizonYears,
    [formData],
  );

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleFormChange = useCallback(
    <K extends keyof typeof DEFAULT_FORM>(k: K, v: (typeof DEFAULT_FORM)[K]) =>
      setFormData((p) => ({ ...p, [k]: v })),
    [],
  );
  const handleChangeType = useCallback((uid: string, type: AssetType) =>
    setAssets((p) => p.map((a) => (a.uid === uid ? { ...a, type } : a))), []);
  const handleChangePct = useCallback((uid: string, pct: number) =>
    setAssets((p) => p.map((a) => (a.uid === uid ? { ...a, percentage: pct } : a))), []);
  const handleRemove = useCallback((uid: string) =>
    setAssets((p) => p.length <= 1 ? p : p.filter((a) => a.uid !== uid)), []);
  const handleAddAsset = useCallback(() =>
    setAssets((p) => {
      if (p.length >= MAX_ASSETS) return p;
      return [...p, { uid: makeUid(), type: pickUnused(p.map((a) => a.type)), percentage: 0 }];
    }), []);

  const handlePrint = useCallback(() => {
    const style = document.createElement("style");
    style.id = "dpt-print";
    style.textContent = `
      @media print {
        @page { size: A4 portrait; margin: 16mm 14mm; }
        body > * { visibility: hidden; }
        #dompetin-print-root, #dompetin-print-root * { visibility: visible; }
        #dompetin-print-root {
          position: fixed; top: 0; left: 0;
          width: 100%; background: white;
          font-family: sans-serif; color: #1c1917;
          display: block !important;
        }
      }
    `;
    document.getElementById("dpt-print")?.remove();
    document.head.appendChild(style);
    window.print();
    window.addEventListener("afterprint", () =>
      document.getElementById("dpt-print")?.remove(), { once: true });
  }, []);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({ title: "Simulasi Portofolio — Dompetin", url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => alert("Link disalin!"));
    }
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <Container className="max-w-7xl border-b-2 border-accent">

      {/* Section header */}
      <h2 className="text-4xl font-bold md:text-5xl">
        Mau Coba Bikin Portfoliomu Sendiri?
      </h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Susun alokasi aset, lihat proyeksi, dan analisa kualitas portofoliomu —
        gratis, tanpa daftar.
      </p>

      {/* Two-column layout */}
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">

        {/* ── LEFT ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">

          {/* Input card */}
          <div className="rounded-2xl border border-border bg-white px-5 py-5 shadow-sm">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

              {/* Tabungan awal */}
              <div className="space-y-2">
                <Field>
                  <FieldLabel className="font-bold text-foreground">Tabungan Awal</FieldLabel>
                  <InputGroup>
                    <InputGroupMaskInput
                      name="diy_savings"
                      mask="currency"
                      currency="IDR"
                      locale="id-ID"
                      placeholder="Rp 1.000.000"
                      value={formData.currentSavings}
                      autoComplete="off"
                      onValueChange={(_, v) => handleFormChange("currentSavings", v)}
                    />
                    <InputGroupAddon align="inline-end">IDR</InputGroupAddon>
                  </InputGroup>
                </Field>
                <div className="flex flex-wrap gap-1.5">
                  {SAVINGS_PRESETS.map((p) => (
                    <PresetButton
                      key={p.value}
                      label={p.label}
                      active={formData.currentSavings === p.value}
                      onClick={() => handleFormChange("currentSavings", p.value)}
                    />
                  ))}
                </div>
              </div>

              {/* Nabung bulanan */}
              <div className="space-y-2">
                <Field>
                  <FieldLabel className="font-bold text-foreground">Nabung Bulanan</FieldLabel>
                  <InputGroup>
                    <InputGroupMaskInput
                      name="diy_monthly"
                      mask="currency"
                      currency="IDR"
                      locale="id-ID"
                      placeholder="Rp 100.000"
                      value={formData.savingsPerMonth}
                      autoComplete="off"
                      onValueChange={(_, v) => handleFormChange("savingsPerMonth", v)}
                    />
                    <InputGroupAddon align="inline-end">IDR</InputGroupAddon>
                  </InputGroup>
                </Field>
                <div className="flex flex-wrap gap-1.5">
                  {MONTHLY_PRESETS.map((p) => (
                    <PresetButton
                      key={p.value}
                      label={p.label}
                      active={formData.savingsPerMonth === p.value}
                      onClick={() => handleFormChange("savingsPerMonth", p.value)}
                    />
                  ))}
                </div>
              </div>

              {/* Jangka waktu */}
              <div className="space-y-2">
                <Field>
                  <FieldLabel className="font-bold text-foreground">Jangka Waktu</FieldLabel>
                  <Select
                    value={String(formData.horizonYears)}
                    onValueChange={(v) => handleFormChange("horizonYears", Number(v))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 10, 15, 20, 25].map((y) => (
                        <SelectItem key={y} value={String(y)}>{y} Tahun</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </div>
          </div>

          {/* Asset composition */}
          <div>
            <p className="mb-3 text-sm font-semibold text-primary">Komposisi aset</p>

            <div className="flex flex-col gap-3">
              {assets.map((row) => (
                <AssetRowItem
                  key={row.uid}
                  row={row}
                  usedTypes={usedTypes}
                  remainingPct={remaining}
                  onChangeType={handleChangeType}
                  onChangePct={handleChangePct}
                  onRemove={handleRemove}
                  onOpenGlossary={glossary.show}
                  canRemove={assets.length > 1}
                />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl border-dashed border-primary/40 text-primary hover:border-primary hover:bg-primary/5"
                onClick={handleAddAsset}
                disabled={assets.length >= MAX_ASSETS || usedTypes.length >= ALL_ASSET_TYPES.length}
              >
                <PlusCircle className="mr-1.5 size-4" />
                Tambah Aset
              </Button>
              <span className={cn("text-sm font-medium", isValid ? "text-muted-foreground" : "text-destructive")} aria-live="polite" aria-atomic="true">
                Total: {totalAllocation.toFixed(2)}%
              </span>
            </div>

            <div className="mt-3">
              <AllocationBar total={totalAllocation} assets={assets} />
            </div>
          </div>
        </div>

        {/* ── RIGHT: chart ──────────────────────────────────────────────── */}
        <div className="w-full">
          <PortofolioChart data={chartData} horizonYears={formData.horizonYears} />
        </div>
      </div>

      {/* Insight */}
      <DiyPortfolioInsight
        analysis={portfolioAnalysis}
        latestProjection={lastResult}
        totalDeposited={totalDeposited}
        horizonYears={formData.horizonYears}
        onOpenGlossary={glossary.show}
      />

      {/* Action row */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={handlePrint}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          <Printer className="size-4" />
          Simpan Simulasi
        </button>
        <button
          onClick={handleShare}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/30 py-3 text-sm font-semibold text-primary transition hover:bg-primary/5"
        >
          <Share2 className="size-4" />
          Bagikan Hasil
        </button>
      </div>

      {/* Akademi CTA */}
      <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-2xl border border-primary/20 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
        <div>
          <p className="flex items-center gap-2 font-bold text-foreground">
            <BookOpen className="size-4 shrink-0 text-primary" aria-hidden="true" />
            Belum paham cara alokasi aset?
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Pelajari dulu di Akademi Dompetin — gratis, langkah demi langkah.
          </p>
        </div>
        <Link
          href="/akademi"
          className="shrink-0 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          Buka Akademi →
        </Link>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
        <strong className="flex items-center gap-1.5"><AlertTriangle className="size-3.5 shrink-0" aria-hidden="true" />Disclaimer:</strong>{" "}
        Hasil simulasi bersifat estimasi berdasarkan data historis. Bukan ajakan berinvestasi.
        Selalu lakukan riset sendiri sebelum mengambil keputusan finansial.
      </div>

      <GlossaryPanel open={glossary.open} active={glossary.active} onClose={glossary.hide} />

      {/* Print-only layout */}
      <PrintLayout
        formData={formData}
        assets={assets}
        totalAllocation={totalAllocation}
        lastResult={lastResult}
        totalDeposited={totalDeposited}
        portfolioAnalysis={portfolioAnalysis}
      />
    </Container>
  );
};

export default DiyPortofolio;