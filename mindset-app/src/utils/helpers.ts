import type { TreeNode } from '../types';

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const findAndUpdateNode = (
  node: TreeNode,
  nodeId: string,
  updates: Partial<TreeNode>
): TreeNode => {
  if (node.id === nodeId) {
    return { ...node, ...updates };
  }
  return {
    ...node,
    children: (node.children || []).map((child) =>
      findAndUpdateNode(child, nodeId, updates)
    ),
  };
};

export const findAndAddChild = (
  node: TreeNode,
  parentId: string,
  newNode: TreeNode
): TreeNode => {
  if (node.id === parentId) {
    return {
      ...node,
      children: [...(node.children || []), newNode],
    };
  }
  return {
    ...node,
    children: (node.children || []).map((child) =>
      findAndAddChild(child, parentId, newNode)
    ),
  };
};

export const findAndDeleteNode = (node: TreeNode, nodeId: string): TreeNode => {
  return {
    ...node,
    children: (node.children || [])
      .filter((child) => child.id !== nodeId)
      .map((child) => findAndDeleteNode(child, nodeId)),
  };
};

export const isLeafNode = (node: TreeNode): boolean => {
  return !node.children || node.children.length === 0;
};
