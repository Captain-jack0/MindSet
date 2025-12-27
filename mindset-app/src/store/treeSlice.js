import { createSlice } from '@reduxjs/toolkit';

const generateId = () => Math.random().toString(36).substr(2, 9);

const defaultTree = {
  id: 'root',
  title: 'My Roadmap',
  children: [
    {
      id: generateId(),
      title: 'Getting Started',
      children: [
        {
          id: generateId(),
          title: 'Introduction',
          children: [],
          explanation: 'Welcome to your roadmap! Click on leaf nodes to add notes and explanations.'
        },
        {
          id: generateId(),
          title: 'Setup',
          children: [],
          explanation: ''
        }
      ]
    }
  ]
};

const loadTreeFromStorage = () => {
  try {
    const saved = localStorage.getItem('mindset-tree');
    return saved ? JSON.parse(saved) : defaultTree;
  } catch {
    return defaultTree;
  }
};

const saveTreeToStorage = (tree) => {
  localStorage.setItem('mindset-tree', JSON.stringify(tree));
};

const findAndUpdateNode = (node, nodeId, updates) => {
  if (node.id === nodeId) {
    return { ...node, ...updates };
  }
  return {
    ...node,
    children: (node.children || []).map(child => findAndUpdateNode(child, nodeId, updates))
  };
};

const findAndAddChild = (node, parentId, newNode) => {
  if (node.id === parentId) {
    return {
      ...node,
      children: [...(node.children || []), newNode]
    };
  }
  return {
    ...node,
    children: (node.children || []).map(child => findAndAddChild(child, parentId, newNode))
  };
};

const findAndDeleteNode = (node, nodeId) => {
  return {
    ...node,
    children: (node.children || [])
      .filter(child => child.id !== nodeId)
      .map(child => findAndDeleteNode(child, nodeId))
  };
};

const initialState = {
  tree: loadTreeFromStorage(),
  selectedNode: null,
  modalOpen: false
};

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    updateNode: (state, action) => {
      const { nodeId, updates } = action.payload;
      state.tree = findAndUpdateNode(state.tree, nodeId, updates);
      saveTreeToStorage(state.tree);
    },
    addChild: (state, action) => {
      const { parentId, title = 'New Node' } = action.payload;
      const newNode = {
        id: generateId(),
        title,
        children: [],
        explanation: ''
      };
      state.tree = findAndAddChild(state.tree, parentId, newNode);
      saveTreeToStorage(state.tree);
    },
    deleteNode: (state, action) => {
      const nodeId = action.payload;
      if (nodeId !== 'root') {
        state.tree = findAndDeleteNode(state.tree, nodeId);
        saveTreeToStorage(state.tree);
      }
    },
    openExplanation: (state, action) => {
      state.selectedNode = action.payload;
      state.modalOpen = true;
    },
    closeExplanation: (state) => {
      state.selectedNode = null;
      state.modalOpen = false;
    },
    saveExplanation: (state, action) => {
      const { nodeId, explanation } = action.payload;
      state.tree = findAndUpdateNode(state.tree, nodeId, { explanation });
      state.selectedNode = null;
      state.modalOpen = false;
      saveTreeToStorage(state.tree);
    },
    resetTree: (state) => {
      state.tree = defaultTree;
      saveTreeToStorage(state.tree);
    }
  }
});

export const {
  updateNode,
  addChild,
  deleteNode,
  openExplanation,
  closeExplanation,
  saveExplanation,
  resetTree
} = treeSlice.actions;

export default treeSlice.reducer;
