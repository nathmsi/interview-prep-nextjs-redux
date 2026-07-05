import Link from "next/link";
import { notFound } from "next/navigation";
import {
  exerciseCountForExpressSection,
  expressHref,
  expressSections,
  getExpressSection,
} from "@/lib/nodejs-express";

type PageProps = {
  params: Promise<{ section: string }>;
};

export function generateStaticParams() {
  return expressSections.map((section) => ({ section: section.slug }));
}

export default async function ExpressSectionPage({ params }: PageProps) {
  const { section: sectionSlug } = await params;
  const section = getExpressSection(sectionSlug);
  if (!section) notFound();

  const count = exerciseCountForExpressSection(section);

  return (
    <div className="space-y-8">
      <div className="text-sm">
        <Link href="/express" className="text-zinc-500 hover:underline">
          ← Express exercises
        </Link>
      </div>

      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Section {String(section.number).padStart(2, "0")}
        </p>
        <h1 className="text-3xl font-bold tracking-tight">{section.title}</h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          {section.description}
        </p>
        <p className="text-sm text-zinc-500">
          {count} exercise{count === 1 ? "" : "s"}
        </p>
      </header>

      <div className="space-y-10">
        {section.subsections.map((subsection) => (
          <section key={subsection.slug}>
            <h2 className="text-lg font-semibold">{subsection.title}</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {subsection.description}
            </p>
            <ul className="mt-4 space-y-3">
              {subsection.exercises.map((exercise) => (
                <li key={exercise.slug}>
                  <Link
                    href={expressHref(section.slug, exercise.slug)}
                    className="block rounded-lg border border-zinc-200 p-4 transition hover:border-zinc-400 dark:border-zinc-800"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">
                        {String(exercise.number).padStart(2, "0")} — {exercise.title}
                      </span>
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800">
                        {exercise.pattern}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-zinc-500">{exercise.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
