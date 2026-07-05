/**
 * EXERCISE nodejs — Health Check
 *
 * Overall status down if any check is down.
 *
 * Hint: Promise.all checks
 * Run: npm run node:31
 */

export type HealthStatus = "up" | "down";
export type DependencyCheck = { name: string; status: HealthStatus };
export type HealthReport = { status: HealthStatus; checks: DependencyCheck[] };
export async function buildHealthReport(checks: Array<() => Promise<DependencyCheck>>): Promise<HealthReport> {
  // TODO: your code here
  return { status: "down", checks: [] };
}