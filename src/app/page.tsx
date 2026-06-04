import Link from "next/link";
import { SubjectCard } from "@/components/layout/SubjectCard";
import { subjects } from "@/lib/subjects";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Front-end interview preparation
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Courses and quizzes for technical interviews — JavaScript, TypeScript,
          React, Next.js, CSS, and the libraries you should know. Read in the
          browser; practice coding in your editor.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Subjects
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900/50">
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
          Full lesson index
        </h2>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Browse every lesson by subject on{" "}
          <Link href="/lessons" className="font-medium underline">
            /lessons
          </Link>
          .
        </p>
        <p className="mt-2 text-zinc-500">
          Hands-on Redux / Next.js labs stay in{" "}
          <code className="rounded bg-white px-1 dark:bg-zinc-950">
            src/exercises/
          </code>{" "}
          and{" "}
          <code className="rounded bg-white px-1 dark:bg-zinc-950">
            solutions/
          </code>{" "}
          — run{" "}
          <code className="rounded bg-white px-1 dark:bg-zinc-950">
            npm run test:exercises
          </code>{" "}
          locally (not linked in this UI).
        </p>
      </section>
    </div>
  );
}
