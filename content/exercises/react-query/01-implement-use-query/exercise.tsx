/**
 * EXERCISE react-query/01 — Basic useQuery
 *
 * Implement `useUsers()` with `useQuery` (TanStack Query):
 * - queryKey: ["users"]
 * - queryFn: fetch("/api/users"); must throw an Error if `!res.ok`,
 *   otherwise return the parsed JSON.
 *
 * `UserList` shows "loading" while loading (`isPending`), an error if
 * `isError`, otherwise the list of names.
 *
 * Run: npm run rq:01
 */

"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";

type User = { id: number; name: string };

// ---------------------------------------------------------------------------
// To implement
// ---------------------------------------------------------------------------

function useUsers() {
  // TODO: your code here
  return {
    data: undefined as User[] | undefined,
    isPending: true,
    isError: false,
    error: null as Error | null,
  };
}

// ---------------------------------------------------------------------------
// Demo — do not modify
// ---------------------------------------------------------------------------

function UserListInner() {
  const { data, isPending, isError, error } = useUsers();

  if (isPending) return <p data-testid="status">loading</p>;
  if (isError) return <p data-testid="status">error: {error?.message}</p>;

  return (
    <ul data-testid="status">
      {data?.map((user) => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

export function UserList() {
  const [client] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: false } } })
  );

  return (
    <QueryClientProvider client={client}>
      <UserListInner />
    </QueryClientProvider>
  );
}
