import Link from "next/link";
import { SubjectCard } from "@/components/layout/SubjectCard";
import { subjects } from "@/lib/subjects";

export default function SubjectsIndexPage() {
  return (
    <div className="space-y-8">
      <header>
        <Link href="/" className="text-sm text-zinc-500 hover:underline">
          ← Home
        </Link>
        <h1 className="mt-2 text-2xl font-bold">All subjects</h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Pick a topic — each subject has its own page with every lesson listed.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
}
