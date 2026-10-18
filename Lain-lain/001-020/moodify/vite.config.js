// vite.config.js

// Import defineConfig dari Vite untuk type safety
import { defineConfig } from 'vite'
// Import React plugin untuk Vite
import react from '@vitejs/plugin-react'

// Export konfigurasi Vite
export default defineConfig({
  // Array of plugins yang digunakan
  base: '/react/001-020/moodify/dist/',

  plugins: [
    // React plugin dengan Fast Refresh support
    react()
  ],
  // Server configuration untuk development
  server: {
    // Port untuk development server
    port: 3000,
    // Auto open browser saat server start
    open: true
  }
})