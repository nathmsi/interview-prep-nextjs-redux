export type QuizLevel = "basic" | "intermediate" | "advanced" | "pro";

export type QuizItem = {
  id: number;
  level: QuizLevel;
  title: string;
  question: string;
  solution: string;
};

export const quizLevelLabels: Record<QuizLevel, string> = {
  basic: "Basic",
  intermediate: "Intermediate",
  advanced: "Advanced",
  pro: "Pro",
};

export const quizLevels: QuizLevel[] = ["basic", "intermediate", "advanced", "pro"];
