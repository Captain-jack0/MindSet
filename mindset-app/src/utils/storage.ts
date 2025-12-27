import type { TreeNode } from '../types';
import { generateId } from './helpers';

const STORAGE_KEY = 'mindset-tree';

export const getDefaultTree = (): TreeNode => ({
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
          explanation:
            'Welcome to your roadmap! Click on leaf nodes to add notes and explanations.',
        },
        {
          id: generateId(),
          title: 'Setup',
          children: [],
          explanation: '',
        },
      ],
    },
  ],
});

export const loadTreeFromStorage = (): TreeNode => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : getDefaultTree();
  } catch {
    return getDefaultTree();
  }
};

export const saveTreeToStorage = (tree: TreeNode): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tree));
};

export const clearTreeStorage = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
