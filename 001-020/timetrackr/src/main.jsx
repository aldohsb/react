/**
 * Main Entry Point
 * 
 * File ini adalah entry point aplikasi React
 * Mounting React app ke DOM element dengan id 'root'
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Ambil element dengan id 'root' dari index.html
// createRoot adalah API React 18 untuk concurrent rendering
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode untuk highlight potential problems
  // Di development mode, component akan di-render 2x untuk detect side effects
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)