import { useAppSelector, useAppDispatch } from '../store/hooks';
import { resetTree } from '../store/treeSlice';
import ParentNode from './ParentNode';
import ExplanationModal from './ExplanationModal';
import './Tree.css';

export default function Tree() {
  const dispatch = useAppDispatch();
  const { tree } = useAppSelector((state) => state.tree);

  const handleReset = () => {
    if (confirm('Reset the entire roadmap to default? This cannot be undone.')) {
      dispatch(resetTree());
    }
  };

  return (
    <div className="tree-container">
      <header className="tree-header">
        <div className="header-content">
          <h1>MindSet</h1>
          <p className="subtitle">Create your learning roadmap</p>
        </div>
        <div className="header-actions">
          <button className="reset-btn" onClick={handleReset}>
            Reset Roadmap
          </button>
        </div>
      </header>

      <div className="tree-instructions">
        <div className="instruction">
          <span className="instruction-icon">🖱️</span>
          <span>Double-click to rename nodes</span>
        </div>
        <div className="instruction">
          <span className="instruction-icon">➕</span>
          <span>Hover and click + to add children</span>
        </div>
        <div className="instruction">
          <span className="instruction-icon">📄</span>
          <span>Click leaf nodes to add notes</span>
        </div>
      </div>

      <div className="tree-wrapper">
        <ParentNode node={tree} />
      </div>

      <ExplanationModal />
    </div>
  );
}
