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

  // Prepare data for the pie chart
  const chartData = result.portfolio.map((item) => ({
    name: item.asset,
    value: item.percentage,
    color: item.color,
  }));

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section with Purple Background */}
      <section className="relative bg-gradient-to-br from-purple-600 to-purple-800 overflow-visible min-h-screen">
        <div
          style={{
            borderBottomLeftRadius: "5rem",
            borderBottomRightRadius: "5rem",
            clipPath: "ellipse(140% 90% at 50% 120%)",
          }}
          className="bg-white"
        ></div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-8 h-8 bg-purple-300 rounded-full"></div>
          <div className="absolute top-20 right-20 w-6 h-6 bg-purple-400 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-4 h-4 bg-purple-300 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-10 h-10 bg-purple-400 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-purple-300 rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-purple-400 rounded-full"></div>
        </div>

        {/* Main character illustration */}
        <div className="flex justify-center pt-8 absolute top-0 translate-y-[-50%]">
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
            width={200}
            height={200}
            className="z-10"
          />
        </div>

        {/* Result text */}
        <Container className="text-center text-white pb-12">
          <h1 className="text-lg font-normal mb-2">Kamu adalah...</h1>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Investor {result.title}
          </h2>
          <p className="text-white/90 text-sm lg:text-base max-w-2xl mx-auto leading-relaxed">
            {result.description}
          </p>
        </Container>
      </section>

      {/* Portfolio Section */}
      <Container className="py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Portfolio yang Cocok Untukmu
          </h2>
          <p className="text-gray-600">Level resiko: {result.level}</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Donut Chart */}
          <div className="w-64 h-64 lg:w-80 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
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
            {result.portfolio.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div>
                  <div className="font-medium text-gray-800">{item.asset}</div>
                  <div className="text-sm text-gray-600">Alokasi dana</div>
                  <div className="text-lg font-bold text-purple-600">
                    {item.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8">
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
      </Container>

      {/* Asset Learning Section */}
      <Container className="py-12 bg-gray-50">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-8 text-center">
          Yuk pelajari aset berikut!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.recommendations.map((asset, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <Image
                  src={getAssetImage(asset, index)}
                  alt={`${asset} illustration`}
                  width={120}
                  height={120}
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800 text-center">
                {asset}
              </h3>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
