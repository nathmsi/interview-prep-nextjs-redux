import Link from "next/link";
import { notFound } from "next/navigation";
import { InterviewProcessBar } from "@/components/interview/InterviewProcessBar";
import { MondayCaseGrid } from "@/components/interview/MondayCaseGrid";
import { getInterview } from "@/lib/interviews";
import { readLessonMarkdown, renderSimpleMarkdown } from "@/lib/markdown";
import { mondayCases, mondayStages } from "@/lib/monday-interview";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function InterviewPage({ params }: PageProps) {
  const { slug } = await params;
  const interview = getInterview(slug);
  if (!interview) {
    notFound();
  }

  const md = await readLessonMarkdown(interview.markdownPath);
  const html = renderSimpleMarkdown(md);
  const isMonday = slug === "monday-com-e2e";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <Link
          href="/interviews"
          className="text-zinc-500 transition hover:text-violet-600 dark:hover:text-violet-400"
        >
          ← Interview angles
        </Link>
      </div>

      {isMonday && (
        <header className="relative overflow-hidden rounded-3xl border border-violet-200/80 bg-gradient-to-br from-violet-600 via-violet-700 to-fuchsia-700 p-6 text-white shadow-xl shadow-violet-500/20 sm:p-8">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-10 left-1/3 h-32 w-32 rounded-full bg-fuchsia-400/20 blur-2xl" />
          <div className="relative space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
                monday.com
              </span>
              <span className="rounded-full bg-emerald-400/90 px-3 py-1 text-xs font-semibold text-emerald-950">
                Coding ✓ passé
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                End2End interview — entraînement
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-violet-100 sm:text-base">
                Pas de code qui compile — pseudo-code, discussion produit, edge cases.
                Choisis un cas, écris ta réponse, compare avec la réponse modèle.
              </p>
            </div>
            <InterviewProcessBar stages={mondayStages} />
          </div>
        </header>
      )}

      {isMonday && (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                6 cas possibles
              </h2>
              <p className="text-sm text-zinc-500">
                Clique pour sauter au cas — écris ta réponse avant de lire le modèle.
              </p>
            </div>
            <span className="hidden rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-800 dark:bg-rose-950 dark:text-rose-200 sm:inline">
              Réponse modèle en bas de chaque cas
            </span>
          </div>
          <MondayCaseGrid cases={mondayCases} />
        </section>
      )}

      <article
        className={[
          "rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/40",
          isMonday ? "" : "",
        ].join(" ")}
      >
        {!isMonday && (
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-800 dark:bg-violet-950 dark:text-violet-200">
              {interview.company}
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              {interview.location}
            </span>
          </div>
        )}
        <div
          className="prose-zinc max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      {isMonday && (
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-900 dark:bg-sky-950/40">
            <p className="text-sm font-semibold text-sky-900 dark:text-sky-100">
              Révision technique
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/lessons/react/14-interview-questions" className="text-sky-800 underline dark:text-sky-300">
                  React hooks Q&A
                </Link>
              </li>
              <li>
                <Link href="/lessons/typescript/03-interview-questions" className="text-sky-800 underline dark:text-sky-300">
                  TypeScript Q&A
                </Link>
              </li>
              <li>
                <Link href="/lessons/javascript/02-medium-interview" className="text-sky-800 underline dark:text-sky-300">
                  JavaScript medium
                </Link>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/40">
            <p className="text-sm font-semibold text-violet-900 dark:text-violet-100">
              Mode entraînement
            </p>
            <p className="mt-2 text-sm leading-relaxed text-violet-800 dark:text-violet-200">
              Dans le chat : « Simule le cas 1 Automations » — je joue l&apos;interviewer,
              tu réponds à l&apos;écrit.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const { interviews } = await import("@/lib/interviews");
  return interviews.map((interview) => ({ slug: interview.slug }));
}
