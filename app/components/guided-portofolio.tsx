"use client";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InvestmentSimulationParams,
  InvestmentSimulationResult,
  simulateInvestments,
} from "@/lib/simulate-investments";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import * as z from "zod";

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

const formSchema = z.object({
  current_savings: z
    .number()
    .min(0, "Tabunganmu sekarang tidak bisa di bawah 0!"),
  savings_per_month: z
    .number()
    .min(0, "Investasimu per bulan tidak bisa di bawah 0!"),
  risk: z.enum(["high", "medium", "low"]),
  product: z.enum(["mixed", "mutual_fund", "stocks", "obligation"]),
});

const GuidedPortofolio = () => {
  // const [timeRange, setTimeRange] = useState<"1m" | "3m">("3m");
  // const date = new Date();
  const [chartData, setChartData] = useState<InvestmentSimulationResult[]>([]);

  const form = useForm({
    defaultValues: {
      current_savings: "" as unknown as number,
      savings_per_month: "" as unknown as number,
      risk: "",
      product: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmitInvalid: (err) => {
      console.error("An unexpected error occurred:", err);
    },
    onSubmit: async ({ value }) => {
      const simulatedData = simulateInvestments({
        currentSavings: value.current_savings,
        savingsPerMonth: value.savings_per_month,
        risk: value.risk as InvestmentSimulationParams["risk"],
        product: value.product as InvestmentSimulationParams["product"],
      });

      console.log(simulatedData);
      setChartData(simulatedData);
    },
  });

  return (
    <Container className="border-b-2 border-accent">
      <h2 className="text-4xl font-bold">
        Berapa yang bisa aku dompetin kalau...
      </h2>

      <div className="grid grid-cols-3 gap-4">
        <form
          id="guided_portofolio_form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="current_savings"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field
                    data-invalid={isInvalid}
                    className="flex flex-col gap-2"
                  >
                    <FieldLabel htmlFor={field.name}>
                      Tabunganku sekarang isinya
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id={field.name}
                        name={field.name}
                        type="number"
                        value={
                          isNaN(field.state.value) ? "" : field.state.value
                        }
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(e.target.valueAsNumber)
                        }
                        aria-invalid={isInvalid}
                        placeholder="15 000 000"
                        autoComplete="off"
                      />
                      <InputGroupAddon>Rp</InputGroupAddon>
                      <InputGroupAddon align={`inline-end`}>
                        IDR
                      </InputGroupAddon>
                    </InputGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="savings_per_month"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field
                    data-invalid={isInvalid}
                    className="flex flex-col gap-2"
                  >
                    <FieldLabel htmlFor={field.name}>
                      Mau nabung per bulan
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id={field.name}
                        name={field.name}
                        type="number"
                        value={
                          isNaN(field.state.value) ? "" : field.state.value
                        }
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(e.target.valueAsNumber)
                        }
                        aria-invalid={isInvalid}
                        placeholder="100 000"
                        autoComplete="off"
                      />
                      <InputGroupAddon>Rp</InputGroupAddon>
                      <InputGroupAddon align={`inline-end`}>
                        IDR
                      </InputGroupAddon>
                    </InputGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <div className="grid grid-cols-2 gap-4">
              <form.Field
                name="risk"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Risiko</FieldLabel>
                      <Select
                        name={field.name}
                        value={field.state.value}
                        onValueChange={field.handleChange}
                        aria-invalid={isInvalid}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih risiko" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">Tinggi</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Rendah</SelectItem>
                        </SelectContent>
                      </Select>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="product"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Produk</FieldLabel>
                      <Select
                        name={field.name}
                        value={field.state.value}
                        onValueChange={field.handleChange}
                        aria-invalid={isInvalid}
                      >
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
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </div>
          </FieldGroup>

          <Button
            type="submit"
            form="guided_portofolio_form"
            className="mt-4 w-full"
          >
            Hitung
          </Button>
        </form>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Lorem Ipsum Chart</CardTitle>
            <CardDescription>
              Visualizing your investment growth over time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
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
                <YAxis tickLine={false} axisLine={false} tickMargin={2} />
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
                <defs>
                  <linearGradient id="fillMoneyWithInvesting" x1="0" y1="0" x2="0" y2="1">
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
                  <linearGradient id="fillMoneyWithoutInvesting" x1="0" y1="0" x2="0" y2="1">
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
      </div>
    </Container>
  );
};

export default GuidedPortofolio;
