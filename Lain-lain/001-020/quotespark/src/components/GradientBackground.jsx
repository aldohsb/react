/**
 * GradientBackground.jsx
 * 
 * Component wrapper yang menyediakan animated gradient background
 * Background berubah setiap kali quote baru dimuat
 * Menggunakan CSS transitions untuk smooth color changes
 */

import React from 'react';

/**
 * GradientBackground Component
 * 
 * Props:
 * @param {string} gradient - CSS gradient string (dari utils/gradients.js)
 * @param {ReactNode} children - Child components yang akan di-render di dalamnya
 */
const GradientBackground = ({ gradient, children }) => {
  return (
    <div 
      style={{
        // Spread existing styles
        ...styles.container,
        // Override background dengan gradient prop
        // Ini memungkinkan dynamic gradient changes
        background: gradient
      }}
    >
      {/* Render children components */}
      {children}
    </div>
  );
};

/**
 * Styles object untuk background container
 */
const styles = {
  container: {
    /**
     * LAYOUT
     * min-height: 100vh ensures background covers full viewport
     * vh = viewport height (100vh = 100% of browser height)
     */
    minHeight: '100vh',
    width: '100%',
    
    /**
     * FLEXBOX CENTERING
     * Classic technique untuk center content both horizontally & vertically
     */
    display: 'flex',
    alignItems: 'center',      // Vertical centering
    justifyContent: 'center',  // Horizontal centering
    
    /**
     * SMOOTH TRANSITIONS
     * Ketika background prop berubah, transisi secara smooth
     * background: property yang di-animate
     * 0.8s: durasi animasi
     * ease-in-out: timing function (slow start, slow end)
     */
    transition: 'background 0.8s ease-in-out',
    
    /**
     * OVERFLOW & POSITIONING
     * Memastikan tidak ada scrollbar dan background fixed
     */
    overflow: 'hidden',
    position: 'relative',
    
    /**
     * PADDING
     * Memberikan space di sekitar content
     * Responsive: lebih besar di mobile untuk touch targets
     */
    padding: '20px'
  }
};

/**
 * COMPONENT COMPOSITION PATTERN
 * 
 * GradientBackground adalah container component yang:
 * 1. Tidak peduli apa children-nya
 * 2. Hanya fokus pada providing background layer
 * 3. Reusable untuk any content
 * 
 * Usage example:
 * <GradientBackground gradient="linear-gradient(...)">
 *   <YourContent />
 * </GradientBackground>
 */

// Export component
export default GradientBackground;