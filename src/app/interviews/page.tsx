import Link from "next/link";
import { InterviewProcessBar } from "@/components/interview/InterviewProcessBar";
import { interviewHref, interviews } from "@/lib/interviews";
import { mondayStages } from "@/lib/monday-interview";

export default function InterviewsIndexPage() {
  const monday = interviews.find((i) => i.slug === "monday-com-e2e");

  return (
    <div className="space-y-10">
      <header>
        <Link href="/" className="text-sm text-zinc-500 hover:text-violet-600">
          ← Home
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Interview prep</h1>
        <p className="mt-2 max-w-xl text-zinc-600 dark:text-zinc-400">
          Fiches entreprise, cas pratiques et réponses modèles pour réviser avant
          l&apos;entretien.
        </p>
      </header>

      {monday && (
        <Link
          href={interviewHref(monday.slug)}
          className="group block overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-br from-white to-violet-50 shadow-lg shadow-violet-500/5 transition hover:border-violet-300 hover:shadow-xl dark:border-violet-900/60 dark:from-zinc-900 dark:to-violet-950/20"
        >
          <div className="border-b border-violet-100 bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-5 text-white dark:border-violet-900">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-200">
              En cours
            </p>
            <h2 className="mt-1 text-2xl font-bold">{monday.company}</h2>
            <p className="mt-1 text-violet-100">{monday.role}</p>
          </div>
          <div className="space-y-5 p-6">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{monday.summary}</p>
            <InterviewProcessBar stages={mondayStages} />
            <p className="text-sm font-medium text-violet-700 group-hover:underline dark:text-violet-300">
              Ouvrir la fiche → 6 cas + réponses modèles
            </p>
          </div>
        </Link>
      )}
    </div>
  );
}
