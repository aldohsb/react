// Import React library utama
import React from 'react';

// Import ReactDOM untuk rendering ke browser
import ReactDOM from 'react-dom/client';

// Import komponen App sebagai root component
import App from './App';

/**
 * Entry point aplikasi React
 * File ini bertanggung jawab untuk me-render aplikasi React ke DOM
 */

// Mengambil element dengan id 'root' dari HTML
const rootElement = document.getElementById('root');

// Membuat root React menggunakan createRoot (React 18+)
// createRoot adalah API baru yang mendukung concurrent features
const root = ReactDOM.createRoot(rootElement);

// Render komponen App ke dalam root element
// StrictMode membantu mengidentifikasi potential problems di aplikasi
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);