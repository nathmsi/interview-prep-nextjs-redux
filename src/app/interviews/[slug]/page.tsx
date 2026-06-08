import Link from "next/link";
import { notFound } from "next/navigation";
import { getInterview } from "@/lib/interviews";
import { readLessonMarkdown, renderSimpleMarkdown } from "@/lib/markdown";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function InterviewPage({ params }: PageProps) {
  const { slug } = await params;
  const interview = getInterview(slug);
  if (!interview) {
    notFound();
  }

  const md = await readLessonMarkdown(interview.markdownPath);
  const html = renderSimpleMarkdown(md);

  return (
    <article className="space-y-6">
      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/interviews" className="text-zinc-500 hover:underline">
          ← Interview angles
        </Link>
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
          {interview.company}
        </span>
        <span className="rounded-full bg-zinc-200 px-2 py-0.5 dark:bg-zinc-800">
          {interview.location}
        </span>
      </div>

      <div
        className="prose-zinc max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <section className="rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900 dark:border-sky-900 dark:bg-sky-950/50 dark:text-sky-200">
        <p className="font-semibold">Révision technique</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>
            <Link href="/lessons/react/14-interview-questions" className="underline">
              React hooks Q&A
            </Link>
          </li>
          <li>
            <Link href="/lessons/typescript/03-interview-questions" className="underline">
              TypeScript Q&A
            </Link>
          </li>
          <li>
            <Link href="/lessons/javascript/02-medium-interview" className="underline">
              JavaScript medium
            </Link>
          </li>
          <li>
            <Link href="/lessons/ai/06-interview-talking-points" className="underline">
              AI interview talking points
            </Link>
          </li>
        </ul>
      </section>
    </article>
  );
}

export async function generateStaticParams() {
  const { interviews } = await import("@/lib/interviews");
  return interviews.map((interview) => ({ slug: interview.slug }));
}
