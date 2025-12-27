import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateNode, addChild, deleteNode } from '../store/treeSlice';
import LeafNode from './LeafNode';
import './ChildNode.css';

export default function ChildNode({ node, level = 1 }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(node.title);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showActions, setShowActions] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
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

  const handleAddChild = (e) => {
    e.stopPropagation();
    dispatch(addChild({ parentId: node.id }));
    setIsExpanded(true);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm(`Delete "${node.title}" and all its children?`)) {
      dispatch(deleteNode(node.id));
    }
  };

  const isLeafChild = (child) => {
    return !child.children || child.children.length === 0;
  };

  return (
    <div className={`child-node level-${level}`}>
      <div
        className="child-node-header"
        onClick={handleToggle}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {hasChildren && (
          <span className={`expand-arrow ${isExpanded ? 'expanded' : ''}`}>
            ▶
          </span>
        )}

        <span className="child-icon">📁</span>

        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            autoFocus
            className="child-title-input"
          />
        ) : (
          <span className="child-title">{node.title}</span>
        )}

        {hasChildren && (
          <span className="children-count">{node.children.length}</span>
        )}

        {showActions && (
          <div className="child-actions">
            <button
              className="action-btn add-btn"
              onClick={handleAddChild}
              title="Add child"
            >
              +
            </button>
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

      {hasChildren && isExpanded && (
        <div className="child-children">
          <div className="vertical-connector"></div>
          {node.children.map((child) => (
            <div key={child.id} className="child-item">
              <div className="horizontal-connector"></div>
              {isLeafChild(child) ? (
                <LeafNode node={child} />
              ) : (
                <ChildNode node={child} level={level + 1} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
