import { useState, useEffect } from 'react';

/**
 * Custom Hook untuk mengelola data di localStorage
 * Hook ini menggabungkan useState dan useEffect untuk sinkronisasi otomatis
 * 
 * @param {string} key - Kunci untuk menyimpan data di localStorage
 * @param {any} initialValue - Nilai awal jika tidak ada data di localStorage
 * @returns {[any, function]} - [storedValue, setValue]
 */
const useLocalStorage = (key, initialValue) => {
  // useState untuk menyimpan nilai di state React
  // Kita gunakan function di dalam useState untuk lazy initialization
  // Ini berarti function hanya dijalankan sekali saat komponen pertama kali render
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Coba ambil data dari localStorage menggunakan key
      const item = window.localStorage.getItem(key);
      
      // Jika ada data, parse JSON string menjadi object/array
      // Jika tidak ada, gunakan initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Jika terjadi error (misalnya JSON invalid), log error dan gunakan initialValue
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // useEffect akan berjalan setiap kali storedValue atau key berubah
  // Ini untuk menyinkronkan state React dengan localStorage
  useEffect(() => {
    try {
      // Convert value menjadi JSON string
      const valueToStore = JSON.stringify(storedValue);
      
      // Simpan ke localStorage
      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      // Handle error jika gagal menyimpan (misalnya localStorage penuh)
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]); // Dependency array: efek ini berjalan jika key atau storedValue berubah

  // Return value dan setter function seperti useState biasa
  return [storedValue, setStoredValue];
};

export default useLocalStorage;