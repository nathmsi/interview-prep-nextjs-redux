import Link from "next/link";
import { interviewHref, interviews } from "@/lib/interviews";

export default function InterviewsIndexPage() {
  return (
    <div className="space-y-8">
      <header>
        <Link href="/" className="text-sm text-zinc-500 hover:underline">
          ← Home
        </Link>
        <h1 className="mt-2 text-2xl font-bold">Interview angles</h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Fiches entreprise + poste + profil + questions/réponses pour réviser avant
          l&apos;entretien.
        </p>
      </header>

      <ul className="space-y-4">
        {interviews.map((interview) => (
          <li key={interview.slug}>
            <Link
              href={interviewHref(interview.slug)}
              className="block rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
                {interview.company}
              </p>
              <h2 className="mt-1 font-semibold text-zinc-900 dark:text-zinc-50">
                {interview.role}
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {interview.date}
                {interview.interviewer ? ` · ${interview.interviewer}` : ""}
              </p>
              <p className="mt-2 text-sm text-zinc-500">{interview.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
