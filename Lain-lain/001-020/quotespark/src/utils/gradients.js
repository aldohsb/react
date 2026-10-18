/**
 * gradients.js
 * 
 * File utility untuk menyimpan koleksi gradient warna
 * Menggunakan tema sunrise/sunset dengan warna-warna hangat
 * Setiap gradient menggunakan format CSS linear-gradient
 */

// Array of gradient objects dengan tema sunrise
export const sunriseGradients = [
  {
    // Gradient 1: Classic Orange Sunrise
    name: 'Classic Sunrise',
    // linear-gradient dari bawah ke atas (to top)
    // Warna: coral → orange → pink
    gradient: 'linear-gradient(to top, #ff6b6b, #feca57, #ff9ff3)'
  },
  {
    // Gradient 2: Warm Morning
    name: 'Warm Morning',
    // Kombinasi warm colors: peach → golden → pink
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    // Gradient 3: Golden Hour
    name: 'Golden Hour',
    // Gradient dengan angle 135deg untuk efek diagonal
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  },
  {
    // Gradient 4: Peachy Sunrise
    name: 'Peachy Sunrise',
    // Kombinasi peach dan coral yang lembut
    gradient: 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)'
  },
  {
    // Gradient 5: Sunset Glow
    name: 'Sunset Glow',
    // Purple ke orange untuk efek sunset
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    // Gradient 6: Morning Bliss
    name: 'Morning Bliss',
    // Soft pink ke blue sky
    gradient: 'linear-gradient(to top, #fa709a 0%, #fee140 100%)'
  }
];

/**
 * Fungsi untuk mendapatkan random gradient dari array
 * @returns {Object} Object gradient dengan property name dan gradient
 */
export const getRandomGradient = () => {
  // Math.random() menghasilkan angka 0-1
  // Dikalikan dengan length array untuk mendapat index random
  // Math.floor() membulatkan ke bawah untuk mendapat integer
  const randomIndex = Math.floor(Math.random() * sunriseGradients.length);
  
  // Return gradient object pada index random
  return sunriseGradients[randomIndex];
};

/**
 * Fungsi untuk mendapatkan gradient berdasarkan index
 * @param {number} index - Index gradient yang diinginkan
 * @returns {Object} Object gradient
 */
export const getGradientByIndex = (index) => {
  // Validasi: pastikan index dalam range array
  // Jika index invalid, return gradient pertama sebagai fallback
  if (index < 0 || index >= sunriseGradients.length) {
    return sunriseGradients[0];
  }
  
  return sunriseGradients[index];
};