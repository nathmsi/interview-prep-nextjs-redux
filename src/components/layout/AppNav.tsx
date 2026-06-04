import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/lessons", label: "Lessons" },
  { href: "/lessons/nextjs/01-overview-and-tooling", label: "Next.js" },
  { href: "/lessons/javascript/01-basic-interview", label: "JS" },
  { href: "/lessons/css/01-interview-questions", label: "CSS" },
  { href: "/lessons/typescript/quiz-questions", label: "TS quiz" },
  { href: "/lessons/react/quiz-questions", label: "React quiz" },
  { href: "/demo", label: "Live demo" },
];

export function AppNav() {
  return (
    <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-4 py-3">
        <Link href="/" className="font-semibold text-zinc-900 dark:text-zinc-50">
          Next + Redux Interview
        </Link>
        <ul className="flex flex-wrap gap-3 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
