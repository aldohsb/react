// ==============================================
// VITE CONFIGURATION
// ==============================================

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite Configuration
 * Vite adalah build tool modern yang sangat cepat
 * 
 * Keunggulan Vite:
 * - Lightning fast HMR (Hot Module Replacement)
 * - Optimized build dengan Rollup
 * - Native ES modules support
 * - Out-of-the-box TypeScript support
 */

export default defineConfig({
  // Plugin configuration
  base: '/react/001-020/taskzen/dist/',
  plugins: [
    // React plugin untuk JSX transform dan Fast Refresh
    react()
  ],

  
  // Server configuration (development)
  server: {
    port: 3000, // Development server port
    open: true, // Auto open browser saat dev server start
    host: true, // Expose ke network (bisa diakses dari device lain)
  },
  
  // Build configuration (production)
  build: {
    outDir: 'dist', // Output directory untuk production build
    sourcemap: false, // Disable sourcemap di production untuk smaller bundle
    minify: 'terser', // Minification menggunakan terser
    target: 'es2015', // Target browser compatibility
  },
});