import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateNode, addChild } from '../store/treeSlice';
import ChildNode from './ChildNode';
import LeafNode from './LeafNode';
import './ParentNode.css';

export default function ParentNode({ node }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(node.title);
  const [showActions, setShowActions] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

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

  const handleAddChild = (e) => {
    e.stopPropagation();
    dispatch(addChild({ parentId: node.id }));
  };

  const isLeafChild = (child) => {
    return !child.children || child.children.length === 0;
  };

  return (
    <div className="parent-node">
      <div
        className="parent-node-header"
        onDoubleClick={handleDoubleClick}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <span className="parent-icon">🗂️</span>

        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            autoFocus
            className="parent-title-input"
          />
        ) : (
          <span className="parent-title">{node.title}</span>
        )}

        {hasChildren && (
          <span className="total-count">{node.children.length} items</span>
        )}

        {showActions && (
          <div className="parent-actions">
            <button
              className="action-btn add-btn"
              onClick={handleAddChild}
              title="Add child"
            >
              + Add Section
            </button>
          </div>
        )}
      </div>

      {hasChildren && (
        <div className="parent-children">
          <div className="main-connector"></div>
          {node.children.map((child) => (
            <div key={child.id} className="parent-child-item">
              <div className="branch-connector"></div>
              {isLeafChild(child) ? (
                <LeafNode node={child} />
              ) : (
                <ChildNode node={child} level={1} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
