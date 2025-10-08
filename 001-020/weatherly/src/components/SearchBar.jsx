/**
 * Search Bar Component
 * Komponen input untuk mencari kota
 * Menggunakan Controlled Component pattern
 * 
 * Props:
 * - city: nilai input saat ini
 * - onCityChange: fungsi callback saat input berubah
 * - onSearch: fungsi callback saat tombol search diklik
 * - isLoading: boolean untuk disable input saat loading
 */

const SearchBar = ({ city, onCityChange, onSearch, isLoading }) => {
  
  /**
   * Handler untuk form submit
   * Mencegah page reload dan memanggil onSearch
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah default form behavior (page reload)
    onSearch(); // Memanggil fungsi search dari parent
  };

  return (
    // Form dengan shadow dan rounded corners
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative flex items-center overflow-hidden bg-white shadow-lg rounded-2xl">
        
        {/* Search Icon - di sebelah kiri input */}
        <div className="absolute pointer-events-none left-4">
          <svg 
            className="w-5 h-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>

        {/* Input Field - Controlled Component */}
        <input
          type="text"
          value={city} // Value dikontrol oleh state di parent
          onChange={(e) => onCityChange(e.target.value)} // Update state saat user mengetik
          placeholder="Masukkan nama kota... (contoh: Jakarta, London)"
          disabled={isLoading} // Disable saat loading
          className="flex-1 py-4 pl-12 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
        />

        {/* Search Button */}
        <button
          type="submit"
          disabled={isLoading || !city.trim()} // Disable jika loading atau input kosong
          className="px-8 py-4 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* Tampilkan text berbeda saat loading */}
          {isLoading ? 'Mencari...' : 'Cari'}
        </button>
      </div>

      {/* Helper text */}
      <p className="mt-2 text-sm text-center text-gray-500">
        Ketik nama kota dan tekan Enter atau klik tombol Cari
      </p>
    </form>
  );
};

// Export component
export default SearchBar;