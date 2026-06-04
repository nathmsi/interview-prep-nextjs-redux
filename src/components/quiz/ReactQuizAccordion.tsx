"use client";

import { useMemo, useState } from "react";
import {
  quizLevelLabels,
  quizLevels,
  reactQuizItems,
  type QuizItem,
  type QuizLevel,
} from "@/lib/react-quiz";

function QuizCard({ item }: { item: QuizItem }) {
  const [answer, setAnswer] = useState("");

  return (
    <li className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="font-mono text-xs text-zinc-400">Q{item.id}</span>
        <h3 className="font-semibold">{item.title}</h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {item.question}
      </p>

      <label className="mt-4 block text-xs font-medium uppercase tracking-wide text-zinc-500">
        Your answer
      </label>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here before opening the solution…"
        rows={4}
        className="mt-1 w-full resize-y rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-950"
      />

      <details className="group mt-4 rounded-lg border border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/30">
        <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-emerald-900 dark:text-emerald-200 [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block text-xs transition group-open:rotate-90"
              aria-hidden
            >
              ▶
            </span>
            Show solution
          </span>
        </summary>
        <div className="border-t border-emerald-200 px-4 py-3 text-sm leading-relaxed text-zinc-800 dark:border-emerald-900 dark:text-zinc-200">
          {item.solution}
        </div>
      </details>
    </li>
  );
}

export function ReactQuizAccordion() {
  const byLevel = useMemo(() => {
    const map = new Map<QuizLevel, QuizItem[]>();
    for (const level of quizLevels) {
      map.set(
        level,
        reactQuizItems.filter((q) => q.level === level)
      );
    }
    return map;
  }, []);

  const answeredCount = reactQuizItems.length;

  return (
    <div className="space-y-8">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Answer in the box under each question, then open the{" "}
        <strong>accordion</strong> only when you want to check the official solution.
      </p>

      {quizLevels.map((level) => (
        <section key={level}>
          <h2 className="mb-3 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
            {quizLevelLabels[level]}
          </h2>
          <ul className="space-y-4">
            {byLevel.get(level)?.map((item) => (
              <QuizCard key={item.id} item={item} />
            ))}
          </ul>
        </section>
      ))}

      <p className="text-center text-sm text-zinc-500">
        {answeredCount} questions · basic → pro
      </p>
    </div>
  );
}
