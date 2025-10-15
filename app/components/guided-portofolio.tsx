"use client";
import Container from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
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
import { useEffect, useState } from "react";
import PortofolioChart from "./portofolio-chart";

const GuidedPortofolio = () => {
  const [formData, setFormData] = useState<{
    currentSavings: string;
    savingsPerMonth: string;
    risk: "low" | "medium" | "high";
    product: "mixed" | "stocks" | "mutual_fund" | "obligation";
  }>({
    currentSavings: "1000000",
    savingsPerMonth: "100000",
    risk: "medium",
    product: "mixed",
  });
  const [chartData, setChartData] = useState<InvestmentSimulationResult[]>([]);

  useEffect(() => {
    const newChartData = simulateInvestments({
      currentSavings: Number(formData.currentSavings),
      savingsPerMonth: Number(formData.savingsPerMonth),
      risk: formData.risk,
      product: formData.product,
    });

    setChartData(newChartData);
    console.log("chart data: ", chartData);
  }, [formData]);

  return (
    <Container className="border-b-2 border-accent">
      <h2 className="text-4xl font-bold">
        Berapa yang bisa aku dompetin kalau...
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="h-full">
            <FieldGroup>
              <Field className="flex flex-col gap-2">
                <FieldLabel>Tabunganku sekarang isinya</FieldLabel>
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
              </Field>

              <Field className="flex flex-col gap-2">
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

              <div className="grid grid-cols-2 gap-2">
                <Field>
                  <FieldLabel>Risiko</FieldLabel>
                  <Select
                    name={"risk"}
                    value={formData.risk}
                    onValueChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        risk: value as "low" | "medium" | "high",
                      }));
                    }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih risiko" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Tinggi</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Rendah</SelectItem>
                    </SelectContent>
                  </Select>
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
                          | "mixed"
                          | "stocks"
                          | "mutual_fund"
                          | "obligation",
                      }));
                    }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih produk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mixed">Campur</SelectItem>
                      <SelectItem value="mutual_fund">Reksadana</SelectItem>
                      <SelectItem value="stocks">Saham</SelectItem>
                      <SelectItem value="obligation">Obligasi</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>

        <PortofolioChart data={chartData} />
      </div>
    </Container>
  );
};

export default GuidedPortofolio;
