import Link from "next/link";
import { lessons, lessonTracks, type LessonTrack } from "@/lib/lessons";

const trackLabels: Record<LessonTrack, string> = {
  nextjs: "Next.js",
  javascript: "JavaScript",
  typescript: "TypeScript",
  css: "CSS",
  react: "React hooks (course)",
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export default function LessonsIndexPage() {
  const byTrack = lessonTracks.map((track) => ({
    track,
    items: lessons.filter((l) => l.track === track),
  }));

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Lessons index</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        <strong>React</strong> track = theory + one example per hook (no exercise).{" "}
        <strong>Easy / medium / hard</strong> = Next.js + Redux with hands-on exercises.
      </p>
      <div className="flex flex-wrap gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
        <Link
          href="/lessons/nextjs/01-overview-and-tooling"
          className="font-medium text-zinc-900 underline dark:text-zinc-100"
        >
          Next.js course (10 lessons)
        </Link>
        <Link
          href="/lessons/typescript/quiz-questions"
          className="font-medium text-violet-800 underline dark:text-violet-200"
        >
          TypeScript quiz — 20 questions
        </Link>
        <Link
          href="/lessons/react/quiz-questions"
          className="font-medium text-sky-800 underline dark:text-sky-200"
        >
          React quiz — 20 questions
        </Link>
      </div>
      {byTrack.map(({ track, items }) => (
        <section key={track}>
          <h2 className="text-lg font-semibold">{trackLabels[track]}</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            {items.map((l) => (
              <li key={l.slug}>
                <Link href={`/lessons/${track}/${l.slug}`} className="underline">
                  {l.title}
                </Link>
                {l.kind === "exercise" && (
                  <span className="text-sm text-zinc-500"> — {l.exercisePath}</span>
                )}
                {l.kind === "course" && (
                  <span className="text-sm text-zinc-500"> — read only</span>
                )}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
