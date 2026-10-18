/**
 * vite.config.js
 * 
 * Konfigurasi untuk Vite build tool
 * Vite adalah modern build tool yang sangat cepat untuk development
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Export konfigurasi Vite
export default defineConfig({
  // Plugin untuk support React
  base: '/react/001-020/quotespark/dist/',
  plugins: [react()],
  
  // Server configuration untuk development
  server: {
    // Port untuk dev server
    port: 3000,
    
    // Auto open browser saat dev server start
    open: true
  }
});