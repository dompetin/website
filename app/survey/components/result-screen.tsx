"use client";

import { Button } from "@/components/ui/button";
import { useQuizStore } from "../store/quiz-store";
import { resultDescriptions } from "../constants/results";
import Container from "@/components/container";
import Image from "next/image";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const getAssetImage = (asset: string, index: number): string => {
  const assetKey = asset.toLowerCase().replace(/\s+/g, "-");
  return `/survey/${assetKey}-${index + 1}.png`;
};

export function ResultScreen() {
  const { getResult, getNumericResult, reset } = useQuizStore();
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
      <section className="relative bg-gradient-to-t from-purple-300 to-transparent flex flex-col mt-48 xl:mt-96 rounded-b-[5rem] max-h-screen">
        <Image
          src="/pattern.png"
          alt="Background Image"
          quality={100}
          width={1920}
          height={1080}
          className="absolute inset-0 object-cover bottom-50 top-auto"
        />

        {/* Character image ditempatkan di luar ellipse */}
        <div className="absolute bottom-54 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
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
            className="drop-shadow-xl"
          />
        </div>

        {/* Background purple dengan ellipse */}
        <div
          className="mt-auto text-center bg-[#601679] min-h-[30dvh] lg:min-h-[50dvh] flex justify-center items-end relative z-10 rounded-b-xl xl:rounded-b-[5rem]"
          style={{ clipPath: "ellipse(57% 65% at 50% 69%)" }}
        >
          <Container className="text-center text-white pb-18">
            <h1 className="text-base sm:text-lg font-normal lg:text-2xl xl:text-3xl text-purple-300">
              Kamu adalah...
            </h1>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mt-3 text-white">
              Investor {result.title}
            </h2>
            <p className="text-white/90 text-sm lg:text-base xl:text-lg max-w-2xl xl:max-w-3xl text-pretty mx-auto leading-relaxed mt-8">
              {result.description}
            </p>
          </Container>
        </div>
      </section>

      {/* Portfolio Section */}
      <Container className="py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Portfolio yang Cocok Untukmu
          </h2>
          <p className="text-gray-600">Level resiko: {result.level}</p>
        </div>

        <div className="items-center justify-center gap-8 lg:gap-12 grid grid-cols-1 lg:grid-cols-2">
          {/* Donut Chart */}
          <div className="w-64 h-64 lg:w-96 lg:h-96 mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={120}
                  outerRadius={180}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Portfolio Legend */}
          <div className="space-y-4">
            <div className="w-full flex justify-between items-center">
              <p>Jenis Aset</p>
              <p>Alokasi Dana</p>
            </div>
            {result.portfolio.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 justify-between"
              >
                <div className="flex items-center gap-2 justify-center">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="font-medium text-gray-800">{item.asset}</div>
                </div>

                <div className="text-lg font-bold text-purple-600">
                  {item.percentage}%
                </div>
              </div>
            ))}
            <div className="mt-8">
              <p className="text-gray-600 mb-4">
                Mau coba bikin portfoliomu sendiri?
              </p>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
                onClick={() => (window.location.href = "/simulasi-portofolio")}
              >
                Simulasikan sekarang!
              </Button>
              <p className="text-xs text-gray-400 mt-4">
                *Bukan ajakan berinvestasi, selalu lakukan riset sendiri sebelum
                mengambil keputusan finansial
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Asset Learning Section */}
      <Container className="py-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-8">
          Yuk pelajari aset berikut!
        </h2>

        <div className="flex flex-wrap items-center gap-6 justify-center lg:grid lg:grid-cols-3 lg:gap-10">
          {result.recommendations.map((asset, index) => (
            <div key={index} className="items-end flex">
              <Image
                src={getAssetImage(asset, index)}
                alt={`${asset} illustration`}
                width={550}
                height={520}
                quality={100}
                className="rounded-lg w-full"
              />
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
