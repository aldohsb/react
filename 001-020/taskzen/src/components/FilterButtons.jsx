// ==============================================
// FILTER BUTTONS COMPONENT - Task Filtering
// ==============================================

import React from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { FILTER_OPTIONS } from '../utils/constants';

/**
 * FilterButtons Component
 * Tombol-tombol untuk filter tasks (All, Active, Completed)
 * 
 * PELAJARAN REACT:
 * - Conditional styling berdasarkan state
 * - Event handling untuk filter
 * - Zustand selector untuk active filter
 */
const FilterButtons = () => {
  // Ambil current filter dan setFilter action dari store
  const filter = useTaskStore((state) => state.filter);
  const setFilter = useTaskStore((state) => state.setFilter);
  const clearCompleted = useTaskStore((state) => state.clearCompleted);
  const tasks = useTaskStore((state) => state.tasks);

  // Hitung jumlah completed tasks untuk clear button
  const completedCount = tasks.filter((task) => task.completed).length;

  /**
   * handleFilterClick
   * Handler untuk click filter button
   * @param {string} filterType - Tipe filter yang dipilih
   */
  const handleFilterClick = (filterType) => {
    setFilter(filterType);
  };

  /**
   * Filter button configuration
   * Array of objects untuk render filter buttons
   */
  const filterButtons = [
    { id: FILTER_OPTIONS.ALL, label: 'All Tasks', icon: '📋' },
    { id: FILTER_OPTIONS.ACTIVE, label: 'Active', icon: '⏳' },
    { id: FILTER_OPTIONS.COMPLETED, label: 'Completed', icon: '✓' }
  ];

  return (
    <div style={styles.container}>
      {/* Filter Buttons */}
      <div style={styles.filterGroup}>
        {filterButtons.map((btn) => {
          // Check apakah button ini sedang active
          const isActive = filter === btn.id;
          
          return (
            <button
              key={btn.id}
              onClick={() => handleFilterClick(btn.id)}
              style={{
                ...styles.filterButton,
                // Conditional styling untuk active button
                ...(isActive ? styles.filterButtonActive : {}),
              }}
              aria-label={btn.label}
              aria-pressed={isActive}
            >
              <span style={styles.filterIcon}>{btn.icon}</span>
              <span style={styles.filterLabel}>{btn.label}</span>
            </button>
          );
        })}
      </div>

      {/* Clear Completed Button */}
      {completedCount > 0 && (
        <button
          onClick={clearCompleted}
          style={styles.clearButton}
          aria-label={`Clear ${completedCount} completed tasks`}
        >
          <span style={styles.clearIcon}>🗑️</span>
          <span>Clear Completed ({completedCount})</span>
        </button>
      )}
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    marginBottom: 'var(--spacing-xl)',
    animation: 'fadeIn 0.5s ease 0.2s both',
  },

  filterGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--spacing-md)',
    marginBottom: 'var(--spacing-md)',
  },

  filterButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    padding: 'var(--spacing-lg)',
    background: 'white',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'var(--gray-200)',
    borderRadius: 'var(--radius-lg)',
    color: 'var(--gray-600)',
    fontWeight: '600',
    transition: 'all var(--transition-base)',
    boxShadow: 'var(--shadow-sm)',
  },

  filterButtonActive: {
    background: 'linear-gradient(135deg, var(--mint-500), var(--mint-600))',
    borderColor: 'var(--mint-600)',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: 'var(--shadow-lg)',
  },

  filterIcon: {
    fontSize: '1.5rem',
  },

  filterLabel: {
    fontSize: '0.875rem',
  },

  clearButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-sm)',
    width: '100%',
    padding: 'var(--spacing-md)',
    background: 'white',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'var(--gray-200)',
    borderRadius: 'var(--radius-lg)',
    color: 'var(--danger)',
    fontWeight: '600',
    fontSize: '0.875rem',
    transition: 'all var(--transition-base)',
    boxShadow: 'var(--shadow-sm)',
  },

  clearIcon: {
    fontSize: '1rem',
  },
};

export default FilterButtons;