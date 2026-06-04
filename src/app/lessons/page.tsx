import Link from "next/link";
import { lessons, type LessonLevel } from "@/lib/lessons";

const levelLabels: Record<LessonLevel, string> = {
  easy: "Facile",
  medium: "Moyen",
  hard: "Difficile",
};

export default function LessonsIndexPage() {
  const byLevel = (["easy", "medium", "hard"] as const).map((level) => ({
    level,
    items: lessons.filter((l) => l.level === level),
  }));

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Index des leçons</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Chaque leçon a un fichier markdown, un exercice dans{" "}
        <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-800">src/exercises/</code>{" "}
        et une solution dans{" "}
        <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-800">solutions/</code>.
      </p>
      {byLevel.map(({ level, items }) => (
        <section key={level}>
          <h2 className="text-lg font-semibold">{levelLabels[level]}</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            {items.map((l) => (
              <li key={l.slug}>
                <Link href={`/lessons/${level}/${l.slug}`} className="underline">
                  {l.title}
                </Link>
                <span className="text-sm text-zinc-500"> — {l.exercisePath}</span>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
