import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

/**
 * Entry point aplikasi React
 * 
 * React 18+ menggunakan createRoot API (bukan render seperti React 17)
 * createRoot memberikan performa lebih baik dengan concurrent rendering
 */

// Cari element dengan id 'root' di index.html
// Ini adalah container dimana React app akan di-render
const rootElement = document.getElementById('root');

// Create React root menggunakan createRoot API
// Root ini akan mengelola rendering dan updates
const root = ReactDOM.createRoot(rootElement);

// Render aplikasi
// React.StrictMode adalah wrapper untuk development yang:
// 1. Mengidentifikasi komponen dengan unsafe lifecycle
// 2. Warning tentang legacy API usage
// 3. Detect unexpected side effects dengan double-invoking functions
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);