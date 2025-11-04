"use client";

import { Button } from "@/components/ui/button";
import { useQuizStore } from "../store/quiz-store";
import { resultDescriptions } from "../constants/results";
import Container from "@/components/container";
import Image from "next/image";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Footer } from "../../(with-default-layout)/components/footer";
import Link from "next/link";
import * as m from "@/lib/motion";

const getAssetImage = (asset: string, index: number): string => {
  const assetKey = asset.toLowerCase().replace(/\s+/g, "-");
  return `/survey/${assetKey}-${index + 1}.png`;
};

export function ResultScreen() {
  const { getResult, getNumericResult } = useQuizStore();
  const category = getResult();
  const numeric = getNumericResult();
  const result = resultDescriptions[category];

  const chartData = result.portfolio.map((item) => ({
    name: item.asset,
    value: item.percentage,
    color: item.color,
  }));

  return (
    <main className="bg-white">
      <section className="relative mt-48 flex max-h-screen min-h-[30rem] flex-col rounded-b-[5rem] bg-gradient-to-t from-purple-300 to-transparent xl:mt-96">
        <Image
          src="/pattern.png"
          alt="Background Image"
          quality={100}
          width={1920}
          height={1080}
          className="absolute inset-0 top-auto rounded-b-[5rem] object-cover"
        />

        {/* Character image ditempatkan di luar ellipse */}
        <m.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-32 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 sm:bottom-40 md:bottom-44 lg:bottom-50"
        >
          <Image
            src={`/survey/${
              numeric >= 1 && numeric <= 3
                ? "1-3"
                : numeric >= 4 && numeric <= 6
                  ? "4-6"
                  : numeric >= 7 && numeric <= 10
                    ? "7-10"
                    : "default"
            }.png`}
            alt="Investor Character"
            width={350}
            height={350}
            quality={100}
            className="h-[200px] w-[200px] drop-shadow-xl sm:h-[250px] sm:w-[250px] lg:h-[300px] lg:w-[300px] xl:h-[350px] xl:w-[350px]"
          />
        </m.div>

        {/* Background purple dengan ellipse */}
        <div
          className="relative z-10 mt-auto flex min-h-[30vh] items-end justify-center rounded-b-xl bg-[#601679] text-center sm:min-h-[20rem] md:min-h-[40dvh] lg:min-h-[45dvh] xl:min-h-[30rem] xl:rounded-b-[5rem]"
          style={{ clipPath: "ellipse(57% 65% at 50% 69%)" }}
        >
          <Container className="pb-8 text-center text-white sm:pb-12 lg:pb-16">
            <m.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="text-base text-purple-300 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
            >
              Kamu adalah...
            </m.h1>
            <m.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="-mt-3 text-3xl font-bold text-white sm:mt-3 sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl"
            >
              Investor {result.title}
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
              className="mx-auto max-w-2xl px-4 text-xs leading-relaxed text-pretty text-white/90 sm:mt-6 sm:text-sm md:text-base lg:mt-8 lg:text-lg xl:max-w-3xl xl:text-lg"
            >
              {result.description}
            </m.p>
          </Container>
        </div>
      </section>

      {/* Portfolio Section */}
      <Container className="flex flex-col items-center justify-center py-12">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 text-center"
        >
          <h2 className="mb-2 text-2xl font-bold text-gray-800 lg:text-3xl">
            Portfolio yang Cocok Untukmu
          </h2>
          <p className="text-gray-600">Level resiko: {result.level}</p>
        </m.div>

        <div className="grid w-full max-w-lg grid-cols-1 items-center justify-center gap-8 sm:min-w-lg lg:max-w-none lg:grid-cols-2 lg:gap-12">
          {/* Donut Chart */}
          <m.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mx-auto h-64 w-64 lg:h-96 lg:w-96"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="90%"
                  paddingAngle={0}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </m.div>

          {/* Portfolio Legend */}
          <div className="space-y-4">
            <m.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="flex w-full items-center justify-between"
            >
              <p>Jenis Aset</p>
              <p>Alokasi Dana</p>
            </m.div>
            {result.portfolio.map((item, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + index * 0.1,
                  ease: "easeOut",
                }}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center justify-center gap-2">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="font-medium text-gray-800">{item.asset}</div>
                </div>

                <div className="text-lg font-bold text-purple-600">
                  {item.percentage}%
                </div>
              </m.div>
            ))}
            <div className="mt-8">
              <p className="mb-4 font-bold">
                Mau coba bikin portfoliomu sendiri?
              </p>
              {/*<Button
                size="lg"
                className="rounded-full bg-[#A267DD] px-8 py-3 text-lg font-semibold text-white hover:bg-purple-700"
                onClick={() => (window.location.href = "/simulasi-portofolio")}
              >
                Simulasikan sekarang!
              </Button>*/}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
              >
                <Button
                  size={"xl"}
                  className="w-fit text-xl font-semibold max-md:mt-8"
                  asChild
                >
                  <Link href="/simulasi-portofolio">Simulasikan sekarang!</Link>
                </Button>
              </m.div>
            </div>
          </div>
        </div>
        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
          className="mt-4 w-full max-w-lg text-xs text-gray-400 sm:min-w-lg lg:max-w-none"
        >
          *Bukan ajakan berinvestasi, selalu lakukan riset sendiri sebelum
          mengambil keputusan finansial
        </m.p>
      </Container>

      {/* Asset Learning Section */}
      {/* Asset Learning Section */}
      <Container className="py-12">
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 text-2xl font-bold text-gray-800 lg:text-3xl"
        >
          Yuk pelajari aset berikut!
        </m.h2>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
                ease: "easeOut",
              },
            },
          }}
          className="flex flex-wrap items-center justify-center gap-6 lg:grid lg:grid-cols-3 lg:gap-10"
        >
          {result.recommendations.map((asset, index) => {
            const assetKey = asset.toLowerCase().replace(/\s+/g, "-");
            const assetSlug = assetKey.includes("reksadana")
              ? "reksadana"
              : assetKey;

            return (
              <m.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: "easeOut" },
                  },
                }}
                className="will-change-opacity flex items-end transition-transform duration-300 will-change-transform hover:scale-102"
              >
                <Link href={`/akademi/${assetSlug}`}>
                  <Image
                    src={getAssetImage(asset, index)}
                    alt={`${asset} illustration`}
                    width={550}
                    height={520}
                    quality={100}
                    className="w-full rounded-lg"
                  />
                </Link>
              </m.div>
            );
          })}
        </m.div>
      </Container>

      <Footer />
    </main>
  );
}
