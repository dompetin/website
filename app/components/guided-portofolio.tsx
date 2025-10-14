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
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import * as z from "zod";

const chartConfig = {
  withInvesting: {
    label: "With Investing",
    color: "var(--primary)",
  },
  withoutInvesting: {
    label: "Without Investing",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

const formSchema = z.object({
  current_savings: z.number().min(1),
  savings_per_month: z.number().min(1),
  risk: z.enum(["high", "medium", "low"]),
  product: z.enum(["mixed", "mutual_fund", "stocks", "obligation"]),
});

const GuidedPortofolio = () => {
  // const [timeRange, setTimeRange] = useState<"1m" | "3m">("3m");
  // const date = new Date();
  const [chartData, setChartData] = useState<
    {
      year: string;
      withInvesting: number;
      withoutInvesting: number;
    }[]
  >([]);

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
      const newChartData: {
        year: string;
        withInvesting: number;
        withoutInvesting: number;
      }[] = [];

      // generate new data (dummy data for now)
      for (let year = 2025; year <= 2030; year++) {
        let investedValue, nonInvestedValue;
        if (year === 2025) {
          investedValue = value.current_savings;
          nonInvestedValue = value.current_savings;
        } else {
          investedValue =
            newChartData[newChartData.length - 1].withInvesting * 1.1 +
            value.savings_per_month * 12;
          nonInvestedValue =
            newChartData[newChartData.length - 1].withoutInvesting * 0.95 +
            value.savings_per_month * 12;
        }

        newChartData.push({
          year: year.toString(),
          withInvesting: Math.trunc(investedValue),
          withoutInvesting: Math.trunc(nonInvestedValue),
        });
      }

      setChartData(newChartData);
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
          }}>
          <FieldGroup>
            <form.Field
              name="current_savings"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field
                    data-invalid={isInvalid}
                    className="flex flex-col gap-2">
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
                    className="flex flex-col gap-2">
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
                        aria-invalid={isInvalid}>
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
                        aria-invalid={isInvalid}>
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
            className="mt-4 w-full">
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
                }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={2}
                  tickFormatter={(value) => value.slice(0, 4)}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={2} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="withInvesting"
                  type="natural"
                  fill="var(--color-withInvesting)"
                  fillOpacity={0.4}
                  stroke="var(--color-withInvesting)"
                />
                <Area
                  dataKey="withoutInvesting"
                  type="natural"
                  fill="var(--color-withoutInvesting)"
                  fillOpacity={0.4}
                  stroke="var(--color-withoutInvesting)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default GuidedPortofolio;
