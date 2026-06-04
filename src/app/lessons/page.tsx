import Link from "next/link";
import { getLessonsByTrack } from "@/lib/lessons";
import { subjects } from "@/lib/subjects";

export default function LessonsIndexPage() {
  return (
    <div className="space-y-10">
      <header>
        <Link href="/" className="text-sm text-zinc-500 hover:underline">
          ← Home
        </Link>
        <h1 className="mt-2 text-2xl font-bold">Lessons by subject</h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Interview-focused courses and quizzes. Jump from the navbar or start
          any subject below.
        </p>
      </header>

      {subjects.map((subject) => {
        const items = subject.tracks.flatMap((track) =>
          getLessonsByTrack(track)
        );

        return (
          <section
            key={subject.id}
            id={subject.id}
            className="scroll-mt-20 border-t border-zinc-200 pt-8 first:border-t-0 first:pt-0 dark:border-zinc-800"
          >
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xl font-semibold">{subject.label}</h2>
              <Link
                href={subject.entryHref}
                className="text-sm font-medium text-sky-700 underline dark:text-sky-300"
              >
                Start →
              </Link>
            </div>
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
              {subject.description}
            </p>
            <ol className="list-decimal space-y-2 pl-5">
              {items.map((l) => (
                <li key={`${l.track}-${l.slug}`}>
                  <Link
                    href={`/lessons/${l.track}/${l.slug}`}
                    className="font-medium underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-600"
                  >
                    {l.title}
                  </Link>
                  <span className="mt-0.5 block text-sm text-zinc-500">
                    {l.summary}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
