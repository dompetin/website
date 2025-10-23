"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { InvestmentSimulationResult } from "@/lib/simulate-investments";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  moneyWithInvestingMax: {
    label: "With Investing Max",
    color: "var(--primary)",
  },
  moneyWithInvestingMin: {
    label: "With Investing Min",
    color: "var(--primary)",
  },
  moneyWithoutInvesting: {
    label: "Without Investing",
    color: "var(--black)",
  },
} satisfies ChartConfig;

const PortofolioChart = ({ data }: { data: InvestmentSimulationResult[] }) => {
  const [latestDataPoint, setLatestDataPoint] =
    useState<InvestmentSimulationResult>({
      year: 0,
      moneyWithInvestingMax: 0,
      moneyWithInvestingMin: 0,
      moneyWithoutInvesting: 0,
    });

  useEffect(() => {
    if (data.length > 0) {
      setLatestDataPoint(data[data.length - 1]);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center gap-2 mt-6">
        <p className="text-sm">
          Uang yang kamu dompetin selama{" "}
          <span className="font-bold">25 tahun</span>
        </p>

        <div className="flex max-sm:flex-col gap-2 items-center">
          <Card>
            <CardContent className="text-sm">
              Jika diinvestasikan menjadi{" "}
              <p className="text-lg text-primary font-bold">
                Rp{" "}
                {(latestDataPoint.moneyWithInvestingMin / 10 ** 6).toFixed(1)} -{" "}
                {(latestDataPoint.moneyWithInvestingMax / 10 ** 6).toFixed(1)}{" "}
                jt
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="text-sm">
              Jika ditabung biasa{" "}
              <p className="text-lg font-bold">
                Rp{" "}
                {(latestDataPoint.moneyWithoutInvesting / 10 ** 6).toFixed(1)}{" "}
                jt
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="aspect-video w-full">
        <AreaChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={false}
            tickMargin={2}
          />
          <YAxis
            orientation="right"
            tickLine={false}
            axisLine={false}
            tickMargin={2}
            tickFormatter={(value) =>
              formatCurrency(value / 10 ** 6, "decimal") + " jt"
            }
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" hideLabel />}
          />
          <Area
            dataKey="moneyWithInvestingMax"
            type="natural"
            // fill="url(#fillMoneyWithInvesting)"
            fill="var(--color-primary)"
            fillOpacity={0.4}
            stroke="var(--color-primary)"
          />
          <Area
            dataKey="moneyWithInvestingMin"
            type="natural"
            // fill="url(#fillMoneyWithInvesting)"
            fill="var(--color-white)"
            fillOpacity={1}
            stroke="var(--color-primary)"
          />
          <Area
            dataKey="moneyWithoutInvesting"
            type="natural"
            // fill="url(#fillMoneyWithoutInvesting)"
            fill="var(--color-white)"
            fillOpacity={1}
            stroke={"var(--color-black)"}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default PortofolioChart;
