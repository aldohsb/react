// ==============================================
// TASK INPUT COMPONENT - Add New Task Form
// ==============================================

import React, { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';

/**
 * TaskInput Component
 * Form input untuk menambahkan task baru
 * 
 * PELAJARAN REACT HOOKS:
 * - useState untuk local state management (input value)
 * - Event handling (onChange, onSubmit, onKeyPress)
 * - Controlled component pattern
 */
const TaskInput = () => {
  // Local state untuk nilai input
  // useState hook mengembalikan [value, setValue]
  const [inputValue, setInputValue] = useState('');

  // Ambil action addTask dari Zustand store
  const addTask = useTaskStore((state) => state.addTask);

  /**
   * handleSubmit
   * Handler untuk form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    // Prevent default form behavior (page reload)
    e.preventDefault();

    // Validasi: pastikan input tidak kosong setelah trim
    if (inputValue.trim()) {
      // Panggil action addTask dari store
      addTask(inputValue);
      // Reset input field setelah submit
      setInputValue('');
    }
  };

  /**
   * handleChange
   * Handler untuk input change event
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    // Update state dengan nilai input saat ini
    setInputValue(e.target.value);
  };

  /**
   * handleKeyPress
   * Handler untuk keyboard events
   * Menambahkan task saat Enter ditekan
   * @param {Event} e - Keyboard event
   */
  const handleKeyPress = (e) => {
    // Check jika tombol yang ditekan adalah Enter
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputContainer}>
        {/* Input field dengan controlled component pattern */}
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done?"
          style={styles.input}
          aria-label="New task input"
        />
        
        {/* Submit button */}
        <button
          type="submit"
          style={styles.button}
          disabled={!inputValue.trim()} // Disable jika input kosong
          aria-label="Add task"
        >
          <span style={styles.buttonIcon}>+</span>
          <span style={styles.buttonText}>Add Task</span>
        </button>
      </div>
    </form>
  );
};

// Inline Styles
const styles = {
  form: {
    marginBottom: 'var(--spacing-xl)',
    animation: 'fadeIn 0.5s ease 0.1s both',
  },

  inputContainer: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    background: 'white',
    padding: 'var(--spacing-sm)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'var(--gray-100)',
    transition: 'all var(--transition-base)',
  },

  input: {
    flex: 1,
    padding: 'var(--spacing-md)',
    border: 'none',
    background: 'transparent',
    fontSize: '1rem',
    color: 'var(--gray-800)',
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, var(--mint-500), var(--mint-600))',
    color: 'white',
    borderRadius: 'var(--radius-lg)',
    fontWeight: '600',
    boxShadow: 'var(--shadow-md)',
    transition: 'all var(--transition-base)',
  },

  buttonIcon: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },

  buttonText: {
    fontSize: '0.875rem',
  },
};

export default TaskInput;