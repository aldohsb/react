/**
 * Weather Service
 * File ini menangani semua komunikasi dengan OpenWeather API
 * Menggunakan modular programming untuk memisahkan logic API dari komponen
 */

// Mengambil API key dan base URL dari environment variables
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;

/**
 * Fungsi untuk mengambil data cuaca berdasarkan nama kota
 * @param {string} cityName - Nama kota yang ingin dicari
 * @returns {Promise<Object>} - Data cuaca dari API
 * @throws {Error} - Jika terjadi error saat fetch data
 */
export const getWeatherByCity = async (cityName) => {
  try {
    // Validasi input: pastikan cityName tidak kosong
    if (!cityName || cityName.trim() === '') {
      throw new Error('Nama kota tidak boleh kosong');
    }

    // Validasi API key: pastikan API key sudah diset
    if (!API_KEY) {
      throw new Error('API key tidak ditemukan. Silakan setup file .env');
    }

    // Membuat URL lengkap dengan parameter
    // units=metric untuk suhu dalam Celsius
    // lang=id untuk bahasa Indonesia (opsional)
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=id`;

    // Melakukan HTTP request ke API
    // fetch() mengembalikan Promise
    const response = await fetch(url);

    // Cek apakah response berhasil (status 200-299)
    if (!response.ok) {
      // Jika gagal, handle berdasarkan status code
      if (response.status === 404) {
        throw new Error('Kota tidak ditemukan. Periksa ejaan nama kota.');
      } else if (response.status === 401) {
        throw new Error('API key tidak valid. Periksa konfigurasi .env');
      } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
    }

    // Parse response JSON menjadi object JavaScript
    const data = await response.json();

    // Return data yang sudah diformat
    // Kita transform data API menjadi format yang lebih mudah digunakan
    return formatWeatherData(data);

  } catch (error) {
    // Re-throw error agar bisa ditangani di komponen
    // Jika error sudah punya message custom, gunakan itu
    // Jika tidak, buat message generic
    if (error.message.includes('fetch')) {
      throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet.');
    }
    throw error;
  }
};

/**
 * Fungsi helper untuk memformat data dari API
 * Mengambil hanya data yang diperlukan dan memberi struktur lebih sederhana
 * @param {Object} apiData - Raw data dari OpenWeather API
 * @returns {Object} - Data yang sudah diformat
 */
const formatWeatherData = (apiData) => {
  return {
    // Informasi kota
    city: apiData.name,
    country: apiData.sys.country,
    
    // Data cuaca utama
    temperature: Math.round(apiData.main.temp), // Pembulatan suhu
    feelsLike: Math.round(apiData.main.feels_like),
    description: apiData.weather[0].description,
    icon: apiData.weather[0].icon, // Kode icon dari API
    
    // Data tambahan
    humidity: apiData.main.humidity, // Kelembaban (%)
    pressure: apiData.main.pressure, // Tekanan udara (hPa)
    windSpeed: apiData.wind.speed, // Kecepatan angin (m/s)
    cloudiness: apiData.clouds.all, // Persentase awan (%)
    
    // Data suhu min/max
    tempMin: Math.round(apiData.main.temp_min),
    tempMax: Math.round(apiData.main.temp_max),
    
    // Timestamp
    timestamp: new Date(apiData.dt * 1000), // Convert Unix timestamp ke Date
  };
};