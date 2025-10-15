import { Button } from "@/components/ui/button";

import { useQuizStore } from "../store/quiz-store";
import { resultDescriptions } from "../constants/results";

export function ResultScreen() {
  const { getResult, reset } = useQuizStore();
  const category = getResult();
  const result = resultDescriptions[category];

  return (
    <div className="p-6 max-w-md mx-auto text-center border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Hasil Survey Kamu</h1>

      <div className="p-4 bg-blue-50 rounded-lg mb-4">
        <p className="text-gray-700 mb-2">Berdasarkan hasil, kamu adalah</p>
        <h2 className="text-xl font-semibold text-blue-600 mb-3">
          {result.title}
        </h2>
        <p className="text-gray-700">{result.description}</p>
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
    </div>
  );
}
