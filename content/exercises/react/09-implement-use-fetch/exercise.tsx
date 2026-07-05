/**
 * EXERCISE react/09 — useFetch hook
 *
 * Implement useFetch(url) returning { data, loading, error }.
 * - loading true while fetching
 * - data is JSON body on success (mocked in tests)
 * - error is message string on failure
 * - refetch when url changes
 * Run: npm run react:09
 */

"use client";

import { useEffect, useState } from "react";

export type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useFetch<T>(url: string): FetchState<T> {
  // TODO: your code here
  return { data: null, loading: false, error: null };
}

export function UserCard({ userId }: { userId: string }): React.ReactElement {
  const { data, loading, error } = useFetch<{ name: string }>(
    `/api/users/${userId}`
  );

  if (loading) return <p data-testid="status">loading</p>;
  if (error) return <p data-testid="status">error: {error}</p>;
  return <p data-testid="status">{data?.name ?? "empty"}</p>;
}
