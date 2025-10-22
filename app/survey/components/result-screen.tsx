import { Button } from "@/components/ui/button";

import { useQuizStore } from "../store/quiz-store";
import { resultDescriptions } from "../constants/results";
import Container from "@/components/container";
import Image from "next/image";

const riskLevel: Record<number, string> = {
  1: "Beginner",
  2: "Novice",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
  6: "Master",
  7: "Grandmaster",
  8: "Legend",
  9: "Mythic",
  10: "God Tier",
};

function getLevel(point: number) {
  return riskLevel[point] ?? "Unknown";
}

export function ResultScreen() {
  const { getResult, getNumericResult, reset } = useQuizStore();
  const category = getResult();
  const numeric = getNumericResult();
  const result = resultDescriptions[category];

  return (
    <main>
      <section className="flex items-center justify-end flex-col text-center rounded-b-[5rem] overflow-hidden">
        <Image
          src="/avatar.png"
          alt="Result Image"
          width={200}
          height={200}
          className="translate-y-28"
        />
        <Container className="bg-purple-600 w-full min-h-[300px] mb-0">
          <h1 className="mt-48">
            Kamu adalah...
            <br />
            Investor {result.title}
          </h1>
          <p className="text-gray-700 mt-2">{result.description}</p>
        </Container>
      </section>
      <Container className="flex flex-col items-center justify-center">
        <h2 className="text-2xl lg:text-4xl font-bold mb-10">
          Portfolio yang Cocok untukmu
        </h2>
        <p>Level resiko: {getLevel(numeric)}</p>
      </Container>
      <Container>
        <h2 className="text-2xl lg:text-4xl font-bold mb-10">
          Yuk pelajari aset berikut!
        </h2>
        <ul className="text-gray-700 grid grid-cols-3 gap-4 *:min-h-64 *:justify-center *:items-center *:flex">
          {result.recommendations.map((item) => (
            <li key={item} className="bg-purple-400">
              {item}
            </li>
          ))}
        </ul>
      </Container>

      {/*<div className="p-6 max-w-md mx-auto text-center border rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Hasil Survey Kamu</h1>

        <div className="p-4 bg-blue-50 rounded-lg mb-4">
          <p className="text-gray-700 mb-2">Berdasarkan hasil, kamu adalah</p>
          <h2 className="text-xl font-semibold text-blue-600 mb-3">
            {result.title}
          </h2>
          <p className="text-gray-700">
            Skor (1-10): <span className="font-semibold">{numeric}</span>
          </p>
          <p className="text-gray-700 mt-2">{result.description}</p>
        </div>

        <div className="text-left p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2 text-gray-800">
            Rekomendasi investasi untukmu:
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            {result.recommendations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <Button
          onClick={reset}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          Ulangi Survey
        </Button>
      </div>*/}
    </main>
  );
}
