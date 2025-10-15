"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const PortofolioChart = ({ data }: { data: any[] }) => {
  const [savedMoney, setSavedMoney] = useState<number | undefined>(undefined);
  const [timeRange, setTimeRange] = useState<string>("5y");

  useEffect(() => {
    if (data.length > 0) {
      const latestDataPoint = data[data.length - 1];
      if (
        "moneyWithInvesting" in latestDataPoint &&
        "moneyWithoutInvesting" in latestDataPoint
      ) {
        setSavedMoney(
          latestDataPoint.moneyWithInvesting -
          latestDataPoint.moneyWithoutInvesting,
        );
      }
    }
  }, [data]);

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardDescription>
          {savedMoney ? (
            <>
              Dalam 5 tahun, kamu bisa menabung sebanyak{" "}
              <span className="font-bold">{formatCurrency(savedMoney)}</span>!
            </>
          ) : (
            <>Ayo mulai menabung dan blablabla!</>
          )}
        </CardDescription>
        <CardAction>
          <Select defaultValue="5y">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih jangka waktu" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Jangka waktu</SelectLabel>
                <SelectItem value="1y">1 thn</SelectItem>
                <SelectItem value="3y">3 thn</SelectItem>
                <SelectItem value="5y">5 thn</SelectItem>
                <SelectItem value="10y">10 thn</SelectItem>
                <SelectItem value="25y">25 thn</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardAction>
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
              dataKey="moneyWithoutInvesting"
              type="natural"
              fill="url(#fillMoneyWithoutInvesting)"
              // fill="var(--color-moneyWithoutInvesting)"
              fillOpacity={0.4}
              stroke="var(--color-moneyWithoutInvesting)"
              stackId={"a"}
            />
            <Area
              dataKey="moneyWithInvesting"
              type="natural"
              fill="url(#fillMoneyWithInvesting)"
              // fill="var(--color-moneyWithInvesting)"
              fillOpacity={0.4}
              stroke="var(--color-moneyWithInvesting)"
              stackId={"a"}
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
                  stopColor="var(--color-white)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-white)"
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
