// ==============================================
// MAIN ENTRY POINT - React Application Bootstrap
// ==============================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Application Entry Point
 * File ini adalah starting point dari React application
 * 
 * PELAJARAN REACT 18:
 * - createRoot() adalah API baru di React 18 (menggantikan ReactDOM.render)
 * - Mendukung Concurrent Features
 * - Automatic batching untuk better performance
 */

// Get root DOM element dari index.html
const rootElement = document.getElementById('root');

// Create React root menggunakan React 18 API
const root = ReactDOM.createRoot(rootElement);

// Render App component ke root
// StrictMode: Development tool untuk highlight potential problems
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * CATATAN PENTING:
 * 
 * React.StrictMode:
 * - Hanya aktif di development mode
 * - Membantu detect side effects dan deprecated APIs
 * - Tidak render apapun di UI
 * - Component akan di-render 2x untuk detect issues
 * 
 * createRoot vs render (legacy):
 * - createRoot() = React 18+ (Concurrent Mode)
 * - ReactDOM.render() = React 17 dan sebelumnya (deprecated)
 */