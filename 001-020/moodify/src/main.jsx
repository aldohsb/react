// src/main.jsx

// Import React untuk rendering
import React from 'react';
// Import ReactDOM untuk mount aplikasi ke DOM
import ReactDOM from 'react-dom/client';
// Import komponen App utama
import App from './App.jsx';

// Render aplikasi ke element dengan id 'root'
// React 18 menggunakan createRoot API yang baru
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode membantu detect potential problems
  // Di development mode, component akan render 2x untuk detect side effects
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);