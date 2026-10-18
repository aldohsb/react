// ==============================================
// TASK LIST COMPONENT - List of Tasks
// ==============================================

import React from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { FILTER_OPTIONS } from '../utils/constants';
import TaskItem from './TaskItem';

/**
 * TaskList Component
 * Menampilkan list of tasks berdasarkan filter aktif
 * 
 * PELAJARAN REACT:
 * - List rendering dengan map()
 * - Key prop untuk list items
 * - Conditional rendering (empty state)
 * - Component composition
 */
const TaskList = () => {
  // Ambil tasks dan filter dari store
  // PENTING: Subscribe ke tasks DAN filter agar re-render saat ada perubahan
  const tasks = useTaskStore((state) => state.tasks);
  const filter = useTaskStore((state) => state.filter);
  
  // Compute filtered tasks di component (bukan dari store)
  // Ini memastikan re-render saat tasks atau filter berubah
  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  /**
   * getEmptyMessage
   * Mengembalikan pesan empty state berdasarkan filter
   * @returns {string} Empty state message
   */
  const getEmptyMessage = () => {
    switch (filter) {
      case 'active':
        return 'No active tasks. Time to add some! 🎯';
      case 'completed':
        return 'No completed tasks yet. Keep going! 💪';
      default:
        return 'No tasks yet. Start by adding one above! ✨';
    }
  };

  /**
   * getEmptyIcon
   * Mengembalikan icon untuk empty state
   * @returns {string} Emoji icon
   */
  const getEmptyIcon = () => {
    switch (filter) {
      case 'active':
        return '📝';
      case 'completed':
        return '✅';
      default:
        return '🌟';
    }
  };

  return (
    <div style={styles.container}>
      {/* Conditional Rendering - Empty State vs Task List */}
      {filteredTasks.length === 0 ? (
        // Empty State
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>{getEmptyIcon()}</div>
          <p style={styles.emptyMessage}>{getEmptyMessage()}</p>
        </div>
      ) : (
        // Task List
        <div style={styles.taskList}>
          {/* 
            List Rendering Pattern:
            - map() untuk iterate array
            - key prop (task.id) untuk React reconciliation
            - Spread props untuk pass data ke child component
          */}
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}

      {/* Task Count Footer */}
      {filteredTasks.length > 0 && (
        <div style={styles.footer}>
          <span style={styles.footerText}>
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} shown
          </span>
        </div>
      )}
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    animation: 'fadeIn 0.5s ease 0.3s both',
  },

  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
    marginBottom: 'var(--spacing-lg)',
  },

  emptyState: {
    textAlign: 'center',
    padding: 'var(--spacing-xl) var(--spacing-lg)',
    background: 'white',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-sm)',
    borderWidth: '2px',
    borderStyle: 'dashed',
    borderColor: 'var(--gray-200)',
  },

  emptyIcon: {
    fontSize: '4rem',
    marginBottom: 'var(--spacing-md)',
    opacity: 0.8,
  },

  emptyMessage: {
    fontSize: '1rem',
    color: 'var(--gray-500)',
    fontWeight: '500',
  },

  footer: {
    textAlign: 'center',
    padding: 'var(--spacing-md)',
    background: 'white',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-sm)',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'var(--gray-100)',
  },

  footerText: {
    fontSize: '0.875rem',
    color: 'var(--gray-600)',
    fontWeight: '600',
  },
};

export default TaskList;