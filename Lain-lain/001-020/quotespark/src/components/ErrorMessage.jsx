/**
 * ErrorMessage.jsx
 * 
 * Reusable error message component
 * Ditampilkan ketika terjadi error saat fetching data
 * Includes retry button untuk user action
 */

import React from 'react';

/**
 * ErrorMessage Component
 * 
 * Props:
 * @param {string} message - Error message yang akan ditampilkan
 * @param {function} onRetry - Callback function untuk retry action
 */
const ErrorMessage = ({ message, onRetry }) => {
  return (
    // Container untuk error UI
    <div style={styles.container}>
      {/* Error icon menggunakan emoji */}
      <div style={styles.icon}>⚠️</div>
      
      {/* Error message text */}
      <p style={styles.message}>
        {/* Tampilkan custom message atau default message */}
        {message || 'Oops! Something went wrong.'}
      </p>
      
      {/* Retry button - conditional rendering */}
      {/* Hanya tampil jika onRetry function disediakan */}
      {onRetry && (
        <button 
          onClick={onRetry}  // Event handler untuk click
          style={styles.button}
          // Hover effect menggunakan onMouseEnter/Leave
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

/**
 * Inline styles object
 * Menggunakan object notation untuk CSS properties
 */
const styles = {
  // Container: center content dengan flexbox
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    padding: '40px',
    textAlign: 'center'
  },
  
  // Error icon styling
  icon: {
    fontSize: '48px',
    // Animation untuk attention-grabbing
    animation: 'pulse 2s infinite'
  },
  
  // Error message text styling
  message: {
    color: 'white',
    fontSize: '18px',
    fontWeight: '400',
    maxWidth: '400px',
    lineHeight: '1.6',
    opacity: 0.95
  },
  
  // Retry button styling
  button: {
    // Reset default button styles
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    
    // Button appearance
    backgroundColor: 'white',
    color: '#333',
    padding: '12px 32px',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: '600',
    
    // Smooth transitions untuk hover effects
    transition: 'all 0.3s ease',
    
    // Shadow untuk depth
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    
    // Font dari parent
    fontFamily: 'inherit'
  }
};

/**
 * Inject pulse animation untuk error icon
 * Memberikan visual feedback bahwa ada error
 */
if (typeof document !== 'undefined') {
  // Check apakah animation sudah di-inject
  if (!document.getElementById('pulse-animation')) {
    const style = document.createElement('style');
    style.id = 'pulse-animation';
    
    // Pulse animation: scale up and down
    style.textContent = `
      @keyframes pulse {
        0%, 100% { 
          transform: scale(1);
          opacity: 1;
        }
        50% { 
          transform: scale(1.1);
          opacity: 0.8;
        }
      }
    `;
    
    document.head.appendChild(style);
  }
}

/**
 * PropTypes validation (optional, tapi good practice)
 * Untuk development, membantu catch bugs early
 */
ErrorMessage.defaultProps = {
  message: 'Oops! Something went wrong.',
  onRetry: null
};

// Export component
export default ErrorMessage;