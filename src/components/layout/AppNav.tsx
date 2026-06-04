import Link from "next/link";
import { subjects, subjectPageHref } from "@/lib/subjects";

export function AppNav() {
  return (
    <nav className="border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link
            href="/"
            className="font-semibold text-zinc-900 dark:text-zinc-50"
          >
            Front Interview Prep
          </Link>
          <ul className="flex flex-1 flex-wrap items-center gap-1 text-sm">
            {subjects.map((s) => (
              <li key={s.id}>
                <Link
                  href={subjectPageHref(s.id)}
                  className="rounded-md px-2.5 py-1.5 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
