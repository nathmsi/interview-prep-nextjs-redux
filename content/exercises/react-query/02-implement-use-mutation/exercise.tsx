/**
 * EXERCISE react-query/02 — useMutation + cache invalidation
 *
 * Implement `useAddTodo()` with `useMutation`:
 * - mutationFn: POST "/api/todos" with `{ title }` as body, throw if `!res.ok`
 * - onSuccess: invalidate the ["todos"] query (`queryClient.invalidateQueries`)
 *   to trigger a refetch of the list.
 *
 * `useTodos()` (GET "/api/todos") is already provided.
 *
 * Run: npm run rq:02
 */

"use client";

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

type Todo = { id: number; title: string };

// ---------------------------------------------------------------------------
// Provided
// ---------------------------------------------------------------------------

function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch("/api/todos");
      if (!res.ok) throw new Error("failed to load todos");
      return res.json() as Promise<Todo[]>;
    },
  });
}

// ---------------------------------------------------------------------------
// To implement
// ---------------------------------------------------------------------------

function useAddTodo() {
  // TODO: your code here
  return useMutation({
    mutationFn: async (title: string) => {
      void title;
      throw new Error("not implemented");
    },
  });
}

// ---------------------------------------------------------------------------
// Demo — do not modify
// ---------------------------------------------------------------------------

function TodoAppInner() {
  const { data: todos, isPending } = useTodos();
  const { mutate, isPending: isAdding } = useAddTodo();
  const [title, setTitle] = useState("");

  if (isPending) return <p data-testid="status">loading</p>;

  return (
    <div>
      <ul data-testid="list">
        {todos?.map((todo) => <li key={todo.id}>{todo.title}</li>)}
      </ul>
      <input
        data-testid="input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="button"
        data-testid="add"
        disabled={isAdding}
        onClick={() => mutate(title, { onSuccess: () => setTitle("") })}
      >
        Add
      </button>
    </div>
  );
}

export function TodoApp() {
  const [client] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: false } } })
  );

  return (
    <QueryClientProvider client={client}>
      <TodoAppInner />
    </QueryClientProvider>
  );
}
