/**
 * Main App Component - Weatherly
 * Component utama yang menggabungkan semua sub-components
 * Mengelola state dan logic aplikasi
 */

// Import React hooks
import { useState } from 'react';

// Import components
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

// Import service
import { getWeatherByCity } from './services/weatherService';

function App() {
  
  /**
   * STATE MANAGEMENT
   * Menggunakan useState untuk menyimpan berbagai state
   */
  
  // State untuk input kota (Controlled Component)
  const [city, setCity] = useState('');
  
  // State untuk menyimpan data cuaca dari API
  const [weatherData, setWeatherData] = useState(null);
  
  // State untuk tracking loading state
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk menyimpan pesan error
  const [error, setError] = useState(null);

  /**
   * EVENT HANDLERS
   */
  
  /**
   * Handler untuk perubahan input city
   * Dipanggil setiap kali user mengetik di SearchBar
   */
  const handleCityChange = (newCity) => {
    setCity(newCity);
    // Clear error saat user mulai mengetik lagi
    if (error) setError(null);
  };

  /**
   * Handler untuk pencarian cuaca
   * Fungsi async karena melakukan fetch ke API
   */
  const handleSearch = async () => {
    // Validasi: jangan lakukan pencarian jika input kosong
    if (!city.trim()) {
      setError('Silakan masukkan nama kota');
      return;
    }

    // Reset state sebelum fetch
    setError(null);
    setWeatherData(null);
    setIsLoading(true); // Set loading true saat mulai fetch

    try {
      // Call service untuk fetch data
      // await menunggu Promise selesai
      const data = await getWeatherByCity(city);
      
      // Jika berhasil, simpan data ke state
      setWeatherData(data);
      
    } catch (err) {
      // Jika gagal, simpan error message ke state
      // err.message berisi pesan error dari service
      setError(err.message);
      
    } finally {
      // finally block selalu dijalankan, baik success atau error
      // Set loading false setelah fetch selesai
      setIsLoading(false);
    }
  };

  return (
    // Main container dengan gradient background
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      
      {/* Header Section */}
      <header className="px-4 pt-12 pb-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* App Title dengan gradient text */}
          <h1 className="mb-3 text-5xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
            ☁️ Weatherly
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg text-gray-600">
            Cek cuaca di kota mana pun, kapan pun
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Search Bar Component */}
          <div className="mb-8">
            <SearchBar
              city={city}
              onCityChange={handleCityChange}
              onSearch={handleSearch}
              isLoading={isLoading}
            />
          </div>

          {/* Conditional Rendering berdasarkan state */}
          <div className="mt-8">
            
            {/* Tampilkan Loading Spinner jika sedang loading */}
            {isLoading && <LoadingSpinner />}
            
            {/* Tampilkan Error Message jika ada error */}
            {error && !isLoading && (
              <ErrorMessage message={error} />
            )}
            
            {/* Tampilkan Weather Card jika ada data dan tidak loading */}
            {weatherData && !isLoading && !error && (
              <WeatherCard weatherData={weatherData} />
            )}
            
            {/* Initial State - tampilkan saat belum ada pencarian */}
            {!weatherData && !isLoading && !error && (
              <div className="py-16 text-center">
                <div className="mb-4 text-6xl">🌤️</div>
                <h3 className="mb-2 text-2xl font-semibold text-gray-700">
                  Selamat Datang di Weatherly!
                </h3>
                <p className="text-gray-500">
                  Masukkan nama kota di atas untuk melihat cuaca terkini
                </p>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-sm text-center text-gray-500">
        <p>
          Powered by{' '}
          <a 
            href="https://openweathermap.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-700"
          >
            OpenWeather API
          </a>
        </p>
      </footer>

    </div>
  );
}

// Export App component sebagai default export
export default App;