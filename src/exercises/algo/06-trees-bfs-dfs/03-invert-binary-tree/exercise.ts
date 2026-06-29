/**
 * EXERCISE algo/06 — Invert Binary Tree
 *
 * Mirror the tree — swap left and right children at every node.
 *
 * Examples
 * - [4, 2, 7, 1, 3, 6, 9] → [4, 7, 2, 9, 6, 3, 1]
 * - [2, 1, 3]             → [2, 3, 1]
 * - []                    → []
 *
 * Hint: recursive DFS — swap children, then invert subtrees
 * Run: npm run algo:22
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

export function invertTree(root: TreeNode | null): TreeNode | null {
  // TODO: your code here
  return root;
}
