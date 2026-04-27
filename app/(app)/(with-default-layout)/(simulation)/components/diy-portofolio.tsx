"use client";

import { useState, useMemo, useCallback } from "react";
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
import { PlusCircle, AlertCircle, CheckCircle2 } from "lucide-react";
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

const RISK_COLORS: Record<RiskLevel, string> = {
  safe:        "text-emerald-600 bg-emerald-50",
  low:         "text-green-600 bg-green-50",
  medium:      "text-amber-600 bg-amber-50",
  high:        "text-orange-600 bg-orange-50",
  "very-high": "text-red-600 bg-red-50",
};

const ALL_ASSET_TYPES = Object.keys(assetCatalog) as AssetType[];
const MAX_ASSETS = 8;

const DEFAULT_FORM = {
  currentSavings:  "1000000",
  savingsPerMonth: "100000",
  horizonYears:    25,
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface AssetRow {
  uid:        string;
  type:       AssetType;
  percentage: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeUid() {
  return Math.random().toString(36).slice(2);
}

function pickUnusedAsset(used: AssetType[]): AssetType {
  return ALL_ASSET_TYPES.find((t) => !used.includes(t)) ?? ALL_ASSET_TYPES[0];
}

function clampPct(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
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
  row,
  usedTypes,
  remainingPct,
  onChangeType,
  onChangePct,
  onRemove,
  onOpenGlossary,
  canRemove,
}: AssetRowItemProps) {
  const risk        = ASSET_RISK[row.type];
  const glossaryKey = ASSET_TO_GLOSSARY[row.type];

  const handlePctChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
      if (isNaN(raw)) return;
      onChangePct(row.uid, clampPct(Math.min(raw, row.percentage + remainingPct)));
    },
    [onChangePct, remainingPct, row.uid, row.percentage],
  );

  // Risk colour — text only, no pill bg (matches screenshot 3)
  const riskTextColor: Record<RiskLevel, string> = {
    safe:        "text-emerald-600",
    low:         "text-green-600",
    medium:      "text-amber-600",
    high:        "text-orange-600",
    "very-high": "text-red-600",
  };

  return (
    /*
      Card (screenshot 3):
      ┌─────────────────────────────────────────────┐
      │  [Asset name ▾]           [50 ↕ %]  [⊖]   │
      │  RISIKO RENDAH  ⓘ                           │
      └─────────────────────────────────────────────┘
    */
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-white px-5 py-4 shadow-sm">

      {/* Left: bold asset name select + risk badge */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <Select
          value={row.type}
          onValueChange={(v) => onChangeType(row.uid, v as AssetType)}
        >
          <SelectTrigger className="h-auto border-0 bg-transparent p-0 font-bold text-[15px] text-foreground shadow-none focus:ring-0 justify-start gap-2">
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

        {/* Risk label (bold uppercase, coloured) + glossary ⓘ icon */}
        <div className="flex items-center gap-1.5">
          <span className={cn("text-[11px] font-bold uppercase tracking-wide", riskTextColor[risk.level])}>
            {risk.label}
          </span>
          <GlossaryPopover term={glossaryKey} onOpenFullDetail={onOpenGlossary}>
            <span className="cursor-help text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
                <text x="7" y="11" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor">i</text>
              </svg>
            </span>
          </GlossaryPopover>
        </div>
      </div>

      {/* Right: percentage input + circle-minus remove */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Number input — purple value, spinner arrows visible */}
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

        {/* Circle-minus remove button */}
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
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeWidth="1"/>
            <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── AllocationBar ────────────────────────────────────────────────────────────

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
            className={cn(
              "h-full transition-all duration-300",
              ["bg-violet-500","bg-purple-400","bg-indigo-400","bg-blue-400",
               "bg-emerald-400","bg-amber-400","bg-rose-400","bg-pink-400"][i % 8],
            )}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className={cn(
          "flex items-center gap-1 font-semibold",
          isValid ? "text-green-600" : isOver ? "text-red-500" : "text-amber-600",
        )}>
          {isValid
            ? <><CheckCircle2 className="size-3" />Alokasi sempurna</>
            : <><AlertCircle className="size-3" />
                {isOver ? `Melebihi 100% (${total}%)` : `Sisa ${100 - total}%`}
              </>
          }
        </span>
        <span className="font-mono font-bold">
          {total}<span className="text-muted-foreground">/100%</span>
        </span>
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
    () => assets.reduce((sum, a) => sum + (Number(a.percentage) || 0), 0),
    [assets],
  );

  const isValid   = totalAllocation === 100;
  const remaining = 100 - totalAllocation;
  const usedTypes = useMemo(() => assets.map((a) => a.type), [assets]);

  const allocationStats = useMemo(
    () =>
      assets.reduce(
        (acc, a) => {
          const w = (Number(a.percentage) || 0) / 100;
          const c = assetCatalog[a.type];
          acc.upswing   += w * c.upswing;
          acc.downswing += w * c.downswing;
          return acc;
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
      upswing:         allocationStats.upswing,
      downswing:       allocationStats.downswing,
      horizonYears:    formData.horizonYears,
    });
  }, [formData, isValid, allocationStats]);

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

  const handleChangeType = useCallback((uid: string, type: AssetType) =>
    setAssets((prev) => prev.map((a) => (a.uid === uid ? { ...a, type } : a))), []);

  const handleChangePct = useCallback((uid: string, pct: number) =>
    setAssets((prev) => prev.map((a) => (a.uid === uid ? { ...a, percentage: pct } : a))), []);

  const handleRemove = useCallback((uid: string) =>
    setAssets((prev) => prev.length <= 1 ? prev : prev.filter((a) => a.uid !== uid)), []);

  const handleAddAsset = useCallback(() =>
    setAssets((prev) => {
      if (prev.length >= MAX_ASSETS) return prev;
      const used = prev.map((a) => a.type);
      return [...prev, { uid: makeUid(), type: pickUnusedAsset(used), percentage: 0 }];
    }), []);

  const handleFormChange = useCallback(
    <K extends keyof typeof DEFAULT_FORM>(key: K, value: (typeof DEFAULT_FORM)[K]) =>
      setFormData((prev) => ({ ...prev, [key]: value })), []);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <Container className="border-accent max-w-7xl border-b-2">

      <h2 className="text-4xl font-bold md:text-5xl">
        Mau Coba Bikin Portfoliomu Sendiri?
      </h2>

      {/*
        ════════════════════════════════════════════════════════════════════
        TWO-COLUMN SPLIT  (matches screenshot 1)
          LEFT  → savings inputs (3 fields) + komposisi aset + add/total
          RIGHT → summary cards ("Jika diinvestasikan" / "Jika ditabung")
                  + area chart below
        ════════════════════════════════════════════════════════════════════
      */}
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">

        {/* ── LEFT: all input controls ──────────────────────────────────── */}
        <div className="flex flex-col gap-6">

          {/* Savings fields — card with preset quick-select buttons (matches screenshot 3) */}
          <div className="rounded-2xl border border-border bg-white px-5 py-5 shadow-sm">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

              {/* Tabungan awal */}
              <div className="space-y-2">
                <Field>
                  <FieldLabel className="font-bold text-foreground">Tabungan Awal</FieldLabel>
                  <InputGroup>
                    <InputGroupMaskInput
                      name="custom_current_savings"
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
                <div className="flex gap-1.5 flex-wrap">
                  {([
                    { label: "1 Jt",  value: "1000000"  },
                    { label: "5 Jt",  value: "5000000"  },
                    { label: "10 Jt", value: "10000000" },
                  ] as const).map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => handleFormChange("currentSavings", p.value)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold border transition-colors ${
                        formData.currentSavings === p.value
                          ? "bg-primary text-white border-primary"
                          : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nabung bulanan */}
              <div className="space-y-2">
                <Field>
                  <FieldLabel className="font-bold text-foreground">Nabung Bulanan</FieldLabel>
                  <InputGroup>
                    <InputGroupMaskInput
                      name="custom_savings_per_month"
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
                <div className="flex gap-1.5 flex-wrap">
                  {([
                    { label: "100 Rb", value: "100000"  },
                    { label: "500 Rb", value: "500000"  },
                    { label: "1 Jt",   value: "1000000" },
                  ] as const).map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => handleFormChange("savingsPerMonth", p.value)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold border transition-colors ${
                        formData.savingsPerMonth === p.value
                          ? "bg-primary text-white border-primary"
                          : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
                      }`}
                    >
                      {p.label}
                    </button>
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
                        <SelectItem key={y} value={String(y)}>
                          {y} Tahun
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

            </div>
          </div>

          {/* Komposisi aset */}
          <div>
            <p className="mb-3 text-sm font-semibold text-primary">
              Komposisi aset
            </p>

            {/* Asset rows */}
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

            {/* Add item + total */}
            <div className="mt-4 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl border-dashed border-primary/40 text-primary hover:bg-primary/5 hover:border-primary"
                onClick={handleAddAsset}
                disabled={
                  assets.length >= MAX_ASSETS ||
                  usedTypes.length >= ALL_ASSET_TYPES.length
                }
              >
                <PlusCircle className="mr-1.5 size-4" />
                Tambah Aset
              </Button>

              <span
                className={cn(
                  "text-sm font-medium",
                  isValid ? "text-muted-foreground" : "text-destructive",
                )}
              >
                Total: {totalAllocation.toFixed(2)}%
              </span>
            </div>

            {/* Stacked allocation bar */}
            <div className="mt-3">
              <AllocationBar total={totalAllocation} assets={assets} />
            </div>
          </div>
        </div>

        {/* ── RIGHT: chart (summary cards are rendered inside PortofolioChart) */}
        <div className="w-full">
          <PortofolioChart
            data={chartData}
            horizonYears={formData.horizonYears}
          />
        </div>
      </div>

      {/* ── INSIGHT: full width below both columns ── */}
      <DiyPortfolioInsight
        analysis={portfolioAnalysis}
        latestProjection={lastResult}
        totalDeposited={totalDeposited}
        horizonYears={formData.horizonYears}
      />

      <GlossaryPanel
        open={glossary.open}
        active={glossary.active}
        onClose={glossary.hide}
      />
    </Container>
  );
};

export default DiyPortofolio;