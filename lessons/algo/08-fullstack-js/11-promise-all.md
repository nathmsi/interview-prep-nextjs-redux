# Algo 37 — Promise All

> **Category:** Full-stack / practical JS  
> **Function:** `promiseAll`  
> **Exercise:** `src/exercises/algo/08-fullstack-js/11-promise-all/`

## Problem

Like `Promise.all` — resolve all in order, reject on first failure.

## TypeScript cheatsheet

```typescript
return new Promise((resolve, reject) => {
  if (promises.length === 0) return resolve([]);

  const results: T[] = new Array(promises.length);
  let remaining = promises.length;

  promises.forEach((promise, index) => {
    Promise.resolve(promise)
      .then((value) => {
        results[index] = value;
        remaining--;
        if (remaining === 0) resolve(results);
      })
      .catch(reject);
  });
});
```

## Run

```bash
npm run algo:37
```
