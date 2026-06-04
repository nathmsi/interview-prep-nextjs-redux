import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactQuizAccordion } from "@/components/quiz/ReactQuizAccordion";
import { getLesson, lessonTracks, type LessonTrack } from "@/lib/lessons";
import { readLessonMarkdown, renderSimpleMarkdown } from "@/lib/markdown";

type PageProps = {
  params: Promise<{ level: string; slug: string }>;
};

export default async function LessonPage({ params }: PageProps) {
  const { level, slug } = await params;
  if (!lessonTracks.includes(level as LessonTrack)) {
    notFound();
  }
  const lesson = getLesson(level as LessonTrack, slug);
  if (!lesson) {
    notFound();
  }

  const isInteractiveQuiz = lesson.slug === "quiz-questions";

  if (isInteractiveQuiz) {
    return (
      <article className="space-y-6">
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/lessons" className="text-zinc-500 hover:underline">
            ← Lessons
          </Link>
          <span className="rounded-full bg-sky-100 px-2 py-0.5 text-sky-800 dark:bg-sky-950 dark:text-sky-200">
            React quiz
          </span>
        </div>
        <header>
          <h1 className="text-2xl font-bold">React interview quiz — 20 questions</h1>
          <p className="mt-1 text-sm text-zinc-500">Basic → Pro · React 18/19</p>
        </header>
        <ReactQuizAccordion />
      </article>
    );
  }

  const md = await readLessonMarkdown(lesson.lessonPath);
  const html = renderSimpleMarkdown(md);

  return (
    <article className="space-y-6">
      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/lessons" className="text-zinc-500 hover:underline">
          ← Lessons
        </Link>
        <span className="rounded-full bg-zinc-200 px-2 py-0.5 capitalize dark:bg-zinc-800">
          {lesson.track}
        </span>
        {lesson.kind === "course" && (
          <span className="rounded-full bg-sky-100 px-2 py-0.5 text-sky-800 dark:bg-sky-950 dark:text-sky-200">
            Course only
          </span>
        )}
      </div>
      <div
        className="prose-zinc max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {lesson.slug === "quiz-solutions" && (
        <p className="rounded-lg border border-sky-200 bg-sky-50 p-3 text-sm text-sky-900 dark:border-sky-900 dark:bg-sky-950/50 dark:text-sky-200">
          Prefer the interactive quiz?{" "}
          <Link href="/lessons/react/quiz-questions" className="underline font-medium">
            Open quiz with accordion solutions
          </Link>
          .
        </p>
      )}
      {lesson.kind === "exercise" && lesson.exercisePath && (
        <section className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
          <h2 className="font-semibold">Exercise & solution</h2>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <strong>Exercise:</strong>{" "}
              <code>{lesson.exercisePath}/exercise.tsx</code>
            </li>
            <li>
              <strong>Solution:</strong>{" "}
              <code>
                solutions/{lesson.track}/{lesson.slug}/solution.tsx
              </code>
            </li>
            <li>
              <strong>Tests:</strong>{" "}
              <code>{lesson.exercisePath}/exercise.test.tsx</code>
            </li>
          </ul>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Implement the exercise, run{" "}
            <code className="rounded bg-white px-1 dark:bg-zinc-900">npm test</code>,
            then compare with the solution.
          </p>
        </section>
      )}
    </article>
  );
}
