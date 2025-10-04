/**
 * ESLint Configuration
 * ESLint adalah linting tool untuk identify dan report patterns di JavaScript
 * Membantu maintain code quality dan consistency
 */

module.exports = {
  root: true,
  
  // Environment dimana code akan run
  env: { 
    browser: true, // Browser global variables
    es2020: true // Enable ES2020 syntax
  },
  
  // Extends dari config yang sudah ada
  extends: [
    'eslint:recommended', // ESLint recommended rules
    'plugin:react/recommended', // React recommended rules
    'plugin:react/jsx-runtime', // Support new JSX transform (tidak perlu import React)
    'plugin:react-hooks/recommended', // Rules of Hooks
  ],
  
  // Ignore patterns
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  
  // Parser options
  parserOptions: { 
    ecmaVersion: 'latest', // Latest ECMAScript version
    sourceType: 'module' // Enable ES6 modules
  },
  
  // Settings untuk React
  settings: { 
    react: { 
      version: '18.3' // React version untuk rules
    } 
  },
  
  // Plugins
  plugins: ['react-refresh'],
  
  // Custom rules
  rules: {
    // React Refresh rule untuk Fast Refresh work properly
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    
    // Disable prop-types karena kita tidak menggunakan PropTypes
    'react/prop-types': 'off',
    
    // Warning untuk unused variables
    'no-unused-vars': 'warn',
    
    // Allow console untuk development
    'no-console': 'off',
  },
};