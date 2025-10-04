/** @type {import('tailwindcss').Config} */

/**
 * Tailwind CSS Configuration
 * Tailwind adalah utility-first CSS framework
 * 
 * Keuntungan Tailwind:
 * 1. Rapid development dengan utility classes
 * 2. Konsisten design system
 * 3. Smaller bundle size (purge unused styles)
 * 4. Responsive design dengan breakpoint utilities
 */

export default {
  // Content paths: file-file yang menggunakan Tailwind classes
  // Tailwind akan scan files ini untuk generate CSS
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Semua file JS/JSX di folder src
  ],
  
  // Theme customization
  theme: {
    extend: {
      // Extend default Tailwind colors dengan custom teal palette
      colors: {
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf', // Primary teal color
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
      
      // Custom font family
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      
      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  
  // Plugins (bisa tambahkan plugin Tailwind official atau custom)
  plugins: [],
};