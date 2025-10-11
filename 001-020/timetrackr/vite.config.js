// Konfigurasi Vite untuk React
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Plugin React untuk mendukung JSX dan Fast Refresh
  base: '/react/001-020/timetrackr/dist/',
  plugins: [react()],
  
  // Konfigurasi server development
  server: {
    port: 3000, // Port untuk development server
    open: true  // Otomatis buka browser saat dev server start
  }
})