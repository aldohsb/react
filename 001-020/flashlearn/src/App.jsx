/**
 * APP COMPONENT - Main Application Component
 * 
 * Root component yang mengatur state management dan compose semua child components
 * 
 * KONSEP YANG DIPELAJARI:
 * 1. State management di parent component
 * 2. Lifting state up pattern
 * 3. Props drilling
 * 4. Component composition
 * 5. CRUD operations (Create, Read, Delete)
 */

import { useState } from 'react';
import Header from './components/Header';
import AddCardForm from './components/AddCardForm';
import FlashCardList from './components/FlashCardList';
import { initialCards } from './data/initialCards';

function App() {
  /**
   * MAIN STATE: Cards Array
   * 
   * useState dengan initialCards sebagai initial value
   * State ini di-manage di parent (App) karena:
   * - Multiple children perlu access cards data
   * - Multiple children perlu modify cards (add, delete)
   * 
   * LIFTING STATE UP:
   * Saat multiple components perlu share state,
   * lift state ke common parent terdekat
   */
  const [cards, setCards] = useState(initialCards);

  /**
   * ADD CARD FUNCTION
   * 
   * Function untuk menambahkan card baru ke array
   * Akan di-pass sebagai prop ke AddCardForm component
   * 
   * @param {string} front - Text untuk front card
   * @param {string} back - Text untuk back card
   * 
   * IMMUTABLE STATE UPDATE:
   * - Jangan modify state directly: cards.push() ❌
   * - Create new array dengan spread: [...cards, newCard] ✅
   * 
   * KENAPA IMMUTABLE?
   * - React detect changes dengan reference comparison
   * - Immutability enable time-travel debugging
   * - Prevent bugs dari side effects
   */
  const handleAddCard = (front, back) => {
    /**
     * CREATE NEW CARD OBJECT
     * 
     * Generate unique ID dengan timestamp + random
     * Untuk production: gunakan UUID library atau ID dari backend
     */
    const newCard = {
      id: Date.now() + Math.random(), // Simple unique ID generation
      front: front,
      back: back
    };

    /**
     * UPDATE STATE dengan FUNCTIONAL UPDATE
     * 
     * prevCards => [...prevCards, newCard]
     * 
     * Functional update pattern:
     * - Access previous state safely
     * - Important saat update based on previous state
     * - Prevent stale closure bugs
     * 
     * SPREAD OPERATOR [...]:
     * - Create shallow copy of array
     * - Add new item to end
     * - Original array tidak berubah
     */
    setCards(prevCards => [...prevCards, newCard]);
  };

  /**
   * DELETE CARD FUNCTION
   * 
   * Function untuk menghapus card dari array berdasarkan ID
   * Akan di-pass sebagai prop ke FlashCardList component
   * 
   * @param {number} id - ID card yang akan di-delete
   * 
   * ARRAY.FILTER() METHOD:
   * - Create new array dengan items yang pass condition
   * - card.id !== id: keep semua card kecuali yang match ID
   * - Immutable operation (original array tidak berubah)
   */
  const handleDeleteCard = (id) => {
    /**
     * CONFIRMATION DIALOG
     * 
     * window.confirm() native browser dialog
     * Return true jika user click OK, false jika Cancel
     * 
     * Good UX: confirm sebelum destructive action
     */
    const confirmed = window.confirm('Yakin ingin menghapus kartu ini?');
    
    if (confirmed) {
      /**
       * FILTER OUT CARD dengan ID yang match
       * 
       * Alternative methods:
       * 1. filter() - return new array (best for this case)
       * 2. splice() - mutate original array (avoid)
       * 3. slice() + concat - verbose, tidak perlu
       */
      setCards(prevCards => prevCards.filter(card => card.id !== id));
    }
  };

  /**
   * COMPONENT RENDER
   * 
   * JSX yang define structure aplikasi
   * 
   * COMPONENT TREE:
   * App
   * ├── Header
   * ├── AddCardForm
   * └── FlashCardList
   *     └── FlashCard (multiple)
   */
  return (
    <div style={styles.app}>
      {/**
       * HEADER COMPONENT
       * No props needed - purely presentational
       */}
      <Header />

      {/**
       * MAIN CONTENT WRAPPER
       */}
      <main style={styles.main}>
        {/**
         * ADD CARD FORM
         * 
         * PROPS DRILLING:
         * - onAddCard: callback function dari parent
         * - Saat form submit, call onAddCard dengan data
         * - Parent handle state update
         * 
         * PATTERN: Presentational vs Container Component
         * - AddCardForm = presentational (UI + local state)
         * - App = container (business logic + main state)
         */}
        <AddCardForm onAddCard={handleAddCard} />

        {/**
         * FLASHCARD LIST
         * 
         * PROPS:
         * - cards: array of cards dari state
         * - onDeleteCard: callback untuk delete
         * 
         * DATA FLOW:
         * 1. App render FlashCardList dengan cards prop
         * 2. FlashCardList map cards dan render FlashCard
         * 3. FlashCard receive individual card data
         * 4. User click delete di FlashCard
         * 5. Event bubble up via callbacks
         * 6. App update state
         * 7. React re-render tree dengan new state
         */}
        <FlashCardList 
          cards={cards} 
          onDeleteCard={handleDeleteCard} 
        />
      </main>

      {/**
       * FOOTER
       * Simple footer dengan credit
       */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Dibuat dengan ❤️ menggunakan React & Framer Motion
        </p>
        <p style={styles.footerSubtext}>
          Total Kartu: {cards.length}
        </p>
      </footer>
    </div>
  );
}

/**
 * STYLES
 * 
 * Styling untuk layout utama aplikasi
 */
const styles = {
  app: {
    /**
     * FLEXBOX LAYOUT
     * 
     * Flexbox untuk vertical layout dengan sticky footer
     * minHeight: 100vh untuk full viewport height
     */
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  
  main: {
    /**
     * FLEX GROW
     * 
     * flex: 1 membuat main content take remaining space
     * Push footer ke bottom
     */
    flex: 1,
    padding: '2rem 1rem',
  },
  
  footer: {
    /**
     * FOOTER STYLING
     * 
     * Sticky footer dengan gradient background
     */
    backgroundColor: 'rgba(168, 85, 247, 0.05)',
    borderTop: '1px solid rgba(168, 85, 247, 0.1)',
    padding: '2rem 1rem',
    textAlign: 'center',
  },
  
  footerText: {
    fontSize: '0.875rem',
    color: '#52525b',
    marginBottom: '0.5rem',
  },
  
  footerSubtext: {
    fontSize: '0.75rem',
    color: '#a1a1aa',
    fontWeight: '600',
  }
};

/**
 * REACT COMPONENT BEST PRACTICES:
 * 
 * ✅ Single Responsibility: each component do one thing
 * ✅ Props Drilling (untuk app kecil): pass props down
 * ✅ Lifting State Up: state di parent yang perlu share
 * ✅ Immutable Updates: spread operator, filter, map
 * ✅ Descriptive Naming: handleAddCard, handleDeleteCard
 * ✅ Comments: explain WHY not WHAT
 * 
 * UNTUK SCALE UP:
 * - Context API: avoid props drilling
 * - useReducer: complex state logic
 * - Custom hooks: reusable logic
 * - State management library: Redux, Zustand (untuk app besar)
 */

/**
 * FRAMER MOTION BEST PRACTICES di PROJECT ini:
 * 
 * ✅ whileHover, whileTap: instant feedback
 * ✅ animate prop: declarative animations
 * ✅ transition config: spring untuk natural motion
 * ✅ initial + animate: entrance animations
 * ✅ Staggered animations: delay based on index
 * 
 * ADVANCED (tidak digunakan di project ini):
 * - AnimatePresence: exit animations
 * - Variants: reusable animation configs
 * - useAnimation: imperative control
 * - Layout animations: automatic layout transitions
 */

/**
 * EXPORT DEFAULT
 * 
 * App adalah main component dari file ini
 * Satu-satunya export dari file ini
 */
export default App;