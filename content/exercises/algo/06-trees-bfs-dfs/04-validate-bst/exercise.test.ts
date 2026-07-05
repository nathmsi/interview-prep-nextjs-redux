import { describe, it, expect } from "vitest";
import { TreeNode, isValidBST } from "./exercise";

function treeFromLevelOrder(vals: (number | null)[]): TreeNode | null {
  if (vals.length === 0 || vals[0] === null) return null;
  const root = new TreeNode(vals[0]!);
  const queue: TreeNode[] = [root];
  let i = 1;
  while (i < vals.length) {
    const node = queue.shift()!;
    if (vals[i] !== null && vals[i] !== undefined) {
      node.left = new TreeNode(vals[i]!);
      queue.push(node.left);
    }
    i++;
    if (i < vals.length && vals[i] !== null && vals[i] !== undefined) {
      node.right = new TreeNode(vals[i]!);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

describe("algo/06-trees-bfs-dfs/04-validate-bst", () => {
  it("accepts valid BST", () => {
    expect(isValidBST(treeFromLevelOrder([2, 1, 3]))).toBe(true);
  });

  it("rejects invalid BST", () => {
    expect(isValidBST(treeFromLevelOrder([5, 1, 4, null, null, 3, 6]))).toBe(
      false
    );
  });

  it("accepts single node", () => {
    expect(isValidBST(treeFromLevelOrder([1]))).toBe(true);
  });

  it("rejects equal left child", () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(1);
    expect(isValidBST(root)).toBe(false);
  });
});
