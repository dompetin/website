"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/container";
import {
  Field,
  FieldDescription,
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
import {
  InvestmentSimulationResult,
  simulateInvestments,
} from "@/lib/simulate-investments";
import PortofolioChart from "./portofolio-chart";

// INTEGRASI GLOSSARY
import { useGlossary, GlossaryTerm, GlossaryPanel } from "./glossary";
import { GlossaryKey } from "@/lib/glossary";

const GuidedPortofolio = () => {
  // Hook untuk glossary
  const glossary = useGlossary();

  const [formData, setFormData] = useState<{
    currentSavings: string;
    savingsPerMonth: string;
    product: "stocks" | "mutual_fund" | "obligation" | "deposit" | "gold";
  }>({
    currentSavings: "1000000",
    savingsPerMonth: "100000",
    product: "mutual_fund",
  });
  
  const [horizonYears, setHorizonYears] = useState(10);
  const [chartData, setChartData] = useState<InvestmentSimulationResult[]>([]);

  useEffect(() => {
    const newChartData = simulateInvestments({
      currentSavings: Number(formData.currentSavings),
      savingsPerMonth: Number(formData.savingsPerMonth),
      product: formData.product,
      horizonYears,
    });

    setChartData(newChartData);
  }, [formData, horizonYears]);

  return (
    <Container className="border-accent max-w-5xl border-b-2 pb-16">
      {/* IMPROVED COPYWRITING */}
      <div className="mb-10">
        <h2 className="text-5xl font-extrabold tracking-tight">
          Berapa yang bisa aku simpan kalau...
        </h2>
        <p className="text-muted-foreground mt-4 text-lg">
          Lihat potensi pertumbuhan uangmu dengan memilih instrumen yang tepat. 
          Klik istilah yang kamu belum tahu untuk belajar.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <FieldGroup className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-4 bg-muted/30 p-6 rounded-3xl border border-muted">
          <Field>
            <FieldLabel>Uang Dingin Saat Ini</FieldLabel>
            <InputGroup>
              <InputGroupMaskInput
                name={"current_savings"}
                mask={"currency"}
                currency={"IDR"}
                locale={"id-ID"}
                value={formData.currentSavings}
                onValueChange={(_, v) => setFormData((prev) => ({ ...prev, currentSavings: v }))}
              />
              <InputGroupAddon align={`inline-end`}>IDR</InputGroupAddon>
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel>Nabung Tiap Bulan</FieldLabel>
            <InputGroup>
              <InputGroupMaskInput
                name={"savings_per_month"}
                mask={"currency"}
                currency={"IDR"}
                locale={"id-ID"}
                value={formData.savingsPerMonth}
                onValueChange={(_, v) => setFormData((prev) => ({ ...prev, savingsPerMonth: v }))}
              />
              <InputGroupAddon align={`inline-end`}>IDR</InputGroupAddon>
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel>Pilihan Produk</FieldLabel>
            <Select
              name={`product`}
              value={formData.product}
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  product: value as unknown,
                }));
              }}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Pilih produk" />
              </SelectTrigger>
              <SelectContent>
                {/* INJEKSI GLOSSARY PADA TIAP ITEM */}
                <SelectItem value="mutual_fund">
                   <GlossaryTerm term="reksa_dana" onClick={glossary.show}>Reksadana</GlossaryTerm>
                </SelectItem>
                <SelectItem value="stocks">
                   <GlossaryTerm term="saham" onClick={glossary.show}>Saham</GlossaryTerm>
                </SelectItem>
                <SelectItem value="obligation">
                   <GlossaryTerm term="obligasi" onClick={glossary.show}>Obligasi</GlossaryTerm>
                </SelectItem>
                <SelectItem value="deposit">
                   Deposito
                </SelectItem>
                <SelectItem value="gold">
                   Emas
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Selama...</FieldLabel>
            <Select
              name="horizon_years"
              value={String(horizonYears)}
              onValueChange={(value) => setHorizonYears(Number(value))}
            >
              <SelectTrigger className="bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 15, 20, 25].map(y => (
                   <SelectItem key={y} value={String(y)}>{y} Tahun</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>

        {/* CHART SECTION */}
        <div className="relative">
          <PortofolioChart data={chartData} horizonYears={horizonYears} />
          
          {/* MICROCOPY DI BAWAH CHART */}
          <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-xs text-muted-foreground max-w-md italic">
              *Grafik ini membandingkan hasil jika kamu melakukan investasi pada{" "}
              <GlossaryTerm term={formData.product === "mutual_fund" ? "reksa_dana" : (formData.product as GlossaryKey)} onClick={glossary.show}>
                {formData.product.replace('_', ' ')}
              </GlossaryTerm>{" "} 
              dibanding hanya menabung biasa di bawah kasur.
            </p>
            
            <Link href={`/privacy-policy`} className="text-[10px] text-muted-foreground hover:underline">
              Kebijakan Privasi Data
            </Link>
          </div>
        </div>

        <p className="mt-4 w-full text-[10px] uppercase tracking-widest text-gray-400 text-center">
          Bukan ajakan berinvestasi · Selalu lakukan riset mandiri
        </p>
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

export default GuidedPortofolio;