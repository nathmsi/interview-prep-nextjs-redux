import Link from "next/link";
import {
  exerciseCountForExpressSection,
  expressGettingStartedLesson,
  expressHref,
  expressSections,
  totalAvailableExpressExercises,
} from "@/lib/nodejs-express";
import { readLessonMarkdown, renderSimpleMarkdown } from "@/lib/markdown";

export default async function ExpressIndexPage() {
  const availableCount = totalAvailableExpressExercises();
  const gettingStarted = await readLessonMarkdown(expressGettingStartedLesson);
  const gettingStartedHtml = renderSimpleMarkdown(gettingStarted);

  return (
    <div className="space-y-8">
      <header>
        <Link href="/" className="text-sm text-zinc-500 hover:underline">
          ← Home
        </Link>
        <h1 className="mt-2 text-2xl font-bold">Express server exercises</h1>
        <p className="mt-1 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Real Express apps with supertest, Zod, bcrypt, and JWT — implement routes
          in <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">app.ts</code>,
          run{" "}
          <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">npm run server:XX</code>.
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          {availableCount} hands-on exercises across{" "}
          {expressSections.filter((s) => s.available).length} sections
        </p>
      </header>

      <section className="rounded-lg border border-violet-200 bg-violet-50/50 p-4 dark:border-violet-900/60 dark:bg-violet-950/20">
        <h2 className="font-semibold text-violet-900 dark:text-violet-100">
          Getting started — read first
        </h2>
        <div
          className="prose-zinc mt-3 max-w-none text-sm dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: gettingStartedHtml }}
        />
      </section>

      <ol className="space-y-4">
        {expressSections.map((section) => {
          const count = exerciseCountForExpressSection(section);
          return (
            <li key={section.slug}>
              <div className="rounded-lg border border-violet-200 bg-violet-50/50 p-4 dark:border-violet-900/60 dark:bg-violet-950/20">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      Section {String(section.number).padStart(2, "0")}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold">{section.title}</h2>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {section.description}
                    </p>
                  </div>
                  <Link
                    href={expressHref(section.slug)}
                    className="shrink-0 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900"
                  >
                    {count} exercise{count === 1 ? "" : "s"} →
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
