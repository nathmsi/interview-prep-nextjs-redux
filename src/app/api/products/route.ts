import { NextRequest, NextResponse } from "next/server";
import { getProducts, type Product } from "@/lib/db";

const VALID_CATEGORIES: Product["category"][] = ["electronics", "books", "home"];

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  if (category && !VALID_CATEGORIES.includes(category as Product["category"])) {
    return NextResponse.json(
      { error: "Invalid category", valid: VALID_CATEGORIES },
      { status: 400 }
    );
  }
  const items = getProducts(
    category ? (category as Product["category"]) : undefined
  );
  return NextResponse.json(items);
}
