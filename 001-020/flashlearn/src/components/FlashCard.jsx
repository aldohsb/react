/**
 * FLASHCARD COMPONENT
 * 
 * Component utama yang menampilkan single flashcard dengan flip animation
 * 
 * KONSEP PENTING:
 * 1. useState untuk manage local state (isFlipped)
 * 2. Framer Motion untuk smooth flip animation
 * 3. Event handling (onClick)
 * 4. Conditional rendering (show front or back)
 */

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * PROPS DESTRUCTURING
 * Props yang diterima:
 * - front: text untuk bagian depan card
 * - back: text untuk bagian belakang card
 * - onDelete: function callback untuk delete card (dari parent)
 */
function FlashCard({ front, back, onDelete }) {
  /**
   * useState HOOK
   * 
   * const [state, setState] = useState(initialValue)
   * 
   * - isFlipped: boolean state untuk track apakah card di-flip atau tidak
   * - setIsFlipped: function untuk update state
   * - false: initial value (card belum di-flip)
   * 
   * State ini LOCAL ke component ini saja
   * Setiap FlashCard instance punya state sendiri
   */
  const [isFlipped, setIsFlipped] = useState(false);

  /**
   * EVENT HANDLER FUNCTION
   * 
   * Arrow function yang toggle state isFlipped
   * Dipanggil saat user click card
   * 
   * prev => !prev adalah FUNCTIONAL UPDATE
   * Lebih safe karena React batch updates
   */
  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  /**
   * EVENT HANDLER untuk Delete
   * 
   * stopPropagation() mencegah event bubbling ke parent
   * Jadi saat click delete, card tidak flip
   */
  const handleDelete = (e) => {
    e.stopPropagation(); // Stop event bubbling
    onDelete(); // Call parent's delete function
  };

  return (
    /**
     * FRAMER MOTION <motion.div>
     * 
     * motion.div adalah animated version dari <div>
     * Bisa terima animation props seperti:
     * - animate: target animation state
     * - transition: animation configuration
     * - whileHover: animation saat hover
     * - etc.
     */
    <motion.div
      style={styles.cardContainer}
      onClick={handleFlip}
      
      /**
       * WHILEHOVER ANIMATION
       * Saat mouse hover, card akan scale up sedikit
       * Memberikan feedback ke user bahwa card interactive
       */
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.15)'
      }}
      
      /**
       * WHILETAP ANIMATION
       * Saat card di-click, scale down sedikit
       * Memberikan tactile feedback
       */
      whileTap={{ scale: 0.98 }}
      
      /**
       * TRANSITION CONFIG
       * - type: "spring" untuk natural motion
       * - stiffness: seberapa "kaku" spring
       * - damping: seberapa cepat spring settle
       */
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      {/* Delete Button - positioned absolute */}
      <button
        onClick={handleDelete}
        style={styles.deleteButton}
        aria-label="Delete card"
      >
        ✕
      </button>

      {/**
       * ANIMATED CARD CONTENT
       * 
       * motion.div dengan animate prop untuk flip animation
       * 
       * FLIP ANIMATION LOGIC:
       * - rotateY: rotate card around Y-axis
       * - isFlipped ? 180 : 0 = conditional rotation
       * - 180deg = card terbalik (back side visible)
       * - 0deg = card normal (front side visible)
       */}
      <motion.div
        style={styles.cardContent}
        animate={{ 
          rotateY: isFlipped ? 180 : 0 
        }}
        transition={{ 
          duration: 0.6,
          ease: "easeInOut"
        }}
      >
        {/**
         * FRONT SIDE of Card
         * 
         * Conditional styling untuk hide front saat flipped
         * backfaceVisibility: 'hidden' = hide when rotated
         */}
        <div style={{
          ...styles.cardFace,
          ...styles.cardFront,
          // Hide front side ketika card flipped
          opacity: isFlipped ? 0 : 1,
          pointerEvents: isFlipped ? 'none' : 'auto'
        }}>
          <div style={styles.label}>Pertanyaan</div>
          <p style={styles.text}>{front}</p>
          <div style={styles.hint}>👆 Klik untuk lihat jawaban</div>
        </div>

        {/**
         * BACK SIDE of Card
         * 
         * rotateY: 180deg = pre-rotated untuk saat card flip
         * Saat card rotateY: 180, back side akan menjadi normal
         */}
        <div style={{
          ...styles.cardFace,
          ...styles.cardBack,
          // Show back side ketika card flipped
          opacity: isFlipped ? 1 : 0,
          pointerEvents: isFlipped ? 'auto' : 'none'
        }}>
          <div style={styles.label}>Jawaban</div>
          <p style={styles.text}>{back}</p>
          <div style={styles.hint}>👆 Klik untuk kembali</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * STYLES OBJECT
 * 
 * CSS-in-JS approach
 * Object spread operator (...) untuk compose styles
 */
const styles = {
  cardContainer: {
    // Relative positioning untuk absolute children
    position: 'relative',
    
    // Perspective untuk 3D effect
    perspective: '1000px',
    
    // Card dimensions - DIPERBESAR
    width: '100%',
    minWidth: '350px',
    maxWidth: '450px',
    minHeight: '320px',
    height: 'auto',
    
    // Cursor pointer untuk indicate clickable
    cursor: 'pointer',
    
    // User select none untuk prevent text selection saat click
    userSelect: 'none',
  },
  
  deleteButton: {
    // Position absolute untuk top-right corner
    position: 'absolute',
    top: '12px',
    right: '12px',
    
    // Z-index untuk overlay above card
    zIndex: 10,
    
    // Styling
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    
    // Flexbox untuk center content
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    // Shadow untuk depth
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    
    // Transition untuk hover effect
    transition: 'all 0.2s ease',
    
    // Hide by default, show on card hover (via CSS)
    opacity: 0,
  },
  
  cardContent: {
    // Relative positioning
    position: 'relative',
    
    // 100% dimensions untuk fill container
    width: '100%',
    minHeight: '320px',
    height: '100%',
    
    // Transform style untuk enable 3D
    transformStyle: 'preserve-3d',
  },
  
  cardFace: {
    // Absolute positioning untuk overlap front/back
    position: 'absolute',
    width: '100%',
    minHeight: '320px',
    height: 'auto',
    
    // Hide back face when rotated
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    
    // Styling
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '2.5rem',
    
    // Shadow untuk depth
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    
    // Flexbox untuk center content
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
    
    // Transition untuk smooth opacity change
    transition: 'opacity 0.3s ease',
    
    // PENTING: Overflow handling
    overflow: 'auto',
    boxSizing: 'border-box',
  },
  
  cardFront: {
    // Gradient border effect dengan pseudo-element simulation
    background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #e9d5ff, #c084fc) border-box',
    border: '2px solid transparent',
  },
  
  cardBack: {
    // Pre-rotate back side 180deg
    transform: 'rotateY(180deg)',
    
    // Different gradient untuk distinguish
    background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #c084fc, #9333ea) border-box',
    border: '2px solid transparent',
  },
  
  label: {
    // Small label untuk indicate front/back
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#9333ea',
    backgroundColor: '#f3e8ff',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
  },
  
  text: {
    // Main text content
    fontSize: '1rem',
    fontWeight: '500',
    color: '#27272a',
    textAlign: 'center',
    lineHeight: '1.7',
    margin: 0,
    
    // Max width untuk readability
    maxWidth: '95%',
    wordWrap: 'break-word',
  },
  
  hint: {
    // Hint text di bottom
    fontSize: '0.875rem',
    color: '#a1a1aa',
    fontStyle: 'italic',
  }
};

/**
 * CSS HOVER EFFECT untuk Delete Button
 * 
 * Karena inline styles tidak support pseudo-classes,
 * kita butuh workaround dengan JavaScript atau
 * gunakan actual CSS file
 * 
 * Alternative: Tambahkan onMouseEnter/onMouseLeave
 */

// Export component
export default FlashCard;