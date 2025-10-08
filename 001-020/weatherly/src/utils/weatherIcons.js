/**
 * Weather Icons Utility
 * Mapping icon code dari OpenWeather API ke emoji/icon
 * Ini membuat UI lebih menarik dan mudah dipahami
 */

/**
 * Fungsi untuk mendapatkan emoji berdasarkan icon code dari API
 * @param {string} iconCode - Kode icon dari OpenWeather API (contoh: "01d", "02n")
 * @returns {string} - Emoji yang sesuai
 */
export const getWeatherEmoji = (iconCode) => {
  // Mapping icon code ke emoji
  // Format icon code: [kondisi][waktu]
  // d = day (siang), n = night (malam)
  const iconMap = {
    '01d': '☀️',  // Clear sky - day
    '01n': '🌙',  // Clear sky - night
    '02d': '⛅',  // Few clouds - day
    '02n': '☁️',  // Few clouds - night
    '03d': '☁️',  // Scattered clouds
    '03n': '☁️',  // Scattered clouds
    '04d': '☁️',  // Broken clouds
    '04n': '☁️',  // Broken clouds
    '09d': '🌧️',  // Shower rain
    '09n': '🌧️',  // Shower rain
    '10d': '🌦️',  // Rain - day
    '10n': '🌧️',  // Rain - night
    '11d': '⛈️',  // Thunderstorm
    '11n': '⛈️',  // Thunderstorm
    '13d': '❄️',  // Snow
    '13n': '❄️',  // Snow
    '50d': '🌫️',  // Mist
    '50n': '🌫️',  // Mist
  };

  // Return emoji sesuai code, atau default jika tidak ditemukan
  return iconMap[iconCode] || '🌤️';
};

/**
 * Fungsi untuk mendapatkan URL gambar icon dari OpenWeather
 * OpenWeather menyediakan icon gambar yang bisa digunakan
 * @param {string} iconCode - Kode icon dari API
 * @returns {string} - URL gambar icon
 */
export const getWeatherIconUrl = (iconCode) => {
  // OpenWeather icon URL format
  // @2x untuk resolusi lebih tinggi
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

/**
 * Fungsi untuk mendapatkan warna background berdasarkan kondisi cuaca
 * Membuat UI lebih dinamis dengan warna sesuai cuaca
 * @param {string} iconCode - Kode icon dari API
 * @returns {string} - Tailwind CSS classes untuk gradient background
 */
export const getWeatherGradient = (iconCode) => {
  // Ambil 2 karakter pertama (kondisi cuaca)
  const condition = iconCode.substring(0, 2);
  
  // Mapping kondisi ke gradient warna
  const gradientMap = {
    '01': 'from-yellow-400 to-orange-500',    // Clear sky - sunny
    '02': 'from-blue-400 to-blue-600',        // Few clouds
    '03': 'from-gray-400 to-gray-600',        // Scattered clouds
    '04': 'from-gray-500 to-gray-700',        // Broken clouds
    '09': 'from-blue-500 to-blue-700',        // Shower rain
    '10': 'from-blue-600 to-indigo-700',      // Rain
    '11': 'from-purple-600 to-purple-900',    // Thunderstorm
    '13': 'from-cyan-200 to-blue-400',        // Snow
    '50': 'from-gray-300 to-gray-500',        // Mist
  };

  // Return gradient class, atau default
  return gradientMap[condition] || 'from-blue-400 to-blue-600';
};