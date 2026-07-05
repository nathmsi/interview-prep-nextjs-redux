/**
 * EXERCISE algo/06 — Binary Tree Level Order Traversal
 *
 * Return values level by level (left to right).
 *
 * Examples
 * - [3, 9, 20, null, null, 15, 7] → [[3], [9, 20], [15, 7]]
 * - [1]                           → [[1]]
 * - []                            → []
 *
 * Hint: BFS with a queue, track level size
 * Run: npm run algo:21
 */

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(
    val?: number,
    left?: TreeNode | null,
    right?: TreeNode | null
  ) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

export function levelOrder(root: TreeNode | null): number[][] {
  // TODO: your code here
  return [];
}
