"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  moneyWithInvesting: {
    label: "With Investing",
    color: "var(--primary)",
  },
  moneyWithoutInvesting: {
    label: "Without Investing",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const PortofolioChart = ({ data }: { data: any[] }) => {
  const [savedMoney, setSavedMoney] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (data.length > 0) {
      const latestDataPoint = data[data.length - 1];
      setSavedMoney(
        latestDataPoint.moneyWithInvesting -
        latestDataPoint.moneyWithoutInvesting,
      );
    }
  }, [data]);

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardDescription>
          {savedMoney && (
            <>
              Dalam 5 tahun, kamu bisa menabung sebanyak{" "}
              <span className="font-bold">{formatCurrency(savedMoney)}</span>!
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={2}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={2}
              tickFormatter={(value) => formatCurrency(value, "decimal")}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="moneyWithInvesting"
              type="natural"
              fill="url(#fillMoneyWithInvesting)"
              fillOpacity={0.4}
              stroke="var(--color-moneyWithInvesting)"
            />
            <Area
              dataKey="moneyWithoutInvesting"
              type="natural"
              fill="url(#fillMoneyWithoutInvesting)"
              fillOpacity={0.4}
              stroke="var(--color-moneyWithoutInvesting)"
            />
            <ChartLegend content={<ChartLegendContent />} />
            <defs>
              <linearGradient
                id="fillMoneyWithInvesting"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id="fillMoneyWithoutInvesting"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-destructive)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desctructive)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PortofolioChart;
