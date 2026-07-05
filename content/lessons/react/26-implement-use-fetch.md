# React — useFetch hook

> **Exercise:** `content/exercises/react/09-implement-use-fetch/`  
> **Run:** `npm run react:09`

## Problem

`useFetch(url)` → `{ data, loading, error }` with `fetch`.

## Steps

1. `loading: true` on start
2. `fetch(url)` → `res.json()` if ok
3. Set error if `!res.ok` or network fail
4. Re-run effect when `url` changes

## Interview angle

Data fetching pattern — loading/error states, dependency on url.
