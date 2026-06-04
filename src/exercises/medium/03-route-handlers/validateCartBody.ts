/**
 * EXERCISE medium/03 — validation body POST /api/cart
 * Lesson: lessons/medium/03-route-handlers.md
 */

import type { CartItem } from "@/lib/db";

type CardBodyErrorResult = { ok: false; error: string };

export type CartBodyResult =
  | { ok: true; items: CartItem[] }
  | CardBodyErrorResult;

type Body = {
  items: Array<unknown>,
}

export function validateCartBody(body: Body): CartBodyResult {
  const errorBodyResult: CardBodyErrorResult = { ok: false, error: '' };
  if (typeof body !== 'object') {
    errorBodyResult.error = 'body must be on object';
    return errorBodyResult;
  }

  if (typeof body.items !== 'object') {
    errorBodyResult.error = 'body.items must be on object(Array)';
    return errorBodyResult;
  }


  body.items.map(item => {
    if (typeof item !== 'object') {
    errorBodyResult.error = 'item must be on object(Array)';
    return errorBodyResult;
  }
    if (typeof item.productId !== 'number') {
      errorBodyResult.error = 'body.items.length must be on number';
      return errorBodyResult;
    }

  })




  return { ok: true, items: body.items };

}
