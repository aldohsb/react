/**
 * Weather Card Component
 * Komponen untuk menampilkan data cuaca dengan UI yang menarik
 * 
 * Props:
 * - weatherData: object berisi data cuaca dari API
 */

// Import utility functions
import { getWeatherEmoji, getWeatherGradient, getWeatherIconUrl } from '../utils/weatherIcons';

const WeatherCard = ({ weatherData }) => {
  
  // Destructuring data dari props untuk akses lebih mudah
  const {
    city,
    country,
    temperature,
    feelsLike,
    description,
    icon,
    humidity,
    pressure,
    windSpeed,
    tempMin,
    tempMax,
  } = weatherData;

  // Get dynamic gradient based on weather condition
  const gradientClass = getWeatherGradient(icon);

  return (
    // Main card container dengan animation fade-in
    <div className="w-full max-w-2xl mx-auto animate-fadeIn">
      
      {/* Header Card - dengan gradient background dinamis */}
      <div className={`bg-gradient-to-br ${gradientClass} rounded-3xl shadow-2xl overflow-hidden`}>
        
        {/* Top Section - Lokasi dan Emoji */}
        <div className="p-8 text-white">
          {/* City Name dan Country */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-4xl font-bold">{city}</h2>
              <p className="text-lg opacity-90">{country}</p>
            </div>
            
            {/* Weather Emoji - besar dan bold */}
            <div className="text-7xl">
              {getWeatherEmoji(icon)}
            </div>
          </div>

          {/* Temperature - angka besar dan prominent */}
          <div className="flex items-start mb-4">
            <span className="font-bold text-8xl">
              {temperature}
            </span>
            <span className="mt-2 text-4xl font-light">°C</span>
          </div>

          {/* Description dan Feels Like */}
          <div className="space-y-1">
            <p className="text-2xl font-medium capitalize">
              {description}
            </p>
            <p className="text-lg opacity-90">
              Terasa seperti {feelsLike}°C
            </p>
          </div>

          {/* Min/Max Temperature */}
          <div className="flex gap-4 mt-4 text-sm">
            <div className="flex items-center gap-1">
              <span>↓</span>
              <span>{tempMin}°</span>
            </div>
            <div className="flex items-center gap-1">
              <span>↑</span>
              <span>{tempMax}°</span>
            </div>
          </div>
        </div>

        {/* Bottom Section - Detail Info Grid */}
        <div className="bg-white bg-opacity-20 backdrop-blur-sm">
          <div className="grid grid-cols-3 divide-x divide-white divide-opacity-20">
            
            {/* Humidity Info */}
            <div className="p-6 text-center text-white">
              <div className="mb-2 text-3xl">💧</div>
              <p className="text-2xl font-semibold">{humidity}%</p>
              <p className="mt-1 text-sm opacity-90">Kelembaban</p>
            </div>

            {/* Wind Speed Info */}
            <div className="p-6 text-center text-white">
              <div className="mb-2 text-3xl">💨</div>
              <p className="text-2xl font-semibold">{windSpeed} m/s</p>
              <p className="mt-1 text-sm opacity-90">Kec. Angin</p>
            </div>

            {/* Pressure Info */}
            <div className="p-6 text-center text-white">
              <div className="mb-2 text-3xl">🌡️</div>
              <p className="text-2xl font-semibold">{pressure} hPa</p>
              <p className="mt-1 text-sm opacity-90">Tekanan</p>
            </div>

          </div>
        </div>

      </div>

      {/* Footer - Timestamp */}
      <div className="mt-4 text-sm text-center text-gray-500">
        Data diperbarui: {new Date().toLocaleString('id-ID')}
      </div>

    </div>
  );
};

// Export component
export default WeatherCard;