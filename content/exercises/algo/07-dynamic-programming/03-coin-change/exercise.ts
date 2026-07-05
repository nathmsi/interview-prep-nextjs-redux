/**
 * EXERCISE algo/07 — Coin Change
 *
 * Fewest coins needed to make amount. Return -1 if impossible.
 *
 * Examples
 * - coins = [1, 2, 5], amount = 11 → 3  (5+5+1)
 * - coins = [2], amount = 3          → -1
 * - coins = [1], amount = 0          → 0
 *
 * Hint: dp[0..amount], dp[a] = min(dp[a], 1 + dp[a - coin])
 * Run: npm run algo:26
 */

export function coinChange(coins: number[], amount: number): number {
  // TODO: your code here
  return -1;
}
