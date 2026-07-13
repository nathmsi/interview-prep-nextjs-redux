/**
 * EXERCISE react-query/04 — Dependent query (enabled)
 *
 * Implement `usePosts(userId)` with `useQuery`:
 * - queryKey: ["posts", userId]
 * - queryFn: fetch(`/api/users/${userId}/posts`), throw if `!res.ok`
 * - enabled: the request must NOT fire while `userId` is `undefined`
 *   (hint: `enabled: userId !== undefined`)
 *
 * Run: npm run rq:04
 */

"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";

type Post = { id: number; title: string };

// ---------------------------------------------------------------------------
// To implement
// ---------------------------------------------------------------------------

function usePosts(userId: number | undefined) {
  // TODO: your code here
  return {
    data: undefined as Post[] | undefined,
    isPending: true,
  };
}

// ---------------------------------------------------------------------------
// Demo — do not modify
// ---------------------------------------------------------------------------

function UserPostsInner() {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const { data: posts, isPending } = usePosts(userId);

  return (
    <div>
      <button
        type="button"
        data-testid="select-user"
        onClick={() => setUserId(1)}
      >
        Select user 1
      </button>
      {userId === undefined && <p data-testid="status">no user selected</p>}
      {userId !== undefined && isPending && (
        <p data-testid="status">loading posts</p>
      )}
      {userId !== undefined && !isPending && (
        <ul data-testid="status">
          {posts?.map((post) => <li key={post.id}>{post.title}</li>)}
        </ul>
      )}
    </div>
  );
}

export function UserPosts() {
  const [client] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: false } } })
  );

  return (
    <QueryClientProvider client={client}>
      <UserPostsInner />
    </QueryClientProvider>
  );
}
