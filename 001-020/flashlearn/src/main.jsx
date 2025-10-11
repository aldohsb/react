// Import React untuk menggunakan JSX
import React from 'react'

// Import ReactDOM untuk render ke browser DOM
import ReactDOM from 'react-dom/client'

// Import komponen utama aplikasi
import App from './App.jsx'

// Import global styles
import './styles/index.css'

/**
 * Entry Point Aplikasi React
 * 
 * ReactDOM.createRoot() adalah API React 18 yang lebih modern
 * Menggantikan ReactDOM.render() yang sudah deprecated
 * 
 * Concurrent Mode di React 18 memungkinkan React untuk:
 * - Interrupt rendering yang sedang berjalan
 * - Prioritize updates yang lebih penting
 * - Improve user experience dengan rendering yang lebih smooth
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode membantu mendeteksi potential problems di development
  // Double-invoke effects untuk mendeteksi side effects yang tidak safe
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)