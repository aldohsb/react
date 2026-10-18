/**
 * Tailwind CSS Configuration
 * 
 * Konfigurasi Tailwind untuk styling aplikasi
 * Mendefinisikan content paths, theme, dan plugins
 */

/** @type {import('tailwindcss').Config} */
export default {
  // Content paths - file mana saja yang menggunakan Tailwind classes
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      // Custom animations
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      // Custom keyframes
      keyframes: {
        fadeIn: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      },
      
      // Custom colors (opsional, untuk konsistensi)
      colors: {
        slate: {
          850: '#1a202e',
        },
      },
    },
  },
  
  plugins: [],
}