/**
 * EXERCISE algo/06 — Validate Binary Search Tree
 *
 * Return true if the tree is a valid BST:
 * left subtree values < node < right subtree values (strict).
 *
 * Examples
 * - [2, 1, 3]     → true
 * - [5, 1, 4, null, null, 3, 6] → false (4 < 5 but in right subtree)
 * - [1]           → true
 *
 * Hint: DFS with min/max bounds, or in-order traversal
 * Run: npm run algo:23
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

export function isValidBST(root: TreeNode | null): boolean {
  // TODO: your code here
  return true;
}
