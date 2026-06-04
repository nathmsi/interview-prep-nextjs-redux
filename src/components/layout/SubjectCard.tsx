import Link from "next/link";
import type { Subject } from "@/lib/subjects";
import { lessonCountForSubject } from "@/lib/subjects";

type Props = {
  subject: Subject;
};

export function SubjectCard({ subject }: Props) {
  const count = lessonCountForSubject(subject);

  return (
    <Link
      href={subject.entryHref}
      className="group block rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
    >
      <h2 className="text-lg font-semibold text-zinc-900 group-hover:underline dark:text-zinc-50">
        {subject.label}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {subject.description}
      </p>
      <p className="mt-3 text-xs font-medium text-zinc-500">
        {count} lesson{count === 1 ? "" : "s"} →
      </p>
    </Link>
  );
}
