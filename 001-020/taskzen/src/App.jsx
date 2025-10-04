// ==============================================
// APP COMPONENT - Main Application Component
// ==============================================

import React from 'react';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import FilterButtons from './components/FilterButtons';
import TaskList from './components/TaskList';
import './styles/index.css';

/**
 * App Component
 * Root component yang mengkomposisi semua child components
 * 
 * PELAJARAN REACT:
 * - Component composition (menyusun components menjadi aplikasi)
 * - Container/Wrapper pattern
 * - Import CSS untuk global styles
 * - Declarative UI structure
 */
const App = () => {
  return (
    <div style={styles.app}>
      {/* Main Container */}
      <main style={styles.container}>
        {/* Header Section - Logo, Title, Stats */}
        <Header />

        {/* Input Section - Add New Task */}
        <TaskInput />

        {/* Filter Section - Filter Controls */}
        <FilterButtons />

        {/* List Section - Display Tasks */}
        <TaskList />

        {/* Footer */}
        <footer style={styles.footer}>
          <p style={styles.footerText}>
            Made with ❤️ using React & Zustand
          </p>
        </footer>
      </main>
    </div>
  );
};

// Inline Styles
const styles = {
  app: {
    width: '100%',
    maxWidth: '600px',
  },

  container: {
    width: '100%',
  },

  footer: {
    marginTop: 'var(--spacing-xl)',
    textAlign: 'center',
    padding: 'var(--spacing-lg)',
    animation: 'fadeIn 0.5s ease 0.4s both',
  },

  footerText: {
    fontSize: '0.875rem',
    color: 'var(--gray-500)',
    fontWeight: '500',
  },
};

export default App;