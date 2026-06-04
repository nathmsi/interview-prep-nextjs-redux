import Link from "next/link";
import { lessons, lessonTracks, type LessonTrack } from "@/lib/lessons";

const trackLabels: Record<LessonTrack, string> = {
  react: "React hooks (course)",
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export default function LessonsIndexPage() {
  const byTrack = lessonTracks.map((track) => ({
    track,
    items: lessons.filter((l) => l.track === track),
  }));

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Lessons index</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        <strong>React</strong> track = theory + one example per hook (no exercise).{" "}
        <strong>Easy / medium / hard</strong> = Next.js + Redux with hands-on exercises.
      </p>
      {byTrack.map(({ track, items }) => (
        <section key={track}>
          <h2 className="text-lg font-semibold">{trackLabels[track]}</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            {items.map((l) => (
              <li key={l.slug}>
                <Link href={`/lessons/${track}/${l.slug}`} className="underline">
                  {l.title}
                </Link>
                {l.kind === "exercise" && (
                  <span className="text-sm text-zinc-500"> — {l.exercisePath}</span>
                )}
                {l.kind === "course" && (
                  <span className="text-sm text-zinc-500"> — read only</span>
                )}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
