import { NextRequest, NextResponse } from "next/server";
import { getCart, setCart, type CartItem } from "@/lib/db";

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;
  const o = value as Record<string, unknown>;
  return (
    typeof o.productId === "string" &&
    typeof o.quantity === "number" &&
    o.quantity >= 0 &&
    Number.isInteger(o.quantity)
  );
}

export async function GET() {
  return NextResponse.json({ items: getCart() });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("items" in body) ||
    !Array.isArray((body as { items: unknown }).items)
  ) {
    return NextResponse.json(
      { error: "Body must be { items: CartItem[] }" },
      { status: 400 }
    );
  }

  const raw = (body as { items: unknown[] }).items;
  if (!raw.every(isCartItem)) {
    return NextResponse.json(
      { error: "Each item needs productId: string and quantity: int >= 0" },
      { status: 400 }
    );
  }

  const items = setCart(raw);
  return NextResponse.json({ items });
}

export async function DELETE() {
  setCart([]);
  return NextResponse.json({ items: [] });
}
