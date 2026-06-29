/**
 * EXERCISE nodejs — In-Memory Repository
 *
 * Auto-increment id starting at 1.
 *
 * Hint: Private counter and Map or array
 * Run: npm run node:17
 */

export type Entity = { id: number; [key: string]: unknown };
export class InMemoryRepository<T extends Entity> {
  constructor() {}
  create(data: Omit<T, "id">): T { throw new Error("TODO"); }
  findById(id: number): T | undefined { return undefined; }
  findAll(): T[] { return []; }
  update(id: number, data: Partial<Omit<T, "id">>): T | undefined { return undefined; }
  delete(id: number): boolean { return false; }
} {
  // TODO: your code here
}