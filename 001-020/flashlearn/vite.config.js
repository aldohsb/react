// Import plugin React untuk Vite
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Konfigurasi Vite untuk build tool yang cepat
export default defineConfig({
  // Plugin untuk mendukung React JSX dan Fast Refresh
  base: '/react/001-020/flashlearn/dist/',
  plugins: [react()],
  
  // Konfigurasi server development
  server: {
    port: 3000, // Port untuk dev server
    open: true  // Otomatis buka browser saat npm run dev
  }
})