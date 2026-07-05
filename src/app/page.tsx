import Link from "next/link";
import { SubjectCard } from "@/components/layout/SubjectCard";
import { algoHref, algoSections, totalAvailableExercises } from "@/lib/algo";
import { interviewHref, interviews } from "@/lib/interviews";
import {
  nodeHref,
  nodeSections,
  totalAvailableNodeExercises,
} from "@/lib/nodejs-backend";
import {
  expressHref,
  expressSections,
  totalAvailableExpressExercises,
} from "@/lib/nodejs-express";
import { subjects } from "@/lib/subjects";

export default function HomePage() {
  const algoCount = totalAvailableExercises();
  const nodeCount = totalAvailableNodeExercises();
  const expressCount = totalAvailableExpressExercises();
  const firstAlgoSection = algoSections.find((s) => s.available);
  const firstNodeSection = nodeSections.find((s) => s.available);
  const firstExpressSection = expressSections.find((s) => s.available);
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Full-stack interview preparation
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Courses and quizzes for technical interviews — JavaScript, TypeScript,
          React, Next.js, Node.js backend, CSS, Tailwind, libraries, and using AI
          effectively (Skills, Rules, docs). Read in the browser; practice coding
          in your editor.
        </p>
      </header>

      {interviews.length > 0 && (
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Interview prep
          </h2>
          <ul className="space-y-3">
            {interviews.map((interview) => (
              <li key={interview.slug}>
                <Link
                  href={interviewHref(interview.slug)}
                  className="group block overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/80 transition hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10 dark:border-violet-900/50 dark:from-zinc-900 dark:to-violet-950/30"
                >
                  <div className="border-b border-violet-100 bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 dark:border-violet-900">
                    <p className="text-xs font-semibold uppercase tracking-wider text-violet-200">
                      {interview.company}
                    </p>
                    <p className="font-semibold text-white">{interview.role}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {interview.date} · {interview.summary}
                    </p>
                    <p className="mt-2 text-sm font-medium text-violet-700 group-hover:underline dark:text-violet-300">
                      Ouvrir →
                    </p>
                  </div>
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

      {firstExpressSection && (
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Express server exercises
          </h2>
          <Link
            href={expressHref(firstExpressSection.slug)}
            className="block rounded-lg border border-violet-200 bg-violet-50/80 p-4 transition-colors hover:border-violet-300 dark:border-violet-900/60 dark:bg-violet-950/30 dark:hover:border-violet-800"
          >
            <p className="font-medium text-zinc-900 dark:text-zinc-50">
              {firstExpressSection.title}
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {firstExpressSection.description}
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              {expressCount} real Express apps · supertest, Zod, bcrypt, JWT
            </p>
          </Link>
          <p className="mt-3 text-sm text-zinc-500">
            Guide + index on{" "}
            <Link href="/express" className="font-medium underline">
              /express
            </Link>
            .
          </p>
        </section>
      )}

      {firstNodeSection && (
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Node.js backend exercises
          </h2>
          <Link
            href={nodeHref(firstNodeSection.slug)}
            className="block rounded-lg border border-sky-200 bg-sky-50/80 p-4 transition-colors hover:border-sky-300 dark:border-sky-900/60 dark:bg-sky-950/30 dark:hover:border-sky-800"
          >
            <p className="font-medium text-zinc-900 dark:text-zinc-50">
              {firstNodeSection.title}
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {firstNodeSection.description}
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              {nodeCount} TypeScript exercises · HTTP, middleware, auth, data layer & more
            </p>
          </Link>
          <p className="mt-3 text-sm text-zinc-500">
            Full index on{" "}
            <Link href="/nodejs" className="font-medium underline">
              /nodejs
            </Link>
            .
          </p>
        </section>
      )}

      {firstAlgoSection && (
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Algorithm exercises
          </h2>
          <Link
            href={algoHref(firstAlgoSection.slug)}
            className="block rounded-lg border border-emerald-200 bg-emerald-50/80 p-4 transition-colors hover:border-emerald-300 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:hover:border-emerald-800"
          >
            <p className="font-medium text-zinc-900 dark:text-zinc-50">
              {firstAlgoSection.title}
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {firstAlgoSection.description}
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              {algoCount} TypeScript exercises · intervals, hashmap, two pointers & more
            </p>
          </Link>
          <p className="mt-3 text-sm text-zinc-500">
            Full index on{" "}
            <Link href="/algo" className="font-medium underline">
              /algo
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
            content/exercises/easy|medium|hard/
          </code>{" "}
          — run{" "}
          <code className="rounded bg-white px-1 dark:bg-zinc-950">
            npm run test:exercises
          </code>{" "}
          locally. Algo coding exercises are on{" "}
          <Link href="/algo" className="font-medium underline">
            /algo
          </Link>
          . Node.js backend exercises are on{" "}
          <Link href="/nodejs" className="font-medium underline">
            /nodejs
          </Link>
          . Express server labs are on{" "}
          <Link href="/express" className="font-medium underline">
            /express
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
