/**
 * EXERCISE zustand/03 — Async actions
 *
 * Implement the `fetchUsers` action on `useUsersStore`:
 * - Sets `loading: true` and `error: null` before the request starts.
 * - On success: `data` = the parsed JSON, `loading: false`.
 * - On failure (`!res.ok`): `error` = an error message, `loading: false`.
 *
 * Hint: actions in Zustand can be plain async functions that call `set(...)`
 * whenever they need to update the store — no middleware required.
 *
 * Run: npm run zustand:03
 */

"use client";

import { create } from "zustand";

type User = { id: number; name: string };

type UsersState = {
  data: User[] | null;
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
};

// ---------------------------------------------------------------------------
// To implement
// ---------------------------------------------------------------------------

export const useUsersStore = create<UsersState>((set) => ({
  data: null,
  loading: false,
  error: null,
  fetchUsers: async () => {
    // TODO: your code here
  },
}));

// ---------------------------------------------------------------------------
// Demo — do not modify
// ---------------------------------------------------------------------------

export function UserList() {
  const { data, loading, error, fetchUsers } = useUsersStore();

  if (loading) return <p data-testid="status">loading</p>;
  if (error) return <p data-testid="status">error: {error}</p>;

  return (
    <div>
      <button type="button" data-testid="load" onClick={() => fetchUsers()}>
        Load
      </button>
      <ul data-testid="status">
        {data?.map((user) => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  );
}
