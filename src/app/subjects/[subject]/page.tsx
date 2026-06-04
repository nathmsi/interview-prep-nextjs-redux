import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSubject,
  isSubjectId,
  lessonCountForSubject,
  subjectIds,
  type SubjectId,
} from "@/lib/subjects";
import { getLessonsByTrack } from "@/lib/lessons";

type PageProps = {
  params: Promise<{ subject: string }>;
};

export function generateStaticParams() {
  return subjectIds.map((subject) => ({ subject }));
}

export default async function SubjectPage({ params }: PageProps) {
  const { subject: subjectParam } = await params;
  if (!isSubjectId(subjectParam)) {
    notFound();
  }

  const subject = getSubject(subjectParam)!;
  const lessons = subject.tracks.flatMap((track) => getLessonsByTrack(track));
  const count = lessonCountForSubject(subject);

  return (
    <div className="space-y-8">
      <div className="text-sm">
        <Link href="/" className="text-zinc-500 hover:underline">
          ← Home
        </Link>
      </div>

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{subject.label}</h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          {subject.description}
        </p>
        <p className="text-sm text-zinc-500">
          {count} lesson{count === 1 ? "" : "s"} in this subject
        </p>
        <Link
          href={subject.entryHref}
          className="inline-block rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          Start with the first lesson →
        </Link>
      </header>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Lessons
        </h2>
        <ul className="space-y-3">
          {lessons.map((lesson) => (
            <li key={`${lesson.track}-${lesson.slug}`}>
              <Link
                href={`/lessons/${lesson.track}/${lesson.slug}`}
                className="block rounded-lg border border-zinc-200 p-4 transition hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
              >
                <span className="font-medium">
                  {String(lesson.number).padStart(2, "0")} — {lesson.title}
                </span>
                <span className="mt-1 block text-sm text-zinc-500">
                  {lesson.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
