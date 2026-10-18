/**
 * Utility functions untuk format waktu
 * Memisahkan logic formatting dari komponen untuk reusability
 */

/**
 * Format milliseconds menjadi HH:MM:SS.mmm
 * @param {number} ms - Total milliseconds
 * @returns {object} Object dengan hours, minutes, seconds, milliseconds
 */
export const formatTime = (ms) => {
  // Konversi milliseconds ke seconds dengan pembulatan ke bawah
  const totalSeconds = Math.floor(ms / 1000);
  
  // Hitung hours dari total seconds
  const hours = Math.floor(totalSeconds / 3600);
  
  // Hitung minutes dari sisa seconds setelah dikurangi hours
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  
  // Hitung seconds dari sisa setelah dikurangi hours dan minutes
  const seconds = totalSeconds % 60;
  
  // Ambil milliseconds (3 digit) dari sisa pembagian
  const milliseconds = Math.floor((ms % 1000) / 10);
  
  return {
    hours,
    minutes,
    seconds,
    milliseconds
  };
};

/**
 * Tambahkan leading zero untuk angka < 10
 * @param {number} num - Angka yang akan diformat
 * @param {number} digits - Jumlah digit minimal (default 2)
 * @returns {string} String dengan leading zeros
 */
export const padZero = (num, digits = 2) => {
  return String(num).padStart(digits, '0');
};

/**
 * Format waktu menjadi string yang siap ditampilkan
 * @param {number} ms - Total milliseconds
 * @returns {string} Formatted time string (HH:MM:SS.mm)
 */
export const getFormattedTime = (ms) => {
  const { hours, minutes, seconds, milliseconds } = formatTime(ms);
  
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds)}`;
};