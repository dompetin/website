"use client";

import { useEffect, useState } from "react";
import Container from "@/components/container";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
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
import { cn, generateRowId } from "@/lib/utils";
import { PlusCircle, MinusCircle, Info } from "lucide-react";

// LIB & LOGIC
import { 
  analyzeCustomPortfolio, 
  assetCatalog, 
  AssetType, 
  simulateCustomPortfolio 
} from "@/lib/custom-portfolio";
import { InvestmentSimulationResult } from "@/lib/simulate-investments";
import { GlossaryKey } from "@/lib/glossary";

// COMPONENTS
import PortofolioChart from "./portofolio-chart";
import DiyPortfolioInsight from "./diy-portfolio-insight";

// INTEGRASI GLOSSARY
import { useGlossary, GlossaryPanel } from "../components/glossary/glossary";
import { GlossaryPopover } from "../components/glossary/glossary-popover";

// FIX: Sinkronisasi key dengan GlossaryKey (reksa_dana_..., deposito, emas)
const assetMeta: Record<string, { risk: string; riskColor: string; returnRange: string }> = {
  reksa_dana_pasar_uang: { risk: "Risiko Rendah", riskColor: "text-green-600", returnRange: "~4-6%/th" },
  reksa_dana_pendapatan_tetap: { risk: "Risiko Rendah", riskColor: "text-green-600", returnRange: "~5-8%/th" },
  reksa_dana_campuran: { risk: "Risiko Menengah", riskColor: "text-yellow-600", returnRange: "~8-15%/th" },
  reksa_dana_saham: { risk: "Risiko Tinggi", riskColor: "text-red-600", returnRange: "~10-20%/th" },
  obligasi: { risk: "Risiko Rendah", riskColor: "text-green-600", returnRange: "~5-7%/th" },
  saham: { risk: "Risiko Sangat Tinggi", riskColor: "text-red-700", returnRange: "~12-25%/th" },
  deposito: { risk: "Aman Banget", riskColor: "text-green-700", returnRange: "~3-5%/th" },
  emas: { risk: "Stabil", riskColor: "text-yellow-600", returnRange: "~8-11%/th" },
};

const SAVINGS_PRESETS = [
  { label: "1 Jt", value: "1000000" },
  { label: "5 Jt", value: "5000000" },
  { label: "10 Jt", value: "10000000" },
];

const MONTHLY_PRESETS = [
  { label: "100 Rb", value: "100000" },
  { label: "500 Rb", value: "500000" },
  { label: "1 Jt", value: "1000000" },
];

const DiyPortofolio = () => {
  const glossary = useGlossary();
  
  const [formData, setFormData] = useState({
    currentSavings: "10000000",
    savingsPerMonth: "500000",
    horizonYears: 10,
  });

  // FIX: Default assets menggunakan key yang benar
  const [assets, setAssets] = useState<{ id: string; type: AssetType; percentage: number }[]>([
    { id: generateRowId(), type: "reksa_dana_pasar_uang", percentage: 50 },
    { id: generateRowId(), type: "reksa_dana_pendapatan_tetap", percentage: 50 },
  ]);

  const [chartData, setChartData] = useState<InvestmentSimulationResult[]>([]);
  const totalAllocation = assets.reduce((sum, a) => sum + a.percentage, 0);

  useEffect(() => {
    const data = simulateCustomPortfolio({
      currentSavings: Number(formData.currentSavings),
      savingsPerMonth: Number(formData.savingsPerMonth),
      horizonYears: formData.horizonYears,
      assets: assets.map(a => ({ type: a.type, percentage: a.percentage })),
    });
    setChartData(data);
  }, [formData, assets]);

  const updateAsset = (id: string, updates: Partial<{ type: AssetType; percentage: number }>) => {
    setAssets(prev => prev.map(a => (a.id === id ? { ...a, ...updates } : a)));
  };

  const addAsset = () => {
    if (assets.length < 8) {
      setAssets([...assets, { id: generateRowId(), type: "reksa_dana_pasar_uang", percentage: 0 }]);
    }
  };

  const removeAsset = (id: string) => {
    if (assets.length > 1) {
      setAssets(assets.filter(a => a.id !== id));
    }
  };

  const portfolioAnalysis = analyzeCustomPortfolio(assets);

  return (
    <Container className="max-w-6xl pb-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_450px]">
        {/* LEFT COLUMN: INPUTS */}
        <div className="space-y-10">
          <FieldGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3 bg-white p-6 rounded-3xl border border-purple-100 shadow-sm">
            <Field>
              <FieldLabel className="text-purple-900 font-bold">Tabungan Awal</FieldLabel>
              <InputGroup>
                <InputGroupMaskInput
                  mask="currency"
                  currency="IDR"
                  value={formData.currentSavings}
                  onValueChange={(_, v) => setFormData(p => ({ ...p, currentSavings: v }))}
                  className="focus:ring-purple-500 border-purple-100"
                />
                <InputGroupAddon align="inline-end">IDR</InputGroupAddon>
              </InputGroup>
              <div className="mt-2 flex gap-1.5">
                {SAVINGS_PRESETS.map(p => (
                  <button
                    key={p.value}
                    onClick={() => setFormData(f => ({ ...f, currentSavings: p.value }))}
                    className={cn(
                      "text-[10px] px-2.5 py-1 rounded-full border transition-all font-bold",
                      formData.currentSavings === p.value 
                        ? "bg-purple-600 border-purple-600 text-white" 
                        : "bg-white text-purple-600 border-purple-200 hover:bg-purple-50"
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </Field>

            <Field>
              <FieldLabel className="text-purple-900 font-bold">Nabung Bulanan</FieldLabel>
              <InputGroup>
                <InputGroupMaskInput
                  mask="currency"
                  currency="IDR"
                  value={formData.savingsPerMonth}
                  onValueChange={(_, v) => setFormData(p => ({ ...p, savingsPerMonth: v }))}
                  className="focus:ring-purple-500 border-purple-100"
                />
                <InputGroupAddon align="inline-end">IDR</InputGroupAddon>
              </InputGroup>
              <div className="mt-2 flex gap-1.5">
                {MONTHLY_PRESETS.map(p => (
                  <button
                    key={p.value}
                    onClick={() => setFormData(f => ({ ...f, savingsPerMonth: p.value }))}
                    className={cn(
                      "text-[10px] px-2.5 py-1 rounded-full border transition-all font-bold",
                      formData.savingsPerMonth === p.value 
                        ? "bg-purple-600 border-purple-600 text-white" 
                        : "bg-white text-purple-600 border-purple-200 hover:bg-purple-50"
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </Field>

            <Field>
              <FieldLabel className="text-purple-900 font-bold">Jangka Waktu</FieldLabel>
              <Select
                value={String(formData.horizonYears)}
                onValueChange={(v) => setFormData(p => ({ ...p, horizonYears: Number(v) }))}
              >
                <SelectTrigger className="bg-white border-purple-100 focus:ring-purple-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 15, 20, 25, 30].map(y => (
                    <SelectItem key={y} value={String(y)}>{y} Tahun</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>

          {/* ASSET COMPOSITION */}
          <div className="bg-purple-50/40 p-8 rounded-[2.5rem] border border-purple-100 relative">
            <div className="flex items-center gap-2 mb-6">
              <h3 className="font-bold text-purple-950 text-lg">Susun Campuran Asetmu</h3>
              <Info className="w-4 h-4 text-purple-400" />
            </div>

            <div className="space-y-3">
              {assets.map((asset) => {
                const meta = assetMeta[asset.type] || assetMeta['reksa_dana_pasar_uang'];
                return (
                  <div key={asset.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-purple-100 shadow-sm transition-all hover:border-purple-300">
                    <div className="flex-1 min-w-0">
                      {/* ASSET SELECTOR INLINE */}
                      <Select
                        value={asset.type}
                        onValueChange={(v) => updateAsset(asset.id, { type: v as AssetType })}
                      >
                        <SelectTrigger className="h-auto p-0 border-none shadow-none focus:ring-0 text-left bg-transparent">
                          <div className="font-bold text-purple-900 truncate">
                            {assetCatalog.find(c => c.value === asset.type)?.label}
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {assetCatalog.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="flex items-center gap-2 mt-1">
                        <span className={cn("text-[9px] font-black uppercase tracking-widest", meta.riskColor)}>
                          {meta.risk}
                        </span>
                        <span className="text-purple-100 text-[10px]">|</span>
                        <span className="text-[10px] text-muted-foreground font-medium">{meta.returnRange}</span>
                        
                        {/* GLOSSARY TRIGGER */}
                        <button 
                          onClick={() => glossary.show(asset.type as GlossaryKey)}
                          className="ml-1 text-purple-400 hover:text-purple-600 transition-colors"
                        >
                          <Info className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="relative w-20">
                        <input
                          type="number"
                          value={asset.percentage}
                          onChange={(e) => updateAsset(asset.id, { percentage: Number(e.target.value) })}
                          className="w-full text-right pr-6 py-1 font-bold text-purple-700 border-b-2 border-purple-50 focus:border-purple-500 outline-none transition-colors"
                        />
                        <span className="absolute right-1 top-1/2 -translate-y-1/2 font-bold text-purple-300 text-sm">%</span>
                      </div>
                      <button 
                        onClick={() => removeAsset(asset.id)} 
                        className="text-purple-200 hover:text-red-500 transition-colors"
                      >
                        <MinusCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={addAsset} 
                className="rounded-full border-purple-200 text-purple-600 hover:bg-purple-600 hover:text-white transition-all gap-2 font-bold py-5 px-6"
                disabled={assets.length >= 8}
              >
                <PlusCircle className="w-4 h-4" /> Tambah Aset
              </Button>
              <div className={cn(
                "font-black text-sm px-4 py-2 rounded-xl transition-all", 
                totalAllocation === 100 
                  ? "bg-green-50 text-green-600 border border-green-100" 
                  : "bg-red-50 text-red-500 border border-red-100"
              )}>
                {totalAllocation}% / 100%
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CHART */}
        <div className="lg:pt-4">
          <PortofolioChart data={chartData} horizonYears={formData.horizonYears} />
        </div>
      </div>

      {/* ANALYSIS SECTION */}
      <DiyPortfolioInsight 
        analysis={portfolioAnalysis}
        latestProjection={chartData[chartData.length - 1]}
        totalDeposited={Number(formData.currentSavings) + (Number(formData.savingsPerMonth) * 12 * formData.horizonYears)}
        horizonYears={formData.horizonYears}
        onOpenGlossary={glossary.show}
      />

      {/* SIDE PANEL (Glossary) */}
      <GlossaryPanel
        open={glossary.open}
        active={glossary.active}
        onClose={glossary.hide}
      />
    </Container>
  );
};

export default DiyPortofolio;