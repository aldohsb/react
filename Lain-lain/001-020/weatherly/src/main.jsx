/**
 * Main Entry Point
 * File ini adalah entry point aplikasi React
 * Merender App component ke DOM
 */

// Import React 18 rendering method
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Import App component
import App from './App.jsx';

// Import global CSS
import './index.css';

/**
 * Render aplikasi ke DOM
 * document.getElementById('root') mengambil element dengan id 'root' dari index.html
 * createRoot() adalah metode React 18 untuk rendering (menggantikan ReactDOM.render)
 */
createRoot(document.getElementById('root')).render(
  // StrictMode membantu menemukan potential problems di aplikasi
  // Hanya berjalan di development mode
  <StrictMode>
    <App />
  </StrictMode>
);