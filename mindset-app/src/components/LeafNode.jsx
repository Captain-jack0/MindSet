import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openExplanation, updateNode, deleteNode } from '../store/treeSlice';
import './LeafNode.css';

export default function LeafNode({ node }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(node.title);
  const [showActions, setShowActions] = useState(false);

  const hasExplanation = node.explanation && node.explanation.trim() !== '';

  const handleClick = () => {
    dispatch(openExplanation(node));
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditTitle(node.title);
  };

  const handleTitleSave = () => {
    if (editTitle.trim()) {
      dispatch(updateNode({ nodeId: node.id, updates: { title: editTitle.trim() } }));
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(node.title);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm(`Delete "${node.title}"?`)) {
      dispatch(deleteNode(node.id));
    }
  };

  return (
    <div
      className={`leaf-node ${hasExplanation ? 'has-explanation' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <span className="leaf-icon">📄</span>

      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleTitleSave}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
          autoFocus
          className="leaf-title-input"
        />
      ) : (
        <span className="leaf-title">{node.title}</span>
      )}

      {hasExplanation && (
        <span className="note-badge" title="Has notes">
          <span className="note-icon">📝</span>
        </span>
      )}

      {showActions && (
        <div className="leaf-actions">
          <button
            className="action-btn delete-btn"
            onClick={handleDelete}
            title="Delete"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
