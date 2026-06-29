import type { InterviewStage } from "@/lib/monday-interview";

type Props = {
  stages: InterviewStage[];
};

export function InterviewProcessBar({ stages }: Props) {
  return (
    <div className="overflow-x-auto pb-1">
      <ol className="flex min-w-max items-stretch gap-2">
        {stages.map((stage, index) => {
          const isDone = stage.status === "done";
          const isCurrent = stage.status === "current";

          return (
            <li key={stage.id} className="flex items-stretch">
              <div
                className={[
                  "flex w-36 flex-col rounded-xl border px-3 py-3 sm:w-40",
                  isCurrent
                    ? "border-violet-400 bg-violet-50 shadow-md shadow-violet-500/10 dark:border-violet-500 dark:bg-violet-950/40"
                    : isDone
                      ? "border-emerald-300/80 bg-emerald-50/80 dark:border-emerald-800 dark:bg-emerald-950/30"
                      : "border-zinc-200 bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/40",
                ].join(" ")}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      isCurrent
                        ? "bg-violet-600 text-white"
                        : isDone
                          ? "bg-emerald-500 text-white"
                          : "bg-zinc-200 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-300",
                    ].join(" ")}
                  >
                    {isDone ? "✓" : index + 1}
                  </span>
                  <span
                    className={[
                      "text-sm font-semibold leading-tight",
                      isCurrent
                        ? "text-violet-900 dark:text-violet-100"
                        : "text-zinc-800 dark:text-zinc-200",
                    ].join(" ")}
                  >
                    {stage.label}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-snug text-zinc-500 dark:text-zinc-400">
                  {stage.format}
                </p>
                {isCurrent && (
                  <span className="mt-2 inline-flex w-fit rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    Toi ici
                  </span>
                )}
              </div>
              {index < stages.length - 1 && (
                <span
                  aria-hidden
                  className="mx-1 hidden self-center text-zinc-300 dark:text-zinc-600 sm:inline"
                >
                  →
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
