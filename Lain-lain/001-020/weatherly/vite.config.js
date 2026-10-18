/**
 * Vite Configuration
 * Konfigurasi untuk Vite build tool
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Plugin untuk React dengan Fast Refresh
  base: '/react/001-020/weatherly/dist/',
  plugins: [react()],
  
  // Server configuration untuk development
  server: {
    port: 3000, // Port default untuk dev server
    open: true, // Automatically open browser saat npm run dev
  },
});