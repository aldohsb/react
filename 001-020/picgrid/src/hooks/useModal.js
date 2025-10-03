// Custom Hook untuk mengelola state Modal
// Ini adalah contoh modular programming di React

import { useState, useEffect } from 'react';

/**
 * Custom Hook useModal
 * Mengelola state untuk modal (buka/tutup dan foto yang dipilih)
 * 
 * @returns {Object} - Object berisi state dan fungsi untuk kontrol modal
 */
export const useModal = () => {
  // State untuk tracking apakah modal terbuka atau tidak
  // Default: false (modal tertutup)
  const [isOpen, setIsOpen] = useState(false);
  
  // State untuk menyimpan foto yang sedang ditampilkan di modal
  // Default: null (tidak ada foto yang dipilih)
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  /**
   * Fungsi untuk membuka modal dengan foto tertentu
   * @param {Object} photo - Object foto yang akan ditampilkan
   */
  const openModal = (photo) => {
    setSelectedPhoto(photo); // Set foto yang dipilih
    setIsOpen(true);         // Buka modal
  };

  /**
   * Fungsi untuk menutup modal
   * Mereset state ke kondisi awal
   */
  const closeModal = () => {
    setIsOpen(false);        // Tutup modal
    setSelectedPhoto(null);  // Hapus foto yang dipilih
  };

  /**
   * useEffect untuk handle keyboard event (ESC key)
   * Dependency: [isOpen] - effect hanya jalan ketika isOpen berubah
   * 
   * Pattern: Event listener cleanup
   * Penting untuk menghapus event listener saat component unmount
   * atau saat effect di-cleanup untuk mencegah memory leak
   */
  useEffect(() => {
    // Fungsi handler untuk event keyboard
    const handleEscape = (event) => {
      // Jika tombol yang ditekan adalah ESC (key code: Escape)
      if (event.key === 'Escape') {
        closeModal(); // Tutup modal
      }
    };

    // Jika modal terbuka, tambahkan event listener
    if (isOpen) {
      // addEventListener: cara modern 2025 untuk handle events
      window.addEventListener('keydown', handleEscape);
    }

    // Cleanup function: dipanggil saat component unmount atau effect re-run
    // Ini SANGAT PENTING untuk mencegah memory leak
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]); // Dependency array: effect hanya re-run jika isOpen berubah

  /**
   * useEffect untuk disable scroll saat modal terbuka
   * Dependency: [isOpen]
   * 
   * Pattern: Side effect untuk DOM manipulation
   */
  useEffect(() => {
    if (isOpen) {
      // Simpan nilai scroll sebelumnya
      const scrollY = window.scrollY;
      
      // Disable scroll dengan CSS
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position saat modal ditutup
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Kembalikan scroll ke posisi semula
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    // Cleanup: kembalikan style ke default saat unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Return object dengan state dan functions
  // Ini memungkinkan component lain mengakses dan mengontrol modal
  return {
    isOpen,        // State: apakah modal terbuka
    selectedPhoto, // State: foto yang sedang dipilih
    openModal,     // Function: untuk membuka modal
    closeModal     // Function: untuk menutup modal
  };
};

// Export default untuk kemudahan import
export default useModal;