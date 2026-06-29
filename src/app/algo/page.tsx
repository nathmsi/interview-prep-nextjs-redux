import Link from "next/link";
import {
  algoHref,
  algoSections,
  exerciseCountForSection,
  totalAvailableExercises,
} from "@/lib/algo";

export default function AlgoIndexPage() {
  const availableCount = totalAvailableExercises();

  return (
    <div className="space-y-8">
      <header>
        <Link href="/" className="text-sm text-zinc-500 hover:underline">
          ← Home
        </Link>
        <h1 className="mt-2 text-2xl font-bold">Algorithm exercises</h1>
        <p className="mt-1 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Coding interview practice in TypeScript — patterns, problem statements,
          and local tests. Implement in your editor, run{" "}
          <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">npm run algo:XX</code>.
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          {availableCount} exercise{availableCount === 1 ? "" : "s"} available
          across {algoSections.filter((s) => s.available).length} section
          {algoSections.filter((s) => s.available).length === 1 ? "" : "s"}
        </p>
      </header>

      <ol className="space-y-4">
        {algoSections.map((section) => {
          const count = exerciseCountForSection(section);
          const href = algoHref(section.slug);

          return (
            <li key={section.slug}>
              <div
                className={`rounded-lg border p-4 ${
                  section.available
                    ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/60 dark:bg-emerald-950/20"
                    : "border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      Section {String(section.number).padStart(2, "0")}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      {section.title}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {section.description}
                    </p>
                  </div>
                  {section.available ? (
                    <Link
                      href={href}
                      className="shrink-0 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                    >
                      {count} exercise{count === 1 ? "" : "s"} →
                    </Link>
                  ) : (
                    <span className="shrink-0 rounded-full bg-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      Coming soon
                    </span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
