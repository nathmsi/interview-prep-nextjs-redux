import Link from "next/link";
import { notFound } from "next/navigation";
import { ExpressNav } from "@/components/layout/ExpressNav";
import {
  expressSections,
  getAdjacentExpressExercises,
  getExpressExercise,
  getExpressSection,
} from "@/lib/nodejs-express";
import { readLessonMarkdown, renderSimpleMarkdown } from "@/lib/markdown";

type PageProps = {
  params: Promise<{ section: string; slug: string }>;
};

export async function generateStaticParams() {
  return expressSections.flatMap((section) =>
    section.subsections.flatMap((subsection) =>
      subsection.exercises.map((exercise) => ({
        section: section.slug,
        slug: exercise.slug,
      }))
    )
  );
}

export default async function ExpressExercisePage({ params }: PageProps) {
  const { section: sectionSlug, slug: exerciseSlug } = await params;
  const section = getExpressSection(sectionSlug);
  const exercise = getExpressExercise(sectionSlug, exerciseSlug);

  if (!section?.available || !exercise) notFound();

  const md = await readLessonMarkdown(exercise.lessonPath);
  const html = renderSimpleMarkdown(md);
  const { prev, next } = getAdjacentExpressExercises(sectionSlug, exerciseSlug);

  return (
    <article className="space-y-6">
      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/express" className="text-zinc-500 hover:underline">
          ← Express
        </Link>
        <Link href={`/express/${section.slug}`} className="text-zinc-500 hover:underline">
          {section.title}
        </Link>
        <span className="rounded-full bg-violet-100 px-2 py-0.5 text-violet-800 dark:bg-violet-950 dark:text-violet-200">
          {exercise.pattern}
        </span>
      </div>

      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Exercise {String(exercise.number).padStart(2, "0")}
        </p>
        <h1 className="text-2xl font-bold">{exercise.title}</h1>
        <p className="mt-1 text-sm text-zinc-500">{exercise.summary}</p>
      </header>

      <div
        className="prose-zinc max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <section className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
        <h2 className="font-semibold">Implement locally</h2>
        <ul className="mt-2 space-y-1 text-sm">
          <li>
            <strong>Export:</strong> <code>{exercise.functionName}()</code>
          </li>
          <li>
            <strong>File:</strong> <code>{exercise.exercisePath}/app.ts</code>
          </li>
          <li>
            <strong>Tests:</strong> <code>{exercise.exercisePath}/app.test.ts</code>
          </li>
        </ul>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          Run <code className="rounded bg-white px-1 dark:bg-zinc-900">{exercise.testCommand}</code>{" "}
          after implementing. Tests use supertest — no port needed.
        </p>
      </section>

      <ExpressNav sectionSlug={sectionSlug} prev={prev} next={next} />
    </article>
  );
}
