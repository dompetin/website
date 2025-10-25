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
    <main className="bg-white">
      <section className="rounded-b-[5rem] min-h-screen bg-gradient-to-t from-purple-500 to-transparent flex flex-col overflow-hidden">
        a
        <div
          className=" mb-0 mt-auto text-center bg-purple-700 min-h-[30dvh] lg:min-h-[50dvh] h-auto flex justify-center items-end overflow-visible"
          style={{ clipPath: "ellipse(57% 65% at 50% 69%)" }}
        >
          a
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
                width={250}
                height={120}
                className="rounded-lg w-full"
              />
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
