# Algo 48 — Compose

> **Category:** Full-stack / practical JS  
> **Function:** `compose`  
> **Exercise:** `content/exercises/algo/08-fullstack-js/22-compose/`

## Problem

`compose(f, g, h)(x)` === `f(g(h(x)))`. Right-to-left application.

## TypeScript cheatsheet

```typescript
return (arg: T) => fns.reduceRight((acc, fn) => fn(acc), arg);
```

## Run

```bash
npm run algo:48
```
