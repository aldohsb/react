// ==============================================
// TASK ITEM COMPONENT - Individual Task Display
// ==============================================

import React, { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';

/**
 * TaskItem Component
 * Menampilkan single task dengan fitur edit, toggle, dan delete
 * 
 * PELAJARAN REACT HOOKS:
 * - useState untuk local state (editing mode)
 * - Conditional rendering
 * - Event handling (onClick, onChange, onBlur)
 * - Props destructuring
 */
const TaskItem = ({ task }) => {
  // Local state untuk editing mode
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.text);

  // Ambil actions dari Zustand store
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const editTask = useTaskStore((state) => state.editTask);

  /**
   * handleToggle
   * Toggle completed status task
   */
  const handleToggle = () => {
    toggleTask(task.id);
  };

  /**
   * handleDelete
   * Hapus task dari list
   */
  const handleDelete = () => {
    deleteTask(task.id);
  };

  /**
   * handleEdit
   * Masuk ke editing mode
   */
  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(task.text);
  };

  /**
   * handleSave
   * Simpan edited task
   */
  const handleSave = () => {
    if (editValue.trim()) {
      editTask(task.id, editValue);
      setIsEditing(false);
    } else {
      // Jika kosong, cancel edit
      setEditValue(task.text);
      setIsEditing(false);
    }
  };

  /**
   * handleCancel
   * Cancel editing mode
   */
  const handleCancel = () => {
    setEditValue(task.text);
    setIsEditing(false);
  };

  /**
   * handleKeyPress
   * Handle keyboard events saat editing
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div
      className="task-item"
      style={{
        ...styles.taskItem,
        // Conditional styling untuk completed task
        ...(task.completed ? styles.taskItemCompleted : {}),
      }}
    >
      {/* Checkbox untuk toggle completed */}
      <button
        onClick={handleToggle}
        style={{
          ...styles.checkbox,
          ...(task.completed ? styles.checkboxChecked : {}),
        }}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed && <span style={styles.checkIcon}>✓</span>}
      </button>

      {/* Task Content - Conditional Rendering */}
      <div style={styles.content}>
        {isEditing ? (
          // Edit Mode
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyPress}
            style={styles.editInput}
            autoFocus
            aria-label="Edit task"
          />
        ) : (
          // View Mode
          <span
            style={{
              ...styles.taskText,
              ...(task.completed ? styles.taskTextCompleted : {}),
            }}
          >
            {task.text}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div style={styles.actions}>
        {!isEditing ? (
          <>
            {/* Edit Button */}
            <button
              onClick={handleEdit}
              style={styles.actionButton}
              aria-label="Edit task"
              title="Edit"
            >
              <span style={styles.actionIcon}>✏️</span>
            </button>

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              style={{ ...styles.actionButton, ...styles.deleteButton }}
              aria-label="Delete task"
              title="Delete"
            >
              <span style={styles.actionIcon}>🗑️</span>
            </button>
          </>
        ) : (
          <>
            {/* Save Button */}
            <button
              onClick={handleSave}
              style={{ ...styles.actionButton, ...styles.saveButton }}
              aria-label="Save changes"
              title="Save"
            >
              <span style={styles.actionIcon}>💾</span>
            </button>

            {/* Cancel Button */}
            <button
              onClick={handleCancel}
              style={{ ...styles.actionButton, ...styles.cancelButton }}
              aria-label="Cancel editing"
              title="Cancel"
            >
              <span style={styles.actionIcon}>✖️</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
    padding: 'var(--spacing-lg)',
    background: 'white',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-sm)',
    border: '2px solid var(--gray-100)',
    transition: 'all var(--transition-base)',
    animation: 'slideIn 0.3s ease',
  },

  taskItemCompleted: {
    background: 'var(--mint-50)',
    borderColor: 'var(--mint-200)',
  },

  checkbox: {
    width: '24px',
    height: '24px',
    minWidth: '24px',
    borderRadius: 'var(--radius-sm)',
    border: '2px solid var(--gray-300)',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all var(--transition-base)',
  },

  checkboxChecked: {
    background: 'var(--mint-500)',
    borderColor: 'var(--mint-500)',
  },

  checkIcon: {
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: 'bold',
  },

  content: {
    flex: 1,
    minWidth: 0, // Untuk text truncation
  },

  taskText: {
    fontSize: '1rem',
    color: 'var(--gray-800)',
    wordBreak: 'break-word',
    transition: 'all var(--transition-base)',
  },

  taskTextCompleted: {
    textDecoration: 'line-through',
    color: 'var(--gray-500)',
  },

  editInput: {
    width: '100%',
    padding: 'var(--spacing-sm)',
    border: '2px solid var(--mint-300)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '1rem',
    background: 'white',
  },

  actions: {
    display: 'flex',
    gap: 'var(--spacing-xs)',
  },

  actionButton: {
    width: '36px',
    height: '36px',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    background: 'var(--gray-100)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all var(--transition-base)',
  },

  actionIcon: {
    fontSize: '1rem',
  },

  deleteButton: {
    background: 'var(--gray-100)',
  },

  saveButton: {
    background: 'var(--mint-100)',
  },

  cancelButton: {
    background: 'var(--gray-100)',
  },
};

export default TaskItem;