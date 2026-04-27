"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Container from "@/components/container";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
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
import {
  InvestmentSimulationResult,
  simulateInvestments,
} from "@/lib/simulate-investments";
import { PortofolioChart } from "./portofolio-chart";
import { useGlossary, GlossaryPanel } from "../components/glossary/glossary";
import { GlossaryKey } from "@/lib/glossary";
import { Info } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ProductType = "stocks" | "mutual_fund" | "obligation" | "deposit" | "gold";

// ─── Constants ────────────────────────────────────────────────────────────────

const PRODUCT_LABELS: Record<ProductType, string> = {
  mutual_fund: "Reksa Dana",
  stocks:      "Saham",
  obligation:  "Obligasi",
  deposit:     "Deposito",
  gold:        "Emas",
};

const PRODUCT_TO_GLOSSARY: Record<ProductType, GlossaryKey> = {
  mutual_fund: "reksa_dana",
  stocks:      "saham",
  obligation:  "obligasi",
  deposit:     "deposito",
  gold:        "emas",
};

const HORIZON_OPTIONS = [5, 10, 15, 20, 25] as const;

const DEFAULT_FORM = {
  currentSavings: "1000000",
  savingsPerMonth: "100000",
  product: "mutual_fund" as ProductType,
};

// ─── Component ────────────────────────────────────────────────────────────────

const GuidedPortofolio = () => {
  const glossary = useGlossary();

  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [horizonYears, setHorizonYears] = useState<number>(10);
  const [chartData, setChartData] = useState<InvestmentSimulationResult[]>([]);

  // Run simulation whenever inputs change
  useEffect(() => {
    const result = simulateInvestments({
      currentSavings:  Number(formData.currentSavings)  || 0,
      savingsPerMonth: Number(formData.savingsPerMonth) || 0,
      product:         formData.product,
      horizonYears,
    });
    setChartData(result);
  }, [formData, horizonYears]);

  // Derived label for the active product (stable reference, no inline ternary chains)
  const activeProductLabel = PRODUCT_LABELS[formData.product];
  const activeGlossaryKey  = PRODUCT_TO_GLOSSARY[formData.product];

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleSavingsChange = (_: unknown, v: string) =>
    setFormData((p) => ({ ...p, currentSavings: v }));

  const handleMonthlyChange = (_: unknown, v: string) =>
    setFormData((p) => ({ ...p, savingsPerMonth: v }));

  const handleProductChange = (value: string) =>
    setFormData((p) => ({ ...p, product: value as ProductType }));

  const handleHorizonChange = (value: string) =>
    setHorizonYears(Number(value));

  const handleOpenGlossary = () => glossary.show(activeGlossaryKey);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <Container className="max-w-5xl border-b-2 border-accent pb-16">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Berapa yang bisa aku simpan kalau…
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Lihat potensi pertumbuhan uangmu dengan memilih instrumen yang tepat.
          Klik{" "}
          <Info className="inline size-4 align-middle" />{" "}
          untuk belajar istilah keuangannya.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Input group */}
        <FieldGroup className="grid grid-cols-1 items-end gap-4 rounded-3xl border border-muted bg-muted/30 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Tabungan awal */}
          <Field>
            <FieldLabel>Uang Dingin Saat Ini</FieldLabel>
            <InputGroup>
              <InputGroupMaskInput
                name="current_savings"
                mask="currency"
                currency="IDR"
                locale="id-ID"
                value={formData.currentSavings}
                onValueChange={handleSavingsChange}
              />
              <InputGroupAddon align="inline-end">IDR</InputGroupAddon>
            </InputGroup>
          </Field>

          {/* Nabung bulanan */}
          <Field>
            <FieldLabel>Nabung Tiap Bulan</FieldLabel>
            <InputGroup>
              <InputGroupMaskInput
                name="savings_per_month"
                mask="currency"
                currency="IDR"
                locale="id-ID"
                value={formData.savingsPerMonth}
                onValueChange={handleMonthlyChange}
              />
              <InputGroupAddon align="inline-end">IDR</InputGroupAddon>
            </InputGroup>
          </Field>

          {/* Produk investasi */}
          <Field>
            <div className="mb-2 flex items-center justify-between">
              <FieldLabel className="mb-0">Pilihan Produk</FieldLabel>
              <button
                type="button"
                onClick={handleOpenGlossary}
                aria-label={`Pelajari ${activeProductLabel}`}
                className="rounded-full p-1 text-violet-600 transition-colors hover:bg-violet-50 hover:text-violet-800"
              >
                <Info className="size-4" />
              </button>
            </div>
            <Select value={formData.product} onValueChange={handleProductChange}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Pilih produk" />
              </SelectTrigger>
              <SelectContent>
                {(Object.entries(PRODUCT_LABELS) as [ProductType, string][]).map(
                  ([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </Field>

          {/* Jangka waktu */}
          <Field>
            <FieldLabel>Selama…</FieldLabel>
            <Select
              value={String(horizonYears)}
              onValueChange={handleHorizonChange}
            >
              <SelectTrigger className="bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {HORIZON_OPTIONS.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y} Tahun
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>

        {/* Chart + footer */}
        <div>
          <PortofolioChart data={chartData} horizonYears={horizonYears} />

          <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="max-w-md text-xs italic text-muted-foreground">
              *Grafik membandingkan hasil jika kamu berinvestasi di{" "}
              <button
                type="button"
                onClick={handleOpenGlossary}
                className="font-bold text-violet-700 underline decoration-dotted underline-offset-2 transition-colors hover:text-violet-900"
              >
                {activeProductLabel}
              </button>{" "}
              dibanding hanya menabung biasa tanpa investasi.
            </p>

            <Link
              href="/privacy-policy"
              className="shrink-0 text-[10px] text-muted-foreground hover:underline"
            >
              Kebijakan Privasi Data
            </Link>
          </div>
        </div>

        <p className="w-full text-center text-[10px] uppercase tracking-widest text-gray-400">
          Bukan ajakan berinvestasi · Selalu lakukan riset mandiri
        </p>
      </div>

      {/* Glossary side panel */}
      <GlossaryPanel
        open={glossary.open}
        active={glossary.active}
        onClose={glossary.hide}
      />
    </Container>
  );
};

export default GuidedPortofolio;