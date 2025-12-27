import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  TreeNode,
  TreeState,
  UpdateNodePayload,
  AddChildPayload,
  SaveExplanationPayload,
} from '../types';
import {
  generateId,
  findAndUpdateNode,
  findAndAddChild,
  findAndDeleteNode,
} from '../utils/helpers';
import {
  loadTreeFromStorage,
  saveTreeToStorage,
  getDefaultTree,
} from '../utils/storage';

const initialState: TreeState = {
  tree: loadTreeFromStorage(),
  selectedNode: null,
  modalOpen: false,
};

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    updateNode: (state, action: PayloadAction<UpdateNodePayload>) => {
      const { nodeId, updates } = action.payload;
      state.tree = findAndUpdateNode(state.tree, nodeId, updates);
      saveTreeToStorage(state.tree);
    },
    addChild: (state, action: PayloadAction<AddChildPayload>) => {
      const { parentId, title = 'New Node' } = action.payload;
      const newNode: TreeNode = {
        id: generateId(),
        title,
        children: [],
        explanation: '',
      };
      state.tree = findAndAddChild(state.tree, parentId, newNode);
      saveTreeToStorage(state.tree);
    },
    deleteNode: (state, action: PayloadAction<string>) => {
      const nodeId = action.payload;
      if (nodeId !== 'root') {
        state.tree = findAndDeleteNode(state.tree, nodeId);
        saveTreeToStorage(state.tree);
      }
    },
    openExplanation: (state, action: PayloadAction<TreeNode>) => {
      state.selectedNode = action.payload;
      state.modalOpen = true;
    },
    closeExplanation: (state) => {
      state.selectedNode = null;
      state.modalOpen = false;
    },
    saveExplanation: (state, action: PayloadAction<SaveExplanationPayload>) => {
      const { nodeId, explanation } = action.payload;
      state.tree = findAndUpdateNode(state.tree, nodeId, { explanation });
      state.selectedNode = null;
      state.modalOpen = false;
      saveTreeToStorage(state.tree);
    },
    resetTree: (state) => {
      state.tree = getDefaultTree();
      saveTreeToStorage(state.tree);
    },
  },
});

export const {
  updateNode,
  addChild,
  deleteNode,
  openExplanation,
  closeExplanation,
  saveExplanation,
  resetTree,
} = treeSlice.actions;

export default treeSlice.reducer;
