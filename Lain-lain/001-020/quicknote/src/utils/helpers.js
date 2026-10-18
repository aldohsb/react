/**
 * Fungsi helper untuk generate unique ID
 * Menggunakan timestamp dan random number untuk memastikan ID unik
 * 
 * @returns {string} - ID unik
 */
export const generateId = () => {
  // Gabungkan timestamp dengan random number untuk membuat ID yang hampir pasti unik
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Fungsi untuk format tanggal menjadi string yang readable
 * 
 * @param {number} timestamp - Unix timestamp dalam milliseconds
 * @returns {string} - Formatted date string
 */
export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  
  // Options untuk format tanggal dalam Bahasa Indonesia
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  // Gunakan toLocaleDateString untuk format yang readable
  return date.toLocaleDateString('id-ID', options);
};

/**
 * Fungsi untuk truncate text jika terlalu panjang
 * 
 * @param {string} text - Text yang akan di-truncate
 * @param {number} maxLength - Panjang maksimal text
 * @returns {string} - Text yang sudah di-truncate
 */
export const truncateText = (text, maxLength = 100) => {
  // Jika text lebih pendek dari maxLength, return text asli
  if (text.length <= maxLength) return text;
  
  // Potong text dan tambahkan ellipsis
  return text.substring(0, maxLength) + '...';
};