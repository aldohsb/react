/**
 * Loading Spinner Component
 * Komponen sederhana untuk menampilkan loading state
 * Menggunakan CSS animation untuk efek berputar
 */

const LoadingSpinner = () => {
  return (
    // Container dengan flexbox untuk center alignment
    <div className="flex flex-col items-center justify-center py-12">
      {/* Spinner dengan border animation */}
      <div className="relative">
        {/* Outer ring - background */}
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
        
        {/* Spinning ring - dengan border-t-color berbeda */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      
      {/* Loading text */}
      <p className="mt-4 text-sm font-medium text-gray-600">
        Mengambil data cuaca...
      </p>
    </div>
  );
};

// Export component agar bisa digunakan di file lain
export default LoadingSpinner;