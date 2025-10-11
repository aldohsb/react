/**
 * FLASHCARD LIST COMPONENT
 * 
 * Component untuk render list of flashcards
 * 
 * KONSEP YANG DIPELAJARI:
 * 1. Array mapping untuk render list
 * 2. Key prop untuk React reconciliation
 * 3. Props drilling
 * 4. Conditional rendering (empty state)
 * 5. Grid layout dengan CSS
 */

import FlashCard from './FlashCard';
import { motion } from 'framer-motion';

/**
 * PROPS:
 * - cards: array of card objects
 * - onDeleteCard: callback untuk delete card
 */
function FlashCardList({ cards, onDeleteCard }) {
  /**
   * EARLY RETURN PATTERN
   * 
   * Handle edge case: empty cards array
   * Show empty state UI
   */
  if (cards.length === 0) {
    return (
      <div style={styles.emptyState}>
        <div style={styles.emptyIcon}>📚</div>
        <h3 style={styles.emptyTitle}>Belum ada kartu</h3>
        <p style={styles.emptyText}>
          Tambahkan kartu pertama Anda untuk mulai belajar!
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/**
       * GRID CONTAINER
       * 
       * CSS Grid untuk responsive layout
       * Auto-fit: otomatis adjust kolom berdasarkan space available
       * minmax(300px, 1fr): minimum 300px, maximum 1fr (equal distribution)
       */}
      <div style={styles.grid}>
        {/**
         * ARRAY.MAP() untuk RENDER LIST
         * 
         * Best practice di React untuk render dynamic lists
         * 
         * Syntax: array.map((item, index) => <Component key={...} />)
         * 
         * KENAPA PERLU KEY?
         * - React gunakan key untuk identify elements
         * - Optimize re-rendering
         * - Track changes (add, remove, reorder)
         * - Prevent unnecessary DOM updates
         * 
         * KEY RULES:
         * 1. Harus unique di antara siblings
         * 2. Harus stable (tidak berubah antar renders)
         * 3. Jangan gunakan index sebagai key (kecuali list static dan tidak reorder)
         * 4. Best practice: gunakan unique id dari data
         */}
        {cards.map((card, index) => (
          /**
           * MOTION.DIV WRAPPER
           * 
           * Wrap each card dengan motion.div untuk:
           * - Entry animation saat card pertama muncul
           * - Exit animation saat card di-delete (perlu AnimatePresence di parent)
           * 
           * STAGGERED ANIMATION:
           * - delay berdasarkan index
           * - Setiap card muncul dengan slight delay
           * - Creates smooth, professional entrance
           */
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4,
              delay: index * 0.1, // Stagger effect
              ease: "easeOut"
            }}
          >
            {/**
             * FLASHCARD COMPONENT
             * 
             * PROPS PASSED:
             * - front: text untuk depan card
             * - back: text untuk belakang card
             * - onDelete: callback function
             * 
             * CALLBACK PATTERN:
             * Wrap onDeleteCard dengan arrow function
             * Pass card.id sebagai argument
             * Ini adalah "function currying" sederhana
             */}
            <FlashCard
              front={card.front}
              back={card.back}
              onDelete={() => onDeleteCard(card.id)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/**
 * STYLES
 */
const styles = {
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  
  grid: {
    /**
     * CSS GRID LAYOUT
     * 
     * display: grid - enable grid layout
     * gridTemplateColumns: define column structure
     * 
     * repeat(auto-fit, minmax(350px, 1fr)):
     * - auto-fit: fit as many columns as possible
     * - minmax(350px, 1fr): each column min 350px, max 1fr
     * - 1fr = one fraction of available space
     * 
     * Result: responsive grid tanpa media queries!
     */
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2.5rem',
    
    /**
     * JUSTIFY-ITEMS: CENTER
     * Center each grid item horizontally
     * Good untuk cards dengan max-width
     */
    justifyItems: 'center',
    
    /**
     * ALIGN-ITEMS: START
     * Align cards to top untuk konsistensi
     */
    alignItems: 'start',
  },
  
  /**
   * EMPTY STATE STYLES
   * 
   * UI yang ditampilkan saat tidak ada cards
   * Good UX practice: always handle empty states
   */
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    maxWidth: '500px',
    margin: '0 auto',
  },
  
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
    
    /**
     * ANIMATION dengan CSS
     * Alternative dari Framer Motion
     */
    animation: 'bounce 2s ease-in-out infinite',
  },
  
  emptyTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#27272a',
    marginBottom: '0.5rem',
  },
  
  emptyText: {
    fontSize: '1rem',
    color: '#71717a',
    lineHeight: '1.6',
  }
};

/**
 * CSS KEYFRAMES di JavaScript
 * 
 * Karena inline styles tidak support @keyframes,
 * kita perlu inject ke document head atau gunakan CSS file
 * 
 * Untuk production: lebih baik gunakan CSS file atau styled-components
 */
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  `;
  document.head.appendChild(styleSheet);
}

/**
 * ALTERNATIVE APPROACHES:
 * 
 * 1. Array.map() vs for loop:
 *    - map() lebih declarative dan React-idiomatic
 *    - for loop lebih imperative dan verbose
 * 
 * 2. Key selection:
 *    - ✅ Unique ID dari backend/database
 *    - ✅ Generated UUID untuk client-side data
 *    - ⚠️ Index (only for static lists yang tidak reorder)
 *    - ❌ Random number (berubah setiap render)
 * 
 * 3. Event handler passing:
 *    - () => onDeleteCard(id) - create new function setiap render
 *    - Alternative: useCallback untuk optimize
 *    - Untuk list kecil, tidak perlu optimize
 */

export default FlashCardList;