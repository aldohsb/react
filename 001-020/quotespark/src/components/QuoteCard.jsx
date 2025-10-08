/**
 * QuoteCard.jsx
 * 
 * Main quote display component
 * Menampilkan quote text, author, dan button untuk load quote baru
 * Includes entrance animations dan hover effects
 */

import React from 'react';

/**
 * QuoteCard Component
 * 
 * Props:
 * @param {Object} quote - Quote object dengan properties: text, author, id
 * @param {function} onNewQuote - Callback function untuk load quote baru
 * @param {boolean} isLoading - Loading state untuk disable button
 */
const QuoteCard = ({ quote, onNewQuote, isLoading }) => {
  return (
    <div style={styles.card}>
      {/* Quote icon - decorative element */}
      <div style={styles.quoteIcon}>"</div>
      
      {/* Quote text */}
      <blockquote style={styles.quoteText}>
        {quote.text}
      </blockquote>
      
      {/* Author name dengan dash prefix */}
      <p style={styles.author}>— {quote.author}</p>
      
      {/* Button untuk load quote baru */}
      <button
        onClick={onNewQuote}  // Event handler dari parent
        disabled={isLoading}  // Disable saat loading
        style={{
          ...styles.button,
          // Conditional styling: opacity berkurang saat loading
          opacity: isLoading ? 0.6 : 1,
          // Cursor berubah saat disabled
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
        // Hover effects menggunakan inline event handlers
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.1)';
        }}
      >
        {/* Conditional text: tampilkan "Loading..." saat fetch */}
        {isLoading ? 'Loading...' : '✨ New Quote'}
      </button>
    </div>
  );
};

/**
 * Styles object
 * Menggunakan modern CSS techniques untuk professional look
 */
const styles = {
  /**
   * CARD CONTAINER
   * Glassmorphism effect: semi-transparent dengan backdrop blur
   */
  card: {
    // Glassmorphism: background semi-transparent
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    
    // Backdrop blur untuk glassmorphism effect
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)', // Safari support
    
    // Border untuk depth
    border: '1px solid rgba(255, 255, 255, 0.2)',
    
    // Rounded corners untuk modern look
    borderRadius: '24px',
    
    // Padding: space di dalam card
    padding: '60px 50px',
    
    // Max width untuk readability
    maxWidth: '700px',
    width: '90%',
    
    // Shadow untuk elevation
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    
    // Flexbox untuk layout children
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    alignItems: 'center',
    
    // Smooth entrance animation
    animation: 'fadeInUp 0.6s ease-out',
    
    // Responsive: adjust untuk mobile
    '@media (max-width: 768px)': {
      padding: '40px 30px'
    }
  },
  
  /**
   * QUOTE ICON
   * Large decorative quotation mark
   */
  quoteIcon: {
    fontSize: '80px',
    color: 'rgba(255, 255, 255, 0.3)',
    fontFamily: 'Georgia, serif',
    lineHeight: '1',
    marginBottom: '-20px'
  },
  
  /**
   * QUOTE TEXT
   * Main content - quote itself
   */
  quoteText: {
    // Typography
    fontSize: '28px',
    fontWeight: '400',
    lineHeight: '1.6',
    color: 'white',
    
    // Text alignment
    textAlign: 'center',
    
    // Remove default margin
    margin: '0',
    
    // Text shadow untuk readability
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    
    // Responsive font size
    '@media (max-width: 768px)': {
      fontSize: '22px'
    }
  },
  
  /**
   * AUTHOR NAME
   * Attribution text
   */
  author: {
    fontSize: '18px',
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.9)',
    fontStyle: 'italic',
    margin: '0',
    textAlign: 'center',
    letterSpacing: '0.5px'
  },
  
  /**
   * NEW QUOTE BUTTON
   * CTA button untuk generate quote baru
   */
  button: {
    // Remove default button styles
    border: 'none',
    outline: 'none',
    
    // Button appearance
    backgroundColor: 'white',
    color: '#333',
    
    // Size
    padding: '16px 40px',
    
    // Typography
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: 'inherit',
    letterSpacing: '0.5px',
    
    // Shape
    borderRadius: '50px',
    
    // Interaction
    cursor: 'pointer',
    
    // Smooth transitions
    transition: 'all 0.3s ease',
    
    // Shadow untuk elevation
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    
    // Prevent text selection
    userSelect: 'none',
    WebkitUserSelect: 'none',
    
    // Margin top untuk spacing
    marginTop: '10px'
  }
};

/**
 * Inject CSS animations
 * fadeInUp animation untuk entrance effect
 */
if (typeof document !== 'undefined') {
  if (!document.getElementById('card-animations')) {
    const style = document.createElement('style');
    style.id = 'card-animations';
    
    /**
     * KEYFRAMES ANIMATION
     * fadeInUp: element muncul dari bawah dengan fade effect
     */
    style.textContent = `
      @keyframes fadeInUp {
        /* Start state: invisible dan posisi lebih bawah */
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        /* End state: fully visible dan posisi normal */
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      /* Responsive styles untuk mobile */
      @media (max-width: 768px) {
        /* Adjust font sizes untuk readability di mobile */
      }
    `;
    
    document.head.appendChild(style);
  }
}

// Export component
export default QuoteCard;