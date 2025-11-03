import { Metadata } from "next";
import { Quiz } from "./components/quiz";

export const metadata: Metadata = {
  title: "Kuis | Dompetin",
};

export default function SurveyPage() {
  return <Quiz />;
}
