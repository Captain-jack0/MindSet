export interface TreeNode {
  id: string;
  title: string;
  children: TreeNode[];
  explanation?: string;
}

export interface TreeState {
  tree: TreeNode;
  selectedNode: TreeNode | null;
  modalOpen: boolean;
}

export interface UpdateNodePayload {
  nodeId: string;
  updates: Partial<TreeNode>;
}

export interface AddChildPayload {
  parentId: string;
  title?: string;
}

export interface SaveExplanationPayload {
  nodeId: string;
  explanation: string;
}
