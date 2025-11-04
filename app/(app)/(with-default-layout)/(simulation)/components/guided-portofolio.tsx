"use client";
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
import { useEffect, useState } from "react";
import PortofolioChart from "./portofolio-chart";
import Link from "next/link";

const GuidedPortofolio = () => {
  const [formData, setFormData] = useState<{
    currentSavings: string;
    savingsPerMonth: string;
    product: "stocks" | "mutual_fund" | "obligation" | "deposit" | "gold";
  }>({
    currentSavings: "1000000",
    savingsPerMonth: "100000",
    product: "mutual_fund",
  });
  const [horizonYears, setHorizonYears] = useState(25);
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
    <Container className="border-accent max-w-4xl border-b-2">
      <h2 className="text-5xl font-bold">
        Berapa yang bisa aku dompetin kalau...
      </h2>

      <div className="flex flex-col gap-4">
        <FieldGroup className="grid grid-cols-1 items-start justify-center gap-2 sm:grid-cols-2 md:grid-cols-4">
          <Field>
            <FieldLabel>Tabunganku isinya</FieldLabel>
            <InputGroup>
              <InputGroupMaskInput
                name={"current_savings"}
                mask={"currency"}
                currency={"IDR"}
                locale={"id-ID"}
                placeholder={"Rp 1.000.000"}
                value={formData.currentSavings}
                autoComplete="off"
                onValueChange={(_, unmaskedValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    currentSavings: unmaskedValue,
                  }));
                }}
              />
              <InputGroupAddon align={`inline-end`}>IDR</InputGroupAddon>
            </InputGroup>
            <FieldDescription>
              <Link href={`/privacy-policy`} className="underline text-xs">
                Cek kebijakan privasi kami
              </Link>
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Mau nabung per bulan</FieldLabel>
            <InputGroup>
              <InputGroupMaskInput
                name={"savings_per_month"}
                mask={"currency"}
                currency={"IDR"}
                locale={"id-ID"}
                value={formData.savingsPerMonth}
                placeholder={"Rp 100.000"}
                autoComplete="off"
                onValueChange={(_, unmaskedValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    savingsPerMonth: unmaskedValue,
                  }));
                }}
              />
              <InputGroupAddon align={`inline-end`}>IDR</InputGroupAddon>
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel>Produk</FieldLabel>
            <Select
              name={`product`}
              value={formData.product}
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  product: value as
                    | "stocks"
                    | "mutual_fund"
                    | "obligation"
                    | "deposit"
                    | "gold",
                }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih produk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mutual_fund">Reksadana</SelectItem>
                <SelectItem value="stocks">Saham</SelectItem>
                <SelectItem value="obligation">Obligasi</SelectItem>
                <SelectItem value="deposit">Deposito</SelectItem>
                <SelectItem value="gold">Emas</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Jangka waktu</FieldLabel>
            <Select
              name="horizon_years"
              value={String(horizonYears)}
              onValueChange={(value) => setHorizonYears(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih jangka waktu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 tahun</SelectItem>
                <SelectItem value="10">10 tahun</SelectItem>
                <SelectItem value="15">15 tahun</SelectItem>
                <SelectItem value="20">20 tahun</SelectItem>
                <SelectItem value="25">25 tahun</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>

        <PortofolioChart data={chartData} horizonYears={horizonYears} />
        <p className="mt-4 w-full max-w-lg text-xs text-gray-400 sm:min-w-lg lg:max-w-none">
          *Bukan ajakan berinvestasi, selalu lakukan riset sendiri sebelum
          mengambil keputusan finansial
        </p>
      </div>
    </Container>
  );
};

export default GuidedPortofolio;
