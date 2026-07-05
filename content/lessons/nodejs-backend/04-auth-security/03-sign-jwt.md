# Node.js 15 — Sign JWT

> **Pattern:** JWT  
> **Function:** `signJwt`  
> **Exercise:** `content/exercises/nodejs-backend/04-auth-security/03-sign-jwt/`

## Problem

Return header.payload.signature (base64url). Signature = simpleHmac(header.payload, secret) — use provided hmac fn.

## Hint

base64url(JSON), join with dots

## Run locally

```bash
npm run node:15
```
