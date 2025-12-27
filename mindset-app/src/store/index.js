import { configureStore } from '@reduxjs/toolkit';
import treeReducer from './treeSlice';

export const store = configureStore({
  reducer: {
    tree: treeReducer
  }
});
