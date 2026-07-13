/**
 * EXERCISE react-query/05 — Pagination with useInfiniteQuery
 *
 * Implement `usePosts()` with `useInfiniteQuery`:
 * - queryKey: ["posts"]
 * - queryFn: fetch(`/api/posts?page=${pageParam}`), returns
 *   `{ items: Post[]; nextPage: number | null }`
 * - initialPageParam: 1
 * - getNextPageParam: return `lastPage.nextPage`
 *
 * Run: npm run rq:05
 */

"use client";

import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useState } from "react";

type Post = { id: number; title: string };
type PostsPage = { items: Post[]; nextPage: number | null };

// ---------------------------------------------------------------------------
// To implement
// ---------------------------------------------------------------------------

function usePosts() {
  // TODO: your code here
  return {
    data: undefined as { pages: PostsPage[] } | undefined,
    isPending: true,
    hasNextPage: false,
    isFetchingNextPage: false,
    fetchNextPage: () => {},
  };
}

// ---------------------------------------------------------------------------
// Demo — do not modify
// ---------------------------------------------------------------------------

function PostFeedInner() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    usePosts();

  if (isPending) return <p data-testid="status">loading</p>;

  const items = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div>
      <ul data-testid="list">
        {items.map((post) => <li key={post.id}>{post.title}</li>)}
      </ul>
      <button
        type="button"
        data-testid="load-more"
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {hasNextPage ? "Load more" : "No more posts"}
      </button>
    </div>
  );
}

export function PostFeed() {
  const [client] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: false } } })
  );

  return (
    <QueryClientProvider client={client}>
      <PostFeedInner />
    </QueryClientProvider>
  );
}
