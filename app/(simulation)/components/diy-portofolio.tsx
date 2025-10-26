"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
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
  SIMULATION_HORIZON_YEARS,
  analyzeCustomPortfolio,
  assetCatalog,
  AssetType,
  simulateCustomPortfolio,
} from "@/lib/custom-portfolio";
import { InvestmentSimulationResult } from "@/lib/simulate-investments";
import { generateRowId } from "@/lib/utils";
import { PlusCircle } from "lucide-react";

type AssetAllocationRow = {
  id: string;
  type: AssetType;
  percentage: string;
};

const INITIAL_ASSETS: AssetAllocationRow[] = [
  { id: "asset-0", type: "reksadana_pasar_uang", percentage: "60" },
  { id: "asset-1", type: "obligasi", percentage: "40" },
];

const DiyPortofolio = () => {
  const [assets, setAssets] = useState<AssetAllocationRow[]>(INITIAL_ASSETS);
  const [formData, setFormData] = useState<{
    currentSavings: string;
    savingsPerMonth: string;
  }>({
    currentSavings: "1000000",
    savingsPerMonth: "100000",
  });
  const [chartData, setChartData] = useState<InvestmentSimulationResult[]>([]);
  const latestProjection = chartData.length
    ? chartData[chartData.length - 1]
    : null;

  const allocationStats = useMemo(() => {
    return assets.reduce(
      (acc, assetRow) => {
        const percentage = Number(assetRow.percentage) || 0;
        const asset = assetCatalog[assetRow.type];

        const weight = percentage / 100;

        acc.totalPercentage += percentage;
        acc.minReturn += weight * asset.minReturn;
        acc.maxReturn += weight * asset.maxReturn;

        return acc;
      },
      { totalPercentage: 0, minReturn: 0, maxReturn: 0 }
    );
  }, [assets]);

  const totalAllocation = allocationStats.totalPercentage;
  const totalAllocationRounded = Number(totalAllocation.toFixed(2));
  const allocationIsValid = Math.abs(totalAllocationRounded - 100) <= 0.1;
  const { minReturn, maxReturn } = allocationStats;

  const portfolioAnalysis = useMemo(() => {
    const allocation = assets.map((assetRow) => ({
      type: assetRow.type,
      percentage: Number(assetRow.percentage) || 0,
    }));

    return analyzeCustomPortfolio({
      allocation,
      allocationIsValid,
      minReturn,
      maxReturn,
    });
  }, [allocationIsValid, assets, maxReturn, minReturn]);

  const totalDeposited = useMemo(() => {
    const currentSavings = Number(formData.currentSavings) || 0;
    const savingsPerMonth = Number(formData.savingsPerMonth) || 0;
    return currentSavings + savingsPerMonth * 12 * SIMULATION_HORIZON_YEARS;
  }, [formData]);

  useEffect(() => {
    const currentSavings = Number(formData.currentSavings) || 0;
    const savingsPerMonth = Number(formData.savingsPerMonth) || 0;

    if (
      !allocationIsValid ||
      Number.isNaN(currentSavings) ||
      Number.isNaN(savingsPerMonth)
    ) {
      setChartData([]);
      return;
    }

    const results = simulateCustomPortfolio({
      currentSavings,
      savingsPerMonth,
      minReturn,
      maxReturn,
    });

    setChartData(results);
  }, [allocationIsValid, formData, maxReturn, minReturn]);

  const handleAssetTypeChange = (id: string, type: AssetType) => {
    setAssets((prev) =>
      prev.map((row) => (row.id === id ? { ...row, type } : row))
    );
  };

  const handleAssetPercentageChange = (id: string, rawValue: string) => {
    const sanitizedValue = rawValue.replace(/[^0-9.]/g, "");
    setAssets((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, percentage: sanitizedValue } : row
      )
    );
  };

  const handleAddAsset = () => {
    setAssets((prev) => [
      ...prev,
      {
        id: `asset-${generateRowId()}`,
        type: "reksadana_pasar_uang",
        percentage: "0",
      },
    ]);
  };

  return (
    <Container className="border-b-2 max-w-7xl mt-20 border-accent">
      <h2 className="text-5xl font-bold">
        Mau Coba Bikin Portfoliomu Sendiri?
      </h2>

      <div className="flex flex-col md:flex-row gap-6 justify-between w-full mt-6">
        <div className="flex flex-col w-full gap-6 ">
          <FieldGroup className="flex flex-row flex-wrap gap-3">
            <Field className="flex-1">
              <FieldLabel>Portofolioku isinya</FieldLabel>
              <FieldContent>
                <InputGroup>
                  <InputGroupMaskInput
                    name="custom_current_savings"
                    mask="currency"
                    currency="IDR"
                    locale="id-ID"
                    placeholder="Rp 1.000.000"
                    value={formData.currentSavings}
                    autoComplete="off"
                    onValueChange={(_, unmaskedValue) => {
                      setFormData((prev) => ({
                        ...prev,
                        currentSavings: unmaskedValue,
                      }));
                    }}
                  />
                  <InputGroupAddon align="inline-end">IDR</InputGroupAddon>
                </InputGroup>
              </FieldContent>
            </Field>

            <Field className="flex-1">
              <FieldLabel>Mau nabung per bulan</FieldLabel>
              <FieldContent>
                <InputGroup>
                  <InputGroupMaskInput
                    name="custom_savings_per_month"
                    mask="currency"
                    currency="IDR"
                    locale="id-ID"
                    placeholder="Rp 100.000"
                    value={formData.savingsPerMonth}
                    autoComplete="off"
                    onValueChange={(_, unmaskedValue) => {
                      setFormData((prev) => ({
                        ...prev,
                        savingsPerMonth: unmaskedValue,
                      }));
                    }}
                  />
                  <InputGroupAddon align="inline-end">IDR</InputGroupAddon>
                </InputGroup>
              </FieldContent>
            </Field>
          </FieldGroup>

          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel>Komposisi aset</FieldLabel>
              <FieldContent>
                <div className="flex flex-col gap-4">
                  {assets.map((assetRow, index) => (
                    <div
                      key={assetRow.id}
                      className="flex flex-col gap-2 md:flex-row md:items-center">
                      <div className="flex-1">
                        <Select
                          name={`asset_type_${assetRow.id}`}
                          value={assetRow.type}
                          onValueChange={(value) =>
                            handleAssetTypeChange(
                              assetRow.id,
                              value as AssetType
                            )
                          }>
                          <SelectTrigger className="w-full bg-muted text-muted-foreground border-0 justify-center ">
                            <SelectValue
                              placeholder={`Pilih aset ${index + 1}`}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(assetCatalog).map(
                              ([value, data]) => (
                                <SelectItem key={value} value={value}>
                                  {data.label}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-full md:w-[100px]">
                        <InputGroup>
                          <InputGroupInput
                            type="number"
                            inputMode="decimal"
                            min={0}
                            max={100}
                            step="0.1"
                            value={assetRow.percentage}
                            placeholder="0"
                            onChange={(event) =>
                              handleAssetPercentageChange(
                                assetRow.id,
                                event.target.value
                              )
                            }
                          />
                          <InputGroupAddon align="inline-end">
                            %
                          </InputGroupAddon>
                        </InputGroup>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80"
                    onClick={handleAddAsset}>
                    <PlusCircle />
                    add item
                  </Button>
                  <span
                    className={`text-sm ${
                      allocationIsValid
                        ? "text-muted-foreground"
                        : "text-destructive font-medium"
                    }`}>
                    Total: {totalAllocationRounded.toFixed(2)}%
                  </span>
                </div>

                {!allocationIsValid && (
                  <FieldError className="pt-1">
                    Total persentase harus 100% supaya simulasi bekerja.
                  </FieldError>
                )}
              </FieldContent>
            </Field>
          </FieldGroup>
        </div>
        <PortofolioChart data={chartData} />
      </div>

      <DiyPortfolioInsight
        analysis={portfolioAnalysis}
        latestProjection={latestProjection}
        totalDeposited={totalDeposited}
        horizonYears={SIMULATION_HORIZON_YEARS}
      />
    </Container>
  );
};

export default DiyPortofolio;
