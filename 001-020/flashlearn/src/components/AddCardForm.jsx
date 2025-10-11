/**
 * ADD CARD FORM COMPONENT
 * 
 * Form untuk menambahkan flashcard baru
 * 
 * KONSEP YANG DIPELAJARI:
 * 1. Controlled Components (input controlled by React state)
 * 2. Form handling di React
 * 3. Event handling (onChange, onSubmit)
 * 4. Form validation
 * 5. Lifting state up (pass data to parent via callback)
 */

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * PROPS:
 * - onAddCard: callback function dari parent untuk add new card
 */
function AddCardForm({ onAddCard }) {
  /**
   * MULTIPLE STATE MANAGEMENT
   * 
   * Bisa gunakan:
   * 1. Multiple useState (seperti di bawah) - simple, explicit
   * 2. Single useState dengan object - compact, tapi perlu spread operator
   * 3. useReducer - untuk complex state logic
   * 
   * Untuk form simple, multiple useState sudah cukup
   */
  
  // State untuk input front (pertanyaan)
  const [front, setFront] = useState('');
  
  // State untuk input back (jawaban)
  const [back, setBack] = useState('');
  
  // State untuk toggle form visibility
  const [isOpen, setIsOpen] = useState(false);

  /**
   * FORM SUBMIT HANDLER
   * 
   * Dipanggil saat form di-submit
   * 
   * @param {Event} e - Event object dari form submission
   */
  const handleSubmit = (e) => {
    /**
     * PREVENT DEFAULT BEHAVIOR
     * 
     * e.preventDefault() mencegah page reload
     * Default behavior form adalah reload page saat submit
     */
    e.preventDefault();
    
    /**
     * FORM VALIDATION
     * 
     * Check apakah input tidak kosong
     * trim() menghapus whitespace di awal dan akhir
     */
    if (!front.trim() || !back.trim()) {
      // Bisa tambahkan error message atau validation UI
      alert('Mohon isi pertanyaan dan jawaban');
      return;
    }
    
    /**
     * CALL PARENT CALLBACK
     * 
     * Lift state up: pass data to parent component
     * Parent akan handle logic untuk add card ke array
     */
    onAddCard(front.trim(), back.trim());
    
    /**
     * RESET FORM
     * 
     * Clear input fields setelah submit
     * Good UX practice
     */
    setFront('');
    setBack('');
    
    /**
     * CLOSE FORM
     * 
     * Optional: auto-close form setelah submit
     */
    setIsOpen(false);
  };

  /**
   * TOGGLE FORM HANDLER
   */
  const toggleForm = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div style={styles.container}>
      {/**
       * TOGGLE BUTTON
       * 
       * Button untuk show/hide form
       * Menggunakan Framer Motion untuk smooth animation
       */}
      <motion.button
        onClick={toggleForm}
        style={styles.toggleButton}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Conditional rendering untuk icon */}
        <span style={styles.buttonIcon}>
          {isOpen ? '✕' : '+'}
        </span>
        {/* Conditional text */}
        {isOpen ? 'Tutup Form' : 'Tambah Kartu Baru'}
      </motion.button>

      {/**
       * CONDITIONAL RENDERING dengan &&
       * 
       * isOpen && <Component />
       * Hanya render component jika isOpen = true
       * 
       * Alternative syntax:
       * - Ternary: isOpen ? <Component /> : null
       * - If statement (perlu extract ke variable)
       */}
      {isOpen && (
        <motion.div
          /**
           * FRAMER MOTION VARIANTS
           * 
           * initial: state saat component pertama mount
           * animate: target state
           * exit: state saat component unmount (perlu AnimatePresence)
           */
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          style={styles.formWrapper}
        >
          {/**
           * FORM ELEMENT
           * 
           * onSubmit handler di form level
           * Akan triggered saat:
           * - User click submit button
           * - User press Enter di input field
           */}
          <form onSubmit={handleSubmit} style={styles.form}>
            {/**
             * INPUT GROUP 1: Pertanyaan
             */}
            <div style={styles.inputGroup}>
              <label htmlFor="front" style={styles.label}>
                Pertanyaan / Kata
              </label>
              
              {/**
               * CONTROLLED INPUT
               * 
               * Value controlled by React state
               * onChange update state saat user type
               * 
               * KENAPA CONTROLLED?
               * - Single source of truth (state)
               * - Easy validation
               * - Easy to manipulate value
               * - Predictable behavior
               */}
              <input
                id="front"
                type="text"
                value={front}
                onChange={(e) => setFront(e.target.value)}
                placeholder="Contoh: React"
                style={styles.input}
                /**
                 * AUTO-FOCUS saat form dibuka
                 * Good UX: user bisa langsung type
                 */
                autoFocus
              />
            </div>

            {/**
             * INPUT GROUP 2: Jawaban
             */}
            <div style={styles.inputGroup}>
              <label htmlFor="back" style={styles.label}>
                Jawaban / Definisi
              </label>
              
              {/**
               * TEXTAREA untuk multi-line input
               * 
               * rows={4}: default 4 baris
               * Bisa auto-resize tapi perlu additional logic
               */}
              <textarea
                id="back"
                value={back}
                onChange={(e) => setBack(e.target.value)}
                placeholder="Contoh: Library JavaScript untuk membangun UI..."
                style={styles.textarea}
                rows={4}
              />
            </div>

            {/**
             * BUTTON GROUP
             * 
             * Submit dan Cancel buttons
             */}
            <div style={styles.buttonGroup}>
              {/**
               * SUBMIT BUTTON
               * 
               * type="submit" trigger form onSubmit
               */}
              <motion.button
                type="submit"
                style={styles.submitButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ➕ Tambah Kartu
              </motion.button>

              {/**
               * CANCEL BUTTON
               * 
               * type="button" prevent form submission
               * Just close form
               */}
              <motion.button
                type="button"
                onClick={toggleForm}
                style={styles.cancelButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Batal
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
}

/**
 * STYLES
 */
const styles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto 2rem auto',
  },
  
  toggleButton: {
    width: '100%',
    padding: '1rem 1.5rem',
    backgroundColor: '#9333ea',
    color: 'white',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    
    // Flexbox untuk center content
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    
    // Shadow
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    
    // Transition
    transition: 'all 0.2s ease',
  },
  
  buttonIcon: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  
  formWrapper: {
    marginTop: '1rem',
    overflow: 'hidden', // Untuk smooth height animation
  },
  
  form: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    border: '1px solid #e9d5ff',
  },
  
  inputGroup: {
    marginBottom: '1.5rem',
  },
  
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#27272a',
    marginBottom: '0.5rem',
  },
  
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    border: '2px solid #e4e4e7',
    borderRadius: '0.5rem',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
  },
  
  textarea: {
    width: '100%',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    border: '2px solid #e4e4e7',
    borderRadius: '0.5rem',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    resize: 'vertical', // Allow vertical resize only
  },
  
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  
  submitButton: {
    flex: 1,
    padding: '0.75rem 1.5rem',
    backgroundColor: '#9333ea',
    color: 'white',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
  },
  
  cancelButton: {
    flex: 1,
    padding: '0.75rem 1.5rem',
    backgroundColor: '#f4f4f5',
    color: '#52525b',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  }
};

export default AddCardForm;