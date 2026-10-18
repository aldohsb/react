import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite Configuration
 * Vite adalah build tool modern yang sangat cepat
 * 
 * Keuntungan Vite:
 * 1. Hot Module Replacement (HMR) super cepat
 * 2. Build time lebih cepat dari webpack
 * 3. ES modules native di development
 * 4. Out-of-the-box support untuk React, TypeScript, etc
 */

// https://vitejs.dev/config/
export default defineConfig({
  // Base public path untuk deployment
  // '/' untuk root domain, atau '/repo-name/' untuk GitHub Pages
  base: '/react/001-020/quicknote/dist/',
  
  // Plugins yang digunakan
  plugins: [
    react() // Plugin untuk support React (JSX, Fast Refresh, etc)
  ],
  
  // Server configuration untuk development
  server: {
    port: 3000, // Port untuk dev server (default 5173, kita ubah ke 3000)
    open: true, // Auto-open browser saat dev server start
    host: true // Expose ke network (bisa diakses dari devices lain)
  },
  
  // Build configuration untuk production
  build: {
    outDir: 'dist', // Output directory untuk production build
    sourcemap: false, // Disable sourcemap di production untuk security
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunks untuk code splitting (optimization)
        manualChunks: {
          vendor: ['react', 'react-dom'] // Separate vendor bundle
        }
      }
    }
  }
});