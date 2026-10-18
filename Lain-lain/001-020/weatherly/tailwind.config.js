/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan semua file untuk class Tailwind
  ],
  theme: {
    extend: {
      // Extend tema Tailwind jika diperlukan
      colors: {
        'weather-blue': '#4A90E2',
        'weather-dark': '#1E3A5F',
      },
    },
  },
  plugins: [],
}