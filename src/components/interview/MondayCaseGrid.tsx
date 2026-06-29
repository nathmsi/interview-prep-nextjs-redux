import Link from "next/link";
import type { MondayCase } from "@/lib/monday-interview";

type Props = {
  cases: MondayCase[];
};

const probabilityStyles: Record<MondayCase["probability"], string> = {
  "très probable":
    "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
  probable: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  possible: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200",
};

export function MondayCaseGrid({ cases }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {cases.map((item, index) => (
        <Link
          key={item.id}
          href={`#${item.id}`}
          className="group rounded-2xl border border-zinc-200 bg-white p-4 transition hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/5 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-violet-700"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-zinc-400">Cas {index + 1}</p>
              <h3 className="mt-0.5 text-base font-semibold text-zinc-900 group-hover:text-violet-700 dark:text-zinc-50 dark:group-hover:text-violet-300">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-500">{item.subtitle}</p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${probabilityStyles[item.probability]}`}
            >
              {item.probability}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            « {item.prompt} »
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}
