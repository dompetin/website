"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
import {
  InvestmentSimulationResult,
  simulateInvestments,
} from "@/lib/simulate-investments";
import PortofolioChart from "./portofolio-chart";

// INTEGRASI GLOSSARY
import { useGlossary, GlossaryPanel } from "../components/glossary/glossary";
import { GlossaryKey } from "@/lib/glossary";
import { Info } from "lucide-react";

// Definisikan tipe produk agar konsisten dengan lib/simulate-investments
type ProductType = "stocks" | "mutual_fund" | "obligation" | "deposit" | "gold";

// Pemetaan dari ProductType ke GlossaryKey agar side panel muncul dengan benar
const PRODUCT_TO_GLOSSARY: Record<ProductType, GlossaryKey> = {
  mutual_fund: "reksa_dana",
  stocks: "saham",
  obligation: "obligasi",
  deposit: "deposito",
  gold: "emas",
};

const GuidedPortofolio = () => {
  const glossary = useGlossary();

  const [formData, setFormData] = useState<{
    currentSavings: string;
    savingsPerMonth: string;
    product: ProductType;
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
      <div className="mb-10">
        <h2 className="text-5xl font-extrabold tracking-tight">
          Berapa yang bisa aku simpan kalau...
        </h2>
        <p className="text-muted-foreground mt-4 text-lg">
          Lihat potensi pertumbuhan uangmu dengan memilih instrumen yang tepat. 
          Gunakan ikon <Info className="inline w-4 h-4" /> untuk belajar istilahnya.
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
            <div className="flex items-center justify-between mb-2">
              <FieldLabel className="mb-0">Pilihan Produk</FieldLabel>
              <button 
                onClick={() => glossary.show(PRODUCT_TO_GLOSSARY[formData.product])}
                className="text-purple-600 hover:text-purple-800 transition-colors"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
            <Select
              name={`product`}
              value={formData.product}
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  product: value as ProductType,
                }));
              }}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Pilih produk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mutual_fund">Reksa Dana</SelectItem>
                <SelectItem value="stocks">Saham</SelectItem>
                <SelectItem value="obligation">Obligasi</SelectItem>
                <SelectItem value="deposit">Deposito</SelectItem>
                <SelectItem value="gold">Emas</SelectItem>
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

        <div className="relative">
          <PortofolioChart data={chartData} horizonYears={horizonYears} />
          
          <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-xs text-muted-foreground max-w-md italic">
              *Grafik ini membandingkan hasil jika kamu melakukan investasi pada{" "}
              <button 
                onClick={() => glossary.show(PRODUCT_TO_GLOSSARY[formData.product])}
                className="font-bold text-purple-700 underline decoration-dotted underline-offset-2 hover:text-purple-900 transition-colors"
              >
                {formData.product === "mutual_fund" ? "Reksa Dana" : formData.product.replace('_', ' ')}
              </button>{" "} 
              dibanding hanya menabung biasa di bawah kasur.
            </div>
            
            <Link href={`/privacy-policy`} className="text-[10px] text-muted-foreground hover:underline">
              Kebijakan Privasi Data
            </Link>
          </div>
        </div>

        <p className="mt-4 w-full text-[10px] uppercase tracking-widest text-gray-400 text-center">
          Bukan ajakan berinvestasi · Selalu lakukan riset mandiri
        </p>
      </div>

      <GlossaryPanel
        open={glossary.open}
        active={glossary.active}
        onClose={glossary.hide}
      />
    </Container>
  );
};

export default GuidedPortofolio;