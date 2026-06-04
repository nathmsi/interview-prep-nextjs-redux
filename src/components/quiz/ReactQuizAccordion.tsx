"use client";

import { reactQuizItems } from "@/lib/react-quiz";
import { QuizAccordion } from "./QuizAccordion";

export function ReactQuizAccordion() {
  return <QuizAccordion items={reactQuizItems} />;
}
