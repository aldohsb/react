// src/hooks/useLocalStorage.jsx
import { useState, useEffect } from 'react';

// Custom hook untuk mengelola state dengan sinkronisasi ke localStorage.
// Ini adalah cara modern dan reusable untuk menyimpan data di browser.
const useLocalStorage = (key, initialValue) => {
  // useState untuk state lokal
  const [value, setValue] = useState(() => {
    try {
      // Ambil data dari localStorage berdasarkan key.
      const item = window.localStorage.getItem(key);
      // Jika ada, parse data JSON dan kembalikan.
      // Jika tidak, gunakan initialValue yang diberikan.
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Tangani error jika terjadi saat parsing atau mengakses localStorage.
      console.error(error);
      return initialValue;
    }
  });

  // useEffect untuk menyimpan data ke localStorage setiap kali 'value' berubah.
  // Dependencies array: [value, key].
  useEffect(() => {
    try {
      // Simpan nilai state ke localStorage setelah diubah menjadi string JSON.
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [value, key]); // Trigger efek setiap kali 'value' atau 'key' berubah

  // Mengembalikan nilai state dan fungsi untuk mengupdatenya,
  // sama seperti hook useState standar.
  return [value, setValue];
};

export default useLocalStorage;