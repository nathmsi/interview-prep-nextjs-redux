import Link from "next/link";
import { getLessonsByTrack } from "@/lib/lessons";

export default function HomePage() {
  const tracks = ["react", "easy", "medium", "hard"] as const;
  const trackTitles: Record<(typeof tracks)[number], string> = {
    react: "React hooks (course + examples)",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">
          Interview Recap — Next.js + React + Redux
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Practice repo with a real Next.js server (Route Handlers), a typed Redux Toolkit
          store, React hook courses (no exercises), and easy / medium / hard labs with solutions.
        </p>
      </section>

      <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/40">
        <h2 className="font-semibold text-emerald-900 dark:text-emerald-200">
          Get started
        </h2>
        <pre className="mt-2 overflow-x-auto rounded bg-white/80 p-3 text-sm dark:bg-zinc-900">
{`cd interview-prep-nextjs-redux
npm install
npm run dev
# → http://localhost:3000`}
        </pre>
        <p className="mt-2 text-sm">
          API:{" "}
          <Link href="/api/health" className="underline">
            /api/health
          </Link>
          ,{" "}
          <Link href="/api/products" className="underline">
            /api/products
          </Link>
          ,{" "}
          <Link href="/api/cart" className="underline">
            /api/cart
          </Link>
        </p>
      </section>

      {tracks.map((track) => (
        <section key={track}>
          <h2 className="mb-3 text-lg font-semibold">{trackTitles[track]}</h2>
          <ul className="space-y-2">
            {getLessonsByTrack(track).map((lesson) => (
              <li key={lesson.slug}>
                <Link
                  href={`/lessons/${track}/${lesson.slug}`}
                  className="block rounded-lg border border-zinc-200 p-3 transition hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
                >
                  <span className="font-medium">
                    {String(lesson.number).padStart(2, "0")} — {lesson.title}
                  </span>
                  <span className="mt-1 block text-sm text-zinc-500">
                    {lesson.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="text-sm text-zinc-500">
        Full index:{" "}
        <Link href="/lessons" className="underline">
          /lessons
        </Link>
        {" · "}
        <Link href="/demo" className="underline">
          interactive demo
        </Link>
      </p>
    </div>
  );
}
