import { useState, useEffect, KeyboardEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { closeExplanation, saveExplanation } from '../store/treeSlice';
import './ExplanationModal.css';

export default function ExplanationModal() {
  const dispatch = useAppDispatch();
  const { selectedNode, modalOpen } = useAppSelector((state) => state.tree);
  const [explanation, setExplanation] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setExplanation(selectedNode.explanation || '');
    }
  }, [selectedNode]);

  if (!modalOpen || !selectedNode) return null;

  const handleSave = () => {
    dispatch(saveExplanation({ nodeId: selectedNode.id, explanation }));
  };

  const handleClose = () => {
    dispatch(closeExplanation());
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    } else if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <div className="modal-header">
          <h2>{selectedNode.title}</h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>

        <div className="modal-body">
          <label htmlFor="explanation">Notes & Explanation</label>
          <textarea
            id="explanation"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Write your notes, explanations, or any content here...&#10;&#10;Tip: Use Cmd/Ctrl + S to save quickly"
            autoFocus
          />
        </div>

        <div className="modal-footer">
          <span className="hint">Press Escape to cancel, Cmd/Ctrl+S to save</span>
          <div className="modal-actions">
            <button className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
