# Node.js 01 — Parse URL

> **Pattern:** URL parsing  
> **Function:** `parseUrl`  
> **Exercise:** `content/exercises/nodejs-backend/01-http-fundamentals/01-parse-url/`

## Problem

Given `/users?page=2&limit=10`, return `{ pathname, query }`. Decode URI components. First value wins for duplicate keys.

## Hint

Split on `?`, parse query with `&` and `=`.

## Run locally

```bash
npm run node:01
```
