# Algo 51 — Parse Query String

> **Category:** Full-stack / practical JS  
> **Functions:** `parseQueryString`, `stringifyQuery`  
> **Exercise:** `content/exercises/algo/08-fullstack-js/25-parse-query-string/`

## Problem

Parse `"a=1&b=2"` ↔ `{ a: "1", b: "2" }`. No URL encoding required.

## TypeScript cheatsheet

```typescript
export function parseQueryString(query: string) {
  if (!query) return {};
  return Object.fromEntries(query.split("&").map((pair) => pair.split("=") as [string, string]));
}

export function stringifyQuery(params: Record<string, string>) {
  return Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
}
```

## Run

```bash
npm run algo:51
```
