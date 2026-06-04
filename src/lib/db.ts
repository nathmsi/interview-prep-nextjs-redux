/**
 * In-memory store for API routes (dev / interview demo).
 * Resets when the Next.js server restarts.
 */

export type Product = {
  id: string;
  name: string;
  price: number;
  category: "electronics" | "books" | "home";
};

export type CartItem = {
  productId: string;
  quantity: number;
};

const products: Product[] = [
  { id: "p1", name: "TypeScript Handbook", price: 39, category: "books" },
  { id: "p2", name: "React Patterns", price: 45, category: "books" },
  { id: "p3", name: "Mechanical Keyboard", price: 129, category: "electronics" },
  { id: "p4", name: "Desk Lamp", price: 59, category: "home" },
  { id: "p5", name: "USB-C Hub", price: 79, category: "electronics" },
];

let cart: CartItem[] = [];

export function getProducts(category?: Product["category"]): Product[] {
  if (!category) return [...products];
  return products.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCart(): CartItem[] {
  return [...cart];
}

export function setCart(items: CartItem[]): CartItem[] {
  cart = items.map((i) => ({ ...i }));
  return getCart();
}

export function addToCart(productId: string, quantity = 1): CartItem[] {
  const existing = cart.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  return getCart();
}

export function clearCart(): void {
  cart = [];
}
