# Algo 40 — Promise Race

> **Category:** Full-stack / practical JS  
> **Function:** `promiseRace`  
> **Exercise:** `content/exercises/algo/08-fullstack-js/14-promise-race/`

## Problem

Like `Promise.race` — settle with the first promise that resolves or rejects.

## TypeScript cheatsheet

```typescript
return new Promise((resolve, reject) => {
  for (const promise of promises) {
    Promise.resolve(promise).then(resolve).catch(reject);
  }
});
```

## Run

```bash
npm run algo:40
```
