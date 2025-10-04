/**
 * PostCSS Configuration
 * PostCSS adalah tool untuk transform CSS dengan JavaScript plugins
 * Tailwind CSS membutuhkan PostCSS untuk processing
 */

export default {
  plugins: {
    // Tailwind CSS plugin
    // Transform Tailwind directives (@tailwind, @apply, etc) menjadi actual CSS
    tailwindcss: {},
    
    // Autoprefixer plugin
    // Otomatis menambahkan vendor prefixes (-webkit-, -moz-, etc)
    // untuk CSS properties yang membutuhkan untuk browser compatibility
    autoprefixer: {},
  },
};