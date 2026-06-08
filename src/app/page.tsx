import Link from "next/link";
import { SubjectCard } from "@/components/layout/SubjectCard";
import { interviewHref, interviews } from "@/lib/interviews";
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
          React, Next.js, CSS, Tailwind, libraries, and using AI effectively
          (Skills, Rules, docs). Read in the
          browser; practice coding in your editor.
        </p>
      </header>

      {interviews.length > 0 && (
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Interview angles
          </h2>
          <ul className="space-y-3">
            {interviews.map((interview) => (
              <li key={interview.slug}>
                <Link
                  href={interviewHref(interview.slug)}
                  className="block rounded-lg border border-amber-200 bg-amber-50/80 p-4 transition-colors hover:border-amber-300 dark:border-amber-900/60 dark:bg-amber-950/30 dark:hover:border-amber-800"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-200">
                    {interview.company}
                  </p>
                  <p className="mt-1 font-medium text-zinc-900 dark:text-zinc-50">
                    {interview.role}
                  </p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {interview.date} · {interview.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-zinc-500">
            Toutes les fiches sur{" "}
            <Link href="/interviews" className="font-medium underline">
              /interviews
            </Link>
            .
          </p>
        </section>
      )}

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
          Browse all subjects on{" "}
          <Link href="/subjects" className="font-medium underline">
            /subjects
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
