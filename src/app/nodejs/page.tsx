import Link from "next/link";
import {
  exerciseCountForNodeSection,
  nodeHref,
  nodeSections,
  totalAvailableNodeExercises,
} from "@/lib/nodejs-backend";

export default function NodeIndexPage() {
  const availableCount = totalAvailableNodeExercises();

  return (
    <div className="space-y-8">
      <header>
        <Link href="/" className="text-sm text-zinc-500 hover:underline">
          ← Home
        </Link>
        <h1 className="mt-2 text-2xl font-bold">Node.js backend exercises</h1>
        <p className="mt-1 max-w-2xl text-zinc-600 dark:text-zinc-400">
          TypeScript backend interview practice — HTTP, middleware, auth, data
          layer, rate limiting, and production patterns. Implement in your editor,
          run{" "}
          <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">npm run node:XX</code>.
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          {availableCount} exercise{availableCount === 1 ? "" : "s"} available
          across {nodeSections.filter((s) => s.available).length} section
          {nodeSections.filter((s) => s.available).length === 1 ? "" : "s"}
        </p>
      </header>

      <ol className="space-y-4">
        {nodeSections.map((section) => {
          const count = exerciseCountForNodeSection(section);
          const href = nodeHref(section.slug);

          return (
            <li key={section.slug}>
              <div
                className={`rounded-lg border p-4 ${
                  section.available
                    ? "border-sky-200 bg-sky-50/50 dark:border-sky-900/60 dark:bg-sky-950/20"
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
