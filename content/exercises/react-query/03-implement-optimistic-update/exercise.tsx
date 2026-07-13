/**
 * EXERCISE react-query/03 — Optimistic mutation with rollback
 *
 * Implement `useToggleTodo()` with `useMutation`:
 * - mutationFn: POST "/api/todos/:id/toggle", throw if `!res.ok`
 * - onMutate: cancel any in-flight refetches (`queryClient.cancelQueries`),
 *   snapshot the current data (`queryClient.getQueryData`), apply the
 *   optimistic update (`queryClient.setQueryData`), and return
 *   `{ previous }` as context.
 * - onError: if the mutation fails, restore `context.previous` with
 *   `queryClient.setQueryData`.
 * - onSettled: invalidate ["todos"] to resync with the server.
 *
 * Run: npm run rq:03
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

type Todo = { id: number; title: string; done: boolean };

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

function useToggleTodo() {
  // TODO: your code here
  return useMutation({
    mutationFn: async (id: number) => {
      void id;
      throw new Error("not implemented");
    },
  });
}

// ---------------------------------------------------------------------------
// Demo — do not modify
// ---------------------------------------------------------------------------

function TodoListInner() {
  const { data: todos } = useTodos();
  const { mutate } = useToggleTodo();

  return (
    <ul data-testid="list">
      {todos?.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            data-testid={`toggle-${todo.id}`}
            checked={todo.done}
            onChange={() => mutate(todo.id)}
          />
          {todo.title}
        </li>
      ))}
    </ul>
  );
}

export function TodoList() {
  const [client] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: false } } })
  );

  return (
    <QueryClientProvider client={client}>
      <TodoListInner />
    </QueryClientProvider>
  );
}
