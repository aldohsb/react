// ==============================================
// CONSTANTS - Nilai tetap yang digunakan di aplikasi
// ==============================================

/**
 * FILTER_OPTIONS
 * Mendefinisikan tipe filter yang tersedia untuk menampilkan task
 * - ALL: Menampilkan semua task
 * - ACTIVE: Menampilkan task yang belum selesai
 * - COMPLETED: Menampilkan task yang sudah selesai
 */
export const FILTER_OPTIONS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

/**
 * LOCAL_STORAGE_KEY
 * Key untuk menyimpan data task di localStorage browser
 * Digunakan untuk persistensi data agar task tidak hilang saat refresh
 */
export const LOCAL_STORAGE_KEY = 'taskzen_tasks';