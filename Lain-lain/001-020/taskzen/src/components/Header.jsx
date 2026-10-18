// ==============================================
// HEADER COMPONENT - App Title & Stats
// ==============================================

import React from 'react';
import { useTaskStore } from '../store/useTaskStore';

/**
 * Header Component
 * Menampilkan judul aplikasi dan statistik task
 * 
 * PELAJARAN REACT HOOKS:
 * - Menggunakan Zustand selector untuk ambil data dari store
 * - Computed values untuk menghitung statistik
 */
const Header = () => {
  // Ambil tasks dari store menggunakan Zustand selector
  // Selector pattern: hanya subscribe ke data yang dibutuhkan
  // PENTING: Component akan re-render setiap kali tasks berubah
  const tasks = useTaskStore((state) => state.tasks);

  // Computed values - menghitung statistik dari tasks
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  return (
    <header style={styles.header}>
      {/* Logo & Title */}
      <div style={styles.titleSection}>
        <div style={styles.logoContainer}>
          <span style={styles.logo}>✓</span>
        </div>
        <div>
          <h1 style={styles.title}>TaskZen</h1>
          <p style={styles.subtitle}>Find your productivity zen</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div style={styles.statsContainer}>
        {/* Total Tasks */}
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{totalTasks}</div>
          <div style={styles.statLabel}>Total</div>
        </div>

        {/* Active Tasks */}
        <div style={{ ...styles.statCard, ...styles.statCardActive }}>
          <div style={styles.statNumber}>{activeTasks}</div>
          <div style={styles.statLabel}>Active</div>
        </div>

        {/* Completed Tasks */}
        <div style={{ ...styles.statCard, ...styles.statCardCompleted }}>
          <div style={styles.statNumber}>{completedTasks}</div>
          <div style={styles.statLabel}>Done</div>
        </div>
      </div>
    </header>
  );
};

// Inline Styles - Flat Design dengan Mint Theme
const styles = {
  header: {
    marginBottom: 'var(--spacing-xl)',
    animation: 'fadeIn 0.5s ease',
  },

  titleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
    marginBottom: 'var(--spacing-lg)',
  },

  logoContainer: {
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, var(--mint-400), var(--mint-600))',
    borderRadius: 'var(--radius-xl)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-lg)',
  },

  logo: {
    fontSize: '2rem',
    color: 'white',
    fontWeight: 'bold',
  },

  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--gray-900)',
    marginBottom: 'var(--spacing-xs)',
  },

  subtitle: {
    fontSize: '0.875rem',
    color: 'var(--gray-500)',
    fontWeight: '500',
  },

  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--spacing-md)',
  },

  statCard: {
    background: 'white',
    padding: 'var(--spacing-lg)',
    borderRadius: 'var(--radius-lg)',
    textAlign: 'center',
    boxShadow: 'var(--shadow-sm)',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'var(--gray-100)',
    transition: 'all var(--transition-base)',
  },

  statCardActive: {
    borderColor: 'var(--mint-200)',
    background: 'var(--mint-50)',
  },

  statCardCompleted: {
    borderColor: 'var(--mint-300)',
    background: 'linear-gradient(135deg, var(--mint-50), white)',
  },

  statNumber: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: 'var(--mint-600)',
    marginBottom: 'var(--spacing-xs)',
  },

  statLabel: {
    fontSize: '0.75rem',
    color: 'var(--gray-600)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
};

export default Header;