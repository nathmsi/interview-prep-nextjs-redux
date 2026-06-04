import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson, type LessonLevel } from "@/lib/lessons";
import { readLessonMarkdown, renderSimpleMarkdown } from "@/lib/markdown";

type PageProps = {
  params: Promise<{ level: string; slug: string }>;
};

const validLevels: LessonLevel[] = ["easy", "medium", "hard"];

export default async function LessonPage({ params }: PageProps) {
  const { level, slug } = await params;
  if (!validLevels.includes(level as LessonLevel)) {
    notFound();
  }
  const lesson = getLesson(level as LessonLevel, slug);
  if (!lesson) {
    notFound();
  }

  const md = await readLessonMarkdown(lesson.lessonPath);
  const html = renderSimpleMarkdown(md);

  return (
    <article className="space-y-6">
      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/lessons" className="text-zinc-500 hover:underline">
          ← Leçons
        </Link>
        <span className="rounded-full bg-zinc-200 px-2 py-0.5 capitalize dark:bg-zinc-800">
          {lesson.level}
        </span>
      </div>
      <div
        className="prose-zinc max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <section className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
        <h2 className="font-semibold">Exercice & solution</h2>
        <ul className="mt-2 space-y-1 text-sm">
          <li>
            <strong>Exercice:</strong>{" "}
            <code>{lesson.exercisePath}/exercise.tsx</code>
          </li>
          <li>
            <strong>Solution:</strong>{" "}
            <code>solutions/{lesson.level}/{lesson.slug}/solution.tsx</code>
          </li>
          <li>
            <strong>Tests:</strong>{" "}
            <code>{lesson.exercisePath}/exercise.test.tsx</code>
          </li>
        </ul>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Implémente dans l&apos;exercice, lance{" "}
          <code className="rounded bg-white px-1 dark:bg-zinc-900">npm test</code>, puis
          compare avec la solution.
        </p>
      </section>
    </article>
  );
}
