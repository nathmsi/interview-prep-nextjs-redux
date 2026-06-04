# Lesson 03 (medium) — Route Handlers (REST)

> **Level:** Medium  
> **Exercise:** `src/exercises/medium/03-route-handlers/`

## Files = routes

`src/app/api/products/route.ts` → `GET /api/products`

```ts
export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  // validation → 400
  // success → NextResponse.json(data)
}
```

## Expected HTTP codes

| Case | Code |
|------|------|
| Successful GET | 200 |
| Invalid JSON body | 400 |
| Missing resource | 404 |

## Interview questions

- Route Handler vs Server Action?
- How to type `params` in Next 15 (`Promise<{ id: string }>`)?

## Your task

Complete `validateCartBody` and the tests (no need to run Next for unit tests on the validator).
