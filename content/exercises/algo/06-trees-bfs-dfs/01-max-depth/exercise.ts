/**
 * EXERCISE algo/06 — Maximum Depth of Binary Tree
 *
 * Return the maximum depth (number of nodes along longest root-to-leaf path).
 *
 * Examples
 * - [3, 9, 20, null, null, 15, 7] → 3
 * - [1, null, 2]                   → 2
 *
 * Hint: recursive DFS — 1 + max(left, right)
 * Run: npm run algo:20
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

export function maxDepth(root: TreeNode | null): number {
  // TODO: your code here
  return 0;
}
