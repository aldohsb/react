/**
 * App.jsx
 * 
 * Root component aplikasi QuoteSpark
 * Menggabungkan semua components dan logic
 * 
 * TEKNIK YANG DIGUNAKAN:
 * 1. React Hooks (useState, useEffect)
 * 2. Fetch API dengan async/await
 * 3. Error handling dengan try-catch
 * 4. Component composition
 * 5. State management
 */

import React, { useState, useEffect } from 'react';

// Import custom components
import GradientBackground from './components/GradientBackground';
import QuoteCard from './components/QuoteCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

// Import services dan utilities
import { fetchRandomQuote, getRandomFallbackQuote } from './services/quoteService';
import { getRandomGradient } from './utils/gradients';

/**
 * App Component
 * Main component yang mengatur state dan logic aplikasi
 */
const App = () => {
  /**
   * STATE MANAGEMENT dengan useState Hook
   * 
   * useState adalah React Hook untuk menambahkan state ke functional component
   * Syntax: const [value, setValue] = useState(initialValue)
   * 
   * - value: current state value
   * - setValue: function untuk update state
   * - initialValue: nilai awal state
   */
  
  // State untuk menyimpan quote object
  const [quote, setQuote] = useState(null);
  
  // State untuk loading indicator
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk error message
  const [error, setError] = useState(null);
  
  // State untuk gradient background
  const [gradient, setGradient] = useState(getRandomGradient().gradient);

  /**
   * FUNCTION: loadNewQuote
   * 
   * Async function untuk fetch quote baru dari API
   * Menggunakan async/await pattern untuk handling promises
   * Includes comprehensive error handling
   */
  const loadNewQuote = async () => {
    // Set loading state ke true
    // Ini akan trigger re-render dan show loading spinner
    setIsLoading(true);
    
    // Reset error state
    setError(null);
    
    /**
     * TRY-CATCH BLOCK untuk error handling
     * 
     * try block: code yang mungkin throw error
     * catch block: code untuk handle error jika terjadi
     */
    try {
      /**
       * ASYNC/AWAIT
       * 
       * await keyword hanya bisa digunakan di async function
       * await "menunggu" Promise resolve sebelum lanjut ke line berikutnya
       * 
       * Tanpa await:
       * const data = fetchRandomQuote(); // Returns Promise, bukan data
       * 
       * Dengan await:
       * const data = await fetchRandomQuote(); // Returns actual data
       */
      const newQuote = await fetchRandomQuote();
      
      /**
       * UPDATE STATE
       * setState function dari useState Hook
       * Ketika state di-update, React akan re-render component
       */
      setQuote(newQuote);
      
      // Update gradient ke random gradient baru
      setGradient(getRandomGradient().gradient);
      
    } catch (err) {
      /**
       * ERROR HANDLING
       * 
       * Jika fetchRandomQuote throw error, code masuk ke catch block
       * err parameter berisi error object yang di-throw
       */
      
      // Log error untuk debugging
      console.error('Failed to load quote:', err);
      
      // Load fallback quote sebagai backup
      // Ini ensure user tetap melihat quote meski API gagal
      setQuote(getRandomFallbackQuote());
      
      // PERBAIKAN: Jangan set error jika fallback berhasil
      // User tetap bisa lihat quote, jadi tidak perlu tampilkan error
      // setError(err.message || 'Failed to load quote');
      
      // Optional: Log ke console saja untuk debugging
      console.warn('Using fallback quote due to API error');
      
    } finally {
      /**
       * FINALLY BLOCK
       * 
       * Code di finally block akan SELALU execute
       * Baik success maupun error, finally tetap run
       * 
       * Perfect untuk cleanup operations seperti:
       * - Set loading ke false
       * - Close connections
       * - Clear timers
       */
      setIsLoading(false);
    }
  };

  /**
   * useEffect HOOK
   * 
   * useEffect untuk side effects dalam React component
   * Side effects: data fetching, subscriptions, manual DOM manipulation
   * 
   * Syntax: useEffect(callback, dependencies)
   * - callback: function yang akan dijalankan
   * - dependencies: array of values yang di-watch
   * 
   * Dependency array behavior:
   * - [] (empty): run ONCE saat component mount (componentDidMount)
   * - [var]: run saat var berubah (componentDidUpdate)
   * - no array: run setiap render (tidak recommended)
   */
  useEffect(() => {
    /**
     * Load quote pertama kali saat app mount
     * 
     * Dependencies: [] (empty array)
     * Artinya: effect ini hanya run SEKALI saat component mount
     * Equivalent dengan componentDidMount di class components
     */
    loadNewQuote();
    
    // Optional: return cleanup function
    // Cleanup run saat component unmount
    return () => {
      // Cleanup code here (jika diperlukan)
      // Contoh: clear timers, cancel requests, unsubscribe
    };
  }, []); // Empty dependency array = run once on mount

  /**
   * CONDITIONAL RENDERING
   * 
   * Render different UI based on state
   * Pattern: if (condition) return <Component />
   */
  
  // Loading state: show loading spinner
  if (isLoading && !quote) {
    return (
      <GradientBackground gradient={gradient}>
        <LoadingSpinner />
      </GradientBackground>
    );
  }

  /**
   * MAIN RENDER
   * 
   * Component composition: nesting components
   * Props drilling: passing data dari parent ke child via props
   */
  return (
    <GradientBackground gradient={gradient}>
      {/* Container untuk content */}
      <div style={styles.container}>
        {/* App title */}
        <h1 style={styles.title}>QuoteSpark</h1>
        
        {/* Subtitle */}
        <p style={styles.subtitle}>Daily inspiration, one quote at a time ✨</p>
        
        {/**
         * CONDITIONAL RENDERING dengan && operator
         * 
         * Syntax: condition && <Component />
         * Jika condition true, render Component
         * Jika condition false, render nothing
         * 
         * PERBAIKAN: Hanya tampilkan error jika quote TIDAK ada
         * Jika quote ada (dari fallback), error tidak perlu ditampilkan
         */}
        {error && !quote && (
          <ErrorMessage 
            message={error} 
            onRetry={loadNewQuote} 
          />
        )}
        
        {/**
         * PROPS PASSING
         * 
         * Passing data dan functions ke child component via props
         * - quote: data object
         * - onNewQuote: callback function
         * - isLoading: boolean state
         */}
        {quote && (
          <QuoteCard 
            quote={quote}
            onNewQuote={loadNewQuote}
            isLoading={isLoading}
          />
        )}
        
        {/* Footer */}
        <footer style={styles.footer}>
          <p style={styles.footerText}>
            Made with ❤️ using React
          </p>
        </footer>
      </div>
    </GradientBackground>
  );
};

/**
 * STYLES OBJECT
 * Inline styles untuk component
 */
const styles = {
  // Main container
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
    width: '100%',
    maxWidth: '1200px',
    padding: '20px'
  },
  
  // App title styling
  title: {
    fontSize: '48px',
    fontWeight: '700',
    color: 'white',
    margin: '0',
    textAlign: 'center',
    textShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    letterSpacing: '1px'
  },
  
  // Subtitle styling
  subtitle: {
    fontSize: '18px',
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.9)',
    margin: '0',
    textAlign: 'center',
    letterSpacing: '0.5px'
  },
  
  // Footer container
  footer: {
    marginTop: '40px',
    textAlign: 'center'
  },
  
  // Footer text
  footerText: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: '0',
    fontWeight: '300'
  }
};

/**
 * EXPORT DEFAULT
 * 
 * Export component agar bisa di-import di file lain
 * Default export: bisa di-import dengan nama apapun
 * Named export: harus di-import dengan nama yang sama
 */
export default App;