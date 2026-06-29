# Node.js 23 — Request Dedup

> **Pattern:** Concurrency  
> **Function:** `dedupeRequests`  
> **Exercise:** `src/exercises/nodejs-backend/06-rate-limit-cache/03-request-dedup/`

## Problem

Same key in flight shares one promise.

## Hint

Map key -> promise, delete on settle

## Run locally

```bash
npm run node:23
```
