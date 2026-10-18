// main.jsx - Entry point aplikasi React
// File ini adalah yang pertama kali dijalankan oleh Vite

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

/**
 * React 18+ Rendering
 * Menggunakan createRoot API (bukan ReactDOM.render yang sudah deprecated)
 * 
 * StrictMode:
 * - Development tool untuk highlight potential problems
 * - Double-invoke effects untuk detect side-effects
 * - Warn tentang deprecated APIs
 * - Tidak affect production build
 */

// Get root element dari HTML
const rootElement = document.getElementById('root');

// Create React root
const root = createRoot(rootElement);

// Render aplikasi
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

/**
 * Notes tentang React 18+ Features yang digunakan:
 * 
 * 1. createRoot (Concurrent Features):
 *    - Enables concurrent rendering
 *    - Automatic batching untuk better performance
 *    - Supports Suspense dan Transitions
 * 
 * 2. StrictMode:
 *    - Helps identify unsafe lifecycles
 *    - Warns about legacy APIs
 *    - Detects unexpected side effects
 * 
 * 3. Modern JSX Transform:
 *    - No need to import React in every file (Vite handles it)
 *    - Automatic JSX runtime
 */