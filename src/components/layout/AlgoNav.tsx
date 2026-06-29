import type { AlgoExercise } from "@/lib/algo";
import Link from "next/link";

type AlgoNavProps = {
  sectionSlug: string;
  prev?: AlgoExercise;
  next?: AlgoExercise;
};

function exerciseHref(sectionSlug: string, exercise: AlgoExercise) {
  return `/algo/${sectionSlug}/${exercise.slug}`;
}

export function AlgoNav({ sectionSlug, prev, next }: AlgoNavProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Exercise navigation"
      className="flex flex-col gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:justify-between dark:border-zinc-800"
    >
      {prev ? (
        <Link
          href={exerciseHref(sectionSlug, prev)}
          className="group flex flex-col rounded-lg border border-zinc-200 p-4 transition hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600 sm:max-w-[48%]"
        >
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            ← Previous
          </span>
          <span className="mt-1 font-medium group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
            {String(prev.number).padStart(2, "0")} — {prev.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block sm:max-w-[48%]" />
      )}
      {next ? (
        <Link
          href={exerciseHref(sectionSlug, next)}
          className="group flex flex-col rounded-lg border border-zinc-200 p-4 text-left transition hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600 sm:max-w-[48%] sm:text-right"
        >
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Next →
          </span>
          <span className="mt-1 font-medium group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
            {String(next.number).padStart(2, "0")} — {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
