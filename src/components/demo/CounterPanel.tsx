"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { decrement, increment, reset, setStep } from "@/store/slices/counterSlice";

export function CounterPanel() {
  const dispatch = useAppDispatch();
  const { value, step } = useAppSelector((s) => s.counter);

  return (
    <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <h2 className="mb-2 font-semibold">Redux counter</h2>
      <p className="text-3xl font-mono tabular-nums">{value}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-zinc-200 px-3 py-1 text-sm dark:bg-zinc-700"
          onClick={() => dispatch(decrement())}
        >
          −
        </button>
        <button
          type="button"
          className="rounded bg-zinc-900 px-3 py-1 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          type="button"
          className="rounded border border-zinc-300 px-3 py-1 text-sm dark:border-zinc-600"
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
      </div>
      <label className="mt-3 flex items-center gap-2 text-sm">
        Step
        <input
          type="number"
          min={1}
          value={step}
          className="w-16 rounded border border-zinc-300 px-2 py-1 dark:border-zinc-600 dark:bg-zinc-900"
          onChange={(e) => dispatch(setStep(Number(e.target.value) || 1))}
        />
      </label>
    </div>
  );
}
