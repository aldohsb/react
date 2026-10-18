/**
 * LoadingSpinner.jsx
 * 
 * Reusable loading spinner component
 * Ditampilkan saat fetching data dari API
 * Menggunakan CSS animation untuk spinning effect
 */

import React from 'react';

/**
 * LoadingSpinner Component
 * Functional component tanpa state (presentational component)
 */
const LoadingSpinner = () => {
  return (
    // Container untuk center spinner
    <div style={styles.container}>
      {/* Spinner element dengan CSS animation */}
      <div style={styles.spinner}></div>
      
      {/* Loading text untuk accessibility */}
      <p style={styles.text}>Loading inspiration...</p>
    </div>
  );
};

/**
 * Inline styles object
 * Menggunakan inline styles untuk component isolation
 * Semua styles encapsulated dalam component ini
 */
const styles = {
  // Container: center content dengan flexbox
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    padding: '40px'
  },
  
  // Spinner: rotating circle
  spinner: {
    // Ukuran spinner
    width: '50px',
    height: '50px',
    
    // Border untuk membuat circle
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderTop: '4px solid white',
    borderRadius: '50%',
    
    /**
     * CSS Animation
     * animation: name duration timing-function iteration-count
     * 
     * - spin: nama animation (defined di @keyframes)
     * - 1s: durasi satu putaran
     * - linear: timing function (constant speed)
     * - infinite: loop forever
     */
    animation: 'spin 1s linear infinite'
  },
  
  // Loading text styling
  text: {
    color: 'white',
    fontSize: '16px',
    fontWeight: '300',
    letterSpacing: '1px',
    opacity: 0.9
  }
};

/**
 * Inject CSS keyframes animation ke document
 * Dijalankan saat module di-import
 * 
 * Alternative: bisa juga pakai styled-components atau CSS modules
 * Tapi untuk simplicity, kita inject langsung
 */
if (typeof document !== 'undefined') {
  // Check apakah style sudah di-inject (avoid duplicates)
  if (!document.getElementById('spinner-animation')) {
    // Create style element
    const style = document.createElement('style');
    style.id = 'spinner-animation';
    
    // Define keyframes animation
    style.textContent = `
      @keyframes spin {
        /* 0% = start position */
        0% { 
          transform: rotate(0deg); 
        }
        /* 100% = end position (full rotation) */
        100% { 
          transform: rotate(360deg); 
        }
      }
    `;
    
    // Append ke document head
    document.head.appendChild(style);
  }
}

// Export component untuk digunakan di file lain
export default LoadingSpinner;