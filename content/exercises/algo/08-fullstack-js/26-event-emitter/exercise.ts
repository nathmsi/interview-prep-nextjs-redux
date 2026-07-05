/**
 * EXERCISE algo/08 — Event Emitter
 *
 * Minimal pub/sub: on, off, emit.
 * - on(event, listener)  — subscribe
 * - off(event, listener)  — unsubscribe (same function reference)
 * - emit(event, ...args)  — call all listeners for event
 *
 * Hint: Map<string, Set<listener>>
 * Run: npm run algo:52
 */

type Listener = (...args: unknown[]) => void;

export class EventEmitter {
  // TODO: your code here

  on(_event: string, _listener: Listener): void {
    throw new Error("Not implemented");
  }

  off(_event: string, _listener: Listener): void {
    throw new Error("Not implemented");
  }

  emit(_event: string, ..._args: unknown[]): void {
    throw new Error("Not implemented");
  }
}
