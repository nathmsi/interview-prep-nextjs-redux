"use client";

import { typescriptQuizItems } from "@/lib/typescript-quiz";
import { QuizAccordion } from "./QuizAccordion";

export function TypeScriptQuizAccordion() {
  return <QuizAccordion items={typescriptQuizItems} />;
}
