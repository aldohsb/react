// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Memastikan root elemen 'div' dengan id 'root' ada di index.html
// File ini bertanggung jawab untuk merender komponen utama <App /> ke DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);