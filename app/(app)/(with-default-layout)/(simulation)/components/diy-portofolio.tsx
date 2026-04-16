"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupMaskInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PortofolioChart from "./portofolio-chart";
import DiyPortfolioInsight from "./diy-portfolio-insight";
import {
  analyzeCustomPortfolio,
  assetCatalog,
  AssetType,
  simulateCustomPortfolio,
} from "@/lib/custom-portfolio";
import { InvestmentSimulationResult } from "@/lib/simulate-investments";
import { generateRowId } from "@/lib/utils";
import { MinusCircle, PlusCircle, Info } from "lucide-react";
import Link from "next/link";
import * as m from "@/lib/motion";
import { AnimatePresence } from "motion/react";

// INTEGRASI GLOSSARY
import { useGlossary, GlossaryTerm, GlossaryPanel } from "@/components/glossary";
import { GlossaryKey } from "@/lib/glossary";

const assetMeta: Record<string, { risk: string; riskColor: string; returnRange: string }> = {
  reksadana_pasar_uang:      { risk: "Risiko Rendah",    riskColor: "text-green-600",  returnRange: "~4–6%/th" },
  reksadana_pendapatan_tetap:{ risk: "Risiko Rendah",    riskColor: "text-green-600",  returnRange: "~5–8%/th" },
  reksadana_campuran:        { risk: "Risiko Menengah",  riskColor: "text-yellow-600", returnRange: "~8–15%/th" },
  reksadana_pasar_saham:     { risk: "Risiko Tinggi",    riskColor: "text-red-600",    returnRange: "~10–20%/th" },
  obligasi:                  { risk: "Risiko Rendah",    riskColor: "text-green-600",  returnRange: "~5–7%/th" },
  saham:                     { risk: "Risiko Sangat Tinggi", riskColor: "text-red-700",    returnRange: "~12–25%/th" },
  deposit:                   { risk: "Aman Banget",      riskColor: "text-green-700",  returnRange: "~3–5%/th" },
  gold:                      { risk: "Stabil",           riskColor: "text-yellow-600", returnRange: "~8–11%/th" },
};

const SAVINGS_PRESETS = [
  { label: "1 Jt",  value: "1000000" },
  { label: "5 Jt",  value: "5000000" },
  { label: "10 Jt", value: "10000000" },
];

const MONTHLY_PRESETS = [
  { label: "100 Rb", value: "100000" },
  { label: "500 Rb", value: "500000" },
  { label: "1 Jt",   value: "1000000" },
];

type AssetAllocationRow = {
  id: string;
  type: AssetType;
  percentage: string;
};

const INITIAL_ASSETS: AssetAllocationRow[] = [
  { id: "asset-0", type: "reksadana_campuran", percentage: "50" },
  { id: "asset-1", type: "reksadana_pendapatan_tetap", percentage: "30" },
  { id: "asset-2", type: "reksadana_pasar_uang", percentage: "20" },
];

const DiyPortofolio = () => {
  // HOOK GLOSSARY
  const glossary = useGlossary();

  const [assets, setAssets] = useState<AssetAllocationRow[]>(INITIAL_ASSETS);
  const [formData, setFormData] = useState({
    currentSavings: "1000000",
    savingsPerMonth: "100000",
  });
  const [horizonYears, setHorizonYears] = useState(10);
  const [chartData, setChartData] = useState<InvestmentSimulationResult[]>([]);
  
  const latestProjection = chartData.length ? chartData[chartData.length - 1] : null;

  const allocationStats = useMemo(() => {
    return assets.reduce(
      (acc, assetRow) => {
        const percentage = Number(assetRow.percentage) || 0;
        const asset = assetCatalog[assetRow.type];
        const weight = percentage / 100;

        acc.totalPercentage += percentage;
        acc.upswing += weight * asset.upswing;
        acc.downswing += weight * asset.downswing;
        return acc;
      },
      { totalPercentage: 0, upswing: 0, downswing: 0 },
    );
  }, [assets]);

  const totalAllocationRounded = Number(allocationStats.totalPercentage.toFixed(2));
  const allocationIsValid = Math.abs(totalAllocationRounded - 100) <= 0.1;
  const { upswing, downswing } = allocationStats;

  const portfolioAnalysis = useMemo(() => {
    const allocation = assets.map((assetRow) => ({
      type: assetRow.type,
      percentage: Number(assetRow.percentage) || 0,
    }));
    return analyzeCustomPortfolio({ allocation, allocationIsValid });
  }, [allocationIsValid, assets]);

  const totalDeposited = useMemo(() => {
    const currentSavings = Number(formData.currentSavings) || 0;
    const savingsPerMonth = Number(formData.savingsPerMonth) || 0;
    return currentSavings + savingsPerMonth * 12 * horizonYears;
  }, [formData, horizonYears]);

  useEffect(() => {
    const currentSavings = Number(formData.currentSavings) || 0;
    const savingsPerMonth = Number(formData.savingsPerMonth) || 0;

    if (!allocationIsValid || isNaN(currentSavings) || isNaN(savingsPerMonth)) {
      setChartData([]);
      return;
    }

    const results = simulateCustomPortfolio({
      currentSavings,
      savingsPerMonth,
      upswing,
      downswing,
      horizonYears,
    });
    setChartData(results);
  }, [allocationIsValid, formData, upswing, downswing, horizonYears]);

  const handleAssetTypeChange = (id: string, type: AssetType) => {
    setAssets((prev) => prev.map((row) => (row.id === id ? { ...row, type } : row)));
  };

  const handleAssetPercentageChange = (id: string, rawValue: string) => {
    const sanitizedValue = rawValue.replace(/[^0-9.]/g, "");
    setAssets((prev) => prev.map((row) => (row.id === id ? { ...row, percentage: sanitizedValue } : row)));
  };

  return (
    <Container className="border-accent max-w-7xl border-b-2 pb-20">
      {/* IMPROVED HEADLINE */}
      <div className="max-w-3xl">
        <h2 className="text-5xl font-extrabold tracking-tight">
          Susun Rencana Investasimu Sendiri
        </h2>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Eksperimen tanpa takut rugi. Racik campuran{" "}
          <GlossaryTerm term="saham" onClick={glossary.show}>saham</GlossaryTerm>,{" "}
          <GlossaryTerm term="obligasi" onClick={glossary.show}>obligasi</GlossaryTerm>, hingga{" "}
          <GlossaryTerm term="reksa_dana" onClick={glossary.show}>reksa dana</GlossaryTerm> untuk melihat bagaimana uangmu bisa bertumbuh di masa depan.
        </p>
      </div>

      <div className="mt-10 flex w-full flex-col justify-between gap-10 md:flex-row">
        <div className="flex w-full flex-col gap-8">
          <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Field>
              <FieldLabel>Tabungan Awal</FieldLabel>
              <FieldContent>
                <InputGroup>
                  <InputGroupMaskInput
                    mask="currency"
                    currency="IDR"
                    locale="id-ID"
                    value={formData.currentSavings}
                    onValueChange={(_, v) => setFormData(p => ({ ...p, currentSavings: v }))}
                  />
                  <InputGroupAddon align="inline-end">IDR</InputGroupAddon>
                </InputGroup>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {SAVINGS_PRESETS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, currentSavings: p.value }))}
                      className={`text-xs px-3 py-1 rounded-full border transition-all ${
                        formData.currentSavings === p.value ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary text-gray-500"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Nabung Tiap Bulan</FieldLabel>
              <FieldContent>
                <InputGroup>
                  <InputGroupMaskInput
                    mask="currency"
                    currency="IDR"
                    locale="id-ID"
                    value={formData.savingsPerMonth}
                    onValueChange={(_, v) => setFormData(p => ({ ...p, savingsPerMonth: v }))}
                  />
                  <InputGroupAddon align="inline-end">IDR</InputGroupAddon>
                </InputGroup>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {MONTHLY_PRESETS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, savingsPerMonth: p.value }))}
                      className={`text-xs px-3 py-1 rounded-full border transition-all ${
                        formData.savingsPerMonth === p.value ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary text-gray-500"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Jangka Waktu</FieldLabel>
              <FieldContent>
                <Select value={String(horizonYears)} onValueChange={(v) => setHorizonYears(Number(v))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[5, 10, 15, 20, 25].map(y => (
                      <SelectItem key={y} value={String(y)}>{y} Tahun</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>
          </FieldGroup>

          {/* ASSET COMPOSITION SECTION */}
          <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
               <FieldLabel className="mb-0">Susun Campuran Asetmu</FieldLabel>
               <button onClick={() => glossary.show("diversifikasi")} className="text-gray-400 hover:text-primary">
                 <Info size={14} />
               </button>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {assets.map((assetRow, index) => (
                  <m.div
                    key={assetRow.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col gap-3 md:flex-row md:items-center bg-white p-3 rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="flex-1">
                      <Select
                        value={assetRow.type}
                        onValueChange={(v) => handleAssetTypeChange(assetRow.id, v as AssetType)}
                      >
                        <SelectTrigger className="border-0 shadow-none bg-transparent focus:ring-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(assetCatalog).map(([value, data]) => {
                            const meta = assetMeta[value];
                            return (
                              <SelectItem key={value} value={value}>
                                <div className="flex flex-col py-1">
                                  <span className="font-medium">{data.label}</span>
                                  {meta && (
                                    <span className="text-[10px] uppercase tracking-wider font-bold">
                                      <span className={meta.riskColor}>{meta.risk}</span>
                                      <span className="text-gray-300 mx-1">|</span>
                                      <span className="text-gray-500">{meta.returnRange}</span>
                                    </span>
                                  )}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-24">
                        <InputGroup>
                          <InputGroupInput
                            type="number"
                            value={assetRow.percentage}
                            onChange={(e) => handleAssetPercentageChange(assetRow.id, e.target.value)}
                            className="text-right font-bold"
                          />
                          <InputGroupAddon align="inline-end">%</InputGroupAddon>
                        </InputGroup>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={assets.length === 1}
                        onClick={() => setAssets(prev => prev.filter(r => r.id !== assetRow.id))}
                        className="text-gray-300 hover:text-red-500"
                      >
                        <MinusCircle size={20} />
                      </Button>
                    </div>
                  </m.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-dashed pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAssets(p => [...p, { id: generateRowId(), type: "reksadana_pasar_uang", percentage: "0" }])}
                className="rounded-full border-primary text-primary hover:bg-primary/5"
              >
                <PlusCircle size={16} className="mr-2" /> Tambah Aset Baru
              </Button>
              <div className="flex flex-col items-end">
                <span className={`text-sm font-bold ${allocationIsValid ? "text-primary" : "text-red-500"}`}>
                  Total Alokasi: {totalAllocationRounded}%
                </span>
                {!allocationIsValid && <span className="text-[10px] text-red-400 font-medium italic">*Harus 100% untuk simulasi</span>}
              </div>
            </div>
          </div>
        </div>

        {/* CHART SECTION */}
        <div className="w-full md:sticky md:top-6 h-fit">
           <PortofolioChart data={chartData} horizonYears={horizonYears} />
        </div>
      </div>

      {/* INSIGHT SECTION */}
      <div className="mt-16">
        <DiyPortfolioInsight
          analysis={portfolioAnalysis}
          latestProjection={latestProjection}
          totalDeposited={totalDeposited}
          horizonYears={horizonYears}
          onOpenGlossary={glossary.show} // Support glossary di dalam insight
        />
      </div>

      {/* GLOBAL GLOSSARY PANEL */}
      <GlossaryPanel
        open={glossary.open}
        active={glossary.active}
        onClose={glossary.hide}
      />
    </Container>
  );
};

export default DiyPortofolio;
