/**
 * quoteService.js
 * 
 * Service layer untuk menangani API calls
 * Menggunakan Fetch API dengan async/await pattern
 * Includes error handling untuk berbagai skenario error
 */

// Base URL untuk Quote API (free API tanpa auth)
const QUOTE_API_URL = 'https://zenquotes.io/api/random';

/**
 * Fetch random quote dari API
 * 
 * Teknik yang digunakan:
 * 1. Async/Await - untuk handling asynchronous operations
 * 2. Fetch API - untuk HTTP request
 * 3. Error Handling - try-catch untuk handle errors
 * 
 * @returns {Promise<Object>} Promise yang resolve ke quote object
 * @throws {Error} Jika fetch gagal atau response tidak ok
 */
export const fetchRandomQuote = async () => {
  try {
    /**
     * FETCH API
     * fetch() mengembalikan Promise yang resolve ke Response object
     * await keyword membuat function "menunggu" sampai Promise selesai
     * Tanpa await, code akan continue execute sebelum data ready
     */
    const response = await fetch(QUOTE_API_URL);
    
    /**
     * ERROR HANDLING #1: Check HTTP status
     * response.ok akan false jika status code 400-599
     * Status code 200-299 dianggap success
     */
    if (!response.ok) {
      // Throw custom error dengan informasi status
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    
    /**
     * PARSING JSON
     * response.json() juga asynchronous, butuh await
     * Mengubah response body dari JSON string ke JavaScript object
     */
    const data = await response.json();
    
    /**
     * VALIDATION: Pastikan data memiliki property yang dibutuhkan
     * Defensive programming untuk avoid undefined errors
     */
    if (!data.content || !data.author) {
      throw new Error('Invalid quote data received from API');
    }
    
    /**
     * Return formatted quote object
     * Menggunakan destructuring dan renaming untuk clarity
     */
    return {
      text: data.content,      // Quote text
      author: data.author,     // Author name
      id: data._id            // Unique ID dari API
    };
    
  } catch (error) {
    /**
     * ERROR HANDLING #2: Catch any errors
     * 
     * Jenis errors yang bisa terjadi:
     * 1. Network error (no internet, timeout)
     * 2. HTTP error (4xx, 5xx status codes)
     * 3. JSON parsing error
     * 4. Validation error (custom)
     */
    
    // Log error untuk debugging (visible di browser console)
    console.error('Error fetching quote:', error);
    
    /**
     * Re-throw error dengan message yang user-friendly
     * Error ini akan di-catch oleh component yang memanggil function ini
     */
    throw new Error(
      error.message || 'Failed to fetch quote. Please try again.'
    );
  }
};

/**
 * Helper function untuk check network status
 * Useful untuk memberikan feedback yang lebih spesifik ke user
 * 
 * @returns {boolean} true jika online, false jika offline
 */
export const isOnline = () => {
  // navigator.onLine adalah browser API untuk check network status
  // Note: ini check connection ke router, bukan actual internet
  return navigator.onLine;
};

/**
 * Fallback quotes untuk offline mode atau API failure
 * Array of local quotes sebagai backup
 */
export const fallbackQuotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    id: "fallback-1"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    id: "fallback-2"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    id: "fallback-3"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    id: "fallback-4"
  }
];

/**
 * Get random fallback quote
 * Digunakan ketika API call gagal
 * 
 * @returns {Object} Random quote object dari fallback array
 */
export const getRandomFallbackQuote = () => {
  const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
  return fallbackQuotes[randomIndex];
};